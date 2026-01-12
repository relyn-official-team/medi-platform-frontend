"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ReservationList from "@/components/hospital/dashboard/ReservationList";
import FilterBar from "@/components/hospital/dashboard/FilterBar";
import { AdminReservationView } from "@/types/reservation";
import StatusSummary from "@/components/hospital/dashboard/StatusSummary";
import { toReservationCardView } from "@/types/reservation";
import { useMemo } from "react";



export default function AdminReservationCardsPage() {
const [allReservations, setAllReservations] = useState<AdminReservationView[]>([]);
const [reservations, setReservations] = useState<AdminReservationView[]>([]);
  const [loading, setLoading] = useState(true);
const summary = useMemo(() => {
  const base = {
    pending: 0,
    confirmed: 0,
    settlement: 0,
    settled: 0,
  };

  for (const r of allReservations) {
    switch (r.status) {
      case "PENDING":
        base.pending++;
        break;
      case "CONFIRMED":
        base.confirmed++;
        break;
      case "SETTLEMENT":
        base.settlement++;
        break;
      case "SETTLED":
        base.settled++;
        break;
    }
  }

  return base;
}, [allReservations]);
const [currentFilters, setCurrentFilters] = useState<any>({});

  const fetchReservations = async (filters?: any) => {
    try {
      setLoading(true);
   // 1️⃣ 전체 데이터 (summary용) – 최초 1회 또는 필터 없음일 때
   const hasFilter = filters && Object.keys(filters).length > 0;
   if (!hasFilter) {
 const allRes = await api.get<AdminReservationView[]>(
   "/admin/reservations/cards"
 );
     setAllReservations(allRes.data);
     setReservations(allRes.data);
     return;
   }

   // 2️⃣ 필터된 데이터 (카드용)
 const res = await api.get<AdminReservationView[]>(
   "/admin/reservations/cards",
   { params: filters }
 );
   setReservations(res.data);


//setSummary(null); // 또는 summary UI 숨김
    } catch (e) {
      console.error(e);
      alert("예약카드 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(currentFilters);
  }, []);

  return (
    <div className="p-6 space-y-4">

  {/* 상태 요약 */}
  <StatusSummary
    waitingCount={summary?.pending ?? 0}
    confirmedCount={summary?.confirmed ?? 0}
   settlementPendingCount={summary?.settlement ?? 0}
    completedCount={summary?.settled ?? 0}
    onFilter={(filters) => {
   const status = filters.status;

   // 🔁 같은 상태 다시 클릭 → 필터 해제
   if (currentFilters.status === status) {
     setCurrentFilters({});
     fetchReservations({});
   } else {
     const next = { ...currentFilters, status };
     setCurrentFilters(next);
     fetchReservations(next);
   }
    }}
  />

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

      {loading ? (
        <div className="text-center text-gray-500 py-10">
          로딩 중...
        </div>
      ) : (
        <ReservationList
  reservations={reservations.map((r) => ({
    ...r,
    // 🔥 병원 Reservation 형태에 필요한 필드 보정
    hospitalId: r.hospitalId,
    agencyId: r.agencyId,
    status: r.status,
    reservationDate: r.reservationDate,
    reservationTime: r.reservationTime,
    procedureName: r.procedureName,
    patientName: r.patientName,
    patientAge: r.patientAge,
  }))}
          onStatusChange={() => {}}        // ❌ 관리자 상태변경 없음
          onLoadAgencyContact={async () => {}}
          onHistoryRead={async () => {}}
          mode="ADMIN"
        />
      )}
    </div>

  );
}

