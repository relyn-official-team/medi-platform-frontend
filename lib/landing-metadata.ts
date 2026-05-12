import type { Metadata } from 'next';
import { getLandingContent, type LandingLocale } from '@/lib/landing-content';

const SITE_URL = 'https://relynplatform.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const HREFLANG_ALTERNATES = {
  'ko-KR': `${SITE_URL}/`,
  'en-US': `${SITE_URL}/en`,
  'ja-JP': `${SITE_URL}/ja`,
  'zh-CN': `${SITE_URL}/zh`,
  'th-TH': `${SITE_URL}/th`,
  'x-default': `${SITE_URL}/`,
};

const TITLES: Record<LandingLocale, string> = {
  ko: 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼',
  en: 'RELYN | Hospital–Agency Platform for Global Patient Acquisition',
  ja: 'RELYN | 海外患者誘致向け 病院・エージェンシー連携プラットフォーム',
  zh: 'RELYN | 国际患者引流 医院与代理合作平台',
  th: 'RELYN | แพลตฟอร์มเชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่',
};

const DESCRIPTIONS: Record<LandingLocale, string> = {
  ko: 'RELYN은 해외환자 유치를 원하는 한국 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약 표준화, 정산 자동화, 데이터 통합 관리까지 해외환자 유치에 필요한 모든 운영 구조를 하나의 시스템으로 제공합니다.',
  en: 'RELYN is a B2B platform connecting Korean hospitals and global agencies for international patient acquisition. Contracts, settlements, and data operations — unified in one system.',
  ja: 'RELYNは、海外患者誘致を希望する韓国の病院とグローバルエージェンシーをつなぐB2Bプラットフォームです。契約の標準化・精算の自動化・データの一元管理まで、必要な運営体制をひとつのシステムで提供します。',
  zh: 'RELYN是连接韩国医院与全球代理机构的B2B平台，专注于海外患者引流。将合同标准化、结算自动化与数据统一管理整合为一个系统，为医院和代理机构提供完整的运营架构。',
  th: 'RELYN เป็นแพลตฟอร์ม B2B ที่เชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่ทั่วโลกเพื่อดึงดูดผู้ป่วยต่างชาติ มาตรฐานสัญญา การชำระเงินอัตโนมัติ และการจัดการข้อมูลรวมศูนย์ในระบบเดียว',
};

const KEYWORDS: Record<LandingLocale, string> = {
  ko: '해외환자 유치, 의료 에이전시, 병원 에이전시 연결, B2B 의료 플랫폼, 외국인 환자 유치, 의료 정산 자동화, 국제 의료관광, RELYN, 렐린',
  en: 'international patient acquisition, medical tourism Korea, hospital agency platform, B2B healthcare platform, foreign patient recruitment, RELYN',
  ja: '海外患者誘致, 医療エージェンシー, 病院エージェンシー連携, B2B医療プラットフォーム, 韓国医療観光, RELYN',
  zh: '国际患者引流, 韩国医疗旅游, 医院代理合作, B2B医疗平台, 海外患者招募, RELYN',
  th: 'การดึงดูดผู้ป่วยต่างชาติ, การท่องเที่ยวเชิงการแพทย์เกาหลี, แพลตฟอร์มโรงพยาบาล, RELYN',
};

const OG_ALT: Record<LandingLocale, string> = {
  ko: 'RELYN — 해외환자 유치 병원·에이전시 B2B 연결 플랫폼',
  en: 'RELYN — B2B Platform Connecting Korean Hospitals and Global Agencies',
  ja: 'RELYN — 海外患者誘致のための病院・エージェンシー連携プラットフォーム',
  zh: 'RELYN — 连接韩国医院与全球代理机构的B2B平台',
  th: 'RELYN — แพลตฟอร์ม B2B เชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่',
};

export function getLandingMetadata(locale: LandingLocale): Metadata {
  const content = getLandingContent(locale);
  const path = locale === 'ko' ? '/' : `/${locale}`;
  const url = `${SITE_URL}${path}`;

  const title = TITLES[locale];
  const description = DESCRIPTIONS[locale];

  return {
    title,
    description,
    keywords: KEYWORDS[locale],

    alternates: {
      canonical: url,
      languages: HREFLANG_ALTERNATES,
    },

    openGraph: {
      type: 'website',
      url,
      siteName: 'RELYN',
      locale: content.ogLocale,
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: OG_ALT[locale],
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@relynplatform',
      creator: '@relynplatform',
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          alt: OG_ALT[locale],
        },
      ],
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
