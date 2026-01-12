"use client";

import api from "@/lib/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { TaxSettlement } from "./TaxTab";
import { Input } from "@/components/ui/input";

export default function VoidConfirmModal({
  open,
  row,
  onClose,
  onVoided,
}: {
  open: boolean;
  row: TaxSettlement | null;
  onClose: () => void;
  onVoided: () => Promise<void> | void;
}) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const submit = async () => {
    if (!row) return;

    try {
      setLoading(true);
      await api.post("/admin/tax/void", {
        taxSettlementId: row.id,
        reason: reason || undefined,
      });
      await onVoided();
    } catch (e) {
      console.error(e);
      alert("VOID 처리에 실패했습니다.");
    } finally {
      setLoading(false);
      setReason("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>발행 취소(VOID)</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            이미 발행된 세금계산서를 취소합니다. 취소 후 재발행은 새로 진행해야 합니다.
          </p>

          {row && (
            <div className="rounded-md border bg-gray-50 p-3">
              <div>발행 ID: #{row.id}</div>
              <div>대상: {row.targetType}</div>
              <div>대상 ID: {row.targetId}</div>
            </div>
          )}

          <div>
            <div className="mb-1 text-xs text-gray-500">사유(선택)</div>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="예: 금액 오류로 재발행"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            닫기
          </Button>
          <Button variant="destructive" onClick={submit} disabled={loading}>
            {loading ? "처리중..." : "VOID 확정"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
