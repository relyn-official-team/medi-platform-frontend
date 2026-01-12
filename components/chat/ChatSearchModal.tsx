"use client";

import { useState } from "react";
import api from "@/lib/api";
import { ChatThreadItem } from "@/types/chat";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onResult: (items: ChatThreadItem[]) => void;
  onReset?: () => void;
}

export default function ChatSearchModal({
  open,
  onClose,
  onResult,
  onReset,
}: Props) {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSearch = async () => {
    try {
      setLoading(true);

      const res = await api.get<any[]>(
        "/chat/threads/search",
        {
          params: {
            keyword: keyword || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
          },
        }
      );

 onResult(
   res.data.map((row) => ({
     threadId: row.id,
     reservationId: row.reservationId,
     title:
       row.reservation?.patientName
         ? row.reservation.patientName
         : "상담 채팅",
     reservationStatus:
       row.reservation?.status ?? "PRE_CHAT",
     reservationDate:
       row.reservation?.reservationDate ?? null,
     counterpartName:
       row.reservation?.hospital?.name ??
       row.reservation?.agency?.name ??
       "-",
     counterpartType:
       row.reservation?.hospital
         ? "HOSPITAL"
         : "AGENCY",
     lastMessageAt: row.lastMessageAt ?? null,
     lastMessagePreview: row.lastMessagePreview ?? "",
     unreadCount:
       row.unreadByAgency ??
       row.unreadByHospital ??
       0,
   }))
 );
      onClose();
    } catch (e) {
      console.error("채팅 검색 실패", e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setKeyword("");
    setStartDate("");
    setEndDate("");
    onReset?.();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold text-sm">채팅 검색</span>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Keyword */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              키워드 (환자명 / 병원명 / 에이전시명)
            </label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어 입력"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Date Range */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">
                시작일
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">
                종료일
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>
 <p className="text-xs text-gray-400 mt-1">
   ※ 예약 생성일 기준으로 검색됩니다.
 </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between px-4 py-3 border-t bg-gray-50">
          <button
            onClick={handleReset}
            className="text-sm text-gray-500"
          >
            초기화
          </button>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white disabled:opacity-50"
          >
            {loading ? "검색중..." : "검색"}
          </button>
        </div>
      </div>
    </div>
  );
}
