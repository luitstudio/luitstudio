const baseUrl = new URL(process.env.SEO_BASE_URL ?? "http://127.0.0.1:3000");
const canonicalOrigin = new URL(process.env.SEO_CANONICAL_ORIGIN ?? baseUrl.origin).origin;
const expectedPublicPaths = ["/", "/services", "/about", "/career", "/contact", "/blog"];
const failures = [];

function fail(message) {
  failures.push(message);
}

async function fetchText(path) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, { redirect: "manual" });
  if (!response.ok) {
    fail(`${url.pathname}: expected HTTP 200, received ${response.status}`);
  }
  return { url, response, text: await response.text() };
}

function readMeta(html, selector) {
  const match = html.match(selector);
  return match?.[1]?.trim() ?? "";
}

function normalizedUrl(value) {
  const url = new URL(value);
  return url.pathname === "/" ? url.origin : `${url.origin}${url.pathname}${url.search}`;
}

function validateJsonLd(html, path) {
  const scripts = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  for (const match of scripts) {
    try {
      JSON.parse(match[1]);
    } catch {
      fail(`${path}: invalid JSON-LD`);
    }
  }
}

function validateLinks(html, path) {
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (/^\/(admin|api)(?:\/|$)/.test(href)) {
      fail(`${path}: public HTML links to private route ${href}`);
    }
  }
}

const sitemap = await fetchText("/sitemap.xml");
if (!sitemap.text.startsWith('<?xml version="1.0"')) fail("sitemap: missing XML declaration");
if (!sitemap.text.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
  fail("sitemap: missing sitemap namespace");
}

const sitemapUrls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("sitemap: duplicate URLs found");
for (const value of sitemapUrls) {
  const url = new URL(value);
  if (url.origin !== canonicalOrigin) fail(`sitemap: non-canonical origin ${value}`);
  if (/^\/(admin|api)(?:\/|$)/.test(url.pathname)) fail(`sitemap: private URL ${value}`);
}

const robots = await fetchText("/robots.txt");
for (const agent of ["Googlebot", "OAI-SearchBot", "GPTBot", "ChatGPT-User"]) {
  if (!new RegExp(`User-Agent: ${agent}`, "i").test(robots.text)) {
    fail(`robots: missing explicit ${agent} policy`);
  }
}
if (!robots.text.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) {
  fail("robots: sitemap URL does not use the configured canonical origin");
}

for (const path of expectedPublicPaths) {
  const page = await fetchText(path);
  const canonical = readMeta(page.text, /<link rel="canonical" href="([^"]+)"/);
  const title = readMeta(page.text, /<title>([^<]+)<\/title>/);
  const description = readMeta(page.text, /<meta name="description" content="([^"]+)"/);
  const ogUrl = readMeta(page.text, /<meta property="og:url" content="([^"]+)"/);
  const expectedCanonical = path === "/" ? canonicalOrigin : `${canonicalOrigin}${path}`;

  if (!title) fail(`${path}: missing title`);
  if (!description) fail(`${path}: missing meta description`);
  if (!canonical || normalizedUrl(canonical) !== expectedCanonical) fail(`${path}: canonical is ${canonical || "missing"}`);
  if (!ogUrl || normalizedUrl(ogUrl) !== expectedCanonical) fail(`${path}: og:url is ${ogUrl || "missing"}`);
  if (/noindex/i.test(page.text)) fail(`${path}: unexpectedly contains noindex`);
  validateJsonLd(page.text, path);
  validateLinks(page.text, path);
}

if (failures.length > 0) {
  console.error("SEO validation failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`SEO validation passed for ${baseUrl.origin} (${sitemapUrls.length} sitemap URLs).`);
