// frontend/app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || "http://localhost:5000";

async function proxyRequest(
  req: NextRequest,
  method: string
) {
  const { searchParams, pathname } = new URL(req.url);

  // /api/proxy → backend api 경로로 변환
  // ex) /api/proxy/chat/threads → /api/chat/threads
  const backendPath = pathname.replace("/api/proxy", "");
  const backendUrl = `${BACKEND_BASE_URL}/api${backendPath}?${searchParams.toString()}`;

  const headers: Record<string, string> = {};

  // Authorization 전달
  const auth = req.headers.get("authorization");
  if (auth) headers["authorization"] = auth;

  // Cookie 전달 (세션 기반 대응)
  const cookie = req.headers.get("cookie");
  if (cookie) headers["cookie"] = cookie;

  let body: any = undefined;
  if (method !== "GET" && method !== "HEAD") {
    try {
      body = await req.text();
    } catch {
      body = undefined;
    }
  }

  const res = await fetch(backendUrl, {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";

  // JSON 응답
  if (contentType.includes("application/json")) {
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  }

  // JSON이 아닌 경우 그대로 반환 (에러 HTML 포함)
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": contentType,
    },
  });
}

export async function GET(req: NextRequest) {
  return proxyRequest(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "POST");
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req, "PUT");
}

export async function PATCH(req: NextRequest) {
  return proxyRequest(req, "PATCH");
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req, "DELETE");
}
