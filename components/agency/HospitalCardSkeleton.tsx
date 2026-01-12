export default function HospitalCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border bg-white">
      {/* 이미지 */}
      <div className="aspect-video bg-gray-200" />

      <div className="p-4 space-y-3">
        {/* 병원명 */}
        <div className="h-4 w-3/4 rounded bg-gray-200" />

        {/* 위치 */}
        <div className="h-3 w-1/2 rounded bg-gray-200" />

        {/* 가격 */}
        <div className="h-4 w-2/3 rounded bg-gray-200" />

        {/* 시술 */}
        <div className="space-y-1">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
        </div>

        {/* 언어 chips */}
        <div className="flex gap-1">
          <div className="h-4 w-12 rounded-full bg-gray-200" />
          <div className="h-4 w-10 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* 수수료 */}
      <div className="border-t bg-gray-100 px-4 py-3">
        <div className="h-3 w-1/3 rounded bg-gray-200 mb-1" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
}
