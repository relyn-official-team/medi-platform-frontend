import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type Body =
  | { type: 'HOSPITAL'; orgName: string; name: string; phone: string; email: string }
  | { type: 'AGENCY'; orgName: string; name: string; phone: string; email: string };

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

    const type = body?.type === 'HOSPITAL' || body?.type === 'AGENCY' ? body.type : null;
    const orgName = sanitize(body?.orgName, 120);
    const name = sanitize(body?.name, 80);
    const phone = sanitize(body?.phone, 40);
    const email = sanitize(body?.email, 120);

if (!type || !orgName || !name || !phone || !email) {
  return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
}

const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
if (!isValidEmail) {
  return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
}

    const subject =
      type === 'HOSPITAL'
        ? `[병원입점문의] (${orgName})`
        : `[에이전시제휴문의] (${orgName})`;

    const text = [
      `문의유형: ${type === 'HOSPITAL' ? '병원입점문의' : '에이전시제휴문의'}`,
      `${type === 'HOSPITAL' ? '병원명' : '에이전시명'}: ${orgName}`,
      `성함: ${name}`,
      `연락처: ${phone}`,
      `이메일: ${email}`,
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
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}