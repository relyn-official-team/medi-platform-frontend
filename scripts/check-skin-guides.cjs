// Checks and warms every content route on the local preview, including cards.
// Timings are server HTTP response times, not browser Web Vitals or mobile-network results.
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const origin = "http://127.0.0.1:3191";

async function timedRequest(url) {
  const started = performance.now();
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  assert.equal(response.status, 200, `${url} must return 200`);
  const body = Buffer.from(await response.arrayBuffer());
  return { body, headers: response.headers, ms: Math.round(performance.now() - started) };
}

async function main() {
  const folders = (await fs.readdir(path.join(root, "app/korean-skin-treatments")))
    .filter(name => /^(upsell|review-guide)-(kr|tw|jp)$/.test(name)).sort();
  const routes = [], usedImages = new Set();
  for (const name of folders) {
    for (const suffix of ["", "/cards"]) {
      const route = `/korean-skin-treatments/${name}${suffix}`;
      const first = await timedRequest(origin + route);
      const html = first.body.toString("utf8");
      assert.ok(html.includes("<h1"), `${route}: missing article heading`);
      assert.ok(!html.includes("/_next/image?"), `${route}: runtime image encoding returned`);
      for (const match of html.matchAll(/(?:src|href)="(\/korean-skin-treatments\/optimized\/[^" ]+)"/g)) usedImages.add(match[1]);
      for (const match of html.matchAll(/srcSet="([^"]+)"/g)) {
        for (const item of match[1].split(",")) {
          const src = item.trim().split(" ")[0];
          if (src.startsWith("/korean-skin-treatments/optimized/")) usedImages.add(src);
        }
      }
      const samples = [];
      for (let i = 0; i < 3; i++) samples.push((await timedRequest(origin + route)).ms);
      samples.sort((a, b) => a - b);
      routes.push({ route, initialMs: first.ms, warmMedianMs: samples[1], htmlBytes: first.body.length });
      console.log(`${route}: HTTP 200, initial ${first.ms}ms, warm median ${samples[1]}ms`);
    }
  }
  const images = [];
  for (const src of usedImages) {
    const result = await timedRequest(origin + src);
    assert.equal(result.headers.get("content-type"), "image/webp", src);
    assert.ok(result.body.length < 250000, `${src}: image exceeds 250KB budget`);
    const dimensions = await sharp(result.body).metadata();
    images.push({ src, bytes: result.body.length, width: dimensions.width, height: dimensions.height,
      hasAlpha: dimensions.hasAlpha, cacheControl: result.headers.get("cache-control") });
  }
  const report = { measuredAt: new Date().toISOString(), environment: "Local Next.js development preview; no network throttling. Warm responses exclude initial compilation.", routes, images };
  await fs.mkdir(path.join(root, "docs"), { recursive: true });
  await fs.writeFile(path.join(root, "docs/skin-guide-performance-check.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(`Verified ${routes.length} pages and ${images.length} image variants. All pages are now warm for local preview.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
