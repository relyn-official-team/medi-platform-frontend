// app/auth/hospital/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/hospital/dashboard/Sidebar";
import Header from "@/components/hospital/dashboard/Header";
import { useRef, useEffect } from "react";
import api from "@/lib/api";

interface HospitalSettingsSummary {
  name: string;
  chargeBalance: number;
}

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // ▼ 위 두 줄(state) 바로 아래에 삽입
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [hospitalName, setHospitalName] = useState<string>("-");
  const [chargeBalance, setChargeBalance] = useState<number>(0);

  const loadHospitalSummary = async () => {
   try {
     const res = await api.get<HospitalSettingsSummary>("/hospital/settings");
   setHospitalName(res.data.name);
   setChargeBalance(res.data.chargeBalance);
   } catch (e) {
     console.error("Failed to load hospital summary", e);
   }
 };

  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new ResizeObserver(() => {
      setHeaderHeight(headerRef.current?.offsetHeight || 0);
    });

    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

useEffect(() => {
   loadHospitalSummary();
 }, []);

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

        {/* 공통 헤더 */}
        <Header
          ref={headerRef}
          collapsed={collapsed}
          onSidebarOpen={() => setSidebarOpen(true)}
          hospitalName={hospitalName}
          chargeBalance={chargeBalance}
        />

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto" style={{ paddingTop: headerHeight }}>
          {children}
        </div>
      </main>
    </div>
  );
  
}
