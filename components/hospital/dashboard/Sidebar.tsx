// components/hospital/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarClock,
  Building2,
  BarChart3,
  Wallet2,
  Users2,
  PanelLeftOpen,
  PanelLeftClose,
  MessageCircle,
  LogOut,
} from "lucide-react";




const menu = [
  { label: "예약 현황", href: "/auth/hospital/dashboard", icon: LayoutDashboard },
  { label: "채팅", href: "/auth/hospital/chat", icon: MessageCircle },
  { label: "통계", href: "/auth/hospital/statistics", icon: BarChart3 },
  { label: "정산 내역", href: "/auth/hospital/settlements", icon: Wallet2 },
  { label: "병원 기본 정보", href: "/auth/hospital/settings", icon: Users2 },
  { label: "충전관리&사업자정보", href: "/auth/hospital/business", icon: Building2 },
];


export default function Sidebar({
  collapsed,
  setCollapsed,
  onClose,
}: { 
  collapsed?: boolean;
  setCollapsed?: (v: boolean) => void;
  onClose?: () => void;
}) {

    const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    onClose?.(); // 모바일 사이드바 닫기
    window.location.href = "/auth/login";
  };
  const pathname = usePathname();

  /** PC/모바일 동작 분리 */
  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      // 🔹 모바일: 접기 → 사이드바 닫기
      onClose?.();
    } else {
      // 🔹 PC: 접기버튼 → 접힘/펼침
      setCollapsed?.(!collapsed);
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >

      {/* 상단 헤더 영역 */}
      <div className="flex h-16 items-center justify-between px-3 border-b border-gray-200">

        {!collapsed && (
          <span className="text-base font-semibold text-gray-900 truncate">
            Hospital CRM
          </span>
        )}

        {/* 🔹 PC/모바일 공용 버튼 (모바일에서는 닫기, PC에서는 접기) */}
        <button
          type="button"
          aria-label="toggle sidebar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          onClick={handleToggle}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 메뉴 리스트 */}
      <nav className="flex-1 p-3 space-y-1 mt-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
              onClick={onClose} // 모바일에서 메뉴 클릭 시 자동 닫기
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      {/* ===== Logout (Mobile & PC) ===== */}
      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
         onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>로그아웃</span>}
        </button>
      </div>
    </div>
  );
}
