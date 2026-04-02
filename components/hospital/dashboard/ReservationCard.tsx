"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ReservationStatusBadgeClass,
  ReservationStatusLabel,
} from "@/constants/reservationStatus";
import {
  Calendar,
  Clock,
  Globe2,
  MessageCircle,
  Phone,
  AlertCircle,
  Languages,
  Syringe,
  Receipt,
  HelpCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ReservationCardView, ReservationStatus } from "@/types/reservation";
import { isSettlementPendingView } from "@/utils/isSettlementPendingView";

import api from "@/lib/api";
import { ReservationStatusHistoryView } from "@/types/reservation";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { ReservationChangeReasonLabel } 
   from "@/constants/reservationChangeReason";

import StarRating from "@/components/common/StarRating";



type SettlementCalcType = "PERCENTAGE" | "PER_RESERVATION";


interface HospitalSettings {
  settlementCalcType: SettlementCalcType;
  settlementFlatAmount: number;
  platformCommissionRate: number;
  platformFlatAmount: number;
  agencyCommissionRate: number;
  platformFeeExposureType?: "EXCLUDED" | "INCLUDED";
  vatInputMode?: "VAT_INCLUDED" | "VAT_EXCLUDED";
}

interface ReservationCardProps {
  onRefresh?: () => Promise<void>;
  reservation: ReservationCardView;
  onHistoryRead?: (id: number) => void;
  hospitalSettings?: HospitalSettings | null;
  onStatusChange: (
    id: number,
    newStatus: ReservationStatus,
    extraAmount?: number,
   meta?: { reason?: string }
  ) => void | Promise<void>;
  onLoadAgencyContact?: (agencyId: string) => Promise<void>;
  onLoadHospitalContact?: (hospitalId: string) => Promise<void>;
  mode?: "HOSPITAL" | "AGENCY" | "ADMIN"; // 🔥 추가
}

function formatPatientBirthOrAge(value?: number | null) {
  if (value == null) return null;

  const raw = String(value);

  if (/^\d{8}$/.test(raw)) {
    return `${raw.slice(0, 4)}. ${raw.slice(4, 6)}. ${raw.slice(6, 8)}`;
  }

  return raw;
}

  export default function ReservationCard({
    onRefresh,
    reservation,
    onHistoryRead,
    hospitalSettings,
    onStatusChange,
    onLoadHospitalContact,
    onLoadAgencyContact,
    mode,
  }: ReservationCardProps) {
    const router = useRouter();
    const [contactOpen, setContactOpen] = useState(false);
    const [settleOpen, setSettleOpen] = useState(false);
    const [inputAmount, setInputAmount] = useState<string>("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [historyOpen, setHistoryOpen] = useState(false);
    const [historyItems, setHistoryItems] = useState<ReservationStatusHistoryView[]>([]);

    const resolvedMode: "HOSPITAL" | "AGENCY" | "ADMIN" = mode ?? "HOSPITAL";

    const isPending = reservation.status === "PENDING";
    const isConfirmed = reservation.status === "CONFIRMED";
    const isSettlement = reservation.status === "SETTLEMENT";
    const isSettled = reservation.status === "SETTLED";
    const isCancelled = reservation.status === "CANCELLED";



    const isHospital = resolvedMode === "HOSPITAL";
    const isAgency = resolvedMode === "AGENCY";
    const isAdmin = resolvedMode === "ADMIN";

    const hasExistingPayment = !!reservation.paymentAmount;

    const chatCtaLabel =
    reservation.status === "CANCELLED"
     ? "채팅 보기"
     : "채팅하기";

         const settlementPending =
    isHospital && isSettlementPendingView(reservation);

   const canCopyReservation =
   isAgency &&
   isCancelled &&
   !!reservation.hospitalId;

    const canConfirm = isHospital && isPending && !isAdmin;

// 병원: CONFIRMED 상태에서만
 const canHospitalSettle =
   isHospital && (isConfirmed || isSettlement) && !isAdmin;

// 에이전시: SETTLEMENT 상태에서만
const canAgencyConfirm =
  isAgency &&
  isSettlement &&
  !!reservation.paymentAmount;


const canCancel =
  !isAdmin &&
  !isSettled &&
  !isCancelled &&
  (
    isHospital
      ? isPending || isConfirmed || isSettlement
      : isAgency && isPending
  );

const patientBirthOrAgeLabel = useMemo(() => {
  return formatPatientBirthOrAge(reservation.patientAge);
}, [reservation.patientAge]);

    const reservationDateLabel = useMemo(() => {
       if (!reservation.reservationDate) return "-";
      const date = new Date(reservation.reservationDate);
      return date.toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
      });
    }, [reservation.reservationDate]);

    const amount = useMemo(() => {
      const parsed = Number(String(inputAmount).replace(/,/g, ""));
      if (!parsed || parsed <= 0) return null;

      const total = Math.floor(parsed);
      const THRESHOLD = 0;
 const PLATFORM_FLAT_FEE =
   reservation.platformSettlementAmount ??
   hospitalSettings?.platformFlatAmount ??
   12_000;

 const PLATFORM_RATE =
   reservation.platformCommissionRate ??
   hospitalSettings?.platformCommissionRate ??
   2.5;

const agencyRate =
 reservation.agencyCommissionRate ??
 reservation.expectedAgencyCommissionRate ??
 0;

const agencyFlat =
 reservation.agencySettlementAmount ??
 reservation.expectedAgencySettlementAmount ??
 0;


      const agencyFee =
        total <= THRESHOLD
          ? Math.max(0, Math.floor(agencyFlat))
          : Math.max(0, Math.floor(total * (agencyRate / 100)));

      const platformFee =
        total <= THRESHOLD
          ? PLATFORM_FLAT_FEE
          : Math.max(0, Math.floor(total * (PLATFORM_RATE / 100)));



      return {
        total,
        platformFee,
        agencyFee,
      };
    }, [inputAmount, hospitalSettings]);


  // 이미 정산이 끝났다면, 기존 값 기준으로 표기용 계산
