"use client";

import React from "react";
import { ReservationCardView } from "@/types/reservation";
import AgencyReservationCard from "./AgencyReservationCard";

interface Props {
  reservations: ReservationCardView[];
  onCancel: (id: number, reason?: string) => Promise<void>;
  onOpenHistory: (id: number) => void;
  onOpenHospitalInfo: (hospitalId: string) => void;
}

export default function AgencyReservationList({
  reservations,
  onCancel,
  onOpenHistory,
  onOpenHospitalInfo,
}: Props) {
  if (!reservations.length) {
    return (
      <div className="py-10 text-center text-gray-400 text-sm">
        현재 표시할 예약이 없습니다.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1            /* 모바일 */
        sm:grid-cols-2         /* 태블릿 */
        lg:grid-cols-3         /* PC */
        gap-5
        auto-rows-max
      "
    >
      {reservations.map((r) => (
        <AgencyReservationCard
          key={r.id}
          reservation={r as any}
          onCancel={onCancel}
          onOpenHistory={onOpenHistory}
          onOpenHospitalInfo={onOpenHospitalInfo}
        />
      ))}
    </div>
  );
}
