import type { Metadata } from "next";
import B2BThailandLandingClient from "./B2BThailandLandingClient";
import { faqs } from "./content-ko";

const TITLE = "RELYN | 태국 임직원을 위한 한국 미용시술 무료상담";
const DESCRIPTION =
  "한국 미용시술을 고민하는 태국 기업 임직원을 위한 무료 상담 페이지입니다. RELYN이 고민 부위, 방문 일정, 예산을 확인한 뒤 한국 현지 기준으로 상담과 예약 조율을 도와드립니다.";
const CANONICAL_URL = "https://www.relynplatform.com/customerinquiry/b2b";
const THAI_URL = `${CANONICAL_URL}/th`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      "ko-KR": CANONICAL_URL,
      "th-TH": THAI_URL,
      "x-default": CANONICAL_URL,
    },
  },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    siteName: "RELYN",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ko_KR",
    alternateLocale: ["th_TH"],
    images: [
      {
        url: "/customerinquiry/b2b/hero-thailand.png",
        width: 1708,
        height: 920,
        alt: "태국 임직원을 위한 RELYN 한국 미용시술 상담",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/customerinquiry/b2b/hero-thailand.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KoreanB2BLandingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "태국 임직원을 위한 한국 미용시술 무료상담",
    description: DESCRIPTION,
    provider: {
      "@type": "Organization",
      name: "RELYN",
      url: "https://www.relynplatform.com/",
      logo: "https://www.relynplatform.com/relyn_logo.png",
    },
    areaServed: "Thailand",
    serviceType: "Korean beauty consultation and booking coordination",
    url: CANONICAL_URL,
    availableLanguage: ["ko", "th"],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <B2BThailandLandingClient locale="ko" />
    </>
  );
}
