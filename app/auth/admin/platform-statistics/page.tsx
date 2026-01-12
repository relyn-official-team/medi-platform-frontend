"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Building2, Users } from "lucide-react";
import api from "@/lib/api";
import { AdminPlatformStatisticsResponse } from "@/types/statistics";

/* -----------------------------
   날짜 유틸
----------------------------- */
const formatDate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const formatKSTDateTime = (iso: string) => {
  const d = new Date(iso);
  // 프로젝트 전역에서 KST 처리 유틸이 있다면 그걸로 교체 권장
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

/* -----------------------------
   SVG Pie Chart (No deps)
----------------------------- */
type PieDatum = { name: string; value: number };

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`;
}

function hashColor(seed: string) {
  // 안정적인 색 생성(지정 색상 요구 없으므로 해시 기반)
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return `hsl(${hue} 65% 55%)`;
}

function PieChartCard({
  title,
  subtitle,
  data,
  emptyText = "데이터 없음",
  topN = 8,
}: {
  title: string;
  subtitle?: string;
  data: Record<string, number>;
  emptyText?: string;
  topN?: number;
}) {
  const items: PieDatum[] = useMemo(() => {
    const arr = Object.entries(data)
      .map(([name, value]) => ({ name, value }))
      .filter((x) => x.value > 0)
      .sort((a, b) => b.value - a.value);

    if (arr.length <= topN) return arr;

    const head = arr.slice(0, topN);
    const tail = arr.slice(topN);
    const others = tail.reduce((sum, x) => sum + x.value, 0);
    return [...head, { name: "기타", value: others }];
  }, [data, topN]);

  const total = items.reduce((sum, x) => sum + x.value, 0);

  const arcs = useMemo(() => {
    if (total <= 0) return [];
    let current = 0;
    return items.map((it) => {
      const start = current;
      const sweep = (it.value / total) * 360;
      const end = current + sweep;
      current = end;
      return { ...it, startAngle: start, endAngle: end, color: hashColor(it.name) };
    });
  }, [items, total]);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {total.toLocaleString()}
        </div>
      </div>

      {total <= 0 ? (
        <div className="text-sm text-gray-500">{emptyText}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          {/* Pie */}
          <div className="flex justify-center">
            <svg width="180" height="180" viewBox="0 0 200 200">
              {arcs.map((a) => (
                <path
                  key={a.name}
                  d={describeArc(100, 100, 90, a.startAngle, a.endAngle)}
                  fill={a.color}
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
              <circle cx="100" cy="100" r="52" fill="white" />
              <text
                x="100"
                y="98"
                textAnchor="middle"
                className="fill-gray-900"
                style={{ fontSize: 14, fontWeight: 700 }}
              >
                합계
              </text>
              <text
                x="100"
                y="122"
                textAnchor="middle"
                className="fill-gray-900"
                style={{ fontSize: 16, fontWeight: 800 }}
              >
                {total.toLocaleString()}
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {items.map((it) => (
              <div key={it.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ background: hashColor(it.name) as any }}
                  />
                  <span className="text-sm text-gray-700 truncate">{it.name}</span>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {it.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AdminPlatformStatisticsPage() {

  // 집계 기준
  const [base, setBase] = useState<"reservation" | "settlement">("settlement");
  
  /* -----------------------------
     조회 기간 (date only)
  ----------------------------- */
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [activePreset, setActivePreset] = useState<"today" | "lastMonth" | null>(
    null
  );

  /* -----------------------------
     데이터 상태
  ----------------------------- */
  const [data, setData] = useState<AdminPlatformStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
     프리셋
  ----------------------------- */
  const setToday = () => {
    const t = new Date();
    setStartDate(formatDate(t));
    setEndDate(formatDate(t));
    setActivePreset("today");
  };

  const setLastMonth = () => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const last = new Date(now.getFullYear(), now.getMonth(), 0);
    setStartDate(formatDate(first));
    setEndDate(formatDate(last));
    setActivePreset("lastMonth");
  };

  const resetDate = () => {
    setStartDate("");
    setEndDate("");
    setActivePreset(null);
  };

  /* -----------------------------
     조회
  ----------------------------- */
  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<AdminPlatformStatisticsResponse>(
        "/admin/platform-statistics",
        {
          params: {
            base,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePreset]);

  /* -----------------------------
     UI derived
  ----------------------------- */
  const hospitalsTop = useMemo(() => (data?.hospitals ?? []).slice(0, 30), [data]);
  const agenciesTop = useMemo(() => (data?.agencies ?? []).slice(0, 30), [data]);

  return (
    <div className="space-y-6 pb-6">
      {/* ================= 조회 조건 ================= */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">조회 조건</h3>
        </div>

  {/* 기준 선택 탭 */}
  <div className="flex gap-2 mb-4">
    <Button
      size="sm"
      variant={base === "settlement" ? "default" : "outline"}
      onClick={() => setBase("settlement")}
    >
      정산 완료 기준
    </Button>
  </div>

        {/* 날짜 입력 + 프리셋 */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
  <span className="text-xs text-gray-500 whitespace-nowrap">
    {base === "reservation" ? "예약 생성일" : "정산 완료일"}
  </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setActivePreset(null);
                }}
                className="px-3 py-2 border rounded-lg text-sm w-full sm:w-auto"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setActivePreset(null);
                }}
                className="px-3 py-2 border rounded-lg text-sm w-full sm:w-auto"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={setToday}>
              오늘
            </Button>
            <Button size="sm" variant="outline" onClick={setLastMonth}>
              지난달
            </Button>
            <Button size="sm" variant="outline" onClick={resetDate}>
              초기화
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Button onClick={fetchStatistics} disabled={loading}>
            조회하기
          </Button>
        </div>

        <div className="mt-2 text-xs text-gray-500">
  {base === "reservation" ? (
    <>통계는 <span className="font-semibold">예약 생성일 기준</span>으로 집계됩니다.</>
  ) : (
    <>통계는 <span className="font-semibold">정산 완료일 기준</span>으로 집계됩니다.</>
  )}
        </div>

        {loading && <div className="text-sm text-gray-500 mt-2">불러오는 중...</div>}
        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
      </Card>

      {/* ================= 요약 지표 ================= */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "신규 병원 수",
              value: `${data.summary.newHospitalCount}개`,
              icon: Building2,
            },
            {
              label: "신규 에이전시 수",
              value: `${data.summary.newAgencyCount}개`,
              icon: Users,
            },
            {
              label: "플랫폼 수수료",
              value: `${data.summary.platformFee.toLocaleString()}원`,
              icon: DollarSign,
              sub: base === "reservation" ? "예약 생성일 기준" : "정산 완료일 기준",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="p-6">
                <Icon className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-2xl font-semibold">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
                {"sub" in s && s.sub ? (
                  <div className="text-xs text-gray-500 mt-1">{s.sub}</div>
                ) : null}
              </Card>
            );
          })}
        </div>
      )}

      {/* ================= 신규 리스트 ================= */}
      {data && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* 신규 병원 리스트 */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">신규 병원 리스트</h3>

            <div className="space-y-3 max-h-[360px] overflow-auto pr-1">
              {hospitalsTop.length === 0 ? (
                <div className="text-sm text-gray-500">데이터 없음</div>
              ) : (
                hospitalsTop.map((h, idx) => (
                  <div key={`${h.name}-${idx}`} className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {h.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatKSTDateTime(h.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* 신규 에이전시 리스트 */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">신규 에이전시 리스트</h3>

            <div className="space-y-3 max-h-[360px] overflow-auto pr-1">
              {agenciesTop.length === 0 ? (
                <div className="text-sm text-gray-500">데이터 없음</div>
              ) : (
                agenciesTop.map((a, idx) => (
                  <div key={`${a.name}-${idx}`} className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {a.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatKSTDateTime(a.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}

      {/* ================= 월별 추이 (3 블럭) ================= */}
      {data && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* 신규 병원 수 */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">월별 신규 병원 수</h3>
            <div className="space-y-4">
              {data.monthly.length === 0 ? (
                <div className="text-sm text-gray-500">데이터 없음</div>
              ) : (
                data.monthly.map((m) => (
                  <div key={`h-${m.month}`}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{m.month}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {m.hospitalCount}개
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${Math.min((m.hospitalCount / 20) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* 신규 에이전시 수 */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">월별 신규 에이전시 수</h3>
            <div className="space-y-4">
              {data.monthly.length === 0 ? (
                <div className="text-sm text-gray-500">데이터 없음</div>
              ) : (
                data.monthly.map((m) => (
                  <div key={`a-${m.month}`}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{m.month}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {m.agencyCount}개
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${Math.min((m.agencyCount / 40) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* 플랫폼 수수료 */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-1">월별 플랫폼 수수료</h3>
            <div className="text-xs text-gray-500 mb-4">정산 완료일 기준</div>
            <div className="space-y-4">
              {data.monthly.length === 0 ? (
                <div className="text-sm text-gray-500">데이터 없음</div>
              ) : (
                data.monthly.map((m) => (
                  <div key={`p-${m.month}`}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{m.month}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {m.platformFee.toLocaleString()}원
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${Math.min((m.platformFee / 1_000_000) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}

      {/* ================= 지역별 원형 그래프 ================= */}
      {data && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PieChartCard
            title="지역별 병원 입점수"
            subtitle="계정 생성일 기준"
            data={data.regionHospitalCount ?? {}}
            emptyText="조건에 해당하는 신규 병원이 없습니다."
          />
          <PieChartCard
            title="지역별 병원 매출"
            subtitle="정산 완료일 기준 (플랫폼 수수료 집계)"
            data={data.regionSales ?? {}}
            emptyText="조건에 해당하는 정산 데이터가 없습니다."
          />
        </div>
      )}
    </div>
  );
}