const settledAmount = useMemo(() => {
  if (!reservation.paymentAmount) return null;

  return {
    total: reservation.paymentAmount,
    platformFee: reservation.platformFee ?? 0,
    agencyFee: reservation.settlementAmount ?? 0,
  };
}, [reservation]);

  const handleConfirm = async () => {
    await onStatusChange(reservation.id, "CONFIRMED");
    setConfirmOpen(false);
  };

const handleCancel = async () => {
  if (!cancelReason.trim()) return;

  await onStatusChange(
    reservation.id,
    "CANCELLED",
    undefined,
    { reason: cancelReason }
  );

  setCancelReason("");
  setCancelOpen(false);
};

  const handleOpenContact = async () => {
 if (resolvedMode === "HOSPITAL" && reservation.agencyId && onLoadAgencyContact) {
   await onLoadAgencyContact(reservation.agencyId);
 }

 if (resolvedMode  === "AGENCY" && reservation.hospitalId && onLoadHospitalContact) {
   await onLoadHospitalContact(reservation.hospitalId);
 }
    setContactOpen(true);
  };

// 병원: 매출 입력 → SETTLEMENT
const handleHospitalSettle = async () => {
  if (!amount) return;

  try {
  await api.patch(
    `/reservations/status/${reservation.id}/settle`,
    { paymentAmount: amount.total }
  );

  setSettleOpen(false);
  setInputAmount("");
  await onRefresh?.();

 } catch (e: any) {
   const msg =
     e?.response?.data?.message ??
     "정산 처리 중 오류가 발생했습니다.";

   alert(msg);
 }
};

// 에이전시: 정산 확인 → SETTLED
const handleAgencyConfirmSettlement = async () => {
  try {
    await api.patch(
      `/reservations/status/${reservation.id}/confirm-settlement`,
      {
        rating: {
          score: ratingScore,
          comment: ratingComment.trim() || undefined,
        },
      }
    );

    // ✅ 가장 단순하고 확실한 방식
    window.location.reload();

  } catch (e: any) {
    const msg =
      e?.response?.data?.message ??
      "정산 확인 처리 중 오류가 발생했습니다.";
    alert(msg);
  }
};




  const displayStatus: ReservationStatus =
  isHospital && settlementPending && !isSettled &&!isAdmin
   ? "SETTLEMENT"
   : reservation.status;

useEffect(() => {
  if (!historyOpen) return;

  const fetchHistory = async () => {
    try {
      const res = await api.get<ReservationStatusHistoryView[]>(
        `/reservations/status/${reservation.id}/history`
      );
      setHistoryItems(res.data);


    } catch (e) {
      console.error("Failed to load history", e);
      setHistoryItems([]);
    }
  };

  fetchHistory();
}, [historyOpen, reservation.id]);

useEffect(() => {
   if (settleOpen && reservation.paymentAmount) {
     setInputAmount(String(reservation.paymentAmount));
   }
 }, [settleOpen, reservation.paymentAmount]);


