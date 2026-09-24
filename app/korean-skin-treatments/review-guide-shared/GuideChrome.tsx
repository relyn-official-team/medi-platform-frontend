import { GuideServiceLinks } from "@/components/common/PublicResourceLinks";
import Image from "@/app/korean-skin-treatments/shared/GuideImage";
import Link from "next/link";
import type { TranslatedReviewLocale } from "@/lib/review-guide-locales";
import { getLocalizedReview } from "./article";
import ReviewLanguageNav from "./ReviewLanguageNav";

export function GuideHeader({ locale, cards = false }: { locale: TranslatedReviewLocale; cards?: boolean }) {
  const { copy: { ui }, path } = getLocalizedReview(locale);
  return <>
    <Link prefetch={false} className="skip" href={cards ? "#review-deck" : "#article"}>{ui.skip}</Link>
    <header className="relyn-header"><div className="relyn-header-inner">
      <Link prefetch={false} className="relyn-brand" href="/" aria-label={ui.home}><Image src="/relyn_logo.png" width={1024} height={358} sizes="128px" alt="RELYN" loading="eager" /></Link>
      <span className="brand-divider" aria-hidden="true" /><Link prefetch={false} className="guide-label" href={path}>{ui.guide}</Link>
      <nav className="view-switch" aria-label={ui.reading}><Link prefetch={false} href={path} aria-current={!cards ? "page" : undefined}>{ui.article}</Link><Link prefetch={false} href={path + "/cards"} aria-current={cards ? "page" : undefined}>{ui.cards}</Link></nav>
    </div></header>
    <nav className="breadcrumb" aria-label={ui.breadcrumb}><Link prefetch={false} href="/">{ui.home}</Link><span aria-hidden="true">/</span><Link prefetch={false} className="breadcrumb-title" href={path}>{ui.shortTitle}</Link>{cards && <><span aria-hidden="true">/</span><span aria-current="page">{ui.cards}</span></>}</nav>
    <ReviewLanguageNav locale={locale} cards={cards} />
  </>;
}

export function GuideToc({ locale }: { locale: TranslatedReviewLocale }) {
  const { copy: { ui }, path, sections } = getLocalizedReview(locale);
  return <nav className="article-toc" aria-label={ui.toc}><p>{ui.tocTitle}</p><ol>{sections.map((section, index) => <li key={section.id}><Link prefetch={false} href={"#" + section.id}><span>{String(index + 1).padStart(2, "0")}</span>{section.name}</Link></li>)}</ol><Link prefetch={false} className="toc-card-link" href={path + "/cards"}>{ui.cardsLink} ↗</Link></nav>;
}

export function GuideFooter({ locale }: { locale: TranslatedReviewLocale }) {
  const { copy: { ui }, relatedPath } = getLocalizedReview(locale);
  return <footer className="relyn-footer"><div><Link prefetch={false} className="footer-wordmark" href="/">RELYN</Link><p>{ui.company}</p></div><nav aria-label={ui.footerNav}><GuideServiceLinks locale={locale === "ja-JP" ? "ja" : "tw"} /><Link prefetch={false} href={relatedPath}>{ui.related}</Link><Link prefetch={false} href="/privacy">{ui.privacy}</Link></nav></footer>;
}
