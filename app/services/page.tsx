import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CONSULTATION_LINKS,
  EMPLOYEE_CONSULTATION_LINKS,
  GUIDE_LINKS,
  PLATFORM_LINKS,
  SERVICE_DIRECTORY_URL,
  type PublicLink,
} from "@/lib/public-navigation";

const TITLE = "서비스 안내 · Services & guides | RELYN";
const DESCRIPTION = "RELYN의 병원·에이전시 협업 플랫폼 소개, 한국 미용시술 상담, 피부과 방문 전 읽을 가이드를 언어별로 찾아보세요.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SERVICE_DIRECTORY_URL, languages: {} },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: SERVICE_DIRECTORY_URL, type: "website", siteName: "RELYN" },
};

function ResourceList({ links }: { links: PublicLink[] }) {
  return <ul className="mt-5 space-y-3">
    {links.map(link => <li key={link.href}>
      <a href={link.href} lang={link.lang} hrefLang={link.lang} className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-blue-800 transition hover:border-blue-400 hover:bg-blue-50">
        {link.label}<span aria-hidden="true" className="ml-2">→</span>
      </a>
    </li>)}
  </ul>;
}

export default function ServicesPage() {
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" aria-label="RELYN 홈"><Image src="/relyn_logo.png" alt="RELYN" width={112} height={39} priority /></Link>
        <Link href="/" className="text-sm text-slate-600 hover:underline">RELYN 소개</Link>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <p className="text-xs font-semibold tracking-widest text-blue-700" lang="en">RELYN · SERVICES & GUIDES</p>
      <h1 className="mt-4 break-keep text-3xl font-bold tracking-tight sm:text-4xl">어떤 도움이 필요하신가요?</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">파트너 협업부터 한국 미용시술 상담과 방문 전 준비까지.<br />목적과 언어에 맞는 RELYN 안내를 찾아보세요.</p>
      <p className="mt-3 text-sm leading-6 text-slate-500" lang="en">Explore our partner platform, consultation services and guides. Choose a page in your language.</p>
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <section aria-labelledby="platform-title" className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold text-blue-700" lang="en">FOR PARTNERS</p>
          <h2 id="platform-title" className="mt-3 text-xl font-bold">병원·에이전시 협업</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">해외환자 예약, 계약, 정산을 함께 관리하는 플랫폼을 소개합니다.</p>
          <p className="mt-2 text-xs leading-6 text-slate-500" lang="en">Platform overview for clinics and agencies.</p>
          <ResourceList links={PLATFORM_LINKS} />
        </section>
        <section aria-labelledby="consultation-title" className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold text-blue-700" lang="en">CONSULTATION</p>
          <h2 id="consultation-title" className="mt-3 text-xl font-bold">한국 미용시술 상담</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">관심 시술, 방문 일정, 예산을 바탕으로 상담과 예약 조율을 도와드립니다.</p>
          <p className="mt-2 text-xs leading-6 text-slate-500" lang="en">Consultation and booking support in your language.</p>
          <ResourceList links={CONSULTATION_LINKS} />
          <h3 className="mt-7 text-sm font-semibold">태국 기업 임직원 안내</h3>
          <ResourceList links={EMPLOYEE_CONSULTATION_LINKS} />
        </section>
        <section aria-labelledby="guides-title" className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold text-blue-700" lang="en">BEFORE YOUR VISIT</p>
          <h2 id="guides-title" className="mt-3 text-xl font-bold">피부과 방문 전 가이드</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">추가 시술과 견적을 판단하는 질문, 후기를 읽을 때 확인할 단서를 정리했습니다.</p>
          <p className="mt-2 text-xs leading-6 text-slate-500" lang="en">Questions to ask about treatment recommendations, quotes and reviews.</p>
          <ResourceList links={GUIDE_LINKS} />
        </section>
      </div>
    </main>
    <footer className="border-t border-slate-200 px-6 py-8 text-center text-xs leading-6 text-slate-500">
      <p>주식회사 렐린 · 대표이사 장기석 · 사업자등록번호 299-03-03608</p>
      <Link href="/privacy" className="mt-2 inline-block underline underline-offset-4">개인정보처리방침</Link>
    </footer>
  </div>;
}
