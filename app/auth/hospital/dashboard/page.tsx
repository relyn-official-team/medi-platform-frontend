"use client";

import { useEffect, useState, useCallback } from "react";
import StatusSummary from "@/components/hospital/dashboard/StatusSummary";
import ReservationList from "@/components/hospital/dashboard/ReservationList";
import api from "@/lib/api";
import { Reservation } from "@/types/reservation";
import FilterBar from "@/components/hospital/dashboard/FilterBar";
import {InsufficientBalanceDialog} from "@/components/common/InsufficientBalanceDialog";



type SettlementCalcType = "PERCENTAGE" | "PER_RESERVATION";


interface ReservationSummary {
  pending: number;      // 예약대기
  confirmed: number;    // 예약완료
  settlement: number;   // 정산대기
  settled: number;      // 정산완료
  cancelled: number;    // 취소
}

interface HospitalReservationsResponse {
  summary: ReservationSummary;
  reservations: Reservation[];
}

interface AgencyContactResponse {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  wechat?: string | null;
  line?: string | null;
}

interface HospitalSettings {
  settlementCalcType: SettlementCalcType;
  settlementFlatAmount: number;
  platformCommissionRate: number;
  platformFlatAmount: number;
  agencyCommissionRate: number;
  additionalCommissionRates?: number[];
  platformFeeExposureType?: "EXCLUDED" | "INCLUDED";
  vatInputMode?: "VAT_INCLUDED" | "VAT_EXCLUDED";
}

