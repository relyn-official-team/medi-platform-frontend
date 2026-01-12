"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { TaxSettlement } from "./TaxTab";

type TaxHistoryRow = TaxSettlement & {
  items?: Array<{
    id: number;
    settlementId: number;
    amount: number;
    settlement?: {
      id: number;
      settledAt?: string | null;
      agencyFee: number;
      platformFee: number;
      hospitalRevenue: number;
      reservation?: {
        patientName?: string | null;
        hospitalId?: string | null;
        agencyId?: string | null;
      };
    };
  }>;
};

function fmtDate(v: string | null | undefined) {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
 // UTC → KST 변환
 const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
 return kst.toISOString().slice(0, 10);
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n || 0);
}

export default function TaxDetailModal({
  open,
  row,
  onClose,
}: {
  open: boolean;
  row: TaxSettlement | null;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<TaxHistoryRow[]>([]);

  useEffect(() => {
    if (!open || !row) return;

    (async () => {
      try {
        setLoading(true);
        const res = await api.get<TaxHistoryRow[]>("/admin/tax/issued/history", {
          params: {
            targetType: row.targetType,
            targetId: row.targetId,
            startDate: row.startDate,
            endDate: row.endDate,
          },
        });
        setHistory(res.data || []);
      } catch (e) {
        console.error(e);
        alert("발행 이력 조회에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, row]);

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>발행 상세 (Revision / 포함 정산)</DialogTitle>
        </DialogHeader>

        {loading && <div className="text-sm text-gray-500">로딩중...</div>}

        {!loading && history.length === 0 && (
          <div className="text-sm text-gray-500">이력이 없습니다.</div>
        )}

        {!loading && history.length > 0 && (
          <div className="space-y-4">
            {/* Revision 타임라인 */}
            <div className="rounded-md border bg-white">
              <div className="border-b px-4 py-3 text-sm font-medium text-gray-900">
                Revision
              </div>
              <div className="divide-y">
                {history.map((h) => (
                  <div key={h.id} className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-medium text-gray-900">
                        Rev {h.revision} · {h.status} · {h.isLatest ? "LATEST" : "OLD"}
                      </div>
                      <div className="text-gray-500">
                        issuedAt: {fmtDate(h.issuedAt)}
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-gray-700">
                                      
                      <div>합계: {fmtMoney(h.totalAmount)}</div>
                    </div>
                    {h.memo && <div className="mt-1 text-gray-500">memo: {h.memo}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* 포함 Settlement */}
            <div className="rounded-md border bg-white">
              <div className="border-b px-4 py-3 text-sm font-medium text-gray-900">
                포함된 정산 내역
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="border-b bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-4 py-3">환자명</th>
                      <th className="px-4 py-3">settledAt</th>
                      <th className="px-4 py-3 text-right">agencyFee</th>
                      <th className="px-4 py-3 text-right">platformFee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(history[0]?.items || []).map((it) => (
                      <tr key={it.id} className="border-b last:border-b-0">
                        <td className="px-4 py-3">
                          {it.settlement?.reservation?.patientName || "-"}
                        </td>
                        <td className="px-4 py-3">{fmtDate(it.settlement?.settledAt || null)}</td>
                        <td className="px-4 py-3 text-right">
                          {fmtMoney(it.settlement?.agencyFee || 0)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {row?.targetType === "HOSPITAL"
                            ? fmtMoney(it.settlement?.platformFee || 0)
                            : "-"}
                        </td>
                      </tr>
                    ))}

                    {(history[0]?.items || []).length === 0 && (
                      <tr>
                        <td className="px-4 py-6 text-gray-500" colSpan={5}>
                          포함된 항목이 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 text-xs text-gray-500">
                포함 항목은 최신 Rev 기준(현재는 history[0])으로 표시합니다.
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
