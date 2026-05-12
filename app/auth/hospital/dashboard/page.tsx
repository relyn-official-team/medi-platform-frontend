"use client";

import { useEffect, useState, useCallback } from "react";
import StatusSummary from "@/components/hospital/dashboard/StatusSummary";
import ReservationList from "@/components/hospital/dashboard/ReservationList";
import api from "@/lib/api";
import { Reservation } from "@/types/reservation";
import FilterBar from "@/components/hospital/dashboard/FilterBar";
import { InsufficientBalanceDialog } from "@/components/common/InsufficientBalanceDialog";

type SettlementCalcType = "PERCENTAGE" | "PER_RESERVATION";

interface ReservationSummary {
  pending: number;
  confirmed: number;
  settlement: number;
  settled: number;
  cancelled: number;
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

  const [hospitalSettings, setHospitalSettings] = useState<HospitalSettings | null>(null);

  const fetchReservations = useCallback(
    async (filters?: any) => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<HospitalReservationsResponse>(
          "/hospital/reservations",
          { params: filters }
        );

        setReservations(res.data.reservations);
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

  useEffect(() => {
    fetchReservations();
    fetchHospitalSettings();
  }, [fetchReservations, fetchHospitalSettings]);

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
            console.error("정산 실패:", err);

            if (
              err.response?.status === 400 &&
              err.response?.data?.message?.includes("충전금이 부족")
            ) {
              setRequiredAmount(err.response.data.required);
              setCurrentBalance(err.response.data.currentBalance);
              setInsufficientOpen(true);
              return;
            }

            alert("정산 처리 중 오류가 발생했습니다.");
            return;
          }
        } else {
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

  const handleLoadAgencyContact = useCallback(async (agencyId: string) => {
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
  }, []);

  const waitingCount = summary?.pending ?? 0;
  const confirmedCount = summary?.confirmed ?? 0;
  const settlementPendingCount = summary?.settlement ?? 0;
  const completedCount = summary?.settled ?? 0;

  const handleHistoryRead = useCallback(
    async (reservationId: number) => {
      try {
        await api.post(`/reservations/status/${reservationId}/history/read`);
        await fetchReservations(currentFilters);
      } catch (e) {
        console.error("Failed to mark history as read", e);
      }
    },
    [fetchReservations, currentFilters]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 Summary + FilterBar (sticky) */}
      <div className="sticky top-0 z-30 border-b border-gray-100 bg-gray-50/95 backdrop-blur-sm shadow-sm">
        <div className="px-4 pt-3 pb-2 sm:px-6">
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

        <div className="px-4 pb-3 sm:px-6">
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

      {/* 예약 카드 리스트 */}
      <div className="px-4 pt-4 pb-10 sm:px-6">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <svg className="h-8 w-8 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm text-gray-500">예약 데이터를 불러오는 중입니다...</span>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
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
