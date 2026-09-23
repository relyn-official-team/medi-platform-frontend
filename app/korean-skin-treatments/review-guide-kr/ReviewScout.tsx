"use client";

import { preload } from "react-dom";
import { useEffect, useId, useRef } from "react";
import type { ReviewLocale } from "@/lib/review-guide-locales";
import { reviewVisualCopy } from "../review-guide-shared/visual-copy";
import { guideImages } from "../shared/image-manifest";

// The SVG is displayed at about 300–400px. A pre-encoded 768px image also covers high-density phones.
const portrait = guideImages["/korean-skin-treatments/review-guide-kr/review-scout-photo.png"].variants.find(image => image.width === 768)!;

export default function ReviewScout({ compact = false, locale = "ko-KR" }: { compact?: boolean; locale?: ReviewLocale }) {
  // SVG image URLs are otherwise discovered later than ordinary HTML images.
  preload(portrait.src, { as: "image", fetchPriority: "high" });
  const copy = reviewVisualCopy[locale];
  const figureRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const clipId = useId().replace(/:/g, "");

  useEffect(() => {
    const figure = figureRef.current;
    const stage = stageRef.current;
    if (!figure || !stage) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false, frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      figure.dataset.reducedMotion = String(preference.matches);
      figure.style.setProperty("--ambient-x", "0px");
      figure.style.setProperty("--ambient-y", "0px");
    };
    const move = (event: PointerEvent) => {
      if (preference.matches || !visible || document.hidden) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (preference.matches || !visible || document.hidden) return;
        const rect = stage.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
        // Pointer movement affects decorations only; the portrait stays still.
        figure.style.setProperty("--ambient-x", x * 6 + "px");
        figure.style.setProperty("--ambient-y", y * 4 + "px");
      });
    };
    const visibility = () => {
      figure.dataset.visible = String(visible && !document.hidden);
      if (document.hidden) reset();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibility();
      if (!visible) reset();
    }, { threshold: 0.15 });
    observer.observe(stage);
    reset();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    document.documentElement.addEventListener("pointerleave", reset);
    preference.addEventListener("change", reset);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
      document.documentElement.removeEventListener("pointerleave", reset);
      preference.removeEventListener("change", reset);
    };
  }, []);

  return <div ref={figureRef} className={"review-scout" + (compact ? " scout-compact" : "")} data-visible="false">
    <div ref={stageRef} className="scout-character" role="img" aria-label={compact ? copy.compactAlt : copy.scoutAlt}>
      <svg viewBox={compact ? "0 0 360 290" : "0 0 360 320"} fill="none" aria-hidden="true">
        <defs>
          <radialGradient id={clipId + "-halo"}><stop stopColor="#fff" /><stop offset=".72" stopColor="#ddd6ff" stopOpacity=".65" /><stop offset="1" stopColor="#c5d8ff" stopOpacity="0" /></radialGradient>
          <linearGradient id={clipId + "-fade"} x1="0" y1="0" x2="0" y2="1"><stop offset=".89" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient>
          <mask id={clipId + "-portrait"}><rect width="360" height={compact ? 290 : 320} fill={"url(#" + clipId + "-fade)"} /></mask>
        </defs>
        <circle cx="182" cy="160" r="130" fill={"url(#" + clipId + "-halo)"} />
        <circle cx="183" cy="160" r="115" stroke="#8398d1" strokeOpacity=".18" strokeWidth="1" strokeDasharray="2 9" />
        {!compact && <g className="scout-review-comments">
          <g transform="translate(8 35) rotate(-5 66 24)"><rect width="132" height="49" rx="11" /><text x="12" y="17" className="scout-comment-label">{copy.example}</text><text x="12" y="34">{copy.comments[0]}</text></g>
          <g transform="translate(215 90) rotate(4 68 24)"><rect width="137" height="49" rx="11" /><text x="12" y="17" className="scout-comment-label">{copy.example}</text><text x="12" y="34">{copy.comments[1]}</text></g>
          <g transform="translate(1 158) rotate(-4 70 24)"><rect width="141" height="49" rx="11" /><text x="12" y="17" className="scout-comment-label">{copy.example}</text><text x="12" y="34">{copy.comments[2]}</text></g>
        </g>}
        <g className="scout-portrait" mask={"url(#" + clipId + "-portrait)"}>
          <image href={portrait.src} x="24" y={compact ? 2 : 18} width="308" height="308" />
        </g>
        <g className="scout-ambient-motion">
          <g transform="translate(45 112)"><path className="scout-decoration scout-star" d="M0-12Q0 0 11 0Q0 0 0 12Q0 0-11 0Q0 0 0-12Z" fill="#5579e3" /></g>
          <g transform="translate(312 57)"><path className="scout-decoration scout-star scout-decoration-delay" d="M0-9Q0 0 8 0Q0 0 0 9Q0 0-8 0Q0 0 0-9Z" fill="#a28add" /></g>
          <g transform="translate(57 225)"><path className="scout-decoration scout-star" d="M0-6Q0 0 5 0Q0 0 0 6Q0 0-5 0Q0 0 0-6Z" fill="#8baae9" /></g>
          <g transform="translate(72 55) rotate(-16)"><path className="scout-decoration scout-heart" d="M0 8C-3 5-10 1-10-4C-10-10-3-12 0-6C3-12 10-10 10-4C10 1 3 5 0 8Z" fill="#ffe6ee" stroke="#e49ab8" strokeWidth="1.6" strokeLinejoin="round" /></g>
          <g transform="translate(314 190) rotate(14)"><path className="scout-decoration scout-heart scout-decoration-delay" d="M0 7C-3 4-8 1-8-3C-8-8-2-10 0-5C2-10 8-8 8-3C8 1 3 4 0 7Z" fill="#edb4cb" /></g>
        </g>
      </svg>
    </div>
  </div>;
}
