"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  MessageCircle,
  Send,
} from "lucide-react";
import { Noto_Sans_KR, Noto_Sans_Thai } from "next/font/google";
import { sendGaEvent } from "../ga4";
import { ConsultationNavigation } from "@/components/common/PublicResourceLinks";
import * as koreanContent from "./content-ko";
import * as thaiContent from "./content";
import "./b2b-landing.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

type ContactChannel = "line" | "whatsapp";
type ContactPlacement = "floating" | "final";
type LandingLocale = "ko" | "th";

const concernEventSuffixes = {
  skin: "Concern_Skin_View",
  line: "Concern_Line_View",
  eye: "Concern_Eye_View",
} as const;

function trackContact(
  channel: ContactChannel,
  placement: ContactPlacement,
  eventPrefix: "KR" | "TH",
) {
  const eventName =
    placement === "floating"
      ? channel === "line"
        ? `${eventPrefix}_Floating_LINE_Click`
        : `${eventPrefix}_Floating_WA_Click`
      : channel === "line"
        ? `${eventPrefix}_Final_LINE_Click`
        : `${eventPrefix}_Final_WA_Click`;

  sendGaEvent(eventName, {
    channel,
    placement,
    landing_path: window.location.pathname,
  });
}

export default function B2BThailandLandingClient({
  locale = "th",
}: {
  locale?: LandingLocale;
}) {
  const content = locale === "ko" ? koreanContent : thaiContent;
  const {
    concerns,
    employeeBenefits,
    faqs,
    LINE_URL,
    pageCopy,
    painPoints,
    privacyIcon: PrivacyIcon,
    processSteps,
    supportItems,
    trustPoints,
    WHATSAPP_URL,
  } = content;
  const fontClass = locale === "ko" ? notoSansKR.className : notoSansThai.className;
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    sendGaEvent(`${pageCopy.eventPrefix}_B2C_PageView`, {
      landing_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pageCopy.eventPrefix]);

  useEffect(() => {
    const fired = new Set<number>();
    const thresholds = [25, 50, 75, 100];

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable <= 0 ? 100 : Math.min(100, (window.scrollY / scrollable) * 100);

      thresholds.forEach((threshold) => {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          sendGaEvent(`${pageCopy.eventPrefix}_B2C_Scroll_${threshold}`, {
            percent_scrolled: threshold,
            landing_path: window.location.pathname,
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pageCopy.eventPrefix]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const fired = new Set<string>();
    const elements = root.querySelectorAll<HTMLElement>("[data-concern]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const concern = (entry.target as HTMLElement).dataset.concern as keyof typeof concernEventSuffixes;
          if (!concern || fired.has(concern)) return;
          fired.add(concern);
          sendGaEvent(`${pageCopy.eventPrefix}_${concernEventSuffixes[concern]}`, {
            concern,
            landing_path: window.location.pathname,
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pageCopy.eventPrefix]);

  return (
    <div ref={pageRef} lang={pageCopy.lang} className={`th-b2b-page ${fontClass}`}>
      <header className="th-header">
        <div className="th-container th-header-inner">
          <a href="#top" className="th-brand" aria-label={pageCopy.headerAria}>
            <Image src="/relyn_logo.png" alt="RELYN" width={118} height={42} priority />
          </a>
          <span className="th-header-note">{pageCopy.headerNote}</span>
        </div>
      </header>

      <main id="top">
        <section className="th-hero" aria-labelledby="hero-title">
          <Image
            src="/customerinquiry/b2b/hero-thailand.png"
            alt={pageCopy.heroAlt}
            fill
            sizes="100vw"
            className="th-hero-image"
            priority
          />
          <div className="th-hero-overlay" />
          <div className="th-container th-hero-content">
            <div className="th-hero-copy">
              <p className="th-kicker">{pageCopy.heroKicker}</p>
              <h1 id="hero-title">
                {pageCopy.heroTitle}
                <span>{pageCopy.heroTitleAccent}</span>
              </h1>
              <p className="th-hero-lead">{pageCopy.heroLead}</p>
              <p className="th-hero-note">{pageCopy.heroNote}</p>
            </div>
          </div>
          <div className="th-hero-index" aria-hidden="true">
            <span>01</span>
            <i />
            <span>{pageCopy.heroLocation}</span>
          </div>
        </section>

        <section className="th-section th-pain-section" aria-labelledby="pain-title">
          <div className="th-container">
            <div className="th-section-heading th-section-heading-center">
              <p className="th-kicker">{pageCopy.painKicker}</p>
              <h2 id="pain-title">{pageCopy.painTitle}</h2>
            </div>
            <div className="th-pain-grid">
              {painPoints.map(({ title, description, icon: Icon }, index) => (
                <article className="th-pain-card" key={title}>
                  <span className="th-card-number">0{index + 1}</span>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="th-section th-solution-section" aria-labelledby="solution-title">
          <div className="th-container th-solution-layout">
            <div className="th-section-heading">
              <p className="th-kicker">{pageCopy.solutionKicker}</p>
              <h2 id="solution-title">{pageCopy.solutionTitle}</h2>
              <p>{pageCopy.solutionBody}</p>
              <blockquote>{pageCopy.solutionQuote}</blockquote>
            </div>
            <div className="th-support-card">
              <div className="th-support-card-top">
                <span>{pageCopy.supportLabel}</span>
                <MessageCircle aria-hidden="true" />
              </div>
              <ul>
                {supportItems.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="th-section th-concerns-section" aria-labelledby="concerns-title">
          <div className="th-container">
            <div className="th-section-heading th-section-heading-center">
              <p className="th-kicker">{pageCopy.concernsKicker}</p>
              <h2 id="concerns-title">{pageCopy.concernsTitle}</h2>
              <p>{pageCopy.concernsBody}</p>
            </div>

            <div className="th-concern-list">
              {concerns.map((concern, index) => {
                const Icon = concern.icon;
                return (
                  <article
                    className={`th-concern-card ${index % 2 === 1 ? "th-concern-card-reverse" : ""}`}
                    data-concern={concern.id}
                    key={concern.id}
                  >
                    <div className="th-concern-image-wrap">
                      <Image
                        src={concern.image}
                        alt={concern.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 42vw"
                        className="th-concern-image"
                      />
                      <span className="th-concern-count">0{index + 1}</span>
                    </div>
                    <div className="th-concern-copy">
                      <div className="th-concern-label">
                        <Icon aria-hidden="true" />
                        <span>{concern.eyebrow}</span>
                      </div>
                      <h3>{concern.title}</h3>
                      <p>{concern.summary}</p>
                      <p>{concern.detail}</p>
                      <div className="th-consult-box">
                        <strong>{pageCopy.consultLabel}</strong>
                        <p>{concern.consult}</p>
                      </div>
                      <div className="th-tags" aria-label={pageCopy.treatmentsAria}>
                        {concern.treatments.map((treatment) => (
                          <span key={treatment}>{treatment}</span>
                        ))}
                      </div>
                      <p className="th-medical-note">{concern.notice}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="th-section th-trust-section" aria-labelledby="trust-title">
          <div className="th-container th-trust-layout">
            <div className="th-section-heading">
              <p className="th-kicker">{pageCopy.trustKicker}</p>
              <h2 id="trust-title">{pageCopy.trustTitle}</h2>
              <p>{pageCopy.trustBodyOne}</p>
              <p>{pageCopy.trustBodyTwo}</p>
            </div>
            <div className="th-trust-points">
              {trustPoints.map(({ title, description, icon: Icon }, index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <p className="th-container th-wide-notice">{pageCopy.trustNotice}</p>
        </section>

        <section className="th-section th-process-section" aria-labelledby="process-title">
          <div className="th-container">
            <div className="th-section-heading th-section-heading-center th-heading-light">
              <p className="th-kicker">{pageCopy.processKicker}</p>
              <h2 id="process-title">{pageCopy.processTitle}</h2>
            </div>
            <ol className="th-process-grid">
              {processSteps.map((item) => (
                <li key={item.step}>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="th-section th-employee-section" aria-labelledby="employee-title">
          <div className="th-container th-employee-layout">
            <div className="th-employee-badge" aria-hidden="true">
              <span>{pageCopy.employeeBadgeCode}</span>
              <strong>{pageCopy.employeeBadgeText}</strong>
            </div>
            <div className="th-section-heading">
              <p className="th-kicker">{pageCopy.employeeKicker}</p>
              <h2 id="employee-title">{pageCopy.employeeTitle}</h2>
              <p>{pageCopy.employeeBody}</p>
              <ul className="th-benefit-list">
                {employeeBenefits.map((benefit) => (
                  <li key={benefit}>
                    <Check aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="th-medical-note">{pageCopy.employeeNotice}</p>
            </div>
          </div>
        </section>

        <section className="th-section th-faq-section" aria-labelledby="faq-title">
          <div className="th-container th-faq-layout">
            <div className="th-section-heading">
              <p className="th-kicker">{pageCopy.faqKicker}</p>
              <h2 id="faq-title">{pageCopy.faqTitle}</h2>
              <p>{pageCopy.faqBody}</p>
            </div>
            <div className="th-faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <article className={isOpen ? "is-open" : ""} key={faq.question}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={`faq-answer-${index}`} hidden={!isOpen}>
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="th-final-cta" aria-labelledby="final-cta-title">
          <div className="th-final-orb th-final-orb-one" />
          <div className="th-final-orb th-final-orb-two" />
          <div className="th-container th-final-content">
            <p className="th-kicker">{pageCopy.finalKicker}</p>
            <h2 id="final-cta-title">
              {pageCopy.finalTitle}
              <span>{pageCopy.finalTitleAccent}</span>
            </h2>
            <p>{pageCopy.finalBody}</p>
            <div className="th-final-actions">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noreferrer"
                className="th-contact-button th-line-button"
                onClick={() => trackContact("line", "final", pageCopy.eventPrefix)}
              >
                <MessageCircle aria-hidden="true" />
                <span>{pageCopy.finalLine}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="th-contact-button th-whatsapp-button"
                onClick={() => trackContact("whatsapp", "final", pageCopy.eventPrefix)}
              >
                <Send aria-hidden="true" />
                <span>{pageCopy.finalWhatsapp}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <p className="th-final-note">{pageCopy.finalNote}</p>
          </div>
        </section>
      </main>

      <footer className="th-footer">
        <ConsultationNavigation locale={locale} employee />
        <div className="th-container th-footer-inner">
          <div className="th-footer-brand">
            <Image src="/relyn_logo.png" alt="RELYN" width={100} height={35} />
            <p>{pageCopy.footerTagline}</p>
          </div>
          <p className="th-footer-disclaimer">
            <PrivacyIcon aria-hidden="true" />
            {pageCopy.footerDisclaimer}
          </p>
        </div>
      </footer>

      <aside className="th-floating-contact" aria-label={pageCopy.floatingAria}>
        <p>{pageCopy.floatingLabel}</p>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noreferrer"
          className="th-line-button"
          onClick={() => trackContact("line", "floating", pageCopy.eventPrefix)}
        >
          <MessageCircle aria-hidden="true" />
          <span>{pageCopy.floatingLine}</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="th-whatsapp-button"
          onClick={() => trackContact("whatsapp", "floating", pageCopy.eventPrefix)}
        >
          <Send aria-hidden="true" />
          <span>{pageCopy.floatingWhatsapp}</span>
        </a>
      </aside>
    </div>
  );
}
