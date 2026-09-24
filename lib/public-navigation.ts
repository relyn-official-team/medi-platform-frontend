export const PUBLIC_SITE_URL = "https://relynplatform.com";
export const SERVICE_DIRECTORY_PATH = "/services";
export const SERVICE_DIRECTORY_URL = `${PUBLIC_SITE_URL}${SERVICE_DIRECTORY_PATH}`;

export type NavigationLocale = "ko" | "en" | "ja" | "zh" | "th" | "tw" | "hk";
export const SERVICE_DIRECTORY_LABELS: Record<NavigationLocale, string> = {
  ko: "서비스 안내",
  en: "Services & guides",
  ja: "サービス・ガイド一覧",
  zh: "服务与指南",
  th: "บริการและคู่มือ",
  tw: "服務與指南",
  hk: "服務與指南",
};

export type PublicLink = { href: string; lang: string; label: string };

// Navigation stays on the current origin, including local production builds.
// Canonical URLs in metadata and the sitemap remain absolute production URLs.
// Authenticated workspaces are excluded.
export const PLATFORM_LINKS: PublicLink[] = [
  { href: "/", lang: "ko-KR", label: "한국어" },
  { href: "/en", lang: "en-US", label: "English" },
  { href: "/ja", lang: "ja-JP", label: "日本語" },
  { href: "/zh", lang: "zh-CN", label: "简体中文" },
  { href: "/th", lang: "th-TH", label: "ภาษาไทย" },
];

export const CONSULTATION_LINKS: PublicLink[] = [
  { href: "/customerinquiry/ja", lang: "ja-JP", label: "日本語で韓国美容医療の無料相談" },
  { href: "/customerinquiry/tw", lang: "zh-TW", label: "台灣｜韓國醫美免費諮詢" },
  { href: "/customerinquiry/hk", lang: "zh-HK", label: "香港｜韓國醫美免費查詢" },
];

export const EMPLOYEE_CONSULTATION_LINKS: PublicLink[] = [
  { href: "/customerinquiry/b2b", lang: "ko-KR", label: "태국 임직원을 위한 한국 미용시술 상담 · 한국어" },
  { href: "/customerinquiry/b2b/th", lang: "th-TH", label: "ปรึกษาความงามในเกาหลีสำหรับพนักงานไทย · ภาษาไทย" },
];

export const GUIDE_LINKS: PublicLink[] = [
  { href: "/korean-skin-treatments/upsell-kr", lang: "ko-KR", label: "추가 시술 권유와 견적, 어떻게 판단할까요?" },
  { href: "/korean-skin-treatments/review-guide-kr", lang: "ko-KR", label: "한국 피부과·미용시술 후기, 어디까지 믿어도 될까요?" },
  { href: "/korean-skin-treatments/upsell-jp", lang: "ja-JP", label: "韓国の美容クリニックで追加施術を勧められたら" },
  { href: "/korean-skin-treatments/review-guide-jp", lang: "ja-JP", label: "韓国美容医療の口コミの読み方" },
  { href: "/korean-skin-treatments/upsell-tw", lang: "zh-TW", label: "韓國醫美加購療程與報價，該怎麼判斷？" },
  { href: "/korean-skin-treatments/review-guide-tw", lang: "zh-TW", label: "韓國醫美心得，哪些線索值得留意？" },
];
