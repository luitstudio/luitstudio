# 14. Production Readiness

## Phase 10.35 status

The documented code-level production blockers have been resolved without redesigning the UI or reorganizing the architecture.

**Recommendation: conditionally ready for launch after the remaining manual browser, assistive-technology, physical-device, deployment-edge, and business-data checks in `15_LAUNCH_CHECKLIST.md`.**

No unverified social profile or portfolio destination is rendered. Social controls are restored through validated optional configuration, and portfolio interactions use the verified internal contact route. No link to a missing route or nonexistent section remains in production navigation.

## Resolved blockers

| Previous blocker                                 | Resolution                                                                                                                                                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Motion content hidden without JavaScript         | Reveal wrappers and the header now carry a progressive-enhancement marker. Global no-JavaScript CSS overrides Framer Motion’s initial opacity/transform, while an early Next.js script enables the existing animations when JavaScript is available.    |
| Mobile navigation unavailable without JavaScript | The normal animated drawer remains unchanged for JavaScript users. A semantic `<noscript>` mobile navigation fallback is server-rendered, and the inactive menu trigger is hidden without JavaScript.                                                   |
| Unsafe no-JavaScript form behavior               | The form explicitly declares `method="post"`, `action="/contact"`, and `autocomplete="on"`. Without JavaScript, fields and submit control are hidden and replaced by a direct email fallback, preventing contact data from entering a GET query string. |
| Broken navigation                                | Team, Awards, Blog, legal, documentation, and explicit 404 links were removed because their routes/anchors do not exist. Unused route constants were removed as well.                                                                                   |
| Placeholder social links                         | Generic platform-root URLs remain removed. X, LinkedIn, Instagram, and GitHub controls are restored through `config/social.ts` and render only when valid HTTPS profile paths are supplied through their `NEXT_PUBLIC_*_URL` variables.                 |
| Placeholder portfolio links                      | The shared third-party Framer destination remains removed. Premium card interactions are restored with truthful accessible labels and the verified internal contact route; no nonexistent case-study route is implied.                                  |
| Missing security policies                        | Application-level CSP, Referrer-Policy, Permissions-Policy, MIME-sniffing protection, and framing protection are configured for every route.                                                                                                            |
| Incomplete canonical/social metadata             | Home and contact canonicals, complete per-route Open Graph/Twitter fields, and a generated 1200 × 630 PNG social preview are configured.                                                                                                                |
| Body/muted text contrast                         | The body token changed from `#767778` to `#6E6F70`, producing 5.04:1 on white and 4.58:1 on the light surface. Drawer muted copy changed to 65% ink, approximately 4.76:1 on cream. Placeholder and low-opacity light-card copy were strengthened.      |
| Noninteractive service-card focus stops          | `tabIndex` and focus-only decorative styles were removed from service articles.                                                                                                                                                                         |
| Rating announcement uncertainty                  | The hero rating now uses an explicit image role with its accessible label.                                                                                                                                                                              |
| Drawer overscroll                                | The drawer now uses overscroll containment while retaining its existing scroll lock and focus trap.                                                                                                                                                     |

## Progressive enhancement

### JavaScript enabled

- Existing Framer Motion reveal, header, drawer, stagger, and reduced-motion behavior remains active.
- The mobile drawer retains Escape handling, backdrop dismissal, body scroll lock, and focus containment.
- The contact form continues to intercept submission and explain that a backend is not connected.

### JavaScript disabled

- Motion-enhanced content is forced visible and transforms are removed.
- The header participates in normal document flow instead of remaining fixed over content.
- The inactive drawer trigger is hidden.
- A server-rendered mobile navigation list exposes only valid destinations.
- Images, content, internal links, mail links, and telephone links remain native HTML.
- The form displays a safe email alternative rather than attempting a GET or unsupported POST submission.

## Security headers

The following application-level headers apply to every path:

