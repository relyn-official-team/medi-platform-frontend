import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// B2C 고객 상담 문의 (/customerinquiry 랜딩 폼 전송용).
// 기존 /api/lead 는 병원/에이전시(B2B) 전용 스키마라 분리합니다.
// 동일한 Resend 환경변수(RESEND_API_KEY / LEAD_TO_EMAIL / LEAD_FROM_EMAIL)를 재사용합니다.

type Body = {
  locale?: string;
  name: string;
  contact: string;
  treatmentCategory?: string;
};

function sanitize(s: unknown, max = 200) {
  if (typeof s !== 'string') return '';
  return s.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL;
    const fromEmail = process.env.LEAD_FROM_EMAIL;

    if (!resendKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        { ok: false, error: 'Missing server env: RESEND_API_KEY / LEAD_TO_EMAIL / LEAD_FROM_EMAIL' },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Body;

    const locale = sanitize(body?.locale, 8) || 'ko';
    const name = sanitize(body?.name, 80);
    const contact = sanitize(body?.contact, 160);
    const treatmentCategory = sanitize(body?.treatmentCategory, 120);

    // 필수값: name, contact
    if (!name || !contact) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    const subject = `[고객상담문의/${locale}] ${name}`;

    const text = [
      `문의유형: 고객 상담 문의 (B2C)`,
      `언어: ${locale}`,
      `성함: ${name}`,
      `연락처(WhatsApp/이메일): ${contact}`,
      `관심 시술: ${treatmentCategory || '(선택 안 함)'}`,
      '',
      `수신: ${toEmail}`,
    ].join('\n');

    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
