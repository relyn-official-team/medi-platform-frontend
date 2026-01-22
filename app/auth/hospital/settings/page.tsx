// frontend\app\auth\hospital\settings\page.tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KR_CITIES, KR_DISTRICTS } from "@/lib/kr-location";
import HospitalSpecialtiesSection from "./components/HospitalSpecialtiesSection";
import HospitalPricingSection from "./components/HospitalPricingSection";
import HospitalIntroductionSection from "./components/HospitalIntroductionSection";
import HospitalInteriorImagesSection from "./components/HospitalInteriorImagesSection";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";


type PresignedUploadResponse = {
  uploadUrl: string;
  fileUrl: string;
};


interface HospitalSettings {
  id: string;
  name: string;
  country?: string | null;
  address?: string | null;
  phone?: string | null;
  hotlinePhone?: string | null;
  consultLanguages?: string[];
  email?: string | null;
  introduction?: string | null;

  businessName?: string | null;
  businessAddress?: string | null;
  businessLicenseUrl?: string | null;
  refundBankName?: string | null;
  refundAccountNumber?: string | null;
  refundAccountHolder?: string | null;

  location?: {
    city: string | null;
    district: string | null;
  } | null;

 businessHours?: {
   [key: string]: {
     open: string;
     close: string;
     enabled: boolean;
   };
 };

  settlementCalcType: "PERCENTAGE" | "PER_RESERVATION";
  settlementFlatAmount: number;
  platformCommissionRate: number;
  platformFlatAmount: number;
  agencyCommissionRate: number;
  chargeBalance: number;

  specialties?: {
   specialty: {
     id: string;
     name: string;
   };
 }[];

 pricingItems?: {
  id: number;
  procedureName: string;
  originalPrice: number;
  discountPrice: number;
}[];

images?: {
  id: string;
  url: string;
  isCover?: boolean;
}[];

 hasSpecialist?: boolean;
 canSelectDirector?: boolean;
 afterCare?: string | null;
 signatureCares?: {
   title: string;
   description: string;
 }[];

}

