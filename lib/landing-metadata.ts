import type { Metadata } from 'next';
import { getLandingContent, type LandingLocale } from '@/lib/landing-content';

const SITE_URL = 'https://app.relynplatform.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function getLandingMetadata(locale: LandingLocale): Metadata {
  const content = getLandingContent(locale);

  const path = locale === 'ko' ? '/' : `/${locale}`;
  const url = `${SITE_URL}${path}`;

  return {
    title:
      locale === 'ko'
        ? 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼'
        : locale === 'en'
        ? 'RELYN | Hospital–Agency Platform for Global Patient Acquisition'
        : locale === 'ja'
        ? 'RELYN | 海外患者誘致向け 病院・エージェンシー連携プラットフォーム'
        : 'RELYN | 国际患者引流 医院与代理合作平台',
    description:
      locale === 'ko'
        ? 'RELYN은 해외환자 유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약, 정산, 데이터 운영을 하나의 구조로 통합합니다.'
        : locale === 'en'
        ? 'RELYN is a B2B platform connecting hospitals and global agencies for patient acquisition, integrating contracts, settlements, and data operations into one structure.'
        : locale === 'ja'
        ? 'RELYNは、海外患者誘致を目指す病院とグローバルエージェンシーをつなぐB2Bプラットフォームです。契約・精算・データ運営を一つの構造に統合します。'
        : 'RELYN 是连接医院与全球代理机构的 B2B 平台，将合同、结算与数据运营整合为统一结构。',

    alternates: {
      canonical: url,
      languages: {
        ko: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        ja: `${SITE_URL}/ja`,
        zh: `${SITE_URL}/zh`,
      },
    },

    openGraph: {
      type: 'website',
      url,
      siteName: 'RELYN',
      locale: content.ogLocale,
      title:
        locale === 'ko'
          ? 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼'
          : locale === 'en'
          ? 'RELYN | Hospital–Agency Platform for Global Patient Acquisition'
          : locale === 'ja'
          ? 'RELYN | 海外患者誘致向け 病院・エージェンシー連携プラットフォーム'
          : 'RELYN | 国际患者引流 医院与代理合作平台',
      description:
        locale === 'ko'
          ? 'RELYN은 해외환자 유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약, 정산, 데이터 운영을 하나의 구조로 통합합니다.'
          : locale === 'en'
          ? 'RELYN is a B2B platform connecting hospitals and global agencies for patient acquisition, integrating contracts, settlements, and data operations into one structure.'
          : locale === 'ja'
          ? 'RELYNは、海外患者誘致を目指す病院とグローバルエージェンシーをつなぐB2Bプラットフォームです。契約・精算・データ運営を一つの構造に統合します。'
          : 'RELYN 是连接医院与全球代理机构的 B2B 平台，将合同、结算与数据运营整合为统一结构。',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'RELYN',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title:
        locale === 'ko'
          ? 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼'
          : locale === 'en'
          ? 'RELYN | Hospital–Agency Platform for Global Patient Acquisition'
          : locale === 'ja'
          ? 'RELYN | 海外患者誘致向け 病院・エージェンシー連携プラットフォーム'
          : 'RELYN | 国际患者引流 医院与代理合作平台',
      description:
        locale === 'ko'
          ? 'RELYN은 해외환자 유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다.'
          : locale === 'en'
          ? 'RELYN is a B2B platform connecting hospitals and global agencies for patient acquisition.'
          : locale === 'ja'
          ? 'RELYNは、海外患者誘致を目指す病院とグローバルエージェンシーをつなぐB2Bプラットフォームです。'
          : 'RELYN 是连接医院与全球代理机构的 B2B 平台。',
      images: [OG_IMAGE],
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
}