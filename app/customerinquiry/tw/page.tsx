import type { Metadata } from "next";
import CustomerInquiryClient from "../CustomerInquiryClient";

const TITLE = "韓國醫美療程免費諮詢｜皮膚科・拉提・肉毒・水光針｜RELYN";
const DESCRIPTION =
  "RELYN 為台灣顧客提供韓國醫美與皮膚科療程免費諮詢，包含拉提、肉毒、玻尿酸填充、水光針、肌膚管理與預約協助。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.relynplatform.com/customerinquiry/tw",
    languages: {
      "ja-JP": "https://www.relynplatform.com/customerinquiry/ja",
      "zh-TW": "https://www.relynplatform.com/customerinquiry/tw",
      "zh-HK": "https://www.relynplatform.com/customerinquiry/hk",
      "x-default": "https://www.relynplatform.com/customerinquiry/ja",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.relynplatform.com/customerinquiry/tw",
    siteName: "RELYN",
    title: "韓國醫美療程免費諮詢｜RELYN",
    description:
      "提供台灣顧客韓國醫美、皮膚科、拉提、肉毒、水光針與預約協助等免費諮詢服務。",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "韓國醫美療程免費諮詢｜RELYN",
    description:
      "台灣顧客可免費諮詢韓國醫美、皮膚科、拉提、肉毒、水光針與預約協助。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CustomerInquiryTwPage() {
  return <CustomerInquiryClient locale="tw" />;
}
