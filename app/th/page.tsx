import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';
import { getLandingMetadata } from '@/lib/landing-metadata';
import { getLandingContent } from '@/lib/landing-content';

export const metadata: Metadata = getLandingMetadata('th');

const SITE_URL = 'https://relynplatform.com';

export default function ThPage() {
  const t = getLandingContent('th');

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RELYN',
    alternateName: 'เรลิน',
    url: `${SITE_URL}/th`,
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
      availableLanguage: ['Korean', 'Thai'],
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RELYN',
    url: `${SITE_URL}/th`,
    inLanguage: 'th-TH',
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
    name: 'RELYN แพลตฟอร์มดึงดูดผู้ป่วยต่างชาติ',
    description:
      'RELYN เป็นแพลตฟอร์ม B2B ที่เชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่ทั่วโลกเพื่อดึงดูดผู้ป่วยต่างชาติ มาตรฐานสัญญา การชำระเงินอัตโนมัติ และการจัดการข้อมูลรวมศูนย์ในระบบเดียว',
    serviceType: 'International Patient Acquisition Platform',
    provider: {
      '@type': 'Organization',
      name: 'RELYN',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    audience: [
      { '@type': 'Audience', audienceType: 'โรงพยาบาล' },
      { '@type': 'Audience', audienceType: 'เอเจนซี่' },
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

      <HomePageClient locale="th" />
    </>
  );
}
