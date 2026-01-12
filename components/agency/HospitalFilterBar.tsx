"use client";

import { Input } from "@/components/ui/input";
import { KR_CITIES, KR_DISTRICTS } from "@/lib/kr-location";
import { Select } from "@/components/ui/select";
import FilterBarBase from "@/components/common/FilterBarBase";
import LanguageAutocompleteInput from "@/components/agency/LanguageAutocompleteInput";


type SortType =
  | ""
  | "RATE_DESC"
  | "RATE_ASC"
  | "FLAT_DESC"
  | "FLAT_ASC";

interface HospitalFilterBarProps {
  filterSummary?: string;
  specialtyName?: string;
  onChangeSpecialty?: () => void;
  q: string;
  languageInput: string;
  languageSuggestions?: string[];
  city: string;
  district: string;
  sort: SortType;

  onChange: {
    setQ: (v: string) => void;
    setLanguageInput: (v: string) => void;
    setLanguageSelected: (v: string) => void;
    setCity: (v: string) => void;
    setDistrict: (v: string) => void;
    setSort: (v: SortType) => void;
  };
}


export default function HospitalFilterBar({
  filterSummary,
  specialtyName,
  onChangeSpecialty,
  q,
  languageInput,
  languageSuggestions = [],
  city,
  district,
  sort,
  onChange,
}: HospitalFilterBarProps) {
  return (
    <FilterBarBase>
  {specialtyName && (
    <div className="mb-2 flex items-center justify-between">
      <div className="text-sm font-medium text-gray-800">
        진료과: <span className="font-semibold">{specialtyName}</span>
      </div>
      <button
        type="button"
        onClick={onChangeSpecialty}
        className="text-xs text-blue-600 font-medium"
      >
        진료과 변경
      </button>
    </div>
  )}

  {filterSummary && (
    <div className="mb-2 text-xs text-gray-500 truncate">
      {filterSummary}
    </div>
  )}

      <div className="grid grid-cols-3 gap-2">
{/* 상담언어 (Autocomplete) */}
<LanguageAutocompleteInput
  value={languageInput}
  suggestions={languageSuggestions}
  onInputChange={(v) => {
    onChange.setLanguageInput(v);
  // 🔹 입력을 모두 지우면 필터 해제
  if (v.trim() === "") {
    onChange.setLanguageSelected("");
  }
  }}
 onSelect={(v) => {
   onChange.setLanguageInput(v);
   onChange.setLanguageSelected(v);
 }}
 onConfirm={(v) => {
   onChange.setLanguageInput(v);
   onChange.setLanguageSelected(v);
 }}
  placeholder="상담언어"
/>


  {/* 시/도 */}
  <Select
    value={city}
    onChange={(e) => {
      onChange.setCity(e.target.value);
      onChange.setDistrict("");
    }}
  >
    <option value="">시/도</option>
    {KR_CITIES.map((c: string) => (
      <option key={c} value={c}>
        {c}
      </option>
    ))}
  </Select>

  {/* 구 */}
  <Select
    value={district}
    disabled={!city}
    onChange={(e) => onChange.setDistrict(e.target.value)}
  >
    <option value="">구</option>
    {KR_DISTRICTS[city]?.map((d: string) => (
      <option key={d} value={d}>
        {d}
      </option>
    ))}
  </Select>

 {/* 검색 + 정렬 */}
 <div className="col-span-3 flex items-center gap-2">
   <Input
     className="flex-1 min-w-0"
     value={q}
     onChange={(e) => onChange.setQ(e.target.value)}
     placeholder="병원명 / 시술명 검색"
   />

   <Select
   className="w-[140px] shrink-0"
     value={sort}
     onChange={(e) => onChange.setSort(e.target.value as SortType)}
   >
     <option value="">정렬</option>
     <option value="RATE_DESC">수수료율 높은순</option>
     <option value="RATE_ASC">수수료율 낮은순</option>
     <option value="FLAT_DESC">정액 높은순</option>
     <option value="FLAT_ASC">정액 낮은순</option>
   </Select>
 </div>

      </div>
    </FilterBarBase>

  );
}
