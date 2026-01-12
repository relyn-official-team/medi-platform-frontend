"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  refundBankName?: string | null;
  refundAccountNumber?: string | null;
  refundAccountHolder?: string | null;
  onChange: (v: {
   refundBankName?: string;
   refundAccountNumber?: string;
   refundAccountHolder?: string;
 }) => void;
  onSaved?: () => void;
}

export default function RefundAccountSection({
  refundBankName,
  refundAccountNumber,
  refundAccountHolder,
  onChange,
  onSaved,
}: Props) {
  const [saving, setSaving] = useState(false);

  const saveRefundAccount = async () => {
    try {
      setSaving(true);
      await api.patch("/hospital/refund-account", {
        refundBankName,
        refundAccountNumber,
        refundAccountHolder,
      });
      alert("환불 계좌 정보가 저장되었습니다.");
      onSaved?.();
    } catch (e) {
      console.error(e);
      alert("환불 계좌 저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-xl border bg-white p-4">
      <h2 className="font-semibold mb-3">환불 계좌 정보</h2>

      <Input
        placeholder="은행명"
        value={refundBankName ?? ""}
       onChange={(e) => onChange({ refundBankName: e.target.value })}
      />

      <Input
        className="mt-2"
        placeholder="계좌번호"
        value={refundAccountNumber ?? ""}
        onChange={(e) =>
        onChange({ refundAccountNumber: e.target.value })
        }
      />

      <Input
        className="mt-2"
        placeholder="예금주"
        value={refundAccountHolder ?? ""}
        onChange={(e) =>
         onChange({ refundAccountHolder: e.target.value })
          }
      />

      <Button
        size="sm"
        className="mt-3"
        disabled={saving}
        onClick={saveRefundAccount}
      >
        {saving ? "저장 중..." : "저장"}
      </Button>
    </section>
  );
}
