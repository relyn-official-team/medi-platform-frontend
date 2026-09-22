"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";

const carouselCopy = {
  ko: { role: "캐러셀", label: "피부과 상담 가이드 10장", previous: "이전 카드", next: "다음 카드", select: "카드 선택", goTo: (number: number) => `${number}번 카드로 이동`, hint: "옆으로 넘기거나 화살표로 읽어보세요." },
  "zh-TW": { role: "輪播圖卡", label: "韓國皮膚科諮詢指南，10 張圖卡", previous: "上一張", next: "下一張", select: "選擇圖卡", goTo: (number: number) => `前往第 ${number} 張`, hint: "左右滑動，或使用箭頭閱讀。" },
  "ja-JP": { role: "カルーセル", label: "韓国の美容皮膚科カウンセリングガイド、10枚のカード", previous: "前のカード", next: "次のカード", select: "カードを選ぶ", goTo: (number: number) => `${number}枚目のカードへ`, hint: "左右にスワイプ、または矢印で読み進められます。" },
};

export default function CardCarousel({ children, locale = "ko" }: { children: ReactNode; locale?: keyof typeof carouselCopy }) {
  const copy = carouselCopy[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const count = Children.count(children);

  function navigate(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(count - 1, index));
    const slide = track.children[next] as HTMLElement;
    const left = track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    currentRef.current = next;
    setCurrent(next);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const center = track.getBoundingClientRect().left + track.clientWidth / 2;
        let nearest = 0, distance = Infinity;
        Array.from(track.children).forEach((slide, index) => {
          const rect = slide.getBoundingClientRect();
          const delta = Math.abs(rect.left + rect.width / 2 - center);
          if (delta < distance) { nearest = index; distance = delta; }
        });
        currentRef.current = nearest;
        setCurrent(nearest);
      }, 120);
    };
    const observer = new ResizeObserver(() => {
      const slide = track.children[currentRef.current] as HTMLElement | undefined;
      if (!slide) return;
      track.scrollTo({ left: track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left - (track.clientWidth - slide.offsetWidth) / 2, behavior: "instant" });
    });
    observer.observe(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); observer.disconnect(); track.removeEventListener("scroll", onScroll); };
  }, []);

  return <>
    <div ref={trackRef} className="card-track" id="card-track" role="region" aria-roledescription={copy.role} aria-label={copy.label} tabIndex={0} onKeyDown={event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      navigate(event.key === "Home" ? 0 : event.key === "End" ? count - 1 : currentRef.current + (event.key === "ArrowRight" ? 1 : -1));
    }}>{children}</div>
    <div className="carousel-controls">
      <button className="arrow-button" aria-label={copy.previous} type="button" disabled={current === 0} onClick={() => navigate(current - 1)}>←</button>
      <div className="card-progress"><p aria-live="polite" aria-atomic="true">{current + 1} / {count}</p><div className="card-dots" aria-label={copy.select}>{Array.from({length:count}, (_, index) => <button key={index} type="button" aria-label={copy.goTo(index + 1)} aria-current={index === current} onClick={() => navigate(index)} />)}</div></div>
      <button className="arrow-button" aria-label={copy.next} type="button" disabled={current === count - 1} onClick={() => navigate(current + 1)}>→</button>
    </div>
    <p className="swipe-hint">{copy.hint}</p>
  </>;
}
