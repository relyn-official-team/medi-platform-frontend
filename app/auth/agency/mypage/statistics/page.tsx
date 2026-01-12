"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import MobileHeader from "@/components/agency/MobileHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Users, Receipt } from "lucide-react";

type AgencyStatisticsResponse = {
  summary: {
    totalReservations: number;
    settledCount: number;
    totalSales: number;
    agencyRevenue: number; // ✅ 플랫폼 수수료 제외(agencyFee only)
  };
  hospitalStats: {
    hospital: string;
    reservations: number;
    sales: number;
    revenue: number; // ✅ 에이전시 수익(agencyFee only)
  }[];
  monthly: {
    month: string; // YYYY-MM
    reservations: number;
    sales: number;
    revenue: number; // ✅ 에이전시 수익(agencyFee only)
  }[];
};

/* -----------------------------
   날짜 유틸 (병원 통계와 동일)
----------------------------- */
const formatDate = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function AgencyStatisticsPage() {
  /* -----------------------------
     조회 기간 상태 (병원 통계와 동일)
  ----------------------------- */
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [activePreset, setActivePreset] = useState<
    "today" | "thisWeek" | "lastWeek" | "thisMonth" | "lastMonth" | null
  >(null);

  /* -----------------------------
     데이터 상태
  ----------------------------- */
  const [data, setData] = useState<AgencyStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
     초기: 최근 30일 (기존 동작 유지)
  ----------------------------- */
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);

    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    setActivePreset(null);
  }, []);

  /* -----------------------------
     빠른 날짜 선택 (병원 통계와 동일)
  ----------------------------- */
  const setToday = () => {
    const today = new Date();
    setStartDate(formatDate(today));
    setEndDate(formatDate(today));
    setActivePreset("today");
  };

  const setThisWeek = () => {
    const today = new Date();
    const day = today.getDay(); // 0 = 일요일
    const start = new Date(today);
    start.setDate(today.getDate() - day);
    setStartDate(formatDate(start));
    setEndDate(formatDate(today));
    setActivePreset("thisWeek");
  };

  const setLastWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const end = new Date(today);
    end.setDate(today.getDate() - day - 1);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    setActivePreset("lastWeek");
  };

  const setThisMonth = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1); // 이번달 1일
    const end = new Date(); // 오늘

    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    setActivePreset("thisMonth");
  };

  const setLastMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 현재 월(0-based)

    const start = new Date(year, month - 1, 1); // 전월 1일
    const end = new Date(year, month, 0); // 전월 말일

    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    setActivePreset("lastMonth");
  };

  /* -----------------------------
     조회 함수
  ----------------------------- */
  const fetchStatistics = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      setError(null);

      const res = await api.get<AgencyStatisticsResponse>("/agency/statistics", {
        params: { startDate, endDate },
      });

      setData(res.data);
    } catch (e) {
      setError("통계 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /* preset 클릭 시 자동 조회 (병원 통계와 동일) */
  useEffect(() => {
    if (activePreset) fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePreset]);

  /* -----------------------------
     유틸
  ----------------------------- */
  const formatCurrency = (v: number) => v.toLocaleString("ko-KR") + "원";

  const maxMonthlyReservations =
    data?.monthly?.reduce((m, x) => Math.max(m, x.reservations), 0) ?? 0;

  const maxHospitalReservations =
    data?.hospitalStats?.reduce((m, x) => Math.max(m, x.reservations), 0) ?? 0;

  return (
    <>
      <MobileHeader title="정산 · 예약 통계" />
      <div className="h-12 md:hidden" />

      <div className="space-y-6 pb-6 max-w-6xl mx-auto px-6 py-6">
        {/* ================= 조회 기간 ================= */}
        <Card className="p-6">
          {loading && (
            <div className="text-sm text-gray-500 mt-2">통계 불러오는 중...</div>
          )}
          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">조회 기간</h3>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              size="sm"
              variant={activePreset === "today" ? "default" : "outline"}
              onClick={setToday}
            >
              오늘
            </Button>
            <Button
              size="sm"
              variant={activePreset === "thisWeek" ? "default" : "outline"}
              onClick={setThisWeek}
            >
              이번주
            </Button>
            <Button
              size="sm"
              variant={activePreset === "lastWeek" ? "default" : "outline"}
              onClick={setLastWeek}
            >
              지난주
            </Button>
            <Button
              size="sm"
              variant={activePreset === "thisMonth" ? "default" : "outline"}
              onClick={setThisMonth}
            >
              이번달
            </Button>
            <Button
              size="sm"
              variant={activePreset === "lastMonth" ? "default" : "outline"}
              onClick={setLastMonth}
            >
              지난달
            </Button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 sm:max-w-xl">
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setActivePreset(null);
              }}
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <span className="text-gray-500">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setActivePreset(null);
              }}
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6"
              onClick={fetchStatistics}
              disabled={loading}
            >
              조회하기
            </Button>
          </div>
        </Card>

        {/* ================= 주요 지표 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {data &&
            [
              {
                label: "총 예약",
                value: `${data.summary.totalReservations}건`,
                icon: Calendar,
                color: "text-blue-600",
              },
              {
                label: "총 매출",
                value: `${data.summary.totalSales.toLocaleString()}원`,
                icon: DollarSign,
                color: "text-green-600",
              },
              {
                label: "정산완료",
                value: `${data.summary.settledCount ?? 0}건`,
                icon: Users,
                color: "text-orange-600",
              },
              {
                label: "에이전시 수익",
                value: `${data.summary.agencyRevenue.toLocaleString()}원`,
                icon: Receipt,
                color: "text-red-600",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6">
                  {loading && (
                    <div className="text-sm text-gray-500 mt-2">
                      통계 불러오는 중...
                    </div>
                  )}
                  {error && (
                    <div className="text-sm text-red-600 mt-2">{error}</div>
                  )}

                  <div className="flex justify-between mb-3">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>

                  {stat.label === "총 예약" && (
                    <div className="text-xs text-gray-400 mt-1">
                      예약 생성일 기준 집계입니다.
                    </div>
                  )}
                </Card>
              );
            })}
        </div>

        {/* ================= 하단 2열 (병원 통계와 동일한 블럭 구조) ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* 병원별 실적 */}
          <Card className="p-6">
            {loading && (
              <div className="text-sm text-gray-500 mt-2">
                통계 불러오는 중...
              </div>
            )}
            {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

            <h3 className="font-semibold text-gray-900 mb-4">병원별 실적</h3>
            <div className="text-xs text-gray-400 -mt-3 mb-4">
              정산 완료일 기준 집계입니다.
            </div>

            <div className="space-y-3">
              {(data?.hospitalStats ?? []).map((item, idx) => {
                const width =
                  maxHospitalReservations > 0
                    ? Math.min(
                        100,
                        (item.reservations / maxHospitalReservations) * 100
                      )
                    : 0;

                return (
                  <div key={item.hospital} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.hospital}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.reservations}건 · 매출 {formatCurrency(item.sales)}
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(item.revenue)}
                      </div>
                    </div>

                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              {!data?.hospitalStats?.length && (
                <div className="text-sm text-gray-400 py-8 text-center">
                  데이터 없음
                </div>
              )}
            </div>
          </Card>

          {/* 월별 추이 (에이전시용: 수익/매출/예약) */}
          <Card className="p-6">
            {loading && (
              <div className="text-sm text-gray-500 mt-2">
                통계 불러오는 중...
              </div>
            )}
            {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

            <h3 className="font-semibold text-gray-900 mb-4">월별 추이 </h3>
                                      <div className="text-xs text-gray-400 -mt-3 mb-4">
              예약 생성일 기준 집계입니다.
            </div>


            <div className="space-y-4">
              {(data?.monthly ?? []).map((m) => {
                const width =
                  maxMonthlyReservations > 0
                    ? Math.min(100, (m.reservations / maxMonthlyReservations) * 100)
                    : 0;

                return (
                  <div key={m.month}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {m.month}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {m.reservations}건
                      </span>
                    </div>

                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${width}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>매출: {formatCurrency(m.sales)}</span>
                      <span>수익: {formatCurrency(m.revenue)}</span>
                    </div>
                  </div>
                );
              })}

              {!data?.monthly?.length && (
                <div className="text-sm text-gray-400 py-8 text-center">
                  데이터 없음
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
