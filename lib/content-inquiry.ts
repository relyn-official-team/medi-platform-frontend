import { ARTICLE_PATH, ARTICLE_TITLE, ARTICLE_URL } from "@/app/korean-skin-treatments/upsell-kr/article";
import { ARTICLE_PATH as TW_PATH, ARTICLE_TITLE as TW_TITLE, ARTICLE_URL as TW_URL } from "@/app/korean-skin-treatments/upsell-tw/article";
import { ARTICLE_PATH as JP_PATH, ARTICLE_TITLE as JP_TITLE, ARTICLE_URL as JP_URL } from "@/app/korean-skin-treatments/upsell-jp/article";
import { ARTICLE_PATH as REVIEW_PATH, ARTICLE_TITLE as REVIEW_TITLE, ARTICLE_URL as REVIEW_URL } from "@/app/korean-skin-treatments/review-guide-kr/article";
import { getLocalizedReview } from "@/app/korean-skin-treatments/review-guide-shared/article";

export { CONTENT_INQUIRY_MAX_LENGTH, CONTENT_INQUIRY_RECIPIENT, CONTENT_INQUIRY_SUBJECT_PREFIX } from "@/lib/content-inquiry-config";

// Resolve titles and destinations on the server instead of trusting form input.
export function getContentInquiryPage(path: unknown) {
  for (const locale of ["zh-TW", "ja-JP"] as const) {
    const review = getLocalizedReview(locale);
    if (path === review.path || path === `${review.path}/cards`) {
      const cards = path === `${review.path}/cards`;
      return { title: review.copy.title, url: review.url + (cards ? "/cards" : ""), view: cards ? "카드로 보기" : "글로 읽기" };
    }
  }
  if (path === REVIEW_PATH || path === `${REVIEW_PATH}/cards`) {
    const cards = path === `${REVIEW_PATH}/cards`;
    return { title: REVIEW_TITLE, url: REVIEW_URL + (cards ? "/cards" : ""), view: cards ? "카드로 보기" : "글로 읽기" };
  }
  if (path === ARTICLE_PATH) {
    return { title: ARTICLE_TITLE, url: ARTICLE_URL, view: "글로 읽기" };
  }
  if (path === `${ARTICLE_PATH}/cards`) {
    return { title: ARTICLE_TITLE, url: `${ARTICLE_URL}/cards`, view: "카드로 보기" };
  }
  if (path === TW_PATH) {
    return { title: TW_TITLE, url: TW_URL, view: "글로 읽기" };
  }
  if (path === `${TW_PATH}/cards`) {
    return { title: TW_TITLE, url: `${TW_URL}/cards`, view: "카드로 보기" };
  }
  if (path === JP_PATH) {
    return { title: JP_TITLE, url: JP_URL, view: "글로 읽기" };
  }
  if (path === `${JP_PATH}/cards`) {
    return { title: JP_TITLE, url: `${JP_URL}/cards`, view: "카드로 보기" };
  }
  return null;
}
