"use client";

import { HospitalBalanceBox } from "./HospitalBalanceBox";
import UserMenu from "./UserMenu";

export default function HospitalHeader({
  settings,
}: {
  settings: { chargeBalance: number; name?: string };
}) {
  return (
    <header className="flex items-center justify-between px-6 h-16 border-b bg-white">
      {/* 좌측: 병원명 */}
      <div className="text-lg font-semibold text-gray-900">
        {settings?.name ?? "병원 대시보드"}
      </div>

      {/* 우측: 충전금 + 유저메뉴 */}
      <div className="flex items-center gap-4">
        {/* 🔵 충전금 박스 추가 */}
        <HospitalBalanceBox balance={settings?.chargeBalance ?? 0} />

      
      </div>
    </header>
  );
}
