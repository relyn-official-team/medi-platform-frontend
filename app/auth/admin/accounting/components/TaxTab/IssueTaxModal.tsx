"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import type { ConflictInfo } from "./ConflictModal";
import Autocomplete from "@/components/common/Autocomplete";

export default function IssueTaxModal({
  open,
  onClose,
  onIssued,
  onConflict,
}: {
  open: boolean;
  onClose: () => void;
  onIssued: () => Promise<void> | void;
  onConflict: (c: ConflictInfo) => void;
}) {
  const [targetType, setTargetType] = useState<"HOSPITAL" | "AGENCY">("HOSPITAL");
  const [targetId, setTargetId] = useState("");
  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
  const [endDate, setEndDate] = useState(""); // YYYY-MM-DD
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!targetId.trim() || !startDate || !endDate) {
      alert("대상ID 및 기간(start/end)은 필수입니다.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/tax/issue", {
        targetType,
        targetId: targetId.trim(),
        startDate,
        endDate,
        memo: memo || undefined,
      });
      await onIssued();
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 409) {
        const conflict = e.response?.data?.conflictedTaxSettlement;
        if (conflict?.id) {
          onConflict(conflict);
          return;
        }
      }
      console.error(e);
      alert("세금계산서 발행에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>세금계산서 발행</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs text-gray-500">대상 유형</div>
            <Select
            value={targetType}
            onChange={(e) =>
                setTargetType(e.target.value as "HOSPITAL" | "AGENCY")
            }
            >
            <option value="HOSPITAL">병원</option>
            <option value="AGENCY">에이전시</option>
            </Select>
          </div>

          <div>
<Autocomplete
  placeholder={
    targetType === "HOSPITAL"
      ? "병원명 검색"
      : "에이전시명 검색"
  }
  value={targetId}
  fetchUrl={
    targetType === "HOSPITAL"
      ? "/admin/lookup/hospitals"
      : "/admin/lookup/agencies"
  }
  onChange={(id) => setTargetId(id)}
/>

          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-1 text-xs text-gray-500">정산기간 시작</div>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">정산기간 종료</div>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div>
            <div className="mb-1 text-xs text-gray-500">메모 (선택)</div>
            <Input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="예: 1월 정산분" />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            취소
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? "처리중..." : "발행"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
