"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  requiredAmount?: number;
  currentBalance?: number;
}

export function InsufficientBalanceDialog({
  open,
  onClose,
  requiredAmount,
  currentBalance
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-xl py-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-red-600">
            충전금이 부족합니다
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-gray-700 space-y-2">
          <p>정산을 진행하기에 충전금이 부족합니다.</p>

          {requiredAmount !== undefined && currentBalance !== undefined && (
            <div className="mt-3 text-sm bg-gray-50 p-3 rounded-lg">
              <div>필요 금액: <b>{requiredAmount.toLocaleString()}원</b></div>
              <div>보유 금액: <b>{currentBalance.toLocaleString()}원</b></div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="default" onClick={onClose} className="w-full">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
