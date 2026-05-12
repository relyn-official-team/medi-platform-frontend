export default function HospitalCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* 이미지 */}
      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-100" />

      <div className="p-4 space-y-3">
        {/* 병원명 + 위치 */}
        <div className="space-y-1.5">
          <div className="h-4 w-3/4 rounded-lg bg-gray-200" />
          <div className="h-3 w-2/5 rounded-lg bg-gray-100" />
        </div>

        {/* 별점 */}
        <div className="h-3 w-1/3 rounded-lg bg-gray-100" />

        {/* 가격 범위 박스 */}
        <div className="h-9 w-full rounded-xl bg-gray-100" />

        {/* 대표 시술 */}
        <div className="h-3 w-5/6 rounded-lg bg-gray-100" />

        {/* 언어 chips */}
        <div className="flex gap-1.5">
          <div className="h-5 w-12 rounded-full bg-gray-100" />
          <div className="h-5 w-10 rounded-full bg-gray-100" />
          <div className="h-5 w-14 rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
