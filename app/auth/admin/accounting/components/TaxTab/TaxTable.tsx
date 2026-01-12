"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TaxSettlement } from "./TaxTab";

function fmtDate(v: string | null) {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n || 0);
}

function fmtDateKST(v: string | null | undefined) {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);

  // UTC → KST
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}


export default function TaxTable({
  rows,
  loading,
  onDetail,
  onVoid,
}: {
  rows: TaxSettlement[];
  loading: boolean;
  onDetail: (r: TaxSettlement) => void;
  onVoid: (r: TaxSettlement) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[950px] text-sm">
        <thead className="border-b bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3">발행일</th>
            <th className="px-4 py-3">대상</th>
            <th className="px-4 py-3">회사명</th>
            <th className="px-4 py-3">정산기간</th>
            <th className="px-4 py-3 text-right">합계</th>
            <th className="px-4 py-3 text-center">Rev</th>
            <th className="px-4 py-3 text-center">상태</th>
            <th className="px-4 py-3 text-right">액션</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td className="px-4 py-6 text-gray-500" colSpan={8}>
                로딩중...
              </td>
            </tr>
          )}

          {!loading && rows.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-gray-500" colSpan={8}>
                데이터가 없습니다.
              </td>
            </tr>
          )}

          {!loading &&
            rows.map((r) => {
              const canVoid = r.status === "ISSUED" && r.isLatest === true;
              return (
                <tr key={r.id} className="border-b last:border-b-0">
                  <td className="px-4 py-3">{fmtDateKST(r.issuedAt)}</td>
                  <td className="px-4 py-3">{r.targetType}</td>
                  <td className="px-4 py-3">{r.targetName || "-"}</td>
                  <td className="px-4 py-3">
                    {fmtDateKST(r.startDate)} ~ {fmtDateKST(r.endDate)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {fmtMoney(r.totalAmount)}
                  </td>
                  <td className="px-4 py-3 text-center">{r.revision}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs",
                        r.status === "ISSUED" && "bg-green-50 text-green-700",
                        r.status === "VOIDED" && "bg-gray-100 text-gray-700",
                        r.status === "DRAFT" && "bg-yellow-50 text-yellow-700"
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => onDetail(r)}>
                        상세
                      </Button>
                      {canVoid && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onVoid(r)}
                        >
                          VOID
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
