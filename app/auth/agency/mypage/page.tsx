"use client";

import Link from "next/link";
import MobileHeader from "@/components/agency/MobileHeader";
import api from "@/lib/api";
import {
  User,
  BarChart3,
  Wallet,
  KeyRound,
  Bell,
  ChevronRight,
  LogOut,
  Building2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface MeResponse {
  role: string;
  agency?: { id: string; name: string };
}

const menuSections = [
  {
    title: "계정 관리",
    items: [
      {
        href: "/auth/agency/mypage/profile",
        icon: User,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        label: "개인정보 설정",
        desc: "이름, 연락처 등 정보 수정",
      },
      {
        href: "/auth/agency/mypage/password",
        icon: KeyRound,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        label: "비밀번호 변경",
        desc: "로그인 비밀번호 재설정",
      },
    ],
  },
  {
    title: "정산 및 통계",
    items: [
      {
        href: "/auth/agency/mypage/statistics",
        icon: BarChart3,
        iconBg: "bg-indigo-50",
        iconColor: "text-indigo-600",
        label: "정산 및 예약 통계",
        desc: "수수료 내역·예약 추이 확인",
      },
      {
        href: "/auth/agency/mypage/payouts",
        icon: Wallet,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        label: "수수료 정산요청",
        desc: "미정산 수수료 출금 신청",
      },
    ],
  },
  {
    title: "알림",
    items: [
      {
        href: "/auth/agency/mypage/notifications",
        icon: Bell,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        label: "알림 기능 설정",
        desc: "예약·채팅 알림 관리",
      },
    ],
  },
];

export default function AgencyMyPage() {
  const [agencyName, setAgencyName] = useState<string>("-");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<MeResponse>("/me");
        if (res.data?.role === "AGENCY") {
          setAgencyName(res.data.agency?.name ?? "-");
        }
      } catch {}
    })();
  }, []);

  const logout = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (!ok) return;
    try {
      await api.post("/auth/logout");
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.replace("/auth/login");
  };

  return (
    <>
      <MobileHeader title="마이페이지" showBack={false} />
      <div className="h-12 md:hidden" />

      <div className="max-w-md mx-auto px-4 pb-28 md:pb-10">
        {/* 프로필 헤더 */}
        <div className="mt-5 mb-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
            <Building2 className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-medium uppercase tracking-wider text-blue-400">에이전시</div>
            <div className="mt-0.5 truncate text-[16px] font-bold text-gray-900">{agencyName}</div>
          </div>
        </div>

        {/* 메뉴 섹션들 */}
        <div className="space-y-5">
          {menuSections.map((section) => (
            <div key={section.title}>
              <div className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {section.title}
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                {section.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-gray-50 ${
                        idx < section.items.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                      >
                        <Icon className={`h-4.5 w-4.5 ${item.iconColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-semibold text-gray-900">{item.label}</div>
                        <div className="text-[12px] text-gray-400">{item.desc}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 로그아웃 — 모바일 전용 */}
        <button
          onClick={logout}
          className="md:hidden mt-6 w-full flex items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5 text-[14px] font-semibold text-red-600 transition-colors hover:bg-red-100 active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
      </div>
    </>
  );
}
