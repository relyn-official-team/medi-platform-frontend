// app/auth/hospital/chat/page.tsx
 import { Suspense } from "react";
 import ChatThreadPage from "@/components/chat/ChatThreadPage";

export default function HospitalChatPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-gray-400">로딩중...</div>}>
      <ChatThreadPage basePath="/auth/hospital/chat" />
    </Suspense>
  );
}
