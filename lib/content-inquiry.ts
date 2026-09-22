import { ARTICLE_PATH, ARTICLE_TITLE, ARTICLE_URL } from "@/app/korean-skin-treatments/upsell-kr/article";
import { ARTICLE_PATH as TW_PATH, ARTICLE_TITLE as TW_TITLE, ARTICLE_URL as TW_URL } from "@/app/korean-skin-treatments/upsell-tw/article";
import { ARTICLE_PATH as JP_PATH, ARTICLE_TITLE as JP_TITLE, ARTICLE_URL as JP_URL } from "@/app/korean-skin-treatments/upsell-jp/article";

export const CONTENT_INQUIRY_MAX_LENGTH = 1000;
export const CONTENT_INQUIRY_RECIPIENT = "relyn.official.team@gmail.com";
export const CONTENT_INQUIRY_SUBJECT_PREFIX = "[콘텐츠제안및문의]";

// Resolve titles and destinations on the server instead of trusting form input.
export function getContentInquiryPage(path: unknown) {
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
