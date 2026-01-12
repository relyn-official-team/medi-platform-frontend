/* =========================
   에이전시 정산요청 상태
========================= */
export type AgencyPayoutStatus = "REQUESTED" | "PAID" | "REJECTED";

export const AGENCY_PAYOUT_STATUS_LABEL: Record<AgencyPayoutStatus, string> = {
  REQUESTED: "지급요청",
  PAID: "지급완료",
  REJECTED: "반려",
};

/* =========================
   예약/정산 상태 (기존 enum 대응)
========================= */
export type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SETTLEMENT"
  | "SETTLED"
  | "CANCELLED";

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  PENDING: "대기",
  CONFIRMED: "예약확정",
  SETTLEMENT: "정산대기",
  SETTLED: "정산완료",
  CANCELLED: "취소",
};
