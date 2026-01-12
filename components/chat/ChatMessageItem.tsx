// frontend/components/chat/ChatMessageItem.tsx
import { ChatMessage } from "@/types/chat";
import clsx from "clsx";
import SystemMessageItem from "./SystemMessageItem";

interface Props {
  message: ChatMessage;
  myRole: "AGENCY" | "HOSPITAL" | "ADMIN" ;
}

const ROLE_LABEL: Record<string, string> = {
  AGENCY: "에이전시",
  HOSPITAL: "병원",
  SYSTEM: "시스템",
};

export default function ChatMessageItem({ message, myRole }: Props) {
  const isSystem = message.senderRole === "SYSTEM";
  // ✅ ADMIN은 좌/우 구분 대상 아님
  const isMine =
    myRole !== "ADMIN" && message.senderRole === myRole;

  if (isSystem) {
return <SystemMessageItem content={message.content} />;
  }

  return (
    <div className={clsx("flex", isMine ? "justify-end" : "justify-start")}>
      <div className="max-w-[70%]">

        {/* 🔹 ADMIN 전용 발신자 라벨 */}
        {myRole === "ADMIN" && (
          <div className="mb-1 text-[11px] text-gray-400">
            {ROLE_LABEL[message.senderRole] ?? message.senderRole}
          </div>
        )}

        <div
          className={clsx(
            "rounded-lg px-3 py-2 text-sm break-words",
            isMine
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-800"
          )}
        >
        {message.content}

        {/* ⏰ 시간 표시 */}
        <div className="mt-1 text-[10px] text-gray-300 text-right">
          {new Date(message.createdAt).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
    </div>
  );
}


