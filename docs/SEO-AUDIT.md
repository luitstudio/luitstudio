# Technical SEO Audit — 2026-11-06

## Status

- **IMPLEMENTED:** canonical fallback changed from `https://luit.studio` to `https://luitstudio.com`.
- **IMPLEMENTED:** public crawl rules explicitly allow OAI-SearchBot and exclude `/admin/` and `/api/`.
- **IMPLEMENTED:** organization schema no longer publishes an inferred map point, phone number, price range, or unsupported LocalBusiness classification.
- **VERIFIED LOCALLY:** App Router metadata, canonical definitions, sitemap route, robots route, JSON-LD escaping, responsive component structure, and image component usage were inspected.
- **VERIFIED IN PRODUCTION:** the homepage resolves at `https://luitstudio.com` and exposes its main public navigation and service content.

## Findings and root causes

1. The source fallback used the obsolete `luit.studio` host. An unset production environment variable would generate incorrect canonicals, sitemap URLs, Open Graph URLs, and schema IDs.
2. Robots allowed all paths, including dashboard/API paths. Crawl directives now protect those non-public routes.
3. `OAI-SearchBot` was not explicitly named. It is now allowed; GPTBot remains allowed as it was, which is a distinct content-training policy decision.
4. Schema used a ProfessionalService/Organization combination, city-centre coordinates, a default WhatsApp number, and an inferred price range without a published address or verification record. It now uses a conservative Organization entity with only verified city/state/email data.
5. There is no `/work` route despite the legacy route constant pointing to `/#work`; the navigation correctly omits it. No sitemap entry was added.

## Remaining production checks

- **REQUIRES MANUAL ACTION:** confirm HTTPS, `www` → non-`www`, and legacy-domain redirects at the DNS/hosting layer.
- **REQUIRES MANUAL ACTION:** inspect rendered production `/robots.txt`, `/sitemap.xml`, all canonical tags, and Search Console after deployment.
- **REQUIRES BUSINESS INFORMATION:** public street address/service-area eligibility, verified phone number, business hours, official social profiles, and Google Business Profile URL.

## Performance note

No Core Web Vitals pass is claimed. Next Image is used for content images and local fonts are self-hosted; field data and a Lighthouse/mobile run remain required.
