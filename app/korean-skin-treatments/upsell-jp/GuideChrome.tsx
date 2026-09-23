import Image from "@/app/korean-skin-treatments/shared/GuideImage";
import Link from "next/link";
import { ARTICLE_PATH, ARTICLE_TITLE, ARTICLE_SECTIONS } from "./article";
import { SKIN_GUIDE_PATHS } from "@/lib/skin-guide-locales";

export function GuideHeader({ cards = false }: { cards?: boolean }) {
  return <>
    <Link prefetch={false} className="skip" href={cards ? "#card-track" : "#article"}>本文へスキップ</Link>
    <header className="relyn-header"><div className="relyn-header-inner">
      <Link prefetch={false} className="relyn-brand" href="/ja" aria-label="RELYN ホーム"><Image src="/relyn_logo.png" sizes="(max-width: 600px) 100px, 128px" loading="eager" width={1024} height={358} alt="RELYN" /></Link>
      <span className="brand-divider" aria-hidden="true" />
      <Link prefetch={false} className="guide-label" href={ARTICLE_PATH}>ガイド</Link>
      <nav className="view-switch" aria-label="読み方を選ぶ">
        <Link prefetch={false} href={ARTICLE_PATH} aria-current={cards ? undefined : "page"}>記事を読む</Link>
        <Link prefetch={false} href={`${ARTICLE_PATH}/cards`} aria-current={cards ? "page" : undefined}>カード</Link>
      </nav>
    </div></header>
    <nav className="breadcrumb" aria-label="現在の位置">
      <Link prefetch={false} href="/ja">RELYN ホーム</Link><span aria-hidden="true">/</span>
      {cards ? <><Link prefetch={false} className="breadcrumb-title" href={ARTICLE_PATH}>{ARTICLE_TITLE}</Link><span aria-hidden="true">/</span><span aria-current="page">カード</span></> : <span className="breadcrumb-title" aria-current="page">{ARTICLE_TITLE}</span>}
    </nav>
  </>;
}

export function GuideToc() {
  return <nav className="article-toc" aria-label="記事の目次">
    <p>この記事でわかること</p>
    <ol>{ARTICLE_SECTIONS.map(section => <li key={section.id}><Link prefetch={false} href={`#${section.id}`}><span>{section.number}</span>{section.name}</Link></li>)}</ol>
    <Link prefetch={false} className="toc-card-link" href={`${ARTICLE_PATH}/cards`}>10枚のカードで要点を読む ↗</Link>
  </nav>;
}

export function GuideFooter({ cards = false }: { cards?: boolean }) {
  return <footer className="relyn-footer">
    <div><Link prefetch={false} className="footer-wordmark" href="/ja">RELYN</Link><p>運営会社：<span lang="ko">주식회사 렐린</span>（韓国）<br />韓国事業者登録番号：299-03-03608</p></div>
    <nav aria-label="RELYNのご案内と言語選択">
      <Link prefetch={false} href={`${SKIN_GUIDE_PATHS["ko-KR"]}${cards ? "/cards" : ""}`} hrefLang="ko-KR" lang="ko">한국어</Link>
      <Link prefetch={false} href={`${SKIN_GUIDE_PATHS["zh-TW"]}${cards ? "/cards" : ""}`} hrefLang="zh-TW" lang="zh-TW">繁體中文</Link>
      <Link prefetch={false} href="/ja">RELYNについて ↗</Link><Link prefetch={false} href="/privacy">プライバシーポリシー（韓国語）</Link>
    </nav>
  </footer>;
}
