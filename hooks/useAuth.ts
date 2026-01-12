"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export interface MeResponseUser {
  id: string;
  email: string;
  role: "HOSPITAL" | "AGENCY";
  hospitalId?: string | null;
  agencyId?: string | null;
}

interface MeResponse {
  user: MeResponseUser;
}

/**
 * 현재 로그인된 사용자 정보를 /auth/me 에서 읽어오는 공통 훅
 * - user: 로그인 사용자 정보 (없으면 null)
 * - loading: 최초 로딩 상태
 * - setUser: 로그인 / 로그아웃 후 수동 갱신용
 * - reload: 서버에서 다시 /auth/me 호출
 */
export default function useAuth() {
  const [user, setUser] = useState<MeResponseUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const res = await api.get<MeResponse>("/auth/me");
      setUser(res.data.user);
    } catch (e) {
      // 토큰 없거나 만료된 경우
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return { user, setUser, loading, reload: loadUser };
}
