const topics = new Set(['writing', 'research', 'idea']);
const maxRequestBytes = 16_384;
const unavailable = 'The form is temporarily unavailable. Your message has not been saved.';

function json(body, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function configured(env) {
  return env.ENQUIRIES_DB && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY;
}

export function onRequestGet({ env }) {
  return configured(env)
    ? json({ siteKey: env.TURNSTILE_SITE_KEY })
    : json({ error: unavailable }, 503);
}

export async function onRequestPost({ request, env }) {
  if (!configured(env)) return json({ error: unavailable }, 503);

  const url = new URL(request.url);
  if (request.headers.get('Origin') !== url.origin) {
    return json({ error: 'Please submit the form from the Get Involved page.' }, 403);
  }
  if (request.headers.get('Content-Type')?.split(';')[0] !== 'application/json') {
    return json({ error: 'Invalid submission format.' }, 415);
  }

  const length = Number(request.headers.get('Content-Length'));
  if (!Number.isSafeInteger(length) || length <= 0 || length > maxRequestBytes) {
    return json({ error: 'The submission is missing or too large.' }, 413);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Invalid submission format.' }, 400);
  }

  const { topic, token } = data ?? {};
  const message = typeof data?.message === 'string' ? data.message.trim() : '';
  const replyEmail = typeof data?.replyEmail === 'string' ? data.replyEmail.trim() : '';
  if (!topics.has(topic) || !message || message.length > 3000) {
    return json({ error: 'Choose a topic and enter a message of up to 3,000 characters.' }, 400);
  }
  if (replyEmail && (replyEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail))) {
    return json({ error: 'Enter a valid reply email or leave that field blank.' }, 400);
  }
  if (typeof token !== 'string' || !token || token.length > 2048) {
    return json({ error: 'Complete the spam check, then try again.' }, 400);
  }

  try {
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(5000)
    });
    if (!check.ok) return json({ error: unavailable }, 503);

    const result = await check.json();
    if (!result.success || result.hostname !== url.hostname || result.action !== 'enquiry') {
      return json({ error: 'The spam check expired or could not be verified. Please try again.' }, 403);
    }

    const saved = await env.ENQUIRIES_DB.prepare(
      'INSERT INTO enquiries (topic, message, reply_email) VALUES (?, ?, ?)'
    ).bind(topic, message, replyEmail || null).run();
    if (!saved.success) return json({ error: unavailable }, 503);
  } catch {
    return json({ error: unavailable }, 503);
  }

  return json({ saved: true }, 201);
}
