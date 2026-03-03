"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Database,
  Trash2,
  Users,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Section = {
  id: string;
  title: string;
  icon: React.ElementType;
  body: React.ReactNode;
};

function classNames(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

const LAST_UPDATED = "2026-03-04"; // 필요 시 수정

export default function PrivacyPage() {
  const sections: Section[] = [
    {
      id: "purpose",
      title: "개인정보의 처리 목적",
      icon: FileText,
      body: (
        <div className="grid gap-3 text-sm leading-7 text-neutral-600">
          <p className="font-semibold text-neutral-900">
            RELYN(이하 “회사”)은 아래 목적 범위 내에서 최소한의 개인정보를 처리합니다.
          </p>
          <ul className="list-disc pl-5">
            <li>병원 입점 문의 상담 접수 및 담당자 연락</li>
            <li>에이전시 제휴 문의 상담 접수 및 담당자 연락</li>
            <li>문의 이력 관리 및 고객 응대 품질 개선(내부 기록 관리)</li>
          </ul>
        </div>
      ),
    },
    {
      id: "items",
      title: "수집 항목 및 수집 방법",
      icon: Database,
      body: (
        <div className="grid gap-4 text-sm leading-7 text-neutral-600">
          <div className="rounded-2xl bg-[#F7FAFF] p-4 ring-1 ring-slate-900/10">
            <div className="text-[13px] font-extrabold text-slate-950">수집 항목</div>
            <div className="mt-3 overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/10">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">구분</th>
                    <th className="px-4 py-3 font-bold">수집 항목</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-t">
                    <td className="px-4 py-3 font-semibold">병원 상담신청</td>
                    <td className="px-4 py-3">병원명, 성함, 전화번호</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-semibold">에이전시 상담신청</td>
                    <td className="px-4 py-3">에이전시명, 성함, 전화번호</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-[12px] leading-5 text-slate-500">
              * 위 항목은 상담 접수 및 연락을 위해 필요한 최소 정보입니다.
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-white/60 shadow-[0_14px_40px_rgba(2,6,23,0.10)]">
            <div className="text-[13px] font-extrabold text-neutral-900">수집 방법</div>
            <ul className="mt-2 list-disc pl-5">
              <li>웹사이트 상담문의 폼 입력 및 전송</li>
              <li>카카오 채팅문의(사용자 직접 입력/대화 과정에서 제공한 정보)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "retention",
      title: "보유 및 이용기간",
      icon: Users,
      body: (
        <div className="grid gap-3 text-sm leading-7 text-neutral-600">
          <p>
            회사는 개인정보의 처리 목적이 달성된 경우 지체 없이 파기합니다. 다만, 관계 법령에 따라
            보관이 필요한 경우 해당 법령에서 정한 기간 동안 보관할 수 있습니다.
          </p>
          <div className="rounded-2xl bg-[#F7FAFF] p-4 ring-1 ring-slate-900/10">
            <div className="text-[13px] font-extrabold text-slate-950">기본 보유 기준</div>
            <ul className="mt-2 list-disc pl-5 text-[13px] leading-6 text-slate-700">
              <li>상담 접수/응대 목적 달성 후 즉시 파기</li>
              <li>분쟁 대응 등 내부 관리 필요 시: 목적 달성 후 최대 1년 이내(내부 정책)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "thirdparty",
      title: "개인정보의 제3자 제공",
      icon: ShieldCheck,
      body: (
        <div className="grid gap-3 text-sm leading-7 text-neutral-600">
          <p>
            회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 법령에 근거가 있거나
            정보주체의 별도 동의를 받은 경우에 한하여 제공할 수 있습니다.
          </p>
        </div>
      ),
    },
    {
      id: "consignment",
      title: "개인정보 처리의 위탁",
      icon: Mail,
      body: (
        <div className="grid gap-4 text-sm leading-7 text-neutral-600">
          <p>
            회사는 서비스 운영을 위해 필요한 경우 개인정보 처리 업무를 위탁할 수 있으며, 이 경우 관련 법령 및
            지침에 따라 계약/관리·감독을 수행합니다. (처리방침 기재사항 및 작성지침 참고)
          </p>

          <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-white/60 shadow-[0_14px_40px_rgba(2,6,23,0.10)]">
            <div className="text-[13px] font-extrabold text-neutral-900">위탁 현황(템플릿)</div>
            <div className="mt-3 overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/10">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">수탁자</th>
                    <th className="px-4 py-3 font-bold">위탁 업무 내용</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-t">
                    <td className="px-4 py-3 font-semibold"> Resend(또는 메일 발송 솔루션)</td>
                    <td className="px-4 py-3">상담문의 접수 메일 발송</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-semibold">Amazon Web Services, Inc.| Cloudflare, Inc.</td>
                    <td className="px-4 py-3">서비스 인프라 운영(서버/DB/로그)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "destroy",
      title: "파기 절차 및 방법",
      icon: Trash2,
      body: (
        <div className="grid gap-3 text-sm leading-7 text-neutral-600">
          <p>
            회사는 개인정보의 보유기간 경과 또는 처리 목적 달성 시 지체 없이 파기하며, 복구 또는 재생되지 않도록
            안전하게 파기합니다.
          </p>
          <ul className="list-disc pl-5">
            <li>전자적 파일: 복구 불가능한 방법으로 영구 삭제</li>
            <li>출력물/서면: 분쇄 또는 소각</li>
          </ul>
        </div>
      ),
    },
    {
      id: "rights",
      title: "정보주체의 권리 및 행사 방법",
      icon: Users,
      body: (
        <div className="grid gap-3 text-sm leading-7 text-neutral-600">
          <p>
            이용자는 개인정보 열람, 정정·삭제, 처리정지 등을 요청할 수 있으며, 회사는 관련 법령에 따라 지체 없이
            조치합니다. (처리방침 기재사항/작성지침 참고)
          </p>
          <div className="rounded-2xl bg-[#F7FAFF] p-4 ring-1 ring-slate-900/10">
            <div className="text-[13px] font-extrabold text-slate-950">요청 방법</div>
            <ul className="mt-2 list-disc pl-5 text-[13px] leading-6 text-slate-700">
              <li>이메일: relyn.official.team@gmail.com</li>
            </ul>

          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "안전성 확보조치",
      icon: ShieldCheck,
      body: (
        <div className="grid gap-3 text-sm leading-7 text-neutral-600">
          <ul className="list-disc pl-5">
            <li>접근 권한 최소화 및 내부 관리계획 수립</li>
            <li>개인정보 취급자 교육</li>
            <li>접속기록 보관 및 점검</li>
            <li>전송 구간 암호화(HTTPS 등), 계정/비밀번호 관리</li>
          </ul>
        </div>
      ),
    },
    {
      id: "changes",
      title: "개인정보처리방침의 변경",
      icon: FileText,
      body: (
        <div className="grid gap-2 text-sm leading-7 text-neutral-600">
          <p>본 처리방침은 법령/서비스 변경에 따라 개정될 수 있으며, 개정 시 웹사이트를 통해 공지합니다.</p>
          <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-white/60 shadow-[0_14px_40px_rgba(2,6,23,0.10)]">
            <div className="text-[13px] font-extrabold text-neutral-900">시행일</div>
            <div className="mt-1 text-[13px] font-semibold text-neutral-700">{LAST_UPDATED}</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f9ff] text-neutral-900">
      {/* Background: subtle grid + soft radial (landing과 동일 톤) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.10),transparent_45%),radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.08),transparent_40%),radial-gradient(circle_at_70%_65%,rgba(99,102,241,0.08),transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(2, 6, 23, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(2, 6, 23, 0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1100px] px-6 py-10 lg:py-14">
        {/* Header */}
        <header className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/relyn_logo.png"
                alt="RELYN"
                width={120}
                height={34}
                className="h-[30px] w-auto"
                priority
              />
            </Link>

            <Button
              asChild
              variant="outline"
              className="h-10 rounded-full border-white/60 bg-white/70 px-5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-white"
            >
              <Link href="/">
                <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                메인으로
              </Link>
            </Button>
          </div>

          <div className="inline-flex w-fit items-center rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-blue-700 shadow-sm ring-1 ring-blue-100">
            Privacy Policy
          </div>

          <div>
            <h1 className="text-[38px] font-black leading-[1.1] tracking-[-0.02em] text-neutral-950">
              개인정보처리방침
            </h1>
            <p className="mt-3 max-w-[760px] text-sm leading-7 text-neutral-600">
              회사는 관련 법령 및 개인정보보호위원회 작성지침에 따라 개인정보를 최소한으로 수집·이용하고,
              안전하게 보호합니다.
            </p>
            <div className="mt-3 h-[3px] w-28 rounded-full bg-blue-500" />
          </div>
        </header>

        {/* Quick nav */}
        <section className="mt-8 rounded-[22px] bg-white/70 p-6 shadow-[0_18px_55px_rgba(2,6,23,0.10)] ring-1 ring-white/60">
          <div className="text-[12px] font-extrabold tracking-[0.12em] text-neutral-400">CONTENTS</div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center justify-between rounded-2xl bg-[#F7FAFF] px-4 py-3 ring-1 ring-slate-900/10 hover:bg-[#EEF5FF]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-2xl bg-blue-50 text-[#2F7AF6] ring-1 ring-blue-100">
                    <s.icon className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <div className="text-[13px] font-extrabold text-slate-950">{s.title}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </section>

        {/* Sections */}
        <section className="mt-8 grid gap-5">
          {sections.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="rounded-[22px] bg-white/70 p-7 shadow-[0_18px_55px_rgba(2,6,23,0.10)] ring-1 ring-white/60"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-black tracking-[-0.01em] text-neutral-950">{s.title}</h2>
                  <div className="mt-4">{s.body}</div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Contact card */}
        <section className="mt-10">
          <div className="rounded-[22px] bg-[linear-gradient(90deg,#0b1220_0%,#0b1a3a_55%,#0b2a5b_100%)] px-7 py-6 shadow-[0_18px_55px_rgba(2,6,23,0.16)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-bold tracking-[0.12em] text-white/80">CONTACT</div>
                <div className="mt-2 text-sm font-semibold text-white">
                  개인정보 관련 문의는 아래 채널로 접수해 주세요.
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold text-white ring-1 ring-white/15">
                  <Mail className="h-4 w-4 text-blue-200" />
                  relyn.official.team@gmail.com
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 pb-3 text-center text-[11px] leading-5 text-neutral-500">
          <div>주식회사 렐린 | 대표이사 장기석 | 사업자등록번호 299-03-03608</div>
          <div>서울특별시 강남구 역삼로 512, 5층 603(대치동, 인테크빌딩)</div>
          <div className="mt-2">
            <Link href="/privacy" className="font-semibold text-blue-600 hover:underline">
              개인정보처리방침
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}