const handleChatClick = () => {
  if (typeof window === "undefined") return;

  const url = `/auth/chat/${reservation.id}`;
  const isMobile = window.innerWidth < 768;

  // 모바일 → 같은 탭
  if (isMobile) {
    router.push(url);
    return;
  }

  // PC → 채팅 전용 새 창 (재사용)
  //const CHAT_WINDOW_NAME = "relyn-chat-window";

  // PC → 예약별 채팅 전용 새 창 (같은 예약은 같은 창 재사용, 다른 예약은 별도 창으로 열림)
  const CHAT_WINDOW_NAME = `relyn-chat-window-${reservation.id}`;

  const width = 420;
  const height = Math.min(800, window.screen.height - 120);

  const left = window.screenX + window.innerWidth - width - 24;
  const top = window.screenY + 80;

  window.open(
    url,
    CHAT_WINDOW_NAME,
    [
      "popup=yes",
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      "resizable=yes",
      "scrollbars=yes",
    ].join(",")
  );
};

const settlementTypeLabel = useMemo(() => {
  if (!reservation.paymentAmount) return null;
  return reservation.paymentAmount <= 0 ? "정액" : "정률";
}, [reservation.paymentAmount]);

const [agencyConfirmOpen, setAgencyConfirmOpen] = useState(false);
const [ratingScore, setRatingScore] = useState<number>(5);
const [ratingComment, setRatingComment] = useState<string>("");

const handleCloseHistory = () => {
  onHistoryRead?.(reservation.id);
  setHistoryOpen(false);
};

const [detailOpen, setDetailOpen] = useState(false);
const [detailType, setDetailType] =
   useState<"PROCEDURE" | "MEMO" | null>(null);



