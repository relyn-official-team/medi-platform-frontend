// components/hospital/layout/UserMenu.tsx
"use client";

import { FC, useState, useRef, useEffect } from "react";
import { LogOut, ChevronDown, Building2 } from "lucide-react";

interface Props {
  hospitalName: string;
  chargeBalance: number;
}

const UserMenu: FC<Props> = ({ hospitalName, chargeBalance }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = async () => {
    const api = (await import("@/lib/api")).default;
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/auth/login";
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50">
          <Building2 className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <span className="max-w-[120px] truncate text-[13px]">{hospitalName || "병원"}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_12px_40px_rgba(2,6,23,0.12)] z-50">
          {/* 병원 정보 */}
          <div className="border-b border-gray-100 px-4 py-3">
            <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">병원</div>
            <div className="mt-0.5 text-[13px] font-semibold text-gray-900 truncate">{hospitalName}</div>
          </div>

          {/* 로그아웃 */}
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
  );
};

export default UserMenu;
