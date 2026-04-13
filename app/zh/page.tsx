import type { Metadata } from 'next';
import Script from 'next/script';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingMetadata } from '@/lib/landing-metadata';

export const metadata: Metadata = getLandingMetadata('zh');

export default function ZhPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    alternateName: 'RELYN',
    url: 'https://app.relynplatform.com/zh',
    logo: 'https://app.relynplatform.com/relyn_logo.png',
    sameAs: [
      'https://pf.kakao.com/_XxgsAX',
      'https://www.instagram.com/relyn.official.team/',
    ],
  };

  return (
    <>
      <Script
        id="relyn-organization-jsonld-zh"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17991152486"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag-zh" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', 'AW-17991152486');
        `}
      </Script>

      <HomePageClient locale="zh" />
    </>
  );
}