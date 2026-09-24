// Run against a built Next.js server: node scripts/check-public-indexing.cjs http://localhost:3187
// With no argument, checks the public canonical URLs on production.
const assert = require('node:assert/strict');
const origin = 'https://relynplatform.com';
const override = process.argv[2];
const publicUrls = [
  '/', '/en', '/ja', '/zh', '/th', '/services',
  ...['upsell-kr', 'upsell-tw', 'upsell-jp', 'review-guide-kr', 'review-guide-tw', 'review-guide-jp'].map(slug => '/korean-skin-treatments/' + slug),
].map(route => origin + route).concat(
  ['ja', 'tw', 'hk', 'b2b', 'b2b/th'].map(route => 'https://www.relynplatform.com/customerinquiry/' + route),
);
const canonicalByPath = new Map(publicUrls.map(url => [new URL(url).pathname, url]));
const publicOrigins = new Set(['https://relynplatform.com', 'https://www.relynplatform.com']);
const responseCache = new Map();

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(match => [match[1].toLowerCase(), match[2].replaceAll('&amp;', '&')]));
}
function elements(html, tag) {
  return [...html.matchAll(new RegExp('<' + tag + '\\b[^>]*>', 'gi'))].map(match => attributes(match[0]));
}
async function read(url, exactDestination = false) {
  const target = !exactDestination && override ? new URL(new URL(url).pathname, override).href : url;
  if (responseCache.has(target)) return responseCache.get(target);
  const response = await fetch(target, { signal: AbortSignal.timeout(30000), redirect: 'manual' });
  assert.equal(response.status, 200, `${url}: expected HTTP 200, got ${response.status}`);
  const result = { html: await response.text(), headers: response.headers, target };
  responseCache.set(target, result);
  return result;
}

function assertPrivateMetadata(html, label) {
  for (const agent of ['robots', 'googlebot']) {
    const meta = elements(html, 'meta').find(item => item.name === agent);
    assert(meta && /noindex/.test(meta.content) && /nofollow/.test(meta.content), `${label}: missing ${agent} exclusion`);
  }
  assert(!elements(html, 'link').some(item => item.rel === 'canonical' || item.hreflang), `${label}: should not inherit public canonical/language signals`);
}

