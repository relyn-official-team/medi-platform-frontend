import Link from "next/link";
import type { ReactNode } from "react";
import ArticleFeedback from "../../upsell-kr/ArticleFeedback";
import CardCarousel from "../../upsell-kr/CardCarousel";
import { ARTICLE_PATH, getReviewJsonLd, getReviewMetadata } from "../article";
import { GuideHeader, GuideFooter } from "../GuideChrome";
import ReviewScout from "../ReviewScout";
import "./review-cards.css";

export const metadata = getReviewMetadata(true);

type ArticleSection = "article" | "review-growth" | "marketing" | "relationships" | "complaints" | "questions";

function Card({ index, chapter, section, cover = false, children }: {
  index: number;
  chapter: string;
  section: ArticleSection;
  cover?: boolean;
  children: ReactNode;
}) {
  return <section className="slide review-slide" role="group" aria-roledescription="슬라이드" aria-label={index + " / 10"}>
    <div className={"review-card" + (cover ? " rc-cover" : "")} data-card={index} data-section={section}>
      <div className="rc-header"><span>RELYN</span><span>후기 읽기 가이드</span></div>
      <div className="rc-content"><p className="rc-chapter">{chapter}</p>{children}</div>
      <div className="rc-footer"><Link prefetch={false} href={ARTICLE_PATH + "#" + section}>{index === 10 ? "본문과 근거 자료 읽기" : "본문에서 더 읽기"}<span aria-hidden="true"> ↗</span></Link><span>{String(index).padStart(2, "0")} / 10</span></div>
    </div>
  </section>;
}

