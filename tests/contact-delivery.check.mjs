import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { test } from 'node:test';
import { deliverInquiry } from '../lib/contact-delivery.ts';

function inquiry(email = `${randomUUID()}@example.com`) {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: 'Azienda Èsempio', email, service: 'electrical', location: 'Trieste, Italia',
    description: 'Quadro elettrico\nRichiesta di informazioni.', requestId: randomUUID(),
  })) data.set(key, value);
  return data;
}

// Every provider call is intercepted. These checks can never send real email.
test('contact delivery boundaries', async (t) => {
  const originalFetch = globalThis.fetch;
  const keys = ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL'];
  const originalEnvironment = keys.map((key) => process.env[key]);
  process.env.RESEND_API_KEY = 're_test_dummy';
  process.env.CONTACT_FROM_EMAIL = '5H <noreply@example.com>';
  process.env.CONTACT_TO_EMAIL = 'owner@example.com';
  let calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: 'mock-message' });
  };
  try {
    await t.test('validates fields and blocks honeypots before contacting provider', async () => {
      const data = inquiry();
      data.set('email', 'invalid\naddress');
      data.set('service', 'invented');
      data.set('description', 'x'.repeat(4001));
      const result = await deliverInquiry(data);
      assert.equal(result.status, 'invalid');
      assert.deepEqual(Object.keys(result.errors).sort(), ['description', 'email', 'service']);
      const bot = inquiry();
      bot.set('website', 'spam');
      assert.equal((await deliverInquiry(bot)).status, 'blocked');
      assert.equal(calls.length, 0);
    });
    await t.test('uses configured recipient, visitor reply-to and stable retry key', async () => {
      const data = inquiry();
      assert.equal((await deliverInquiry(data)).status, 'sent');
      assert.equal((await deliverInquiry(data)).status, 'sent');
      const { url, options } = calls[0];
      const body = JSON.parse(options.body);
      assert.equal(url, 'https://api.resend.com/emails');
      assert.deepEqual(body.to, ['owner@example.com']);
      assert.equal(body.from, '5H <noreply@example.com>');
      assert.equal(body.reply_to, data.get('email'));
      assert.ok(body.text.includes('Azienda Èsempio'));
      assert.ok(body.text.includes('Quadro elettrico\nRichiesta di informazioni.'));
      assert.equal(body.html, undefined);
      assert.equal(options.headers['Idempotency-Key'], calls[1].options.headers['Idempotency-Key']);
    });
    await t.test('configuration, provider and network failures never report success; attempts are limited', async () => {
      calls = [];
      delete process.env.RESEND_API_KEY;
      assert.equal((await deliverInquiry(inquiry())).status, 'unavailable');
      assert.equal(calls.length, 0);
      process.env.RESEND_API_KEY = 're_test_dummy';
      const data = inquiry();
      globalThis.fetch = async () => new Response(null, { status: 403 });
      assert.equal((await deliverInquiry(data)).status, 'failed');
      globalThis.fetch = async () => { throw new Error('mock network failure'); };
      assert.equal((await deliverInquiry(data)).status, 'failed');
      globalThis.fetch = async () => Response.json({});
      assert.equal((await deliverInquiry(data)).status, 'failed');
      assert.equal((await deliverInquiry(data)).status, 'rateLimited');
    });
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, i) => {
      if (originalEnvironment[i] === undefined) delete process.env[key];
      else process.env[key] = originalEnvironment[i];
    });
  }
});
