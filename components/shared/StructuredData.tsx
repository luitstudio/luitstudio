import { contactDetails } from "@/config/contact";
import { contactSocialLinks } from "@/config/social";
import { siteConfig } from "@/config/site";
import { studioLocation } from "@/config/studio";
import { services } from "@/components/sections/services/service-data";
import { getPublishedTeamMembers } from "@/lib/team";

const AREA_SERVED = ["Guwahati", "Assam", "Northeast India", "India"];

function buildOrganizationSchema() {
  // City/state and email are verified in the site. Do not add a public street
  // address, geo point, phone, ratings, price range, or LocalBusiness subtype
  // until those facts and eligibility are verified for public use.
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    image: `${siteConfig.url}/icon-512.png`,
    email: contactDetails.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: studioLocation.city,
      addressRegion: studioLocation.state,
      addressCountry: studioLocation.countryCode,
    },
    areaServed: AREA_SERVED,
    ...(contactSocialLinks.length > 0
      ? { sameAs: contactSocialLinks.map((link) => link.href) }
      : {}),
  };
}

function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

function buildServiceSchemas() {
  return services.map((service) => ({
    "@type": "Service",
    "@id": `${siteConfig.url}/#service-${service.id}`,
    name: service.title,
    description: service.description,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: AREA_SERVED,
  }));
}

async function buildPersonSchemas() {
  const members = await getPublishedTeamMembers();

  return members.map((member) => ({
    "@type": "Person",
    "@id": `${siteConfig.url}/#person-${member.id}`,
    name: member.name,
    jobTitle: member.role,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    ...(member.imageUrl ? { image: member.imageUrl } : {}),
  }));
}

export async function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      ...buildServiceSchemas(),
      ...(await buildPersonSchemas()),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
