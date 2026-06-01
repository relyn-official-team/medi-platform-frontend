import { redirect } from "next/navigation";

// 한국어 /customerinquiry 는 검색 노출 대상이 아니므로 메인으로 리다이렉트한다.
// (ja/tw/hk 하위 페이지는 영향 없음 — 각자 page.tsx 가 별도 처리)
export default function CustomerInquiryPage() {
  redirect("/");
}
