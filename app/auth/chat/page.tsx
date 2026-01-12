// frontend/app/auth/chat/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await api.get<{ role: "HOSPITAL" | "AGENCY" }>("/me");
      if (res.data.role === "HOSPITAL") {
        router.replace("/auth/hospital/chat");
      } else {
        router.replace("/auth/agency/chat");
      }
    })();
  }, []);

  return <div className="p-4 text-sm text-gray-400">이동중...</div>;
}