export default function HospitalDashboardPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [summary, setSummary] = useState<ReservationSummary | null>(null);
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [insufficientOpen, setInsufficientOpen] = useState(false);
  const [requiredAmount, setRequiredAmount] = useState<number | undefined>();
  const [currentBalance, setCurrentBalance] = useState<number | undefined>();

  const [hospitalSettings, setHospitalSettings] =  useState<HospitalSettings | null>(null);

  const fetchReservations = useCallback(
  async (filters?: any, skipSummaryUpdate?: boolean) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<HospitalReservationsResponse>(
        "/hospital/reservations",
        { params: filters }
      );

      setReservations(res.data.reservations);

      // 항상 summary 업데이트
      setSummary(res.data.summary);

    } catch (err) {
      setError("예약 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  },
  []
);

const fetchHospitalSettings = useCallback(async () => {
  try {
    const res = await api.get("/hospital/settings");
    setHospitalSettings(res.data as HospitalSettings);
  } catch (err) {
    console.error("Failed to load hospital settings", err);
  }
}, []);


  // 단순히 데이터만 로드, 인증은 Next middleware + 백엔드에서 처리
  useEffect(() => {
    fetchReservations();
    fetchHospitalSettings();
  }, [fetchReservations, fetchHospitalSettings]);

  // 상태 변경 (예약확정 / 취소 / 정산)
  const handleStatusChange = useCallback(
    async (
      id: Reservation["id"],
      newStatus: Reservation["status"],
      extraAmount?: number,
      meta?: { reason?: string }
    ) => {
      try {
        if (newStatus === "CONFIRMED") {
          await api.patch(`/reservations/status/${id}/confirm`);
} else if (newStatus === "CANCELLED") {
  await api.patch(`/reservations/status/${id}/cancel`, {
    reason: meta?.reason,
  });
} else if (newStatus === "SETTLED") {
          if (typeof extraAmount !== "number" || extraAmount <= 0) {
            throw new Error("paymentAmount is required");
          }

          try {
            await api.patch(`/reservations/status/${id}/settle`, {
              paymentAmount: extraAmount,
            });
          } catch (err: any) {
            console.error("🔴 정산 실패:", err);

            // --- 충전금 부족 처리 ---
            if (
              err.response?.status === 400 &&
              err.response?.data?.message?.includes("충전금이 부족")
            ) {
              setRequiredAmount(err.response.data.required);
              setCurrentBalance(err.response.data.currentBalance);
              setInsufficientOpen(true);
              return; // fetchReservations 실행하지 않음
            }

            alert("정산 처리 중 오류가 발생했습니다.");
            return;
          }
        } else {
          // PENDING, SETTLEMENT 등은 현재 플로우에서 직접 사용하지 않음
          return;
        }

        await fetchReservations(currentFilters);
      } catch (err) {
        console.error("Failed to change reservation status", err);
        alert("상태 변경 중 오류가 발생했습니다.");
      }
    },
    [fetchReservations, currentFilters]
  );

  // 에이전시 연락처 로드
  const handleLoadAgencyContact = useCallback(
    async (agencyId: string) => {
      if (!agencyId) return;

      try {
        const res = await api.get(`/agency/${agencyId}`);
        const data = res.data as AgencyContactResponse;

        setReservations((prev) =>
          prev.map((r) =>
            r.agencyId === agencyId
              ? {
                  ...r,
                  agencyName: r.agencyName ?? data.name,
                  agencyContact: {
                    phone: data.phone ?? undefined,
                    email: data.email ?? undefined,
                    whatsapp: data.whatsapp ?? undefined,
                    wechat: data.wechat ?? undefined,
                    line: data.line ?? undefined,
                  },
                }
              : r
          )
        );
      } catch (err) {
        console.error("Failed to load agency contact", err);
        alert("에이전시 연락처를 불러오지 못했습니다.");
      }
    },
    []
  );

    const waitingCount = summary?.pending ?? 0;
    const confirmedCount = summary?.confirmed ?? 0;
    const settlementPendingCount = summary?.settlement ?? 0;
    const completedCount = summary?.settled ?? 0;

  const handleHistoryRead = useCallback(async (reservationId: number) => {
   try {
     await api.post(`/reservations/status/${reservationId}/history/read`);

     // 프론트 상태 반영 (refetch 방식)
     await fetchReservations(currentFilters);
   } catch (e) {
     console.error("Failed to mark history as read", e);
   }
}, [fetchReservations, currentFilters]);



  return (
    <div className="min-h-screen bg-gray-50">

      {/* ───────────────────────── */}
      {/* 헤더 (항상 고정) */}
      {/* ───────────────────────── */}

      {/* ───────────────────────── */}
      {/* 상단 Summary + FilterBar (sticky) */}
      {/* ───────────────────────── */}
      <div className="sticky top-0 z-30 bg-gray-50 shadow-sm">

        {/* 상태 요약 */}
        <div className="px-6 pt-2 pb-2">
          <StatusSummary
            waitingCount={waitingCount}
            confirmedCount={confirmedCount}
            settlementPendingCount={settlementPendingCount}
            completedCount={completedCount}
            onFilter={(filters) => {
              setCurrentFilters(filters);
              fetchReservations(filters);
            }}
          />
        </div>

        {/* 검색 / 날짜 필터 */}
        <div className="px-6 pb-2">
          <FilterBar
            onFilter={(filters) => {
              
   const params = {
     ...(filters.keyword && { search: filters.keyword }),
     ...(filters.startDate && { startDate: filters.startDate }),
     ...(filters.endDate && { endDate: filters.endDate }),
   };

              setCurrentFilters(params);
              fetchReservations(params);
            }}
          />
        </div>
      </div>

      {/* ───────────────────────── */}
      {/* 예약 카드 리스트 (스크롤 영역) */}
      {/* ───────────────────────── */}
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-8">

        {loading && (
          <div className="py-10 text-center text-gray-500 text-sm">
            예약 데이터를 불러오는 중입니다...
          </div>
        )}

        {error && !loading && (
          <div className="py-10 text-center text-red-500 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <ReservationList
            reservations={reservations}
            onStatusChange={handleStatusChange}
            onLoadAgencyContact={handleLoadAgencyContact}
            hospitalSettings={hospitalSettings}
            onHistoryRead={handleHistoryRead}
            onRefresh={() => fetchReservations(currentFilters)}
          />
        )}

      </div>
        <InsufficientBalanceDialog
        open={insufficientOpen}
        onClose={() => setInsufficientOpen(false)}
        requiredAmount={requiredAmount}
        currentBalance={currentBalance}
      />

    </div>
  );

}
