import type { ReservationStatus } from "@/types/reservation";

export const ReservationStatusLabel: Record<ReservationStatus, string> = {
  PENDING: "예약대기",
  CONFIRMED: "예약완료",
  SETTLEMENT: "정산대기",
  SETTLED: "정산완료",
  CANCELLED: "취소",
};

export const ReservationStatusBadgeClass: Record<ReservationStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
  SETTLEMENT: "bg-orange-100 text-orange-800 border-orange-300",
  SETTLED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-gray-100 text-gray-600 border-gray-300",
};
