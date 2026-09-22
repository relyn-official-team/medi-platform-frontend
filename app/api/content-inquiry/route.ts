import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  CONTENT_INQUIRY_MAX_LENGTH,
  CONTENT_INQUIRY_RECIPIENT,
  CONTENT_INQUIRY_SUBJECT_PREFIX,
  getContentInquiryPage,
} from "@/lib/content-inquiry";

export const runtime = "nodejs";

function failure(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const requestUrl = new URL(req.url);
  const allowedOrigins = new Set([
    requestUrl.origin,
    "https://relynplatform.com",
    "https://www.relynplatform.com",
  ]);
  // Next.js may normalize the route URL to localhost while the browser uses
  // 127.0.0.1. Compare the actual request Host as well, retaining origin checks.
  const requestHost = req.headers.get("host");
  if (requestHost) allowedOrigins.add(`${requestUrl.protocol}//${requestHost}`);
  if (origin && !allowedOrigins.has(origin)) {
    return failure("허용되지 않은 요청입니다.", 403);
  }
  if (req.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return failure("올바른 형식으로 다시 보내주세요.", 415);
  }

  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > 8192) return failure("문의 내용이 너무 깁니다.", 413);
    body = JSON.parse(raw);
  } catch {
    return failure("문의 내용을 확인한 뒤 다시 보내주세요.", 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return failure("문의 내용을 확인한 뒤 다시 보내주세요.", 400);
  }
  const payload = body as Record<string, unknown>;
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const page = getContentInquiryPage(payload.pagePath);
  const requestId = typeof payload.requestId === "string" ? payload.requestId : "";

  if (!message || message.length > CONTENT_INQUIRY_MAX_LENGTH || !page ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    return failure("문의 내용과 페이지를 확인한 뒤 다시 보내주세요.", 400);
  }

  // Reuse the existing /api/lead sender and credentials. The inbox is fixed.
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !from) {
    return failure("현재 문의를 보낼 수 없습니다. 잠시 후 다시 시도해주세요.", 503);
  }

  const subject = `${CONTENT_INQUIRY_SUBJECT_PREFIX} ${page.title}${page.view === "카드로 보기" ? " (카드로 보기)" : ""}`;
  const text = [
    "문의유형: 콘텐츠제안 및 문의",
    `페이지 제목: ${page.title}`,
    `페이지 주소: ${page.url}`,
    `보기 방식: ${page.view}`,
    "",
    "문의 내용:",
    message,
    "",
    `수신: ${CONTENT_INQUIRY_RECIPIENT}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(
      { from, to: CONTENT_INQUIRY_RECIPIENT, subject, text },
      // Retrying the same submission after a lost response must not send twice.
      { idempotencyKey: `content-inquiry/${requestId}` },
    );
    if (error || !data?.id) {
      return failure("메일 접수에 실패했습니다. 작성한 내용을 확인하고 다시 시도해주세요.", 502);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return failure("메일 접수에 실패했습니다. 잠시 후 다시 시도해주세요.", 502);
  }
}
