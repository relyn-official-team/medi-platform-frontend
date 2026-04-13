import type { Metadata } from 'next';
import Script from 'next/script';
import HomePageClient from '@/components/pages/HomePageClient';

export const metadata: Metadata = {
  title: 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼',
  description:
    'RELYN은 해외환자 유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약, 정산, 데이터 운영을 하나의 구조로 통합합니다.',
  alternates: {
    canonical: 'https://app.relynplatform.com/',
  },
  openGraph: {
    type: 'website',
    url: 'https://app.relynplatform.com/',
    siteName: 'RELYN',
    title: 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼',
    description:
      'RELYN은 해외환자 유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약, 정산, 데이터 운영을 하나의 구조로 통합합니다.',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://app.relynplatform.com/og-image.png',
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
    images: ['https://app.relynplatform.com/og-image.png'],
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    alternateName: '렐린',
    url: 'https://app.relynplatform.com/',
    logo: 'https://app.relynplatform.com/relyn_logo.png',
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
        src="https://www.googletagmanager.com/gtag/js?id=AW-17991152486"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', 'AW-17991152486');
        `}
      </Script>

      <HomePageClient />
    </>
  );
}