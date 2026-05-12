import Link from "next/link";
import { AgencyHospitalListItem } from "@/types/hospital";
import { MapPin, Globe, TrendingUp } from "lucide-react";
import StarRating from "@/components/common/StarRating";

interface Props {
  hospital: AgencyHospitalListItem;
}

const formatManWon = (value: number) => {
  const man = value / 10000;
  const truncated = Math.floor(man * 10) / 10;
  return truncated % 1 === 0 ? truncated.toFixed(0) : truncated.toFixed(1);
};

export default function HospitalCard({ hospital }: Props) {
  const displayRate =
    hospital.displayAgencyCommissionRate ?? hospital.agencyCommissionRate;
  const isVatExcluded = hospital.vatInputMode === "VAT_EXCLUDED";

  return (
    <Link
      href={`/auth/agency/hospitalslist/${hospital.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5"
    >
      {/* 이미지 (16:9) */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {hospital.coverImageUrl ? (
          <img
            src={hospital.coverImageUrl}
            alt={hospital.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-2xl font-bold text-gray-300">
              {hospital.name.charAt(0)}
            </span>
          </div>
        )}

        {/* 이미지 하단 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* 부가세 뱃지 — 이미지 우상단 */}
        <div className="absolute top-2 right-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${
              isVatExcluded
                ? "bg-orange-500/90 text-white"
                : "bg-sky-500/90 text-white"
            }`}
          >
            {isVatExcluded ? "매출 측정 부가세 제외" : "매출 측정 부가세 포함"}
          </span>
        </div>

        {/* 수수료 뱃지 — 이미지 좌하단 */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
          <TrendingUp className="h-3 w-3 text-emerald-300 shrink-0" />
          <span className="text-[11px] font-semibold text-white">
            수수료 {displayRate}%
          </span>
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="p-4 space-y-2.5">
        {/* 병원명 + 위치 */}
        <div>
          <div className="text-[15px] font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
            {hospital.name}
          </div>
          {hospital.location && (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>{hospital.location.city} {hospital.location.district}</span>
            </div>
          )}
        </div>

        {/* 별점 */}
        {typeof hospital.ratingAvg === "number" &&
          typeof hospital.ratingCount === "number" && (
            <div className="flex items-center gap-1.5">
              <StarRating value={hospital.ratingAvg} readOnly size={13} />
              <span className="text-xs font-semibold text-gray-800">
                {hospital.ratingAvg.toFixed(1)}
              </span>
              <span className="text-xs text-gray-400">
                ({hospital.ratingCount.toLocaleString()})
              </span>
            </div>
          )}

        {/* 가격 범위 */}
        <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2">
          <span className="text-[11px] font-medium text-blue-500">가격 범위</span>
          {hospital.priceMin !== null && hospital.priceMax !== null ? (
            <span className="text-[13px] font-bold text-blue-800">
              {formatManWon(hospital.priceMin)}만 ~ {formatManWon(hospital.priceMax)}만원
            </span>
          ) : (
            <span className="text-[12px] text-blue-300">수가 정보 없음</span>
          )}
        </div>

        {/* 대표 시술 */}
        {hospital.topProcedures.length > 0 && (
          <div className="text-[12px] text-gray-500 line-clamp-1">
            {hospital.topProcedures.join(" · ")}
          </div>
        )}

        {/* 상담 언어 */}
        {hospital.consultLanguages.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            <Globe className="h-3 w-3 text-gray-300 shrink-0" />
            {hospital.consultLanguages.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
              >
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
