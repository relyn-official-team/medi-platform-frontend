"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { ReservationCardView } from "@/types/reservation";
import AgencyReservationList from "./AgencyReservationList";
import AgencyStatusSummary from "./AgencyStatusSummary";
import { isSettlementPendingView } from "@/utils/isSettlementPendingView";
import FilterBar from "@/components/hospital/dashboard/FilterBar";
import MobileHeader from "@/components/agency/MobileHeader";

type ReservationItem = ReservationCardView & {
  id: number;
  hospitalId: string;
  hospitalName: string;
  patientName: string;
  patientAge: number;
  patientGender?: string | null;
  patientNationality: string;
  procedureName: string;
  reservationDate: string;
  reservationTime: string;
  status: "PENDING" | "CONFIRMED" | "SETTLEMENT" | "SETTLED" | "CANCELLED";
};

type HospitalContact = {
  phone?: string | null;
  hotlinePhone?: string | null;
};

type HospitalContactResponse = {
  phone?: string | null;
  hotlinePhone?: string | null;
};



type AgencyReservationsResponse = {
  totalCount: number;
  reservations: ReservationItem[];
};



export default function AgencyReservationsPage() {




const [open, setOpen] = useState(false);

  const [contact, setContact] = useState<HospitalContact | null>(null);

  // “검색 조건” 기준 전체 목록 (상태탭 눌러도 변하면 안됨)
  const [allItems, setAllItems] = useState<ReservationItem[]>([]);
  // 화면 표시용(= allItems에 상태탭/프론트필터를 적용한 결과)
  const [items, setItems] = useState<ReservationItem[]>([]);

  // 상태 탭(2차 조건)
  const [uiStatus, setUiStatus] = useState<"" | "PENDING" | "CONFIRMED" | "SETTLEMENT" | "SETTLED" | "CANCELLED">("");

  // 추후 날짜/검색어 필터 추가 대비: “검색 조건”(1차 조건)
  // 지금은 비워두고, 나중에 FilterBar 붙이면 setSearchFilters로 갱신
  const [searchFilters, setSearchFilters] = useState<{
    keyword?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  // 카운트는 “검색 조건 기준(allItems)”에서만 계산 (상태탭 선택해도 유지)
  const pendingCount = useMemo(
    () => allItems.filter((i) => i.status === "PENDING").length,
    [allItems]
  );
  const confirmedCount = useMemo(
    () => allItems.filter((i) => i.status === "CONFIRMED").length,
    [allItems]
  );
  const settlementPendingCount = useMemo(
    () => allItems.filter((i) => i.status === "SETTLEMENT").length,
    [allItems]
  );
  const settledCount = useMemo(
    () => allItems.filter((i) => i.status === "SETTLED").length,
    [allItems]
  );
  const cancelledCount = useMemo(
    () => allItems.filter((i) => i.status === "CANCELLED").length,
    [allItems]
  );

const handleCancel = async (id: number, reason?: string) => {
  try {
    await api.patch(`/reservations/status/${id}/cancel`, {
     reason: reason?.trim() || "에이전시 취소",
     });
    await load();
  } catch (e) {
    alert("예약 취소에 실패했습니다.");
  }
};

const handleHistoryRead = async (reservationId: number) => {
  try {
    await api.post(
      `/reservations/status/${reservationId}/history/read`
    );

    // 🔄 즉시 UI 반영 (옵션)
    setItems(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, hasUnreadHistory: false }
          : r
      )
    );
  } catch (e) {
    console.error("Failed to mark history as read", e);
  }
};



