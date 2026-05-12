"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import MobileFooter from "@/components/agency/MobileFooter";
import Image from "next/image";
import { LogOut, ChevronDown } from "lucide-react";

interface MeResponse {
  role: string;
  agency?: { id: string; name: string };
}

const navItems = [
  { label: "메인메뉴", href: "/auth/agency/dashboard" },
  { label: "채팅", href: "/auth/agency/chat" },
  { label: "예약내역", href: "/auth/agency/reservations" },
  { label: "마이페이지", href: "/auth/agency/mypage" },
];

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [agencyName, setAgencyName] = useState<string>("-");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/auth/login";
  };

  const showMobileFooter =
    pathname === "/auth/agency/dashboard" ||
    pathname === "/auth/agency/hospitalslist" ||
    pathname === "/auth/agency/mypage" ||
    pathname === "/auth/agency/mypage/profile" ||
    pathname === "/auth/agency/mypage/statistics" ||
    pathname === "/auth/agency/reservations" ||
    pathname === "/auth/agency/chat";

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<MeResponse>("/me");
        if (res.data?.role === "AGENCY") {
          setAgencyName(res.data.agency?.name ?? "-");
        }
      } catch (e) {
        console.error("Failed to load me", e);
      }
    })();
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = () => setUserMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [userMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PC 헤더 */}
      <header className="sticky top-0 z-30 hidden border-b border-gray-100 bg-white/95 backdrop-blur-sm shadow-[0_1px_8px_rgba(2,6,23,0.06)] md:block">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            {/* 좌측: 로고 + 내비 */}
            <div className="flex items-center gap-8">
              <Link href="/auth/agency/dashboard" className="flex items-center">
                <Image
                  src="/relyn_logo.png"
                  alt="RELYN"
                  width={88}
                  height={24}
                  priority
                />
              </Link>

              <nav className="flex items-center gap-1">
                {navItems.map(({ label, href }) => {
                  const active = pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={clsx(
                        "relative rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      {label}
                      {active && (
                        <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-blue-500" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* 우측: 유저 메뉴 */}
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-50">
                  <span className="text-[10px] font-bold text-sky-600">A</span>
                </div>
                <span className="max-w-[120px] truncate">{agencyName}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_12px_40px_rgba(2,6,23,0.12)] z-50 animate-fade-in-scale">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">에이전시</div>
                    <div className="mt-0.5 text-[13px] font-semibold text-gray-900 truncate">{agencyName}</div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4 text-gray-400" />
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-6xl px-4 pb-6 pt-0 md:pt-0">
        {children}
      </main>

      {/* 모바일 푸터 */}
      {showMobileFooter && <MobileFooter />}
    </div>
  );
}
