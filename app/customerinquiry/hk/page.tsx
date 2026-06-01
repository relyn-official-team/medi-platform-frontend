import type { Metadata } from "next";
import CustomerInquiryClient from "../CustomerInquiryClient";

const TITLE = "韓國醫美療程免費查詢｜皮膚科・拉提・肉毒・水光針｜RELYN";
const DESCRIPTION =
  "RELYN 為香港客人提供韓國醫美及皮膚科療程免費查詢，涵蓋拉提、肉毒、玻尿酸填充、水光針、肌膚管理及預約支援。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.relynplatform.com/customerinquiry/hk",
    languages: {
      "ja-JP": "https://www.relynplatform.com/customerinquiry/ja",
      "zh-TW": "https://www.relynplatform.com/customerinquiry/tw",
      "zh-HK": "https://www.relynplatform.com/customerinquiry/hk",
      "x-default": "https://www.relynplatform.com/customerinquiry/ja",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.relynplatform.com/customerinquiry/hk",
    siteName: "RELYN",
    title: "韓國醫美療程免費查詢｜RELYN",
    description:
      "為香港客人提供韓國醫美、皮膚科、拉提、肉毒、水光針與預約支援等免費查詢服務。",
    locale: "zh_HK",
  },
  twitter: {
    card: "summary_large_image",
    title: "韓國醫美療程免費查詢｜RELYN",
    description:
      "香港客人可免費查詢韓國醫美、皮膚科、拉提、肉毒、水光針與預約支援。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CustomerInquiryHkPage() {
  return <CustomerInquiryClient locale="hk" />;
}
