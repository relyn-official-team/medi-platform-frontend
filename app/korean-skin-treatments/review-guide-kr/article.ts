import type { Metadata } from "next";
import { REVIEW_GUIDE_LANGUAGES } from "@/lib/review-guide-locales";

export const ARTICLE_PATH = "/korean-skin-treatments/review-guide-kr";
export const ARTICLE_URL = "https://relynplatform.com" + ARTICLE_PATH;
export const ARTICLE_TITLE = "한국 피부과·미용시술 후기, 어디까지 믿어도 될까요?";
export const DESCRIPTION = "한국 피부과의 경쟁과 후기 마케팅, 유명인 보증효과부터 낮은 별점의 반복 패턴까지. 광고·협찬 관계와 실제 경험을 살피며 미용시술 후기를 비교하는 방법을 알아보세요.";
export const SECTIONS = [
  { id: "review-growth", name: "피부과 증가와 경쟁시장" },
  { id: "marketing", name: "마케팅의 관점으로 보면" },
  { id: "relationships", name: "광고 관계와 경험 확인" },
  { id: "complaints", name: "불만 후기를 읽는 방법" },
  { id: "questions", name: "자주 묻는 질문" },
];
export const SOURCES = [
  { label: "바비톡 발표 인용 보도 · 2026.05.14", url: "https://www.ktnews.com/news/articleView.html?idxno=145992", note: "2026년 3월 기준 전체 누적 후기 지표. 광고 후기의 수나 비율을 뜻하지 않습니다." },
  { label: "Knoll & Matthes · 유명인 광고 효과 메타분석 · 2017", url: "https://link.springer.com/article/10.1007/S11747-016-0503-8", note: "유명인 광고의 효과는 조건에 따라 달라집니다. 특정 후기의 진위를 검증한 연구가 아닙니다." },
  { label: "JMIR · 온라인 의사 후기의 대규모 텍스트 분석 · 2020", url: "https://www.jmir.org/2020/7/e14455/", note: "연구 표본에서 긍정 후기 평균 50단어, 부정 후기 평균 100단어. 불만 후기에서 비교할 정보를 찾아보자는 제안에 참고했습니다." },
  { label: "SBS · 피부과 의원 수 증가 통계 인용 보도 · 2024.01.28", url: "https://v.daum.net/v/boeGvWOJsX", note: "보건복지부·국민건강보험공단 등 자료를 인용한 보도. 피부과 의원은 2012년 1,047곳에서 2022년 1,387곳으로 증가했습니다. 미용시술 제공 의료기관 전체를 집계한 수치는 아닙니다." },
  { label: "보건복지부 · 2024년 외국인 환자 유치실적 · 2025.04.02", url: "https://mohw.go.kr/board.es?act=view&bid=0027&list_no=1485191&mid=a10503010300", note: "2024년 피부과 외국인 환자 70.5만 명, 전년 대비 194.9% 증가. 한국 미용의료 시장 전체 매출이나 광고 경쟁 강도를 측정한 통계는 아닙니다." },
];
export const FAQS = [
  { question: "직접 결제했다고 적혀 있으면 믿어도 되나요?", answer: "그 문구만으로 결제 방식이나 혜택 제공 여부까지 확인되지는 않습니다. 본문의 설명과 다른 단서를 함께 살펴보세요." },
  { question: "인플루언서 후기는 제외해야 하나요?", answer: "광고·협찬 관계를 확인하고 구체적인 경험 정보를 참고할 수 있습니다. 유명세만으로 믿거나 배제할 필요는 없습니다." },
  { question: "낮은 별점이 더 정확한가요?", answer: "별점만으로 정확성을 판단할 수 없습니다. 어떤 상황에 대한 평가인지, 다른 후기에서도 같은 내용이 확인되는지를 살펴보세요." },
];

export function getReviewMetadata(cards = false): Metadata {
  const title = cards ? "미용시술 후기 보는 법, 10장 카드 가이드 | RELYN" : "피부과·미용시술 후기 보는 법: 광고·협찬과 실제 경험 | RELYN";
  return {
    title: { absolute: title }, description: DESCRIPTION,
    category: "한국 피부과 이용 가이드", publisher: "RELYN",
    alternates: { canonical: ARTICLE_URL, languages: REVIEW_GUIDE_LANGUAGES },
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    openGraph: { type: cards ? "website" : "article", url: ARTICLE_URL, title, description: DESCRIPTION, locale: "ko_KR", siteName: "RELYN", images: [{ url: ARTICLE_URL + "/opengraph-image", width: 1200, height: 630, alt: "BEYOND FIVE STARS — 한국 미용시술 후기 읽기 가이드" }] },
    twitter: { card: "summary_large_image", title, description: DESCRIPTION, images: [ARTICLE_URL + "/opengraph-image"] },
  };
}

export function getReviewJsonLd(cards = false) {
  const url = ARTICLE_URL + (cards ? "/cards" : "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": url + "#webpage", url, name: ARTICLE_TITLE, description: DESCRIPTION, inLanguage: "ko-KR", isAccessibleForFree: true, ...(cards ? { isBasedOn: { "@id": ARTICLE_URL + "#article" } } : { mainEntity: { "@id": ARTICLE_URL + "#article" } }) },
      ...(!cards ? [{ "@type": "BlogPosting", "@id": ARTICLE_URL + "#article", headline: ARTICLE_TITLE, description: DESCRIPTION, url: ARTICLE_URL, mainEntityOfPage: { "@id": url + "#webpage" }, inLanguage: "ko-KR", image: ARTICLE_URL + "/opengraph-image", publisher: { "@type": "Organization", name: "RELYN", url: "https://relynplatform.com" }, citation: SOURCES.map(source => source.url), articleSection: "한국 피부과 · 후기 읽기", hasPart: SECTIONS.map(section => ({ "@type": "WebPageElement", name: section.name, url: ARTICLE_URL + "#" + section.id })) }] : []),
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "RELYN 홈", item: "https://relynplatform.com/" },
        { "@type": "ListItem", position: 2, name: ARTICLE_TITLE, item: ARTICLE_URL },
        ...(cards ? [{ "@type": "ListItem", position: 3, name: "카드로 보기", item: url }] : []),
      ] },
    ],
  };
}
