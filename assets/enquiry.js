(async function setupEnquiry() {
  const section = document.querySelector('#enquiry');
  const form = document.querySelector('#enquiry-form');
  const topic = document.querySelector('#enquiry-topic');
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#enquiry-status');
  const fallback = document.querySelector('#enquiry-fallback');

  try {
    const config = await fetch('/api/enquiries', { signal: AbortSignal.timeout(5000) });
    if (!config.ok) return;
    const { siteKey } = await config.json();
    if (!siteKey) return;

    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });

    let token = '';
    let sending = false;
    const updateToken = (value = '') => {
      token = value;
      button.disabled = sending || !token;
    };
    const showError = (message) => {
      status.textContent = message;
      fallback.hidden = false;
    };

    section.hidden = false;
    const widget = window.turnstile.render('#enquiry-turnstile', {
      sitekey: siteKey,
      size: 'flexible',
      action: 'enquiry',
      callback: updateToken,
      'expired-callback': () => updateToken(),
      'error-callback': () => {
        updateToken();
        showError('The spam check could not load. Try again or send your message by email.');
      }
    });

    document.querySelectorAll('[data-enquiry-topic]').forEach((link) => {
      link.href = '#enquiry';
      link.addEventListener('click', () => {
        topic.value = link.dataset.enquiryTopic;
        topic.focus({ preventScroll: true });
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (sending || !token) return;

      sending = true;
      button.disabled = true;
      fallback.hidden = true;
      status.textContent = 'Sending your message…';

      try {
        const fields = new FormData(form);
        const response = await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: fields.get('topic'),
            message: fields.get('message'),
            replyEmail: fields.get('replyEmail'),
            token
          })
        });
        const result = await response.json();
        if (response.ok && result.saved === true) {
          form.reset();
          status.textContent = 'Your message was sent. Thank you.';
        } else {
          showError(result.error || 'Your message could not be saved. Please try again.');
        }
      } catch {
        showError('We could not confirm that your message was saved. Please try again or use email.');
      } finally {
        sending = false;
        updateToken();
        window.turnstile.reset(widget);
      }
    });
  } catch {
    section.hidden = true;
  }
})();
