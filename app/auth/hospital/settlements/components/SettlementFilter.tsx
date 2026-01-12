"use client";

import { useMemo, useState, useEffect } from "react";

export interface DateRange {
  from: string; // yyyy-mm-dd
  to: string; // yyyy-mm-dd
  agencyName?: string;
  patientName?: string;
}

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toYmd(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function getTodayRange(): DateRange {
  const t = new Date();
  const v = toYmd(t);
  return { from: v, to: v };
}

function getThisMonthRange(): DateRange {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { from: toYmd(first), to: toYmd(last) };
}

function getLastMonthRange(): DateRange {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const last = new Date(now.getFullYear(), now.getMonth(), 0);
  return { from: toYmd(first), to: toYmd(last) };
}

export default function SettlementFilter({ value, onChange }: Props) {
  const presets = useMemo(
    () => [
      { key: "today", label: "오늘", range: getTodayRange() },
      { key: "thisMonth", label: "이번달", range: getThisMonthRange() },
      { key: "lastMonth", label: "지난달", range: getLastMonthRange() },
    ],
    []
  );

  const [localFrom, setLocalFrom] = useState(value.from);
  const [localTo, setLocalTo] = useState(value.to);
  const [localAgencyName, setLocalAgencyName] = useState(value.agencyName ?? "");
  const [localPatientName, setLocalPatientName] = useState(value.patientName ?? "");

  // value 변경 시 local state 동기화 (프리셋 / 외부 변경 대응)
  useEffect(() => {
    setLocalFrom(value.from);
    setLocalTo(value.to);
    setLocalAgencyName(value.agencyName ?? "");
    setLocalPatientName(value.patientName ?? "");
  }, [value.from, value.to]);

  const apply = () => {
    if (!localFrom || !localTo) return;

    // from <= to 보정
    const from = localFrom <= localTo ? localFrom : localTo;
    const to = localFrom <= localTo ? localTo : localFrom;

    onChange({
      from,
      to,
      agencyName: localAgencyName.trim() || undefined,
      patientName: localPatientName.trim() || undefined,
    });
  };

  return (
    <div className="rounded-lg border bg-white p-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.key}
            type="button"
            // ✅ 날짜 프리셋 적용 시 검색어는 유지
            onClick={() =>
              onChange({
                ...p.range,
                agencyName: value.agencyName,
                patientName: value.patientName,
              })
            }
            className="h-9 px-3 rounded-md border text-sm hover:bg-gray-50"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ✅ 검색 필터 */}
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">에이전시명</span>
          <input
            value={localAgencyName}
            onChange={(e) => setLocalAgencyName(e.target.value)}
            placeholder="에이전시명 검색"
            className="h-9 px-3 rounded-md border bg-white text-sm w-[220px]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">환자명</span>
          <input
            value={localPatientName}
            onChange={(e) => setLocalPatientName(e.target.value)}
           placeholder="환자명 검색"
            className="h-9 px-3 rounded-md border bg-white text-sm w-[220px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">시작일</span>
          <input
            type="date"
            value={localFrom}
            onChange={(e) => setLocalFrom(e.target.value)}
            className="h-9 px-3 rounded-md border bg-white text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">종료일</span>
          <input
            type="date"
            value={localTo}
            onChange={(e) => setLocalTo(e.target.value)}
            className="h-9 px-3 rounded-md border bg-white text-sm"
          />
        </div>

        <button
          type="button"
          onClick={apply}
          className="h-9 px-4 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          적용
        </button>
      </div>
    </div>
  );
}