| Header                    | Value/policy                                                                                                                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy` | Self by default; local scripts/styles/images/fonts/connections; data/blob images where required; no objects; self-only base/form actions; no framing; self manifest; self/blob workers. |
| `Referrer-Policy`         | `strict-origin-when-cross-origin`                                                                                                                                                       |
| `Permissions-Policy`      | Camera, microphone, geolocation, payment, and USB disabled.                                                                                                                             |
| `X-Content-Type-Options`  | `nosniff`                                                                                                                                                                               |
| `X-Frame-Options`         | `DENY`                                                                                                                                                                                  |

Production CSP omits `unsafe-eval`. Development adds it only for the Next.js development runtime. `unsafe-inline` remains permitted for scripts and styles because the current Next.js hydration stream, early progressive-enhancement marker, and Framer Motion inline styles require it. Moving to a nonce-based CSP would require a separate rendering/hosting design and is outside this frozen-architecture fix phase.

### Intentionally omitted headers

- `Strict-Transport-Security`: must be enabled at the HTTPS production edge only after the domain, subdomain, and preload strategy is approved. Sending HSTS from local HTTP development is inappropriate.
- `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy`: not required by the current same-origin static site and can interfere with future approved integrations. Add only for a defined isolation requirement.
- `Cross-Origin-Embedder-Policy`: omitted because the site does not require cross-origin isolation.
- `upgrade-insecure-requests`: omitted from application CSP to preserve local HTTP development. The production edge must enforce HTTPS redirects.

## Metadata and crawlability

- Home canonical: `https://luitstudio.com/`, resolved through `metadataBase`.
- Contact canonical: `https://luitstudio.com/contact`.
- Home and contact have route-correct titles, descriptions, Open Graph URLs, site name, locale, type, Twitter titles, and Twitter descriptions.
- Both routes reference the generated 1200 × 630 PNG social preview.
- Robots, sitemap, language, favicon, and framework 404 `noindex` behavior remain intact.
- Sitemap includes only the two real pages.
- Structured data remains intentionally omitted until company contact/profile data is verified.
- A web app manifest remains intentionally omitted because installable/PWA behavior is not a requirement.

## Accessibility status

Code-level issues corrected in this phase:

- Normal and muted text contrast now meets AA for the audited solid backgrounds.
- Placeholder text uses the corrected body token without additional opacity.
- Noninteractive service cards no longer add keyboard stops.
- Hero rating semantics are explicit.
- No-JavaScript content and navigation remain available.
- Touch targets, global focus rings, reduced motion, semantic landmarks, form labels, image alternatives, and drawer focus management remain in place.

Still requiring manual verification:

- Photo-overlay contrast at every responsive crop.
- Skip-link and hash-target focus behavior in Safari/VoiceOver.
- Focus restoration after drawer navigation.
- 200%/400% zoom and text reflow.
- Windows Forced Colors.
- NVDA, VoiceOver, and TalkBack reading/interaction order.

## Known limitations

- Contact submission remains presentation-only; the no-JavaScript fallback is email rather than an online submission endpoint.
- Custom field-error content, `aria-invalid`, server validation, spam controls, and abuse protection must be implemented with the future backend.
- Social controls remain hidden when verified Luit Studio profile environment variables are absent or invalid.
- Portfolio cards currently direct interested visitors to the contact page rather than dedicated case-study pages. Replace those CTAs only when verified project routes exist.
- Contact address, phone number, production domain ownership, and email ownership still require business-owner confirmation.
- HSTS and final edge/CDN headers cannot be proven until deployed over HTTPS.
- Safe-area behavior on notched devices remains a physical-device test item.
- No automated browser session was available during the audit/fix phases, so browser and assistive-technology passes must not be inferred from source validation.

## Validation

- TypeScript: passed with zero errors.
- ESLint: passed with zero warnings.
- Prettier: passed for the complete project.
- Production build: passed; all nine generated outputs are static.
- Final route metrics: `/` is 152 kB First Load JS, `/contact` is 144 kB, and shared First Load JS is 102 kB.
- Generated links: only `/`, `/contact`, valid home hash targets, email, telephone, and the skip target remain. Every generated home hash target exists.
- Progressive enhancement: generated HTML contains all 30 motion markers, the early JavaScript marker, semantic no-JavaScript mobile navigation, and the no-JavaScript form fallback. Global CSS forces marked content visible when the JavaScript marker is absent.
- Contact form: generated markup includes explicit POST action, autocomplete, required fields, and the no-JavaScript message.
- Metadata: home/contact canonical, route-specific Open Graph/Twitter output, and social image metadata are present in generated HTML.
- Social preview: `/opengraph-image` returns 200 as a 38,975-byte PNG with one-year immutable caching.
- Security: the local production response includes CSP, Referrer-Policy, Permissions-Policy, `nosniff`, and `DENY` framing. HSTS and `X-Powered-By` are absent as intended.
- Contrast: corrected body text measures 5.04:1 on white and 4.58:1 on the light surface; corrected drawer muted text measures approximately 4.76:1 on cream.
