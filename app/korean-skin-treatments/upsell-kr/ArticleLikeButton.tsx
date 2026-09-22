"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Heart } from "lucide-react";
import type { ArticleReactionPage } from "@/lib/article-reaction-pages";

type Snapshot = { count: number; liked: boolean };
const copyByLocale = {
  ko: { like: "공감하기", unlike: "공감 취소", retry: "공감 수 다시 확인", error: "공감 수를 확인하지 못했어요. 하트를 눌러 다시 확인해 주세요." },
  "zh-TW": { like: "覺得有幫助", unlike: "取消喜歡", retry: "重新確認喜歡人數", error: "暫時無法確認喜歡人數，請按愛心重試。" },
  "ja-JP": { like: "参考になった", unlike: "リアクションを取り消す", retry: "リアクション数を再確認", error: "リアクション数を確認できませんでした。ハートを押して再試行してください。" },
};

function isSnapshot(value: unknown): value is Snapshot {
  if (!value || typeof value !== "object") return false;
  const result = value as Record<string, unknown>;
  return typeof result.count === "number" && Number.isSafeInteger(result.count) && result.count >= 0 && typeof result.liked === "boolean";
}

export default function ArticleLikeButton({ page, locale }: { page: ArticleReactionPage; locale: keyof typeof copyByLocale }) {
  const copy = copyByLocale[locale];
  const errorId = useId();
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const active = useRef(false);
  const saving = useRef(false);
  const sequence = useRef(0);
  const channel = useRef<BroadcastChannel | null>(null);
  const reload = useRef<() => Promise<void>>(async () => {});

  useEffect(() => {
    active.current = true;
    const refresh = async () => {
      if (saving.current) return;
      const version = ++sequence.current;
      try {
        const response = await fetch(`/api/article-likes?page=${page}`, {
          cache: "no-store", credentials: "same-origin", signal: AbortSignal.timeout(10000),
        });
        const result: unknown = await response.json();
        if (!response.ok || !isSnapshot(result)) throw new Error("Reaction unavailable");
        if (active.current && version === sequence.current) {
          setSnapshot(result);
          setFailed(false);
        }
      } catch {
        if (active.current && version === sequence.current) setFailed(true);
      } finally {
        if (active.current && version === sequence.current) setLoading(false);
      }
    };
    reload.current = refresh;
    void refresh();
    const onVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    window.addEventListener("focus", onVisible);
    document.addEventListener("visibilitychange", onVisible);
    // Other browsers' changes appear on refresh/focus or within 30 seconds.
    const timer = window.setInterval(onVisible, 30000);
    if (typeof BroadcastChannel !== "undefined") {
      channel.current = new BroadcastChannel("relyn-article-reactions");
      channel.current.onmessage = event => { if (event.data === page) void refresh(); };
    }
    return () => {
      active.current = false;
      window.clearInterval(timer);
      window.removeEventListener("focus", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
      channel.current?.close();
      channel.current = null;
    };
  }, [page]);

  async function toggle() {
    if (saving.current) return;
    if (failed || !snapshot) {
      setLoading(true);
      await reload.current();
      return;
    }
    saving.current = true;
    sequence.current++;
    setPending(true);
    try {
      const response = await fetch("/api/article-likes", {
        method: "POST", credentials: "same-origin", cache: "no-store",
        headers: { "Content-Type": "application/json", "X-Relyn-Reaction": "1" },
        body: JSON.stringify({ page, liked: !snapshot.liked }),
        signal: AbortSignal.timeout(10000),
      });
      const result: unknown = await response.json();
      if (!response.ok || !isSnapshot(result)) throw new Error("Reaction unavailable");
      if (active.current) {
        setSnapshot(result);
        setFailed(false);
        channel.current?.postMessage(page);
      }
    } catch {
      // Do not guess the total or blindly retry after an uncertain response.
      if (active.current) setFailed(true);
    } finally {
      saving.current = false;
      if (active.current) setPending(false);
    }
  }

  return <>
    <button className="like-button" type="button" aria-pressed={snapshot?.liked ?? false}
      aria-label={failed ? copy.retry : snapshot?.liked ? copy.unlike : copy.like}
      aria-busy={loading || pending} aria-describedby={failed ? errorId : undefined}
      disabled={loading || pending} onClick={() => void toggle()}>
      <Heart size={22} aria-hidden="true" />
      <span aria-live="polite" aria-atomic="true">{failed ? "—" : snapshot ? snapshot.count.toLocaleString(locale) : "…"}</span>
    </button>
    {failed && <span id={errorId} className="reaction-feedback" role="status">{copy.error}</span>}
  </>;
}
