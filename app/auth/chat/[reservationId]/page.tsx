// frontend/app/auth/chat/[reservationId]/page.tsx
"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { ChatMessage } from "@/types/chat";
import ChatMessageItem from "@/components/chat/ChatMessageItem";
import ChatInputBox from "@/components/chat/ChatInputBox";
import { ReservationStatus, PreChatFormData, PreChatFormDraft } from "@/types/chat";
import PreChatSubmitForm from "@/components/chat/PreChatSubmitForm";
import ChatDateDivider from "@/components/chat/ChatDateDivider";
import { Badge } from "@/components/ui/badge";
 import {
   ReservationStatusBadgeClass,
   ReservationStatusLabel,
 } from "@/constants/reservationStatus";
 import { isSettlementPendingView } from "@/utils/isSettlementPendingView";
 import { ReservationCardView } from "@/types/reservation";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,} from "@/components/ui/dialog";



const formatDate = (iso: string) => iso.slice(0, 10);


export default function ChatDetailPage() {
  const router = useRouter();
  const [reservation, setReservation] =
   useState<ReservationCardView | null>(null);
const [accessDenied, setAccessDenied] = useState(false);   
   
const [myRole, setMyRole] =
  useState<"AGENCY" | "HOSPITAL" | "ADMIN" | null>(null);
const [counterpartName, setCounterpartName] = useState<string | null>(null);


  const { reservationId } = useParams<{ reservationId: string }>();
 const scrollContainerRef = useRef<HTMLDivElement | null>(null);
 const hasInitialScrolledRef = useRef(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [reservationStatus, setReservationStatus] =
   useState<ReservationStatus | null>(null);
 const [initialFormData, setInitialFormData] =
   useState<PreChatFormDraft | null>(null);
   const [editable, setEditable] = useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
const [editDoneModalOpen, setEditDoneModalOpen] = useState(false);
  
  const lastMessageSigRef = useRef<string | null>(null);
  
 const handlePreChatSubmitted = () => {
   setReservationStatus("PENDING");
 };

  const reloadMessages = useCallback(async () => {
    if (!reservationId || typeof reservationId !== "string") return;
    try {
      const res = await api.get<ChatMessage[]>(
        `/chat/threads/${reservationId}/messages`
      );

      const next = res.data ?? [];
      const last = next.length ? next[next.length - 1] : null;
      const sig = last ? `${last.id}_${last.createdAt}_${next.length}` : `empty_${next.length}`;

      // 변경이 없으면 setState 안 함 (불필요 렌더 방지)
      if (lastMessageSigRef.current === sig) return;
      lastMessageSigRef.current = sig;
      setMessages(next);

      // 읽음 처리(선택): 새 메시지 유입 시 리스트/뱃지 정리 목적
      // (서버에서 role 기반으로 unread를 관리한다면 도움이 됨)
      api.post(`/chat/threads/${reservationId}/read`).catch(() => {});
   } catch (e) {
      // 조용히 실패(네트워크 순간 장애 고려)
    }
  }, [reservationId]);

  const reloadMeta = useCallback(async () => {
    if (!reservationId || typeof reservationId !== "string") return;
    try {
      const meta = await api.get<{
        status: ReservationStatus;
        editable: boolean;
        formData?: {
  patientName?: string;
  patientAge?: number;
  patientNationality?: string;
  language?: string;
  needSedation?: boolean;
  needTaxRefund?: boolean;
  needInterpreter?: boolean;
  procedureName?: string;
  reservationDate?: string;
  reservationTime?: string;
        };
        hospital?: { name: string };
        agency?: { name: string };
        reservation: any;
      }>(`/chat/threads/${reservationId}/meta`);

      setReservationStatus(meta.data.status);
      setInitialFormData(meta.data.formData ?? null);
      setEditable(meta.data.editable);

      if (myRole === "AGENCY") {
        setCounterpartName(meta.data.hospital?.name ?? null);
      } else if (myRole === "HOSPITAL") {
        setCounterpartName(meta.data.agency?.name ?? null);
     }

      const baseReservation = meta.data.reservation as ReservationCardView;
      if (meta.data.status === "PRE_CHAT" && meta.data.formData) {
        setReservation({
          ...baseReservation,
          patientNationality:
            baseReservation.patientNationality ??
           meta.data.formData.patientNationality ?? null,
          language:
            baseReservation.language ??
            meta.data.formData.language ?? null,
          needSedation:
            baseReservation.needSedation ?? meta.data.formData.needSedation,
          needTaxRefund:
            baseReservation.needTaxRefund ?? meta.data.formData.needTaxRefund,
          needInterpreter:
            baseReservation.needInterpreter ?? meta.data.formData.needInterpreter,
       });
      } else {
        setReservation(baseReservation);
      }
    } catch (e) {
      // ignore
    }
  }, [reservationId, myRole]);
  const handlePreChatUpdated = useCallback(async () => {
    // 예약 수정 즉시 화면 반영
    await Promise.all([reloadMeta(), reloadMessages()]);
    // 채팅 리스트 갱신 트리거 (기존 로직 유지)
    sessionStorage.setItem("chat:list:dirty", "1");
  }, [reloadMessages, reloadMeta]);

  /* 메시지 목록 로드 */
  useEffect(() => {
    if (!reservationId || typeof reservationId !== "string") return;

    const fetchMessages = async () => {
      try {
        const res = await api.get<ChatMessage[]>(
          `/chat/threads/${reservationId}/messages`
        );
        setMessages(res.data);
     // 예약 상태 조회 (PRE_CHAT 판단용)
        const init = res.data ?? [];
 lastMessageSigRef.current =
   init.length
     ? `${init[init.length - 1].id}_${init[init.length - 1].createdAt}_${init.length}`
     : `empty_${init.length}`;



const meta = await api.get<{
  status: ReservationStatus;
  editable: boolean;
  formData: PreChatFormData;
  reservation: {
    patientName?: string;
    procedureName?: string;
    reservationDate?: string;
    reservationTime?: string;
  };
  hospital?: {
    name: string;
  };
  agency?: {
    name: string;
  };
}>(`/chat/threads/${reservationId}/meta`);



if (
  (myRole === "AGENCY" && !meta.data.hospital) ||
  (myRole === "HOSPITAL" && !meta.data.agency)
) {
  setAccessDenied(true);
  return;
}






setReservationStatus(meta.data.status);
setInitialFormData(meta.data.formData ?? null);
setEditable(meta.data.editable);

      // ✅ 항상 상대방명 fallback 세팅 (PRE_CHAT/예약카드 진입 모두 커버)
      if (myRole === "AGENCY") {
        setCounterpartName(meta.data.hospital?.name ?? null);
      } else if (myRole === "HOSPITAL") {
        setCounterpartName(meta.data.agency?.name ?? null);
} else if (myRole === "ADMIN") {
  setCounterpartName(
    meta.data.hospital?.name ??
    meta.data.agency?.name ??
    null
  );
      }

 const baseReservation = meta.data.reservation as ReservationCardView;

 // PRE_CHAT일 때만 formData fallback
 if (meta.data.status === "PRE_CHAT" && meta.data.formData) {
   setReservation({
     ...baseReservation,
     patientNationality:
       baseReservation.patientNationality ??
       meta.data.formData.patientNationality?? null,
     language:
       baseReservation.language ??
       meta.data.formData.language?? null,
     needSedation:
       baseReservation.needSedation ??
       meta.data.formData.needSedation,
     needTaxRefund:
       baseReservation.needTaxRefund ??
       meta.data.formData.needTaxRefund,
     needInterpreter:
       baseReservation.needInterpreter ??
       meta.data.formData.needInterpreter,
   });


 } else {
   setReservation(baseReservation);
 }

      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [reservationId, myRole]);

  // ✅ 실시간(간이) 구현: 폴링 + 포커스 시 즉시 동기화
  useEffect(() => {
   if (!reservationId || typeof reservationId !== "string") return;
   if (!myRole) return;
    let alive = true;

    const tick = async () => {
      if (!alive) return;
      await reloadMessages();
    };

    // 초기 1회
    tick();

    const interval = window.setInterval(tick, 2000);
    const onFocus = () => tick();
    window.addEventListener("focus", onFocus);

    return () => {
      alive = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [reservationId, myRole, reloadMessages]);


useEffect(() => {
  if (!accessDenied) return;

  const timer = setTimeout(() => {
    router.replace("/auth/chat");
  }, 2000);

  return () => clearTimeout(timer);
}, [accessDenied, router]);


  /* unread → read 처리 */
  useEffect(() => {
  if (!reservationId || typeof reservationId !== "string") return;
  if (!myRole) return; // 🔥 role 확정 전엔 meta 기반 이름 세팅 불가
    api.post(`/chat/threads/${reservationId}/read`);
  // 🔥 채팅 리스트 갱신 트리거
  sessionStorage.setItem("chat:list:dirty", "1");
  }, [reservationId, myRole]);




useLayoutEffect(() => {
   if (loading) return;
   const container = scrollContainerRef.current;
   if (!container) return;
   if (messages.length === 0) return;

   // 최초 진입 단 1회
   if (hasInitialScrolledRef.current) return;
   hasInitialScrolledRef.current = true;

   // 🔥 DOM / 레이아웃 완전 확정 후 스크롤
   requestAnimationFrame(() => {
     requestAnimationFrame(() => {
       container.scrollTop = container.scrollHeight;
     });
   });
 }, [loading, messages.length]);

useLayoutEffect(() => {
  const container = scrollContainerRef.current;
  if (!container) return;
  container.scrollTo({
    top: container.scrollHeight,
    behavior: "smooth",
  });
}, [messages]);
  

  const handleSend = async (content: string) => {
    if (myRole === "ADMIN") return;
    if (!content.trim()) return;

    const res = await api.post<ChatMessage>(
      `/chat/threads/${reservationId}/messages`,
      { content }
    );

    setMessages(prev => [...prev, res.data]);
  // 🔥 채팅 리스트 최신화 트리거
  sessionStorage.setItem("chat:list:dirty", "1");
  };


type BadgeStatus = keyof typeof ReservationStatusLabel;

 const displayStatus: BadgeStatus | null = (() => {
   if (!reservationStatus) return null;

   // ❌ PRE_CHAT 은 Badge 대상 아님
   if (reservationStatus === "PRE_CHAT") return null;

   const settlementPending =
     !!reservation &&
     reservationStatus !== "SETTLED" &&
     isSettlementPendingView(
       { ...reservation, status: reservationStatus } as any
     );

   if (settlementPending) return "SETTLEMENT";

   return reservationStatus as BadgeStatus;
 })();

// ==============================
// 🔥 병원 다이렉트 채팅 여부
// - 병원 상세 → 채팅 버튼으로 생성된 PRE_CHAT
// - 아직 예약 필수 정보가 없음
// ==============================
const isHospitalDirectChat =
  reservationStatus === "PRE_CHAT" &&
  !reservation?.procedureName &&
  !reservation?.reservationDate &&
  !reservation?.reservationTime;



  useEffect(() => {
  if (reservation?.patientName) {
    document.title = reservation.patientName;
  }
}, [reservation]);



useEffect(() => {
  const fetchMe = async () => {
    const res = await api.get<{
      role: "AGENCY" | "HOSPITAL" | "ADMIN";
    }>("/me");
    setMyRole(res.data.role);
  };
  fetchMe();
}, []);




  if (loading) {
    return <div className="p-4 text-sm text-gray-500">로딩중...</div>;
  }

  if (accessDenied) {
  return (
    <div className="flex h-screen items-center justify-center text-sm text-gray-500">
      접근할 수 없는 채팅입니다.
    </div>
  );
}


  return (
   <div
     data-chat-page
     className="relative flex flex-col h-screen bg-white"
   >
    {/* 🔒 상단 예약정보 카드 (Sticky) */}
    <div className="sticky top-0 z-40 bg-white border-b">
      <div className="px-4 py-3">
    {/* ✅ 병원 다이렉트 채팅 전용 헤더 */}
    {isHospitalDirectChat ? (
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">
          {counterpartName ?? "상담"}
        </div>
      </div>
    ) : (
<div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
  <div className="flex items-start justify-between gap-3">
    {/* 좌측 정보 */}
    <div className="min-w-0 flex flex-col gap-1">

      {/* 환자명 + 나이 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold truncate">
          {reservation?.patientName ?? "예약 정보"}
        </span>
        {reservation?.patientAge != null && (
          <span className="text-xs text-gray-500">
            만 {reservation.patientAge}세
          </span>
        )}
      </div>

      {/* 국가 / 언어 */}
      <div className="flex items-center gap-2 text-xs text-gray-600">
 {reservation?.patientNationality && (
   <>
     <span>{reservation.patientNationality}</span>
     {reservation.language && <span className="text-gray-300">|</span>}
   </>
 )}
        {reservation?.language && (
          <>
            <span className="text-gray-300">|</span>
            <span>{reservation.language}</span>
          </>
        )}
      </div>

      {/* 병원 / 에이전시 */}
      <div className="text-xs text-gray-600">
        {myRole === "AGENCY"
    ? `병원: ${reservation?.hospitalName ?? counterpartName ?? "-"}`
    : `에이전시: ${reservation?.agencyName ?? counterpartName ?? "-"}`}
      </div>

      {/* 예약일시 */}
      <div className="text-xs text-gray-500">
        {reservation?.reservationDate && reservation?.reservationTime
          ? `예약: ${reservation.reservationDate.slice(0, 10)} ${reservation.reservationTime}`
          : "예약: -"}
      </div>

      {/* 옵션 배지 */}
      <div className="flex flex-wrap gap-2 mt-1">
        <OptionBadge label="수면마취" active={reservation?.needSedation === true} />

        {/*<OptionBadge label="텍스리펀" active={reservation?.needTaxRefund === true} />*/}

        <OptionBadge label="통역" active={reservation?.needInterpreter === true} />
      </div>

      {/* 예약 생성일 */}
      {reservation?.createdAt && (
        <div className="text-[11px] text-gray-400 mt-1">
          예약 생성일 ·{" "}
          {new Date(reservation.createdAt).toLocaleDateString("ko-KR")}
        </div>
      )}
    </div>

    {/* 상태 */}
    <div className="shrink-0">
      {displayStatus && (
        <Badge
          className={`text-xs px-2 py-0.5 border ${
            ReservationStatusBadgeClass[displayStatus]
          }`}
        >
          {ReservationStatusLabel[displayStatus]}
        </Badge>
      )}

{editable &&
  reservationStatus !== "CANCELLED" &&
  reservationStatus !== "SETTLED" && (
    <button
      onClick={() => setEditModalOpen(true)}
      className="mt-2 block text-xs text-blue-600 hover:underline"
    >
      예약정보 수정
    </button>
  )}

    </div>
  </div>
</div>
)}
      </div>
    </div>

      {/* 메시지 영역 */}
 <div
   ref={scrollContainerRef}
   className="flex-1 overflow-y-auto p-4 space-y-3 pb-[260px]"
 >
{messages.map((msg, index) => {
  const prev = messages[index - 1];
  const showDate =
    !prev ||
    formatDate(prev.createdAt) !==
      formatDate(msg.createdAt);

  return (
    <div key={msg.id}>
      {showDate && (
        <ChatDateDivider date={formatDate(msg.createdAt)} />
      )}

 {myRole && (
   <ChatMessageItem
     message={msg}
     myRole={myRole}
   />
 )}
    </div>
  );
})}
        
      </div>

     {/* PRE_CHAT 신청 영역 */}
 <div
   className="fixed left-0 right-0 bg-white border-t z-50"
   style={{
     bottom: "env(safe-area-inset-bottom)",
     paddingBottom: "env(safe-area-inset-bottom)",
   }}
 >
{/* PRE_CHAT 신청 / 수정 영역 */}
{!isHospitalDirectChat && reservationStatus === "PRE_CHAT" && initialFormData && (
  <PreChatSubmitForm
    reservationId={reservationId}
    mode="submit"
    initialData={initialFormData}
    onSubmitted={handlePreChatSubmitted}
  />
)}





   <ChatInputBox
     onSend={handleSend}
  disabled={
    myRole === "ADMIN" ||
    (!editable && !isHospitalDirectChat)
  }
     placeholder={
    reservationStatus === "PRE_CHAT"
      ? "상담 메시지를 입력하세요"
      : reservationStatus === "PENDING"
      ? "예약 검토 중입니다"
      : reservationStatus === "CONFIRMED"
      ? "추가 문의를 입력하세요"
      : reservationStatus === "CANCELLED"
      ? "추가 문의를 입력하세요"
      : reservationStatus === "SETTLED"
      ? "추가 문의를 입력하세요"
      : reservationStatus === "SETTLEMENT"
      ? "추가 문의를 입력하세요"
      : "메시지를 입력할 수 없습니다"
  }
   />

{/* 예약정보 수정 모달 */}
<Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
  <DialogContent className="max-w-xl">
    <DialogHeader>
      <DialogTitle>예약정보 수정</DialogTitle>
      <DialogDescription>
        상대방과 협의 후 수정해주세요.
      </DialogDescription>
    </DialogHeader>

    {initialFormData && (
      <PreChatSubmitForm
        reservationId={reservationId}
        mode="edit"
        initialData={initialFormData}
        onUpdated={async () => {
          setEditModalOpen(false);
         setEditDoneModalOpen(true);
          await handlePreChatUpdated();
        }}
      />
    )}
  </DialogContent>
</Dialog>

{/* 예약정보 수정 완료 모달 */}
<Dialog open={editDoneModalOpen} onOpenChange={setEditDoneModalOpen}>
  <DialogContent>
   <DialogHeader>
      <DialogTitle>수정 완료</DialogTitle>
      <DialogDescription>
        예약정보가 정상적으로 수정되었습니다.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
     <button
        onClick={() => setEditDoneModalOpen(false)}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
      >
        확인
      </button>
    </DialogFooter>
  </DialogContent>
</Dialog>


 </div>
    </div>
  );
}

function OptionBadge({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border
        ${active
          ? "border-blue-200 text-blue-700 bg-blue-50"
          : "border-gray-200 text-gray-400"
        }`}
    >
      {label}
    </span>
  );
}