export default function ReviewCardsPage() {
  return <div className="skin-guide cards-body review-guide review-cards">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getReviewJsonLd(true)).replace(/</g, "\\u003c") }} />
    <GuideHeader cards />
    <main className="cards-main" id="review-deck">
      <div className="post-heading"><span className="post-mark" aria-hidden="true">읽</span><div><h1>피부과 가기 전, 알아둘 이야기</h1><p>블로그 본문 순서로 읽는 후기 가이드</p></div><span className="post-count" aria-hidden="true">10장</span></div>
      <CardCarousel label="한국 미용시술 후기 읽기 가이드 10장">
        <Card index={1} chapter="한국 피부과 · 후기 읽기" section="article" cover>
          <h2>한국 피부과·미용시술 후기,<br />어디까지 믿어도 될까요?</h2>
          <p>인플루언서 후기부터 낮은 별점까지,<br />예약 전에 확인할 단서들.</p>
          <div className="rc-cover-art"><ReviewScout compact /></div>
        </Card>
        <Card index={2} chapter="01. 피부과 증가와 경쟁시장" section="review-growth">
          <h2>늘어나는 피부과,<br />커지는 진료 수요.</h2>
          <div className="rc-data-list">
            <div><span>한국 피부과 의원 수</span><strong>1,047 <span>→</span> 1,387<small>곳</small></strong><small>2012년 → 2022년 · 32.5% 증가</small></div>
            <div><span>피부과 외국인 환자</span><strong>70.5<small>만 명</small></strong><small>2024년 · 전년 대비 194.9% 증가</small></div>
          </div>
          <p className="rc-note">출처: SBS 통계 인용 보도 · 한국 보건복지부</p>
        </Card>
        <Card index={3} chapter="01. 피부과 증가와 경쟁시장" section="review-growth">
          <h2>후기가 마케팅으로<br />활용되는 이유.</h2>
          <p>경험으로 정보를 전하고, 검색으로 다시 발견되면서 병원의 인지도와 신뢰를 쌓는 데 활용됩니다.</p>
          <div className="rc-callout"><strong>바비톡 전체 누적 후기</strong><div className="rc-number">113<small>만 건</small></div><p>2026년 3월 기준 · 전년 대비 20.2% 증가</p></div>
          <p className="rc-note">전체 후기 수치이며, 광고 후기의 증가율은 아닙니다.</p>
        </Card>
        <Card index={4} chapter="02. 마케팅의 관점으로 보면" section="marketing">
          <h2>내가 홍보를 맡긴다면,<br />누구를 선택할까요?</h2>
          <p>많은 사람이 알고 좋아하는 배우나 인플루언서를 먼저 떠올릴 수 있습니다.</p>
          <div className="rc-callout"><strong>유명인 보증효과</strong><p>유명인에 대한 호감과 신뢰가 그 사람이 소개하는 상품·서비스의 평가와 구매 의향에 영향을 주는 효과.</p></div>
          <p>후기성 콘텐츠에도 이러한 광고·협찬 목적이 담길 수 있습니다.</p>
          <p className="rc-note">효과는 사람과 상품, 전달 방식에 따라 달라집니다.</p>
        </Card>
        <Card index={5} chapter="03. 광고 관계와 경험 확인" section="relationships">
          <h2>팔로워 수보다,<br />어떤 관계에서 쓴 글인지.</h2>
          <div className="rc-info-list">
            <div><h3>유명 인플루언서</h3><p>유명하다는 이유만으로 모든 후기가 광고인 것은 아닙니다.</p></div>
            <div><h3>팔로워가 적은 일반 계정</h3><p>팔로워 수가 적다고 광고 가능성이 없어지는 것도 아닙니다.</p></div>
          </div>
          <div className="rc-callout rc-bottom-copy"><strong>광고·협찬 관계와 구체적인 경험을 함께 확인하세요.</strong></div>
        </Card>
        <Card index={6} chapter="03. 광고 관계와 경험 확인" section="relationships">
          <h2>같은 병원이<br />반복해서 등장하나요?</h2>
          <p>한 게시물에서 멈추지 말고,<br />이전 게시물의 맥락을 함께 보세요.</p>
          <ol className="rc-steps">
            <li><span>1</span><div><strong>반복되는 방문과 시술 소개</strong><p>꾸준히 이용하는 고객인지 살펴보세요.</p></div></li>
            <li><span>2</span><div><strong>광고·협찬 관계</strong><p>병원과 어떤 관계인지 확인하세요.</p></div></li>
            <li><span>3</span><div><strong>이전 콘텐츠의 성격</strong><p>협찬 콘텐츠를 주로 다루는지 보세요.</p></div></li>
          </ol>
          <p className="rc-note">광고 표시나 구체적인 설명만으로 진위가 확정되지는 않습니다.</p>
        </Card>
        <Card index={7} chapter="04. 불만 후기를 읽는 방법" section="complaints">
          <h2>좋은 후기를 읽었다면,<br />아쉬운 이야기도 함께.</h2>
          <p>구글 지도나 네이버 지도에서 낮은 별점과 최근 후기도 살펴보세요.</p>
          <div className="rc-topics"><span>대기시간</span><span>비용 안내</span><span>설명 방식</span><span>사후 응대</span></div>
          <div className="rc-callout rc-research"><strong>온라인 의사 후기 연구의 평균 글 길이</strong><div className="rc-metric-pair"><div><span>긍정 후기</span><b>50<small>단어</small></b></div><div><span>부정 후기</span><b>100<small>단어</small></b></div></div><p>더 긴 설명에서 비교할 정보를 찾을 수도 있습니다.</p></div>
          <p className="rc-note">JMIR, 2020 · 해당 연구 표본의 결과입니다.</p>
        </Card>
        <Card index={8} chapter="04. 불만 후기를 읽는 방법" section="complaints">
          <h2>어떤 상황이었는지,<br />여러 후기와 비교하세요.</h2>
          <ul className="rc-questions"><li>같은 문제가 다른 후기에도 나오나요?</li><li>최근에도 반복되는 일인가요?</li><li>병원의 답변이나 해결 과정이 있나요?</li><li>내가 중요하게 생각하는 부분인가요?</li></ul>
          <div className="rc-callout"><strong>비교할 단서가 있는 가상 예시</strong><p>“11시 예약, 상담은 30분 지연.<br />대기 설명이 아쉬웠어요.”</p></div>
          <p className="rc-note">자세한 설명도 사실을 보증하지는 않습니다.</p>
        </Card>
        <Card index={9} chapter="05. 자주 묻는 질문" section="questions">
          <h2>이것도 궁금하셨나요?</h2>
          <div className="rc-info-list rc-faq">
            <div><h3>직접 결제했다고 적혀 있다면?</h3><p>결제 문구만으로 혜택 제공 여부까지 확인할 수는 없습니다.</p></div>
            <div><h3>인플루언서 후기는 제외해야 하나요?</h3><p>유명세보다 광고·협찬 관계와 구체적인 경험을 살펴보세요.</p></div>
            <div><h3>낮은 별점이 더 정확한가요?</h3><p>별점보다 평가한 상황과 여러 후기의 공통점을 확인하세요.</p></div>
          </div>
        </Card>
        <Card index={10} chapter="마무리 · 후기를 읽는 관점" section="article">
          <h2>후기는 정보를<br />모으는 출발점으로.</h2>
          <p>같은 후기라도 진위에 대한 판단은 사람마다 달라질 수 있습니다.</p>
          <div className="rc-closing-quote"><span>‘나도 똑같이 바뀔 수 있다’는 기대보다</span><strong>“이런 도움을<br />받을 수도 있겠구나.”</strong></div>
          <p>다른 사람의 경험에서 나에게 필요한 정보를 모으는 데 초점을 맞춰보세요.</p>
        </Card>
      </CardCarousel>
      <div className="post-caption"><p><strong>블로그 본문의 흐름을 10장으로 정리했습니다.</strong><br />피부과 시장과 후기 마케팅부터 광고 관계, 불만 후기, 자주 묻는 질문까지 차례로 읽어보세요.</p><Link prefetch={false} href={ARTICLE_PATH + "#sources"}>근거 자료와 해석 범위 확인하기 ↗</Link><p className="caption-note">후기를 비교해 읽기 위한 정보입니다. 특정 후기의 진위나 병원의 의료 수준을 판정하지 않습니다. 이미지는 AI로 제작했습니다.</p></div>
    </main><GuideFooter /><ArticleFeedback />
  </div>;
}