export default function HospitalSettingsPage() {
  const [profile, setProfile] = useState<HospitalSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [customLanguagesInput, setCustomLanguagesInput] = useState("");

  const [passwordOpen, setPasswordOpen] = useState(false);
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

  const [doctorOptions, setDoctorOptions] = useState({
  hasSpecialist: false,
  canSelectDirector: false,
});

const [afterCare, setAfterCare] = useState("");
const [signatureCare, setSignatureCare] = useState<
  {
    title: string;
    description: string;
    images: {
     file?: File;      // 업로드 전
     url?: string;     // 업로드 완료 후
   }[];
  }[]
>([]);
const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

const handleSignatureImageUpload = async (
  idx: number,
  files: FileList | null
) => {
  if (!files) return;

 const MAX_SIZE = 3 * 1024 * 1024; // 3MB
 const MAX_COUNT = 3;
 const currentCount = signatureCare[idx].images.length;
 const remain = MAX_COUNT - currentCount;
 if (remain <= 0) {
   alert("시그니처 케어 이미지는 최대 3장까지 업로드할 수 있습니다.");
   return;
 }


 for (const file of Array.from(files).slice(0, remain)) {
     if (file.size > MAX_SIZE) {
     alert("이미지 파일은 3MB 이하만 업로드 가능합니다.");
     continue;
   }
   const url = await uploadSignatureImage(file);

   setSignatureCare((prev) => {
     const copy = [...prev];
     copy[idx] = {
       ...copy[idx],
       images: [...copy[idx].images, { url }],
     };
     return copy;
   });
 }
};

const removeSignatureCare = (idx: number) => {
  setSignatureCare((prev) => prev.filter((_, i) => i !== idx));
};

const removeSignatureImage = (careIdx: number, imageIdx: number) => {
   setSignatureCare((prev) => {
     const copy = [...prev];
     copy[careIdx] = {
       ...copy[careIdx],
       images: copy[careIdx].images.filter((_, i) => i !== imageIdx),
     };
     return copy;
   });
 };

const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

const openImagePreview = (url: string) => {
   setPreviewImageUrl(url);
 };

const closeImagePreview = () => {
   setPreviewImageUrl(null);
 };


const uploadSignatureImage = async (file: File) => {
  // 1. presigned URL 요청
  const res = await api.post<PresignedUploadResponse>(
   "/hospital/signature-care/upload-url",
   {
    contentType: file.type,
   }
  );

  const { uploadUrl, fileUrl } = res.data;

  // 2. 실제 업로드 (PUT)
  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return fileUrl as string;
};


  type CalcType = "PERCENTAGE" | "PER_RESERVATION";

  const [form, setForm] = useState<{
    settlementCalcType: CalcType;
    agencyCommissionRate: number;
    settlementFlatAmount: number;
    platformCommissionRate: number;
    platformFlatAmount: number;
  }>({
    settlementCalcType: "PERCENTAGE",
    agencyCommissionRate: 0,
    settlementFlatAmount: 0,
    platformCommissionRate: 0,
    platformFlatAmount: 0,
  });

// ===== 에이전시 수수료율 등급 계산 =====
const getAgencyCommissionGrade = (rate: number) => {
  if (rate >= 24) {
    return { stars: 5, label: "에이전시 최우선 선택" };
  }
  if (rate >= 20) {
    return { stars: 4, label: "에이전시 적극 제안" };
  }
  if (rate >= 18) {
    return { stars: 3, label: "에이전시 평균 유입" };
  }
  if (rate >= 16) {
    return { stars: 2, label: "에이전시 유입 제한" };
  }
  return { stars: 1, label: "실질 유입 거의 없음" };
};


  const LANGUAGE_OPTIONS = [
  "영어",
  "일본어",
  "중국어(간체)",
  "중국어(번체)",
  "베트남어",
  "태국어",
  "인도네시아어",
  "기타",
  ];

  const toggleLanguage = (lang: string) => {
  if (!profile) return;

  const current = profile.consultLanguages ?? [];
  const exists = current.includes(lang);

  // 기타는 토글만 하고 입력은 별도 처리
  if (lang === "기타") {
    setProfile({
      ...profile,
      consultLanguages: exists
        ? current.filter((l) => l !== "기타")
        : [...current, "기타"],
    });
   // 기타 해제 시 입력값도 초기화
   if (exists) setCustomLanguagesInput("");
    return;
  }

  setProfile({
    ...profile,
    consultLanguages: exists
      ? current.filter((l) => l !== lang)
      : [...current, lang],
  });
};

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await api.get("/hospital/settings");
      const data = res.data as HospitalSettings;
 // =========================
 // 상담 가능 언어 정규화 (기타 복원)
 // =========================
const fixedLanguages = (data.consultLanguages ?? []).filter((l) =>
   LANGUAGE_OPTIONS.includes(l)
 );

 const customLanguages = (data.consultLanguages ?? []).filter(
   (l) => !LANGUAGE_OPTIONS.includes(l)
 );

 const normalizedConsultLanguages =
   customLanguages.length > 0 && !fixedLanguages.includes("기타")
     ? [...fixedLanguages, "기타"]
     : fixedLanguages;

 setCustomLanguagesInput(customLanguages.join(", "));


 setProfile({
   ...data,
   consultLanguages: normalizedConsultLanguages,
 });

 // =========================
 // 의료 서비스 설정 초기화
 // =========================
 setDoctorOptions({
   hasSpecialist: Boolean((data as any).hasSpecialist),
   canSelectDirector: Boolean((data as any).canSelectDirector),
 });

 setAfterCare((data as any).afterCare ?? "");

setSignatureCare(
  Array.isArray(data.signatureCares)
    ? data.signatureCares.map((c: any) => ({
        title: c.title ?? "",
        description: c.description ?? "",
        images: Array.isArray(c.images)
          ? c.images.map((url: string) => ({ url }))
          : [],
      }))
    : []
);


      setForm({
        settlementCalcType: data.settlementCalcType,
        agencyCommissionRate: data.agencyCommissionRate,
        settlementFlatAmount: data.settlementFlatAmount,
        platformCommissionRate: data.platformCommissionRate,
        platformFlatAmount: data.platformFlatAmount,
      });
    } catch (err) {
      console.error("Failed to load hospital profile", err);
      setError("병원 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

const handleSaveBasicInfo = async () => {
  if (!profile) return;

  try {
    setError(null);
    setSuccess(null);

    let finalConsultLanguages = [...(profile.consultLanguages ?? [])];

    if (finalConsultLanguages.includes("기타")) {
      const parsedCustom = customLanguagesInput
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

      // 기존 기타 입력 언어 전부 제거
      finalConsultLanguages = finalConsultLanguages.filter(
        (l) =>
          l === "기타" || LANGUAGE_OPTIONS.includes(l)
      );

      // 기타 입력값으로 교체
      finalConsultLanguages = [
        ...finalConsultLanguages,
        ...parsedCustom,
      ];
    }

    await api.patch("/hospital/basic-info", {
      phone: profile.phone,
      email: profile.email,
      address: profile.address ?? "",
      city: profile.location?.city,
      district: profile.location?.district,
      hotlinePhone: profile.hotlinePhone,
      consultLanguages: finalConsultLanguages,
      businessHours: profile.businessHours,
    });

    // 저장 후 최신 정보 다시 가져오기
    await fetchProfile();

    setSuccess("기본 정보가 저장되었습니다.");
  } catch (err) {
    console.error(err);
    setError("기본정보 저장 실패");
  }
};


const handleSaveSettings = async () => {
  if (!profile) return;
  setError(null);
  setSuccess(null);

  try {
    setSaving(true);

    await api.patch("/hospital/settings", {
      settlementCalcType: form.settlementCalcType,
      agencyCommissionRate: form.agencyCommissionRate,
      settlementFlatAmount: form.settlementFlatAmount,

 // =========================
 // 의료 서비스 설정
 // =========================
 hasSpecialist: doctorOptions.hasSpecialist,
 canSelectDirector: doctorOptions.canSelectDirector,
 afterCare: afterCare,
 signatureCares: signatureCare.map((item) => ({
   title: item.title,
   description: item.description,
    images: item.images
   .map((img) => img.url)
   .filter(Boolean),
 })),


      businessName: profile?.businessName,
      businessAddress: profile?.businessAddress,
      businessLicenseUrl: profile?.businessLicenseUrl,
      refundBankName: profile?.refundBankName,
      refundAccountNumber: profile?.refundAccountNumber,
      refundAccountHolder: profile?.refundAccountHolder,
    });


    await fetchProfile();  // ← 추가
    setSuccess("설정이 저장되었습니다.");
  } catch (err) {
    console.error("Failed to update settings", err);
    setError("설정 저장 중 오류가 발생했습니다.");
  } finally {
    setSaving(false);
  }
};

const handleSaveIntroduction = async (value: string) => {
  if (!profile) return;

  try {
    setError(null);
    setSuccess(null);

    await api.patch("/hospital/introduction", {
      introduction: value,
    });

    await fetchProfile();
    setSuccess("병원 소개가 저장되었습니다.");
  } catch (e) {
    console.error(e);
    setError("병원 소개 저장 실패");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <h1 className="text-lg font-semibold mb-4">병원 설정</h1>
        <p className="text-sm text-gray-500">병원 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <h1 className="text-lg font-semibold mb-4">병원 설정</h1>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

const WEEK_DAYS = [
  { key: "MON", label: "월요일" },
  { key: "TUE", label: "화요일" },
  { key: "WED", label: "수요일" },
  { key: "THU", label: "목요일" },
  { key: "FRI", label: "금요일" },
  { key: "SAT", label: "토요일" },
  { key: "SUN", label: "일요일" },
];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">병원 설정</h1>

        {profile && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              병원 기본 정보
            </h2>
            
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 space-y-1">
              <div>
                <span className="text-gray-400">병원명</span>
                <span className="ml-2 font-medium">{profile.name}</span>
              </div>
              <div>
                <span className="text-gray-400">위치</span>
                <span className="ml-2">
                  {[
                    profile.country,
                    profile.location?.city,
                    profile.location?.district
                  ]
                  .filter(Boolean)
                  .join(" ")}
                </span>
              </div>
              {profile.address && (
                <div>
                  <span className="text-gray-400">주소</span>
                  <span className="ml-2">{profile.address}</span>
                </div>
              )}
              <div>
                <span className="text-gray-400">연락처</span>
                <span className="ml-2">
                  {profile.phone || profile.email || "-"}
                </span>
              </div>

{profile.consultLanguages?.length ? (
  <div>
    <span className="text-gray-400">상담가능언어</span>
    <span className="ml-2">
 {[
   ...profile.consultLanguages.filter((l) => l !== "기타"),
   ...(profile.consultLanguages.includes("기타") && customLanguagesInput
     ? customLanguagesInput
        .split(",")
         .map((l) => l.trim())
         .filter(Boolean)
     : []),
 ].join(", ")}
    </span>
  </div>
) : null}

{profile.hotlinePhone && (
  <div>
    <span className="text-gray-400">핫라인</span>
    <span className="ml-2">{profile.hotlinePhone}</span>
  </div>
)}

              

              
            </div>
          </section>
        )}

        <div className="mb-8 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPasswordOpen(true)}
          >
            비밀번호 변경
          </Button>
        </div>

        {/* ===== 병원 기본정보 수정 섹션 추가 ===== */}
<section className="mb-8">
  <h2 className="text-sm font-semibold text-gray-700 mb-2">
    병원 기본정보 수정
  </h2>

  <div className="rounded-xl border bg-white p-4 space-y-4">

    {/* 연락처 입력 */}
    <div>
      <label className="block text-xs text-gray-500 mb-1">연락처 (전화번호)</label>
      <Input
        value={profile?.phone ?? ""}
        onChange={(e) =>
          setProfile((prev) => prev && { ...prev, phone: e.target.value })
        }
      />
    </div>

    <div>
      <label className="block text-xs text-gray-500 mb-1">이메일</label>
      <Input
        value={profile?.email ?? ""}
        onChange={(e) =>
          setProfile((prev) => prev && { ...prev, email: e.target.value })
        }
      />
    </div>

      <div>
  <label className="block text-xs text-gray-500 mb-1">주소</label>
  <Input
    value={profile?.address ?? ""}
    onChange={(e) =>
      setProfile((prev) => prev && { ...prev, address: e.target.value })
    }
  />
</div>

{/* 핫라인 번호 */}
<div>
  <label className="block text-xs text-gray-500 mb-1">핫라인 번호</label>
  <Input
    value={profile?.hotlinePhone ?? ""}
    onChange={(e) =>
      setProfile((prev) =>
        prev && { ...prev, hotlinePhone: e.target.value }
      )
    }
    placeholder="즉각 연락 가능 번호"
  />
</div>

{/* 상담가능언어 */}
<div>
  <label className="block text-xs text-gray-500 mb-2">
    상담가능언어 (에이전시 노출)
  </label>

  <div className="flex flex-wrap gap-2">
    {LANGUAGE_OPTIONS.map((lang) => {
      const active = profile?.consultLanguages?.includes(lang);

      return (
        <button
          key={lang}
          type="button"
          onClick={() => toggleLanguage(lang)}
          className={`px-3 py-1 rounded-full text-xs border transition
            ${
              active
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
        >
          {lang}
        </button>
      );
    })}
  </div>

{/* 기타 언어 직접 입력 */}
{profile?.consultLanguages?.includes("기타") && (
  <div className="mt-2 flex gap-2">
    
{profile?.consultLanguages?.includes("기타") && (
  <div className="mt-2 space-y-1">
    <Input
      placeholder="예: 러시아어, 아랍어, 스페인어"
      value={customLanguagesInput}
      onChange={(e) => setCustomLanguagesInput(e.target.value)}
    />
    <div className="text-xs text-gray-400">
      콤마(,)로 구분하여 입력 · 저장 시 기존 기타 언어는 모두 교체됩니다
    </div>
  </div>
)}

  </div>
)}

</div>

{/* 영업시간 설정 */}
<div>
  <label className="block text-xs text-gray-500 mb-2">
    영업시간 설정
  </label>

  <div className="space-y-2">
    {WEEK_DAYS.map(({ key, label }) => {
      const day = profile?.businessHours?.[key] ?? {
        enabled: false,
        open: "09:00",
        close: "18:00",
      };

      return (
        <div
          key={key}
          className="flex items-center gap-4"
        >
          {/* 요일 (고정 폭, 행 기준) */}
          <div className="w-20">
            <button
              type="button"
              className={`w-full px-3 py-1 rounded-full text-xs border
                ${
                  day.enabled
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              onClick={() =>
                setProfile((prev) =>
                  prev && {
                    ...prev,
                    businessHours: {
                      ...prev.businessHours,
                      [key]: { ...day, enabled: !day.enabled },
                    },
                  }
                )
              }
            >
              {label}
            </button>
          </div>

          {/* 시간 영역 (열 정렬) */}
          <div className="flex items-center gap-2 flex-1">
            {day.enabled ? (
              <>
                <Input
                  type="time"
                  step={600}
                  className="w-28"
                  value={day.open}
                  onChange={(e) =>
                    setProfile((prev) =>
                      prev && {
                        ...prev,
                        businessHours: {
                          ...prev.businessHours,
                          [key]: { ...day, open: e.target.value },
                        },
                      }
                    )
                  }
                />
                <span className="text-gray-400 text-xs">~</span>
                <Input
                  type="time"
                  step={600}
                  className="w-28"
                  value={day.close}
                  onChange={(e) =>
                    setProfile((prev) =>
                      prev && {
                        ...prev,
                        businessHours: {
                          ...prev.businessHours,
                          [key]: { ...day, close: e.target.value },
                        },
                      }
                    )
                  }
                />
              </>
            ) : (
              <span className="text-xs text-gray-400">
                휴무
              </span>
            )}
          </div>
        </div>
      );
    })}
  </div>
</div>



    {/* 한국 행정구역 선택 */}
    <div>
      <label className="block text-xs text-gray-500 mb-1">광역시/도</label>
      <Select
        value={profile?.location?.city ?? ""}
        onChange={(e) =>
          setProfile((prev) =>
            prev && {
              ...prev,
              location: { city: e.target.value, district: "" },
            }
          )
        }
      >
        <option value="">선택</option>
        {KR_CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
    </div>

    <div>
      <label className="block text-xs text-gray-500 mb-1">시/군/구</label>
      <Select
        value={profile?.location?.district ?? ""}
        onChange={(e) =>
          setProfile((prev) =>
            prev && {
              ...prev,
              location: { city: profile?.location?.city ?? "", district: e.target.value },
            }
          )
        }
      >
        <option value="">선택</option>
        {KR_DISTRICTS[profile?.location?.city ?? ""]?.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </Select>
    </div>

    <Button
      className="bg-blue-600 text-white"
      size="sm"
      onClick={handleSaveBasicInfo}
    >
      기본정보 저장
    </Button>
  </div>

</section>

        <h2 className="text-sm font-semibold mb-2">에이전시 수수료 설정</h2>
        
        <section className="mb-8">
          
 <div className="mb-3 rounded-lg bg-green-50 border border-green-200 px-3 py-3 text-xs text-green-800">
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

     {/* 좌측: 에이전시 수수료 */}
     <div className="rounded-md bg-white/60 border border-green-200 px-3 py-2">
       <div className="text-green-700 font-medium mb-1">
         정액 수수료 현재 설정 (환자 결제 금액 50만원 이하)
       </div>
       <div className="mt-0.5">
         · 에이전시 수수료 정액&nbsp;
         <span className="font-semibold">
           {profile?.settlementFlatAmount.toLocaleString()}원
         </span>
       </div>
       <div className="mt-0.5">
         · 플랫폼 수수료 정액&nbsp;
         <span className="font-semibold">
           {profile?.platformFlatAmount.toLocaleString()}원
         </span>
       </div>
     </div>

     {/* 우측: 플랫폼 수수료 */}
     <div className="rounded-md bg-white/60 border border-green-200 px-3 py-2">
       <div className="text-green-700 font-medium mb-1">
         정률 수수료 현재 설정 (환자 결제 금액 50만원 초과)
       </div>
        <div>
         · 에이전시 수수료 정률&nbsp;
         <span className="font-semibold">
           {profile?.agencyCommissionRate.toFixed(1)}%
         </span>
       </div>
      <div>
         · 플랫폼 수수료 정률&nbsp;
         <span className="font-semibold">
           {profile?.platformCommissionRate.toFixed(1)}%
         </span>
       </div>
       
     </div>

   </div>
 </div>

          <p className="text-xs text-gray-500 mb-3">
          ✅본 플랫폼은 원활한 환자유치를 위해 정률 단일 구조를 사용하지 않습니다.<br />
          ✅건당 수수료는 고액 환자 비용 절감을 위한 제도가 아닙니다. 저액 환자 유치를 가능하게 하기 위한 시장 안정 장치입니다.<br /><br />

          결제 금액 기준으로 자동 분기됩니다.<br />
          ⚠️환자 결제 금액 50만원 이하: 에이전시 정액(원) + 플랫폼 12,000원<br />
          ⚠️환자 결제 금액 50만원 초과: 에이전시 정률(%) + 플랫폼 매출의 2.5%
        </p>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            {form.settlementCalcType === "PERCENTAGE" && (
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">에이전시 수수료율 (%)</label>
              {(() => {
  const grade = getAgencyCommissionGrade(form.agencyCommissionRate);

  return (
    <div className="mt-2 inline-flex items-center gap-2
                    rounded-full border border-gray-300
                    bg-gray-50 px-3 py-1 text-xs">
      {/* 별 영역 */}
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={
              i < grade.stars
                ? "text-yellow-400"
                : "text-gray-300"
            }
          >
            ★
          </span>
        ))}
      </div>

      {/* 문구 */}
      <span className="text-gray-700 font-medium">
        {grade.label}
      </span>
    </div>
  );
})()}

              <div className="flex items-center gap-2">
<Input
  type="number"
  className="w-28"
  max={30}
  min={0}
  value={form.agencyCommissionRate}
  onChange={(e) => {
    const value = Number(e.target.value);

    if (value > 30) {
      setError("에이전시 수수료율은 30%를 초과할 수 없습니다.");
      return;
    }

    setError(null);
    setForm({
      ...form,
      agencyCommissionRate: value,
    });
  }}
/>
<div className="mt-1 text-[11px] text-gray-400">
  수수료율은 최대 30%까지만 설정할 수 있습니다.
</div>
                <span className="text-sm text-gray-500">%</span>
              </div>
            </div>
            )}

            
            <div className="mt-4 space-y-3">
              <label className="text-xs text-gray-500">플랫폼 수수료율 (%)</label>
              <div className="px-3 py-2 border rounded-md bg-gray-100 text-sm text-gray-700">
                {form.platformCommissionRate} %
              </div>
            </div>
            

            <div className="mt-4 flex-1">
              <div className="mt-4 space-y-4">

                <div>
                  <label className="text-xs text-gray-500">에이전시 정산 금액 (원)</label>
                  <Input
                    type="number"
                    value={form.settlementFlatAmount}
                    onChange={(e) =>
                      setForm({ ...form, settlementFlatAmount: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="px-3 py-2 border rounded-md bg-gray-100 text-sm text-gray-700">
                  {form.platformFlatAmount.toLocaleString()} 원
                </div>

              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-gray-400">
                저장 후 신규 [예약대기] 신청건 부터 적용됩니다.
              </div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                type="button"
                onClick={handleSaveSettings}
                disabled={saving}
              >
                {saving ? "저장 중..." : "설정 저장"}
              </Button>
            </div>

            {error && (
              <div className="mt-3 text-xs text-red-500">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-3 text-xs text-green-600">
                {success}
              </div>
            )}
          </div>
        </section>
        
        {/* ================= 병원 추가 정보 ================= */}
<section className="space-y-8 mt-10">

  {/* 진료 과목 */}
  <HospitalSpecialtiesSection
   items={profile?.specialties ?? []}
   onChange={fetchProfile} />

 {/* ================= 의료 서비스 설정 ================= */}
  <section className="rounded-xl border border-gray-200 bg-white p-4 space-y-6">
    <h3 className="text-sm font-semibold text-gray-700">
      의료 서비스 설정
    </h3>

    {/* 전문의 / 원장 지정 */}
    <div>
      <label className="block text-xs text-gray-500 mb-2">
        의료진 옵션
      </label>
      <div className="flex flex-wrap gap-2">
        {[
          { key: "hasSpecialist", label: "전문의 진료" },
          { key: "canSelectDirector", label: "원장 지정 가능" },
        ].map((opt) => {
          const active = doctorOptions[opt.key as keyof typeof doctorOptions];

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() =>
                setDoctorOptions((prev) => ({
                  ...prev,
                  [opt.key]: !prev[opt.key as keyof typeof prev],
                }))
              }
              className={`px-3 py-1 rounded-full text-xs border transition
                ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>

    {/* 애프터케어 */}
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        애프터케어 안내
      </label>
      <textarea
        value={afterCare}
        onChange={(e) => setAfterCare(e.target.value)}
        placeholder="시술 후 관리, 주의사항, 내원 주기 등을 입력해주세요."
        className="w-full min-h-[80px] border rounded-md px-3 py-2 text-sm"
      />
    </div>

    {/* 시그니처 케어 */}
    <div>
      <label className="block text-xs text-gray-500 mb-2">
        시그니처 케어
      </label>

      <div className="space-y-4">
        {signatureCare.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg border bg-gray-50 p-3 space-y-2"
          >
            <Input
              placeholder="시술명"
              value={item.title}
              onChange={(e) => {
                const copy = [...signatureCare];
                copy[idx].title = e.target.value;
                setSignatureCare(copy);
              }}
            />

            <textarea
              placeholder="시술 설명"
              value={item.description}
              onChange={(e) => {
                const copy = [...signatureCare];
                copy[idx].description = e.target.value;
                setSignatureCare(copy);
              }}
              className="w-full min-h-[60px] border rounded-md px-3 py-2 text-sm"
            />

            {/* 숨김 file input */}
<input
  type="file"
  accept="image/*"
  multiple
  title="최대 3장, 각 3MB 이하"
  ref={(el) => {
   fileInputRefs.current[idx] = el;
  }}
  className="hidden"
  onChange={(e) => handleSignatureImageUpload(idx, e.target.files)}
/>

<div className="flex items-start justify-between gap-4">
  {/* 좌측: 업로드 버튼 + 미리보기 */}
  <div className="flex items-center gap-2 flex-wrap">
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => fileInputRefs.current[idx]?.click()}
    >
      이미지 업로드
    </Button>

    {item.images.map((img, i) =>
      img.url ? (
        <div key={i} className="relative group">
          <img
            src={img.url}
            alt={`signature-${idx}-${i}`}
            className="w-16 h-16 rounded-md object-cover border bg-white cursor-pointer"
            onClick={() => openImagePreview(img.url!)}
          />
          <button
            type="button"
            onClick={() => removeSignatureImage(idx, i)}
            className="absolute -top-1.5 -right-1.5 hidden group-hover:flex
                       items-center justify-center w-5 h-5
                       rounded-full bg-red-600 text-white text-xs"
          >
            ×
          </button>
        </div>
      ) : null
    )}
  </div>

  {/* 우측: 시그니처 케어 삭제 */}
  <Button
    type="button"
    size="sm"
    variant="destructive"
    className="shrink-0"
    onClick={() => removeSignatureCare(idx)}
  >
    시그니처 케어 삭제
  </Button>
</div>


          </div>
        ))}

        <Button
          size="sm"
          type="button"
          onClick={() =>
            setSignatureCare((prev) => [
              ...prev,
              { title: "", description: "", images: [] },
            ])
          }
       >
          시그니처 케어 추가
        </Button>
      </div>
    </div>

  {/* 저장 버튼 */}
  <div className="flex justify-end pt-2">
    <Button
      size="sm"
      className="bg-blue-600 hover:bg-blue-700 text-white"
      type="button"
      onClick={handleSaveSettings}
      disabled={saving}
    >
      {saving ? "저장 중..." : "의료 서비스 설정 저장"}
    </Button>
  </div>
  </section>

  {/* 수가표 */}
  <HospitalPricingSection
  items={profile?.pricingItems ?? []}
  onChange={fetchProfile}/>

  {/* 병원 소개 */}
  <HospitalIntroductionSection
   value={profile?.introduction ?? ""}
   onSave={handleSaveIntroduction} />

  {/* 병원 인테리어 이미지 */}
  <HospitalInteriorImagesSection
    items={profile?.images ?? []}
    onChange={fetchProfile} />
</section>

      {/* ================= 이미지 미리보기 모달 ================= */}
      {previewImageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={closeImagePreview}
        >
          <img
            src={previewImageUrl}
            alt="preview"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* 🔽 여기부터 비밀번호 변경 Dialog 추가 */}
      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>비밀번호 변경</DialogTitle>
            <DialogDescription>
              현재 비밀번호를 입력한 후 새 비밀번호를 설정하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPasswordOpen(false)}
            >
              취소
            </Button>
            <Button
  onClick={async () => {
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await api.patch("/auth/password", {
        currentPassword,
        newPassword,
      });

      alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
      await api.post("/auth/logout");
      window.location.href = "/auth/login";
    } catch (err: any) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message ||
        "비밀번호 변경 중 오류가 발생했습니다.";

      if (status === 401) {
        alert("현재 비밀번호가 올바르지 않습니다.");
        return;
      }

      alert(message);
    }
  }}
>
              변경
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      </div>
    </div>
  );
}
