"use client";

import { forwardRef, useState, useEffect } from "react";
import { Menu, ChevronDown, Wallet, AlertTriangle } from "lucide-react";
import UserMenu from "@/components/hospital/layout/UserMenu";
import Link from "next/link";

function formatKoreanDate(date: Date) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dow = days[date.getDay()];
  return `${y}년 ${m}월 ${d}일 (${dow})`;
}

const Header = forwardRef<
  HTMLDivElement,
  {
    collapsed?: boolean;
    onSidebarOpen?: () => void;
    hospitalName: string;
    chargeBalance: number;
  }
>(({ collapsed, onSidebarOpen, hospitalName, chargeBalance }, ref) => {
  const [today, setToday] = useState("");
  const isLowBalance = chargeBalance < 50_000;

  useEffect(() => {
    setToday(formatKoreanDate(new Date()));
  }, []);

  return (
    <header
      ref={ref}
      style={{
        ["--sidebar-width" as any]: collapsed ? "4rem" : "16rem",
      }}
      className="
        fixed top-0 left-0 right-0
        lg:left-[var(--sidebar-width)]
        z-30 bg-white/95 backdrop-blur-sm
        border-b border-gray-100
        shadow-[0_1px_8px_rgba(2,6,23,0.06)]
        px-4 py-0 h-14 transition-all duration-300
      "
    >
      <div className="flex h-full items-center justify-between">
        {/* 모바일 - 햄버거 메뉴 */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100"
            onClick={onSidebarOpen}
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <div className="text-[14px] font-semibold text-gray-900 leading-tight">
              {hospitalName || "병원 대시보드"}
            </div>
            {today && (
              <div className="text-[11px] text-gray-400">{today}</div>
            )}
          </div>
        </div>

        {/* PC - 제목 영역 */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="text-[15px] font-semibold text-gray-900 leading-tight">
            {hospitalName || "병원 대시보드"}
          </div>
          {today && (
            <div className="text-[12px] text-gray-400">{today}</div>
          )}
        </div>

        {/* 우측 영역 */}
        <div className="flex items-center gap-3">
          {/* 잔액 배지 */}
          <Link
            href="/auth/hospital/business"
            className={`
              hidden sm:flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] font-semibold
              transition-all hover:opacity-80 border
              ${
                isLowBalance
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-green-50 border-green-200 text-green-700"
              }
            `}
          >
            {isLowBalance ? (
              <AlertTriangle className="h-3.5 w-3.5" />
            ) : (
              <Wallet className="h-3.5 w-3.5" />
            )}
            <span>{chargeBalance.toLocaleString()}원</span>
          </Link>

          <UserMenu hospitalName={hospitalName} chargeBalance={chargeBalance} />
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
