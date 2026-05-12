"use client";

import Link from "next/link";
import Image from "next/image";
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
  ShieldCheck,
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
    { type: "link", label: "플랫폼통계", href: "/auth/admin/platform-statistics", icon: BarChart3 },
    { type: "link", label: "충전관리", href: "/auth/admin/charge-requests", icon: Wallet2 },
    { type: "link", label: "에이전시 정산요청", href: "/auth/admin/payouts", icon: Wallet2 },
    { type: "link", label: "예약관리", href: "/auth/admin/reservations", icon: CalendarClock },
    { type: "link", label: "회계정리", href: "/auth/admin/accounting", icon: Receipt },
    { type: "action", label: "로그아웃", onClick: logout, icon: LogOut },
  ];

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
          <div className="flex items-center gap-2">
            <Image
              src="/relyn_logo.png"
              alt="RELYN"
              width={80}
              height={22}
              className="h-5 w-auto brightness-0 invert opacity-90"
              priority
            />
            <span className="rounded-md bg-blue-600/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-400 tracking-wide">
              ADMIN
            </span>
          </div>
        )}
        {collapsed && (
          <ShieldCheck className="h-5 w-5 text-blue-400" />
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

          if (item.type === "link") {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");

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
                {active && !collapsed && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-blue-200" />
                )}
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    active ? "text-white" : "text-white/50 group-hover:text-white"
                  )}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white"
              onClick={() => {
                item.onClick();
                onClose?.();
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
