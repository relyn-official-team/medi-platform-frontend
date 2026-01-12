"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export type ConflictInfo = {
  id: number;
  targetType: "HOSPITAL" | "AGENCY";
  targetId: string;
  startDate: string;
  endDate: string;
};

function d(v: string) {
  try {
    return new Date(v).toISOString().slice(0, 10);
  } catch {
    return v;
  }
}

export default function ConflictModal({
  open,
  conflict,
  onClose,
  onView,
}: {
  open: boolean;
  conflict: ConflictInfo | null;
  onClose: () => void;
  onView: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>이미 발행된 세금계산서와 중복됩니다</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-gray-700">
          <p>
            선택한 기간의 일부 정산 내역이 이미 다른 세금계산서(최신 발행본)에 포함되어 있어
            발행할 수 없습니다.
          </p>

          {conflict && (
            <div className="mt-4 rounded-md border bg-gray-50 p-3 text-sm">
              <div className="font-medium text-gray-900">중복된 발행 정보</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="text-gray-500">발행 ID</div>
                <div className="text-gray-900">#{conflict.id}</div>

                <div className="text-gray-500">대상</div>
                <div className="text-gray-900">{conflict.targetType}</div>

                <div className="text-gray-500">대상 ID</div>
                <div className="text-gray-900">{conflict.targetId}</div>

                <div className="text-gray-500">정산 기간</div>
                <div className="text-gray-900">
                  {d(conflict.startDate)} ~ {d(conflict.endDate)}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
          <Button onClick={onView}>해당 발행 보기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
