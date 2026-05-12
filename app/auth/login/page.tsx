"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Image from "next/image";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { Eye, EyeOff, Lock, User } from "lucide-react";

interface LoginResponse {
  token: string;
  role: "HOSPITAL" | "AGENCY" | "ADMIN";
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      try {
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

      if (role === "HOSPITAL") {
        router.replace("/auth/hospital/dashboard");
      } else if (role === "AGENCY") {
        router.replace("/auth/agency/dashboard");
      } else if (role === "ADMIN") {
        router.replace("/auth/admin/charge-requests");
      } else {
        setError("지원하지 않는 역할입니다.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("로그인에 실패했습니다. 계정명/비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f0f5ff]">
      {/* 배경 그라디언트 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(ellipse_at_20%_70%,rgba(14,165,233,0.12),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(2,6,23,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,6,23,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="w-full max-w-sm px-4">
        {/* 카드 */}
        <div className="rounded-2xl bg-white/90 shadow-[0_24px_80px_rgba(2,6,23,0.14)] ring-1 ring-white/60 backdrop-blur-sm overflow-hidden">

          {/* 상단 브랜드 영역 */}
          <div className="bg-[linear-gradient(135deg,#0b1220_0%,#1a2a5e_100%)] px-8 py-8 flex flex-col items-center gap-3">
            <Image
              src="/relyn_logo.png"
              alt="RELYN"
              width={110}
              height={32}
              className="h-8 w-auto brightness-0 invert"
              priority
            />
            <p className="text-[13px] text-blue-200 font-medium tracking-wide">
              병원·에이전시 운영 플랫폼
            </p>
          </div>

          {/* 폼 영역 */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-[13px] font-medium text-red-700">
                {error}
              </div>
            )}

            {/* 계정명 */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-gray-700">
                계정명
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 또는 계정명 입력"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-gray-700">
                비밀번호
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#0b1220] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(2,6,23,0.18)] transition-all hover:bg-[#0b1220]/90 hover:shadow-[0_12px_30px_rgba(2,6,23,0.22)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  로그인 중...
                </span>
              ) : (
                "로그인"
              )}
            </button>

            {/* 안내 */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-[12px] text-blue-700 leading-relaxed">
              ※ 회원가입은 담당자와 소통을 진행해주세요.
            </div>
          </form>
        </div>

        {/* 하단 저작권 */}
        <p className="mt-5 text-center text-[11px] text-gray-400">
          © {new Date().getFullYear()} RELYN. All rights reserved.
        </p>
      </div>
    </div>
  );
}
