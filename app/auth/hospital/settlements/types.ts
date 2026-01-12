export type SettlementType =
  | "CHARGE_REQUEST"
  | "CHARGE_COMPLETED"
  | "CHARGE_REJECTED"
  | "AGENCY_FEE"
  | "PLATFORM_FEE";

export interface SettlementItem {
  id: string;
  createdAt: string; // ISO string

  type: SettlementType;

  amount: number; // +/-
//  balanceAfter: number;

  // AGENCY_FEE 전용 상세
  agencyName?: string;
  patientName?: string;
  patientNationality?: string;
  reservationDate?: string; // yyyy-mm-dd
  reservationTime?: string; // hh:mm
}

// ✅ 검색 조건(필터) 타입: 페이지/필터 컴포넌트에서 공유
export interface SettlementQuery {
  agencyName?: string;  // 부분일치
  patientName?: string; // 부분일치
}