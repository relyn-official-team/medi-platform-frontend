import type { Metadata } from "next";
import B2BThailandLandingClient from "../B2BThailandLandingClient";
import { faqs } from "../content";

const TITLE = "RELYN | ปรึกษาหัตถการความงามที่เกาหลีฟรี สำหรับพนักงานบริษัทในประเทศไทย";
const DESCRIPTION =
  "หน้าปรึกษาฟรีสำหรับพนักงานบริษัทในประเทศไทยที่สนใจหัตถการความงามในเกาหลี RELYN ช่วยสอบถามปัญหา กำหนดการ และงบประมาณ พร้อมประสานข้อมูลและการจองในเกาหลี";
const KOREAN_URL = "https://www.relynplatform.com/customerinquiry/b2b";
const CANONICAL_URL = `${KOREAN_URL}/th`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      "ko-KR": KOREAN_URL,
      "th-TH": CANONICAL_URL,
      "x-default": KOREAN_URL,
    },
  },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    siteName: "RELYN",
    title: TITLE,
    description: DESCRIPTION,
    locale: "th_TH",
    alternateLocale: ["ko_KR"],
    images: [
      {
        url: "/customerinquiry/b2b/hero-thailand.png",
        width: 1708,
        height: 920,
        alt: "RELYN Korean beauty consultation for employees in Thailand",
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

export default function ThailandB2BLandingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "บริการปรึกษาหัตถการความงามที่เกาหลีสำหรับพนักงานบริษัทในประเทศไทย",
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
    availableLanguage: ["th", "ko"],
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
      <B2BThailandLandingClient locale="th" />
    </>
  );
}
