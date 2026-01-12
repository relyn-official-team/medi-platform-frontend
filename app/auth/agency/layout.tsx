"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import MobileFooter from "@/components/agency/MobileFooter";
import Image from "next/image";

interface MeResponse {
  role: string;
  agency?: { id: string; name: string };
}

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [agencyName, setAgencyName] = useState<string>("-");
  const pathname = usePathname();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/auth/login";
  };


  // 모바일 푸터는 리스트 / 예약 목록에서만
  const showMobileFooter =
  pathname === "/auth/agency/dashboard" ||
  pathname === "/auth/agency/hospitalslist" ||
  pathname === "/auth/agency/mypage" ||
  pathname === "/auth/agency/mypage/profile" ||
  pathname === "/auth/agency/mypage/statistics" ||
  pathname === "/auth/agency/reservations" ||
  pathname === "/auth/agency/chat";

  // ✅ 이 두 페이지는 "헤더 바로 아래에 필터바가 붙어야" 하므로 main 상단 패딩 제거
  const isStickyPages =
    pathname === "/auth/agency/hospitalslist" ||
    pathname === "/auth/agency/reservations";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= PC Header ================= */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 hidden md:block">
<div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
  {/* LEFT : 메뉴 */}
 <div className="flex items-center gap-8">
   {/* 로고 */}
   <Link href="/auth/agency/dashboard" className="flex items-center gap-2">
     <Image
       src="/relyn_logo.png"
       alt="RELYN"
       width={88}
       height={24}
       priority
     />
   </Link>
  <nav className="flex items-center gap-6 text-sm">
    <Link
      href="/auth/agency/dashboard"
      className={clsx(
        "hover:text-black",
        pathname.startsWith("/auth/agency/dashboard")
          ? "text-blue-600 font-medium"
          : "text-gray-700"
      )}
    >
      메인메뉴
    </Link>

    <Link
      href="/auth/agency/chat"
      className={clsx(
        "hover:text-black",
        pathname.startsWith("/auth/agency/chat")
          ? "text-blue-600 font-medium"
          : "text-gray-700"
      )}
    >
      채팅
    </Link>

    <Link
      href="/auth/agency/reservations"
      className={clsx(
        "hover:text-black",
        pathname.startsWith("/auth/agency/reservations")
          ? "text-blue-600 font-medium"
          : "text-gray-700"
      )}
    >
      예약내역
    </Link>

    <Link
      href="/auth/agency/mypage"
      className={clsx(
        "hover:text-black",
        pathname.startsWith("/auth/agency/mypage")
          ? "text-blue-600 font-medium"
          : "text-gray-700"
      )}
    >
      마이페이지
    </Link>
  </nav>
  </div>

  {/* RIGHT : 에이전시 정보 */}
  <div className="flex items-center gap-3 text-sm">
    <span className="font-medium text-gray-700">
      {agencyName}
    </span>

    <button
      onClick={logout}
      className="px-3 py-1 rounded-md border text-gray-600 hover:bg-gray-100"
    >
      로그아웃
    </button>
  </div>
</div>

      </header>

      {/* ================= Main ================= */}
      <main
        className={clsx(
"mx-auto max-w-6xl px-4 pb-6 pt-0 md:pt-0"
        )}
      >
        {children}
      </main>

      {/* ================= Mobile Footer ================= */}
      {showMobileFooter && <MobileFooter />}
    </div>
  );
}
