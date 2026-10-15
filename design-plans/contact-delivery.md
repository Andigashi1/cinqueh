# Contact delivery — Resend

This integration supersedes the original local-only contact form boundary in precision-craft.md. The existing review step remains local. Only the explicit “Invia la richiesta” button calls the Server Action.

## Deployment

Configure these server-only variables in Vercel for the environment being deployed:

- RESEND_API_KEY: the private Resend API key with sending permission. Never commit it or prefix it with NEXT_PUBLIC_.
- CONTACT_TO_EMAIL: cinque.h5@gmail.com (owner-confirmed recipient).
- CONTACT_FROM_EMAIL: 5H <noreply@cinqueh.com> (requires the cinqueh.com domain to be verified in Resend).

Deploy the updated application source after setting the variables. Redeploying older source applies environment settings but does not add this integration. No hosting configuration or application dependency changes are required.

After deployment, submit one clearly marked test inquiry through the live site. Check Resend's email log and the destination inbox/spam folder; confirm Reply-To addresses the visitor. A successful action means Resend accepted the message, rather than guaranteeing inbox delivery. Do not share the API key in chat or commit it to Git.

## Behavior and controls

- Server-side validation of required fields, lengths, email syntax, service allowlist and UUID request ID.
- Plain-text message, fixed server-configured recipient/sender, visitor email as Reply-To.
- Native Next.js Server Action origin checks; no new public mail API route.
- Hidden honeypot, disabled controls during sending, provider timeout, and payload-bound Resend idempotency key reused for retries (provider retention: 24 hours).
- Best-effort in-memory throttling: three attempts per email and ten per Vercel-provided client IP within ten minutes. State is bounded to 1,000 hashed identities per server instance and resets on cold starts. This is basic protection, not a distributed or durable quota; stronger protection can be added if actual abuse warrants it.
- Successful requests reset all fields and remove the review summary while retaining the success message. The form remains available for a fresh inquiry; editing starts a new request.
- Provider failures keep the reviewed details and allow retry. No credentials, request contents or provider response bodies are logged or returned to the browser.
- Without JavaScript, direct email and phone remain available.

## Verification

Run the three focused mocked-provider scenarios with Node 24:

    node --test tests/contact-delivery.check.mjs

All provider requests in these checks are intercepted. They cover validation/honeypot, fixed recipient and Reply-To, retry idempotency, configuration/provider/network failure, and throttling. No live mail is sent.

Also run application lint, TypeScript, production build and existing Chromium/Firefox browser checks. The send flow is checked against a local production server with a temporary Node fetch interceptor and dummy credentials, exercising the real Server Action without reaching Resend. No test delivery switches or endpoints are included in the application.

Live delivery remains an owner-side check after deployment. Safari/WebKit verification retains the existing host library limitation documented in precision-craft.md.

Verified locally on 2026-10-15: production build, application lint, TypeScript and diff checks passed; all 22 existing Chromium/Firefox browser checks passed. Three mocked delivery scenarios passed. Additional production-browser checks passed in both engines for pending state, provider error with retained fields, success focus, new-request reset and mobile overflow. Resend configuration names and API endpoint are absent from client static chunks. No live delivery was attempted and no code was pushed or deployed.
