import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isArticleReactionPage } from "@/lib/article-reaction-pages";
import { getArticleReactionStore } from "@/lib/article-reaction-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "relyn_article_visitor_v1";
const responseHeaders = { "Cache-Control": "private, no-store", "Vary": "Cookie, Origin", "X-Content-Type-Options": "nosniff" };

function json(value: unknown, status = 200) {
  return NextResponse.json(value, { status, headers: responseHeaders });
}

function getVisitor(req: NextRequest) {
  const visitor = req.cookies.get(COOKIE)?.value;
  return visitor && /^[a-f0-9]{64}$/.test(visitor) ? visitor : null;
}

function allowedWriteRequest(req: NextRequest) {
  const site = req.headers.get("sec-fetch-site");
  // This anonymous counter tolerates extensions rewriting Origin/Referer on
  // same-origin requests. Keep this exception local to the reactions API.
  // JSON + X-Relyn-Reaction are still required; no cross-origin CORS is enabled.
  if (site === "same-origin") return true;
  if (site && site !== "none") return false;
  // Older clients without Fetch Metadata retain the original Origin check.
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const allowed = new Set([req.nextUrl.origin, "https://relynplatform.com", "https://www.relynplatform.com"]);
  // Next's local request URL can use localhost for a 127.0.0.1 browser tab.
  try {
    const source = new URL(origin);
    const loopbackHosts = ["localhost", "127.0.0.1", "[::1]"];
    if (loopbackHosts.includes(source.hostname) && loopbackHosts.includes(req.nextUrl.hostname) &&
        source.host === req.headers.get("host") && source.protocol === req.nextUrl.protocol &&
        source.port === req.nextUrl.port) allowed.add(source.origin);
  } catch { return false; }
  return allowed.has(origin);
}

export async function GET(req: NextRequest) {
  // The aggregate is public. Reading it never adds or removes a like.
  const page = req.nextUrl.searchParams.get("page");
  if (!isArticleReactionPage(page)) return json({ error: "INVALID_PAGE" }, 400);
  const existingVisitor = getVisitor(req);
  const visitor = existingVisitor || randomBytes(32).toString("hex");
  try {
    const snapshot = await getArticleReactionStore().read(page, visitor);
    const response = json(snapshot);
    if (!existingVisitor) {
      response.cookies.set(COOKIE, visitor, {
        httpOnly: true, sameSite: "lax", secure: req.nextUrl.protocol === "https:",
        path: "/api/article-likes", maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  } catch {
    return json({ error: "REACTIONS_UNAVAILABLE" }, 503);
  }
}

export async function POST(req: NextRequest) {
  if (!allowedWriteRequest(req) || req.headers.get("x-relyn-reaction") !== "1") {
    return json({ error: "REQUEST_NOT_ALLOWED" }, 403);
  }
  if (req.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return json({ error: "INVALID_CONTENT_TYPE" }, 415);
  }
  const visitor = getVisitor(req);
  if (!visitor) return json({ error: "VISITOR_REQUIRED" }, 409);
  if (Number(req.headers.get("content-length")) > 256) return json({ error: "PAYLOAD_TOO_LARGE" }, 413);
  let body: unknown;
  try {
    // Bound the streamed body too, including requests without Content-Length.
    const reader = req.body?.getReader();
    if (!reader) return json({ error: "INVALID_PAYLOAD" }, 400);
    let raw = "";
    let size = 0;
    const decoder = new TextDecoder();
    try {
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        size += chunk.value.byteLength;
        if (size > 256) {
          await reader.cancel();
          return json({ error: "PAYLOAD_TOO_LARGE" }, 413);
        }
        raw += decoder.decode(chunk.value, { stream: true });
      }
      body = JSON.parse(raw + decoder.decode());
    } finally { reader.releaseLock(); }
  } catch { return json({ error: "INVALID_PAYLOAD" }, 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "INVALID_PAYLOAD" }, 400);
  const { page, liked } = body as Record<string, unknown>;
  if (!isArticleReactionPage(page) || typeof liked !== "boolean") return json({ error: "INVALID_PAYLOAD" }, 400);
  try {
    return json(await getArticleReactionStore().set(page, visitor, liked));
  } catch {
    return json({ error: "REACTIONS_UNAVAILABLE" }, 503);
  }
}
