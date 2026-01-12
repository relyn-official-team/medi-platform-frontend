"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/common/StatusBadge";
import { AGENCY_PAYOUT_STATUS_LABEL } from "@/lib/statusLabel";

type PayoutStatus = "REQUESTED" | "PAID" | "REJECTED";

type AdminPayoutRow = {
  payoutRequestId: number;
  agency: {
    id: string;
    name: string;
    bank: {
      bankName: string | null;
      accountNo: string | null;
      accountHolder: string | null;
    };
  };
  period: { fromDate: string; toDate: string };
  status: PayoutStatus;
  totalAmount: number;
  requestedAt: string;
  paidAt: string | null;
  settlementCount: number;
  memo: string | null;
};

type AdminPayoutResponse = {
  items: AdminPayoutRow[];
  pagination: { page: number; limit: number; total: number };
};

export default function AdminAgencyPayoutsPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [status, setStatus] = useState<PayoutStatus | "">("REQUESTED");
  const [agencyName, setAgencyName] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [page, setPage] = useState(1);
  const limit = 20;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AdminPayoutResponse>({
    items: [],
    pagination: { page: 1, limit, total: 0 },
  });

  const totalPages = useMemo(() => {
    const t = data.pagination.total;
    return Math.max(1, Math.ceil(t / limit));
  }, [data.pagination.total]);

  const load = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await api.get<AdminPayoutResponse>("/admin/agency-payouts", {
        params: {
          status: status || undefined,
          agencyName: agencyName || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          page: targetPage,
          limit,
        },
      });
      setData(res.data);
      setPage(targetPage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markPaid = async (row: AdminPayoutRow) => {
    if (row.status !== "REQUESTED") {
      alert("REQUESTED 상태만 지급완료 처리할 수 있습니다.");
      return;
    }

    const memo = prompt("입금 완료 메모(선택)", row.memo ?? "") ?? undefined;
    const ok = confirm(
      `지급완료 처리하시겠습니까?\n\n에이전시: ${row.agency.name}\n금액: ${row.totalAmount.toLocaleString()}원`
    );
    if (!ok) return;

    await api.patch(`/admin/agency-payouts/${row.payoutRequestId}/mark-paid`, {
      memo,
    });

    alert("지급완료 처리되었습니다.");
    await load(page);
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold">에이전시 정산요청 관리</div>

      {/* 필터 */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap gap-2 items-end">
          <div className="w-48">
            <div className="text-xs text-gray-500 mb-1">상태</div>
            <select
              className="w-full h-10 border rounded-md px-2 bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="">전체</option>
              <option value="REQUESTED">요청</option>
              <option value="PAID">지급완료</option>
              <option value="REJECTED">반려</option>
            </select>
          </div>

          <div className="w-64">
            <div className="text-xs text-gray-500 mb-1">에이전시명</div>
            <Input
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              placeholder="검색"
            />
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-1">요청일(From)</div>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-1">요청일(To)</div>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          <Button onClick={() => load(1)} disabled={loading}>
            조회
          </Button>
        </div>
      </div>

      {/* 리스트 */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3">요청ID</th>
                <th className="text-left p-3">에이전시</th>
                <th className="text-left p-3">계좌정보</th>
                <th className="text-left p-3">기간</th>
                <th className="text-right p-3">금액</th>
                <th className="text-right p-3">건수</th>
                <th className="text-left p-3">상태</th>
                <th className="text-left p-3">요청일</th>
                <th className="text-left p-3">지급일</th>
                <th className="text-left p-3">메모</th>
                <th className="text-right p-3">처리</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.items.length === 0 && (
                <tr>
                  <td className="p-4 text-gray-500" colSpan={11}>
                    데이터가 없습니다.
                  </td>
                </tr>
              )}

              {data.items.map((r) => (
                <tr key={r.payoutRequestId} className="hover:bg-gray-50">
                  <td className="p-3">{r.payoutRequestId}</td>
                  <td className="p-3">
                    <div className="font-medium">{r.agency.name}</div>
                    <div className="text-xs text-gray-500">{r.agency.id}</div>
                  </td>
                  <td className="p-3">
                    <div>{r.agency.bank.bankName ?? "-"}</div>
                    <div className="text-xs text-gray-500">
                      {r.agency.bank.accountNo ?? "-"} / {r.agency.bank.accountHolder ?? "-"}
                    </div>
                  </td>
                  <td className="p-3">
                    {r.period.fromDate.slice(0, 10)} ~ {r.period.toDate.slice(0, 10)}
                  </td>
                  <td className="p-3 text-right font-semibold">
                    {r.totalAmount.toLocaleString()}원
                  </td>
                  <td className="p-3 text-right">{r.settlementCount}</td>
                  <td className="p-3">
                      <StatusBadge
                        label={AGENCY_PAYOUT_STATUS_LABEL[r.status]}
                        variant={
                        r.status === "REQUESTED"
                            ? "blue"
                            : r.status === "PAID"
                            ? "green"
                            : "red"
                        }
                    />
                  </td>
                  <td className="p-3">{r.requestedAt.slice(0, 10)}</td>
                  <td className="p-3">{r.paidAt ? r.paidAt.slice(0, 10) : "-"}</td>
                  <td className="p-3 max-w-[220px] truncate" title={r.memo ?? ""}>
                    {r.memo ?? "-"}
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      variant="default"
                      onClick={() => markPaid(r)}
                      disabled={loading || r.status !== "REQUESTED"}
                    >
                      지급완료
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이징 */}
        <div className="flex items-center justify-between p-3 border-t bg-white">
          <div className="text-sm text-gray-600">
            총 {data.pagination.total.toLocaleString()}건
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={page <= 1 || loading}
              onClick={() => load(page - 1)}
            >
              이전
            </Button>
            <div className="text-sm">
              {page} / {totalPages}
            </div>
            <Button
              variant="outline"
              disabled={page >= totalPages || loading}
              onClick={() => load(page + 1)}
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
