"use client";

import Image from "@/app/korean-skin-treatments/shared/GuideImage";
import { useEffect, useRef } from "react";
import type { ReviewLocale } from "@/lib/review-guide-locales";
import { reviewVisualCopy } from "../review-guide-shared/visual-copy";
import "./review-motion-scenes.css";

const scenes = {
  creator: {
    image: "review-creator.png",
    alt: "스마트폰과 조명을 준비해 미용 후기 콘텐츠를 촬영하는 과정을 표현한 AI 이미지",
    title: "후기에도 콘텐츠를 만드는 과정이 있어요.",
    caption: "마음이 끌렸다면, 작성자와 병원의 관계도 함께 확인해요.",
    number: "01",
  },
  compare: {
    image: "review-compare.png",
    alt: "스마트폰과 노트북으로 여러 후기를 비교하는 독자를 표현한 AI 이미지",
    title: "별점보다, 반복되는 경험에 주목해요.",
    caption: "대기시간·비용 안내·사후 응대처럼 비교할 수 있는 내용을 모아보세요.",
    number: "02",
  },
  questions: {
    image: "review-questions.png",
    alt: "예약 전에 확인할 질문을 노트에 적는 손을 표현한 AI 이미지",
    title: "후기를 읽었다면, 나의 질문을 남겨요.",
    caption: "확인하지 못한 부분은 상담 때 직접 물어볼 질문으로 정리하세요.",
    number: "03",
  },
};

export default function ReviewMotionScene({ kind, locale = "ko-KR" }: { kind: keyof typeof scenes; locale?: ReviewLocale }) {
  const figureRef = useRef<HTMLElement>(null);
  const compare = reviewVisualCopy[locale].compare;
  const scene = kind === "compare" ? { ...scenes.compare, ...compare } : scenes[kind];

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const observer = new IntersectionObserver(([entry]) => {
      figure.dataset.visible = String(entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  return <figure ref={figureRef} className={"review-motion-scene scene-" + kind} data-visible="false">
    <div className="scene-visual">
      <Image className="scene-photo" src={"/korean-skin-treatments/review-guide-kr/" + scene.image} alt={scene.alt} width={1536} height={1024} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 808px) calc(100vw - 60px), (max-width: 920px) 748px, (max-width: 1150px) calc(100vw - 292px), 748px" />
      {kind === "creator" && <>
        <svg className="scene-camera-frame" viewBox="0 0 600 400" fill="none" aria-hidden="true"><path d="M188 93V68H207M239 68H260V93M188 182V205H207M239 205H260V182" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
        <div className="scene-creator-notes"><span className="scene-mini-label scene-reveal">먼저 확인할 관계</span><div className="scene-label-card scene-reveal"><span className="scene-status-dot" /><div><strong>광고·협찬</strong><span>표시와 설명 살펴보기</span></div></div><div className="scene-label-card scene-reveal"><span className="scene-gift-icon" aria-hidden="true">＋</span><div><strong>제공·할인·이벤트</strong><span>어떤 혜택이 있었나요?</span></div></div></div>
      </>}
      {kind === "compare" && <div className="scene-compare-notes"><span className="scene-mini-label scene-reveal">{compare.badge}</span>{compare.topics.map((label, index) => <div className={"scene-review-row scene-reveal scene-delay-" + index} key={label}><span>{label}</span><span className="scene-repeat-mark" aria-hidden="true">↔</span></div>)}<span className="scene-compare-question scene-reveal">{compare.question}</span></div>}
      {kind === "questions" && <div className="scene-question-notes">{["비용", "경과", "사후 안내"].map((label, index) => <div className={"scene-note-line scene-delay-" + index} key={label}><svg viewBox="0 0 26 26" fill="none" aria-hidden="true"><rect x="3" y="3" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.2" opacity=".3" /><path className="scene-check-stroke" d="M7 13L11 17L20 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" /></svg><span className="scene-reveal">{label}</span></div>)}</div>}
    </div>
    <figcaption><span className="scene-caption-number" aria-hidden="true">{scene.number}</span><div><strong>{scene.title}</strong><span>{scene.caption}</span></div></figcaption>
  </figure>;
}
