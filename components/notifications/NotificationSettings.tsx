"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

interface MeResponse {
  pushEnabled: boolean;
}

export default function NotificationSettings() {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  // 🔔 iOS 알림 ON (사용자 클릭 전용)
  const enableIOSNotification = async () => {
    // iOS Safari / WebApp 정책상 반드시 클릭 이벤트 내부
    if (!("Notification" in window)) {
      alert("이 기기는 알림을 지원하지 않습니다.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("알림이 허용되지 않았습니다.");
      return;
    }

    if (!messaging) {
      alert("메시징 초기화 실패");
      return;
    }

    const fcmToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

   if (!fcmToken) {
      alert("알림 토큰 발급 실패");
      return;
    }

    await api.post("/push/subscribe", {
      fcmToken,
      platform: "ios",
    });

    await api.patch("/me/notification", {
      pushEnabled: true,
    });

    setEnabled(true);
    alert("iOS 알림이 활성화되었습니다.");
  };

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

      {/* iOS 알림 ON 버튼 */}
      <button
        onClick={enableIOSNotification}
        className="w-full rounded-lg border border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
      >
        iOS(아이폰) 알림 ON
      </button>

      {/* Safari 안내 */}
      <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <p className="font-semibold mb-1">📌 Safari 사용 시 주의</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>iOS: Safari 접속 → 페이지 홈 추가 → 홈 추가한 앱으로 실행 → iOS(아이폰) 알림 ON 버튼 클릭 → 허용 필요</li>
          <li>macOS: Safari 접속 → 페이지 홈 추가 → 홈 추가한 앱으로 실행 → iOS(아이폰) 알림 ON 버튼 클릭 → 허용 필요</li>
          <li>iOS는 크롬, 카카오앱 등 다른 브라우저에서는 푸시 수신 불가</li>
        </ul>
      </div>
    </div>
  );
}
