"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface MeResponse {
  pushEnabled: boolean;
}

export default function NotificationSettings() {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 api.get<MeResponse>("/me").then(res => {
   setEnabled(res.data.pushEnabled);
   setLoading(false);
 });
  }, []);

  const toggle = async () => {
    const next = !enabled;
    setEnabled(next);
    await api.patch("/me/notification", { pushEnabled: next });
  };

  if (loading) return null;

  return (
    <div className="space-y-6">
      {/* 토글 */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <p className="font-medium">푸시 알림 받기</p>
          <p className="text-sm text-gray-500">
            예약 및 채팅 알림을 받습니다
          </p>
        </div>
        <button
          onClick={toggle}
          className={`w-12 h-6 rounded-full transition ${
            enabled ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`block w-5 h-5 bg-white rounded-full translate-y-0.5 transition ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Safari 안내 */}
      <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <p className="font-semibold mb-1">📌 Safari 사용 시 주의</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>iOS: 설정 → Safari → 알림 → 허용 필요</li>
          <li>macOS: Safari → 설정 → 웹사이트 → 알림</li>
          <li>사설모드에서는 푸시 수신 불가</li>
        </ul>
      </div>
    </div>
  );
}
