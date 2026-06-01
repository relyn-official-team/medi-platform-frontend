// app/customerinquiry/ga4.ts
// GA4 (Google tag) 유틸 — /customerinquiry 랜딩 전용.
// 측정 ID는 ja/tw/hk 집중 분석용으로 사용합니다.

export const GA_MEASUREMENT_ID = "G-9CR46NPFK7";

export type LandingLocale = "ja" | "tw" | "hk";

// 주의: window.gtag 전역 타입은 프로젝트 내 기존 선언(components/pages/HomePageClient.tsx)을
// 재사용합니다. 여기서 다시 선언하면 타입 불일치(any[] vs unknown[])로 빌드 에러가 나므로 선언하지 않습니다.

/** GA4 커스텀 이벤트 전송 (gtag 미로드 시 안전하게 무시) */
export function sendGaEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    ...params,
  });
}
