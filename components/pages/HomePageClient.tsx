'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Handshake,
  FileSignature,
  Receipt,
  Database,
  Users,
  BarChart3,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Layers3,
  PieChart,
  Mail,
  MessageCircle,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Phone,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import LottieHero from "@/components/common/LottieHero";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}


type InquiryType = 'HOSPITAL' | 'AGENCY';

const GOOGLE_ADS_SEND_TO = 'AW-17991152486/4dzyCIKP3oUcEObm7IJD';

export default function Page() {
  const [typeSelectOpen, setTypeSelectOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [inquiryType, setInquiryType] = React.useState<InquiryType | null>(null);

  const [orgName, setOrgName] = React.useState('');
  const [personName, setPersonName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [submitDone, setSubmitDone] = React.useState<'success' | 'error' | null>(null);

    const trackGoogleAdsConversion = () => {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_SEND_TO,
      value: 1.0,
      currency: 'KRW',
    });
  };

  const openInquiryFlow = () => {
    setSubmitDone(null);
    setInquiryType(null);
    setOrgName('');
    setPersonName('');
    setPhone('');
    setTypeSelectOpen(true);
  };

  const pickType = (t: InquiryType) => {
    setInquiryType(t);
    setTypeSelectOpen(false);
    setFormOpen(true);
  };

  const closeAll = () => {
    setTypeSelectOpen(false);
    setFormOpen(false);
    setInquiryType(null);
    setSubmitting(false);
    setSubmitDone(null);
  };

  const backToTypeSelect = () => {
  setFormOpen(false);
  setTypeSelectOpen(true);
  setSubmitDone(null);
  setSubmitting(false);
};

  const onSubmit = async () => {
    if (!inquiryType) return;

    const nameLabel = inquiryType === 'HOSPITAL' ? '병원명' : '에이전시명';
    if (!orgName.trim() || !personName.trim() || !phone.trim()) {
      setSubmitDone('error');
      return;
    }

    setSubmitting(true);
    setSubmitDone(null);

    try {
      const subject =
        inquiryType === 'HOSPITAL'
          ? `[병원입점문의] (${orgName.trim()})`
          : `[에이전시제휴문의] (${orgName.trim()})`;

      // NOTE: Resend 등 메일 발송은 서버에서만 호출 가능하므로 /api/contact 라우트에서 처리하세요.
const res = await fetch('/api/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: inquiryType,
    orgName: orgName.trim(),
    name: personName.trim(),
    phone: phone.trim(),
  }),
});

const data = await res.json().catch(() => null);
if (!res.ok) throw new Error(data?.error ?? 'request_failed');

