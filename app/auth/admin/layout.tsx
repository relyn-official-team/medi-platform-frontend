"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Sidebar from "@/components/admin/dashboard/Sidebar";
import { Menu } from "lucide-react";

interface MeResponse {
  role: "ADMIN" | "HOSPITAL" | "AGENCY";
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        // JWT 쿠키 기반으로 인증
        const res = await api.get<MeResponse>("/auth/me");
        if (res.data.role !== "ADMIN") {
          router.replace("/auth/login");
          return;
        }
        setVerified(true);
      } catch (err) {
        router.replace("/auth/login");
      }
    }
    verify();
  }, [router]);

  if (!verified) return null; // 인증 전에는 화면 렌더링 안 함


  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* 모바일 Dimmed */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-40
          bg-white border-r border-gray-200
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* 메인 */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* 상단 바 */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center gap-3 px-4">
          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="open sidebar"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="text-base font-semibold text-gray-900">관리자</div>
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
