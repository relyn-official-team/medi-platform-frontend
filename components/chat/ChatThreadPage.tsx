"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import ChatThreadList from "@/components/chat/ChatThreadList";
import { ChatThreadItem } from "@/types/chat";
import ChatSearchModal from "@/components/chat/ChatSearchModal";
import { Search } from "lucide-react";

interface ChatThreadPageProps {
  basePath: string;
}

export default function ChatThreadPage({
  basePath,
}: ChatThreadPageProps) {
  const router = useRouter();
  const [threads, setThreads] = useState<ChatThreadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchParams = useSearchParams();
const isSearching = searchParams.get("search") === "1";

const isSearchingRef = useRef(isSearching);
useEffect(() => {
  isSearchingRef.current = isSearching;
}, [isSearching]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await api.get<ChatThreadItem[]>("/chat/threads");
        setThreads(res.data);
      } catch (e) {
        console.error("채팅 리스트 로드 실패", e);
      } finally {
        setLoading(false);
      }
    };

  // 검색 중이 아닐 때만 최초 로딩
   if (!isSearching) {
     fetchThreads();
   }

    // ✅ 실시간(간이): 리스트 폴링 (읽지 않은 메시지/최신 메시지 반영)
   let interval: number | undefined;
   if (!isSearching) {
     interval = window.setInterval(() => {
       if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
       fetchThreads();
     }, 5000);
   }

 const onFocus = () => {
  if (isSearchingRef.current) return;
   if (sessionStorage.getItem("chat:list:dirty")) {
     sessionStorage.removeItem("chat:list:dirty");
     fetchThreads();
   }
 };

 window.addEventListener("focus", onFocus);
 return () => {
   if (interval) window.clearInterval(interval);
   window.removeEventListener("focus", onFocus);
 };
  }, [isSearching]);

  if (loading) {
    return <div className="p-4 text-sm text-gray-400">로딩중...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
      {/* Header */}
      <ChatSearchModal
        open={searchOpen}
      onClose={() => setSearchOpen(false)}
           onResult={(items) => {
     router.replace(`${basePath}?search=1`);
     setThreads(items);
   }}
 onReset={async () => {
   router.replace(basePath); // search=1 제거
   try {
    const res = await api.get<ChatThreadItem[]>("/chat/threads");
     setThreads(res.data);
   } catch (e) {
     console.error("채팅 리스트 로드 실패", e);
   }
 }}
      />
  <div className="px-4 py-3 sticky top-0 bg-white z-10 flex items-center justify-between">
    <span className="font-semibold text-lg">채팅</span>
    <button
      onClick={() => setSearchOpen(true)}
      className="p-1 rounded hover:bg-gray-100"
      aria-label="채팅 검색"
    >
      <Search className="w-5 h-5 text-gray-600" />
    </button>
  </div>

      {/* List */}
      <ChatThreadList
        items={threads}
        onSelect={(reservationId) => {
    const url = `/auth/chat/${reservationId}`;

    // PC (md 이상) → 새 탭
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // 모바일 → 같은 탭
    router.push(url);
        }}
  />   
    </div>
  );
}
