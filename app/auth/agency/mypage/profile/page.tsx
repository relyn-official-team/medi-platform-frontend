"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MobileHeader from "@/components/agency/MobileHeader";

type AgencyProfile = {
  name: string;
  phone: string | null;
  address: string | null;
  email: string | null;
  whatsapp: string | null;
  wechat: string | null;
  line: string | null;
  taxType: "GENERAL" | "WITHHOLDING_33";
  businessLicenseUrl: string | null;
  settlementBankName: string | null;
  settlementAccountNo: string | null;
  settlementAccountHolder: string | null;
};

type UploadBusinessLicenseResponse = {
  url: string;
};

export default function AgencyProfilePage() {
  const [data, setData] = useState<AgencyProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const uploadBusinessLicense = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
 const res = await api.post<UploadBusinessLicenseResponse>(
   "/agency/business-license",
   formData,
   { headers: { "Content-Type": "multipart/form-data" } }
 );

   // ✅ 서버 URL 기준으로 미리보기 교체
   setPreviewUrl(res.data.url);

      setData((prev) =>
        prev ? { ...prev, businessLicenseUrl: res.data.url } : prev
      );
    } catch (e) {
      alert("사업자등록증 업로드 실패");
    } finally {
      setUploading(false);
    }
  };


  useEffect(() => {
api.get<AgencyProfile>("/agency/me/profile").then((res) => {
  setData(res.data);
});
  }, []);

  if (!data) return null;

  const save = async () => {
    setSaving(true);
    try {
      await api.patch("/agency/me/profile", data);
      alert("저장되었습니다.");
    } catch {
      alert("저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <MobileHeader title="개인정보 설정" />
      <div className="h-12 md:hidden" />

      <div className="max-w-xl mx-auto px-6 py-6 space-y-6">
<div className="space-y-1">
  <label className="text-sm text-gray-500">에이전시명</label>
  <Input
    value={data.name}
    onChange={(e) => setData({ ...data, name: e.target.value })}
  />
</div>

<div className="space-y-1">
  <label className="text-sm text-gray-500">주소</label>
  <Input
    value={data.address ?? ""}
    onChange={(e) =>
      setData({ ...data, address: e.target.value })
    }
  />
</div>


<div className="space-y-1">
  <label className="text-sm text-gray-500">휴대폰 번호</label>
  <Input
    value={data.phone ?? ""}
    onChange={(e) => setData({ ...data, phone: e.target.value })}
  />
</div>


<div className="space-y-1">
  <label className="text-sm text-gray-500">이메일</label>
  <Input
    value={data.email ?? ""}
    onChange={(e) => setData({ ...data, email: e.target.value })}
  />
</div>


<div className="space-y-1">
  <label className="text-sm text-gray-500">WhatsApp</label>
  <Input
    value={data.whatsapp ?? ""}
    onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
  />
</div>


<div className="space-y-1">
  <label className="text-sm text-gray-500">WeChat</label>
  <Input
    value={data.wechat ?? ""}
    onChange={(e) => setData({ ...data, wechat: e.target.value })}
  />
</div>


<div className="space-y-1">
  <label className="text-sm text-gray-500">LINE</label>
  <Input
    value={data.line ?? ""}
    onChange={(e) => setData({ ...data, line: e.target.value })}
  />
</div>

<div className="space-y-2">
  <p className="text-sm font-medium">과세 유형</p>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      checked={data.taxType === "GENERAL"}
      onChange={() =>
        setData({ ...data, taxType: "GENERAL" })
      }
    />
    <span>일반과세</span>
  </label>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      checked={data.taxType === "WITHHOLDING_33"}
      onChange={() =>
        setData({ ...data, taxType: "WITHHOLDING_33" })
      }
    />
    <span>원천징수 3.3%</span>
  </label>

  {data.taxType === "WITHHOLDING_33" && (
    <p className="text-xs text-gray-500">
      원천징수 3.3%에 대한 세금 처리는 플랫폼에서 진행됩니다.
    </p>
  )}
</div>

{data.taxType === "GENERAL" && (
  <div className="space-y-2">
    <p className="text-sm font-medium">사업자등록증</p>

    {/* 미리보기 */}
    {(previewUrl || data.businessLicenseUrl) && (
      <img
        src={previewUrl ?? data.businessLicenseUrl ?? ""}
        alt="business-license"
        className="w-full max-w-xs rounded border"
      />
    )}

    {/* 업로드 */}
    <label className="inline-block">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

 const blobUrl = URL.createObjectURL(file);
 setPreviewUrl((prev) => {
   if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
   return blobUrl;
 });
          uploadBusinessLicense(file);
        }}
      />
      <span
        className={`
          inline-block px-4 py-2 rounded
          text-sm font-medium
          cursor-pointer
          ${uploading
            ? "bg-gray-300 text-gray-500"
            : "bg-gray-100 hover:bg-gray-200"}
        `}
      >
        {uploading ? "업로드 중..." : "이미지 업로드"}
      </span>
    </label>

    <p className="text-xs text-gray-500">
      JPG, PNG / 최대 3MB
    </p>
  </div>
)}


<div className="space-y-4">
  <p className="font-medium">정산 계좌 정보</p>

  <Input
    placeholder="은행명"
    value={data.settlementBankName ?? ""}
    onChange={(e) =>
      setData({ ...data, settlementBankName: e.target.value })
    }
  />

  <Input
    placeholder="계좌번호"
    value={data.settlementAccountNo ?? ""}
    onChange={(e) =>
      setData({ ...data, settlementAccountNo: e.target.value })
    }
  />

  <Input
    placeholder="예금주"
    value={data.settlementAccountHolder ?? ""}
    onChange={(e) =>
      setData({ ...data, settlementAccountHolder: e.target.value })
    }
  />
</div>

        <Button onClick={save} disabled={saving || uploading}>
          저장
        </Button>
      </div>
    </>
  );
}
