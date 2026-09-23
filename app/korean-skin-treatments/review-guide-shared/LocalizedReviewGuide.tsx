import Link from "next/link";
import Image from "@/app/korean-skin-treatments/shared/GuideImage";
import { Fragment } from "react";
import type { TranslatedReviewLocale } from "@/lib/review-guide-locales";
import ArticleFeedback from "../upsell-kr/ArticleFeedback";
import ReviewScout from "../review-guide-kr/ReviewScout";
import ReviewMotionScene from "../review-guide-kr/ReviewMotionScene";
import { getLocalizedReview, getLocalizedReviewJsonLd } from "./article";
import { GuideHeader, GuideFooter, GuideToc } from "./GuideChrome";

export function Lines({ children }: { children: string[] }) {
  return children.map((line, index) => <Fragment key={index}>{index > 0 && <br />}{line}</Fragment>);
}

export default function LocalizedReviewGuide({ locale }: { locale: TranslatedReviewLocale }) {
  const { copy: c, path, sections, sources, relatedPath } = getLocalizedReview(locale);
  const chapter = (index: number) => <p className="chapter-label">{String(index + 1).padStart(2, "0")}. {sections[index].name}</p>;
  const source = (index: number) => <a className="review-source-link" href={sources[index].url} target="_blank" rel="noreferrer">{sources[index].label} ↗</a>;
  return <div lang={locale} className="skin-guide blog-body review-guide review-localized">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalizedReviewJsonLd(locale)).replace(/</g, "\\u003c") }} />
    <GuideHeader locale={locale} />
    <div className="content-layout">
      <aside className="article-sidebar"><GuideToc locale={locale} /></aside>
      <details className="mobile-toc"><summary>{c.ui.toc} <span>{sections.length}{c.ui.items}</span></summary><GuideToc locale={locale} /></details>
      <main id="article" className="blog-article"><article aria-labelledby="article-title">
        <header className="article-header"><p className="article-category">{c.category}</p><h1 id="article-title"><Lines>{c.titleLines}</Lines></h1><p className="article-subtitle"><Lines>{c.subtitle}</Lines></p><div className="article-meta"><span>{c.meta[0]}</span><span>{c.meta[1]}</span></div></header>
        <div className="review-hero-art"><div className="review-hero-copy"><span className="review-hero-edition">RELYN · REVIEW GUIDE</span><span className="review-hero-title"><span>BEYOND </span><span>FIVE </span><span>STARS</span></span><span className="review-star-strip" aria-hidden="true">★ ★ ★ ★ ★</span></div><ReviewScout locale={locale} /></div>
        <div className="article-prose review-intro"><p>{c.intro[0]}</p><p>{c.intro[1]}</p><p>{c.intro[2]}<strong>{c.intro[3]}</strong>{c.intro[4]}</p></div>
        <div className="article-prose">
          <section id="review-growth">{chapter(0)}<h2><Lines>{c.growth.heading}</Lines></h2>
            <p>{c.growth.paragraphs[0]} {source(3)}</p><p>{c.growth.paragraphs[1]} {source(4)}</p>
            <figure className="review-inline-photo"><Image src="/korean-skin-treatments/review-guide-kr/review-consultation.png" alt={c.growth.alt} width={1536} height={1024} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 808px) calc(100vw - 60px), (max-width: 920px) 748px, (max-width: 1150px) calc(100vw - 292px), 748px" /></figure>
            <p>{c.growth.paragraphs[2]}</p><p>{c.growth.paragraphs[3]}</p>
            <div className="review-stat-grid"><div><span>{c.growth.statLabel}</span><strong>113<span>{c.growth.statUnit}</span></strong><p>{c.growth.statDate}<br /><b>{c.growth.statChange}</b></p>{source(0)}</div></div>
            <p className="review-evidence-note">{c.growth.note}</p>
          </section>
          <section id="marketing">{chapter(1)}<h2><Lines>{c.marketing.heading}</Lines></h2><p>{c.marketing.paragraphs[0]}</p><p>{c.marketing.paragraphs[1]} {source(1)}</p>
            <blockquote className="review-definition"><p><strong>{c.marketing.definitionTitle}</strong><span>{c.marketing.definition}</span></p></blockquote>
            <p>{c.marketing.paragraphs[2]}</p><figure className="review-inline-photo"><Image src="/korean-skin-treatments/review-guide-kr/review-content-studio.png" alt={c.marketing.alt} width={1536} height={1024} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 808px) calc(100vw - 60px), (max-width: 920px) 748px, (max-width: 1150px) calc(100vw - 292px), 748px" /></figure>
          </section>
          <section id="relationships">{chapter(2)}<div className="review-key-point"><span className="review-key-point-label">{c.relationships.key} 01</span><h2><Lines>{c.relationships.heading}</Lines></h2></div>
            <p>{c.relationships.intro}</p><div className="review-two-notes"><div><span>{c.relationships.check}</span><h3>{c.relationships.title}</h3>{c.relationships.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div><p className="review-evidence-note">{c.relationships.note}</p>
          </section>
          <section id="complaints">{chapter(3)}<div className="review-key-point"><span className="review-key-point-label">{c.relationships.key} 02</span><h2><Lines>{c.complaints.heading}</Lines></h2></div><p>{c.complaints.intro}</p><ReviewMotionScene kind="compare" locale={locale} /><p>{c.complaints.research} {source(2)}</p>
            <ul className="article-questions">{c.complaints.questions.map(q => <li key={q}>{q}</li>)}</ul>
            <div className="review-example"><p className="review-example-label">{c.complaints.exampleLabel}</p>{c.complaints.examples.map(example => <div key={example.label}><span>{example.label}</span><p>{example.text}</p><small>{example.note}</small></div>)}<p className="review-evidence-note">{c.complaints.note}</p></div>
          </section>
          <section id="questions" className="blog-faq">{chapter(4)}<h2>{c.faqHeading}</h2>{c.faqs.map(item => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>
          <div className="review-closing"><p>{c.closing[0]}</p><p>{c.closing[1]}<strong>{c.closing[2]}</strong>{c.closing[3]}</p></div>
          <aside className="review-related"><span>{c.related[0]}</span><Link prefetch={false} href={relatedPath}>{c.related[1]}<br />{c.related[2]} <span aria-hidden="true">↗</span></Link></aside>
          <section className="review-sources" id="sources"><h2>{c.sourcesTitle}</h2><p>{c.sourcesIntro}</p><ol>{sources.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noreferrer">{item.label} ↗</a><p>{item.note}</p></li>)}</ol></section>
        </div>
        <footer className="article-footer">{c.footer.map(p => <p key={p}>{p}</p>)}<div className="article-tags">{c.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link prefetch={false} className="end-link" href={path + "/cards"}>{c.ui.cardsLink} →</Link></footer>
      </article></main>
    </div><GuideFooter locale={locale} /><ArticleFeedback locale={locale} />
  </div>;
}
