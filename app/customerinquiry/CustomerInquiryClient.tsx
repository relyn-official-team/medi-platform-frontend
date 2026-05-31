"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { Noto_Sans_KR } from "next/font/google";
import { landingCopy, type Locale, type Line } from "./copy";
import "./customerinquiry.css";

// ── 트래킹 태그 ID (이 페이지 전용) ──
const LINE_TAG_ID = "c14e08c0-38d4-4fee-9537-62c085fb6ea9";
const META_PIXEL_ID = "4193423557588136";

// ── locale별 전환 이벤트 값 (한국어 기존값 유지, 일본어만 분리) ──
const lineConversionTypeByLocale: Record<Locale, string> = {
  ko: "koreadefault",
  ja: "japan",
  tw: "koreadefault",
  hk: "koreadefault",
};
const whatsappEventByLocale: Record<Locale, string> = {
  ko: "ChatStart",
  ja: "JPWA_ChatStart",
  tw: "ChatStart",
  hk: "ChatStart",
};
// LINE 클릭 시 추가로 보낼 Meta Pixel 이벤트 (일본어 페이지에만 적용)
const lineMetaEventByLocale: Partial<Record<Locale, string>> = {
  ja: "JPLINE_ChatStart",
};
// 문의 채널 링크 (현재 전 locale 동일, 추후 국가별 분리 가능)
const inquiryUrlsByLocale: Record<Locale, { line: string; whatsapp: string }> = {
  ko: { line: "https://lin.ee/VlIklsv", whatsapp: "https://wa.me/message/B6Y5CZ5WGIHXP1" },
  ja: { line: "https://lin.ee/VlIklsv", whatsapp: "https://wa.me/message/B6Y5CZ5WGIHXP1" },
  tw: { line: "https://lin.ee/VlIklsv", whatsapp: "https://wa.me/message/B6Y5CZ5WGIHXP1" },
  hk: { line: "https://lin.ee/VlIklsv", whatsapp: "https://wa.me/message/B6Y5CZ5WGIHXP1" },
};

declare global {
  interface Window {
    _lt?: (...args: unknown[]) => void;
    _ltq?: unknown[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

/** Line(조각 배열) → JSX. accent/strong 마크업 보존 */
function renderLine(line: Line, key: number) {
  return (
    <span key={key}>
      {line.map((seg, i) =>
        seg.a ? (
          <span className="accent" key={i}>
            {seg.t}
          </span>
        ) : seg.s ? (
          <strong key={i}>{seg.t}</strong>
        ) : (
          <span key={i}>{seg.t}</span>
        ),
      )}
    </span>
  );
}

/** 여러 줄 → <br/>로 연결 */
function renderLines(lines: Line[]) {
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 ? <br /> : null}
      {renderLine(line, i)}
    </span>
  ));
}

