"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import SettlementFilter, { DateRange } from "./components/SettlementFilter";
import SettlementTable from "./components/SettlementTable";
import { SettlementItem } from "./types";

export default function HospitalSettlementsPage() {
  const [items, setItems] = useState<SettlementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const downloadCsv = () => {
    if (!items.length) {
      alert("다운로드할 정산 내역이 없습니다.");
      return;
    }

    const header = [
      "일시",
      "구분",
      "금액",
      "에이전시명",
      "환자명",
      "국적",
      "예약일",
      "예약시간",
    ];

    const rows = items.map((it) => [
      it.createdAt.replace("T", " ").slice(0, 16),
      it.type,
      it.amount,
      it.agencyName ?? "",
      it.patientName ?? "",
      it.patientNationality ?? "",
      it.reservationDate ?? "",
      it.reservationTime ?? "",
    ]);

    const csv = [
      header,
      ...rows,
    ]
      .map((row) =>
        row
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    const filename = `hospital_settlements_${range.from}_${range.to}.csv`;

    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };


  // default: 오늘
  const [range, setRange] = useState<DateRange>(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const v = `${yyyy}-${mm}-${dd}`;
    return { from: v, to: v };
  });

  const params = useMemo(
    () => ({
      from: range.from,
      to: range.to,
      agencyName: range.agencyName || undefined,
      patientName: range.patientName || undefined,
    }),
    [range]
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<SettlementItem[]>("/hospital/settlements", {
        params,
      });

      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (e: any) {
      console.error(e);
      setError("정산 내역을 불러오지 못했습니다.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.from, params.to, params.agencyName, params.patientName]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold">정산 내역</h1>
            <p className="text-sm text-gray-500 mt-1">
              기간: {range.from} ~ {range.to}
            </p>
          </div>

          <div className="flex gap-2">
    <button
      type="button"
      onClick={downloadCsv}
      className="h-9 px-3 rounded-md border bg-white text-sm hover:bg-gray-50"
    >
      CSV 다운로드
    </button>

    <button
      type="button"
      onClick={fetchData}
      className="h-9 px-3 rounded-md border bg-white text-sm hover:bg-gray-50"
    >
      새로고침
    </button>
  </div>
        </div>

        <SettlementFilter value={range} onChange={setRange} />

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <SettlementTable items={items} loading={loading} />
      </div>
    </div>
  );
}
