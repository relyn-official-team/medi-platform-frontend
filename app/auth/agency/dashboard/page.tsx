"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import type { Specialty } from "@/types/specialty";
import {
  Sparkles,
  Smile,
  Stethoscope,
  Eye,
  HeartPulse,
  ClipboardCheck,
  Pill,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";

const SPECIALTY_ORDER = [
  "피부과",
  "성형외과",
  "치과",
  "안과",
  "내과",
  "건강검진센터",
  "약국",
] as const;

type SpecialtyName = (typeof SPECIALTY_ORDER)[number];

const SPECIALTY_META: Record<
  string,
  { icon: ReactNode; iconBg: string; accent: string; desc: string }
> = {
  피부과: {
    icon: <Sparkles className="w-6 h-6 text-blue-600" />,
    iconBg: "bg-blue-50",
    accent: "border-blue-100 hover:border-blue-300",
    desc: "피부 레이저·보톡스·리프팅",
  },
  성형외과: {
    icon: <Smile className="w-6 h-6 text-pink-500" />,
    iconBg: "bg-pink-50",
    accent: "border-pink-100 hover:border-pink-300",
    desc: "눈·코·윤곽·지방이식",
  },
  치과: {
    icon: <Stethoscope className="w-6 h-6 text-purple-600" />,
    iconBg: "bg-purple-50",
    accent: "border-purple-100 hover:border-purple-300",
    desc: "임플란트·교정·미백",
  },
  안과: {
    icon: <Eye className="w-6 h-6 text-emerald-600" />,
    iconBg: "bg-emerald-50",
    accent: "border-emerald-100 hover:border-emerald-300",
    desc: "라식·라섹·백내장",
  },
  내과: {
    icon: <HeartPulse className="w-6 h-6 text-red-500" />,
    iconBg: "bg-red-50",
    accent: "border-red-100 hover:border-red-300",
    desc: "건강관리·만성질환",
  },
  건강검진센터: {
    icon: <ClipboardCheck className="w-6 h-6 text-indigo-600" />,
    iconBg: "bg-indigo-50",
    accent: "border-indigo-100 hover:border-indigo-300",
    desc: "종합·특화 검진 패키지",
  },
  약국: {
    icon: <Pill className="w-6 h-6 text-teal-600" />,
    iconBg: "bg-teal-50",
    accent: "border-teal-100 hover:border-teal-300",
    desc: "처방·건강기능식품",
  },
};

export default function AgencyDashboard() {
  const router = useRouter();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Specialty[]>("/specialties");
        const mapped = SPECIALTY_ORDER.map((name: SpecialtyName) =>
          res.data.find((s) => s.name === name)
        ).filter(Boolean) as Specialty[];
        setSpecialties(mapped);
      } catch (e) {
        console.error("Failed to load specialties", e);
      }
    })();
  }, []);

  return (
    <>
      {/* ================= Mobile Top Logo ================= */}
      <div className="md:hidden sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-[0_1px_8px_rgba(2,6,23,0.06)]">
        <div className="h-12 flex items-center justify-center">
          <Image
            src="/relyn_logo.png"
            alt="RELYN"
            width={100}
            height={26}
            priority
          />
        </div>
      </div>

      {/* ================= Main Banner (PC) ================= */}
      <section className="w-full mb-8 hidden md:block">
        <div className="relative w-full overflow-hidden rounded-b-2xl">
          <div className="relative h-[480px] w-full">
            <Image
              src="/banners/agency-main-01-v2.jpg"
              alt="에이전시 메인 배너"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
          </div>
        </div>
      </section>

      {/* ================= Main Banner (Mobile) ================= */}
      <section className="w-full md:hidden">
        <div className="relative w-full overflow-hidden">
          <div className="relative h-[200px] w-full">
            <Image
              src="/banners/agency-main-01-mobile.jpg"
              alt="에이전시 메인 배너"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* ================= Specialty Grid ================= */}
      <div className="px-4 pt-5 pb-28 md:pb-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h1 className="text-[18px] font-bold text-gray-900 md:text-xl">어떤 진료를 찾으시나요?</h1>
            <p className="mt-1 text-sm text-gray-500">
              진료과를 선택하면 병원 리스트를 확인할 수 있어요
            </p>
          </div>
          <span className="text-[11px] font-medium text-gray-400">{specialties.length}개 진료과</span>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {specialties.map((s) => {
            const meta = SPECIALTY_META[s.name];
            const isPharmacy = s.name === "약국";

            return (
              <button
                key={s.id}
                onClick={() =>
                  router.push(`/auth/agency/hospitalslist?specialtyId=${s.id}`)
                }
                className={`
                  group relative flex items-center gap-3.5
                  rounded-2xl border bg-white px-4 py-4
                  text-left shadow-sm
                  active:scale-[0.97] transition-all duration-200
                  hover:shadow-md
                  ${meta?.accent ?? "border-gray-200 hover:border-gray-300"}
                  ${isPharmacy ? "col-span-2 md:col-span-3" : ""}
                `}
              >
                {/* 아이콘 배경 */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    meta?.iconBg ?? "bg-gray-100"
                  }`}
                >
                  {meta?.icon ?? <Stethoscope className="w-6 h-6 text-gray-400" />}
                </div>

                {/* 텍스트 */}
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-gray-900 leading-tight">
                    {s.name}
                  </div>
                  {meta?.desc && (
                    <div className="mt-0.5 text-[11px] text-gray-400 leading-tight truncate">
                      {meta.desc}
                    </div>
                  )}
                </div>

                {/* 화살표 */}
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
