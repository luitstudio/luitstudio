# 15. Launch Checklist

## Launch gate

Code-level blockers from Phase 10.3 have been addressed. Launch approval requires every applicable unchecked item below to be completed by engineering, QA, deployment operations, or the business owner.

## Automated validation

- [x] TypeScript completes with zero errors.
- [x] ESLint completes with zero warnings.
- [x] Prettier check passes.
- [x] Next.js production build passes.
- [x] All intended pages remain static.
- [x] Generated HTML contains no links to missing routes or anchors.
- [x] Generated metadata contains canonical, Open Graph, Twitter, favicon, robots, and sitemap output.
- [x] Local production responses contain the configured application security headers.
- [x] No-JavaScript markup and CSS expose content and fallback navigation.

## Business data

- [ ] Confirm ownership and final spelling of `https://luitstudio.com`.
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` is set correctly in production.
- [ ] Confirm `hello@luit.studio` is monitored.
- [ ] Confirm the displayed address and telephone number are accurate and approved for publication.
- [ ] Supply verified social profile URLs through `NEXT_PUBLIC_X_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, and `NEXT_PUBLIC_GITHUB_URL`, then confirm only configured controls render.
- [ ] Supply verified case-study destinations before changing portfolio cards from their current internal contact CTAs.
- [ ] Approve the generated social preview copy and visual.
- [ ] Decide whether privacy, terms, documentation, team, awards, and blog content will be added in future phases.

## Accessibility manual QA

- [ ] Keyboard-only traversal has a logical order and no traps outside the open drawer.
- [ ] Skip navigation moves viewport and accessibility focus correctly.
- [ ] Drawer opens, traps focus, closes on Escape/backdrop/link, and restores focus appropriately.
- [ ] Hash navigation communicates the destination to screen-reader users.
- [ ] Focus rings remain visible at every breakpoint and over every background.
- [ ] Test 200% and 400% zoom with no lost or obscured content.
- [ ] Test increased text size and mobile text scaling.
- [ ] Test Windows Forced Colors/High Contrast.
- [ ] Sample testimonial photo overlays for AA contrast at every crop.
- [ ] NVDA + Chrome pass.
- [ ] NVDA + Firefox pass.
- [ ] VoiceOver + Safari on macOS pass.
- [ ] VoiceOver + Safari on iOS pass.
- [ ] TalkBack + Chrome on Android pass.
- [ ] Reduced-motion behavior is static and understandable from first load.

## Browser and device QA

- [ ] Current Chrome on Windows/macOS.
- [ ] Current Firefox on Windows/macOS.
- [ ] Current Safari on macOS.
- [ ] Current Edge on Windows.
- [ ] Safari on a notched iPhone in portrait and landscape.
- [ ] Chrome on a representative Android phone.
- [ ] Widths: 320, 375, 768, 1024, 1280, and 1536 px.
- [ ] Drawer body lock and overscroll behavior on iOS.
- [ ] Safe-area clearance around the fixed header, drawer close control, and home indicator.
- [ ] Contact form with virtual keyboards, autofill, native select controls, and validation bubbles.

## Progressive enhancement

- [ ] Disable JavaScript and confirm all page content remains visible.
- [ ] Disable JavaScript at mobile width and confirm fallback navigation works.
- [ ] Confirm only valid fallback navigation destinations are present.
- [ ] Confirm the no-JavaScript contact message and email link are visible.
- [ ] Confirm form controls and submit button are not exposed without JavaScript.
- [ ] Block the progressive-enhancement marker script and confirm content remains visible rather than hidden.

## SEO and social

- [ ] Home and contact canonical URLs resolve to the final production origin.
- [ ] `robots.txt` returns 200 and references the correct sitemap URL.
- [ ] `sitemap.xml` returns 200 and contains only public canonical pages.
- [ ] Framework and custom 404 responses remain `noindex`.
- [ ] Home Open Graph preview passes the target platform debugger.
- [ ] Contact Open Graph preview uses contact-specific copy.
- [ ] Home Twitter/X preview passes with the generated image.
- [ ] Contact Twitter/X preview uses contact-specific copy.
- [ ] Favicon is visible in light and dark browser chrome.
- [ ] Add structured data only after all organization/profile values are verified.

## Security and deployment

- [ ] Production CSP is present and produces no browser console violations during normal use.
- [ ] `Referrer-Policy: strict-origin-when-cross-origin` is present.
- [ ] `Permissions-Policy` disables unused sensitive capabilities.
- [ ] `X-Content-Type-Options: nosniff` is present.
- [ ] Framing is denied by CSP `frame-ancestors` and `X-Frame-Options`.
- [ ] HTTPS redirects are enforced at the edge.
- [ ] HSTS is enabled only after domain/subdomain impact is approved.
- [ ] Deployment does not weaken or duplicate application headers unexpectedly.
- [ ] Environment variables contain no secrets exposed through `NEXT_PUBLIC_*`.
- [ ] Source maps, logs, and monitoring follow the deployment privacy policy.
- [ ] Error monitoring and uptime monitoring are configured if required.
- [ ] Dependency installation uses the lockfile and `npm ci`.

## Contact backend gate

Complete before enabling real online submission:

- [ ] Server-side schema validation.
- [ ] Field-level errors, `aria-invalid`, and a focusable error summary.
- [ ] CSRF/origin controls appropriate to the chosen action design.
- [ ] Rate limiting and spam protection.
- [ ] Request size and timeout limits.
- [ ] Safe logging with personal-data redaction.
- [ ] Success, validation, server-error, and offline states.
- [ ] Privacy notice and retention policy.
- [ ] Email/delivery failure monitoring.

## Final approval

- [ ] Engineering approval.
- [ ] Accessibility QA approval.
- [ ] Content/business-owner approval.
- [ ] Security/deployment approval.
- [ ] Production smoke test after deployment.

## Current recommendation

Proceed to staging and manual QA. Do not announce full public launch until the browser, assistive-technology, business-data, and deployed-header gates above are complete.