trackGoogleAdsConversion();
setSubmitDone('success');
    } catch {
      setSubmitDone('error');
    } finally {
      setSubmitting(false);
    }
  };

  const marketCards = [
    { icon: TrendingUp, title: '코로나 이후', bold: '글로벌 고객 수 빠른 회복' },
    { icon: BarChart3, title: '고단가 시술 중심', bold: '매출 구조 확대' },
    { icon: Globe2, title: '국가 및 채널', bold: '유입 경로 다변화' },
    { icon: Sparkles, title: '프리미엄 클리닉', bold: '경쟁 심화' },
  ] as const;

  const gapCards = [
    { icon: FileSignature, title: '개별 계약 중심', bold: '운영' },
    { icon: Receipt, title: '표준화되지 않은', bold: '수수료 구조' },
    { icon: Database, title: '엑셀 기반', bold: '정산 관리' },
  ] as const;

  const systemCards = [
    {
      icon: FileSignature,
      title: '계약의\n기준 정립',
      desc: '표준화된 계약 양식과\n프로세스를 통해\n신뢰 가능한 협업 시작',
    },
    {
      icon: Receipt,
      title: '정산의\n기준 정립',
      desc: '투명한 수수료 체계와\n자동화된 정산으로\n재무적 리스크 제거',
    },
    {
      icon: Database,
      title: '데이터의\n통합 관리',
      desc: '분산된 유입 경로와\n매출 데이터를\n하나의 대시보드로 통합',
    },
    {
      icon: Users,
      title: '관계의\n구조화',
      desc: '일회성 연결을 넘어\n지속 가능한\n파트너십 생태계 구축',
    },
  ] as const;

  return (
    <main className="min-h-screen bg-[#f6f9ff] text-neutral-900">
      {/* Background: subtle grid + soft radial */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.10),transparent_45%),radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.08),transparent_40%),radial-gradient(circle_at_70%_65%,rgba(99,102,241,0.08),transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(2, 6, 23, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(2, 6, 23, 0.06) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="mx-auto max-w-[1100px] px-6 py-10 lg:py-14">
        {/* HERO */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/relyn_logo.png"
                alt="RELYN"
                width={120}
                height={34}
                className="h-[30px] w-auto"
                priority
              />
            </div>

            <div className="mt-6 inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-blue-700 shadow-sm ring-1 ring-blue-100">
              Global Client Acquisition Infrastructure
            </div>

            <h1 className="mt-5 text-[44px] font-black leading-[1.05] tracking-[-0.02em] text-neutral-950">
              연결을 넘어,
              <br />
              <span className="text-blue-600">기준을 만드는 구조</span>
            </h1>

            <p className="mt-5 max-w-[560px] text-sm leading-7 text-neutral-600">
              글로벌 고객 유치 시장에서 발생하는 계약·정산·데이터의 분산을 해결하여, 병원과 에이전시
              간의 거래를 “표준 구조”로 전환합니다.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                onClick={openInquiryFlow}
                className="h-11 rounded-full bg-[#0b1220] px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,6,23,0.18)] hover:bg-[#0b1220]/90"
              >
                <Mail className="mr-2 h-4 w-4" />
                상담문의
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-white/60 bg-white/70 px-6 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-white"
              >
                <Link href="https://pf.kakao.com/_XxgsAX/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  카카오 채팅문의
                </Link>
              </Button>
            </div>

            {/* Hero mini cards (2x2) */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MiniCard
                icon={FileSignature}
                title="계약의 기준 정립"
                desc="표준화된 계약과 프로세스로 신뢰 기반 협업을 시작합니다."
              />
              <MiniCard
                icon={Receipt}
                title="정산의 기준 정립"
                desc="투명한 수수료 체계와 정기 정산으로 재무 리스크를 줄입니다."
              />
              <MiniCard
                icon={Database}
                title="데이터의 통합 관리"
                desc="분산된 유입·매출 데이터를 대시보드로 통합해 운영 효율을 높입니다."
              />
              <MiniCard
                icon={Users}
                title="관계의 구조화"
                desc="일회성 연결을 넘어 지속 가능한 파트너십 구조를 만듭니다."
              />
            </div>
          </div>

{/* Main visual (Lottie) */}
<div className="lg:pt-20">
  <div className="relative">
    {/* bg/border 제거 + overflow만 유지 */}
    <div className="mt-4 h-[500px] overflow-hidden rounded-[22px] bg-transparent">
      <LottieHero className="h-full w-full" />
    </div>

    <div className="mt-5 rounded-[16px] bg-blue-600 px-5 py-3 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)]">
      RELYN Infrastructure Platform
    </div>
  </div>
</div>
        </section>

        {/* MARKET OVERVIEW */}
        <section className="mt-14">
          <div className="text-[11px] font-bold tracking-[0.16em] text-neutral-400">MARKET OVERVIEW</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.02em]">
            시장은 <span className="text-blue-600">확장 단계</span>에 진입했습니다
          </h2>
          <div className="mt-3 h-[3px] w-28 rounded-full bg-blue-500" />

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {marketCards.map((c) => (
              <WideCard key={c.bold} icon={c.icon} title={c.title} bold={c.bold} />
            ))}
          </div>

          <KeyMessageBar accent="blue" rightText="시장은 회복을 넘어 구조적 확장 단계에 진입했습니다" />
        </section>

        {/* OPERATIONAL GAP */}
        <section className="mt-14">
          <div className="text-[11px] font-bold tracking-[0.16em] text-neutral-400">OPERATIONAL GAP</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.02em]">
            그러나 운영 구조는 <span className="text-rose-500">체계화 되어있지 않습니다</span>
          </h2>
          <div className="mt-3 h-[3px] w-28 rounded-full bg-orange-500" />

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {gapCards.map((c) => (
              <SmallRiskCard key={c.bold} icon={c.icon} title={c.title} bold={c.bold} />
            ))}
          </div>

          <KeyMessageBar accent="rose" rightText="성장한 시장, 그러나 체계는 부재합니다" />
        </section>

        {/* NETWORK EFFECT */}
        <section className="mt-14">
          <div className="text-[11px] font-bold tracking-[0.16em] text-neutral-400">NETWORK EFFECT</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.02em]">Network Effect</h2>
          <div className="mt-3 h-[3px] w-28 rounded-full bg-blue-500" />

          
            <div className="relative overflow-hidden rounded-[22px] bg-white px-4 py-8 sm:px-6 sm:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_42%)]" />
              <div className="relative">
              {/* PC/Tablet(기존 그대로) */}
              <div className="hidden sm:block">
                <NetworkEffectSVG />
              </div>
              {/* Mobile 전용(가독성 리팩토링) */}
              <div className="sm:hidden">
                <MobileNetworkEffectSVG />
              </div>
              </div>
            </div>

            
          

          <div className="mt-7 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0b1220] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,6,23,0.18)]">
              <Sparkles className="h-4 w-4 text-blue-300" />
              연결이 쌓일수록 구조는 더욱 강해집니다
            </div>
          </div>
        </section>

        {/* SYSTEM ARCHITECTURE */}
        <section className="mt-14">
          <div className="text-[11px] font-bold tracking-[0.16em] text-neutral-400">SYSTEM ARCHITECTURE</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.02em]">
            <span className="text-blue-600">RELYN</span>이 만드는 체계
          </h2>
          <div className="mt-3 h-[3px] w-28 rounded-full bg-blue-500" />

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {systemCards.map((c) => (
              <SystemCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} />
            ))}
          </div>

          <KeyMessageBar
            accent="blue"
            rightText="거래를 체계적인 관리 가능한 구조로 만들어 최고의 편의성을 제공합니다"
          />
        </section>

        {/* ONBOARDING */}
        <section className="mt-14">
          <div className="text-[11px] font-bold tracking-[0.16em] text-neutral-400">ONBOARDING PROCESS</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.02em]">도입 프로세스</h2>
          <div className="mt-3 h-[3px] w-28 rounded-full bg-blue-500" />

          <div className="mt-8 rounded-[28px] bg-white/70 p-7 shadow-[0_18px_55px_rgba(2,6,23,0.10)] ring-1 ring-white/60">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
              <StepCard
                step="01"
                icon={FileSignature}
                title="기존 계약 등록"
                desc="현재 운영 중인 계약 정보를 플랫폼에 간단히 등록하여 디지털화를 시작합니다."
                rightConnector
              />
              <StepCard
                step="02"
                icon={Layers3}
                title="정산 구조 세팅"
                desc="복잡한 수수료율과 정산 주기를 시스템에 설정하여 자동 정산의 기반을 마련합니다."
                rightConnector
              />
              <StepCard
                step="03"
                icon={PieChart}
                title="통합 운영 시작"
                desc="단일 대시보드에서 모든 파트너와 매출을 한눈에 관리합니다."
              />
            </div>

            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0b1220] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,6,23,0.18)]">
                <ShieldCheck className="h-4 w-4 text-blue-300" />
                기존 운영 방식을 바꾸지 않아도 도입 가능합니다
              </div>
            </div>

            
          </div>
        </section>

        {/* CLOSING */}
        <section className="mt-16 text-center">
          <h3 className="text-3xl font-black tracking-[-0.02em]">
            성장한 시장, 이제 <span className="text-blue-600">체계</span>를 설계할 차례입니다
          </h3>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              onClick={openInquiryFlow}
              className="h-11 rounded-full bg-[#0b1220] px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,6,23,0.18)] hover:bg-[#0b1220]/90"
            >
              <Mail className="mr-2 h-4 w-4" />
              상담문의
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/60 bg-white/70 px-6 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-white"
            >
              <Link href="https://pf.kakao.com/_XxgsAX/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                카카오 채팅문의
              </Link>
            </Button>
          </div>

          <footer className="mt-10 pb-3 text-center text-[11px] leading-5 text-neutral-500">
            <div>주식회사 렐린 | 대표이사 장기석 | 사업자등록번호 299-03-03608</div>
            <div>서울특별시 강남구 역삼로 512, 5층 603(대치동, 인테크빌딩)</div>
            <div className="mt-2">
              <Link href="/privacy" className="font-semibold text-blue-600 hover:underline">
              개인정보처리방침
              </Link>
            </div>
          </footer>
        </section>
      </div>

