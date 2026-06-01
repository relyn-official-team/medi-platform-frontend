import type { Metadata } from "next";
import { landingCopy } from "../copy";
import CustomerInquiryClient from "../CustomerInquiryClient";

const tw = landingCopy.tw!;

export const metadata: Metadata = {
  title: tw.meta.title,
  description: tw.meta.description,
  alternates: {
    canonical: "https://www.relynplatform.com/customerinquiry/tw",
    languages: {
      "ko-KR": "https://www.relynplatform.com/customerinquiry",
      "ja-JP": "https://www.relynplatform.com/customerinquiry/ja",
      "zh-TW": "https://www.relynplatform.com/customerinquiry/tw",
      "zh-HK": "https://www.relynplatform.com/customerinquiry/hk",
      "x-default": "https://www.relynplatform.com/customerinquiry",
    },
  },
};

export default function CustomerInquiryTwPage() {
  return <CustomerInquiryClient locale="tw" />;
}
