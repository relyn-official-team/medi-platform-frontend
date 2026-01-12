"use client";

import { useState } from "react";
import { useEffect } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  chargeBalance: number;
  onRequested?: () => void;
}

interface PendingChargeSummary {
  totalPendingAmount: number;
  bankName?: string;
  accountNo?: string;
  accountHolder?: string;
}

export default function ChargeSection({
  chargeBalance,
  onRequested,
}: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [pendingSummary, setPendingSummary] =
  useState<PendingChargeSummary | null>(null);
//  PENDING 충전 합산 조회
  const loadPendingSummary = async () => {
  try {
    const res = await api.get<PendingChargeSummary>(
      "/hospital/charge/pending-summary"
    );

    if (res.data.totalPendingAmount > 0) {
      setPendingSummary(res.data);
    } else {
      setPendingSummary(null);
    }
  } catch (e) {
    console.error("Failed to load pending summary", e);
  }
};
// 🔹 최초 진입 시 PENDING 충전 합산 로딩
useEffect(() => {
  loadPendingSummary();
}, []);

  const requestCharge = async () => {
    if (!amount || amount <= 0) {
      alert("충전 금액을 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/hospital/charge/request", { amount });
      alert("충전 요청이 접수되었습니다.\n입금 후 관리자 승인까지 대기해주세요.");
      setAmount(0);
      await loadPendingSummary();
      onRequested?.();
    } catch (e) {
      console.error(e);
      alert("충전 요청 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl border bg-white p-4">
      <h2 className="font-semibold mb-3">정산금 충전</h2>

      <div className="text-sm text-gray-600 mb-2">
        현재 잔액:{" "}
        <span className="font-semibold">
          {chargeBalance.toLocaleString()}원
        </span>
      </div>

      <Input
        type="number"
        placeholder="충전 금액"
        value={amount || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(Number(e.target.value))
        }
      />

      <div className="grid grid-cols-3 gap-2 mt-2">
        {[1_000_000, 5_000_000, 10_000_000].map((v) => (
          <Button
            key={v}
            variant="outline"
            size="sm"
            onClick={() => setAmount(v)}
          >
            +{v.toLocaleString()}
          </Button>
        ))}
      </div>

      <Button className="mt-3" onClick={requestCharge} disabled={loading}>
        {loading ? "요청 중..." : "충전 요청"}
      </Button>
      {pendingSummary && pendingSummary.totalPendingAmount > 0 && (
  <div className="mt-4 text-sm font-medium text-blue-600">
    충전 신청 완료:{" "}
    {pendingSummary.totalPendingAmount.toLocaleString()}원
  </div>
)}

{pendingSummary && (
  <div className="mt-4 rounded-md border bg-gray-50 p-4">
    <h4 className="font-semibold mb-2">입금 안내</h4>
    <div className="text-sm space-y-1">
      <div>
        입금 금액:{" "}
        {pendingSummary.totalPendingAmount.toLocaleString()}원
      </div>
      <div>은행명: {pendingSummary.bankName}</div>
      <div>계좌번호: {pendingSummary.accountNo}</div>
      <div>예금주: {pendingSummary.accountHolder}</div>
    </div>
    <p className="mt-2 text-xs text-gray-500">
      ※ 입금 확인 후 충전금이 반영됩니다.<br />
      ※ 동일 금액으로 입금해 주세요.
    </p>
  </div>
)}
    </section>
  );
}
