import type { Metadata } from 'next';
import { getLandingContent, type LandingLocale } from '@/lib/landing-content';

const SITE_URL = 'https://relynplatform.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function getLandingMetadata(locale: LandingLocale): Metadata {
  const content = getLandingContent(locale);

  const path = locale === 'ko' ? '/' : `/${locale}`;
  const url = `${SITE_URL}${path}`;

  const title =
    locale === 'ko'
      ? 'RELYN | 해외환자 유치 병원·에이전시 연결 플랫폼'
      : locale === 'en'
      ? 'RELYN | Hospital–Agency Platform for Global Patient Acquisition'
      : locale === 'ja'
      ? 'RELYN | 海外患者誘致向け 病院・エージェンシー連携プラットフォーム'
      : locale === 'zh'
      ? 'RELYN | 国际患者引流 医院与代理合作平台'
      : 'RELYN | แพลตฟอร์มเชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่';

  const description =
    locale === 'ko'
      ? 'RELYN은 해외환자 유치를 원하는 한국 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약 표준화, 정산 자동화, 데이터 통합 관리까지 해외환자 유치에 필요한 모든 운영 구조를 하나의 시스템으로 제공합니다.'
      : locale === 'en'
      ? 'RELYN is a B2B platform connecting Korean hospitals and global agencies for international patient acquisition. Contracts, settlements, and data operations — unified in one system.'
      : locale === 'ja'
      ? 'RELYNは、海外患者誘致を希望する韓国の病院とグローバルエージェンシーをつなぐB2Bプラットフォームです。契約の標準化・精算の自動化・データの一元管理まで、必要な運営体制をひとつのシステムで提供します。'
      : locale === 'zh'
      ? 'RELYN是连接韩国医院与全球代理机构的B2B平台，专注于海外患者引流。将合同标准化、结算自动化与数据统一管理整合为一个系统，为医院和代理机构提供完整的运营架构。'
      : 'RELYN เป็นแพลตฟอร์ม B2B ที่เชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่ทั่วโลกเพื่อดึงดูดผู้ป่วยต่างชาติ มาตรฐานสัญญา การชำระเงินอัตโนมัติ และการจัดการข้อมูลรวมศูนย์ในระบบเดียว';

  return {
    title,
    description,

    alternates: {
      canonical: url,
      languages: {
        ko: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        ja: `${SITE_URL}/ja`,
        zh: `${SITE_URL}/zh`,
        th: `${SITE_URL}/th`,
      },
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
          alt: 'RELYN',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
