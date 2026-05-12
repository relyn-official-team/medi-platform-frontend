"use client";

import { useState } from "react";
import { ReservationStatus } from "@/types/reservation";
import { Clock, CheckCircle2, Banknote, CircleDollarSign, XCircle } from "lucide-react";

interface Props {
  pending: number;
  confirmed: number;
  settlementPending: number;
  settled: number;
  cancelled: number;
  onFilter: (status: "" | "PENDING" | "CONFIRMED" | "SETTLEMENT" | "SETTLED" | "CANCELLED") => void;
}

const STATUS_META = [
  {
    key: "PENDING" as const,
    label: "예약대기",
    icon: Clock,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    activeCard: "border-amber-300 bg-amber-50/60",
    activeDot: "bg-amber-400",
  },
  {
    key: "CONFIRMED" as const,
    label: "예약완료",
    icon: CheckCircle2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    activeCard: "border-blue-400 bg-blue-50/60",
    activeDot: "bg-blue-500",
  },
  {
    key: "SETTLEMENT" as const,
    label: "정산대기",
    icon: Banknote,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    activeCard: "border-orange-400 bg-orange-50/60",
    activeDot: "bg-orange-400",
  },
  {
    key: "SETTLED" as const,
    label: "정산완료",
    icon: CircleDollarSign,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    activeCard: "border-emerald-400 bg-emerald-50/60",
    activeDot: "bg-emerald-500",
  },
  {
    key: "CANCELLED" as const,
    label: "취소",
    icon: XCircle,
    iconColor: "text-gray-400",
    iconBg: "bg-gray-100",
    activeCard: "border-gray-400 bg-gray-50/60",
    activeDot: "bg-gray-400",
  },
];

export default function AgencyStatusSummary({
  pending,
  confirmed,
  settlementPending,
  settled,
  cancelled,
  onFilter,
}: Props) {
  const [selected, setSelected] = useState<ReservationStatus | null>(null);

  const counts: Record<string, number> = {
    PENDING: pending,
    CONFIRMED: confirmed,
    SETTLEMENT: settlementPending,
    SETTLED: settled,
    CANCELLED: cancelled,
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-5">
      {STATUS_META.map(({ key, label, icon: Icon, iconColor, iconBg, activeCard }) => {
        const active = selected === key;
        const count = counts[key] ?? 0;

        return (
          <button
            key={key}
            onClick={() => {
              const next = active ? "" : key;
              setSelected(active ? null : key);
              onFilter(next);
            }}
            className={`
              group relative w-full overflow-hidden rounded-xl border
              px-3 py-3 text-left
              transition-all duration-200
              hover:shadow-md hover:-translate-y-0.5
              ${active ? activeCard : "border-gray-200 bg-white hover:border-gray-300"}
            `}
          >
            {/* 활성 시 좌측 액센트 바 */}
            {active && (
              <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full ${
                key === "PENDING" ? "bg-amber-400" :
                key === "CONFIRMED" ? "bg-blue-500" :
                key === "SETTLEMENT" ? "bg-orange-400" :
                key === "SETTLED" ? "bg-emerald-500" : "bg-gray-400"
              }`} />
            )}

            <div className="flex items-center justify-between gap-2">
              {/* 아이콘 */}
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </div>

              {/* 숫자 */}
              <span className={`text-2xl font-bold leading-none ${
                active
                  ? key === "PENDING" ? "text-amber-600" :
                    key === "CONFIRMED" ? "text-blue-700" :
                    key === "SETTLEMENT" ? "text-orange-600" :
                    key === "SETTLED" ? "text-emerald-700" : "text-gray-700"
                  : "text-gray-800"
              }`}>
                {count}
              </span>
            </div>

            <div className="mt-2 text-[12px] font-medium text-gray-500">{label}</div>
          </button>
        );
      })}
    </div>
  );
}
