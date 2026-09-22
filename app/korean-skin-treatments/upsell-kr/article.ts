import type { Metadata } from "next";
import { SKIN_GUIDE_LANGUAGES } from "@/lib/skin-guide-locales";

export const ARTICLE_PATH = "/korean-skin-treatments/upsell-kr";
const SITE_URL = "https://relynplatform.com";
export const ARTICLE_URL = `${SITE_URL}${ARTICLE_PATH}`;
export const ARTICLE_TITLE = "피부과에서 추가 시술을 권한다면, 어디까지 받아야 할까요?";
const DESCRIPTION = "한국 피부과 상담에서 추가 시술을 권유받았다면? 업셀링과 필요한 권유를 판단할 질문, 이벤트 가격과 실제 견적의 차이, 패키지 결제 전 확인할 내용을 알아보세요.";
export const ARTICLE_IMAGES = [
  {
    url: `${ARTICLE_URL}/consultation.webp`,
    alt: "의사와 방문자가 시술 계획을 함께 살펴보는 상담 장면",
    caption: "시술을 정하기 전에, 충분히 설명을 듣는 시간부터. AI 제작 이미지",
  },
  {
    url: `${ARTICLE_URL}/estimate-comparison.webp`,
    alt: "두 장의 견적서와 계산기, 펜이 놓인 책상",
    caption: "‘얼마인가’와 함께 ‘무엇이 포함되는가’를 확인하세요. AI 제작 이미지",
  },
];

// These describe the existing article, not additional procedure landing pages.
const ARTICLE_SECTIONS = [
  { id: "additional-procedures", name: "추가 시술을 권유받았을 때" },
  { id: "assess-recommendations", name: "권유의 필요성을 판단할 때" },
  { id: "compare-estimates", name: "예상보다 견적이 높아졌을 때" },
  { id: "packages", name: "패키지가 더 저렴해 보일 때" },
  { id: "consultation-plan", name: "상담 일정을 잡을 때" },
  { id: "questions", name: "자주 묻는 질문" },
];

export function getArticleMetadata(cards = false): Metadata {
  const title = cards
    ? "피부과 추가 시술·견적 상담 가이드, 10장 요약 | RELYN"
    : "피부과 추가 시술 권유, 어디까지 받아야 할까요? | RELYN";
  const description = cards
    ? "한국 피부과 상담 전 알아둘 추가 시술 권유, 업셀링, 견적과 패키지 비교 방법을 10장의 카드로 읽어보세요. 사례와 자세한 설명은 연결된 본문에서 확인할 수 있습니다."
    : DESCRIPTION;
  return {
    title: { absolute: title },
    description,
    publisher: "RELYN",
    category: "한국 피부과 상담 가이드",
    // The article is the primary search page; card view is its summary.
    alternates: { canonical: ARTICLE_URL, languages: cards ? {} : SKIN_GUIDE_LANGUAGES },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      googleBot: {
        index: true, follow: true,
        "max-snippet": -1, "max-image-preview": "large",
      },
    },
    openGraph: {
      type: cards ? "website" : "article",
      url: ARTICLE_URL,
      siteName: "RELYN",
      locale: "ko_KR",
      alternateLocale: ["zh_TW", "ja_JP"],
      title,
      description,
      images: [{ url: ARTICLE_IMAGES[0].url, width: 1536, height: 1024, alt: `${ARTICLE_IMAGES[0].alt} · AI 제작 이미지` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: ARTICLE_IMAGES[0].url, alt: `${ARTICLE_IMAGES[0].alt} · AI 제작 이미지` }] },
  };
}

export function getArticleJsonLd(cards = false) {
  const pageUrl = cards ? `${ARTICLE_URL}/cards` : ARTICLE_URL;
  const publisher = { "@id": `${SITE_URL}/#organization` };
  const page = { "@id": `${pageUrl}#webpage` };
  const article = { "@id": `${ARTICLE_URL}#article` };
  const breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  const images = ARTICLE_IMAGES.map((image) => ({
    "@type": "ImageObject",
    "@id": image.url,
    contentUrl: image.url,
    url: image.url,
    width: 1536,
    height: 1024,
    name: image.alt,
    caption: image.caption,
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", ...publisher,
        name: "RELYN", legalName: "주식회사 렐린",
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject", url: `${SITE_URL}/relyn_logo.png`,
          width: 1024, height: 358,
        },
      },
      ...images,
      {
        "@type": "WebPage", ...page,
        url: pageUrl,
        name: cards ? "피부과 가기 전, 알아둘 이야기" : ARTICLE_TITLE,
        description: cards ? "추가 시술과 견적에 관한 상담 노트" : DESCRIPTION,
        inLanguage: "ko-KR", isAccessibleForFree: true,
        publisher, breadcrumb,
        ...(cards ? { isBasedOn: article } : {
          mainEntity: article,
          primaryImageOfPage: { "@id": ARTICLE_IMAGES[0].url },
        }),
      },
      ...(!cards ? [{
        "@type": "BlogPosting", "@id": `${ARTICLE_URL}#article`,
        url: ARTICLE_URL, mainEntityOfPage: page,
        headline: ARTICLE_TITLE, description: DESCRIPTION, inLanguage: "ko-KR",
        articleSection: "피부 미용 · 상담 노트", isAccessibleForFree: true,
        image: images.map((image) => ({ "@id": image["@id"] })), publisher,
        about: ["피부과 상담", "추가 시술 권유", "업셀링", "시술 견적", "시술 패키지"].map((name) => ({ "@type": "Thing", name })),
        hasPart: ARTICLE_SECTIONS.map(({ id, name }) => ({
          "@type": "WebPageElement", "@id": `${ARTICLE_URL}#${id}`,
          url: `${ARTICLE_URL}#${id}`, name, inLanguage: "ko-KR",
        })),
        // Authorship, medical review and publication dates must be confirmed,
        // not inferred from the deploy/build time or the publisher's identity.
      }] : []),
      {
        "@type": "BreadcrumbList", ...breadcrumb,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "RELYN 홈", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: ARTICLE_TITLE, item: ARTICLE_URL },
          ...(cards ? [{ "@type": "ListItem", position: 3, name: "카드로 보기", item: `${ARTICLE_URL}/cards` }] : []),
        ],
      },
    ],
  };
}
