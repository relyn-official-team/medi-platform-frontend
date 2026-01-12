import { ReservationCardView } from "@/types/reservation";

export function isSettlementPendingView(reservation: ReservationCardView): boolean {
  // 1차: 실제 DB 상 정산대기 상태면 true
  if (reservation.status === "SETTLEMENT") return true;



  // 2차: 안전장치 – 만약 아직 CONFIRMED 상태인데 날짜가 이미 지난 경우
  if (reservation.status !== "CONFIRMED") return false;

  if (!reservation.reservationDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(reservation.reservationDate);
  date.setHours(0, 0, 0, 0);

  // "오늘 날짜와 같거나, 과거" → true
  return date <= today;
}
