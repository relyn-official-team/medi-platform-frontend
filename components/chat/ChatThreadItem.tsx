import { ChatThreadItem as Thread } from "@/types/chat";
import { cn } from "@/lib/utils";
import {
   ReservationStatusLabel,
   ReservationStatusBadgeClass,
 } from "@/constants/reservationStatus";


interface Props {
  item: Thread;
  onClick: () => void;
}

function isDisplayStatus(
  status: Thread["reservationStatus"]
): status is keyof typeof ReservationStatusLabel {
  return status !== "PRE_CHAT";
}


export default function ChatThreadItem({ item, onClick }: Props) {
  const isPreChat = item.reservationStatus === "PRE_CHAT";
  const ctaText = getCtaText(
    item.reservationStatus,
    item.unreadCount
  );

  const displayStatus = isDisplayStatus(item.reservationStatus)
    ? item.reservationStatus
    : null;

  const reservationSummary = item.title;

  return (
    <div
  onClick={onClick}
  className={cn(
    "relative flex items-center gap-4 p-4 cursor-pointer",
    "rounded-xl border border-gray-200 bg-white shadow-sm transition overflow-hidden",
    "hover:shadow-md hover:border-gray-300"
  )}
>
 {displayStatus && (
<div
  className={cn(
    "absolute left-0 top-0 h-full w-1.5",
    ReservationStatusBadgeClass[displayStatus]
  )}
/>
 )}
      {/* Left */}
      <div className="flex-1 min-w-0">
        {/* 1행: 예약 요약 */}
        <div className="flex items-center gap-2">
          <span className="font-semibold truncate text-sm text-gray-900">
            {reservationSummary || item.counterpartName}
          </span>

{displayStatus && (
   <span
     className={cn(
       "text-xs px-2 py-0.5 rounded border",
       ReservationStatusBadgeClass[displayStatus]
     )}
   >
     {ReservationStatusLabel[displayStatus]}
   </span>
 )}
        </div>

        {/* 2행: 상대방 + 마지막 메시지 */}
 <div className="text-xs text-gray-500 truncate">
   {item.counterpartName}
 </div>
 <div className="mt-0.5 text-sm text-gray-700 truncate">
   {item.lastMessagePreview || ctaText}
 </div>



      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        {item.lastMessageAt && (
          <span className="text-xs text-gray-400">
            {formatChatTime(item.lastMessageAt)}
          </span>
        )}
        
 {item.reservationDate && (
   <span className="text-[11px] text-gray-400">
     예약일 · {formatReservationDate(item.reservationDate)}
   </span>
 )}


        {item.unreadCount > 0 && (
          <span
            className={cn(
              "min-w-[18px] px-1.5 text-xs rounded-full text-white text-center",
              "bg-red-500"
            )}
          >
            {item.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}

function getCtaText(
  status: Thread["reservationStatus"],
  unreadCount: number
) {
  if (unreadCount > 0) {
    return "새 메시지가 도착했습니다";
  }

  switch (status) {
   case "PRE_CHAT":
      return "";
    case "PENDING":
      return "병원에서 예약을 검토 중입니다";
    case "CONFIRMED":
      return "예약이 확정되었습니다";
    case "CANCELLED":
      return "종료된 예약입니다";
    default:
      return "";
  }
}

function formatChatTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();

  const isToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  if (isToday) {
    return d.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return d.toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  });
}

function formatReservationDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  });
}