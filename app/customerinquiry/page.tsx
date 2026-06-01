import type { Metadata } from "next";
import { landingCopy } from "./copy";
import CustomerInquiryClient from "./CustomerInquiryClient";

const ko = landingCopy.ko!;

export const metadata: Metadata = {
  title: ko.meta.title,
  description: ko.meta.description,
  alternates: {
    canonical: "https://www.relynplatform.com/customerinquiry",
    languages: {
      // 향후 국가별 페이지 추가 시 아래 매핑을 확장하세요.
      "ko-KR": "https://www.relynplatform.com/customerinquiry",
      "ja-JP": "https://www.relynplatform.com/customerinquiry/ja",
      "zh-TW": "https://www.relynplatform.com/customerinquiry/tw",
      "zh-HK": "https://www.relynplatform.com/customerinquiry/hk",
      "x-default": "https://www.relynplatform.com/customerinquiry",
    },
  },
};

export default function CustomerInquiryPage() {
  return <CustomerInquiryClient locale="ko" />;
}
