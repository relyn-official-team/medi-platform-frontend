import type { Metadata } from "next";
import { SKIN_GUIDE_LANGUAGES, SKIN_GUIDE_PATHS, SKIN_GUIDE_SITE_URL } from "@/lib/skin-guide-locales";

export const ARTICLE_PATH = SKIN_GUIDE_PATHS["zh-TW"];
export const ARTICLE_URL = SKIN_GUIDE_LANGUAGES["zh-TW"];
export const ARTICLE_TITLE = "韓國皮膚科推薦加做療程，要接受嗎？";
export const ARTICLE_DESCRIPTION = "到韓國醫美被推薦加做療程，該怎麼判斷？給台灣旅客的皮膚科諮詢指南：分辨推銷與實際需求、比較活動價與現場報價、確認劑量與施作範圍，並在購買套票前評估回診安排。";
export const ARTICLE_IMAGES = [
  {
    src: "/korean-skin-treatments/upsell-kr/consultation.webp",
    alt: "醫師與來訪者一起討論療程計畫的諮詢情境",
    caption: "決定療程前，先留時間聽清楚說明。AI 生成示意圖",
  },
  {
    src: "/korean-skin-treatments/upsell-kr/estimate-comparison.webp",
    alt: "桌上擺放兩份報價單、計算機與筆，方便比較費用與項目",
    caption: "除了多少錢，也要確認費用包含什麼。AI 生成示意圖",
  },
].map(image => ({ ...image, url: `${SKIN_GUIDE_SITE_URL}${image.src}` }));

export const ARTICLE_SECTIONS = [
  { id: "additional-procedures", name: "被推薦加做療程怎麼辦？", number: "01" },
  { id: "assess-recommendations", name: "怎麼判斷是否有需要？", number: "02" },
  { id: "compare-estimates", name: "現場報價為什麼變高？", number: "03" },
  { id: "packages", name: "多次套票真的划算嗎？", number: "04" },
  { id: "consultation-plan", name: "可以先諮詢再決定嗎？", number: "05" },
  { id: "questions", name: "台灣旅客常見問題", number: "Q&A" },
];

export const ARTICLE_FAQS = [
  { question: "韓國皮膚科推薦的加做療程，一定要接受嗎？", answer: "不一定。不想接受的項目可以明確拒絕；如果正在考慮，先請對方說明為什麼適合你，再決定是否加做。" },
  { question: "怎麼分辨醫美推銷與有需要的療程建議？", answer: "先看說明是否具體，包括與你的膚況有何關聯、預期效果與限制、風險及其他選擇。僅憑促銷話術或價格，無法判定療程是否有必要；適合與否應由醫師評估。" },
  { question: "諮詢師推薦的療程，可以直接相信嗎？", answer: "可以先了解方案，但療程是否適合、能否合併施作，應向醫師確認。若說明只停留在「一起做比較好」，可以繼續追問具體原因。" },
  { question: "韓國醫美活動價和現場報價，為什麼不一樣？", answer: "可能是新增了療程，也可能是劑量、施作部位或套票內容不同。請診所逐項列出原本包含的內容、追加項目及最後總額，再比較是否符合預算。" },
  { question: "10 次療程套票，需要當天一次買完嗎？", answer: "不必急著購買。先確認實際需要的次數、每次間隔、使用期限與能否再次赴韓，再看總付款金額，而不是只看平均單次價格。" },
  { question: "被推薦的療程超出預算，該怎麼說？", answer: "可以直接說明預算與原本想改善的問題，請對方提供原先項目的報價。若仍持續被推銷，可先暫緩決定，再比較其他診所的說明與費用。" },
  { question: "去韓國皮膚科，可以只諮詢、不當天做療程嗎？", answer: "預約前先詢問是否接受單獨諮詢，以及是否有諮詢費。能分開安排時，先諮詢、再決定施作日期；實際安排依各診所的預約規則而定。" },
  { question: "台灣旅客只在韓國待幾天，還適合買多次套票嗎？", answer: "先請醫師說明所需次數與間隔，再對照你的停留天數及後續赴韓計畫。若無法按安排完成，不要只因折扣而購買，也不要為了用完套票而自行壓縮療程間隔。" },
];

