import Image from "next/image";
import Link from "next/link";
import ArticleFeedback from "../upsell-kr/ArticleFeedback";
import { GuideFooter, GuideHeader, GuideToc } from "./GuideChrome";
import { ARTICLE_FAQS, ARTICLE_IMAGES, ARTICLE_PATH, ARTICLE_TITLE, getArticleJsonLd, getArticleMetadata } from "./article";
import { SKIN_GUIDE_PATHS } from "@/lib/skin-guide-locales";

export const metadata = getArticleMetadata();
const imageSizes = "(max-width: 600px) calc(100vw - 40px), (max-width: 808px) calc(100vw - 60px), (max-width: 920px) 748px, (max-width: 1150px) calc(100vw - 292px), 748px";

export default function TaiwanUpsellArticlePage() {
  return <div className="skin-guide tw-guide blog-body" lang="zh-TW">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd()).replace(/</g, "\\u003c") }} />
    <GuideHeader />
    <div className="content-layout">
      <aside className="article-sidebar"><GuideToc /></aside>
      <details className="mobile-toc"><summary>文章目錄 <span>6 個主題</span></summary><GuideToc /></details>
      <main id="article" className="blog-article">
        <article aria-labelledby="article-title">
          <header className="article-header">
            <p className="article-category">韓國醫美・諮詢筆記</p>
            <h1 id="article-title">{ARTICLE_TITLE}</h1>
            <p className="article-subtitle">從加價推銷到實際需求，<br />看懂療程建議、現場報價與套票的差別。</p>
            <div className="article-meta"><span>RELYN · 給台灣旅客的赴韓諮詢指南</span><Link href={SKIN_GUIDE_PATHS["ko-KR"]} hrefLang="ko-KR" lang="ko">한국어 원문</Link></div>
          </header>
          <aside className="reading-note" aria-label="先看重點">
            <p className="note-heading">被推薦加做療程，先記住這三件事</p>
            <p className="quick-answer"><strong>不想做的項目，可以拒絕。</strong>考慮加做前，先問清楚療程與你的需求有什麼關聯，再比較劑量、施作範圍與總價；不需要因為現場推薦就立刻決定。</p>
            <ol><li>先確認「為什麼我需要」，再考慮是否加做。</li><li>比較報價時，把劑量、部位與次數一起看。</li><li>可以的話，將諮詢與施作安排在不同時間。</li></ol>
          </aside>
          <div className="article-prose">
            <p>出發前已經選好想做的療程，也看過價格，到了韓國皮膚科諮詢時，卻被推薦一起做其他項目，報價也超出原本預期。這時候，該怎麼判斷要不要接受？</p>
            <p>這類<strong>「加價推銷（upselling）」</strong>並不是只有台灣旅客才會遇到的困擾，韓國消費者也有類似經驗。聽到加做建議時，先把重點放在<mark>「這項療程為什麼適合我？」</mark>，而不是只看折扣或專業術語。</p>
          </div>
          <figure className="blog-photo">
            <Image src={ARTICLE_IMAGES[0].src} alt={ARTICLE_IMAGES[0].alt} sizes={imageSizes} width={1536} height={1024} loading="eager" fetchPriority="high" />
            <figcaption>決定療程前，先留時間聽清楚說明。<span>AI 生成示意圖</span></figcaption>
          </figure>
          <div className="article-prose">
            <section id="additional-procedures" aria-labelledby="additional-procedures-title">
              <p className="chapter-label">01. 被推薦加做療程時</p>
              <h2 id="additional-procedures-title">韓國醫美被推銷怎麼辦？<br />先回到原本想改善的問題。</h2>
              <p>「加價推銷」是指引導消費者購買比原本選擇更昂貴的方案、升級選項或更大劑量的銷售方式。這也可能是事前看到的價格，與現場報價不同的原因之一。</p>
              <p>韓文原稿引用一則韓國消費者的經驗：原本只想諮詢 Rejuran，現場卻被推薦 Thermage、Ultherapy，以及 10 次雷射淨膚。對方的說明讓他覺得「好像不一起做就不行」，因此感到困惑。</p>
              <p className="small-source">案例來源說明：韓文原稿引述 Blind 平台 2025 年的個人分享，未提供原文連結，無法在此核實。此為個別經驗，不代表所有診所或療程。</p>
              <p>如果被推薦其他療程，可以先問它與你原本的需求有什麼關係。不想做的項目，清楚表達就可以：</p>
              <blockquote><p>「今天我想先了解原本預約的療程，<br />其他項目暫時不考慮。」</p></blockquote>
              <p>表達後仍持續被推銷，或難以只接受原先想做的項目時，可以暫緩決定，與事先篩選的其他診所比較諮詢內容。</p>
            </section>
            <section id="assess-recommendations" aria-labelledby="assess-recommendations-title">
              <p className="chapter-label">02. 判斷療程是否有需要</p>
              <h2 id="assess-recommendations-title">「一起做效果更好」之外，<br />還要問清楚什麼？</h2>
              <p>各診所的設備與療程搭配建議可能不同。與其只看說明聽起來多專業，更值得注意的是：<strong>是否能具體說明與你的膚況、需求有何關聯。</strong></p>
              <ul className="article-questions">
                <li>這項療程能改善我在意的哪個問題？</li><li>一起做的預期效果與限制是什麼？</li>
                <li>有哪些風險、副作用，以及其他可選方案？</li><li>如果不加做，會有什麼差別？</li>
              </ul>
              <p>是否適合接受療程、能否合併施作，應由醫師依個人情況評估。若能安排醫師諮詢，優先把這些問題向醫師確認。</p>
              <p className="source-reference">台灣衛福部的<a href="https://mohw.gov.tw/cp-16-58545-1.html">皮膚美容醫學光電設備衛教</a>也提醒，治療前應與醫師討論，依個人情況選擇合適的設備與療程。此處引用的是諮詢原則，並非韓國法規說明。</p>
            </section>
            <section id="compare-estimates" aria-labelledby="compare-estimates-title">
              <p className="chapter-label">03. 現場報價比預期高</p>
              <h2 id="compare-estimates-title">活動價和現場報價不同，<br />要比較哪些條件？</h2>
              <p>相同的療程名稱，不一定代表相同內容。實際使用劑量、施作範圍或次數不同，都可能影響報價；診所也可能需要面對面確認狀況後，才能提供較明確的金額。</p>
              <figure className="blog-photo">
                <Image src={ARTICLE_IMAGES[1].src} alt={ARTICLE_IMAGES[1].alt} sizes={imageSizes} width={1536} height={1024} loading="lazy" />
                <figcaption>除了「多少錢」，也要確認「費用包含什麼」。<span>AI 生成示意圖</span></figcaption>
              </figure>
              <p>出發前詢問初步報價時，盡量具體描述目前膚況、希望改善的部位與考慮的療程，並確認可能需要的劑量與範圍。預算也可以保留一些彈性。</p>
              <p>韓文原稿曾提到，部分低價療程的實際金額達到標示價格 1.5～2 倍的個別情況。這不是普遍漲幅，也不能用來推算你的費用。比起預設倍數，更重要的是<mark>請診所列出你所需的項目與用量。</mark></p>
              <div className="comparison-wrap"><table className="comparison-table">
                <caption>看報價單時，逐項確認這些內容</caption>
                <thead><tr><th scope="col">比較項目</th><th scope="col">可以直接這樣問</th></tr></thead>
                <tbody>
                  <tr><th scope="row">劑量</th><td>這個價格包含多少用量？依我的情況，預計需要多少？</td></tr>
                  <tr><th scope="row">範圍</th><td>我希望改善的部位都有包含嗎？哪些部位要另外計費？</td></tr>
                  <tr><th scope="row">次數</th><td>這是單次價格，還是購買多次套票後的平均價格？</td></tr>
                  <tr><th scope="row">總額</th><td>請列出追加項目與其他費用，並確認幣別及最後付款金額。</td></tr>
                </tbody>
              </table></div>
            </section>
            <section id="packages" aria-labelledby="packages-title">
              <p className="chapter-label">04. 多次套票看起來更便宜</p>
              <h2 id="packages-title">韓國醫美套票划算嗎？<br />先看自己能不能用完。</h2>
              <p>還沒決定療程時，可以比較單次、套票與不同劑量的方案。但折扣之外，也要一起看<strong>實際需要的次數、能配合的日期，以及總付款金額。</strong></p>
              <p>從台灣赴韓，如果不容易經常回診，是否能完成多次療程就很重要。先向診所確認使用期限，並請醫師說明次數與間隔，再對照自己的停留天數及後續行程。若對方只催促付款，沒有考慮你的回診安排，可以先停下來想一想。</p>
            </section>
            <section id="consultation-plan" aria-labelledby="consultation-plan-title">
              <p className="chapter-label">05. 安排諮詢與施作日期</p>
              <h2 id="consultation-plan-title">可以只諮詢、不當天做嗎？<br />預約時就先確認。</h2>
              <p>比起只因為便宜就選定一家，不妨比較 2～3 家診所的說明。第一次先安排諮詢，能讓自己有時間整理資訊；預約時也一併詢問是否接受單獨諮詢、是否有諮詢費。</p>
              <ol className="article-steps">
                <li><strong>先確認能否把諮詢與施作分開</strong><p>預約時就說明想先諮詢，再決定是否接受療程。</p></li>
                <li><strong>記下建議原因與報價內容</strong><p>包括想改善的問題、預期效果與限制、劑量、範圍及金額。</p></li>
                <li><strong>比較之後，再預約施作</strong><p>選擇自己理解、也能接受的方案，不必急著當場付款。</p></li>
              </ol>
              <p>若行程或預約安排不允許分開諮詢與施作，可以把該診所排在最後一個諮詢時段；也可以在出發前，詳細提供膚況、希望改善的部位與考慮的療程，先比較各家初步建議與報價。</p>
            </section>
            <section className="blog-faq" id="questions" aria-labelledby="questions-title">
              <p className="chapter-label">台灣旅客常見問題</p>
              <h2 id="questions-title">赴韓諮詢前，<br />你可能也想問這些。</h2>
              {ARTICLE_FAQS.map(({ question, answer }, index) => <div key={question}><h3 id={`question-${index + 1}`}>{question}</h3><p>{answer}</p></div>)}
            </section>
            <div className="article-ending"><p>預約前，除了比較價格，也看看這家診所是否願意把你需要知道的資訊說清楚。</p><p><strong>問題可以慢慢問，<br />決定也可以照自己的步調。</strong></p></div>
          </div>
          <footer className="article-footer">
            <p>本文由 RELYN 提供，依韓文諮詢筆記整理為台灣繁體中文版。內容為一般諮詢與費用比較資訊，不是個別診斷；適合的療程與是否合併施作，請與醫師討論。</p>
            <p>文中個案保留其來源限制；圖片為 AI 生成的示意情境，並非實際患者或療效照片。</p>
            <div className="article-tags"><span>#韓國皮膚科</span><span>#韓國醫美</span><span>#醫美諮詢</span><span>#療程報價</span></div>
            <Link className="end-link" href={`${ARTICLE_PATH}/cards`}>用 10 張圖卡再看一次重點 →</Link>
          </footer>
        </article>
      </main>
    </div>
    <GuideFooter /><ArticleFeedback locale="zh-TW" />
  </div>;
}
