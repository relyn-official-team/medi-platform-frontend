import type { Metadata } from "next";
import { landingCopy } from "../copy";
import CustomerInquiryClient from "../CustomerInquiryClient";

const hk = landingCopy.hk!;

export const metadata: Metadata = {
  title: hk.meta.title,
  description: hk.meta.description,
  alternates: {
    canonical: "https://www.relynplatform.com/customerinquiry/hk",
    languages: {
      "ko-KR": "https://www.relynplatform.com/customerinquiry",
      "ja-JP": "https://www.relynplatform.com/customerinquiry/ja",
      "zh-TW": "https://www.relynplatform.com/customerinquiry/tw",
      "zh-HK": "https://www.relynplatform.com/customerinquiry/hk",
      "x-default": "https://www.relynplatform.com/customerinquiry",
    },
  },
};

export default function CustomerInquiryHkPage() {
  return <CustomerInquiryClient locale="hk" />;
}
