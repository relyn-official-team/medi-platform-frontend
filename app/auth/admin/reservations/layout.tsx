"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "관리자 정산 관리",
      href: "/auth/admin/reservations/settlements",
    },
    {
      label: "예약카드 보기",
      href: "/auth/admin/reservations/cards",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">예약 관리</h1>

      <div className="flex gap-4 border-b">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`pb-2 text-sm ${
                active
                  ? "border-b-2 border-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
