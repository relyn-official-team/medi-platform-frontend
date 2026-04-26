import type { Metadata } from 'next';
import Script from 'next/script';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingMetadata } from '@/lib/landing-metadata';
import { getLandingContent } from '@/lib/landing-content';

export const metadata: Metadata = getLandingMetadata('th');

export default function ThPage() {
  const t = getLandingContent('th');

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
    name: 'RELYN แพลตฟอร์มดึงดูดผู้ป่วยต่างชาติ',
    description:
      'RELYN เป็นแพลตฟอร์ม B2B ที่เชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่ทั่วโลกเพื่อดึงดูดผู้ป่วยต่างชาติ มาตรฐานสัญญา การชำระเงินอัตโนมัติ และการจัดการข้อมูลรวมศูนย์ในระบบเดียว',
    serviceType: 'International Patient Acquisition Platform',
    provider: {
      '@type': 'Organization',
      name: 'RELYN',
      url: 'https://relynplatform.com',
    },
    areaServed: 'Worldwide',
    audience: [
      { '@type': 'Audience', audienceType: 'โรงพยาบาล' },
      { '@type': 'Audience', audienceType: 'เอเจนซี่' },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    alternateName: 'เรลิน',
    url: 'https://relynplatform.com/th',
    logo: 'https://relynplatform.com/relyn_logo.png',
    sameAs: [
      'https://pf.kakao.com/_XxgsAX',
      'https://www.instagram.com/relyn.official.team/',
    ],
  };

  return (
    <>
      <Script
        id="relyn-organization-jsonld-th"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="relyn-faq-jsonld-th"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="relyn-service-jsonld-th"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <HomePageClient locale="th" />
    </>
  );
}
