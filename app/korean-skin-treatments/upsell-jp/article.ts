import type { Metadata } from "next";
import { SKIN_GUIDE_LANGUAGES, SKIN_GUIDE_PATHS, SKIN_GUIDE_SITE_URL } from "@/lib/skin-guide-locales";

export const ARTICLE_PATH = SKIN_GUIDE_PATHS["ja-JP"];
export const ARTICLE_URL = SKIN_GUIDE_LANGUAGES["ja-JP"];
export const ARTICLE_TITLE = "韓国の美容皮膚科で追加施術を勧められたら？";
export const ARTICLE_DESCRIPTION = "韓国の美容皮膚科で、予定外の施術を勧められたらどうする？断り方、表示価格と見積もりが違う理由、使用量・施術範囲・コース料金の確認ポイントを解説。日本から渡韓する方のためのカウンセリングガイドです。";
export const ARTICLE_SOURCE = "https://www.caa.go.jp/policies/policy/consumer_policy/information/information_002/";
export const ARTICLE_IMAGES = [
  { src: "/korean-skin-treatments/upsell-kr/consultation.webp", alt: "医師と来院者が施術計画を一緒に確認しているカウンセリングのイメージ", caption: "施術を決める前に、説明を聞く時間を。AI生成のイメージ画像" },
  { src: "/korean-skin-treatments/upsell-kr/estimate-comparison.webp", alt: "施術内容と料金を比較するための2枚の見積書、電卓、ペン", caption: "金額だけでなく、何が含まれるかも確認しましょう。AI生成のイメージ画像" },
].map(image => ({ ...image, url: `${SKIN_GUIDE_SITE_URL}${image.src}` }));

export const ARTICLE_SECTIONS = [
  { id: "additional-procedures", name: "追加施術を勧められたら", number: "01" },
  { id: "assess-recommendations", name: "必要な提案かを確かめる", number: "02" },
  { id: "compare-estimates", name: "見積もりが高くなったら", number: "03" },
  { id: "packages", name: "回数券・コースを選ぶ前に", number: "04" },
  { id: "consultation-plan", name: "相談と施術の日程を考える", number: "05" },
  { id: "questions", name: "渡韓前によくある質問", number: "Q&A" },
];

export const ARTICLE_FAQS = [
  { question: "韓国の美容皮膚科で追加施術を勧められたら、断ってもいいですか？", answer: "希望しない施術は断って構いません。「今日は予約した施術だけ相談したいです」と伝えてみましょう。迷っている場合も、その場で決めず、必要な理由を聞いてから検討できます。" },
  { question: "勧誘と、自分に必要な施術の提案はどう見分けますか？", answer: "自分の悩みとの関係、期待できる効果と限界、リスク、ほかの選択肢が具体的に説明されているかを確認しましょう。価格や勧め方だけでは必要性を判断できないため、適応は医師に確認してください。" },
  { question: "カウンセラーに勧められた施術を、そのまま受けても大丈夫ですか？", answer: "プランの説明を聞いたうえで、自分に適しているか、ほかの施術と組み合わせられるかは医師に確認しましょう。「一緒に受けるとよい」という説明だけなら、具体的な理由を尋ねてください。" },
  { question: "広告のキャンペーン価格と、来院後の見積もりが違うのはなぜですか？", answer: "施術の追加に加え、使用量、対象部位、回数などの条件が違う場合があります。表示価格に含まれる内容と追加項目を分けて示してもらい、最終的な支払総額を確認しましょう。" },
  { question: "10回コースは、その日にまとめて契約した方がよいですか？", answer: "急いで契約する必要はありません。必要な回数と施術間隔、有効期限、次に韓国へ行ける日程を確認し、1回あたりの安さだけでなく総額で考えましょう。" },
  { question: "予算を超える施術を勧められたときは、どう伝えればよいですか？", answer: "予算と改善したい悩みを伝え、当初希望していた施術の見積もりを出してもらいましょう。それでも勧誘が続く場合は決定を持ち帰り、ほかのクリニックの説明や費用と比較できます。" },
  { question: "韓国の美容皮膚科で、カウンセリングだけ受けることはできますか？", answer: "予約時に、相談のみの受診が可能か、カウンセリング料がかかるかを確認しましょう。対応はクリニックによって異なります。日程を分けられる場合は、説明を比較してから施術を予約できます。" },
  { question: "数日間の韓国旅行でも、複数回のコースを利用できますか？", answer: "医師に必要な回数と間隔を確認し、滞在日数や次回の渡韓予定と照らし合わせてください。通い切れる見通しがないまま割引だけで選ばず、旅行中に終えるために施術間隔を自己判断で縮めないようにしましょう。" },
];

