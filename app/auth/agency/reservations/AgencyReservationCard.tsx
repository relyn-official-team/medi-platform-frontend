"use client";

import ReservationCard from "@/components/hospital/dashboard/ReservationCard";
import { ReservationCardView } from "@/types/reservation";
import { ReservationStatus } from "@/types/reservation";

interface Props {
  reservation: ReservationCardView;
  onCancel: (id: number, reason?: string) => Promise<void>;
  onOpenHistory: (id: number) => void; // Step2에서 사용
  onOpenHospitalInfo: (hospitalId: string) => void;
}

export default function AgencyReservationCard({
  reservation,
  onCancel,
  onOpenHistory,
  onOpenHospitalInfo,
}: Props) {
  const isPending = reservation.status === "PENDING";

  return (
<ReservationCard
  mode="AGENCY"
  reservation={{
    ...reservation,
    status: reservation.status as ReservationStatus,
    agencyName: reservation.hospitalName ?? "-",
  }}
  hospitalSettings={null}
   onHistoryRead={(id) => {
   onOpenHistory(id);
 }}
  onLoadHospitalContact={async (hospitalId) => {
    await onOpenHospitalInfo(hospitalId);
  }}
  onStatusChange={async (id, status, _amount, meta) => {
    if (status === "CANCELLED" && isPending) {
      await onCancel(id, meta?.reason);
    }
  }}
/>

  );
}
