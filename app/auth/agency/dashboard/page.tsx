"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import type { Specialty } from "@/types/specialty";
import {
  Sparkles,        // 피부과
  Smile,           // 성형외과
  Stethoscope,     // 치과 / 내과 fallback
  Eye,             // 안과
  HeartPulse,      // 내과
  ClipboardCheck,  // 건강검진센터
  Pill,            // 약국
 } from "lucide-react";
 import type { ReactNode } from "react";
 import Image from "next/image";


export default function AgencyDashboard() {

  const SPECIALTY_ORDER = [
  "피부과",
  "성형외과",
  "치과",
  "안과",
  "내과",
  "건강검진센터",
  "약국",
] as const;

type SpecialtyName = typeof SPECIALTY_ORDER[number];


const SPECIALTY_ICON_MAP: Record<string, ReactNode> = {
  피부과: <Sparkles className="w-6 h-6 text-blue-600" />,
  성형외과: <Smile className="w-6 h-6 text-pink-600" />,
  치과: <Stethoscope className="w-6 h-6 text-purple-600" />,
  안과: <Eye className="w-6 h-6 text-green-600" />,
  내과: <HeartPulse className="w-6 h-6 text-red-600" />,
  건강검진센터: (
    <ClipboardCheck className="w-6 h-6 text-indigo-600" />
  ),
  약국: <Pill className="w-6 h-6 text-emerald-600" />,
};

  const router = useRouter();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

useEffect(() => {
  (async () => {
    try {
      const res = await api.get<Specialty[]>("/specialties");

     const mapped = SPECIALTY_ORDER
       .map((name: SpecialtyName) =>
         res.data.find((s) => s.name === name)
       )
       .filter(Boolean) as Specialty[];

      setSpecialties(mapped);
    } catch (e) {
      console.error("Failed to load specialties", e);
    }
  })();
}, []);

return (
  <>
    {/* ================= Mobile Top Logo (Dashboard Only) ================= */}
    <div className="md:hidden sticky top-0 z-20 bg-white">
      <div className="h-12 flex items-center justify-center border-b border-gray-200">
        <Image
          src="/relyn_logo.png"
          alt="RELYN"
          width={110}
          height={28}
          priority
        />
      </div>
    </div>



   {/* ================= Main Banner (PC) ================= */}
   <section className="w-full mb-10 hidden md:block">
     <div className="relative w-full overflow-hidden">

       {/* Slide Item */}
       <div className="relative h-[480px] w-full">
         <Image
           src="/banners/agency-main-01-v2.jpg"
           alt="에이전시 메인 배너"
           fill
           className="object-cover object-center"
           priority
         />
       </div>

       {/* Dot Indicator */}
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
         <span className="w-2 h-2 rounded-full bg-blue-600" />
       </div>
     </div>
   </section>

 {/* ================= Main Banner (Mobile) ================= */}
 <section className="w-full md:hidden">
   <div className="relative w-full overflow-hidden">
     <div className="relative h-[220px] w-full">
       <Image
         src="/banners/agency-main-01-mobile.jpg"
         alt="에이전시 메인 배너 (모바일)"
         fill
         className="object-cover object-center"
         priority
       />
     </div>

     {/* Dot Indicator */}
     <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
       <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
       <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
       <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
     </div>
   </div>
 </section>


  <div className="px-4 pt-1">
    <div className="mb-5">
      <h1 className="text-xl font-bold">어떤 진료를 찾으시나요?</h1>
      <p className="text-sm text-gray-500 mt-1">
        진료과를 선택하면 병원 리스트를 확인할 수 있어요
      </p>
    </div>

    <div className="grid grid-cols-3 gap-4">
      {specialties.map((s) => {
        const isPharmacy = s.name === "약국";

        return (
          <button
            key={s.id}
            onClick={() =>
              router.push(
                `/auth/agency/hospitalslist?specialtyId=${s.id}`
              )
            }
            className={`
              flex flex-col items-center justify-center
              gap-2 rounded-xl border border-gray-200
              bg-white py-5 text-sm
              active:scale-[0.98] transition
              ${isPharmacy ? "col-span-3" : ""}
            `}
          >
            {SPECIALTY_ICON_MAP[s.name as SpecialtyName] ?? (
              <Stethoscope className="w-6 h-6 text-gray-400" />
            )}

            <span className="font-medium text-gray-800">
              {s.name}
            </span>
          </button>
        );
      })}
    </div>
  </div>
  </>
);

}
