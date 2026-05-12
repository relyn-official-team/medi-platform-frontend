import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingMetadata } from '@/lib/landing-metadata';
import { getLandingContent } from '@/lib/landing-content';

export const metadata: Metadata = getLandingMetadata('ja');

const SITE_URL = 'https://relynplatform.com';

export default function JaPage() {
  const t = getLandingContent('ja');

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    url: `${SITE_URL}/ja`,
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
      availableLanguage: ['Korean', 'Japanese'],
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RELYN',
    url: `${SITE_URL}/ja`,
    inLanguage: 'ja-JP',
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
    name: 'RELYN 海外患者誘致プラットフォーム',
    description:
      'RELYNは、海外患者誘致を希望する韓国の病院とグローバルエージェンシーをつなぐB2Bプラットフォームです。契約の標準化・精算の自動化・データの一元管理まで、必要な運営体制をひとつのシステムで提供します。',
    serviceType: 'International Patient Acquisition Platform',
    provider: {
      '@type': 'Organization',
      name: 'RELYN',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    audience: [
      { '@type': 'Audience', audienceType: '病院' },
      { '@type': 'Audience', audienceType: 'エージェンシー' },
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

      <HomePageClient locale="ja" />
    </>
  );
}
