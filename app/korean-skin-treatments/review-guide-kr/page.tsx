import Link from "next/link";
import Image from "@/app/korean-skin-treatments/shared/GuideImage";
import ArticleFeedback from "../upsell-kr/ArticleFeedback";
import { ARTICLE_PATH, FAQS, SECTIONS, SOURCES, getReviewJsonLd, getReviewMetadata } from "./article";
import { GuideFooter, GuideHeader, GuideToc } from "./GuideChrome";
import ReviewScout from "./ReviewScout";
import ReviewMotionScene from "./ReviewMotionScene";

export const metadata = getReviewMetadata();

function Source({ index }: { index: number }) {
  return <a className="review-source-link" href={SOURCES[index].url} target="_blank" rel="noreferrer">{SOURCES[index].label} ↗</a>;
}

export default function ReviewGuidePage() {
  return <div className="skin-guide blog-body review-guide">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getReviewJsonLd()).replace(/</g, "\u003c") }} />
    <GuideHeader />
    <div className="content-layout">
      <aside className="article-sidebar"><GuideToc /></aside>
      <details className="mobile-toc"><summary>이 글의 목차 <span>{SECTIONS.length}개 항목</span></summary><GuideToc /></details>
      <main id="article" className="blog-article"><article aria-labelledby="article-title">
        <header className="article-header">
          <p className="article-category">한국 피부과 · 후기 읽기</p>
          <h1 id="article-title">한국 피부과·미용시술 후기,<br />어디까지 믿어도 될까요?</h1>
          <p className="article-subtitle">인플루언서 후기부터 낮은 별점까지,<br />예약 전에 확인할 단서들.</p>
          <div className="article-meta"><span>한국 피부과 방문 전 알아둘 이야기</span><span>후기 · 광고·협찬 · 별점</span></div>
        </header>
        <div className="review-hero-art"><div className="review-hero-copy"><span className="review-hero-edition">RELYN · REVIEW GUIDE</span><span className="review-hero-title"><span>BEYOND </span><span>FIVE </span><span>STARS</span></span><span className="review-star-strip" aria-hidden="true">★ ★ ★ ★ ★</span></div><ReviewScout /></div>
        <div className="article-prose review-intro"><p>“검색하면 좋은 후기는 많은데, 어떤 글을 믿어야 할지 모르겠어요.”</p><p>한국 피부과와 미용시술을 알아보다 보면 비슷한 고민을 하게 됩니다. 만족스럽다는 글을 읽고 마음이 기울었다가도, 광고나 협찬일 수 있다는 생각에 다시 검색하게 되죠.</p><p>후기 하나만으로 진위를 확정하기는 어렵습니다. 대신 <strong>광고 관계, 구체적인 경험, 여러 후기에서 반복되는 내용</strong>을 차례로 확인해 보세요.</p></div>
        <div className="article-prose">
          <section id="review-growth"><p className="chapter-label">01. 피부과 증가와 경쟁시장</p><h2>한국 미용시술 피부과의 증가와<br />치열한 경쟁시장</h2>
            <p>한국의 피부과 후기 내용이 왜이렇게 많아졌는가를 이해하려면 병원 수와 진료 수요의 변화를 함께 볼 필요가 있습니다. 보건복지부·국민건강보험공단 등의 자료를 인용한 SBS 보도에 따르면, 피부과 의원은 2012년 1,047곳에서 2022년 1,387곳으로 32.5% 늘었습니다. <Source index={3} /></p>
            <p>한국 피부과를 찾는 해외 수요도 커졌습니다. 한국의 보건복지부가 집계한 2024년 피부과 외국인 환자는 70.5만 명으로 전년보다 194.9% 증가했습니다. <Source index={4} /></p>
            <figure className="review-inline-photo"><Image src="/korean-skin-treatments/review-guide-kr/review-consultation.png" alt="밝은 피부과 상담실에서 의료진의 설명을 듣는 방문객을 표현한 AI 제작 이미지" width={1536} height={1024} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 808px) calc(100vw - 60px), (max-width: 920px) 748px, (max-width: 1150px) calc(100vw - 292px), 748px" /></figure>
            <p>이런 공급과 수요의 확대를 마케팅 관점에서 보면, 더 많은 선택지 속에서 고객의 관심과 신뢰를 얻으려는 경쟁도 치열해질 수 있습니다. 병원들이 시술의 특징과 방문 경험을 알리는 데 힘을 쏟는 배경으로 해석할 수 있습니다.</p>
            <p>후기 형식의 콘텐츠는 경험을 이야기하는 방식으로 정보를 전달하고, 게시 후에도 검색을 통해 다시 발견될 수 있습니다. 병원 입장에서는 한 번의 노출에 그치지 않고 오랫동안 인지도와 신뢰를 쌓는 데 활용할 수 있어, 이런 경쟁 속에서 매력적인 마케팅 수단이 됩니다.</p>
            <div className="review-stat-grid"><div><span>한국 · 바비톡 전체 누적 후기</span><strong>113<span>만 건</span></strong><p>2026년 3월 기준<br />전년 대비 <b>20.2% 증가</b></p><Source index={0} /></div></div>
            <p className="review-evidence-note">바비톡 전체 누적 후기의 수치이며, 광고 후기의 수나 증가율을 나타내는 자료는 아닙니다.</p>
          </section>
          <section id="marketing">
            <p className="chapter-label">02. 마케팅의 관점으로 보면</p><h2>내가 홍보를 맡긴다면,<br />누구를 선택할까요?</h2>
            <p>광고·홍보 모델 섭외를 준비하게 된다면, 많은 사람이 알고 좋아하는 배우나 인플루언서가 먼저 떠오를 수 있습니다.</p>
            <p>유명인의 호감도와 신뢰감은 광고를 받아들이는 태도에 영향을 줄 수 있습니다. 다만 그 효과는 사람과 상품, 전달 방식에 따라 달라집니다. <Source index={1} /></p>
            <blockquote className="review-definition"><p><strong>유명인 보증효과</strong><span>유명인에 대한 호감과 신뢰가 그 사람이 소개하는 상품·서비스의 평가와 구매 의향에 영향을 주는 효과</span></p></blockquote>
            <p>이러한 관점에서 유명인이나 인플루언서를 홍보에 활용하게 됩니다. 우리가 접하는 후기성 콘텐츠에도 이런 광고·협찬 목적의 콘텐츠가 포함되어 있습니다.</p>
            <figure className="review-inline-photo"><Image src="/korean-skin-treatments/review-guide-kr/review-content-studio.png" alt="카메라와 조명을 준비하고 뷰티 후기 콘텐츠를 제작하는 여성을 표현한 AI 제작 이미지" width={1536} height={1024} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 808px) calc(100vw - 60px), (max-width: 920px) 748px, (max-width: 1150px) calc(100vw - 292px), 748px" /></figure>
          </section>
          <section id="relationships">
            <p className="chapter-label">03. 광고 관계와 경험 확인</p>
            <div className="review-key-point"><span className="review-key-point-label">KEY POINT 01</span><h2>팔로워 수보다,<br />어떤 관계에서 쓴 글인지.</h2></div>
            <p>유명 인플루언서의 후기라고 해서 모두 광고인 것은 아닙니다. 반대로 팔로워가 적은 일반 계정이라고 해서 광고 가능성이 없어지는 것도 아닙니다.</p>
            <div className="review-two-notes"><div>
              <span>CHECK</span><h3>광고·협찬 관계</h3>
              <p>예를 들어, 한 인플루언서의 콘텐츠에서 특정 병원이나 업체가 반복해서 등장하나요?</p>
              <p>같은 병원의 시술이나 방문 경험을 자주 소개한다면, 꾸준히 이용하는 고객인지 광고·협찬 관계가 있는지 살펴보세요.</p>
              <p>이전 게시물을 확인해, 평소 협찬을 받아 제작하는 콘텐츠를 주로 다루는지 살펴보면 도움이 될 수 있습니다.</p>
            </div></div>
            <p className="review-evidence-note">광고 표시가 없거나 내용이 구체적이라는 사실만으로 진위가 확인되지는 않습니다.</p>
          </section>
          <section id="complaints"><p className="chapter-label">04. 불만 후기를 읽는 방법</p><div className="review-key-point"><span className="review-key-point-label">KEY POINT 02</span><h2>좋은 후기를 읽었다면,<br />아쉬웠다는 이야기도 찾아보세요.</h2></div><p>마음에 드는 병원을 찾았다면 구글 지도나 네이버 지도 등에서 낮은 별점과 최근 후기도 함께 살펴보세요. 대기시간, 비용 안내, 설명 방식, 사후 응대 등 긍정적인 소개에서 놓쳤던 부분을 확인하는 데 도움이 될 수 있습니다.</p><ReviewMotionScene kind="compare" /><p>JMIR의 온라인 의사 후기 연구에서는 긍정 후기의 평균 길이가 약 50단어, 부정 후기는 약 100단어였습니다. 이처럼 부정 후기에 경험이 더 길게 서술되는 경우, 대기시간이나 설명 과정처럼 비교할 수 있는 정보를 더 많이 얻을 수도 있습니다. <Source index={2} /></p><ul className="article-questions"><li>같은 문제가 다른 작성자의 후기에도 나오나요?</li><li>오래된 일인가요, 최근에도 반복되나요?</li><li>병원의 답변이나 이후 해결 과정이 있나요?</li><li>내가 중요하게 생각하는 부분과 관련된 불만인가요?</li></ul>
            <div className="review-example"><p className="review-example-label">읽는 방법을 설명하기 위한 가상 예시</p><div><span>A · 만족했다는 의견</span><p>“정말 좋아요. 친절하고 만족합니다!”</p><small>무엇에 만족했는지는 추가 정보가 필요합니다.</small></div><div><span>B · 비교할 수 있는 상황</span><p>“오전 11시에 예약했고 상담은 30분 정도 늦게 시작됐어요. 비용에 포함되는 항목은 미리 안내받았지만, 대기시간 설명은 아쉬웠습니다.”</p><small>예약 시각·대기시간·비용 안내를 다른 후기와 비교하거나 병원에 질문할 수 있습니다.</small></div><p className="review-evidence-note">자세한 설명도 사실임을 보증하지는 않습니다. 비교할 단서로 활용하세요.</p></div>
          </section>
          <section id="questions" className="blog-faq"><p className="chapter-label">05. 자주 묻는 질문</p><h2>이것도 궁금하셨나요?</h2>{FAQS.map(item => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>
          <div className="review-closing">
            <p>결국 같은 후기라도 진위에 대한 판단은 사람마다 달라질 수 있습니다.</p>
            <p>중요한 것은 후기 속 경험을 보며 ‘나도 똑같이 바뀔 수 있다’고 기대하기보다, <strong>‘이런 도움을 받을 수도 있겠구나’라는 관점에서 정보를 모으는 것</strong>입니다.</p>
          </div>
          <aside className="review-related"><span>다음으로 읽어볼 이야기</span><Link prefetch={false} href="/korean-skin-treatments/upsell-kr">후기를 보고 방문했는데,<br />추가 시술을 권유받았다면? <span aria-hidden="true">↗</span></Link></aside>
          <section className="review-sources" id="sources"><h2>근거 자료와 읽는 범위</h2><p>통계와 연구 결과를 바탕으로 작성했으며, 경쟁과 후기 마케팅의 관계 및 후기를 읽는 순서는 편집자의 해석과 제안입니다.</p><ol>{SOURCES.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a><p>{source.note}</p></li>)}</ol></section>
        </div>
        <footer className="article-footer"><p>특정 후기의 진위나 병원의 의료 수준을 판정하는 기준은 아닙니다. 시술의 적합성과 위험은 의료진에게 확인하세요.</p><p>본문 이미지는 이해를 돕기 위해 AI로 제작한 예시입니다.</p><div className="article-tags"><span>#피부과후기</span><span>#미용시술후기</span><span>#후기읽는법</span></div><Link prefetch={false} className="end-link" href={ARTICLE_PATH + "/cards"}>핵심만 10장의 카드로 보기 →</Link></footer>
      </article></main>
    </div><GuideFooter /><ArticleFeedback />
  </div>;
}
