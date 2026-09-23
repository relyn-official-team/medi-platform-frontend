import Link from "next/link";
import type { ReactNode } from "react";
import type { TranslatedReviewLocale } from "@/lib/review-guide-locales";
import ArticleFeedback from "../upsell-kr/ArticleFeedback";
import CardCarousel from "../upsell-kr/CardCarousel";
import ReviewScout from "../review-guide-kr/ReviewScout";
import { getLocalizedReview, getLocalizedReviewJsonLd } from "./article";
import { GuideHeader, GuideFooter } from "./GuideChrome";
import { Lines } from "./LocalizedReviewGuide";
import "../review-guide-kr/cards/review-cards.css";

function Card({ locale, index, chapter, section, cover = false, children }: { locale: TranslatedReviewLocale; index: number; chapter: string; section: string; cover?: boolean; children: ReactNode }) {
  const { copy: { ui }, path } = getLocalizedReview(locale);
  return <section className="slide review-slide" role="group" aria-roledescription={ui.slide} aria-label={index + " / 10"}>
    <div className={"review-card" + (cover ? " rc-cover" : "")} data-card={index} data-section={section}>
      <div className="rc-header"><span>RELYN</span><span>{ui.cardsHeader}</span></div>
      <div className="rc-content"><p className="rc-chapter">{chapter}</p>{children}</div>
      <div className="rc-footer"><Link prefetch={false} href={path + "#" + section}>{index === 10 ? ui.moreSources : ui.more}<span aria-hidden="true"> ↗</span></Link><span>{String(index).padStart(2, "0")} / 10</span></div>
    </div>
  </section>;
}

export default function LocalizedReviewCards({ locale }: { locale: TranslatedReviewLocale }) {
  const { copy: c, path, sections } = getLocalizedReview(locale);
  const t = c.cards;
  const chapter = (index: number) => String(index + 1).padStart(2, "0") + ". " + sections[index].name;
  return <div lang={locale} className="skin-guide cards-body review-guide review-cards review-localized">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalizedReviewJsonLd(locale, true)).replace(/</g, "\\u003c") }} />
    <GuideHeader locale={locale} cards />
    <main className="cards-main" id="review-deck">
      <div className="post-heading"><span className="post-mark" aria-hidden="true">{c.ui.mark}</span><div><h1>{c.ui.postHeading}</h1><p>{c.ui.postSubtitle}</p></div><span className="post-count" aria-hidden="true">{c.ui.ten}</span></div>
      <CardCarousel locale={locale} label={c.ui.deckLabel}>
        <Card locale={locale} index={1} chapter={c.category} section="article" cover><h2><Lines>{t.cover}</Lines></h2><p><Lines>{c.subtitle}</Lines></p><div className="rc-cover-art"><ReviewScout compact locale={locale} /></div></Card>
        <Card locale={locale} index={2} chapter={chapter(0)} section="review-growth">
          <h2><Lines>{t.growth}</Lines></h2>
          <div className="rc-data-list"><div><span>{t.clinicLabel}</span><strong>1,047 <span>→</span> 1,387<small>{t.clinicUnit}</small></strong><small>{t.clinicDate}</small></div><div><span>{t.patientLabel}</span><strong>70.5<small>{t.patientUnit}</small></strong><small>{t.patientDate}</small></div></div><p className="rc-note">{t.dataSource}</p>
        </Card>
        <Card locale={locale} index={3} chapter={chapter(0)} section="review-growth"><h2><Lines>{t.reviews}</Lines></h2><p>{t.reviewsText}</p><div className="rc-callout"><strong>{t.reviewStat}</strong><div className="rc-number">113<small>{c.growth.statUnit}</small></div><p>{t.reviewDate}</p></div><p className="rc-note">{t.reviewNote}</p></Card>
        <Card locale={locale} index={4} chapter={chapter(1)} section="marketing"><h2><Lines>{t.marketing}</Lines></h2><p>{t.marketingIntro}</p><div className="rc-callout"><strong>{c.marketing.definitionTitle}</strong><p>{t.definition}</p></div><p>{t.marketingText}</p><p className="rc-note">{t.marketingNote}</p></Card>
        <Card locale={locale} index={5} chapter={chapter(2)} section="relationships"><h2><Lines>{t.relationships}</Lines></h2><div className="rc-info-list">{t.followerRows.map(row => <div key={row.title}><h3>{row.title}</h3><p>{row.text}</p></div>)}</div><div className="rc-callout rc-bottom-copy"><strong>{t.relationshipCallout}</strong></div></Card>
        <Card locale={locale} index={6} chapter={chapter(2)} section="relationships"><h2><Lines>{t.repeated}</Lines></h2><p><Lines>{t.repeatedText}</Lines></p><ol className="rc-steps">{t.steps.map((step, index) => <li key={step.title}><span>{index + 1}</span><div><strong>{step.title}</strong><p>{step.text}</p></div></li>)}</ol><p className="rc-note">{t.repeatedNote}</p></Card>
        <Card locale={locale} index={7} chapter={chapter(3)} section="complaints"><h2><Lines>{t.complaints}</Lines></h2><p>{t.complaintsText}</p><div className="rc-topics">{t.topics.map(topic => <span key={topic}>{topic}</span>)}</div><div className="rc-callout rc-research"><strong>{t.researchLabel}</strong><div className="rc-metric-pair"><div><span>{t.positive}</span><b>50<small>{t.words}</small></b></div><div><span>{t.negative}</span><b>100<small>{t.words}</small></b></div></div><p>{t.researchText}</p></div><p className="rc-note">{t.researchNote}</p></Card>
        <Card locale={locale} index={8} chapter={chapter(3)} section="complaints"><h2><Lines>{t.compare}</Lines></h2><ul className="rc-questions">{t.compareQuestions.map(q => <li key={q}>{q}</li>)}</ul><div className="rc-callout"><strong>{t.exampleTitle}</strong><p><Lines>{t.example}</Lines></p></div><p className="rc-note">{t.exampleNote}</p></Card>
        <Card locale={locale} index={9} chapter={chapter(4)} section="questions"><h2>{t.faqHeading}</h2><div className="rc-info-list rc-faq">{t.faqs.map(faq => <div key={faq.title}><h3>{faq.title}</h3><p>{faq.text}</p></div>)}</div></Card>
        <Card locale={locale} index={10} chapter={t.closingChapter} section="article"><h2><Lines>{t.closing}</Lines></h2><p>{t.closingIntro}</p><div className="rc-closing-quote"><span>{t.expectation}</span><strong><Lines>{t.closingQuote}</Lines></strong></div><p>{t.closingText}</p></Card>
      </CardCarousel>
      <div className="post-caption"><p><strong>{c.ui.captionTitle}</strong><br />{c.ui.caption}</p><Link prefetch={false} href={path + "#sources"}>{c.ui.sourcesLink} ↗</Link><p className="caption-note">{c.ui.captionNote}</p></div>
    </main><GuideFooter locale={locale} /><ArticleFeedback locale={locale} />
  </div>;
}
