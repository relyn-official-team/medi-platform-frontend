// frontend/components/common/StarRating.tsx
"use client";

import React from "react";
import { Star } from "lucide-react";

type Props = {
  value: number;                 // 표시: 0~5 (소수 가능), 입력: 1~5 (정수)
  onChange?: (v: number) => void; // 있으면 입력모드
  size?: number;                 // 기본 16
  readOnly?: boolean;            // 강제 읽기
  showValueText?: boolean;       // "4.9" 같은 텍스트 표시 여부
};

export default function StarRating({
  value,
  onChange,
  size = 16,
  readOnly,
}: Props) {
  const isInteractive = !!onChange && !readOnly;

  const clamp = (n: number) => Math.max(0, Math.min(5, n));
  const v = clamp(value);

  // half-star 표시를 위해 0~100% fill 계산
  const getFillPercent = (idx: number) => {
    const diff = v - idx;
    if (diff >= 1) return 100;
    if (diff <= 0) return 0;
    return Math.round(diff * 100); // 0~100
  };

  return (
   <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = getFillPercent(i);

        return (
          <button
            key={i}
            type="button"
            className={isInteractive ? "cursor-pointer" : "cursor-default"}
            onClick={() => {
              if (!isInteractive) return;
              onChange?.(i + 1); // 입력은 정수 1~5
            }}
            aria-label={`rating-${i + 1}`}
          >
           <span className="relative inline-block">
              {/* base (gray) */}
              <Star
                width={size}
                height={size}
 className="text-gray-300"
 fill="currentColor"
 stroke="none"
              />
              {/* overlay (yellow) */}
              <span
                className="absolute left-0 top-0 overflow-hidden"
                style={{ width: `${fill}%` }}
              >
                <Star
                  width={size}
                 height={size}
 className="text-yellow-400"
 fill="currentColor"
 stroke="none"
                />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
