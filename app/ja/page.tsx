import type { Metadata } from 'next';
import Script from 'next/script';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingMetadata } from '@/lib/landing-metadata';
import { getLandingContent } from '@/lib/landing-content';

export const metadata: Metadata = getLandingMetadata('ja');

export default function JaPage() {
  const t = getLandingContent('ja');

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    alternateName: 'RELYN',
    url: 'https://relynplatform.com/ja',
    logo: 'https://relynplatform.com/relyn_logo.png',
    sameAs: [
      'https://pf.kakao.com/_XxgsAX',
      'https://www.instagram.com/relyn.official.team/',
    ],
  };

  return (
    <>
      <Script
        id="relyn-organization-jsonld-ja"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="relyn-faq-jsonld-ja"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HomePageClient locale="ja" />
    </>
  );
}