const loadHospitalContact = async (hospitalId: string) => {
  try {
    const res = await api.get<HospitalContactResponse>(
   `/agency/hospitals/${hospitalId}`
    );
    setContact({
      phone: res.data.phone ?? null,
      hotlinePhone: res.data.hotlinePhone ?? null,
    });
    setOpen(true);
  } catch (e) {
    console.error("Failed to load hospital contact", e);
    alert("병원 연락처를 불러오지 못했습니다.");
  }
};

  const applyUiStatusFilter = useCallback(
    (list: ReservationItem[], status: typeof uiStatus) => {
      if (!status) return list;
      if (status === "SETTLEMENT") {
        // “정산대기”는 status 값이 아니라 비즈니스 룰로 판정
        return list.filter((r) => r.status !== "SETTLED" && isSettlementPendingView(r));
      }
      return list.filter((r) => r.status === status);
    },
    []
  );

  // 서버 호출은 “검색조건(1차)”만 반영해서 전체 로드 (상태탭은 서버에 보내지 않음)
  const load = useCallback(async () => {
    const params: any = {};
    const keyword = searchFilters.keyword?.trim();
    if (keyword) params.search = keyword;
    if (searchFilters.startDate) params.startDate = searchFilters.startDate;
    if (searchFilters.endDate) params.endDate = searchFilters.endDate;

    const res = await api.get<AgencyReservationsResponse>(`/agency/reservations`, { params });
    setAllItems(res.data.reservations);
  }, [searchFilters]);

  // ✅ 최초 진입 + “검색조건” 변경 시 전체 재로딩
  useEffect(() => {
    load();
  }, [load]);

  // ✅ 상태탭(uiStatus) 변경 시에는 서버 재호출 없이, allItems에서 화면 목록만 계산
  useEffect(() => {
    setItems(applyUiStatusFilter(allItems, uiStatus));
  }, [allItems, uiStatus, applyUiStatusFilter]);

  

  return (
  <>
    <MobileHeader title="내 예약 목록" />
    <div className="h-12 md:hidden" />

    <div className="bg-gray-50">

 {/* Mobile only sticky */}
 <div className="md:hidden sticky top-[48px] z-20 bg-gray-50">
   <div className="px-6 pt-3 pb-3 space-y-3">
     <AgencyStatusSummary
       pending={pendingCount}
       confirmed={confirmedCount}
       settlementPending={settlementPendingCount}
       settled={settledCount}
       cancelled={cancelledCount}
       onFilter={(s) => setUiStatus(s || "")}
     />
     <FilterBar
       onFilter={(filters) => {
         setSearchFilters({
           ...(filters.keyword && { keyword: filters.keyword }),
           ...(filters.startDate && { startDate: filters.startDate }),
           ...(filters.endDate && { endDate: filters.endDate }),
         });
       }}
     />
   </div>
 </div>

 {/* PC: normal flow */}
 <div className="hidden md:block pt-3 pb-3 sticky top-[64px] z-10 bg-gray-50 space-y-4">
   <AgencyStatusSummary
    pending={pendingCount}
     confirmed={confirmedCount}
     settlementPending={settlementPendingCount}
     settled={settledCount}
     cancelled={cancelledCount}
     onFilter={(s) => setUiStatus(s || "")}
   />
   <FilterBar
     onFilter={(filters) => {
       setSearchFilters({
         ...(filters.keyword && { keyword: filters.keyword }),
         ...(filters.startDate && { startDate: filters.startDate }),
         ...(filters.endDate && { endDate: filters.endDate }),
       });
     }}
   />
 </div>

    {/* 리스트 */}
<div className="px-6 pt-2 pb-12">
  <AgencyReservationList
    reservations={items as any}
    onCancel={handleCancel}
    onOpenHistory={handleHistoryRead}
    onOpenHospitalInfo={loadHospitalContact}
  />
</div>



              {open && contact && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setOpen(false)}>
    <div className="bg-white rounded-lg w-full max-w-sm p-4" onClick={(e) => e.stopPropagation()}>
      <h2 className="font-semibold mb-3">병원 연락처</h2>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-500">대표 전화</span>
          <div>{contact.phone ?? "-"}</div>
        </div>
        <div>
          <span className="text-gray-500">상담 전용</span>
          <div>{contact.hotlinePhone ?? "-"}</div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="px-3 py-1 border rounded text-sm"
          onClick={() => setOpen(false)}
        >
          닫기
        </button>
      </div>
    </div>
  </div>
)}
    </div>
    </>

  );
}
