// components/hospital/layout/UserMenu.tsx
"use client";

import { FC } from "react";
import { Wallet } from "lucide-react";


interface Props {
  hospitalName: string;
  chargeBalance: number;
}

const UserMenu: FC<Props> = ({ hospitalName, chargeBalance }) => {

  const logout = async () => {
  const api = (await import("@/lib/api")).default;
  await api.post("/auth/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex items-center gap-4 text-sm">

{/* 충전금 잔액 */}
<div className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-3 py-1.5">
  <Wallet className="w-4 h-4 text-green-600" />
  <div className="leading-tight">
    <div className="text-[11px] text-green-700">충전금 잔액</div>
    <div className="text-sm font-semibold text-green-700">
      {chargeBalance.toLocaleString()}원
    </div>
  </div>
</div>

      {/* 병원명 */}
      <div className="font-medium text-gray-700">
        {hospitalName}
      </div>

      {/* 로그아웃 */}
      <button
        onClick={logout}
        className="px-3 py-1 rounded-md border text-gray-600 hover:bg-gray-100"
      >
        로그아웃
      </button>
    </div>
  );
};

export default UserMenu;
