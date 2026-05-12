"use client";

import { Wallet, AlertTriangle } from "lucide-react";

export function HospitalBalanceBox({ balance }: { balance: number }) {
  const isLowBalance = balance < 50_000;

  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2 transition-all ${
        isLowBalance
          ? "border-red-200 bg-red-50"
          : "border-green-200 bg-green-50"
      }`}
    >
      {isLowBalance ? (
        <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
      ) : (
        <Wallet className="h-4 w-4 text-green-600 shrink-0" />
      )}
      <div className="leading-tight">
        <div className="text-[10px] font-medium text-gray-500">정산 잔액</div>
        <div
          className={`text-[13px] font-bold ${
            isLowBalance ? "text-red-700" : "text-green-700"
          }`}
        >
          {balance.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}