export default function CustomerInquiryClient({
  locale = "ko",
}: {
  locale?: Locale;
}) {
  const c = landingCopy[locale] ?? landingCopy.ko!;

  // locale별 전환 이벤트/링크 값
  const lineConversionType = lineConversionTypeByLocale[locale] ?? "koreadefault";
  const whatsappEventName = whatsappEventByLocale[locale] ?? "ChatStart";
  const lineMetaEventName = lineMetaEventByLocale[locale];
  const inquiryUrls = inquiryUrlsByLocale[locale] ?? inquiryUrlsByLocale.ko;

  const pageRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const curRingRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // ── 커스텀 커서 (PC 전용, 터치/모바일 비활성화) ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(hover: none), (max-width: 768px)").matches;
    if (isCoarse) return;

    const cur = curRef.current;
    const ring = curRingRef.current;
    const page = pageRef.current;
    if (!cur || !ring || !page) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    };
    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(animate);
    };

    const interactive = page.querySelectorAll<HTMLElement>(
      "a,button,.treat-card,.pain-bubble,.sol-card,.how-card,.rv-card",
    );
    const onEnter = () => ring.classList.add("hov");
    const onLeave = () => ring.classList.remove("hov");

    document.addEventListener("mousemove", onMove);
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── 스크롤 시 nav 상태 ──
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("sc", window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── IntersectionObserver reveal ──
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const els = page.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ── 앵커/CTA 스무스 스크롤 ──
  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── LINE 문의 버튼 클릭: LINE Tag 전환 이벤트 (+ 일본어는 Meta Pixel 추가) ──
  const handleLineClick = () => {
    if (typeof window !== "undefined" && typeof window._lt === "function") {
      window._lt("send", "cv", { type: lineConversionType }, [LINE_TAG_ID]);
    }
    if (
      lineMetaEventName &&
      typeof window !== "undefined" &&
      typeof window.fbq === "function"
    ) {
      window.fbq("trackCustom", lineMetaEventName);
    }
  };

  // ── WhatsApp 문의 버튼 클릭: Meta Pixel custom 이벤트 ──
  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", whatsappEventName);
    }
  };

  return (
    <div ref={pageRef} className={`customer-inquiry-page ${notoSansKR.className}`}>
      {/* ── LINE Tag Base Code (이 페이지에서만 로드) ── */}
      <Script id="line-tag-base" strategy="afterInteractive">
        {`
(function(g,d,o){
  g._ltq=g._ltq||[];
  g._lt=g._lt||function(){g._ltq.push(arguments)};
  var h=location.protocol==='https:'?'https://d.line-scdn.net':'http://d.line-cdn.net';
  var s=d.createElement('script');s.async=1;
  s.src=o||h+'/n/line_tag/public/release/v1/lt.js';
  var t=d.getElementsByTagName('script')[0];t.parentNode.insertBefore(s,t);
})(window, document);
_lt('init', {
  customerType: 'account',
  tagId: '${LINE_TAG_ID}'
});
_lt('send', 'pv', ['${LINE_TAG_ID}']);
`}
      </Script>

      {/* ── Meta Pixel Base Code (이 페이지에서만 로드) ── */}
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`}
      </Script>

      <div className="cur" ref={curRef} aria-hidden />
      <div className="cur-r" ref={curRingRef} aria-hidden />

      {/* NAV */}
      <nav className="ci-nav" ref={navRef}>
        <button
          type="button"
          className="nav-logo"
          onClick={scrollToTop}
          aria-label="RELYN customer inquiry page"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/relyn_logo.png" alt="RELYN" className="nav-logo-img" />
        </button>
        <div className="nav-links">
          {c.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollToId(e, l.href.slice(1))}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a href="#consult" className="nav-cta" onClick={(e) => scrollToId(e, "consult")}>
          {c.nav.cta}
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {c.hero.badge}
          </div>
          <div className="hero-visual">
            <Image
              src="/landingsource/customerinquiry_Acut_down.png"
              alt="customer inquiry hero model"
              width={560}
              height={700}
              className="hero-model"
              priority
            />
          </div>
          <div className="hero-copy">
            <h1 className="hero-h1">
              {c.hero.h1.map((line, i) => (
                <span className="hero-title-line" key={i}>
                  {renderLine(line, i)}
                </span>
              ))}
            </h1>
            <p className="hero-sub">{renderLines(c.hero.sub)}</p>
            <div className="hero-btns">
              <a href="#consult" className="btn-primary" onClick={(e) => scrollToId(e, "consult")}>
                {c.hero.btnPrimary}
              </a>
              <a
                href="#treatments"
                className="btn-secondary"
                onClick={(e) => scrollToId(e, "treatments")}
              >
                {c.hero.btnSecondary}
              </a>
            </div>
            <div className="hero-stats">
              {c.hero.stats.map((s, i) => (
                <span key={i} style={{ display: "contents" }}>
                  {i > 0 ? <span className="hero-stat-div" /> : null}
                  <span className="hero-stat">
                    <span className="hero-stat-n">{s.n}</span>
                    <span className="hero-stat-l">{s.l}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="mq" aria-label="피부미용시술 카테고리">
        <div className="mq-track">
          {[...c.marquee, ...c.marquee].map((m, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span className="mq-item">{m}</span>
              <span className="mq-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* PAIN */}
      <section className="pain-sec sec">
        <div className="sec-inner">
          <div className="chip reveal">{c.pain.chip}</div>
          <h2 className="sec-h2 reveal">{renderLines(c.pain.h2)}</h2>
          <p className="sec-sub reveal">{c.pain.sub}</p>
          <div className="pain-bubbles reveal">
            {c.pain.tags.map((item) => (
              <div className={`pain-bubble-row ${item.align}`} key={item.text}>
                <div className={`pain-bubble ${item.variant}`}>
                  <span className="pain-bubble-plus">+</span>
                  <span className="pain-bubble-text">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERT */}
      <section className="expert-sec sec">
        <div className="sec-inner">
          <div className="expert-grid">
            <div>
              <div className="chip reveal">{c.expert.chip}</div>
              <h2 className="sec-h2 reveal">{renderLines(c.expert.h2)}</h2>
              <div className="hook-box reveal">
                <p>
                  {c.expert.hook.map((line, i) => (
                    <span key={i}>
                      {i > 0 ? (
                        <>
                          <br />
                          <br />
                        </>
                      ) : null}
                      {renderLine(line, i)}
                    </span>
                  ))}
                </p>
              </div>
              <p className="expert-desc reveal">{c.expert.desc}</p>
              <div className="feat-list reveal">
                {c.expert.feats.map((f, i) => (
                  <div className="feat-item" key={i}>
                    <div className="feat-icon">{f.icon}</div>
                    <div>
                      <div className="feat-t">{f.t}</div>
                      <div className="feat-d">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="expert-visual reveal">
              <div
                className="expert-image-panel"
                role="img"
                aria-label={c.expert.visualLabel}
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-sec sec" id="how">
        <div className="sec-inner">
          <div className="chip reveal">{c.how.chip}</div>
          <h2 className="sec-h2 reveal">{renderLines(c.how.h2)}</h2>
          <p className="sec-sub reveal">{c.how.sub}</p>
          <div className="how-steps">
            {c.how.steps.map((s, i) => (
              <div className={`how-card reveal reveal-delay-${i + 1}`} key={i}>
                <div className="how-num">{s.num}</div>
                <div className="how-icon">{s.icon}</div>
                <div className="how-t">{s.t}</div>
                <p className="how-d">{s.d}</p>
                {s.tag ? <div className="how-tag">{s.tag}</div> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="sol-sec sec">
        <div className="sec-inner">
          <div className="chip reveal">{c.sol.chip}</div>
          <h2 className="sec-h2 reveal">{renderLines(c.sol.h2)}</h2>
          <p className="sec-sub reveal">{c.sol.sub}</p>
          <div className="sol-grid reveal">
            {c.sol.cards.map((card, i) => (
              <div className="sol-card" key={i}>
                <div className="sol-n">{card.n}</div>
                <div className="sol-t">{card.t}</div>
                <p className="sol-d">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="treat-sec sec" id="treatments">
        <div className="sec-inner">
          <div className="chip reveal">{c.treat.chip}</div>
          <h2 className="sec-h2 reveal">{renderLines(c.treat.h2)}</h2>
          <div className="treat-grid reveal">
            {c.treat.cards.map((card, i) => (
              <button
                type="button"
                className="treat-card"
                key={i}
                onClick={(e) => scrollToId(e, "consult")}
              >
                <span className="treat-em">{card.em}</span>
                <div className="treat-n">{card.n}</div>
                <div className="treat-ex">{card.ex}</div>
                <div className="treat-arr">{c.treat.cardCta}</div>
              </button>
            ))}
          </div>
          {/* /information 페이지 구축 전까지 임시 비활성화
          <div className="treat-more-wrap reveal">
            <a href="/information" className="treat-more-btn">
              {c.treat.moreBtn}
            </a>
          </div>
          */}
        </div>
      </section>

      {/* MID CTA */}
      <div className="mid-cta-wrap" style={{ paddingBottom: 0 }}>
        <div className="mid-cta reveal">
          <div className="mid-cta-t">
            {c.midCta.text.map((line, i) => {
              const text = line.map((seg) => seg.t).join("");
              const isAccent = line.some((seg) => seg.a);
              return (
                <span key={i}>
                  {i > 0 ? <br /> : null}
                  {isAccent ? <span>{text}</span> : text}
                </span>
              );
            })}
          </div>
          <a href="#consult" className="btn-primary" onClick={(e) => scrollToId(e, "consult")}>
            {c.midCta.btn}
          </a>
        </div>
      </div>

      {/* PROOF */}
      <section className="proof-sec sec">
        <div className="sec-inner">
          <div className="chip reveal">{c.proof.chip}</div>
          <h2 className="sec-h2 reveal">{renderLines(c.proof.h2)}</h2>
          <div className="proof-stats reveal">
            {c.proof.stats.map((s, i) => (
              <div className="p-stat" key={i}>
                <div className="p-n">{s.n}</div>
                <div className="p-l">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="reviews-grid reveal">
            {c.proof.reviews.map((r, i) => (
              <div className="rv-card" key={i}>
                <div className="rv-stars">★★★★★</div>
                <p className="rv-text">{r.text}</p>
                <div className="rv-author">
                  <div className="rv-flag">{r.flag}</div>
                  <div>
                    <div className="rv-name">{r.name}</div>
                    <div className="rv-from">{r.from}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="form-sec sec" id="consult">
        <div className="sec-inner">
          <div className="form-grid">
            <div>
              <div className="chip reveal">{c.form.chip}</div>
              <h2 className="form-lh2 reveal">{renderLines(c.form.lh2)}</h2>
              <p className="form-lsub reveal">{c.form.lsub}</p>
              <ul className="form-perks reveal">
                {c.form.perks.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="contact-card reveal">
              <div className="contact-card-top">
                <h3>{c.form.contact.title}</h3>                <p>{c.form.contact.desc}</p>
              </div>
              <div className="contact-card-body">
                <a
                  href={inquiryUrls.line}
                  className="contact-channel-btn line"
                  onClick={handleLineClick}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-channel-main">{c.form.contact.lineMain}</span>
                  <span className="contact-channel-sub">{c.form.contact.lineSub}</span>
                </a>
                <a
                  href={inquiryUrls.whatsapp}
                  className="contact-channel-btn whatsapp"
                  onClick={handleWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-channel-main">{c.form.contact.whatsappMain}</span>
                  <span className="contact-channel-sub">{c.form.contact.whatsappSub}</span>
                </a>
                <p className="contact-disc">{c.form.contact.disc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ci-footer">
        <div className="ft-txt">{c.footer.copyright}</div>
        <div className="ft-links">
          {c.footer.links.map((l, i) => (
            <a href="#" key={i}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
