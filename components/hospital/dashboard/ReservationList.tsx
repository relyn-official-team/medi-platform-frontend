"use client";

import React from "react";
import { Reservation } from "@/types/reservation";
import ReservationCard from "./ReservationCard";
import { toReservationCardView } from "@/types/reservation";


interface ReservationListProps {
  reservations: Reservation[];
  onRefresh?: () => Promise<void>
  hospitalSettings?: {
    settlementCalcType: "PERCENTAGE" | "PER_RESERVATION";
    settlementFlatAmount: number;
    platformCommissionRate: number;
    platformFlatAmount: number;
    agencyCommissionRate: number;
  } | null;
  onStatusChange: (
    id: Reservation["id"],
    newStatus: Reservation["status"],
    extraAmount?: number,
    meta?: { reason?: string }
  ) => void | Promise<void>;
  onLoadAgencyContact: (agencyId: string) => Promise<void>;
  onHistoryRead?: (id: number) => void;
  mode?: "HOSPITAL" | "AGENCY" | "ADMIN";
}


export default function ReservationList({
  onRefresh,
  reservations,
  hospitalSettings,
  onHistoryRead,
  onStatusChange,
  onLoadAgencyContact,
  mode,
}: ReservationListProps) {
  if (!reservations.length) {
    return (
      <div className="py-10 text-center text-gray-400 text-sm">
        현재 표시할 예약이 없습니다.
      </div>
    );
  }

  return (
    <div   className="
    grid 
    grid-cols-1             /* 모바일 */
    sm:grid-cols-2          /* 작은 태블릿 */
    lg:grid-cols-3          /* PC: 3열 정렬 */
    gap-5 
    auto-rows-max
  ">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={toReservationCardView(reservation)}
          onStatusChange={onStatusChange}
          onLoadAgencyContact={onLoadAgencyContact}
          hospitalSettings={hospitalSettings}
          onHistoryRead={onHistoryRead}
          onRefresh={onRefresh}
          mode={mode}
        />
      ))}
    </div>
  );
}
