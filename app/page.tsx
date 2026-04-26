import type { Metadata } from 'next';
import Script from 'next/script';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingContent } from '@/lib/landing-content';

export const metadata: Metadata = {
  title: 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼',
  description:
    'RELYN은 해외환자 유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약, 정산, 데이터 운영을 하나의 구조로 통합합니다.',

  other: {
    'facebook-domain-verification': 'psqn7o0pxyhbx2y3yd26db36r77ufr',
  },
  openGraph: {
    type: 'website',
    url: 'https://relynplatform.com/',
    siteName: 'RELYN',
    title: 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼',
    description:
      'RELYN은 해외환자 유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약, 정산, 데이터 운영을 하나의 구조로 통합합니다.',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://relynplatform.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RELYN',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼',
    description:
      'RELYN은 해외환자 유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다.',
    images: ['https://relynplatform.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function Page() {
  const t = getLandingContent('ko');

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
    alternateName: '렐린',
    url: 'https://relynplatform.com/',
    logo: 'https://relynplatform.com/relyn_logo.png',
    sameAs: [
      'https://pf.kakao.com/_XxgsAX',
      'https://www.instagram.com/relyn.official.team/',
    ],
  };

  return (
    <>
      <Script
        id="relyn-organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="relyn-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HomePageClient />
      
      {/* SEO용 내부 링크 (숨김 처리) */}
      <div style={{ display: 'none' }}>
        <a href="/en">English</a>
        <a href="/ja">Japanese</a>
        <a href="/zh">Chinese</a>
      </div>
    </>
  );
}