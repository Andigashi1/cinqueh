> Contact delivery update: the historical local-only form described below is superseded by [contact-delivery.md](contact-delivery.md).

# 5H — Precision & Craft

Baseline: `8dd398b22ef6acdf21eecda6675ce35a8d754d93`. The user authorized continuing the redesign on 2026-10-15; proceed with recommended Direction A.

## Evidence and scope

- Surface: four existing Italian pages, shared navigation/footer, inquiry experience.
- Governing evidence: original CSS logo colors; Fraunces/Inter in locale layout; Italian messages; existing work imagery; rendered audit.
- Explicit exceptions: none documented. Preserve business facts, SEO, next-intl, performance, contact details, and hosting.
- Improve UI informs the audit and evidence; the user's explicit implementation request authorizes product edits beyond that skill's audit-only workflow.

| Problem | Evidence | Correction | Scope | Confidence |
| --- | --- | --- | --- | --- |
| All contact CTAs lead to the legal footer | User requires a dedicated inquiry experience; original hrefs target Footer's contatti ID | Move the destination to a dedicated section above a separate footer | Four routes and header | High |
| Gallery descriptions misrepresent images | Original gallery interpolates imported objects and describes carpentry as electrical | Localized descriptions of the existing images | Service galleries | High |
| Small gold text lacks contrast | Original #A9812E on #FAF9F6 is 3.40:1 | Use #866321 bronze on paper, retaining the logo gold | Shared tokens and controls | High |

## Design decisions

- Retain ink #14171A, gold #A9812E, light gold #C9A85C, paper #FAF9F6, slate #2E3A44. Add bronze #866321 for small text (5.22:1 on paper).
- Fraunces for principal headlines, Inter for body/navigation/forms. Retain next/font.
- Max 1280px content width, 20–24px phone gutters, fluid section spacing, left-aligned editorial layouts.
- No service sequence numbers: services are not steps. No invented case studies or statistics. Use original images with truthful visual descriptions.
- CSS handles simple motion: shared 160/300/500ms timings, decelerating easing, immediate feedback. Hero transform entrance keeps content visible. One optional gallery reveal per page. Disable motion for reduced-motion users.
- A shared ServicePage expresses the existing two service-page structures. Preserve server metadata wrappers and existing page boundaries; the new contact section remains server-rendered around a small interactive form. Remove footer animation state.
- Use a native dialog for image viewing, with explicit navigation, Escape, focus containment/restoration, and background scroll lock.

```text
Desktop                          Mobile
logo / navigation / contact      logo / menu
headline + CTA | work photograph headline / CTA / photograph
sector context                   sector context
image | electrical service       image / electrical service
carpentry service | image        image / carpentry service
company story | site image       company story / site image
existing-work gallery            two-column work gallery
direct contacts | inquiry        contacts / inquiry
separate legal footer            legal footer
```

## Contact boundary

Validate and review only; explain before and after review that the request is not sent. Provide manual text copying and existing mailto/tel links. No API, service credentials, data persistence, or false submission status. Official Facebook/Instagram profile URLs remain null in lib/company.ts; display their icons only when verified URLs are configured. The form does not collect or transmit data through analytics code.

## English later

Preserve Italian root URLs and localePrefix as-needed. When authorized: add approved messages/en.json, register en in routing.locales, add a locale-aware switcher, translate page metadata, extend sitemap/hreflang, verify navigation and longer text. All factual claims remain unchanged until approved.

## Validation plan

Run production build, TypeScript, lint, and existing browser checks. Add only inquiry validation/review and native gallery interaction coverage. Review phone, landscape, tablet, desktop, keyboard, reduced motion, no-JavaScript content visibility, and image loading. Compare production JavaScript/image transfer and observed layout shift with baseline; these synthetic measurements are not field Core Web Vitals.

## Existing environment limitations

The committed lockfile makes npm ci fail on missing optional @emnapi entries. Dependencies were installed locally with package-lock=false; package.json and package-lock.json remain unchanged. Native compiler execution requires the approved build environment. The installed agent skill code is excluded from application linting; its upstream sources remain intact.

## QA results — 2026-10-15

- Final production build: PASS (`NEXT_TELEMETRY_DISABLED=1 npm run build`).
- TypeScript: PASS (`npx tsc --noEmit`).
- Application lint: PASS (`npm run lint`).
- Whitespace/diff validation: PASS (`git diff --check`).
- Chromium and Firefox: **22/22 PASS** (`npm run test:e2e -- --project=chromium --project=firefox`).
- Two new test scenarios only: inquiry validation/local review/stale-summary clearing, and image viewer navigation/Escape/focus/scroll restoration. The existing phone/landscape/tablet/desktop, keyboard menu, no-JavaScript, missing-IntersectionObserver, and reduced-motion scenarios are retained.
- Manual visual review: all four desktop pages, mobile homepage/contact/gallery, real image loading/crops. Long inquiry values, accented text, multiline descriptions, and manual clipboard copying passed without overflow.
- All original Italian message values are preserved exactly. package.json, package-lock.json, next.config.ts, proxy.ts, i18n files, business schema, robots, sitemap and server-page metadata are unchanged.
- Form review is entirely local and explicitly says nothing is sent. No email service, API keys, extra languages, invented social URLs, or application dependencies were added.
- Normal small text bronze/paper contrast: 5.22:1; body muted/paper: 6.42:1; form control border/paper: 3.45:1; ink/gold button contrast: 5.03:1.

### Production asset comparison

Measured with a fresh Chromium context per route, 1440×1000 viewport, network idle plus 500ms. JavaScript is the sum of downloaded same-origin script bodies compressed individually with gzip. Image bytes are Resource Timing transfer sizes for optimized image requests, including preloads and images within the browser’s lazy-load threshold. This is a reproducible local comparison, not field LCP/INP or a Lighthouse score.

| Route | JS gzip before / after (kB) | Initial/nearby images before / after (kB) | Observed initial CLS |
| --- | --- | --- | --- |
| `/` | 173.7 / 176.8 | 0.9 / 162.9 | 0 |
| `/chi-siamo` | 174.2 / 174.7 | 56.8 / 129.1 | 0 |
| `/elettricisti` | 174.5 / 176.5 | 884.2 / 191.0 | 0 |
| `/carpentieri` | 174.6 / 176.4 | 1089.7 / 176.6 | 0 |

Homepage imagery is intentionally added to the previously text-only presentation. The two service pages transfer about 78% and 84% fewer image bytes. Fonts are unchanged at 85.6 kB in this measurement. No page JavaScript errors were observed.

### Remaining verification limitation

WebKit binaries downloaded successfully, but the engine cannot launch on this host because libgtk-4.so.1, libgraphene-1.0.so.0, libharfbuzz-icu.so.0, libmanette-0.2.so.0, libhyphen.so.0, and libGLESv2.so.2 are missing. Safari/WebKit verification remains outstanding on a host with those libraries; no system packages were installed or hosting settings changed.

### Review artifacts

- Local production preview: http://localhost:3100
- Desktop homepage: /tmp/cinqueh-final-desktop.png
- Mobile homepage: /tmp/cinqueh-final-mobile.png
- Hero detail: /tmp/cinqueh-final-hero.png
- Service pages: /tmp/cinqueh-final-electrical.png and /tmp/cinqueh-final-carpentry.png
- About: /tmp/cinqueh-final-about.png

Changes remain local and uncommitted. Nothing has been deployed.
