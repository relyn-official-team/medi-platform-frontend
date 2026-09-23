import Link from "next/link";
import { REVIEW_GUIDE_PATHS, REVIEW_LANGUAGE_NAMES, type ReviewLocale } from "@/lib/review-guide-locales";

export default function ReviewLanguageNav({ locale, cards = false }: { locale: ReviewLocale; cards?: boolean }) {
  const label = { "ko-KR": "언어 선택", "zh-TW": "選擇語言", "ja-JP": "言語を選ぶ" }[locale];
  return <nav className="review-language-nav" aria-label={label}>
    {(Object.keys(REVIEW_GUIDE_PATHS) as ReviewLocale[]).map(language => <Link prefetch={false} key={language} href={REVIEW_GUIDE_PATHS[language] + (cards ? "/cards" : "")} hrefLang={language} lang={language} aria-current={language === locale ? "page" : undefined}>{REVIEW_LANGUAGE_NAMES[language]}</Link>)}
  </nav>;
}
