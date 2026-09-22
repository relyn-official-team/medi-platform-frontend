export const SKIN_GUIDE_SITE_URL = "https://relynplatform.com";
export const SKIN_GUIDE_PATHS = {
  "ko-KR": "/korean-skin-treatments/upsell-kr",
  "zh-TW": "/korean-skin-treatments/upsell-tw",
  "ja-JP": "/korean-skin-treatments/upsell-jp",
} as const;

export const SKIN_GUIDE_LANGUAGES = {
  "ko-KR": `${SKIN_GUIDE_SITE_URL}${SKIN_GUIDE_PATHS["ko-KR"]}`,
  "zh-TW": `${SKIN_GUIDE_SITE_URL}${SKIN_GUIDE_PATHS["zh-TW"]}`,
  "ja-JP": `${SKIN_GUIDE_SITE_URL}${SKIN_GUIDE_PATHS["ja-JP"]}`,
};
