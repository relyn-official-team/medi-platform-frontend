"use client";

import * as React from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

type Props = {
  className?: string;
  speed?: number; // 기본 2
};

function stripBackgroundLikeLayers(json: any) {
  // "누끼" 목적: 전체 화면을 덮는 Solid/Background 레이어를 제거(가능한 경우)
  // Lottie spec에서 solid layer는 보통 ty: 1 로 표현됨(툴/버전에 따라 다를 수 있음).
  // 안전하게 "전체 comp 크기 덮는 단색 레이어"만 제거 시도.
  try {
    if (!json || !Array.isArray(json.layers)) return json;

    const w = json.w;
    const h = json.h;

    const layers = json.layers.filter((layer: any) => {
      // solid layer(ty===1) 이면서 comp size와 동일하면 배경일 가능성이 높음
      const isSolid = layer?.ty === 1;
      const isFullSize = layer?.sw === w && layer?.sh === h;
      const name = String(layer?.nm ?? "").toLowerCase();

      const looksLikeBgName =
        name.includes("bg") || name.includes("background") || name.includes("grid");

      // 강하게 제거하면 위험하니, "solid + fullsize" 또는 "이름이 bg 계열"만 제거
      if ((isSolid && isFullSize) || (isSolid && looksLikeBgName)) return false;

      return true;
    });

    return { ...json, layers };
  } catch {
    return json;
  }
}

export default function LottieHero({ className, speed = 0.4 }: Props) {
  const lottieRef = React.useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    let cancelled = false;

    fetch("/lottie/relyn-chain.json")
      .then((r) => {
        if (!r.ok) throw new Error("failed_to_load_lottie_json");
        return r.json();
      })
      .then((json) => {
        if (cancelled) return;
        setAnimationData(stripBackgroundLikeLayers(json));
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!animationData) {
    return (
      <div className={`grid h-full w-full place-items-center ${className ?? ""}`}>
        <div className="text-xs text-neutral-500">Loading animation…</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay
        className="h-full w-full"
        onDOMLoaded={() => {
          // 로드 완료 후에야 ref가 안전하게 준비되는 케이스가 많음
          lottieRef.current?.setSpeed(speed);
        }}
      />
    </div>
  );
}