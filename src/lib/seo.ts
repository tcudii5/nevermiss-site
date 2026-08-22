import type { Metadata } from 'next';
import { site } from '@/content/site.config';

type SeoInput = {
  title: string;
  description: string;
  /** Path only, e.g. '/pricing'. Used for canonical + OG url. */
  path?: string;
  /** Set true on utility pages (privacy, terms) you don't want ranking. */
  noIndex?: boolean;
};

/**
 * Builds per-page metadata. Every page in src/app calls this so titles,
 * canonicals, Open Graph and Twitter cards stay consistent.
 */
export function buildMetadata({ title, description, path = '/', noIndex = false }: SeoInput): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;
  const ogImage = `${site.url}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Organization + service schema injected once, in the root layout. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phoneHref,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    serviceType: [
      'AI receptionist',
      'Missed call text back',
      'Lead management CRM',
      'Marketing automation for service businesses',
    ],
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}