{/* Step 1: Type select */}
<Dialog open={typeSelectOpen} onOpenChange={(v) => setTypeSelectOpen(v)}>
  <DialogContent className="max-w-[520px] !border-0 !bg-transparent !p-0 !shadow-none">
      {/* 접근성 필수: DialogTitle */}
  <DialogHeader className="sr-only">
    <DialogTitle>문의 유형 선택</DialogTitle>
  </DialogHeader>
    {/* 카드 */}
    <div className="relative w-full rounded-3xl bg-white p-6 shadow-[0_28px_100px_rgba(2,6,23,0.28)] ring-1 ring-slate-900/10">
      {/* 헤더(타이틀 + X) */}
      <div className="flex items-center justify-between">
        <div className="text-[16px] font-extrabold text-slate-950">문의 유형 선택</div>
        <button
          className="rounded-full p-2 hover:bg-slate-100"
          onClick={closeAll}
          aria-label="Close"
        >
          <X className="h-5 w-5 text-slate-600" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-5 grid gap-3">
        <button
          onClick={() => pickType('HOSPITAL')}
          className="flex items-center justify-between rounded-2xl bg-[#F7FAFF] px-5 py-4 text-left ring-1 ring-slate-900/10 hover:bg-[#EEF5FF]"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-[#2F7AF6] ring-1 ring-blue-100">
              <Building2 className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-slate-950">병원입점문의</div>
              <div className="mt-1 text-[12px] font-medium text-slate-600">
                병원 입점 관련 상담을 접수합니다.
              </div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-600" strokeWidth={2.2} />
        </button>

        <button
          onClick={() => pickType('AGENCY')}
          className="flex items-center justify-between rounded-2xl bg-[#F7FAFF] px-5 py-4 text-left ring-1 ring-slate-900/10 hover:bg-[#EEF5FF]"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-[#2F7AF6] ring-1 ring-blue-100">
              <Handshake className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-slate-950">에이전시제휴문의</div>
              <div className="mt-1 text-[12px] font-medium text-slate-600">
                에이전시 파트너십 관련 상담을 접수합니다.
              </div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-600" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-5 text-[12px] font-medium text-slate-500">
        상담내용은 이메일로 접수되며, 담당자가 확인 후 연락드립니다.
      </div>
    </div>
  </DialogContent>
</Dialog>

{/* Step 2: Form modal */}
<Dialog open={formOpen} onOpenChange={(v) => setFormOpen(v)}>
  <DialogContent className="max-w-[520px] !border-0 !bg-transparent !p-0 !shadow-none">
      <DialogHeader className="sr-only">
    <DialogTitle>
      {inquiryType === 'HOSPITAL' ? '병원입점문의' : '에이전시제휴문의'}
    </DialogTitle>
  </DialogHeader>
    <div className="relative w-full rounded-3xl bg-white p-6 shadow-[0_28px_100px_rgba(2,6,23,0.28)] ring-1 ring-slate-900/10">
      {/* 헤더(타이틀 + 서브 + X) */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[16px] font-extrabold text-slate-950">
            {inquiryType === 'HOSPITAL' ? '병원입점문의' : '에이전시제휴문의'}
          </div>
          <div className="mt-1 text-[12px] font-medium text-slate-500">
            필수 항목만 입력하면 바로 접수됩니다.
          </div>
        </div>

        <button
          className="rounded-full p-2 hover:bg-slate-100"
          onClick={closeAll}
          aria-label="Close"
        >
          <X className="h-5 w-5 text-slate-600" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {/* org */}
        <label className="grid gap-2">
          <div className="text-[12px] font-semibold text-slate-700">
            {inquiryType === 'HOSPITAL' ? '병원명' : '에이전시명'}
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-[#F7FAFF] px-4 py-3 ring-1 ring-slate-900/10 focus-within:ring-[#2F7AF6]/40">
            <Building2 className="h-4 w-4 text-[#2F7AF6]" strokeWidth={2.2} />
            <Input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder={
                inquiryType === 'HOSPITAL'
                  ? '병원명을 입력해 주세요'
                  : '에이전시명을 입력해 주세요'
              }
              className="h-auto border-0 bg-transparent p-0 text-[14px] font-medium text-slate-900 shadow-none outline-none placeholder:text-slate-400 focus-visible:ring-0"
            />
          </div>
        </label>

        {/* person */}
        <label className="grid gap-2">
          <div className="text-[12px] font-semibold text-slate-700">성함</div>
          <div className="flex items-center gap-3 rounded-2xl bg-[#F7FAFF] px-4 py-3 ring-1 ring-slate-900/10 focus-within:ring-[#2F7AF6]/40">
            <Users className="h-4 w-4 text-[#2F7AF6]" strokeWidth={2.2} />
            <Input
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="성함을 입력해 주세요"
              className="h-auto border-0 bg-transparent p-0 text-[14px] font-medium text-slate-900 shadow-none outline-none placeholder:text-slate-400 focus-visible:ring-0"
            />
          </div>
        </label>

        {/* phone */}
        <label className="grid gap-2">
          <div className="text-[12px] font-semibold text-slate-700">연락처</div>
          <div className="flex items-center gap-3 rounded-2xl bg-[#F7FAFF] px-4 py-3 ring-1 ring-slate-900/10 focus-within:ring-[#2F7AF6]/40">
            <Phone className="h-4 w-4 text-[#2F7AF6]" strokeWidth={2.2} />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="연락처를 입력해 주세요"
              className="h-auto border-0 bg-transparent p-0 text-[14px] font-medium text-slate-900 shadow-none outline-none placeholder:text-slate-400 focus-visible:ring-0"
            />
          </div>
        </label>

        {/* result */}
        {submitDone === 'success' && (
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-800 ring-1 ring-emerald-200">
            접수되었습니다. 담당자가 확인 후 연락드리겠습니다.
          </div>
        )}
        {submitDone === 'error' && (
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-[13px] font-semibold text-rose-800 ring-1 ring-rose-200">
            입력값을 확인해주세요. 또는 잠시 후 다시 시도해주세요.
          </div>
        )}

        {/* actions */}
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={backToTypeSelect}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-slate-800 ring-1 ring-slate-900/10 hover:bg-slate-50 disabled:opacity-60"
          >
            <ArrowRight className="h-4 w-4 -rotate-180 text-slate-700" strokeWidth={2.2} />
            유형 다시 선택
          </button>

          <button
            onClick={onSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-[#0B1630] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_18px_70px_rgba(2,6,23,0.16)] hover:opacity-95 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Mail className="h-4 w-4 text-[#66A6FF]" strokeWidth={2.2} />
            {submitting ? '전송 중...' : '접수하기'}
          </button>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>
    </main>
  );
}

function MiniCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[18px] bg-white/70 p-5 shadow-[0_14px_40px_rgba(2,6,23,0.10)] ring-1 ring-white/60">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-neutral-900">{title}</div>
          <div className="mt-2 whitespace-pre-line text-xs leading-5 text-neutral-500">{desc}</div>
        </div>
      </div>
      
    </div>
  );
}

function WideCard({
  icon: Icon,
  title,
  bold,
}: {
  icon: React.ElementType;
  title: string;
  bold: string;
}) {
  return (
    <div className="rounded-[18px] bg-white/70 px-6 py-5 shadow-[0_14px_40px_rgba(2,6,23,0.10)] ring-1 ring-white/60">
      <div className="flex items-center gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-neutral-700">{title}</div>
          <div className="mt-1 text-sm font-black text-neutral-950">{bold}</div>
        </div>
      </div>
      
    </div>
  );
}

function SmallRiskCard({
  icon: Icon,
  title,
  bold,
}: {
  icon: React.ElementType;
  title: string;
  bold: string;
}) {
  return (
    <div className="rounded-[18px] bg-white/70 px-6 py-5 shadow-[0_14px_40px_rgba(2,6,23,0.10)] ring-1 ring-white/60">
      <div className="flex items-center gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-500 ring-1 ring-rose-100">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-neutral-700">{title}</div>
          <div className="mt-1 text-sm font-black text-neutral-950">{bold}</div>
        </div>
      </div>
      
    </div>
  );
}

function SystemCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[18px] bg-white/70 p-6 shadow-[0_14px_40px_rgba(2,6,23,0.10)] ring-1 ring-white/60">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 whitespace-pre-line text-base font-black leading-6 text-neutral-950">{title}</div>
      <div className="mt-3 whitespace-pre-line text-xs leading-5 text-neutral-500">{desc}</div>
      
    </div>
  );
}

