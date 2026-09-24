import { GuideServiceLinks } from "@/components/common/PublicResourceLinks";
import Image from "@/app/korean-skin-treatments/shared/GuideImage";
import Link from "next/link";
import { ARTICLE_PATH, SECTIONS } from "./article";
import ReviewLanguageNav from "../review-guide-shared/ReviewLanguageNav";

export function GuideHeader({ cards = false }: { cards?: boolean }) {
  return <>
    <Link prefetch={false} className="skip" href={cards ? "#review-deck" : "#article"}>본문 바로가기</Link>
    <header className="relyn-header"><div className="relyn-header-inner">
      <Link prefetch={false} className="relyn-brand" href="/" aria-label="RELYN 홈"><Image src="/relyn_logo.png" width={1024} height={358} sizes="128px" alt="RELYN" loading="eager" /></Link>
      <span className="brand-divider" aria-hidden="true" /><Link prefetch={false} className="guide-label" href={ARTICLE_PATH}>가이드</Link>
      <nav className="view-switch" aria-label="읽는 방식"><Link prefetch={false} href={ARTICLE_PATH} aria-current={!cards ? "page" : undefined}>글로 읽기</Link><Link prefetch={false} href={ARTICLE_PATH + "/cards"} aria-current={cards ? "page" : undefined}>카드로 보기</Link></nav>
    </div></header>
    <nav className="breadcrumb" aria-label="현재 위치"><Link prefetch={false} href="/">RELYN 홈</Link><span aria-hidden="true">/</span><Link prefetch={false} className="breadcrumb-title" href={ARTICLE_PATH}>한국 미용시술 후기 읽기</Link>{cards && <><span aria-hidden="true">/</span><span aria-current="page">카드로 보기</span></>}</nav>
    <ReviewLanguageNav locale="ko-KR" cards={cards} />
  </>;
}

export function GuideToc() {
  return <nav className="article-toc" aria-label="글 목차"><p>이 글의 순서</p><ol>{SECTIONS.map((section, index) => <li key={section.id}><Link prefetch={false} href={"#" + section.id}><span>{String(index + 1).padStart(2, "0")}</span>{section.name}</Link></li>)}</ol><Link prefetch={false} className="toc-card-link" href={ARTICLE_PATH + "/cards"}>10장의 카드로 보기 ↗</Link></nav>;
}

export function GuideFooter() {
  return <footer className="relyn-footer"><div><Link prefetch={false} className="footer-wordmark" href="/">RELYN</Link><p>주식회사 렐린 · 대표이사 장기석 · 사업자등록번호 299-03-03608</p></div><nav aria-label="안내"><GuideServiceLinks locale="ko" /><Link prefetch={false} href="/korean-skin-treatments/upsell-kr">추가 시술·견적 가이드</Link><Link prefetch={false} href="/privacy">개인정보처리방침</Link></nav></footer>;
}
