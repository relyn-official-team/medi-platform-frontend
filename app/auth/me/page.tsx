"use client";

import { useEffect, useState } from "react";

export default function MePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      credentials: "include",   // 🔥 쿠키 인증 필수
    })
      .then((res) => res.json())
      .then(setProfile)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>내 정보</h2>
      <pre>{profile ? JSON.stringify(profile, null, 2) : "정보 없음"}</pre>
    </div>
  );
}
