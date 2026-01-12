"use client";

import { Wallet } from "lucide-react";

export function HospitalBalanceBox({ balance }: { balance: number }) {
  const isLowBalance = balance < 50000;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${
        isLowBalance
          ? "bg-red-50 border-red-200"
          : "bg-green-50 border-green-200"
      }`}
    >
      <Wallet
        className={`w-5 h-5 ${
          isLowBalance ? "text-red-600" : "text-green-600"
        }`}
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-gray-600">정산 잔액</span>
        <span
          className={`font-semibold ${
            isLowBalance ? "text-red-700" : "text-green-700"
          }`}
        >
          {balance.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
