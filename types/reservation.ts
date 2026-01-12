// frontend/types/reservation.ts

export type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SETTLEMENT"
  | "SETTLED"
  | "CANCELLED";

export interface AgencyContact {
  manager?: string | null;
  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  wechat?: string | null;
  line?: string | null;
}

export interface ReservationStatusHistoryView {
  id: number;
  status: ReservationStatus;
  reason: string | null;
  changedByRole: "HOSPITAL" | "AGENCY" | "ADMIN";
  createdAt: string;
}


// ==============================
// 백엔드 DTO와 100% 매칭되는 구조
// ==============================
export interface Reservation {
  id: number;
  hospitalId: string | null;
  agencyId: string | null;

  patientName: string;
  patientAge: number;
  patientNationality: string;

  createdAt?: string;

  agencyName: string | null;

  procedureName: string;
  memo?: string | null;
  language?: string | null;

  needSedation: boolean;
  needTaxRefund: boolean;
  needInterpreter: boolean;

  isUrgent: boolean;

  reservationDate: string;
  reservationTime: string;

  status: ReservationStatus;

  // =========================
  // 수수료 스냅샷 (백엔드 기준)
  // =========================
  agencyCommissionRate?: number | null;
  agencySettlementAmount?: number | null;
  platformCommissionRate?: number | null;
  platformSettlementAmount?: number | null;
  settlementAppliedAt?: string | null;

  // 정산 정보
  paymentAmount?: number | null;
  settlementAmount?: number | null;
  platformFee?: number | null;
  hospitalRevenue?: number | null;
  agencyContact?: AgencyContact | null;

 expectedAgencyCommissionRate?: number | null;
 expectedAgencySettlementAmount?: number | null;
 expectedPlatformCommissionRate?: number | null;
 expectedPlatformSettlementAmount?: number | null;
}

// 요약 카드용
export interface ReservationSummary {
  pending: number;
  confirmed: number;
  settlement: number;
  settled: number;
  cancelled: number;
}

// ==================================================
// UI ViewModel — 모든 필드를 프론트 기준으로 재맵핑
// ==================================================
export interface ReservationCardView {
  id: number;
  hasUnreadHistory?: boolean;
  patientName: string;
  patientAge: number;
  patientNationality: string;

  agencyName: string | null;
  memo: string | null;

  reservationDate?: string;  // YYYY-MM-DD
  reservationTime?: string;  // HH:mm

  procedureName: string;
  language: string | null;

  status: ReservationStatus;
  isUrgent: boolean;

  agencyId?: string | null;
  hospitalId?: string;
  hospitalName?: string | null; // 🔥 에이전시 화면용

  needSedation: boolean;
  needTaxRefund: boolean;
  needInterpreter: boolean;

  paymentAmount: number | null;
  settlementAmount: number | null;
  platformFee: number | null;
  hospitalRevenue: number | null;

  // 수수료 스냅샷
  agencyCommissionRate?: number | null;
  agencySettlementAmount?: number | null;
  platformCommissionRate?: number | null;
  platformSettlementAmount?: number | null;
  settlementAppliedAt?: string | null;

  agencyContact: AgencyContact | null;

  createdAt?: string | Date; // 🔥 예약 생성일

 expectedAgencyCommissionRate?: number | null;
 expectedAgencySettlementAmount?: number | null;
 expectedPlatformCommissionRate?: number | null;
 expectedPlatformSettlementAmount?: number | null;
}

// ==================================================
// API → ViewModel 변환 함수 (백엔드 DTO → UI 모델)
// ==================================================
export function toReservationCardView(
  r: Reservation | AdminReservationView
): ReservationCardView {
  return {
    id: r.id,
    hasUnreadHistory: (r as any).hasUnreadHistory ?? false,

    createdAt: r.createdAt,

    patientName: r.patientName,
    patientAge: r.patientAge,
    patientNationality: r.patientNationality,

    agencyName: r.agencyName ?? null,
    hospitalId: r.hospitalId ?? undefined,
    hospitalName: (r as any).hospitalName ?? null,
    memo: r.memo ?? null,

reservationDate: r.reservationDate ?? "",
reservationTime: r.reservationTime ?? "",

    procedureName: r.procedureName,
    language: r.language ?? null,

    status: r.status,
    isUrgent: r.isUrgent,

    agencyId: r.agencyId ?? null,

    needSedation: r.needSedation,
    needTaxRefund: r.needTaxRefund,
    needInterpreter: r.needInterpreter,

    paymentAmount: r.paymentAmount ?? null,
    settlementAmount: r.settlementAmount ?? null,
    platformFee: r.platformFee ?? null,
    hospitalRevenue: r.hospitalRevenue ?? null,

    agencyCommissionRate: r.agencyCommissionRate ?? null,
    agencySettlementAmount: r.agencySettlementAmount ?? null,
    platformCommissionRate: r.platformCommissionRate ?? null,
    platformSettlementAmount: r.platformSettlementAmount ?? null,
    settlementAppliedAt: r.settlementAppliedAt ?? null,

    agencyContact: r.agencyContact ?? null,

   expectedAgencyCommissionRate: r.expectedAgencyCommissionRate ?? null,
   expectedAgencySettlementAmount: r.expectedAgencySettlementAmount ?? null,
   expectedPlatformCommissionRate: r.expectedPlatformCommissionRate ?? null,
   expectedPlatformSettlementAmount: r.expectedPlatformSettlementAmount ?? null,
  };
}

export interface PreChatReservation {
  id: number;
  status: "PRE_CHAT";

  patientName: string;

  patientAge: null;
  patientNationality: null;
  procedureName: null;

  reservationDate: null;
  reservationTime: null;
}

export interface ConfirmedReservation extends Reservation {
  reservationDate: string;
  reservationTime: string;
}

export type ReservationUnion =
  | PreChatReservation
  | ConfirmedReservation;

export interface AdminReservationView extends Reservation {
  hospitalName: string | null;
  agencyName: string | null;
}