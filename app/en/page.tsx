import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingMetadata } from '@/lib/landing-metadata';
import { getLandingContent } from '@/lib/landing-content';

export const metadata: Metadata = getLandingMetadata('en');

const SITE_URL = 'https://relynplatform.com';

export default function EnPage() {
  const t = getLandingContent('en');

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    url: `${SITE_URL}/en`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/relyn_logo.png`,
      width: 200,
      height: 60,
    },
    sameAs: [
      'https://pf.kakao.com/_XxgsAX',
      'https://www.instagram.com/relyn.official.team/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'relyn.official.team@gmail.com',
      availableLanguage: ['Korean', 'English'],
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RELYN',
    url: `${SITE_URL}/en`,
    inLanguage: 'en-US',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...t.faqHospital.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
      ...t.faqAgency.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'RELYN International Patient Acquisition Platform',
    description:
      'RELYN is a B2B platform connecting Korean hospitals and global agencies for international patient acquisition. Contracts, settlements, and data operations — unified in one system.',
    serviceType: 'International Patient Acquisition Platform',
    provider: {
      '@type': 'Organization',
      name: 'RELYN',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    audience: [
      { '@type': 'Audience', audienceType: 'Hospitals' },
      { '@type': 'Audience', audienceType: 'Agencies' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <HomePageClient locale="en" />
    </>
  );
}
