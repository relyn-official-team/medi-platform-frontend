import type { Metadata } from "next";
import CustomerInquiryClient from "../CustomerInquiryClient";

const TITLE = "韓国美容医療・美容皮膚科の無料相談｜RELYN";
const DESCRIPTION =
  "韓国の美容皮膚科・リフトアップ・ボトックス・ヒアルロン酸・スキンブースターを検討中の方向けに、日本語で無料相談と予約サポートを行います。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.relynplatform.com/customerinquiry/ja",
    languages: {
      "ja-JP": "https://www.relynplatform.com/customerinquiry/ja",
      "zh-TW": "https://www.relynplatform.com/customerinquiry/tw",
      "zh-HK": "https://www.relynplatform.com/customerinquiry/hk",
      "x-default": "https://www.relynplatform.com/customerinquiry/ja",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.relynplatform.com/customerinquiry/ja",
    siteName: "RELYN",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "韓国の美容皮膚科・美容施術を検討中の方向けに、日本語で無料相談と予約サポートを行います。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CustomerInquiryJaPage() {
  return <CustomerInquiryClient locale="ja" />;
}