export function getArticleMetadata(cards = false): Metadata {
  const title = cards
    ? "韓國醫美諮詢前必看：加做療程與報價比較，10 張圖卡 | RELYN"
    : "韓國醫美被推銷怎麼辦？皮膚科加做療程、報價與套票指南 | RELYN";
  const description = cards
    ? "用 10 張繁體中文圖卡，掌握韓國皮膚科諮詢、加做療程、報價與套票的確認重點。台灣旅客赴韓前，先看懂推銷與實際需求的差別。"
    : ARTICLE_DESCRIPTION;
  return {
    title: { absolute: title }, description, publisher: "RELYN", category: "韓國皮膚科諮詢指南",
    alternates: { canonical: ARTICLE_URL, languages: cards ? {} : SKIN_GUIDE_LANGUAGES },
    robots: {
      index: true, follow: true, "max-snippet": -1, "max-image-preview": "large",
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
    openGraph: {
      type: cards ? "website" : "article", url: ARTICLE_URL, siteName: "RELYN",
      locale: "zh_TW", alternateLocale: ["ko_KR", "ja_JP"], title, description,
      images: [{ url: ARTICLE_IMAGES[0].url, width: 1536, height: 1024, alt: `${ARTICLE_IMAGES[0].alt}（AI 生成）` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: ARTICLE_IMAGES[0].url, alt: `${ARTICLE_IMAGES[0].alt}（AI 生成）` }] },
  };
}

export function getArticleJsonLd(cards = false) {
  const pageUrl = cards ? `${ARTICLE_URL}/cards` : ARTICLE_URL;
  const publisher = { "@id": `${SKIN_GUIDE_SITE_URL}/#organization` };
  const article = { "@id": `${ARTICLE_URL}#article` };
  const page = { "@id": `${pageUrl}#webpage` };
  const breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", ...publisher, name: "RELYN", legalName: "주식회사 렐린", url: `${SKIN_GUIDE_SITE_URL}/`,
        logo: { "@type": "ImageObject", url: `${SKIN_GUIDE_SITE_URL}/relyn_logo.png`, width: 1024, height: 358 } },
      ...ARTICLE_IMAGES.map(image => ({
        "@type": "ImageObject", "@id": `${image.url}#zh-TW`, url: image.url, contentUrl: image.url,
        name: image.alt, caption: image.caption, inLanguage: "zh-TW", width: 1536, height: 1024,
      })),
      { "@type": "WebPage", ...page, url: pageUrl, name: cards ? "去韓國皮膚科前，先看這 10 張圖卡" : ARTICLE_TITLE,
        description: ARTICLE_DESCRIPTION, inLanguage: "zh-TW", isAccessibleForFree: true, publisher, breadcrumb,
        ...(cards ? { isBasedOn: article } : { mainEntity: article, primaryImageOfPage: { "@id": `${ARTICLE_IMAGES[0].url}#zh-TW` } }),
      },
      ...(!cards ? [{
        "@type": "BlogPosting", ...article, url: ARTICLE_URL, mainEntityOfPage: page,
        headline: ARTICLE_TITLE, description: ARTICLE_DESCRIPTION, inLanguage: "zh-TW",
        articleSection: "韓國醫美・諮詢筆記", isAccessibleForFree: true, publisher,
        image: ARTICLE_IMAGES.map(image => ({ "@id": `${image.url}#zh-TW` })),
        translationOfWork: { "@type": "BlogPosting", "@id": `${SKIN_GUIDE_LANGUAGES["ko-KR"]}#article`, inLanguage: "ko-KR" },
        about: ["韓國皮膚科諮詢", "醫美推銷", "加做療程", "療程報價", "醫美套票"].map(name => ({ "@type": "Thing", name })),
        hasPart: ARTICLE_SECTIONS.map(({ id, name }) => ({ "@type": "WebPageElement", "@id": `${ARTICLE_URL}#${id}`, url: `${ARTICLE_URL}#${id}`, name, inLanguage: "zh-TW" })),
        citation: "https://mohw.gov.tw/cp-16-58545-1.html",
        // Do not invent named authors, medical review or publication dates.
      }] : []),
      { "@type": "BreadcrumbList", ...breadcrumb, itemListElement: [
        { "@type": "ListItem", position: 1, name: "RELYN 首頁", item: `${SKIN_GUIDE_SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: ARTICLE_TITLE, item: ARTICLE_URL },
        ...(cards ? [{ "@type": "ListItem", position: 3, name: "圖卡重點", item: pageUrl }] : []),
      ] },
    ],
  };
}
