"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import MobileHeader from "@/components/agency/MobileHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/common/StatusBadge";
import { AGENCY_PAYOUT_STATUS_LABEL } from "@/lib/statusLabel";

type EligibleSettlement = {
  settlementId: number;
  reservationId: number;
  settledAt: string;
  patientName: string;
  procedureName: string | null;
  hospital: {
    id: string;
    name: string;
  };
  agencyFee: number;
};

type PayoutRequest = {
  payoutRequestId: number;
  status: "REQUESTED" | "PAID" | "REJECTED";
  totalAmount: number;
  requestedAt: string;
  paidAt: string | null;
  settlements?: {
    settlementId: number;
    reservationId: number;
    settledAt: string;
    agencyFee: number;
    hospital?: {
      id: string;
      name: string;
    } | null;
    patientName?: string | null;
    procedureName?: string | null;
  }[];
};

export default function AgencyPayoutPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const [eligible, setEligible] = useState<EligibleSettlement[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [requests, setRequests] = useState<PayoutRequest[]>([]);

  /* ===============================
     전체선택 상태 계산
  =============================== */
  const allSelected =
    eligible.length > 0 &&
    eligible.every((e) => selectedIds.includes(e.settlementId));

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(eligible.map((e) => e.settlementId));
    } else {
      setSelectedIds([]);
    }
  };

  const [openRequestId, setOpenRequestId] = useState<number | null>(null);

  const toggleRequest = (id: number) => {
    setOpenRequestId((prev) => (prev === id ? null : id));
  };



  /* ===============================
     지급요청 가능 목록 조회
  =============================== */
  const loadEligible = async () => {
    setLoading(true);
    try {
      const res = await api.get<EligibleSettlement[]>(
        "/agency/payouts/eligible",
        { params: { startDate: fromDate, endDate: toDate } }
      );
      setEligible(res.data);
      setSelectedIds([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     기존 지급요청 목록 조회
  =============================== */
  const loadRequests = async () => {
  const res = await api.get<{ items: PayoutRequest[] }>(
    "/agency/payouts",
    {
      params: {
        fromDate,
        toDate,
      },
    }
  );
    setRequests(res.data.items);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  /* ===============================
     합계 금액
  =============================== */
  const totalAmount = useMemo(() => {
    return eligible
      .filter((e) => selectedIds.includes(e.settlementId))
      .reduce((sum, e) => sum + e.agencyFee, 0);
  }, [eligible, selectedIds]);

  /* ===============================
     지급요청 생성
  =============================== */
  const submitRequest = async () => {
    if (selectedIds.length === 0) {
      alert("정산요청할 항목을 선택해주세요.");
      return;
    }

    const ok = confirm(
      `총 ${totalAmount.toLocaleString()}원을 정산요청 하시겠습니까?`
    );
    if (!ok) return;

    await api.post("/agency/payouts", {
      fromDate,
      toDate,
      settlementIds: selectedIds,
    });

    alert("정산요청이 접수되었습니다.");
   await loadEligible();
   await loadRequests();
  };

  return (
    <>
      <MobileHeader title="수수료 정산요청" />
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* 기간 필터 */}
        <div className="flex gap-2">
          <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <Button 
   onClick={async () => {
   await loadEligible();
   await loadRequests();
 }} disabled={loading}>
            조회
          </Button>
        </div>

        {/* 지급요청 가능 리스트 */}
 <div className="bg-white rounded-xl border divide-y">
  {/* 전체선택 */}
  {eligible.length > 0 && (
    <label className="flex items-center gap-3 p-4 border-b bg-gray-50 text-sm font-medium">
      <input
        type="checkbox"
        checked={allSelected}
       onChange={(e) => toggleSelectAll(e.target.checked)}
      />
      <span>전체선택</span>
      <span className="ml-auto text-gray-500">
        {eligible.length}건
      </span>
    </label>
  )}
          {eligible.length === 0 && (
            <div className="p-4 text-gray-500 text-sm">
              지급요청 가능한 정산 내역이 없습니다.
            </div>
          )}

          {eligible.map((s) => (
            <label
              key={s.settlementId}
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(s.settlementId)}
                onChange={(e) => {
                  setSelectedIds((prev) =>
                    e.target.checked
                      ? [...prev, s.settlementId]
                      : prev.filter((id) => id !== s.settlementId)
                  );
                }}
              />
              <div className="flex-1">
                <div className="font-medium">
                  {s.hospital.name} · {s.patientName}
                </div>
                <div className="text-sm text-gray-500">
                  {s.procedureName ?? "-"} · {s.settledAt.slice(0, 10)}
                </div>
              </div>
              <div className="font-semibold">
                {s.agencyFee.toLocaleString()}원
              </div>
            </label>
          ))}
        </div>

        {/* 합계 + 버튼 */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            합계: {totalAmount.toLocaleString()}원
          </div>
          <Button onClick={submitRequest} disabled={selectedIds.length === 0}>
            정산요청
          </Button>
        </div>

        {/* 지급요청 이력 */}
        <div className="bg-white rounded-xl border divide-y">
          <div className="p-3 font-semibold">정산요청 이력</div>
          {requests.map((r) => (
            <div key={r.payoutRequestId}
  className="p-3 text-sm cursor-pointer hover:bg-gray-50"
  onClick={() => toggleRequest(r.payoutRequestId)}
>
              <div className="flex justify-between">
                <span>{r.requestedAt.slice(0, 10)}</span>
                <span className="font-medium">
                  {r.totalAmount.toLocaleString()}원
                </span>
              </div>
 <div className="flex items-center gap-2 text-gray-500">
   <span>상태:</span>
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
   {r.paidAt && (
     <span className="text-xs text-gray-400">
       (지급완료: {r.paidAt.slice(0, 10)})
     </span>
   )}
 </div>

  {/* 상세 펼침 영역 */}
  {openRequestId === r.payoutRequestId && (
   <div className="mt-3 bg-gray-50 rounded-lg border divide-y">
      {(r.settlements ?? []).map((s) => (
        <div
          key={s.settlementId}
          className="flex justify-between p-3 text-xs"
        >
          <div>
  <div className="font-medium">
    {s.hospital?.name ?? "병원 미지정"}
  </div>
  <div className="text-gray-600">
    환자명: {s.patientName ?? "환자명 없음"}
    {s.procedureName && ` · ${s.procedureName}`}
  </div>
            <div className="text-gray-500">
             [정산완료] 상태 변경일: {s.settledAt.slice(0, 10)}
            </div>
          </div>
          <div className="font-semibold">
            {s.agencyFee.toLocaleString()}원
          </div>
        </div>
      ))}
      {(r.settlements ?? []).length === 0 && (
        <div className="p-3 text-xs text-gray-500">
          포함된 정산 내역이 없습니다.
        </div>
      )}
    </div>
  )}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
