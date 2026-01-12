"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users2,
  BarChart3,
  Building2,
  Wallet2,
  CalendarClock,
  Receipt,
  LogOut,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

type MenuItem =
  | { type: "link"; label: string; href: string; icon: any }
  | { type: "action"; label: string; onClick: () => void; icon: any };

export default function Sidebar({
  collapsed,
  setCollapsed,
  onClose,
}: {
  collapsed?: boolean;
  setCollapsed?: (v: boolean) => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const logout = async () => {
    try {
      const api = (await import("@/lib/api")).default;
      await api.post("/auth/logout");
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/auth/login";
  };

  const menu: MenuItem[] = [
    { type: "link", label: "계정관리", href: "/auth/admin/accounts", icon: Users2 },
    { type: "link", label: "통계", href: "/auth/admin/agency-statistics", icon: BarChart3 },
    { type: "link", label: "플랫폼통계", href: "/auth/admin/platform-statistics", icon: BarChart3  },
    { type: "link", label: "충전관리", href: "/auth/admin/charge-requests", icon: Wallet2 },
    { type: "link", label: "에이전시 정산요청", href: "/auth/admin/payouts", icon: Wallet2 },
    { type: "link", label: "예약관리", href: "/auth/admin/reservations", icon: CalendarClock },
    { type: "link", label: "회계정리", href: "/auth/admin/accounting", icon: Receipt },
    { type: "action", label: "로그아웃", onClick: logout, icon: LogOut },
  ];

  /** PC/모바일 동작 분리 */
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
        "relative flex h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* 상단 헤더 영역 */}
      <div className="flex h-16 items-center justify-between px-3 border-b border-gray-200">
        {!collapsed && (
          <span className="text-base font-semibold text-gray-900 truncate">
            Admin
          </span>
        )}

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

          if (item.type === "link") {
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
                onClick={onClose}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              type="button"
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
              onClick={() => {
                item.onClick();
                onClose?.();
              }}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
