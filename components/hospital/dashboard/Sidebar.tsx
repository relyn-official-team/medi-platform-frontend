// components/hospital/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarClock,
  Building2,
  BarChart3,
  Wallet2,
  Bell,
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
  { label: "알림 기능 설정", href: "/auth/hospital/notifications", icon: Bell },
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
    onClose?.();
    window.location.href = "/auth/login";
  };

  const pathname = usePathname();

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onClose?.();
    } else {
      setCollapsed?.(!collapsed);
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col bg-[#0b1220] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* 상단 로고 영역 */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-white/10",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}
      >
        {!collapsed && (
          <Image
            src="/relyn_logo.png"
            alt="RELYN"
            width={90}
            height={26}
            className="h-6 w-auto brightness-0 invert opacity-90"
            priority
          />
        )}

        <button
          type="button"
          aria-label="toggle sidebar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          onClick={handleToggle}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* 메뉴 리스트 */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2 pt-3">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.4)]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
            >
              {/* 활성 상태 왼쪽 액센트 바 */}
              {active && !collapsed && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-blue-200" />
              )}

              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-transform duration-150",
                  active ? "text-white" : "text-white/50 group-hover:text-white",
                  collapsed && "group-hover:scale-110"
                )}
              />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 로그아웃 */}
      <div className="border-t border-white/10 p-2 pb-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white"
          title={collapsed ? "로그아웃" : undefined}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span>로그아웃</span>}
        </button>
      </div>
    </div>
  );
}
