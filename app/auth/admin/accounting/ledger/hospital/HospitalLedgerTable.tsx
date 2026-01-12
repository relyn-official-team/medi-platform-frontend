"use client";

import { cn } from "@/lib/utils";
import { HospitalLedgerRow } from "./HospitalLedgerTab";

function fmtDate(v: string) {
 if (!v) return "-";

 const d = new Date(v);
 if (Number.isNaN(d.getTime())) return "-";

 return d.toLocaleDateString("ko-KR", {
   timeZone: "Asia/Seoul",
 });
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

export default function HospitalLedgerTable({
  rows,
  loading,
}: {
  rows: HospitalLedgerRow[];
  loading: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full min-w-[1100px] text-sm">
        <thead className="border-b bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3">정산일</th>
            <th className="px-4 py-3">구분</th>
<th className="px-4 py-3">병원명</th>
<th className="px-4 py-3">에이전시명</th>
<th className="px-4 py-3">환자명</th>
<th className="px-4 py-3 text-right">에이전시 수수료</th>
<th className="px-4 py-3 text-right">플랫폼 수수료</th>
<th className="px-4 py-3 text-right">합계</th>
<th className="px-4 py-3">수수료 방식</th>

          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-gray-500">
                로딩중...
              </td>
            </tr>
          )}

          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-gray-500">
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
     ? "bg-red-50 text-red-700"
     : r.reason === "REVERTED"
     ? "bg-green-50 text-green-700"
     : "bg-blue-50 text-blue-700"
                    )}
                  >
 {r.reason === "SETTLED"
   ? "차감"
   : r.reason === "REVERTED"
   ? "복구"
 : r.direction === "OUT"
 ? "충전 환불"
 : "충전"}
                  </span>
                </td>
<td className="px-4 py-3">{r.hospital.name}</td>
<td className="px-4 py-3">{r.agency?.name ?? "-"}</td>
<td className="px-4 py-3">{r.patientName ?? "-"}</td>

<td className="px-4 py-3 text-right">
  {fmtMoney(r.fee.agencyFee)}
</td>
<td className="px-4 py-3 text-right">
  {fmtMoney(r.fee.platformFee)}
</td>
<td className="px-4 py-3 text-right font-medium">
  {fmtMoney(r.fee.totalFee)}
</td>

                <td className="px-4 py-3">
 {r.reason === "CHARGE"
   ? "-"
   : r.commission.calcType === "PERCENTAGE"
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
