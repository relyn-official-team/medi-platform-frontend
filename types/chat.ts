// frontend/types/chat.ts

export type ChatSenderRole = "AGENCY" | "HOSPITAL" | "SYSTEM";

export interface ChatMessage {
  id: number;
  threadId: number;
  senderRole: ChatSenderRole;
  senderId: string | null;
  content: string;
  createdAt: string;
  readAt: string | null;
}

export interface ChatThreadItem {
  threadId: number;
  reservationId: number;
  title: string;
  reservationStatus: ReservationStatus;
  reservationDate: string | null;
  counterpartName: string;
  counterpartType: "HOSPITAL" | "AGENCY";
  lastMessageAt: string | null;
  lastMessagePreview?: string;
  unreadCount: number;
}

export type ReservationStatus =
  | "PRE_CHAT"
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "SETTLED"
  | "SETTLEMENT"
  | "CANCELED";

export interface PreChatFormData {
  language?: string;
  needSedation?: boolean;
  needTaxRefund?: boolean;
  needInterpreter?: boolean;
  patientName: string;
  patientAge: number;
  patientNationality: string;
  procedureName: string;
  reservationDate: string;
  reservationTime: string;
}

export type PreChatFormDraft = {
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
