const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const articlePath = '/korean-skin-treatments/upsell-kr';
const requestId = 'd8e5a532-0925-4ed0-a7c2-78ea0669d6a0';
const payload = { message: '상담만 예약할 때 궁금한 점입니다.\n<내용>도 그대로 전달해주세요.', pagePath: articlePath, requestId };

// Exercise the actual route with a fake mail transport; these tests send no mail.
function setup({ result = { data: { id: 'test-email-id' }, error: null }, throws = false, env = {} } = {}) {
  const calls = [];
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const module = { exports: {} };
    cache.set(file, module.exports);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(code, {
      module, exports: module.exports, URL, Set,
      process: { env: { RESEND_API_KEY: 'test-only-key', LEAD_FROM_EMAIL: 'RELYN <test@example.com>', ...env } },
      require(name) {
        if (name === 'next/server') return { NextResponse: { json: (value, init) => Response.json(value, init) } };
        if (name === 'resend') return { Resend: class {
          emails = { send: async (email, options) => {
            calls.push(JSON.parse(JSON.stringify({ email, options })));
            if (throws) throw new Error('transport unavailable');
            return result;
          } };
        } };
        if (name.startsWith('@/')) return load(path.join(root, `${name.slice(2)}.ts`));
        throw new Error(`Unexpected dependency: ${name}`);
      },
    }, { filename: file });
    return module.exports;
  }
  return { POST: load(path.join(root, 'app/api/content-inquiry/route.ts')).POST, calls };
}

function request(body = payload, headers = {}, url = 'https://relynplatform.com/api/content-inquiry') {
  return new Request(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
}

test('sends plain text to the fixed inbox with the real article title and canonical URL', async () => {
  const { POST, calls } = setup();
  const response = await POST(request({ ...payload, to: 'other@example.com', pageTitle: 'forged subject' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].email.to, 'relyn.official.team@gmail.com');
  assert.equal(calls[0].email.subject, '[콘텐츠제안및문의] 피부과에서 추가 시술을 권한다면, 어디까지 받아야 할까요?');
  assert.ok(calls[0].email.text.includes(`https://relynplatform.com${articlePath}`));
  assert.ok(calls[0].email.text.includes(payload.message));
  assert.equal(calls[0].email.html, undefined);
});

test('card submissions retain the article title and identify the card URL', async () => {
  const { POST, calls } = setup();
  assert.equal((await POST(request({ ...payload, pagePath: `${articlePath}/cards` }))).status, 200);
  assert.ok(calls[0].email.subject.endsWith('(카드로 보기)'));
  assert.ok(calls[0].email.text.includes(`https://relynplatform.com${articlePath}/cards`));
});

test('Taiwan article and card inquiries use the translated title and matching source URL', async () => {
  for (const suffix of ['', '/cards']) {
    const { POST, calls } = setup();
    const pagePath = `/korean-skin-treatments/upsell-tw${suffix}`;
    const message = '請問可以只預約諮詢嗎？';
    const response = await POST(request({ ...payload, pagePath, message, pageTitle: 'forged title', to: 'other@example.com' }));
    assert.equal(response.status, 200);
    assert.equal(calls[0].email.to, 'relyn.official.team@gmail.com');
    assert.equal(calls[0].email.subject, '[콘텐츠제안및문의] 韓國皮膚科推薦加做療程，要接受嗎？' + (suffix ? ' (카드로 보기)' : ''));
    assert.ok(calls[0].email.text.includes(`https://relynplatform.com${pagePath}`));
    assert.ok(calls[0].email.text.includes(message));
  }
});

test('invalid inputs never reach the email provider', async () => {
  for (const body of [null, [], {}, { ...payload, message: ' \n ' }, { ...payload, message: '가'.repeat(1001) }, { ...payload, message: 123 }, { ...payload, pagePath: '/auth/admin' }, { ...payload, requestId: 'invalid' }]) {
    const { POST, calls } = setup();
    assert.equal((await POST(request(body))).status, 400);
    assert.equal(calls.length, 0);
  }
});

test('Japanese article and card inquiries use the Japanese title and matching source URL', async () => {
  for (const suffix of ['', '/cards']) {
    const { POST, calls } = setup();
    const pagePath = `/korean-skin-treatments/upsell-jp${suffix}`;
    const message = 'カウンセリングだけ予約できますか？';
    const response = await POST(request({ ...payload, pagePath, message, pageTitle: 'forged title', to: 'other@example.com' }));
    assert.equal(response.status, 200);
    assert.equal(calls[0].email.to, 'relyn.official.team@gmail.com');
    assert.equal(calls[0].email.subject, '[콘텐츠제안및문의] 韓国の美容皮膚科で追加施術を勧められたら？' + (suffix ? ' (카드로 보기)' : ''));
    assert.ok(calls[0].email.text.includes(`https://relynplatform.com${pagePath}`));
    assert.ok(calls[0].email.text.includes(message));
  }
});

test('accepts exactly 1000 characters without truncation', async () => {
  const { POST, calls } = setup();
  const message = '가'.repeat(1000);
  assert.equal((await POST(request({ ...payload, message }))).status, 200);
  assert.ok(calls[0].email.text.includes(message));
});

test('rejects malformed and oversized JSON bodies', async () => {
  const { POST, calls } = setup();
  for (const [body, status] of [['{', 400], ['x'.repeat(8193), 413]]) {
    const req = new Request('https://relynplatform.com/api/content-inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    assert.equal((await POST(req)).status, status);
  }
  assert.equal(calls.length, 0);
});

test('rejects foreign browser origins and non-JSON requests', async () => {
  const { POST, calls } = setup();
  assert.equal((await POST(request(payload, { Origin: 'https://unrelated.example' }))).status, 403);
  assert.equal((await POST(request(payload, { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal(calls.length, 0);
});

test('accepts the deployed origin behind a proxy and local same-origin previews', async () => {
  for (const [origin, url] of [['https://www.relynplatform.com', 'http://localhost:3000/api/content-inquiry'], ['http://127.0.0.1:3188', 'http://127.0.0.1:3188/api/content-inquiry']]) {
    const { POST } = setup();
    assert.equal((await POST(request(payload, { Origin: origin }, url))).status, 200);
  }
});

test('accepts the browser Host when Next normalizes the route URL, but rejects a different origin', async () => {
  const { POST, calls } = setup();
  const url = 'http://localhost:3188/api/content-inquiry';
  assert.equal((await POST(request(payload, { Host: '127.0.0.1:3188', Origin: 'http://127.0.0.1:3188' }, url))).status, 200);
  assert.equal((await POST(request(payload, { Host: '127.0.0.1:3188', Origin: 'https://unrelated.example' }, url))).status, 403);
  assert.equal(calls.length, 1);
});

test('missing sender configuration is not reported as success', async () => {
  for (const env of [{ RESEND_API_KEY: '' }, { LEAD_FROM_EMAIL: '' }]) {
    const { POST, calls } = setup({ env });
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, false);
    assert.equal(calls.length, 0);
  }
});

test('SDK error results, missing IDs and transport failures are not reported as success', async () => {
  for (const options of [{ result: { data: null, error: { message: 'rejected' } } }, { result: { data: {}, error: null } }, { throws: true }]) {
    const { POST } = setup(options);
    const response = await POST(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
  }
});

test('a retried submission uses the same provider deduplication key and body', async () => {
  const { POST, calls } = setup();
  await POST(request());
  await POST(request());
  assert.deepEqual(calls[0], calls[1]);
  assert.equal(calls[0].options.idempotencyKey, `content-inquiry/${requestId}`);
});
