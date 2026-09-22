import Image from "next/image";
import Link from "next/link";
import { ARTICLE_PATH, ARTICLE_TITLE, ARTICLE_SECTIONS } from "./article";
import { SKIN_GUIDE_PATHS } from "@/lib/skin-guide-locales";

export function GuideHeader({ cards = false }: { cards?: boolean }) {
  return <>
    <Link className="skip" href={cards ? "#card-track" : "#article"}>跳至主要內容</Link>
    <header className="relyn-header"><div className="relyn-header-inner">
      <Link className="relyn-brand" href="/" aria-label="RELYN 首頁"><Image src="/relyn_logo.png" sizes="(max-width: 600px) 100px, 128px" loading="eager" width={1024} height={358} alt="RELYN" /></Link>
      <span className="brand-divider" aria-hidden="true" />
      <Link className="guide-label" href={ARTICLE_PATH}>諮詢指南</Link>
      <nav className="view-switch" aria-label="閱讀方式">
        <Link href={ARTICLE_PATH} aria-current={cards ? undefined : "page"}>完整文章</Link>
        <Link href={`${ARTICLE_PATH}/cards`} aria-current={cards ? "page" : undefined}>圖卡重點</Link>
      </nav>
    </div></header>
    <nav className="breadcrumb" aria-label="目前位置">
      <Link href="/">RELYN 首頁</Link><span aria-hidden="true">/</span>
      {cards ? <><Link className="breadcrumb-title" href={ARTICLE_PATH}>{ARTICLE_TITLE}</Link><span aria-hidden="true">/</span><span aria-current="page">圖卡</span></> : <span className="breadcrumb-title" aria-current="page">{ARTICLE_TITLE}</span>}
    </nav>
  </>;
}

export function GuideToc() {
  return <nav className="article-toc" aria-label="文章目錄">
    <p>這篇文章會告訴你</p>
    <ol>{ARTICLE_SECTIONS.map(section => <li key={section.id}><Link href={`#${section.id}`}><span>{section.number}</span>{section.name}</Link></li>)}</ol>
    <Link className="toc-card-link" href={`${ARTICLE_PATH}/cards`}>用 10 張圖卡看重點 ↗</Link>
  </nav>;
}

export function GuideFooter({ cards = false }: { cards?: boolean }) {
  return <footer className="relyn-footer">
    <div><Link className="footer-wordmark" href="/">RELYN</Link><p>RELYN · 韓國公司名稱：<span lang="ko">주식회사 렐린</span><br />韓國營業登記號碼：299-03-03608</p></div>
    <nav aria-label="RELYN 與語言選擇">
      <Link href={`${SKIN_GUIDE_PATHS["ko-KR"]}${cards ? "/cards" : ""}`} hrefLang="ko-KR" lang="ko">한국어</Link>
      <Link href={`${SKIN_GUIDE_PATHS["ja-JP"]}${cards ? "/cards" : ""}`} hrefLang="ja-JP" lang="ja">日本語</Link>
      <Link href="/">關於 RELYN ↗</Link><Link href="/privacy">隱私權政策（韓文）</Link>
    </nav>
  </footer>;
}
