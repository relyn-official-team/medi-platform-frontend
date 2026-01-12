"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, ClipboardList, User } from "lucide-react";
import clsx from "clsx";

export default function MobileFooter() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around py-2 text-[11px]">

       <Link
          href="/auth/agency/dashboard"
          className={clsx(
            "flex flex-col items-center gap-1",
            isActive("/auth/agency/dashboard")
              ? "text-blue-600"
              : "text-gray-500"
          )}
        >
          <Home className="h-5 w-5" />
          메인메뉴
        </Link>

        <Link
          href="/auth/agency/chat"
          className={clsx("flex flex-col items-center gap-1",
          isActive("/auth/agency/chat")
              ? "text-blue-600"
              : "text-gray-500"
          )}
        >
          <MessageCircle className="h-5 w-5" />
          채팅
        </Link>

        <Link
          href="/auth/agency/reservations"
         className={clsx(
            "flex flex-col items-center gap-1",
            isActive("/auth/agency/reservations")
              ? "text-blue-600"
              : "text-gray-500"
          )}
        >
          <ClipboardList className="h-5 w-5" />
          예약내역
        </Link>

 <Link
   href="/auth/agency/mypage"
   className={clsx(
     "flex flex-col items-center gap-1",
     isActive("/auth/agency/mypage")
       ? "text-blue-600"
       : "text-gray-500"
   )}
 >
   <User className="h-5 w-5" />
   마이페이지
 </Link>

      </div>
    </footer>
  );
}
