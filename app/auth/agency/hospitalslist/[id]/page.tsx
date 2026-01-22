"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { AgencyHospitalDetail } from "@/types/hospital";
import MobileHeader from "@/components/agency/MobileHeader";
import { useCallback } from "react";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import StarRating from "@/components/common/StarRating";


export default function AgencyHospitalDetailPage() {

  const params = useParams();
  const id = String(params.id);
  const router = useRouter();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [data, setData] = useState<AgencyHospitalDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await api.get<AgencyHospitalDetail>(
          `/agency/hospitals/${id}`
        );
        setData(res.data);
      } catch (e) {
        console.error("Failed to load hospital detail", e);
      }
    })();
  }, [id]);

  
const handleDirectChat = useCallback(async () => {
  try {
const res = await api.post<{
  reservationId: number;
  reused: boolean;
}>("/chat/pre-reservations", {
  hospitalId: id,
  patientName: "상담 요청",
  language: null,
});

const reservationId = res.data.reservationId;

   if (!reservationId) {
      throw new Error("reservationId not returned");
    }

    router.push(`/auth/chat/${reservationId}`);
 } catch (e) {
    console.error("Failed to create pre-chat reservation", e);
    alert("채팅을 시작할 수 없습니다. 잠시 후 다시 시도해주세요.");
  }
}, [id, router]);

  if (!data) return <div>Loading...</div>;



  return (
<>
  <MobileHeader title={data.name} />

  <div className="pb-24">



{/* Hero Image Swiper */}
<div className="aspect-video bg-gray-100 overflow-hidden">
  {data.images?.length > 0 ? (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={0}
      slidesPerView={1}
      className="w-full h-full"
    >
      {[
        ...data.images.filter((i) => i.isCover),
        ...data.images.filter((i) => !i.isCover),
      ].map((img, idx) => (
        <SwiperSlide key={`${img.url}-${idx}`}>
          <img
            loading="lazy"
            src={img.url}
            alt={`${data.name}-${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
      No Image
    </div>
  )}
</div>



     {/* Basic Info */}
     <section className="mx-auto max-w-3xl px-4 mt-4">
       <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
        <div className="text-lg font-semibold">{data.name}</div>

{typeof (data as any).ratingAvg === "number" && typeof (data as any).ratingCount === "number" && (
  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
    <StarRating value={(data as any).ratingAvg} readOnly size={16} />
    <span className="font-medium text-gray-900">
      {(data as any).ratingAvg.toFixed(1)}
    </span>
    <span className="text-gray-400">
      ({data.ratingCount})
    </span>
  </div>
)}

         {data.location && (
           <div className="text-sm text-gray-600">
             {data.location.city} {data.location.district}
           </div>
         )}

         {data.consultLanguages?.length > 0 && (
           <div className="flex flex-wrap gap-1 text-xs text-gray-600">
             {data.consultLanguages.map((lang) => (
               <span
                 key={lang}
                className="px-2 py-0.5 rounded-full bg-gray-100"
               >
                 {lang}
               </span>
             ))}
           </div>
         )}
       </div>
     </section>

     {/* Commission */}
     <section className="mx-auto max-w-3xl px-4 mt-3">
       <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-900">
         수수료:&nbsp;
<span className="font-medium">
  정률 {data.agencyCommissionRate}% / 정액{" "}
  {data.settlementFlatAmount.toLocaleString()}원
</span>
       </div>
     </section>

{/* 의료진옵션 */}
{(data.hasSpecialist || data.canSelectDirector) && (
  <section className="mx-auto max-w-3xl px-4 mt-4">
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="font-semibold mb-2">의료진 옵션</div>

      <div className="flex flex-wrap gap-2">
        {data.hasSpecialist && (
          <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
            전문의 진료
          </span>
        )}
        {data.canSelectDirector && (
          <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
            원장 지정 가능
          </span>
        )}
      </div>
    </div>
  </section>
)}

{Array.isArray(data.signatureCares) && data.signatureCares.length > 0 && (
  <section className="mx-auto max-w-3xl px-4 mt-4">
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
      <div className="font-semibold">시그니처 케어</div>

      <div className="space-y-3">
        {data.signatureCares.map((care, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-100 p-3 space-y-2"
          >
            <div className="text-sm font-medium text-gray-900">
              {care.title}
            </div>

            {care.description && (
              <div className="text-sm text-gray-600 whitespace-pre-wrap">
                {care.description}
              </div>
            )}

            {care.images?.length > 0 && (
              <div className="flex gap-2 overflow-x-auto">
                {care.images.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    className="h-20 w-20 rounded-md object-cover border cursor-pointer hover:opacity-80"
                    onClick={() => setPreviewImage(url)}
                    alt={`signature-${idx}-${i}`}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)}


{/* Pricing Items */}
{data.pricingItems?.length > 0 && (
  <section className="mx-auto max-w-3xl px-4 mt-4">
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">[Price list]</div>

    <Dialog>
   <DialogTrigger asChild>
     <button className="text-xs text-blue-600 font-medium">
      전체 보기</button>
   </DialogTrigger>

  <DialogContent className="max-w-md sm:max-w-lg max-h-[80vh]">
    <DialogHeader>
      <DialogTitle>시술 및 가격</DialogTitle>
    </DialogHeader>

    <div className="mt-2 space-y-3 overflow-y-auto max-h-[calc(80vh-64px)]">
      {data.pricingItems.map((item) => (
        <div
          key={item.id}
          className="flex items-start justify-between gap-3 border-b pb-2"
        >
          <div>
            <div className="text-sm font-medium">
              {item.procedureName}
            </div>

            {item.note && (
              <div className="text-xs text-gray-500 mt-0.5">
                {item.note}
              </div>
            )}
          </div>

<div className="text-right whitespace-nowrap">
 {item.originalPrice != null && (
   <div className="text-xs text-gray-400 line-through">
     {item.originalPrice.toLocaleString()}원
   </div>
 )}
  <div className="text-sm text-blue-700 font-medium">
    {item.discountPrice != null
      ? `${item.discountPrice.toLocaleString()}원`
      : "-"}
  </div>
</div>

        </div>
      ))}
    </div>
  </DialogContent>
</Dialog>
 </div> {/* header row */}


      <ul className="space-y-2">
        {data.pricingItems.slice(0, 5).map((item) => (
  <li
    key={item.id}
    className="flex items-start justify-between text-sm gap-3"
  >
  {/* 왼쪽: 시술명 */}
  <div className="text-gray-800">
    {item.procedureName}
  </div>

  {/* 오른쪽: 가격 */}
  <div className="flex flex-col items-end whitespace-nowrap">
    {item.originalPrice != null && (
      <div className="text-xs text-gray-400 line-through">
        {item.originalPrice.toLocaleString()}원
      </div>
    )}

    {item.discountPrice != null && (
      <div className="text-sm text-blue-700 font-semibold">
        {item.discountPrice.toLocaleString()}원
      </div>
    )}
  </div>
</li>

        ))}
      </ul>
    </div>
  </section>
)}


{/* Specialties */}
{data.specialties.length > 0 && (
  <section className="mx-auto max-w-3xl px-4 mt-4">
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="font-semibold mb-3">진료 과목</div>

      <div className="flex flex-wrap gap-2">
        {data.specialties.map((s) => (
          <span
            key={s.specialty.id}
            className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
          >
            {s.specialty.name}
          </span>
        ))}
      </div>
    </div>
  </section>
)}


      {data.introduction && (
 <section className="mx-auto max-w-3xl px-4 mt-4">
   <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="font-semibold mb-2">병원 소개</div>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">{data.introduction}</div>
          </div>
        </section>
      )}

      {data.afterCare && (
 <section className="mx-auto max-w-3xl px-4 mt-4">
   <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="font-semibold mb-2">애프터케어</div>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">{data.afterCare}</div>
          </div>
        </section>
      )}
    </div>
    

   {/* Fixed CTA */}
     <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200">
       <div className="max-w-3xl mx-auto px-4 py-3">
<div className="flex gap-2">
  {/* 채팅 상담 */}
  <Button
    variant="outline"
    className="flex-1"
    onClick={handleDirectChat}
  >
    채팅 상담
  </Button>

  {/* 예약 신청 */}
  <Link
    href={`/auth/agency/hospitalslist/${id}/booking`}
    className="flex-1"
  >
    <Button className="w-full">예약 신청</Button>
  </Link>
</div>
       </div>
     </div>

     <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>이미지 미리보기</DialogTitle>
    </DialogHeader>

    {previewImage && (
      <div className="space-y-3">
        <img
          src={previewImage}
          alt="signature-preview"
          className="w-full rounded-lg border"
        />

        <a
          href={previewImage}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-blue-600 font-medium"
        >
          이미지 다운로드
        </a>
      </div>
    )}
  </DialogContent>
</Dialog>

     </>
     

  );
}
