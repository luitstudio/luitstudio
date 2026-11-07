# Phase 1 Final Completion — Technical SEO Foundation

Audit date: 2026-11-07

## Technical SEO audit

- **FIXED IN CODE:** `config/site.ts` is the canonical URL source, defaulting to `https://luitstudio.com` without a trailing slash. App Router metadata, Open Graph, Twitter, sitemap, robots, and schema consume that source.
- **VERIFIED LOCALLY:** the rendered production build exposes canonical, title, description, Open Graph URL, valid JSON-LD, sitemap, and robots outputs for `/`, `/services`, `/about`, `/career`, `/contact`, and `/blog`.
- **REQUIRES DEPLOYMENT:** the deployed site must use `NEXT_PUBLIC_SITE_URL=https://luitstudio.com`; an environment override using another host would create conflicting signals.

## Sitemap implementation

- **FIXED IN CODE:** removed `changeFrequency` and `priority`; search engines treat them as hints and no source of truth exists for them here.
- **FIXED IN CODE:** static public URLs are canonical HTTPS URLs only. Posts receive `lastModified` from their actual `updatedAt` field.
- **FIXED IN CODE:** published job pages are included only if they contain a meaningful summary and description plus responsibilities and requirements. This prevents thin application pages from becoming sitemap entries.
- **VERIFIED LOCALLY:** the generated sitemap has the correct XML namespace, no duplicate URL values, no `/admin`/`/api` URLs, and eight current public entries.

### Career application-page decision

| Route | Decision | Reason |
| --- | --- | --- |
| `/career/apply` | `noindex, follow` | General application form without independently useful recruitment content. |
| `/career/apply/product-designer` | Conditional indexability | Indexable only if it is a published opening with substantial role content. |
| `/career/apply/full-stack-developer` | Conditional indexability | Same rule. |
| `/career/apply/visual-designer` | Conditional indexability | Same rule. |
| `/career/apply/video-editor-motion-designer` | Conditional indexability | Same rule. |

The repository does not contain a fixture or database export for these named roles, so their live content was not assumed. The CMS rule is evaluated from each published record.

## Robots implementation and crawler readiness

- **FIXED IN CODE:** valid `User-Agent` directives exist for `*`, Googlebot, OAI-SearchBot, GPTBot, and ChatGPT-User; all allow public content and disallow `/admin/` and `/api/`.
- **FIXED IN CODE:** the canonical sitemap URL is emitted from the same canonical host source.
- **VERIFIED LOCALLY:** robots syntax and all required crawler declarations pass `npm.cmd run seo:validate`.
- **REQUIRES MANUAL ACTION:** GPTBot is explicitly allowed under the existing policy. It is independent from OAI-SearchBot and ChatGPT-User. Retain, disallow, or change GPTBot only after the business makes a documented content-training decision; allowing it does not guarantee training, citation, or recommendation.

## Metadata and structured data

- **VERIFIED LOCALLY:** important public routes have unique page metadata, canonical URLs, and Open Graph URLs in rendered HTML; none emitted `noindex`.
- **VERIFIED LOCALLY:** all rendered JSON-LD blocks parse as JSON. The existing factual graph contains Organization, WebSite, Service, Person (when published), BreadcrumbList, and Article markup where applicable.
- **FIXED IN CODE (prior phase retained):** unverified phone, street address, map coordinates, reviews, price range, and LocalBusiness classification are absent from Organization schema.

## Redirect/domain findings

- **REQUIRES DEPLOYMENT:** configure redirects at the CDN, host, reverse proxy, or load balancer where TLS terminates. The provider is not identifiable in the repository, so no infrastructure was changed.
- Use one 301 or 308 redirect while preserving path and query string:
  - `http://luitstudio.com/*` → `https://luitstudio.com/*`
  - `https://www.luitstudio.com/*` → `https://luitstudio.com/*`
  - `http://www.luitstudio.com/*` → `https://luitstudio.com/*`
  - `https://luit.studio/*` → `https://luitstudio.com/*` only if the legacy domain is owned and intentionally retired.
- Keep the host’s trailing-slash behavior consistent; it must not create chains, loops, or a canonical URL that redirects.

## Automated validation

| Command | Result |
| --- | --- |
| `npm.cmd run typecheck` | **VERIFIED LOCALLY** — passed |
| `npm.cmd run lint` | **VERIFIED LOCALLY** — passed with zero warnings |
| `npm.cmd run build` | **VERIFIED LOCALLY** — passed |
| `npm.cmd run seo:validate` with local server | **VERIFIED LOCALLY** — passed; validates sitemap XML/namespace/URLs, crawler directives, metadata, canonical uniqueness, Open Graph URLs, JSON-LD parsing, noindex conflicts, and visible private links |
| `git diff --check` | **VERIFIED LOCALLY** — passed |

Run locally after a build:

```powershell
$env:PORT='3006'; npm.cmd run start
# In another shell:
$env:SEO_BASE_URL='http://127.0.0.1:3006'
$env:SEO_CANONICAL_ORIGIN='https://luitstudio.com'
npm.cmd run seo:validate
```

For a deployed check, use:

```powershell
$env:SEO_BASE_URL='https://luitstudio.com'
$env:SEO_CANONICAL_ORIGIN='https://luitstudio.com'
npm.cmd run seo:validate
```

## Production verification checklist

**REQUIRES MANUAL ACTION:** after deployment, run the following and retain the response headers/output in the release record:

```powershell
Invoke-WebRequest -Uri 'https://luitstudio.com/' -Method Head
Invoke-WebRequest -Uri 'https://luitstudio.com/sitemap.xml' -UseBasicParsing
Invoke-WebRequest -Uri 'https://luitstudio.com/robots.txt' -UseBasicParsing
Invoke-WebRequest -Uri 'http://luitstudio.com/' -MaximumRedirection 5
Invoke-WebRequest -Uri 'https://www.luitstudio.com/' -MaximumRedirection 5
```

Confirm a 200 response for the canonical homepage/sitemap/robots endpoints; a single permanent redirect for HTTP, `www`, and any legacy host; and no redirect from a page’s canonical URL. Test crawler delivery with request headers such as `User-Agent: Googlebot` and `User-Agent: OAI-SearchBot`, and use Google Rich Results Test/Schema Markup Validator for live rendered JSON-LD.

## Google Search Console handoff

1. **REQUIRES MANUAL ACTION:** verify a Domain property for `luitstudio.com` using DNS TXT.
2. Submit `https://luitstudio.com/sitemap.xml` and wait for its processing status.
3. Inspect `/`, `/services`, `/about`, `/contact`, `/blog`, and a published article. Confirm Google-selected canonical matches the declared `.com` canonical.
4. Review Page indexing, HTTPS, Mobile Usability, Core Web Vitals, and Enhancements after recrawl.
5. Export the first 28-day Performance report (queries, pages, clicks, impressions, CTR, and average position) as the baseline. Do not record estimated values as Search Console data.

## Remaining limitations

- **REQUIRES DEPLOYMENT:** live production headers, redirect paths, live XML/text responses, cache/CDN behavior, and live schema cannot be certified from repository checks.
- **REQUIRES MANUAL ACTION:** validate the current live job-page records before expecting them to be indexed; sparse job records will correctly remain out of the sitemap.
- No rankings, Search Console metrics, business facts, or crawler outcomes were invented.
