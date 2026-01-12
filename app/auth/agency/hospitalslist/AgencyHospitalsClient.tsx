"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { AgencyHospitalListItem } from "@/types/hospital";
import HospitalCard from "@/components/agency/HospitalCard";
import HospitalFilterBar from "@/components/agency/HospitalFilterBar";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import HospitalCardSkeleton from "@/components/agency/HospitalCardSkeleton";
import MobileHeader from "@/components/agency/MobileHeader";

// ⬇️ 여기부터는 기존 page.tsx 내용 그대로
export default function AgencyHospitalsClient() {
    const [specialtyName, setSpecialtyName] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const specialtyId = searchParams.get("specialtyId") ?? "";
  const [items, setItems] = useState<AgencyHospitalListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState("");

 const [languageInput, setLanguageInput] = useState("");
 const [languageSelected, setLanguageSelected] = useState("");
  const [languageSuggestions, setLanguageSuggestions] = useState<string[]>([]);
const [city, setCity] = useState("");
const [district, setDistrict] = useState("");
const [sort, setSort] = useState<
  "RATE_DESC" | "RATE_ASC" | "FLAT_DESC" | "FLAT_ASC" | ""
>("");

const filterSummary = [
   languageSelected && `상담언어: ${languageSelected}`,
   q && `검색어: ${q}`,
 ]
  .filter(Boolean)
  .join(" · ");

const dq = useDebounce(q, 300);
const dLanguageSelected = useDebounce(languageSelected, 300);
const dCity = useDebounce(city, 300);
const dDistrict = useDebounce(district, 300);

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
    const lang = searchParams.get("language") ?? "";
    setLanguageInput(lang);
    setLanguageSelected(lang);
    setCity(searchParams.get("city") ?? "");
    setDistrict(searchParams.get("district") ?? "");
    setSort(
     (searchParams.get("sort") as
        | "RATE_DESC"
        | "RATE_ASC"
        | "FLAT_DESC"
        | "FLAT_ASC") ?? ""
    );
    // ⚠️ 최초 1회만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 기존 쿼리를 기반으로 수정해야 specialtyId가 보존됨
    const params = new URLSearchParams(searchParams.toString());

    // specialtyId는 항상 유지 (이슈1 방지)
    if (specialtyId) params.set("specialtyId", specialtyId);

    // set/delete 유틸
    const upsert = (key: string, val: string) => {
      const v = (val ?? "").trim();
      if (v) params.set(key, v);
      else params.delete(key);
    };

    upsert("q", dq);
    upsert("language", dLanguageSelected);
    upsert("city", dCity);
    upsert("district", dDistrict);
    upsert("sort", sort);

    
  const next = params.toString();
  const current = searchParams.toString();

  // ⭐️ 동일하면 replace 안 함
  if (next !== current) {
    router.replace(`?${next}`, { scroll: false });
  }
  }, [
    dq,
    dLanguageSelected,
    dCity,
    dDistrict,
    sort,
    router,
    specialtyId,
  ]);
  

  useEffect(() => {
    if (!specialtyId) return;
    (async () => {
      try {
        setIsLoading(true);
     const res = await api.get<AgencyHospitalListItem[]>("/agency/hospitals", {
       params: {
          language: dLanguageSelected || undefined,
          city: dCity || undefined,
          district: dDistrict || undefined,
          search: dq || undefined,
         sort: sort || undefined,
         specialtyId,
       },
     });
         const hospitals = res.data ?? [];
 setItems(hospitals);

// 🔹 상담 언어 자동 수집 (병원 데이터 기반)
const langSet = new Set<string>();
hospitals.forEach((h) => {
  h.consultLanguages?.forEach((l) => {
    if (l && l.trim()) langSet.add(l.trim());
  });
});
setLanguageSuggestions(Array.from(langSet).sort());

      } catch (e) {
        console.error("Failed to load hospitals", e);
       } finally {
       setIsLoading(false);
      }
    })();
 }, [dq, dLanguageSelected, dCity, dDistrict, sort, specialtyId]);

useEffect(() => {
  if (!specialtyId) {
    setSpecialtyName("");
    return;
  }

  (async () => {
    try {
      const res = await api.get<{ id: number; name: string }[]>("/specialties");
      const found = res.data.find(
        (s) => String(s.id) === String(specialtyId)
      );
      setSpecialtyName(found?.name ?? "");
    } catch {
      setSpecialtyName("");
    }
  })();
}, [specialtyId]);


  return (
 <>
{/* ================= Mobile ================= */}
<MobileHeader title="병원 리스트" />
<div className="h-12 md:hidden" />

<div className="md:hidden sticky top-[48px] z-20 bg-gray-50">
  <HospitalFilterBar
    filterSummary={filterSummary}
    specialtyName={specialtyName}
    onChangeSpecialty={() => router.push("/auth/agency/dashboard")}
    q={q}
    languageInput={languageInput}
    languageSuggestions={languageSuggestions}
    city={city}
    district={district}
    sort={sort}
    onChange={{
      setQ,
   setLanguageInput,
   setLanguageSelected,
      setCity,
      setDistrict,
      setSort,
    }}
  />
</div>

{/* PC: normal flow (NO sticky) */}
<div className="hidden md:block pt-2 pb-3 sticky top-[64px] z-10 bg-gray-50">
   <HospitalFilterBar
    filterSummary={filterSummary}
     specialtyName={specialtyName}
     onChangeSpecialty={() => router.push("/auth/agency/dashboard")}
     q={q}
     languageInput={languageInput}
     languageSuggestions={languageSuggestions}
     city={city}
     district={district}
     sort={sort}
     onChange={{
       setQ,
   setLanguageInput,
   setLanguageSelected,
       setCity,
       setDistrict,
       setSort,
     }}
   />
 </div>



  {/* ================= List ================= */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 pb-28">
    {isLoading
      ? Array.from({ length: 6 }).map((_, i) => (
          <HospitalCardSkeleton key={i} />
        ))
      : items.map((h) => (
          <HospitalCard key={h.id} hospital={h} />
        ))}
  </div>
</>


   );
}
