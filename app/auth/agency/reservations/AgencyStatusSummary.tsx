"use client";

import { useState } from "react";
import { ReservationStatus } from "@/types/reservation";

interface Props {
  pending: number;
  confirmed: number;
  settlementPending: number;
  settled: number;
  cancelled: number;
  onFilter: (status: "" | "PENDING" | "CONFIRMED" | "SETTLEMENT" | "SETTLED" | "CANCELLED") => void;
}

export default function AgencyStatusSummary({
  pending,
  confirmed,
  settlementPending,
  settled,
  cancelled,
  onFilter,
}: Props) {
  const [selected, setSelected] = useState<ReservationStatus | null>(null);

  const items = [
    {
      key: "PENDING" as const,
      label: "예약대기",
      count: pending,
      dotColor: "bg-yellow-500",
      activeColor: "border-yellow-400 bg-yellow-50",
    },
    {
      key: "CONFIRMED" as const,
      label: "예약완료",
      count: confirmed,
      dotColor: "bg-blue-600",
      activeColor: "border-blue-500 bg-blue-50",
    },
    {
  key: "SETTLEMENT" as const,
  label: "정산대기",
  count: settlementPending,
  dotColor: "bg-orange-500",
  activeColor: "border-orange-500 bg-orange-50",
},
    {
      key: "SETTLED" as const,
      label: "정산완료",
      count: settled,
      dotColor: "bg-green-600",
      activeColor: "border-green-500 bg-green-50",
    },
    {
      key: "CANCELLED" as const,
      label: "취소",
      count: cancelled,
      dotColor: "bg-gray-500",
      activeColor: "border-gray-400 bg-gray-50",
    },
  ];

  return (
    <div
      className="
        grid grid-cols-2
        sm:grid-cols-2
        md:grid-cols-2
        xl:grid-cols-5
        gap-2 sm:gap-3 md:gap-4
      "
    >
      {items.map(({ key, label, count, dotColor, activeColor }) => {
        const active = selected === key;

        return (
          <button
            key={key}
            onClick={() => {
              const next = active ? "" : key;
              setSelected(active ? null : key);
              onFilter(next);
            }}
            className={`
              w-full border rounded-lg transition-all
              flex items-center justify-between
              px-3 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3
              hover:border-gray-300
              ${active ? activeColor : "border-gray-200 bg-white"}
            `}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-2 h-2 rounded-full ${dotColor}`} />
              <span className="text-gray-600 text-xs sm:text-sm">
                {label}
              </span>
            </div>

            <span className="text-gray-900 font-semibold text-lg sm:text-xl">
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