function StepCard({
  step,
  icon: Icon,
  title,
  desc,
  rightConnector,
}: {
  step: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  rightConnector?: boolean;
}) {
  return (
    <div className="relative rounded-[18px] bg-white/70 p-6 shadow-[0_14px_40px_rgba(2,6,23,0.10)] ring-1 ring-white/60">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-[10px] bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100">
        {step}
      </div>

      <div className="mt-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
        <Icon className="h-6 w-6" />
      </div>

      <div className="mt-4 text-sm font-black text-neutral-950">{title}</div>
      <div className="mt-2 whitespace-pre-line text-xs leading-5 text-neutral-500">{desc}</div>

      {rightConnector && (
        <div className="absolute right-[-22px] top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-[0_12px_30px_rgba(2,6,23,0.12)] ring-1 ring-white/70">
            <ChevronRight className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      )}
    </div>
  );
}

function KeyMessageBar({ accent, rightText }: { accent: 'blue' | 'rose'; rightText: string }) {
  const isRose = accent === 'rose';
  return (
    <div
      className={[
        'mt-10 flex items-center justify-between gap-4 rounded-[18px] px-6 py-4 shadow-[0_18px_55px_rgba(2,6,23,0.16)]',
        isRose
          ? 'bg-[linear-gradient(90deg,#0b1220_0%,#2b0b1a_55%,#5b0b2d_100%)]'
          : 'bg-[linear-gradient(90deg,#0b1220_0%,#0b1a3a_55%,#0b2a5b_100%)]',
      ].join(' ')}
    >
      <div className="text-xs font-bold tracking-[0.12em] text-white/80">KEY MESSAGE</div>
      <div className="text-xs font-semibold text-white">{rightText}</div>
    </div>
  );
}

