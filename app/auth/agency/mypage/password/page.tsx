"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MobileHeader from "@/components/agency/MobileHeader";

export default function AgencyPasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      alert("변경 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.patch<{ message: string }>("/me/password", {
        currentPassword,
        newPassword,
        newPasswordConfirm,
      });

      alert(res.data.message ?? "비밀번호가 변경되었습니다.");
      router.push("/auth/agency/mypage");
    } catch (e: any) {
      alert(
        e?.response?.data?.message ??
          "비밀번호 변경에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MobileHeader title="비밀번호 변경" />
      <div className="h-12 md:hidden" />

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-500">현재 비밀번호</label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">변경 비밀번호</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">
            변경 비밀번호 재확인
          </label>
          <Input
            type="password"
            value={newPasswordConfirm}
            onChange={(e) =>
              setNewPasswordConfirm(e.target.value)
            }
          />
        </div>

        <Button
          onClick={submit}
          disabled={loading}
          className="w-full"
        >
          {loading ? "처리중..." : "비밀번호 변경"}
        </Button>
      </div>
    </>
  );
}
