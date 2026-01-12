 "use client";

 import api from "@/lib/api";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { useRef, useState } from "react";
 import { useEffect } from "react";

 interface Props {
   businessName?: string | null;
   businessNumber?: string | null
   businessAddress?: string | null;
   businessLicenseUrl?: string | null;
   onChange: (v: Partial<Props>) => void;
   onSaved: () => void;
 }

 export default function BusinessInfoSection({
   businessName,
   businessNumber,
   businessAddress,
   businessLicenseUrl,
   onChange,
   onSaved,
 }: Props) {
  const [saved, setSaved] = useState(false);
 const [uploadSuccess, setUploadSuccess] = useState(false);
 const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 const thumbnailSrc = previewUrl || businessLicenseUrl || null;
 const [uploadError, setUploadError] = useState<string | null>(null);
  useEffect(() => {
   return () => {
     if (previewUrl) {
       URL.revokeObjectURL(previewUrl);
     }
   };
  }, [previewUrl]);

const uploadLicense = async (file: File) => {
  try {
    setUploadSuccess(false);
    setUploadError(null);

    // 1️⃣ 파일 타입 검증 (jpg only)
    if (file.type !== "image/jpeg") {
      setUploadError("JPG 형식의 이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    // 2️⃣ 파일 용량 검증 (2MB 이하)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError("파일 용량은 2MB 이하만 업로드할 수 있습니다.");
      return;
    }


    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    const res = await api.post<{ uploadUrl: string; fileUrl: string }>(
      "/hospital/business/business-license/upload-url",
      null,
      { params: { ext: "jpg" } }
    );

    const putRes = await fetch(res.data.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!putRes.ok) {
      setUploadError("이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    const cacheBustedUrl = `${res.data.fileUrl}?v=${Date.now()}`;

await api.patch("/hospital/business-license", {
    businessLicenseUrl: cacheBustedUrl,
    });

    // 🔥 부모 state 즉시 반영 (보기 버튼 최신화)
    onChange({ businessLicenseUrl: res.data.fileUrl });

    setUploadSuccess(true);
    setUploadError(null);
    onSaved();
  } catch (e) {
    console.error("사업자등록증 업로드 실패:", e);
    setUploadError("알 수 없는 오류로 업로드에 실패했습니다.");
  }
};
   

   const saveBusinessInfo = async () => {
     await api.patch("/hospital/settings", {
       businessName,
       businessNumber,
       businessAddress,
     });
     setSaved(true);
     onSaved();
   };
   const fileRef = useRef<HTMLInputElement>(null);
   return (
     <section className="rounded-xl border bg-white p-4 space-y-3">
       <h2 className="font-semibold">사업자 정보</h2>

       <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const f = e.target.files?.[0];
          if (f) uploadLicense(f);
        }}
      />

      <Button
        type="button"
        variant="outline"
        onClick={() => fileRef.current?.click()}
      >
        사업자등록증 업로드
      </Button>
      {thumbnailSrc && (
  <div className="mt-3">
    <p className="text-xs text-gray-500 mb-1">미리보기</p>
    <img
      src={thumbnailSrc}
      alt="사업자등록증 미리보기"
      className="w-40 rounded border"
    />
  </div>
      )}


       {uploadSuccess && (
   <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-700">
     사업자등록증 업로드가 완료되었습니다.
     {businessLicenseUrl && (
       <a
         href={businessLicenseUrl}
         target="_blank"
         className="ml-2 text-blue-600 underline"
       >
         보기
       </a>
     )}
   </div>
 )}

 {uploadError && (
  <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
    {uploadError}
  </div>
)}

       <Input
        placeholder="사업자명"
         value={businessName ?? ""}
         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          (setSaved(false), onChange({ businessName: e.target.value }))
        }
       />

        <Input
          placeholder="사업자등록번호"
          value={businessNumber ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ businessNumber: e.target.value })
          }
        />

       <Input
         placeholder="사업자 주소"
         value={businessAddress ?? ""}
         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ businessAddress: e.target.value })
          }
       />

       <Button size="sm" onClick={saveBusinessInfo}>
         저장
       </Button>
       {saved && (
   <p className="text-sm text-blue-600">
     저장이 완료되었습니다.
   </p>
 )}
     </section>
   );
 }