export function getArticleMetadata(cards = false): Metadata {
  const title = cards
    ? "韓国の美容皮膚科へ行く前に｜追加施術と見積もり、10枚の要点カード | RELYN"
    : "韓国の美容皮膚科で勧誘されたら？追加施術・見積もりの確認ポイント | RELYN";
  const description = cards
    ? "韓国の美容皮膚科での追加施術の断り方、見積もり比較、回数券・コースの確認事項を10枚のカードで紹介。詳しい説明やよくある質問は日本語の本文で読めます。"
    : ARTICLE_DESCRIPTION;
  return {
    title: { absolute: title }, description, publisher: "RELYN", category: "韓国の美容皮膚科・カウンセリングガイド",
    alternates: { canonical: ARTICLE_URL, languages: cards ? {} : SKIN_GUIDE_LANGUAGES },
    robots: {
      index: true, follow: true, "max-snippet": -1, "max-image-preview": "large",
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
    openGraph: {
      type: cards ? "website" : "article", url: ARTICLE_URL, siteName: "RELYN",
      locale: "ja_JP", alternateLocale: ["ko_KR", "zh_TW"], title, description,
      images: [{ url: ARTICLE_IMAGES[0].url, width: 1536, height: 1024, alt: `${ARTICLE_IMAGES[0].alt}（AI生成）` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: ARTICLE_IMAGES[0].url, alt: `${ARTICLE_IMAGES[0].alt}（AI生成）` }] },
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
        "@type": "ImageObject", "@id": `${image.url}#ja-JP`, url: image.url, contentUrl: image.url,
        name: image.alt, caption: image.caption, inLanguage: "ja-JP", width: 1536, height: 1024,
      })),
      { "@type": "WebPage", ...page, url: pageUrl, name: cards ? "韓国の美容皮膚科へ行く前に、10枚で確認" : ARTICLE_TITLE,
        description: ARTICLE_DESCRIPTION, inLanguage: "ja-JP", isAccessibleForFree: true, publisher, breadcrumb,
        ...(cards ? { isBasedOn: article } : { mainEntity: article, primaryImageOfPage: { "@id": `${ARTICLE_IMAGES[0].url}#ja-JP` } }),
      },
      ...(!cards ? [{
        "@type": "BlogPosting", ...article, url: ARTICLE_URL, mainEntityOfPage: page,
        headline: ARTICLE_TITLE, description: ARTICLE_DESCRIPTION, inLanguage: "ja-JP",
        articleSection: "韓国美容医療・カウンセリングノート", isAccessibleForFree: true, publisher,
        image: ARTICLE_IMAGES.map(image => ({ "@id": `${image.url}#ja-JP` })),
        translationOfWork: { "@type": "BlogPosting", "@id": `${SKIN_GUIDE_LANGUAGES["ko-KR"]}#article`, inLanguage: "ko-KR" },
        about: ["韓国の美容皮膚科", "追加施術の勧誘", "カウンセリング", "施術の見積もり", "美容医療のコース契約"].map(name => ({ "@type": "Thing", name })),
        hasPart: ARTICLE_SECTIONS.map(({ id, name }) => ({ "@type": "WebPageElement", "@id": `${ARTICLE_URL}#${id}`, url: `${ARTICLE_URL}#${id}`, name, inLanguage: "ja-JP" })),
        citation: ARTICLE_SOURCE,
        // Only describe verifiable content; no invented authors, reviews or dates.
      }] : []),
      { "@type": "BreadcrumbList", ...breadcrumb, itemListElement: [
        { "@type": "ListItem", position: 1, name: "RELYN ホーム", item: `${SKIN_GUIDE_SITE_URL}/ja` },
        { "@type": "ListItem", position: 2, name: ARTICLE_TITLE, item: ARTICLE_URL },
        ...(cards ? [{ "@type": "ListItem", position: 3, name: "要点カード", item: pageUrl }] : []),
      ] },
    ],
  };
}
