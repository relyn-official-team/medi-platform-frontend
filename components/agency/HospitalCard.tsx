import Link from "next/link";
import { AgencyHospitalListItem } from "@/types/hospital";
import { MapPin, Globe } from "lucide-react";
import StarRating from "@/components/common/StarRating";

interface Props {
  hospital: AgencyHospitalListItem;
}

export default function HospitalCard({ hospital }: Props) {
  return (
<Link
  href={`/auth/agency/hospitalslist/${hospital.id}`}
  className="
    group block overflow-hidden rounded-xl
    border border-gray-200 bg-white
    transition hover:border-gray-300
  "
>
      {/* 이미지 (16:9) */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {hospital.coverImageUrl ? (
          <img
            src={hospital.coverImageUrl}
            alt={hospital.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        {/* 병원명 / 위치 */}
        <div>
          <div className="text-base font-semibold text-gray-900">
            {hospital.name}
          </div>
          {hospital.location && (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>
                {hospital.location.city} {hospital.location.district}
              </span>
            </div>
          )}
        </div>

{/* ⭐ 별점 요약 */}
{typeof hospital.ratingAvg === "number" &&
 typeof hospital.ratingCount === "number" && (
  <div className="flex items-center gap-2 text-xs text-gray-600">
    <StarRating value={hospital.ratingAvg} readOnly size={14} />
    <span className="font-medium text-gray-800">
      {hospital.ratingAvg.toFixed(1)}
    </span>
    <span className="text-gray-400">
      ({hospital.ratingCount.toLocaleString()})
    </span>
  </div>
)}

        {/* 가격 */}
 <div className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-900">
   <div className="text-xs text-blue-600 mb-0.5">가격 범위</div>
   {hospital.priceMin !== null && hospital.priceMax !== null ? (
     <>
       {(hospital.priceMin / 10000).toLocaleString()}만 ~{" "}
       {(hospital.priceMax / 10000).toLocaleString()}만원
     </>
   ) : (
     <span className="text-blue-300">수가 정보 없음</span>
   )}
 </div>
      

        {/* 대표 시술 */}
        {hospital.topProcedures.length > 0 && (
          <div className="text-xs text-gray-500 line-clamp-2">
            {hospital.topProcedures.join(", ")}
          </div>
        )}

        {/* 상담 언어 */}
        {hospital.consultLanguages.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 text-[11px] text-gray-600">
            <Globe className="h-3 w-3 text-gray-400" />
            {hospital.consultLanguages.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700"
              >
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 수수료 영역 */}
      <div className="px-4 pb-4 pt-2 text-xs text-gray-600">
       수수료:&nbsp;
        <span className="font-medium text-gray-900">
          정률 {hospital.agencyCommissionRate}% / 정액{" "}
          {hospital.settlementFlatAmount.toLocaleString()}원
        </span>
      </div>

    </Link>
  );
}
