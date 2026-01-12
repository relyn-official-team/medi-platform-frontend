"use client";

import Link from "next/link";
import MobileHeader from "@/components/agency/MobileHeader";
import api from "@/lib/api";
import { User, BarChart3 } from "lucide-react";
import { Wallet } from "lucide-react";
import { KeyRound } from "lucide-react";

export default function AgencyMyPage() {
  const logout = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (!ok) return;

    try {
      await api.post("/auth/logout");
    } catch (e) {
      // 로그아웃 API 실패해도 강제 로그아웃 진행
      console.error("logout api failed", e);
    }

    // legacy 대응 (남아있을 수 있는 값만 제거)
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // App Router 환경에서도 확실한 세션 리셋
    window.location.replace("/auth/login");
  };

  return (
    <>
      <MobileHeader title="마이페이지" showBack={false} />
      <div className="h-12 md:hidden" />

      <div className="max-w-md mx-auto px-6 py-6 space-y-4">
        <Link
          href="/auth/agency/mypage/profile"
          className="
            flex items-center gap-3
            p-4 bg-white rounded-xl
            shadow-sm border
            hover:shadow-md hover:bg-gray-50
            transition
          "
        >
          <User className="w-5 h-5 text-gray-600" />
          <span className="font-medium">개인정보 설정</span>
        </Link>

        <Link
          href="/auth/agency/mypage/statistics"
          className="
            flex items-center gap-3
            p-4 bg-white rounded-xl
            shadow-sm border
            hover:shadow-md hover:bg-gray-50
            transition
          "
        >
          <BarChart3 className="w-5 h-5 text-gray-600" />
          <span className="font-medium">정산 및 예약 통계</span>
        </Link>

<Link
  href="/auth/agency/mypage/payouts"
  className="
    flex items-center gap-3
    p-4 bg-white rounded-xl
    shadow-sm border
    hover:shadow-md hover:bg-gray-50
    transition
  "
>
  <Wallet className="w-5 h-5 text-gray-600" />
  <span className="font-medium">수수료 정산요청</span>
</Link>

 <Link
   href="/auth/agency/mypage/password"
   className="
     flex items-center gap-3
     p-4 bg-white rounded-xl
    shadow-sm border
     hover:shadow-md hover:bg-gray-50
     transition
   "
 >
   <KeyRound className="w-5 h-5 text-gray-600" />
   <span className="font-medium">비밀번호 변경</span>
 </Link>


        <button
          disabled
          className="
            flex items-center gap-3
            w-full p-4
            bg-gray-100 rounded-xl
            text-gray-400 cursor-not-allowed
          "
        >
          고객센터 (준비중)
        </button>

        {/* Mobile only */}
        <button
          onClick={logout}
          className="
            md:hidden
            w-full p-4
            text-center
            rounded-xl
            bg-red-500
            text-white font-bold
            shadow-md
            hover:bg-red-600
            active:scale-[0.98]
            transition
          "
        >
          로그아웃
        </button>
      </div>
    </>
  );
}
