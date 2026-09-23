export const REVIEW_GUIDE_PATHS = {
  "ko-KR": "/korean-skin-treatments/review-guide-kr",
  "zh-TW": "/korean-skin-treatments/review-guide-tw",
  "ja-JP": "/korean-skin-treatments/review-guide-jp",
} as const;

export type ReviewLocale = keyof typeof REVIEW_GUIDE_PATHS;
export type TranslatedReviewLocale = Exclude<ReviewLocale, "ko-KR">;

export const REVIEW_GUIDE_LANGUAGES = Object.fromEntries(
  Object.entries(REVIEW_GUIDE_PATHS).map(([locale, path]) => [locale, "https://relynplatform.com" + path]),
);

export const REVIEW_LANGUAGE_NAMES = { "ko-KR": "한국어", "zh-TW": "繁體中文", "ja-JP": "日本語" } as const;
