// app/auth/agency/chat/page.tsx
"use client";
 import { Suspense } from "react";
 import ChatThreadPage from "@/components/chat/ChatThreadPage";

export default function AgencyChatPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-gray-400">로딩중...</div>}>
      <ChatThreadPage basePath="/auth/agency/chat" />
    </Suspense>
  );
}