return (
  <div
    className={`relative overflow-hidden rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow border ${
      isCancelled ? "bg-gray-50 border-gray-300 opacity-80"
      : settlementPending && !isSettled && !isAdmin
        ? "border-orange-400 bg-orange-50/40"
        : "border-gray-200"
    }`}
  >
    {/* 헤더: 환자 정보 + 상태 */}
<div className="flex items-start justify-between mb-4">
  {/* 좌측 정보 */}
  <div className="flex flex-col gap-1">

          {/* 환자명 + 나이 + 긴급 */}
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-gray-900">
              {reservation.patientName}
            </h2>
            <span className="text-xs text-gray-500">
              {patientBirthOrAgeLabel}
            </span>

           {reservation.patientGender && (
             <span className="inline-flex items-center rounded-full border border-gray-200 px-2 py-0.5 text-[11px] text-gray-600">
               {reservation.patientGender === "MALE" ? "남자" : "여자"}
             </span>
           )}

            {reservation.isUrgent && (
              <span className="flex items-center gap-1 text-xs text-red-600">
                <AlertCircle className="w-3 h-3" />
                긴급
              </span>
            )}
          </div>

          {/* 국적 + 언어 */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Globe2 className="w-3 h-3 text-gray-400" />
            <span>{reservation.patientNationality}</span>

            {reservation.language && (
              <>
                <span className="text-gray-300">|</span>
                <Languages className="w-3 h-3 text-gray-400" />
                <span>{reservation.language}</span>
              </>
            )}
          </div>
        </div>

        {/* 우측 상태 영역 */}
        <div className="flex flex-col items-end gap-1">
        {/* 변경이력 조회 버튼 */}
        <button
          type="button"
          onClick={() => setHistoryOpen(true)}
          className="relative text-[11px] text-gray-500 hover:underline"
        >
          변경이력
          {/* 🔔 신규 히스토리 알림 (추후 서버 플래그 연동) */}
          {reservation.hasUnreadHistory && (
            <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>


          {/* 상태 Badge */}
          <Badge
            className={`text-xs px-2 py-0.5 border ${ReservationStatusBadgeClass[displayStatus]}`}
          >
            {ReservationStatusLabel[displayStatus]}
          </Badge>

          {/* 정산 가능 알림 */}
          {settlementPending && !isSettled && !isAdmin && (
            <div className="flex items-center gap-1 text-[11px] text-orange-600 mt-1">
              <AlertCircle className="w-3 h-3" />
              <span>정산 가능 (예약일 경과)</span>
            </div>
          )}
        </div>
      </div>

      {/* 예약 생성일 */}
{reservation.createdAt && (
  <div className="text-[11px] text-gray-400 mt-0.5">
    예약 생성일 ·{" "}
    {new Date(reservation.createdAt).toLocaleDateString("ko-KR")}
  </div>
)}


      {/* 본문: 에이전시, 예약 일시, 희망시술, 메모 */}
        {/* 본문 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 mb-4">

          {/* 좌측 */}
          <div className="flex flex-col gap-2">

            {/* 에이전시 */}
<div className="flex flex-col gap-1">
  {isAdmin ? (
    <>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 w-14">병원</span>
        <span className="font-medium">
          {reservation.hospitalName ?? "-"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 w-14">에이전시</span>
        <span className="font-medium">
          {reservation.agencyName ?? "-"}
        </span>
      </div>
    </>
  ) : (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 w-14">
        {isAgency ? "병원" : "에이전시"}
      </span>
      <span className="font-medium">
        {isAgency
          ? reservation.hospitalName ?? "-"
          : reservation.agencyName ?? "-"}
      </span>
    </div>
  )}
</div>

            {/* 희망시술 */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 w-14 shrink-0 whitespace-nowrap">희망시술</span>
 <Button
   size="sm"
   variant="subtle"
  className="
    text-orange-600 bg-orange-50 hover:bg-orange-100
    px-2 py-1 h-auto text-left
    whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1
    max-w-full
  "
   onClick={() => {
     setDetailType("PROCEDURE");
     setDetailOpen(true);
   }}
 >
   {reservation.procedureName}
 </Button>
            </div>

            {/* 메모 */}
            {reservation.memo && (
              <div className="flex items-start gap-2">
                <span className="text-gray-400 w-14 shrink-0 whitespace-nowrap">메모</span>
   <Button
     size="sm"
    variant="subtle"
     className="
  text-orange-600 bg-orange-50 hover:bg-orange-100
  px-2 py-1 h-auto text-left
  whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1
  max-w-full
"
     onClick={() => {
       setDetailType("MEMO");
       setDetailOpen(true);
     }}
   >
     {reservation.memo}
   </Button>
              </div>
            )}
          </div>

          {/* 우측 */}
          <div className="flex flex-col gap-2">

            {/* 예약일 */}
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-gray-500 w-16">예약일</span>
              <span className="font-medium">{reservationDateLabel}</span>
            </div>

            {/* 예약시간 */}
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-gray-500 w-16">예약시간</span>
              <span className="font-medium">{reservation.reservationTime}</span>
            </div>

            {/* 옵션 배지 */}
            <div className="flex flex-wrap gap-2 mt-1">

              {/* 수면마취 */}
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-gray-200">
                <Syringe
                  className={`w-3 h-3 ${reservation.needSedation ? "text-blue-600" : "text-gray-300"}`}
                />
                <span className={reservation.needSedation ? "text-blue-700" : "text-gray-400"}>
                  수면마취
                </span>
              </span>

              {/* 텍스리펀 */}
              {/*<span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-gray-200">
                <Receipt
                  className={`w-3 h-3 ${reservation.needTaxRefund ? "text-blue-600" : "text-gray-300"}`}
                />
                <span className={reservation.needTaxRefund ? "text-blue-700" : "text-gray-400"}>
                  텍스리펀
                </span>
              </span>*/}

              {/* 통역 */}
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-gray-200">
                <Languages
                  className={`w-3 h-3 ${reservation.needInterpreter ? "text-blue-600" : "text-gray-300"}`}
                />
                <span className={reservation.needInterpreter ? "text-blue-700" : "text-gray-400"}>
                  통역필요
                </span>
              </span>
            </div>
          </div>
        </div>

{(reservation.agencyCommissionRate != null ||
 reservation.agencySettlementAmount != null ||
 reservation.expectedAgencyCommissionRate != null ||
 reservation.expectedAgencySettlementAmount != null) && (
  <div className="mb-3 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-[11px] text-gray-700">
    <div className="font-semibold text-gray-800 mb-1">
      {reservation.settlementAppliedAt
        ? "적용된 수수료 기준"
        : "예상 수수료 기준 (정산 시 확정)"}
    </div>
    

    <div className="space-y-0.5">
      <div>
        기준일:&nbsp;
        <span className="font-medium">
          {reservation.settlementAppliedAt && (
  <span className="font-medium">
    {new Date(reservation.settlementAppliedAt as string | Date).toLocaleDateString("ko-KR")}
  </span>
)}
        </span>
      </div>

<div>
  에이전시 수수료율:&nbsp;
  {(reservation.agencyCommissionRate ?? reservation.expectedAgencyCommissionRate) != null && (
    <span className="font-medium">
      정률 {reservation.agencyCommissionRate ?? reservation.expectedAgencyCommissionRate}%
    </span>
  )}
{/*
  {(reservation.agencySettlementAmount ?? reservation.expectedAgencySettlementAmount) != null && (
    <span className="font-medium">
      {" "} / 정액 {(reservation.agencySettlementAmount ?? reservation.expectedAgencySettlementAmount)!.toLocaleString()}원
    </span>
  )}
*/}
</div>


         {(isHospital || isAdmin) && (   // 🔥 이 조건만 추가
      <div>
        플랫폼 수수료율:&nbsp;
        {(reservation.platformCommissionRate ?? reservation.expectedPlatformCommissionRate) != null && (
          <span className="font-medium">
            정률 {reservation.platformCommissionRate ?? reservation.expectedPlatformCommissionRate}%
          </span>
        )}
{/*
        {(reservation.platformSettlementAmount ?? reservation.expectedPlatformSettlementAmount) != null && (
          <span className="font-medium">
           {" "} / 정액 {(reservation.platformSettlementAmount ?? reservation.expectedPlatformSettlementAmount)!.toLocaleString()}원
          </span>
        )}
*/}
      </div>
         )}

    </div>
  </div>
)}


      {/* 정산 정보 요약 (이미 정산된 경우) */}
          {settledAmount && (
            <div className="mt-4 mb-4 rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-[11px] text-green-800">
<div className="flex items-center justify-between mb-1">
  <div className="flex items-center gap-2">
    <Receipt className="w-3 h-3" />
    <span className="font-semibold">정산 정보</span>
  </div>

{settlementTypeLabel && (
  <div className="relative group">
    <div
      className={`flex items-center gap-1 text-[10px] leading-none px-2 py-1 rounded-md whitespace-nowrap border cursor-help
        ${
          settlementTypeLabel === "정률"
            ? "bg-blue-100 text-blue-700 border-blue-200"
            : "bg-green-100 text-green-700 border-green-200"
        }`}
    >
      <span>{settlementTypeLabel} 적용</span>
      <HelpCircle className="w-3 h-3 opacity-70" />
    </div>

    {/* Tooltip */}
    <div className="pointer-events-none absolute right-0 top-full z-50 mt-1 w-[200px]
      rounded-md bg-gray-900 px-2 py-1.5 text-[10px] text-white opacity-0
      group-hover:opacity-100 transition-opacity">
      <div className="leading-relaxed">
        매출 금액 기준으로 수수료 액수가 계산됩니다.<br />
{/* 
        · 50만원 이하: 정액<br />
        · 50만원 초과: 정률
*/}
      </div>
    </div>
  </div>
)}

</div>

              
              
              <div className="flex flex-col gap-1 pl-5">
                <span>결제금액: {settledAmount.total.toLocaleString()}원</span>
                <span>에이전시 수수료: {settledAmount.agencyFee.toLocaleString()}원</span>
 {(isHospital || isAdmin) && (
   <span>
     플랫폼 수수료: {settledAmount.platformFee.toLocaleString()}원
   </span>
 )}
              </div>
            </div>
          )}


          {/* 푸터: 에이전시 커뮤니케이션 + 상태 변경 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3 border-t border-gray-100 mt-4 min-h-[44px]">

          {/* 좌측: 연락/채팅 */}
          <div className="flex gap-2 flex-1">
            <Button variant="outline" size="sm" className="flex-1"
              onClick={handleChatClick}>
              <MessageCircle className="w-4 h-4 mr-1" />
              {chatCtaLabel}
            </Button>

 {(isAgency) && (
   <Button
     variant="outline"
     size="sm"
     className="flex-1"
     onClick={handleOpenContact}
   >
     <Phone className="w-4 h-4 mr-1" />
     연락처 보기
   </Button>
 )}
          </div>


          {/* 우측: 상태 변경 */}
          <div className="flex items-center gap-2 justify-end flex-nowrap relative">

            {canCopyReservation && (
  <Button
    size="sm"
    variant="outline"
    onClick={() => {
      router.push(
        `/auth/agency/hospitalslist/${reservation.hospitalId}/booking?copyFrom=${reservation.id}`
      );
    }}
  >
    예약복사하기
  </Button>
)}


            {/* 1) 예약대기 → 확정하기 + 취소 */}
            {isPending && isHospital && (
              <>
                {/* 예약 확정 */}
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      예약 확정하기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>예약을 확정하시겠습니까?</DialogTitle>
                      <DialogDescription>
                        환자 정보를 확인하고 예약을 확정합니다.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span className="text-gray-400">환자명</span>
                        <span>
  {reservation.patientName}
  {patientBirthOrAgeLabel ? ` (${patientBirthOrAgeLabel})` : ""}
</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">예약일시</span>
                        <span>{reservationDateLabel} {reservation.reservationTime}</span>
                      </div>
                    </div>

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setConfirmOpen(false)}>취소</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleConfirm}>
                        예약 확정
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>


              </>
            )}

            {/* 2) 정산 가능 상태 → 정산하기 버튼 + 취소 버튼 */}
            {canHospitalSettle && (
              <>
                {/* 정산하기 */}
                <Dialog open={settleOpen} onOpenChange={setSettleOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      매출입력
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>정산 처리</DialogTitle>
<DialogDescription>
  에이전시 확인 후 정산을 완료합니다.<br />
  {hospitalSettings?.vatInputMode === "VAT_EXCLUDED" ? (
    <>
      ⚠️VAT(부가세) 제외 매출액수로 작성 부탁드립니다.<br />
      ⚠️수수료율은 병원 설정값 그대로 적용됩니다.<br />
    </>
  ) : (
    <>
      ⚠️VAT(부가세) 포함 매출액수로 작성 부탁드립니다.<br />
      ⚠️수수료율은 병원 설정값 그대로 적용됩니다.<br />
    </>
  )}
</DialogDescription>
                      
 {hasExistingPayment && (
   <div className="mt-2 rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
     이미 매출이 입력된 예약입니다.<br />
     수정 시 기존 정산 금액은 덮어쓰기 처리됩니다.
   </div>
 )}
                    </DialogHeader>
                      <div className="space-y-3 mt-3">
                        {/* 환자/에이전시/시술 정보 블록 */}
<div className="rounded-md bg-gray-50 p-3 text-xs text-gray-700 space-y-1">
  {/* 환자 */}
  <div className="flex justify-between">
    <span className="text-gray-400">환자</span>
    <span>
 {reservation.patientName} (
   {patientBirthOrAgeLabel ?? "-"},
   {reservation.patientGender === "MALE"
     ? "남자"
     : reservation.patientGender === "FEMALE"
     ? "여자"
     : "-"},
   {reservation.patientNationality}
 )
    </span>
  </div>

  {/* 에이전시 */}
<div className="flex flex-col gap-1">
  {isAdmin ? (
    <>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 w-14">병원</span>
        <span className="font-medium">
          {reservation.hospitalName ?? "-"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 w-14">에이전시</span>
        <span className="font-medium">
          {reservation.agencyName ?? "-"}
        </span>
      </div>
    </>
  ) : (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 w-14">
        {isAgency ? "병원" : "에이전시"}
      </span>
      <span className="font-medium">
        {isAgency
          ? reservation.hospitalName ?? "-"
          : reservation.agencyName ?? "-"}
      </span>
    </div>
  )}
</div>

  {/* 희망시술 */}
  <div className="flex justify-between">
    <span className="text-gray-400">희망시술</span>
    <span className="text-right">{reservation.procedureName}</span>
  </div>

  {/* 예약일 */}
  <div className="flex justify-between">
    <span className="text-gray-400">예약일</span>
    <span className="text-right">
      {reservationDateLabel} {reservation.reservationTime}
    </span>
  </div>

  {/* 메모 */}
  <div className="flex justify-between">
    <span className="text-gray-400">메모</span>
    <span className="text-right whitespace-pre-line">
      {reservation.memo ?? "-"}
    </span>
  </div>
</div>


 {hasExistingPayment && (
   <div className="rounded-md bg-gray-50 border border-gray-200 p-3 text-xs text-gray-700 space-y-1">
     <div className="font-semibold text-gray-800 mb-1">
       기존 입력된 매출 정보
     </div>

     <div className="flex justify-between">
       <span className="text-gray-400">결제금액</span>
       <span className="font-medium">
         {reservation.paymentAmount!.toLocaleString()}원
       </span>
     </div>

     <div className="flex justify-between">
       <span className="text-gray-400">에이전시 수수료</span>
       <span>
         {reservation.settlementAmount?.toLocaleString() ?? 0}원
       </span>
     </div>

     <div className="flex justify-between">
       <span className="text-gray-400">플랫폼 수수료</span>
       <span>
         {reservation.platformFee?.toLocaleString() ?? 0}원
       </span>
     </div>
   </div>
 )}



                        {/* 결제 금액 입력 */}
                        <Input
                          placeholder="결제 금액 입력 (원)"
                          value={inputAmount}
                          onChange={(e) => setInputAmount(e.target.value)}
                        />

                        {/* 정산 금액 요약 */}
                        {isHospital && amount && (
                          <div className="text-xs text-gray-700 space-y-1">
                            <p>결제금액: {amount.total.toLocaleString()}원</p>
                            <p>플랫폼 수수료: {amount.platformFee.toLocaleString()}원</p>
                            <p>에이전시 수수료: {amount.agencyFee.toLocaleString()}원</p>
                          </div>
                        )}
                      </div>


                    <DialogFooter className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSettleOpen(false)}>취소</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleHospitalSettle}>
                        {hasExistingPayment ? "매출 수정 완료" : "매출 입력 완료"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* 예약 취소 */}


              </>
            )}

            {/* 3) 정산대기는 아니고 CONFIRMED 이지만 과거 날짜가 아님 → 취소 버튼만 */}
            {canCancel && (
<Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
  <DialogTrigger asChild>
    <Button size="sm" variant="outline">
      예약 취소
    </Button>
  </DialogTrigger>

  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>예약을 취소하시겠습니까?</DialogTitle>
    </DialogHeader>

  {/* 취소 사유 입력 */}
  <div className="mt-4 space-y-1">
    <label className="text-xs text-gray-500">
      취소 사유 <span className="text-red-500">*</span>
    </label>
    <textarea
     className="w-full border rounded-md p-2 text-sm resize-none"
      rows={3}
      placeholder={
        isHospital
          ? "병원 내부 기록용 취소 사유를 입력해주세요."
          : "예약을 취소하는 사유를 입력해주세요."
      }
      value={cancelReason}
      onChange={(e) => setCancelReason(e.target.value)}
    />
  </div>

    {/* ===== 예약 정보 요약 UI (기존 ReservationCard 스타일 그대로) ===== */}
    <div className="space-y-3 mt-4">
      <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-700 space-y-1">

        {/* 환자 */}
        <div className="flex justify-between">
          <span className="text-gray-400">환자</span>
          <span>
 {reservation.patientName} (
   {patientBirthOrAgeLabel ?? "-"},
   {reservation.patientGender === "MALE"
     ? "남자"
     : reservation.patientGender === "FEMALE"
     ? "여자"
     : "-"},
   {reservation.patientNationality}
 )
          </span>
        </div>

        {/* 에이전시 */}
<div className="flex flex-col gap-1">
  {isAdmin ? (
    <>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 w-14">병원</span>
        <span className="font-medium">
          {reservation.hospitalName ?? "-"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 w-14">에이전시</span>
        <span className="font-medium">
          {reservation.agencyName ?? "-"}
        </span>
      </div>
    </>
  ) : (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 w-14">
        {isAgency ? "병원" : "에이전시"}
      </span>
      <span className="font-medium">
        {isAgency
          ? reservation.hospitalName ?? "-"
          : reservation.agencyName ?? "-"}
      </span>
    </div>
  )}
</div>

        {/* 희망시술 */}
        <div className="flex justify-between">
          <span className="text-gray-400">희망시술</span>
          <span className="text-right">{reservation.procedureName}</span>
        </div>

        {/* 예약일 */}
        <div className="flex justify-between">
          <span className="text-gray-400">예약일</span>
          <span className="text-right">
            {reservationDateLabel} {reservation.reservationTime}
          </span>
        </div>

        {/* 메모 */}
        <div className="flex justify-between">
          <span className="text-gray-400">메모</span>
          <span className="text-right whitespace-pre-line">
            {reservation.memo ?? "-"}
          </span>
        </div>

      </div>
    </div>
    {/* ===== 예약 정보 UI 끝 ===== */}

    <DialogFooter className="mt-4 flex justify-end gap-2">
      <Button variant="outline" size="sm" onClick={() => setCancelOpen(false)}>
        유지
      </Button>
      <Button size="sm" variant="destructive" disabled={!cancelReason.trim()} onClick={handleCancel}>
        취소 확정
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

            )}


            {/* AGENCY: 정산 확인 */}
 {canAgencyConfirm && (
   <Dialog
     open={agencyConfirmOpen}
     onOpenChange={setAgencyConfirmOpen}
   >
 <DialogTrigger asChild>
   <Button
     size="sm"
     className="bg-green-600 hover:bg-green-700 text-white"
      onClick={() => {
  setRatingScore(5);
  setRatingComment("");
   setAgencyConfirmOpen(true);
 }}
   >
     정산 확인
   </Button>
 </DialogTrigger>

    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>정산 내역을 확인하시겠습니까?</DialogTitle>
        <DialogDescription>
          병원이 입력한 매출 기준으로 정산이 완료됩니다.<br />
          확인 완료 후에는 수정이 불가능합니다.
        </DialogDescription>
      </DialogHeader>

      {/* 🔒 정산 정보 요약 (AGENCY 전용 / 플랫폼 수수료 없음) */}
      <div className="mt-3 rounded-md bg-gray-50 border border-gray-200 p-3 text-xs text-gray-700 space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-400">결제금액</span>
          <span className="font-medium">
            {reservation.paymentAmount?.toLocaleString()}원
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">에이전시 수수료</span>
          <span className="font-medium">
            {reservation.settlementAmount?.toLocaleString()}원
          </span>
        </div>
      </div>

  {/* ⭐ 병원 별점 */}
  <div className="mt-4 space-y-2">
    <div className="text-sm font-medium text-gray-900">
      해당 병원이 정산처리 및 예약소통이 원활하였나요?
    </div>

    <div className="flex items-center justify-between">
      <StarRating
        value={ratingScore}
        onChange={(v) => setRatingScore(v)}
        size={18}
      />
      <div className="text-sm text-gray-600">
        {ratingScore} / 5
      </div>
    </div>

    <div className="space-y-1">
      <div className="text-xs text-gray-500">
        별점 사유 (선택) · 내부 관리용으로만 저장됩니다.
      </div>
      <textarea
        className="w-full border rounded-md p-2 text-sm resize-none"
        rows={3}
        placeholder="코멘트를 남길 수 있습니다 (선택)"
        value={ratingComment}
        onChange={(e) => setRatingComment(e.target.value)}
      />
    </div>
  </div>

      <DialogFooter className="mt-4 flex justify-end gap-2">
 <Button
   variant="outline"
   size="sm"
   onClick={() => setAgencyConfirmOpen(false)}
 >
   취소
 </Button>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={async () => {
            await handleAgencyConfirmSettlement();
            setAgencyConfirmOpen(false);
            await onRefresh?.();
          }}
        >
          정산 확인 완료
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}


            {/* 정산 완료 상태 */}
            {isSettled && (
              <span className="text-[11px] text-gray-400">
                정산이 완료된 예약입니다.
              </span>
            )}

          </div>

        </div>
{/* 변경이력 Dialog */}
<Dialog
  open={historyOpen}
  onOpenChange={(open) => {
    // 🔔 팝업이 닫히는 모든 케이스(외부 클릭/ESC/닫기 버튼)
   if (!open && historyOpen) {
     handleCloseHistory();
   } else {
     setHistoryOpen(open);
   }
  }}
>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>예약 상태 변경 이력</DialogTitle>
      <DialogDescription>
        예약 상태가 변경된 내역을 확인할 수 있습니다.
      </DialogDescription>
    </DialogHeader>

    {/* 이력 없음 상태 */}
    {historyItems.length === 0 && (
      <div className="py-8 text-center text-sm text-gray-500">
        아직 상태 변경 이력이 없습니다.
      </div>
    )}

{historyItems.map((item) => (
  <div
    key={item.id}
    className="border rounded-md px-3 py-2 text-xs text-gray-700"
  >
    <div className="flex justify-between mb-1">
      <span className="font-medium">
        {ReservationStatusLabel[item.status]}
      </span>
      <span className="text-gray-400">
        {new Date(item.createdAt).toLocaleString("ko-KR")}
      </span>
    </div>

    <div className="text-gray-500 mb-1">
      변경 주체:{" "}
      {item.changedByRole === "HOSPITAL"
        ? "병원"
        : item.changedByRole === "AGENCY"
        ? "에이전시"
        : "관리자"}
    </div>

    {item.reason && item.reason.trim().length > 0 && (
      <div className="text-gray-600 whitespace-pre-line">
        사유: {ReservationChangeReasonLabel[item.reason] ?? item.reason}
      </div>
    )}
    {/* NEXT: 관리자 시스템 변경 이력 (자동 상태 변경) 표시 시 분기 */}
  </div>
))}


    <DialogFooter>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCloseHistory}
      >
        닫기
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<Dialog open={detailOpen} onOpenChange={setDetailOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>
        {detailType === "PROCEDURE" ? "희망시술" : "메모"}
      </DialogTitle>
    </DialogHeader>

    <div className="mt-2 rounded-md bg-gray-50 border border-gray-200
                    p-3 text-sm text-gray-800 whitespace-pre-line">
      {detailType === "PROCEDURE"
        ? reservation.procedureName
        : reservation.memo}
    </div>

    <DialogFooter className="mt-4 flex justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setDetailOpen(false)}
      >
        닫기
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>



      {/* 에이전시 연락처 모달 */}
{isHospital && (
  <Dialog open={contactOpen} onOpenChange={setContactOpen}>
    <DialogContent
      className="max-w-sm"
      onPointerDownOutside={() => setContactOpen(false)}
      onEscapeKeyDown={() => setContactOpen(false)}
    >
      <DialogHeader>
        <DialogTitle>
          {isHospital ? "에이전시 연락처" : "병원 연락처"}
        </DialogTitle>
      </DialogHeader>

      {reservation.agencyContact ? (
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">연락처</span>
            <span>{reservation.agencyContact.phone ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">이메일</span>
            <span>{reservation.agencyContact.email ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">WhatsApp</span>
            <span>{reservation.agencyContact.whatsapp ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">WeChat</span>
            <span>{reservation.agencyContact.wechat ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">LINE</span>
            <span>{reservation.agencyContact.line ?? "-"}</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          에이전시 연락처 정보를 불러오는 중이거나, 등록된 정보가 없습니다.
        </p>
      )}

      <DialogFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setContactOpen(false)}
        >
          닫기
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}

    </div>
    
  );
}
