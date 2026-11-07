# Phase 2 — Production SEO and Local Search Growth

Date: 2026-11-06

## 1. Production deployment checklist

| Check | Status | Exact requirement |
| --- | --- | --- |
| Canonical host | IMPLEMENTED IN CODE | Set `NEXT_PUBLIC_SITE_URL=https://luitstudio.com` in production; do not include a trailing slash. |
| HTTPS | REQUIRES MANUAL ACTION | Redirect every `http://` request to the equivalent `https://` URL with one permanent redirect. |
| www host | REQUIRES MANUAL ACTION | Redirect `https://www.luitstudio.com/*` to `https://luitstudio.com/*` with one permanent redirect. |
| Legacy host | REQUIRES MANUAL ACTION | If `luit.studio` is controlled, redirect its HTTP/HTTPS and www variants path-for-path to `https://luitstudio.com`. |
| Sitemap | VERIFIED LOCALLY | Confirm `https://luitstudio.com/sitemap.xml` returns HTTP 200 and contains only canonical public URLs after deployment. |
| Robots | VERIFIED LOCALLY | Confirm `https://luitstudio.com/robots.txt` returns HTTP 200, references the sitemap, allows Googlebot/OAI-SearchBot, and blocks `/admin/`/`/api/`. |
| Canonicals | IMPLEMENTED IN CODE | Spot-check rendered `<link rel="canonical">` on `/`, `/services`, `/about`, `/contact`, `/blog`, and one article. |
| Structured data | IMPLEMENTED IN CODE | Validate the rendered Organization/WebSite/Service/Breadcrumb/Article markup with Google Rich Results Test and Schema Markup Validator. |

### Hosting redirect requirements

Configure redirects at the CDN, hosting provider, reverse proxy, or load balancer—where TLS terminates—rather than in Next.js. Preserve the path and query string, use 301/308 permanent redirects, and avoid redirect chains. The repository does not identify the provider, so no platform configuration was changed.

Required test matrix after deployment:

| Request | Expected final URL |
| --- | --- |
| `http://luitstudio.com/services?ref=test` | `https://luitstudio.com/services?ref=test` |
| `https://www.luitstudio.com/services?ref=test` | `https://luitstudio.com/services?ref=test` |
| `http://www.luitstudio.com/services?ref=test` | `https://luitstudio.com/services?ref=test` |
| `https://luit.studio/services?ref=test` (if owned) | `https://luitstudio.com/services?ref=test` |

## 2. Google Search Console setup

1. **REQUIRES MANUAL ACTION:** add a Domain property for `luitstudio.com` and verify it with a DNS TXT record. This covers protocol and subdomain variants.
2. Add an HTTPS URL-prefix property for `https://luitstudio.com/` if granular reporting is useful.
3. Submit `https://luitstudio.com/sitemap.xml`; check the fetch result, discovered URLs, and last-read date.
4. Inspect URL Inspection for the homepage, services, about, contact, blog, and one published article: selected canonical must be the `.com` page and indexing must be allowed.
5. Review Page indexing, Mobile Usability, Core Web Vitals, HTTPS, and Enhancements after Google has crawled the deployment.
6. Use Performance > Search results with a 28-day baseline; segment Brand/non-brand queries, country, device, page, and search appearance. Export before making material content changes.

No Search Console data was available or fabricated.

## 3. Local landing-page opportunities

| Location | Decision | Reason / evidence needed |
| --- | --- | --- |
| Guwahati | Do not add a separate page now | Location is already prominent on the homepage, About, Contact, metadata, and Organization entity. A duplicate page would not add enough value yet. |
| Jorhat | Not implemented | No verified local client, service evidence, or distinct local material in the repository. |
| Dibrugarh | Not implemented | Same evidence gap. |
| Silchar | Not implemented | Same evidence gap. |
| Tezpur | Not implemented | Same evidence gap. |

Create a city page only when it has a unique local introduction, documented service availability, permissioned local proof, locally useful guidance/FAQs, and a contact path. A city name substituted into otherwise identical content is prohibited.

## 4. Industry-page opportunities

| Industry | Decision | Evidence / next step |
| --- | --- | --- |
| Hospitality and hotels | Candidate only | `Madhab Lodge` appears in the approved client-logo set, but the repository does not verify project scope, permission for a case study, or results. Obtain client approval and factual scope before a hospitality page. |
| Restaurants and cafes | Not implemented | No verified project example or distinct offering evidence. |
| Startups | Candidate only | Web/app development and AI automation capabilities can be relevant, but no permissioned startup portfolio evidence is recorded. |
| Local businesses | Do not create a separate page now | The core site already addresses businesses broadly; add only after publishing sector-specific examples and requirements. |
| Professional services | Not implemented | No verified sector evidence. |

## 5. Conversion tracking

The existing GA integration remains opt-in through `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Implemented GA4 events are:

| Event | Trigger | Parameters |
| --- | --- | --- |
| `generate_lead` | Successful contact-form response | `method=contact_form`, `page_path`, `service_interest`, `budget_range` |
| `contact_whatsapp` | Header, mobile menu, footer, contact-panel, or floating WhatsApp click | `location`, `page_path` |
| `contact_email` | Footer or contact-panel email click | `location`, `page_path` |
| `book_call` | Any Cal booking CTA click | `location=cta`, `page_path` |

**REQUIRES MANUAL ACTION:** configure the measurement ID in production; use GA4 DebugView to verify events; mark `generate_lead` as a key event. Confirm Cal booking completion separately through its webhook/integration before treating a CTA click as a completed appointment. Organic landing-page conversion is measured by combining the GA4 Organic Search session channel with `generate_lead`, landing page, and source/medium reports.

## 6. Ranking baseline framework

Use [RANKING-BASELINE.csv](RANKING-BASELINE.csv) as a zero-data baseline. Record Search Console average position and clicks/impressions only after the property has data. Use a rank tracker only with a fixed Guwahati location/device/language configuration and record the date, provider, and SERP features; never mix tool estimates with Search Console values.

`SEO agency Guwahati` is retained only as a monitored market query. Do not target it in metadata or create a service page unless SEO becomes a verified, published Luit Studio offering.

## Exact manual actions

1. Set production `NEXT_PUBLIC_SITE_URL` and GA measurement environment values.
2. Configure and test permanent HTTPS, www, and legacy-domain redirects at the host/CDN.
3. Deploy only after checking the redirect matrix, sitemap, robots, canonical source, and JSON-LD on the live host.
4. Verify the Search Console domain property, submit sitemap, and export a 28-day zero-data/initial baseline.
5. Mark verified lead events as GA4 key events; verify no PII appears in event parameters.
6. Provide permissioned case-study facts before authorizing city or industry pages.
