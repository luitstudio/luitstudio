# 13. SEO Report

## Scope and method

This audit covers generated metadata for every built route, canonical handling, Open Graph and Twitter output, robots, sitemap, favicon, crawlable navigation, language declaration, and structured-data opportunities. Findings are based on the optimized static output rather than configuration intent alone.

## Current generated metadata

| Route         | Title                                | Description                                       | Canonical                  | Indexing                      |
| ------------- | ------------------------------------ | ------------------------------------------------- | -------------------------- | ----------------------------- |
| `/`           | `Luit Studio — Creative Agency`      | Present and relevant                              | Missing                    | Allowed                       |
| `/contact`    | `Contact                             | Luit Studio`                                      | Present and route-specific | `https://luitstudio.com/contact` | Allowed |
| Framework 404 | `404: This page could not be found.` | Inherits default metadata in the generated stream | None                       | `noindex`                     |

Verified global output:

- `<html lang="en">` is present.
- `metadataBase` uses `NEXT_PUBLIC_SITE_URL`, falling back to `https://luitstudio.com`.
- Title template, description, application name, author, creator, Open Graph, and Twitter metadata are server-generated.
- `robots.txt`, `sitemap.xml`, and an SVG favicon build successfully.
- No client-side metadata library or duplicate runtime SEO layer is present.

## Findings

| ID     | Severity      | Finding                                                                                | Impact                                                                                                                                                                                                                                                  | Recommendation                                                                                                                                                                      |
| ------ | ------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEO-01 | High          | Production navigation contains broken destinations.                                    | `/#team`, `/#awards`, and `/#blog` have no matching element in the generated home page. `/documentation`, `/privacy-policy`, and `/terms-and-conditions` have no page route. These create dead navigation, poor crawler signals, and user trust issues. | Remove the links until content exists or implement the real destinations in an approved feature phase. Do not create placeholder pages solely for SEO.                              |
| SEO-02 | High          | Social-profile links are generic platform roots rather than verified company profiles. | X, Instagram, LinkedIn, Dribbble, and GitHub links can send users away without reaching Luit Studio. They must not be used as structured-data `sameAs` values.                                                                                          | Replace only with verified company URLs supplied by the owner; otherwise remove them from production navigation.                                                                    |
| SEO-03 | Medium        | The home page has no canonical link.                                                   | Open Graph URL is present, but canonicalization is not explicit for the primary route.                                                                                                                                                                  | Add a home canonical derived from the verified production site URL.                                                                                                                 |
| SEO-04 | Medium        | Social cards declare `summary_large_image` without an image.                           | Neither Open Graph nor Twitter output includes an image, so previews may be text-only or inconsistent.                                                                                                                                                  | Add a purpose-built, brand-approved social image and dimensions after an asset is supplied. Do not fabricate imagery.                                                               |
| SEO-05 | Medium        | Contact Twitter metadata is inaccurate.                                                | The generated contact page inherits the global Twitter title and description instead of its route-specific contact metadata.                                                                                                                            | Add route-specific Twitter fields when a verified social preview strategy is approved.                                                                                              |
| SEO-06 | Medium        | Contact Open Graph output is incomplete.                                               | The contact page emits title, description, and URL, but generated output lacks the global `og:site_name` and `og:type` fields because nested metadata is replaced rather than deeply merged.                                                            | Compose complete Open Graph objects per route through a shared helper or explicit fields in a later metadata change.                                                                |
| SEO-07 | Low           | Sitemap `lastModified` uses `new Date()` at build time.                                | Every deployment makes unchanged pages appear newly modified, reducing the signal’s accuracy.                                                                                                                                                           | Use a real content modification date from source control/CMS, or omit `lastModified` until that data exists.                                                                        |
| SEO-08 | Low           | Favicon coverage is minimal.                                                           | An SVG favicon is present, but no PNG fallback or Apple touch icon is provided. The current white mark may have low visibility on light browser chrome.                                                                                                 | Test the supplied favicon in light/dark browser UI and add approved fallback/touch assets if needed.                                                                                |
| SEO-09 | Informational | No web app manifest exists.                                                            | A manifest is not required for a conventional agency website, but installability and richer mobile home-screen metadata are unavailable.                                                                                                                | Add a manifest only if PWA/installable behavior becomes a product requirement.                                                                                                      |
| SEO-10 | Informational | Structured data is absent.                                                             | Search engines receive standard metadata but no Organization/WebSite entity graph. Current contact and social values have not been verified as real company data.                                                                                       | After owner verification, consider `Organization` or the most accurate agency subtype plus `WebSite`. Include only factual name, URL, logo, contact details, and verified profiles. |

## Robots and sitemap audit

### Robots

- Allows all user agents.
- References `https://luitstudio.com/sitemap.xml` through the configured base URL.
- Framework not-found output includes `noindex`.
- No accidental site-wide `noindex` directive was found.

### Sitemap

- Includes only `/` and `/contact`, the two real application pages.
- Uses absolute URLs.
- Does not include the broken legal/documentation destinations.
- Uses reasonable change-frequency and priority hints, though search engines may ignore them.
- Build-time `lastModified` values should be replaced with factual dates or removed.

## Crawlability and content

- Primary content is server-rendered into static HTML.
- Page titles and descriptions are readable without JavaScript.
- Heading structure clearly identifies the agency’s services and work.
- Portfolio destinations all currently point to the same third-party Framer example URL. This should be confirmed as intentional before launch.
- The blog dataset is empty and the section renders nothing. A mobile link still points to `/#blog`, producing a nonexistent anchor.
- Footer links to unimplemented legal/documentation routes should not ship as if complete.

## Structured-data opportunities

Do not add schema until the business data is verified. Once verified, the safest opportunities are:

1. `Organization` with official name, canonical URL, approved logo, factual contact information, and verified `sameAs` profiles.
2. `WebSite` linked to the same organization entity.
3. `BreadcrumbList` only when real nested routes exist.
4. `Article` only when actual blog detail pages and editorial data exist.
5. `Service` only when each service has sufficient factual detail and a stable destination.

Do not use review/rating schema for the visual testimonials without evidence that the content and eligibility meet search-engine policies.

## Manual SEO QA checklist

- [ ] Verify ownership and canonical spelling of the production domain.
- [ ] Verify the deployed `NEXT_PUBLIC_SITE_URL` value.
- [ ] Confirm every public navigation link returns 200 or intentionally redirects.
- [ ] Validate `robots.txt` and `sitemap.xml` on the deployed origin.
- [ ] Inspect the home and contact pages in search-engine rich-result tools.
- [ ] Test Open Graph previews after an approved image is provided.
- [ ] Test Twitter/X previews after route-specific metadata is added.
- [ ] Confirm favicon visibility in light and dark browser chrome.
- [ ] Confirm legal, documentation, portfolio, contact, and social destinations with the business owner.
- [ ] Verify that any future structured data exactly matches visible, factual content.

## SEO release recommendation

SEO foundations are good, but SEO-01 and SEO-02 are production blockers. Canonical and social-preview issues should be resolved before a public launch campaign or link-sharing rollout.
