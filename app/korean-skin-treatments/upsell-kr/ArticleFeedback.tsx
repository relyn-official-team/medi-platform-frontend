"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Heart, MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CONTENT_INQUIRY_MAX_LENGTH, CONTENT_INQUIRY_RECIPIENT } from "@/lib/content-inquiry";

const STORAGE_KEY = "relyn:dermatology-upselling:liked:v1";
const UPDATE_EVENT = "relyn-upsell-reaction";
let memoryLiked = false;

function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) notify();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(UPDATE_EVENT, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(UPDATE_EVENT, notify);
  };
}
function readLiked() {
  try { return localStorage.getItem(STORAGE_KEY) === "true"; }
  catch { return memoryLiked; }
}
const serverSnapshot = () => false;

const feedbackCopy = {
  ko: {
    language: "ko-KR", reactions: "게시물 반응", like: "공감하기", unlike: "공감 취소",
    ask: "질문하기", closePopup: "질문 팝업 닫기", close: "닫기", label: "질문 내용",
    intro: "이 글에서 궁금한 점이나, 다음 콘텐츠에서 다뤘으면 하는 주제를 자유롭게 적어주세요.",
    placeholder: "궁금한 내용을 자유롭게 적어주세요.", delivery: "보내기를 누르면 RELYN 팀 메일로 접수됩니다.",
    send: "보내기", sending: "보내는 중…", success: "문의가 접수되었습니다. 의견을 보내주셔서 감사합니다.",
    failure: "문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
    uncertain: "전송을 확인하지 못했습니다. 작성한 내용은 유지되며, 다시 시도할 수 있습니다.",
  },
  "zh-TW": {
    language: "zh-TW", reactions: "文章互動", like: "覺得有幫助", unlike: "取消喜歡",
    ask: "我想提問", closePopup: "關閉提問視窗", close: "關閉", label: "問題內容",
    intro: "關於這篇文章的疑問，或希望下次介紹的主題，都歡迎告訴我們。",
    placeholder: "請輸入你的問題或內容建議。", delivery: "按下送出後，內容會寄到 RELYN 團隊信箱。",
    send: "送出", sending: "傳送中…", success: "已收到你的問題，謝謝你的分享與建議。",
    failure: "暫時無法送出，內容已保留，請稍後再試。",
    uncertain: "目前無法確認是否送出。內容已保留，可以再試一次。",
  },
  "ja-JP": {
    language: "ja-JP", reactions: "記事へのリアクション", like: "参考になった", unlike: "リアクションを取り消す",
    ask: "質問する", closePopup: "質問フォームを閉じる", close: "閉じる", label: "質問・ご意見",
    intro: "この記事についての疑問や、今後取り上げてほしいテーマをお聞かせください。",
    placeholder: "質問や記事へのご意見をご記入ください。", delivery: "送信すると、RELYNチームのメールに届きます。",
    send: "送信する", sending: "送信中…", success: "お問い合わせを受け付けました。ご意見をお寄せいただき、ありがとうございます。",
    failure: "送信できませんでした。入力内容は残っています。時間をおいて、もう一度お試しください。",
    uncertain: "送信を確認できませんでした。入力内容は残っていますので、もう一度お試しいただけます。",
  },
};

export default function ArticleFeedback({ locale = "ko" }: { locale?: keyof typeof feedbackCopy }) {
  const copy = feedbackCopy[locale];
  const pagePath = usePathname();
  const liked = useSyncExternalStore(subscribe, readLiked, serverSnapshot);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sendingRef = useRef(false);
  const submissionRef = useRef<{ id: string; message: string; pagePath: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function changeOpen(next: boolean) {
    if (sendingRef.current) return;
    setOpen(next);
    if (next) { setStatus("idle"); setError(""); }
  }

  async function sendQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = question.trim();
    if (sendingRef.current || !message || message.length > CONTENT_INQUIRY_MAX_LENGTH) return;

    sendingRef.current = true;
    setStatus("sending");
    setError("");
    try {
      if (!submissionRef.current || submissionRef.current.message !== message || submissionRef.current.pagePath !== pagePath) {
        submissionRef.current = { id: crypto.randomUUID(), message, pagePath };
      }
      const response = await fetch("/api/content-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, pagePath, requestId: submissionRef.current.id }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        throw new Error(locale === "ko" && result?.error ? result.error : copy.failure);
      }
      setQuestion("");
      submissionRef.current = null;
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError"
        ? error.message : copy.uncertain);
    } finally {
      sendingRef.current = false;
    }
  }

  function toggleLike() {
    memoryLiked = !liked;
    try { localStorage.setItem(STORAGE_KEY, String(memoryLiked)); } catch { /* Keep the in-page reaction when storage is unavailable. */ }
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }

  return <Dialog open={open} onOpenChange={changeOpen}>
    <div className="article-actions" role="group" aria-label={copy.reactions}>
      <button className="like-button" type="button" aria-pressed={liked} aria-label={liked ? copy.unlike : copy.like} onClick={toggleLike}>
        <Heart size={22} aria-hidden="true" />
        <span aria-live="polite" aria-atomic="true">{liked ? 1 : 0}</span>
      </button>
      <DialogTrigger asChild>
        <button className="ask-button" type="button"><MessageCircle size={20} aria-hidden="true" /><span>{copy.ask}</span></button>
      </DialogTrigger>
    </div>
    <DialogContent hideControls lang={copy.language} className="upsell-question-dialog" onOpenAutoFocus={event => { event.preventDefault(); textareaRef.current?.focus(); }}>
      <div className="upsell-question-header">
        <DialogTitle>{copy.ask}</DialogTitle>
        <button className="upsell-question-close" type="button" aria-label={copy.closePopup} disabled={status === "sending"} onClick={() => changeOpen(false)}><X size={20} aria-hidden="true" /></button>
      </div>
      <DialogDescription className="upsell-question-intro">{copy.intro}</DialogDescription>
      <form onSubmit={sendQuestion} aria-busy={status === "sending"}>
        <label className="upsell-question-label" htmlFor="upsell-question-text">{copy.label}</label>
        <textarea ref={textareaRef} id="upsell-question-text" rows={6} required maxLength={CONTENT_INQUIRY_MAX_LENGTH} disabled={status === "sending"} aria-describedby="upsell-question-delivery" aria-invalid={status === "error"} placeholder={copy.placeholder} value={question} onChange={event => { setQuestion(event.target.value); if (status !== "idle") { setStatus("idle"); setError(""); } }} />
        <div className="upsell-question-meta"><span id="upsell-question-delivery">{copy.delivery}<br />{CONTENT_INQUIRY_RECIPIENT}</span><output htmlFor="upsell-question-text">{question.length.toLocaleString(copy.language)} / 1,000</output></div>
        {status === "success" && <p className="upsell-question-success" role="status">{copy.success}</p>}
        {status === "error" && <p className="upsell-question-error" role="alert">{error}</p>}
        <div className="upsell-question-footer">
          <button className="upsell-question-cancel" type="button" disabled={status === "sending"} onClick={() => changeOpen(false)}>{copy.close}</button>
          <button className="upsell-question-send" type="submit" disabled={status === "sending" || !question.trim()}>{status === "sending" ? copy.sending : copy.send}</button>
        </div>
      </form>
    </DialogContent>
  </Dialog>;
}
