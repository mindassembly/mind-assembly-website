import { getCollection } from 'astro:content';
import { issues } from '../data/programme';

export async function GET({ site }) {
  const articles = await getCollection('articles');
  const paths = [
    '/', '/about', '/people', '/explore/', '/join', '/faq', '/contact',
    '/events/', '/projects/', '/editorial/', '/editorial-board/', '/privacy/', '/learning/', '/assembly-review/',
    ...articles.map(article => `/${article.data.section}/${article.id}/`),
    ...issues.map(issue => `/assembly-review/${issue.slug}/`)
  ];
  const urls = paths.map(path => `<url><loc>${new URL(path, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
