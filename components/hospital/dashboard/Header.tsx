"use client";

import { forwardRef } from "react";
import { Menu } from "lucide-react";
import UserMenu from "@/components/hospital/layout/UserMenu";

const Header = forwardRef<HTMLDivElement, {
  collapsed?: boolean;
  onSidebarOpen?: () => void;
  hospitalName: string;
  chargeBalance: number;
}>(({ collapsed, onSidebarOpen, hospitalName, chargeBalance }, ref) => {
  return (
    <header
      ref={ref}
      style={{
        ["--sidebar-width" as any]: collapsed ? "4rem" : "16rem",
      }}
      className="
        fixed top-0 left-0 right-0
        lg:left-[var(--sidebar-width)]
        z-30 bg-white border-b border-gray-200
        px-4 py-3 transition-all duration-300
      "
    >
      {/* 모바일 헤더 */}
      <div className="flex lg:hidden items-center gap-3">
        <button className="p-1" onClick={onSidebarOpen}>
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-900">
            병원 대시보드
          </span>
          <span className="text-xs text-gray-500">
            오늘 날짜: 2025년 12월 8일 월
          </span>
        </div>
      </div>

      {/* PC 헤더 */}
      <div className="hidden lg:flex items-center justify-between">
        {/* 좌측 제목 영역 */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900">
            병원 대시보드
          </span>
          <span className="text-sm text-gray-500">
            오늘 날짜: 2025년 12월 8일 월
          </span>
        </div>

        {/* 우측 영역: 대시보드홈 + UserMenu */}
        <div className="flex items-center gap-4">

          {/* 👉 UserMenu 추가 */}
          <UserMenu
           hospitalName={hospitalName}
          chargeBalance={chargeBalance}
          />
        </div>

      </div>
    </header>
  );
});

export default Header;