function NetworkEffectSVG() {
  return (
    <svg viewBox="0 0 980 360" className="h-[260px] w-full lg:h-[300px]" role="img" aria-label="Network Effect">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="rgba(2,6,23,0.18)" />
        </filter>

        <linearGradient id="lineBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.85" />
          <stop offset="1" stopColor="#2563eb" stopOpacity="0.95" />
        </linearGradient>

        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" opacity="0.9" />
        </marker>
      </defs>

      {/* top loop */}
      <path
        d="M 220 90 C 360 20, 620 20, 760 90"
        fill="none"
        stroke="url(#lineBlue)"
        strokeWidth="3.5"
        strokeLinecap="round"
        markerEnd="url(#arrow)"
        opacity="0.95"
      />
      {/* bottom loop */}
      <path
        d="M 760 270 C 620 340, 360 340, 220 270"
        fill="none"
        stroke="url(#lineBlue)"
        strokeWidth="3.5"
        strokeLinecap="round"
        markerEnd="url(#arrow)"
        opacity="0.95"
      />
      {/* middle lines */}
      <path d="M 260 180 L 720 180" stroke="url(#lineBlue)" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <path d="M 260 180 L 490 180" stroke="url(#lineBlue)" strokeWidth="3" strokeLinecap="round" opacity="0.35" />

      {/* labels on loops */}
      <g filter="url(#shadow)">
        <rect x="350" y="34" width="280" height="56" rx="18" fill="#ffffff" />
        <text x="490" y="58" textAnchor="middle" fontSize="16" fontWeight="800" fill="#111827">
          에이전시 가치 상승
        </text>
        <text x="490" y="76" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6b7280">
          High Quality Options
        </text>
      </g>

      <g filter="url(#shadow)">
        <rect x="370" y="270" width="240" height="56" rx="18" fill="#ffffff" />
        <text x="490" y="294" textAnchor="middle" fontSize="16" fontWeight="800" fill="#111827">
          병의원 유입 확대
        </text>
        <text x="490" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6b7280">
          More Clients
        </text>
      </g>

      {/* Hospital node */}
      <g>
        <circle cx="170" cy="180" r="78" fill="#eaf3ff" />

        {/* icon: centered, no background fill (누끼 느낌) */}
        <g transform="translate(170,170)">
          <g transform="translate(-26,-28)">
            <path
              d="M10 56V12c0-4 3-7 7-7h18c4 0 7 3 7 7v44"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M18 22h8M18 32h8M18 42h8" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M34 32h8M34 42h8" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </g>
        <text x="170" y="220" textAnchor="middle" fontSize="15" fontWeight="800" fill="#2563eb">
          병의원
        </text>
        <text x="170" y="236" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb">
          ↑↑ 증가
        </text>
      </g>

      {/* Agency node */}
      <g>
        <circle cx="810" cy="180" r="78" fill="#e8fbff" />
        {/* icon: centered, no background fill (누끼 느낌) */}
        <g transform="translate(810,170)">
          <g transform="translate(-28,-26)">
            <path
              d="M10 32l12 12c4 4 10 4 14 0l18-18c3-3 3-8 0-11l-12-12"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 22l10-10c3-3 8-3 11 0l6 6"
             fill="none"
              stroke="#0ea5e9"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <text x="810" y="216" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0ea5e9">
          에이전시
        </text>
        <text x="810" y="236" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0ea5e9">
          ↑↑ 증가
        </text>
      </g>

      {/* Center RELYN */}
      <g filter="url(#shadow)">
        <circle cx="490" cy="180" r="62" fill="#ffffff" />
      </g>
      {/* 로고 이미지로 대체 */}
      <image
        href="/relyn_logo.png"
        x="442"
        y="164"
        width="96"
        height="32"
        preserveAspectRatio="xMidYMid meet"
      />
      <text x="490" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6b7280">
        Platform
      </text>
    </svg>
  );
}

