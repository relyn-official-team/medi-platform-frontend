"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, ClipboardList, User } from "lucide-react";
import clsx from "clsx";

const tabs = [
  { href: "/auth/agency/dashboard", icon: Home, label: "메인메뉴" },
  { href: "/auth/agency/chat", icon: MessageCircle, label: "채팅" },
  { href: "/auth/agency/reservations", icon: ClipboardList, label: "예약내역" },
  { href: "/auth/agency/mypage", icon: User, label: "마이페이지" },
];

export default function MobileFooter() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-[0_-1px_12px_rgba(2,6,23,0.07)] md:hidden">
      <div className="flex justify-around items-center px-2 pt-1.5 pb-3">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex flex-col items-center gap-0.5 min-w-[56px]",
                active ? "text-blue-600" : "text-gray-400"
              )}
            >
              <div
                className={clsx(
                  "flex items-center justify-center w-11 h-7 rounded-xl transition-all duration-200",
                  active ? "bg-blue-50" : ""
                )}
              >
                <Icon className={clsx("h-5 w-5 transition-transform duration-200", active && "scale-110")} />
              </div>
              <span className={clsx("text-[10px] font-medium tracking-tight", active ? "text-blue-600" : "text-gray-400")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
