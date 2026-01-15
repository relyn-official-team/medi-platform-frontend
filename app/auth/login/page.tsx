"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Image from "next/image";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

// 백엔드: return res.json({ token, role: user.role });
interface LoginResponse {
  token: string;
  role: "HOSPITAL" | "AGENCY" | "ADMIN";
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);

      const res = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      const { role } = res.data;
      // ✅ JWT는 서버에서 httpOnly 쿠키로 자동 저장됨 → 프론트에서 저장 불필요
      //    여기서는 role 기반 라우팅만 처리하면 됨

      // TODO: 로그인 성공 후 FCM 토큰 발급 및 등록
// 🔔 FCM 토큰 발급 & 서버 등록 (실패해도 로그인 영향 없음)
 try {
        // iOS/Safari 등에서 Notification/권한이 제한적이어도
        // 로그인 라우팅은 반드시 진행해야 하므로 handleSubmit을 종료(return)하지 않는다.
        if (!("Notification" in window)) {
          // skip push registration
        } else {

          let permission = Notification.permission;
          if (permission === "default") {
            permission = await Notification.requestPermission();
          }
          if (permission !== "granted") {
            // skip
          } else if (!messaging) {
            // skip
          } else {

            const fcmToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });
            if (fcmToken) {
              const platform: "web" | "android" | "ios" =
                /iphone|ipad|ipod/i.test(navigator.userAgent)
                  ? "ios"
                  : /android/i.test(navigator.userAgent)
                  ? "android"
                  : "web";

              await api.post("/push/subscribe", {
                fcmToken,
                platform,
              });
            }
          }
        }
 } catch (e) {
   console.warn("FCM token registration skipped:", e);
 }

      // 역할별 라우팅
      if (role === "HOSPITAL") {
        router.replace("/auth/hospital/dashboard");
      } else if (role === "AGENCY") {
        router.replace("/auth/agency/dashboard");
      } else if (role === "ADMIN") {
        router.replace("/auth/admin/charge-requests");
      } else {
        // 알 수 없는 역할일 경우 로그인 페이지 유지
        setError("지원하지 않는 역할입니다.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
<div className="w-full max-w-md bg-white rounded-lg shadow overflow-hidden">
  {/* 로고 */}
{/* Card Header */}
<div className="flex items-center justify-center h-24">
  <Image
    src="/relyn_logo.png"
    alt="RELYN"
    width={1020}
    height={500}
    className="max-h-20 w-auto object-contain"
    priority
  />
</div>
<form
  onSubmit={handleSubmit}
  className="px-8 pb-8"
>
    <div className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-900">
          ※ 회원가입은 담당자와 소통을 진행해주세요. </div>
        
        </div>
      </form>
      </div>
    </div>
  );
}
