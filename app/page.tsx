import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingContent } from '@/lib/landing-content';
import { getLandingMetadata } from '@/lib/landing-metadata';

export const metadata: Metadata = {
  ...getLandingMetadata('ko'),
  other: {
    'facebook-domain-verification': 'psqn7o0pxyhbx2y3yd26db36r77ufr',
  },
};

const SITE_URL = 'https://relynplatform.com';

export default function Page() {
  const t = getLandingContent('ko');

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    alternateName: ['렐린', 'Relyn Platform'],
    url: `${SITE_URL}/`,
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
    url: `${SITE_URL}/`,
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/auth/agency/hospitalslist?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
    name: 'RELYN 해외환자 유치 플랫폼',
    description:
      'RELYN은 해외환자 유치를 원하는 한국 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약 표준화, 정산 자동화, 데이터 통합 관리까지 해외환자 유치에 필요한 모든 운영 구조를 하나의 시스템으로 제공합니다.',
    serviceType: 'International Patient Acquisition Platform',
    provider: {
      '@type': 'Organization',
      name: 'RELYN',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    audience: [
      { '@type': 'Audience', audienceType: '병원' },
      { '@type': 'Audience', audienceType: '에이전시' },
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      description: '무료로 시작하는 해외환자 유치 플랫폼',
    },
  };

  return (
    <>
      {/* JSON-LD: 서버 렌더링으로 크롤러가 즉시 읽도록 일반 script 태그 사용 */}
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

      <HomePageClient />

      {/* 다국어 페이지 내부 링크 — 시각적으로 숨기되 크롤러에는 노출 */}
      <nav aria-label="언어 선택" className="sr-only">
        <a href="/en">English version</a>
        <a href="/ja">日本語版</a>
        <a href="/zh">中文版</a>
        <a href="/th">ภาษาไทย</a>
      </nav>
    </>
  );
}
