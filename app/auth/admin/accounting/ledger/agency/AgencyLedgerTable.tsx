"use client";

import { cn } from "@/lib/utils";
import { AgencyLedgerRow } from "./AgencyLedgerTab";

function fmtDate(v: string) {
  const d = new Date(v);
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

export default function AgencyLedgerTable({
  rows,
  loading,
}: {
  rows: AgencyLedgerRow[];
  loading: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full min-w-[1050px] text-sm">
        <thead className="border-b bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3">정산일</th>
            <th className="px-4 py-3">구분</th>
<th className="px-4 py-3">에이전시명</th>
<th className="px-4 py-3">병원명</th>
<th className="px-4 py-3">환자명</th>
            <th className="px-4 py-3 text-right">수수료 금액</th>
            <th className="px-4 py-3">수수료 방식</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-gray-500">
                로딩중...
              </td>
            </tr>
          )}

          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-gray-500">
                데이터가 없습니다.
              </td>
            </tr>
          )}

          {!loading &&
            rows.map((r) => (
              <tr key={r.settlementId} className="border-b">
                <td className="px-4 py-3">{fmtDate(r.settledAt)}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs",
   r.reason === "SETTLED"
     ? "bg-green-50 text-green-700"
     : "bg-green-100 text-green-800"
                    )}
                  >
                    {r.reason === "SETTLED" ? "수익" : "복구"}
                  </span>
                </td>
<td className="px-4 py-3">{r.agency.name}</td>
<td className="px-4 py-3">{r.hospital.name}</td>
<td className="px-4 py-3">{r.patientName ?? "-"}</td>

                <td className="px-4 py-3 text-right font-medium">
                  {fmtMoney(r.amount)}
                </td>
                <td className="px-4 py-3">
                  {r.commission.calcType === "PERCENTAGE"
                    ? `정률 ${r.commission.rate}%`
                    : `정액 ${fmtMoney(r.commission.flatAmount ?? 0)}원`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
