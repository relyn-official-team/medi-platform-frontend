"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HospitalCardStatic from "@/components/agency/HospitalCardStatic";
import type { AgencyHospitalListItem } from "@/types/hospital";
import { useEffect } from "react";
import type { AgencyHospitalDetail } from "@/types/hospital";
import MobileHeader from "@/components/agency/MobileHeader";
import { Select } from "@/components/ui/select";


type ReservationCopyResponse = {
  patientName: string;
  patientAge: number;
  patientNationality: string;
  procedureName: string;
  reservationDate: string; // ISO
  reservationTime: string;
  memo: string | null;
  language: string | null;
  needSedation: boolean;
  needInterpreter: boolean;
  needTaxRefund: boolean;
};


export default function AgencyBookingPage() {
  const params = useParams();
  const hospitalId = String(params.id);
  const router = useRouter();
  const searchParams = useSearchParams();
 const copyFrom = searchParams.get("copyFrom");
  const [hospital, setHospital] = useState<AgencyHospitalListItem | null>(null);

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState<number>(0);
  const [patientNationality, setPatientNationality] = useState("");
  const [procedureName, setProcedureName] = useState("");
  const [reservationDate, setReservationDate] = useState(""); // YYYY-MM-DD
  const [reservationTime, setReservationTime] = useState(""); // e.g. "14:00"
  const [memo, setMemo] = useState("");
  const [language, setLanguage] = useState("");

  const [needSedation, setNeedSedation] = useState(false);
  const [needTaxRefund, setNeedTaxRefund] = useState(false);
  const [needInterpreter, setNeedInterpreter] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  

useEffect(() => {
  if (!hospitalId) return;

  (async () => {
    try {
      const res = await api.get<AgencyHospitalDetail>(
        `/agency/hospitals/${hospitalId}`
      );

      const d = res.data;

      // ✅ 가격 계산 (할인가 우선)
      const prices = (d.pricingItems ?? [])
        .map((p) => p.discountPrice ?? p.originalPrice)
        .filter((v): v is number => typeof v === "number");

      const priceMin = prices.length ? Math.min(...prices) : null;
      const priceMax = prices.length ? Math.max(...prices) : null;
      const priceMinDisplay = prices.length ? Math.min(...prices) : null;
      const priceMaxDisplay = prices.length ? Math.max(...prices) : null;

      setHospital({
        id: d.id,
        name: d.name,
        location: d.location ?? null,
        consultLanguages: d.consultLanguages ?? [],
        businessHours: d.businessHours ?? undefined,
        coverImageUrl:
          d.images?.find((i) => i.isCover)?.url ?? null,

        // ✅ 이제 스코프에 존재
        priceMin,
        priceMax,
        priceMinDisplay,
        priceMaxDisplay,

        topProcedures:
          d.pricingItems?.slice(0, 3).map((p) => p.procedureName) ?? [],
        agencyCommissionRate: d.agencyCommissionRate,
        settlementCalcType: d.settlementCalcType,
        settlementFlatAmount: d.settlementFlatAmount,
      });
    } catch (e) {
      console.error("Failed to load hospital card info", e);
    }
  })();
}, [hospitalId]);

useEffect(() => {
  if (!copyFrom) return;

  (async () => {
    try {
     const res = await api.get<ReservationCopyResponse>(
     `/agency/reservations/${copyFrom}/copy?hospitalId=${hospitalId}`
     );

      const d = res.data;

      setPatientName(d.patientName);
      setPatientAge(d.patientAge);
      setPatientNationality(d.patientNationality);
      setProcedureName(d.procedureName);
      setReservationDate(d.reservationDate.slice(0, 10));
      setReservationTime(d.reservationTime);
      setMemo(d.memo ?? "");
      setLanguage(d.language ?? "");

      setNeedSedation(d.needSedation);
      setNeedInterpreter(d.needInterpreter);
      setNeedTaxRefund(d.needTaxRefund);
    } catch (e) {
      console.error("Failed to copy reservation", e);
      alert("복사할 수 없는 예약입니다.");
    }
  })();
}, [copyFrom]);


  const submit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        hospitalId,
        patientName,
        patientAge,
        patientNationality,
        procedureName,
        memo: memo || undefined,
        language: language || undefined,
        needSedation,
        needTaxRefund,
        needInterpreter,
        reservationDate, // backend에서 new Date(...) 처리
        reservationTime,
      };

      const res = await api.post("/agency/reservations", payload);

      // 생성 성공 → 병원 상세로 복귀(또는 예약목록 페이지로 이동)
      router.replace("/auth/agency/reservations");
    } catch (e) {
      console.error("Failed to create reservation", e);
      alert("예약 생성 실패. 콘솔 로그 확인");
    } finally {
      setSubmitting(false);
    }
  };

  const getTimeOptions = () => {
  if (!hospital?.businessHours || !reservationDate) return [];

  const date = new Date(`${reservationDate}T00:00:00+09:00`);
  const dayKey = ["SUN","MON","TUE","WED","THU","FRI","SAT"][date.getDay()];
  const day = hospital.businessHours[dayKey];

  if (!day || !day.enabled) return [];

  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const options: string[] = [];
  for (
    let m = toMin(day.open);
    m <= toMin(day.close) - 10;
    m += 10
  ) {
    const h = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    options.push(`${h}:${mm}`);
  }
  return options;
};

