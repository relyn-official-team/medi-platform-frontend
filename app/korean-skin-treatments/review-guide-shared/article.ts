import type { Metadata } from "next";
import { REVIEW_GUIDE_LANGUAGES, REVIEW_GUIDE_PATHS, type TranslatedReviewLocale } from "@/lib/review-guide-locales";
import { SECTIONS as KR_SECTIONS, SOURCES as KR_SOURCES } from "@/app/korean-skin-treatments/review-guide-kr/article";
import { reviewCopy } from "@/app/korean-skin-treatments/review-guide-shared/copy";

export function getLocalizedReview(locale: TranslatedReviewLocale) {
  const copy = reviewCopy[locale];
  return {
    copy, path: REVIEW_GUIDE_PATHS[locale], url: REVIEW_GUIDE_LANGUAGES[locale],
    sections: KR_SECTIONS.map((section, index) => ({ id: section.id, name: copy.sections[index] })),
    sources: KR_SOURCES.map((source, index) => ({ url: source.url, ...copy.sources[index] })),
    relatedPath: "/korean-skin-treatments/upsell-" + (locale === "zh-TW" ? "tw" : "jp"),
  };
}

export function getLocalizedReviewMetadata(locale: TranslatedReviewLocale, cards = false): Metadata {
  const { copy, url } = getLocalizedReview(locale);
  const title = cards ? copy.cardsTitle : copy.metaTitle;
  return {
    title: { absolute: title }, description: copy.description, category: copy.category, publisher: "RELYN",
    alternates: { canonical: url, languages: REVIEW_GUIDE_LANGUAGES },
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    openGraph: { type: cards ? "website" : "article", url, title, description: copy.description, locale: locale.replace("-", "_"), alternateLocale: ["ko_KR", locale === "zh-TW" ? "ja_JP" : "zh_TW"], siteName: "RELYN", images: [{ url: url + "/opengraph-image", width: 1200, height: 630, alt: copy.title }] },
    twitter: { card: "summary_large_image", title, description: copy.description, images: [url + "/opengraph-image"] },
  };
}

export function getLocalizedReviewJsonLd(locale: TranslatedReviewLocale, cards = false) {
  const { copy, url, sections, sources } = getLocalizedReview(locale);
  const pageUrl = url + (cards ? "/cards" : "");
  return {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl, name: copy.title, description: copy.description, inLanguage: locale, isAccessibleForFree: true, ...(cards ? { isBasedOn: { "@id": url + "#article" } } : { mainEntity: { "@id": url + "#article" } }) },
      ...(!cards ? [{ "@type": "BlogPosting", "@id": url + "#article", headline: copy.title, description: copy.description, url, mainEntityOfPage: { "@id": pageUrl + "#webpage" }, inLanguage: locale, image: url + "/opengraph-image", publisher: { "@type": "Organization", name: "RELYN", url: "https://relynplatform.com" }, citation: sources.map(source => source.url), articleSection: copy.category, hasPart: sections.map(section => ({ "@type": "WebPageElement", name: section.name, url: url + "#" + section.id })) }] : []),
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.ui.home, item: "https://relynplatform.com/" },
        { "@type": "ListItem", position: 2, name: copy.title, item: url },
        ...(cards ? [{ "@type": "ListItem", position: 3, name: copy.ui.cards, item: pageUrl }] : []),
      ] },
    ],
  };
}