async function main() {
  const sitemap = await read(origin + '/sitemap.xml');
  const listed = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual([...listed].sort(), [...publicUrls].sort(), 'Sitemap must contain exactly the public canonical pages, without private areas or card duplicates');
  const robots = (await read(origin + '/robots.txt')).html;
  for (const route of ['/auth/', '/admin/', '/dashboard/', '/api/']) {
    assert(robots.includes('Disallow: ' + route), `Missing robots exclusion: ${route}`);
  }

  const graph = new Map();
  const navigationTargets = new Map();
  for (const url of publicUrls) {
    const { html, headers, target } = await read(url);
    const meta = elements(html, 'meta');
    const directives = meta.filter(item => ['robots', 'googlebot'].includes(item.name?.toLowerCase())).map(item => item.content).join(',');
    assert(/\bindex\b/.test(directives) && !/noindex|nofollow/.test(directives), `${url}: public robots directives: ${directives}`);
    assert(!/noindex|nofollow/i.test(headers.get('x-robots-tag') || ''), `${url}: blocked by HTTP header`);
    const canonicals = elements(html, 'link').filter(item => item.rel === 'canonical');
    assert.deepEqual(canonicals.map(item => new URL(item.href).href), [url], `${url}: incorrect canonical`);
    assert(/<h1\b[^>]*>[^]*?<\/h1>/.test(html), `${url}: missing server-rendered heading`);
    const reachableCanonicals = new Set();
    const pageOrigin = new URL(target).origin;
    for (const link of elements(html, 'a').filter(item => item.href && !/(^|\s)nofollow(\s|$)/.test(item.rel || ''))) {
      let destination;
      try { destination = new URL(link.href, target); } catch { continue; }
      if (destination.origin !== pageOrigin && !publicOrigins.has(destination.origin)) continue;
      const canonical = canonicalByPath.get(destination.pathname);
      if (!canonical) continue;
      // Resolve the actual href as the browser does. Never rewrite a production
      // link to localhost before checking: that would conceal the reported bug.
      assert.equal(destination.origin, pageOrigin, `${target}: internal link ${link.href} leaves the current site`);
      destination.hash = '';
      navigationTargets.set(destination.href, canonical);
      reachableCanonicals.add(canonical);
    }
    graph.set(url, reachableCanonicals);
    if (url.endsWith('/services')) {
      for (const target of publicUrls.filter(target => target !== url)) {
        assert(graph.get(url).has(target), `Service directory does not link to ${target}`);
      }
    }
    console.log('PUBLIC PASS ' + url);
  }
  for (const [destination, expectedCanonical] of navigationTargets) {
    const { html } = await read(destination, true);
    assert.deepEqual(elements(html, 'link').filter(item => item.rel === 'canonical').map(item => new URL(item.href).href), [expectedCanonical], `${destination}: actual navigation must reach the expected public page`);
  }
  console.log(`NAVIGATION PASS ${navigationTargets.size} actual destinations stay on the current site`);
  const reachable = new Set();
  const pending = [origin + '/'];
  while (pending.length) {
    const current = pending.pop();
    if (reachable.has(current)) continue;
    reachable.add(current);
    pending.push(...graph.get(current));
  }
  assert.equal(reachable.size, publicUrls.length, 'All public pages must be reachable through server-rendered links from the homepage');
  for (const [url, links] of graph) {
    if (url !== origin + '/services') assert(links.has(origin + '/services'), `${url}: missing return path to services`);
  }

  for (const route of ['/auth/login', '/auth/register', '/auth/me', '/auth/hospital/dashboard', '/auth/agency/dashboard', '/auth/admin/accounts']) {
    const response = await fetch(new URL(route, override || origin), { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow', `${route}: missing private header`);
    if (/^\/auth\/(hospital|agency|admin)\//.test(route)) {
      assert.equal(response.status, 307, `${route}: unauthenticated users must still be redirected`);
      assert.equal(new URL(response.headers.get('location')).pathname, '/auth/login', `${route}: incorrect authentication redirect`);
    } else {
      assert.equal(response.status, 200, `${route}: expected login/register/me response`);
      assertPrivateMetadata(await response.text(), route);
    }
    console.log('PRIVATE PASS ' + route);
  }
  // Check the underlying rendered workspaces without bypassing authentication.
  if (override && ['localhost', '127.0.0.1'].includes(new URL(override).hostname)) {
    const fs = require('node:fs');
    const path = require('node:path');
    const builtAuth = path.resolve(__dirname, '../.next/server/app/auth');
    const pages = fs.readdirSync(builtAuth, { recursive: true }).filter(file => file.endsWith('.html'));
    assert(pages.length > 20, 'Expected built private workspaces');
    for (const page of pages) assertPrivateMetadata(fs.readFileSync(path.join(builtAuth, page), 'utf8'), page);
    console.log(`PRIVATE HTML PASS ${pages.length} built pages`);
  }
  for (const url of publicUrls.filter(url => url.includes('/korean-skin-treatments/'))) {
    const { html } = await read(url + '/cards');
    assert.deepEqual(elements(html, 'link').filter(item => item.rel === 'canonical').map(item => item.href), [url], 'Card view must consolidate into the full article');
  }
  const privacy = await read(origin + '/privacy');
  assert(elements(privacy.html, 'meta').some(item => item.name === 'robots' && /noindex/.test(item.content)), 'Privacy exclusion must remain');
  console.log(`PASS: ${publicUrls.length} public pages reachable; 6 private routes excluded; 6 card canonicals; privacy; sitemap; robots.txt`);
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
