"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  DollarSign,
  Users,
  Receipt,
} from "lucide-react";
import api from "@/lib/api";
import { AdminAgencyStatisticsResponse } from "@/types/statistics";

/* -----------------------------
   날짜 유틸
----------------------------- */
const formatDate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};


export default function AdminAgencyStatisticsPage() {
  // 집계 기준
  const [base, setBase] = useState<"reservation" | "settlement">("reservation");
  /* -----------------------------
     조회 기간
  ----------------------------- */
 // 예약 생성일 기준
 const [reservationStartDate, setReservationStartDate] = useState("");
 const [reservationEndDate, setReservationEndDate] = useState("");

 // 정산 완료일 기준
 const [settlementStartDate, setSettlementStartDate] = useState("");
 const [settlementEndDate, setSettlementEndDate] = useState("");
  const [activePreset, setActivePreset] = useState<
    "today" | "thisWeek" | "lastWeek" | "thisMonth" | "lastMonth" | null
  >(null);

  /* -----------------------------
     필터
  ----------------------------- */
 const [agencyName, setAgencyName] = useState("");
 const [hospitalName, setHospitalName] = useState("");

  /* -----------------------------
     데이터 상태
  ----------------------------- */
  const [data, setData] =
    useState<AdminAgencyStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
     프리셋 날짜
  ----------------------------- */
  const setToday = () => {
    const t = new Date();
    setReservationStartDate(formatDate(t));
    setReservationEndDate(formatDate(t));
    setActivePreset("today");
  };

  const setThisMonth = () => {
    const now = new Date();
 setReservationStartDate(
   formatDate(new Date(now.getFullYear(), now.getMonth(), 1))
 );
 setReservationEndDate(formatDate(now));
    setActivePreset("thisMonth");
  };

  /* -----------------------------
     조회
  ----------------------------- */
  const fetchStatistics = async () => {

    try {
      setLoading(true);
      setError(null);

      const res = await api.get<AdminAgencyStatisticsResponse>(
        "/admin/agency-statistics",
        {
          params: {
          base,

          ...(base === "reservation"
            ? {
                reservationStartDate: reservationStartDate || undefined,
                reservationEndDate: reservationEndDate || undefined,
              }
            : {
                settlementStartDate: settlementStartDate || undefined,
                settlementEndDate: settlementEndDate || undefined,
              }),

 agencyName: agencyName || undefined,
 hospitalName: hospitalName || undefined,
          },
        }
      );

      setData(res.data);
    } catch {
      setError("통계 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePreset) fetchStatistics();
  }, [activePreset]);

  /* -----------------------------
   예약 생성일 프리셋
----------------------------- */
const setReservationToday = () => {
  const t = new Date();
  setReservationStartDate(formatDate(t));
  setReservationEndDate(formatDate(t));
};

const setReservationLastMonth = () => {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const last = new Date(now.getFullYear(), now.getMonth(), 0);
  setReservationStartDate(formatDate(first));
  setReservationEndDate(formatDate(last));
};

/* -----------------------------
   정산 완료일 프리셋
----------------------------- */
const setSettlementToday = () => {
  const t = new Date();
  setSettlementStartDate(formatDate(t));
  setSettlementEndDate(formatDate(t));
};

const setSettlementLastMonth = () => {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const last = new Date(now.getFullYear(), now.getMonth(), 0);
  setSettlementStartDate(formatDate(first));
  setSettlementEndDate(formatDate(last));
};

 const resetReservationDate = () => {
   setReservationStartDate("");
   setReservationEndDate("");
   setActivePreset(null);
 };

 const resetSettlementDate = () => {
   setSettlementStartDate("");
   setSettlementEndDate("");
 };


useEffect(() => {
   if (base === "reservation") {
     setSettlementStartDate("");
     setSettlementEndDate("");
   } else {
     setReservationStartDate("");
     setReservationEndDate("");
   }
 }, [base]);

  /* =============================
     UI
  ============================= */
  return (
    <div className="space-y-6 pb-6">
      {/* ================= 조회 조건 ================= */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">조회 조건</h3>
        </div>

  {/* 기준 선택 */}
  <div className="flex gap-2 mb-4">
    <Button
      size="sm"
      variant={base === "reservation" ? "default" : "outline"}
      onClick={() => setBase("reservation")}
   >
      예약 생성일 기준
    </Button>
    <Button
      size="sm"
      variant={base === "settlement" ? "default" : "outline"}
      onClick={() => setBase("settlement")}
    >
      정산 완료 기준
    </Button>
  </div>

        {/* 날짜 + 필터 */}
 {base === "reservation" && (
 <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
    <div className="flex flex-col md:flex-row md:items-center gap-2">
    <span className="text-xs text-gray-500 whitespace-nowrap">
      예약 생성일 기준
    </span>

   <input
     type="date"
     value={reservationStartDate}
     onChange={(e) => {
       setReservationStartDate(e.target.value);
       setActivePreset(null);
     }}
     className="px-3 py-2 border rounded-lg text-sm"
   />
   <input
     type="date"
     value={reservationEndDate}
     onChange={(e) => {
       setReservationEndDate(e.target.value);
       setActivePreset(null);
     }}
     className="px-3 py-2 border rounded-lg text-sm"
   />
 <div className="flex gap-2 md:items-center">
   <Button size="sm" variant="outline" onClick={setReservationToday}>
     오늘
   </Button>
   <Button size="sm" variant="outline" onClick={setReservationLastMonth}>
     지난달
   </Button>
    <Button
    size="sm"
    variant="outline"
    disabled={!reservationStartDate && !reservationEndDate}
    onClick={resetReservationDate}
    >
    초기화
    </Button>
 </div>
 </div>
 </div>
)}


 {/* 정산 완료일 기준 */}
 {base === "settlement" && (
 <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">

  <div className="flex flex-col md:flex-row md:items-center gap-2">
    <span className="text-xs text-gray-500 whitespace-nowrap">
      정산 완료일 기준
    </span>

   <input
     type="date"
     value={settlementStartDate}
     onChange={(e) => setSettlementStartDate(e.target.value)}
     className="px-3 py-2 border rounded-lg text-sm"
   />
   <input
     type="date"
     value={settlementEndDate}
     onChange={(e) => setSettlementEndDate(e.target.value)}
     className="px-3 py-2 border rounded-lg text-sm"
   />
<div className="flex gap-2 md:items-center">

   <Button size="sm" variant="outline" onClick={setSettlementToday}>
     오늘
   </Button>
   <Button size="sm" variant="outline" onClick={setSettlementLastMonth}>
     지난달
   </Button>
    <Button
    size="sm"
    variant="outline"
    disabled={!settlementStartDate && !settlementEndDate}
    onClick={resetSettlementDate}
    >
    초기화
    </Button>
 </div>
 </div>
 </div>
 )}


 {/* 이름 필터 */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
   <input
     placeholder="에이전시명 검색"
     value={agencyName}
     onChange={(e) => setAgencyName(e.target.value)}
     className="px-3 py-2 border rounded-lg text-sm"
   />
   <input
     placeholder="병원명 검색"
     value={hospitalName}
     onChange={(e) => setHospitalName(e.target.value)}
     className="px-3 py-2 border rounded-lg text-sm"
   />
 </div>

        <div className="mt-4">
          <Button onClick={fetchStatistics} disabled={loading}>
            조회하기
          </Button>
        </div>

        {loading && <div className="text-sm text-gray-500 mt-2">불러오는 중...</div>}
        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
      </Card>


{/* ================= 요약 지표 ================= */}
{data && (

    
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
    {[
      {
        label: "총 예약",
        value: `${data.summary.totalReservations}건`,
        icon: Calendar,
      },
      {
        label: "매출",
        value: `${data.summary.totalSales.toLocaleString()}원`,
        icon: DollarSign,
      },
      {
        label: "정산 완료",
        value: `${data.summary.settledCount}건`,
        icon: Users,
      },
      {
        label: "에이전시 수수료",
        value: `${data.summary.agencyFee.toLocaleString()}원`,
        icon: Receipt,
      },
      {
        label: "플랫폼 수수료",
        value: `${data.summary.platformFee.toLocaleString()}원`,
        icon: Receipt,
      },
    ].map((s) => {
      const Icon = s.icon;
      return (
        <Card key={s.label} className="p-6">
          <Icon className="w-6 h-6 text-blue-600 mb-2" />
          <div className="text-2xl font-semibold">{s.value}</div>
          <div className="text-sm text-gray-500">{s.label}</div>
        </Card>
      );
    })}
  </div>
)}


      {/* ================= 병원 / 에이전시 실적 ================= */}
{data && (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    
    {/* 병원별 실적 */}
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">
        병원별 실적 (TOP 10)
          <span className="ml-2 text-xs text-gray-500">
    · 병원매출 기준
  </span>
      </h3>

      <div className="space-y-3">
        {data.hospitalStats
          .slice(0, 10)
          .map((item, idx) => (
            <div
              key={item.hospital}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.hospital}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.reservations}건
                  </div>
                </div>
              </div>
<div className="font-semibold text-gray-900 text-right">
  {item.amount.toLocaleString()}원
</div>
            </div>
          ))}
      </div>
    </Card>

    {/* 에이전시별 실적 */}
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">
        에이전시별 실적 (TOP 10)
          <span className="ml-2 text-xs text-gray-500">
    · 에이전시매출&수수료 기준
  </span>
      </h3>

      <div className="space-y-3">
        {data.agencyStats
          .slice(0, 10)
          .map((item, idx) => (
            <div
              key={item.agency}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.agency}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.reservations}건
                  </div>
                </div>
              </div>
<div className="font-semibold text-gray-900 text-right">
  {item.sales.toLocaleString()}원
  <div className="text-xs text-gray-500">
    ({item.agencyFee.toLocaleString()}원)
  </div>
</div>
            </div>
          ))}
      </div>
    </Card>
  </div>
)}

{/* ================= 월별 예약 추이 ================= */}
{data && (
  <Card className="p-6">
    <h3 className="font-semibold text-gray-900 mb-4">
      월별 예약 추이
    </h3>

    <div className="space-y-4">
      {data.monthly.map((item) => (
        <div key={item.month}>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {item.month}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {item.reservations}건
            </span>
          </div>

          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{
                width: `${Math.min(
                  (item.reservations / 50) * 100,
                  100
                )}%`,
              }}
            />
          </div>

<div className="flex justify-between text-xs text-gray-500 mt-2">
  <span>매출: {item.sales.toLocaleString()}원</span>
  <span>에이전시 수수료: {item.agencyFee.toLocaleString()}원</span>
</div>
        </div>
      ))}
    </div>
  </Card>
)}

    </div>
  );


}
