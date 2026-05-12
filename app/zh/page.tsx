import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingMetadata } from '@/lib/landing-metadata';
import { getLandingContent } from '@/lib/landing-content';

export const metadata: Metadata = getLandingMetadata('zh');

const SITE_URL = 'https://relynplatform.com';

export default function ZhPage() {
  const t = getLandingContent('zh');

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    url: `${SITE_URL}/zh`,
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
      availableLanguage: ['Korean', 'Chinese'],
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RELYN',
    url: `${SITE_URL}/zh`,
    inLanguage: 'zh-CN',
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
    name: 'RELYN 国际患者引流平台',
    description:
      'RELYN是连接韩国医院与全球代理机构的B2B平台，专注于海外患者引流。将合同标准化、结算自动化与数据统一管理整合为一个系统，为医院和代理机构提供完整的运营架构。',
    serviceType: 'International Patient Acquisition Platform',
    provider: {
      '@type': 'Organization',
      name: 'RELYN',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    audience: [
      { '@type': 'Audience', audienceType: '医院' },
      { '@type': 'Audience', audienceType: '代理机构' },
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

      <HomePageClient locale="zh" />
    </>
  );
}
