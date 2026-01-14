"use client";

import { useEffect, useRef } from "react";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import api from "@/lib/api";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializedRef = useRef(false);

  useEffect(() => {
    // 중복 실행 방지 (React StrictMode / route change 대응)
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initFCM = async () => {
      // 1️⃣ 브라우저 + FCM 지원 여부 체크
      const supported = await isSupported();
      if (!supported) return;

      // 2️⃣ Notification API 존재 여부
      if (typeof Notification === "undefined") return;

      // 3️⃣ 권한 상태 확인
      let permission = Notification.permission;

      if (permission === "default") {
        permission = await Notification.requestPermission();
      }

      if (permission !== "granted") {
        // 사용자가 거부한 경우 → 조용히 종료
        return;
      }

      // 4️⃣ FCM 토큰 발급
      if (!messaging) return;

       const token = await getToken(messaging, {
   vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
 });

      if (!token) return;

      // 5️⃣ 서버에 토큰 등록 (중복 허용 → 서버에서 unique 처리)
      await api.post("/push/subscribe", {
        fcmToken: token,
      });
    };

    initFCM().catch(err => {
      console.error("FCM init failed:", err);
    });
  }, []);

  return <>{children}</>;
}