useEffect(() => {
  if (!hospital?.businessHours || !reservationDate) return;

  const date = new Date(`${reservationDate}T00:00:00+09:00`);
  const dayKey = ["SUN","MON","TUE","WED","THU","FRI","SAT"][date.getDay()];
  const day = hospital.businessHours[dayKey];

  if (!day || !day.enabled) {
    alert("선택한 날짜는 병원 휴무일입니다.");
    setReservationDate("");
    setReservationTime("");
  }
}, [reservationDate]);



  return (
  <>
    <MobileHeader title="예약 신청" />

    <div className="pt-14 space-y-4 pb-24">
    {/* 병원 카드 (고정 헤더 아래 영역) */}
{hospital && (
  <div className="bg-gray-50">
    <div className="max-w-5xl mx-auto px-4 py-2">
      <HospitalCardStatic hospital={hospital} />
    </div>
  </div>
)}


     
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        {copyFrom && (
  <div className="rounded-md bg-yellow-50 border border-yellow-200 px-3 py-2 text-xs text-yellow-900">
    취소된 예약을 복사하여 작성 중입니다.
  </div>
)}

        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="text-sm mb-1">환자명</div>
            <Input value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="한국 발음도 포함하여 작성해주세요. 예: Tom(톰)" />
          </div>
          <div>
            <div className="text-sm mb-1">나이</div>
            <Input
              type="number"
              value={patientAge}
              onChange={(e) => setPatientAge(Number(e.target.value))}
            />
          </div>
          <div>
            <div className="text-sm mb-1">국적</div>
            <Input value={patientNationality} onChange={(e) => setPatientNationality(e.target.value)} placeholder="여권에 명시된 국적 기준으로 작성해주세요." />
          </div>
          <div>
            <div className="text-sm mb-1">시술명</div>
            <Input value={procedureName} onChange={(e) => setProcedureName(e.target.value)} placeholder="병원상세페이지에 수가표를 확인하고 시술명 작성 부탁드립니다." />
          </div>
          <div>
            <div className="text-sm mb-1">예약일</div>
            <Input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
          </div>
<div>
  <div className="text-sm mb-1">예약시간</div>

  <Select
    className="w-full"
    value={reservationTime}
    onChange={(e) => setReservationTime(e.target.value)}
    disabled={!reservationDate || getTimeOptions().length === 0}
  >
    <option value="" disabled>
      {reservationDate ? "시간 선택" : "예약일을 먼저 선택하세요"}
    </option>

    {getTimeOptions().map((t) => (
      <option key={t} value={t}>
        {t}
      </option>
    ))}
  </Select>

  {!reservationDate && (
    <div className="mt-1 text-xs text-gray-400">
      예약일 선택 후 시간 선택이 가능합니다.
    </div>
  )}
</div>

          <div>
            <div className="text-sm mb-1">사용 언어</div>
            <Input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="예: 영어, 중국어, 일본어 등" />
          </div>
          <div>
            <div className="text-sm mb-1">메모  <div className="inline-block rounded bg-blue-50 px-2 py-1 text-xs text-blue-900">환자분의 한국 체류 기간 작성 시, 큰 도움이 됩니다.</div> </div>
            <Input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="환자요청사항 상세히 적어주세요." />
          </div>
        </div>
          
{/* 추가 옵션 타이틀 */}
<div className="pt-3">
  <div className="text-sm text-gray-900 mb-2">
    추가 요청 사항
  </div>
  <div className="inline-block rounded bg-red-50 px-2 py-1 text-xs text-red-900">⚠️ [통역 필요] 희망 시, 병원에서 상담가능한 언어만 가능합니다.</div>

  <div className="flex flex-wrap gap-4 text-sm">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={needSedation}
        onChange={(e) => setNeedSedation(e.target.checked)}
      />
      마취 필요
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={needInterpreter}
        onChange={(e) => setNeedInterpreter(e.target.checked)}
      />
      통역 필요
    </label>

  </div>
</div>

        

{/* Fixed CTA */}
<div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200">
  <div className="max-w-3xl mx-auto px-4 py-3">
    <Button
      className="w-full"
      disabled={submitting}
      onClick={submit}
    >
      {submitting ? "처리중..." : "예약 신청"}
    </Button>
  </div>
</div>

      </div>
    </div>
    </>
  );
}