function MobileNetworkEffectSVG() {
  return (
    <svg viewBox="0 0 360 240" className="h-[320px] w-full" role="img" aria-label="Network Effect Mobile">
      <defs>
        <filter id="mShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="rgba(2,6,23,0.16)" />
        </filter>
        <linearGradient id="mLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2563eb" stopOpacity="1" />
        </linearGradient>
        {/* arrow: smaller */}
        <marker id="mArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" opacity="0.9" />
        </marker>
      </defs>

      {/* loops (BEHIND everything) */}
      <g opacity="0.95">
        <path
          d="M 78 86 C 118 56, 242 56, 282 86"
          fill="none"
          stroke="url(#mLine)"
          strokeWidth="2.4"
          strokeLinecap="round"
          markerEnd="url(#mArrow)"
        />
        <path
          d="M 282 154 C 242 184, 118 184, 78 154"
          fill="none"
          stroke="url(#mLine)"
          strokeWidth="2.4"
          strokeLinecap="round"
          markerEnd="url(#mArrow)"
        />
      </g>

      {/* Hospital node (ABOVE loops) */}
      <g>
        <circle cx="64" cy="120" r="46" fill="#eaf3ff" />
        <g transform="translate(64,114)">
          <g transform="translate(-16,-25)">
            <path
              d="M6 36V8c0-3 2-5 5-5h12c3 0 5 2 5 5v28"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 14h6M12 22h6M12 30h6" stroke="#2563eb" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M22 22h6M22 30h6" stroke="#2563eb" strokeWidth="3.2" strokeLinecap="round" />
          </g>
        </g>
        <text x="64" y="142" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#2563eb">
          병의원
        </text>
        <text x="64" y="155" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#2563eb">
          ↑↑ 증가
        </text>
      </g>

       {/* Agency node (ABOVE loops) */}
      <g>
        <circle cx="296" cy="120" r="46" fill="#e8fbff" />
        <g transform="translate(296,114)">
          <g transform="translate(-18,-22)">
            <path
              d="M6 20l8 8c3 3 8 3 11 0l12-12c2-2 2-6 0-8l-8-8"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 14l7-7c2-2 6-2 8 0l4 4"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <text x="296" y="142" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#0ea5e9">
          에이전시
        </text>
        <text x="296" y="155" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0ea5e9">
          ↑↑ 증가
        </text>
      </g>

      {/* Center (ABOVE loops) */}
      <g filter="url(#mShadow)">
        <circle cx="180" cy="120" r="40" fill="#ffffff" />
      </g>
      <image href="/relyn_logo.png" x="144" y="108" width="72" height="24" preserveAspectRatio="xMidYMid meet" />
      <text x="180" y="146" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#6b7280">
        Platform
      </text>

      {/* labels (TOPMOST) */}
      <g filter="url(#mShadow)">
       <rect x="78" y="22" width="204" height="48" rx="16" fill="#ffffff" />
        <text x="180" y="44" textAnchor="middle" fontSize="14" fontWeight="800" fill="#111827">
          에이전시 가치 상승
        </text>
        <text x="180" y="60" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#6b7280">
          High Quality Options
        </text>
     </g>

      <g filter="url(#mShadow)">
        <rect x="88" y="170" width="184" height="48" rx="16" fill="#ffffff" />
        <text x="180" y="192" textAnchor="middle" fontSize="14" fontWeight="800" fill="#111827">
         병의원 유입 확대
        </text>
        <text x="180" y="208" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#6b7280">
          More Clients
        </text>
      </g>
    </svg>
  );
}