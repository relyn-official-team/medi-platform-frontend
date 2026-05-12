"use client";

import { useState } from "react";
import { Clock, CheckCircle2, Banknote, CircleDollarSign } from "lucide-react";

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
      icon: Clock,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      activeBg: "bg-amber-50",
      activeBorder: "border-amber-400",
      activeText: "text-amber-700",
      countColor: "text-amber-600",
    },
    {
      key: "CONFIRMED",
      label: "예약완료",
      count: confirmedCount,
      icon: CheckCircle2,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      activeBg: "bg-blue-50",
      activeBorder: "border-blue-500",
      activeText: "text-blue-700",
      countColor: "text-blue-600",
    },
    {
      key: "SETTLEMENT",
      label: "정산대기",
      count: settlementPendingCount,
      icon: Banknote,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      activeBg: "bg-orange-50",
      activeBorder: "border-orange-500",
      activeText: "text-orange-700",
      countColor: "text-orange-600",
    },
    {
      key: "SETTLED",
      label: "정산완료",
      count: completedCount,
      icon: CircleDollarSign,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      activeBg: "bg-green-50",
      activeBorder: "border-green-500",
      activeText: "text-green-700",
      countColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3">
      {items.map(({
        key, label, count, icon: Icon,
        iconColor, bgColor, borderColor,
        activeBg, activeBorder, activeText, countColor,
      }) => {
        const active = selected === key;

        return (
          <button
            key={key}
            onClick={() => {
              setSelected(active ? null : key);
              onFilter?.(active ? {} : { status: key });
            }}
            className={`
              group relative w-full rounded-xl border px-3 py-3 sm:px-4 sm:py-3.5
              text-left transition-all duration-150
              hover:shadow-md active:scale-[0.98]
              ${active
                ? `${activeBg} ${activeBorder} shadow-sm`
                : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
          >
            <div className="flex items-center justify-between">
              {/* 아이콘 + 레이블 */}
              <div className="flex items-center gap-2">
                <div
                  className={`
                    flex h-7 w-7 items-center justify-center rounded-lg
                    ${active ? bgColor : "bg-gray-50 group-hover:" + bgColor}
                    transition-colors
                  `}
                >
                  <Icon className={`h-3.5 w-3.5 ${active ? iconColor : "text-gray-400 group-hover:" + iconColor.replace("text-", "text-")}`} />
                </div>
                <span className={`text-xs font-medium sm:text-[13px] ${active ? activeText : "text-gray-600"}`}>
                  {label}
                </span>
              </div>

              {/* 카운트 */}
              <span
                className={`
                  text-xl font-black sm:text-2xl leading-none tabular-nums
                  ${active ? countColor : "text-gray-800"}
                `}
              >
                {count}
              </span>
            </div>

            {/* 활성 인디케이터 바 */}
            {active && (
              <div className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${bgColor.replace("bg-", "bg-").replace("50", "400")}`} />
            )}
          </button>
        );
      })}
    </div>
  );
}
