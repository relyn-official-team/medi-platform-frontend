import type { Metadata } from "next";
import { landingCopy } from "../copy";
import CustomerInquiryClient from "../CustomerInquiryClient";

const ja = landingCopy.ja!;

export const metadata: Metadata = {
  title: ja.meta.title,
  description: ja.meta.description,
  alternates: {
    canonical: "https://www.relynplatform.com/customerinquiry/ja",
    languages: {
      "ko-KR": "https://www.relynplatform.com/customerinquiry",
      "ja-JP": "https://www.relynplatform.com/customerinquiry/ja",
      "x-default": "https://www.relynplatform.com/customerinquiry",
    },
  },
};

export default function CustomerInquiryJaPage() {
  return <CustomerInquiryClient locale="ja" />;
}
