"use client";

import { useState } from "react";

interface StatusSummaryProps {
  waitingCount?: number;
  confirmedCount?: number;
  settlementPendingCount?: number;
  completedCount?: number;
  onFilter?: (filters: any) => void;
}

export default function StatusSummary({
  waitingCount = 0,
  confirmedCount = 0,
  settlementPendingCount = 0,
  completedCount = 0,
  onFilter,
}: StatusSummaryProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const items = [
    {
      key: "PENDING",
      label: "예약대기",
      count: waitingCount,
      dotColor: "bg-yellow-500",
      activeColor: "border-yellow-400 bg-yellow-50",
    },
    {
      key: "CONFIRMED",
      label: "예약완료",
      count: confirmedCount,
      dotColor: "bg-blue-600",
      activeColor: "border-blue-500 bg-blue-50",
    },
    {
      key: "SETTLEMENT",
      label: "정산대기",
      count: settlementPendingCount,
      dotColor: "bg-orange-500",
      activeColor: "border-orange-500 bg-orange-50",
    },
    {
      key: "SETTLED",
      label: "정산완료",
      count: completedCount,
      dotColor: "bg-green-600",
      activeColor: "border-green-500 bg-green-50",
    },
  ];

  return (
    <div
      className="
        grid grid-cols-2 
        sm:grid-cols-2 
        md:grid-cols-2 
        xl:grid-cols-4 
        gap-2 sm:gap-3 md:gap-4
      "
    >
      {items.map(({ key, label, count, dotColor, activeColor }) => {
        const active = selected === key;

        return (
          <button
            key={key}
            onClick={() => {
              setSelected(active ? null : key);
              onFilter?.(active ? {} : { status: key });
            }}
            className={`
              w-full border rounded-lg transition-all 
              flex items-center justify-between

              /* 모바일 compact */
              px-3 py-2 
              sm:px-3 sm:py-2
              md:px-4 md:py-3

              hover:border-gray-300
              ${active ? activeColor : "border-gray-200 bg-white"}
            `}
          >
            {/* 좌측 텍스트 & dot */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-2 h-2 rounded-full ${dotColor}`} />
              <span className="text-gray-600 text-xs sm:text-sm md:text-sm">
                {label}
              </span>
            </div>

            {/* 숫자 */}
            <span
              className="
                text-gray-900 font-semibold 
                text-lg sm:text-xl md:text-2xl
              "
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

