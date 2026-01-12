import { AgencyHospitalListItem } from "@/types/hospital";
import { MapPin, Globe } from "lucide-react";

interface Props {
  hospital: AgencyHospitalListItem;
}

export default function HospitalCardStatic({ hospital }: Props) {
  return (
    <div
      className="
        overflow-hidden rounded-xl
        border border-gray-200 bg-white
        flex items-stretch
      "
    >
      {/* 이미지 영역 */}
      <div className="w-1/3 h-28 bg-gray-100 overflow-hidden">
        {hospital.coverImageUrl ? (
          <img
            src={hospital.coverImageUrl}
            alt={hospital.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="flex-1 p-3 space-y-1 text-sm">
        {/* 병원명 */}
        <div className="font-semibold text-gray-900">
          {hospital.name}
        </div>

        {/* 위치 */}
        {hospital.location && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            {hospital.location.city} {hospital.location.district}
          </div>
        )}

        {/* 가격 */}
        <div className="inline-block rounded bg-blue-50 px-2 py-1 text-xs text-blue-900">
          {hospital.priceMin !== null && hospital.priceMax !== null ? (
            <>
              {(hospital.priceMin / 10000).toLocaleString()}만 ~{" "}
              {(hospital.priceMax / 10000).toLocaleString()}만원
            </>
          ) : (
            "수가 정보 없음"
          )}
        </div>

        {/* 대표 시술 */}
        {hospital.topProcedures.length > 0 && (
          <div className="text-xs text-gray-500 line-clamp-1">
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
                className="rounded-full bg-gray-100 px-2 py-0.5"
              >
                {lang}
              </span>
            ))}
          </div>
        )}

        {/* 수수료 */}
        <div className="pt-1 text-[11px] text-gray-600">
          수수료&nbsp;
          <span className="font-medium text-gray-900">
            정률 {hospital.agencyCommissionRate}% / 정액{" "}
            {hospital.settlementFlatAmount.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
