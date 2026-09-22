import Link from "next/link";
import Image from "next/image";
import ArticleFeedback from "../../upsell-kr/ArticleFeedback";
import CardCarousel from "../../upsell-kr/CardCarousel";
import { GuideFooter, GuideHeader } from "../GuideChrome";
import { ARTICLE_IMAGES, ARTICLE_PATH, getArticleMetadata, getArticleJsonLd } from "../article";

export const metadata = getArticleMetadata(true);

export default function TaiwanUpsellCardsPage() {
  return <div className="skin-guide tw-guide cards-body" lang="zh-TW">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd(true)).replace(/</g, "\\u003c") }} />
    <GuideHeader cards />
    <main className="cards-main">
      <div className="post-heading"><span className="post-mark" aria-hidden="true">讀</span><div><h1>去韓國皮膚科前，先看這 10 張圖卡</h1><p>加做療程與報價的諮詢筆記</p></div><span className="post-count" aria-hidden="true">10 張</span></div>
      <CardCarousel locale="zh-TW">
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="1 / 10"><div className="social-card cover-card">
          <div className="card-top"><span>去韓國皮膚科前</span><span>01 / 10</span></div>
          <p className="cover-tag">諮詢時，先別急著答應</p><h2>加做療程，<br />一定要<br />接受嗎<span className="question-mark">？</span></h2>
          <p className="cover-subtitle">加價推銷與實際需求，<br />先看懂其中的差別。</p><div className="card-bottom"><span>為自己做選擇的諮詢筆記</span><span>往右看 →</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="2 / 10"><div className="social-card photo-card">
          <div className="card-top"><span>先認識這個詞</span><span>02 / 10</span></div><h2>什麼是<br />「加價推銷」？</h2>
          <p className="card-copy">推薦比原本選擇更昂貴的方案，<br />或更大劑量的銷售方式，<br />英文稱為 upselling。</p>
          <figure className="card-photo"><Image src={ARTICLE_IMAGES[0].src} sizes="(max-width: 540px) calc(100vw - 80px), 410px" alt={ARTICLE_IMAGES[0].alt} width={1536} height={1024} /><figcaption>AI 生成示意圖</figcaption></figure>
          <div className="card-bottom"><span>重點是：我真的需要嗎？</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="3 / 10"><div className="social-card pink-card">
          <div className="card-top"><span>遇到這種情況時</span><span>03 / 10</span></div><h2>本來只想做一項，<br />卻被推薦好幾項？</h2>
          <div className="scenario"><p><span>原本目的</span><strong>Rejuran 諮詢</strong></p><div className="scenario-arrow" aria-hidden="true">↓</div><p><span>追加推薦</span><strong>Thermage・Ultherapy<br />10 次雷射淨膚</strong></p></div>
          <p className="card-copy">聽起來好像非一起做不可？<br /><strong>先問清楚為什麼需要。</strong></p><div className="card-bottom"><span>原稿個案摘要；來源限制見完整文章</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="4 / 10"><div className="social-card white-card">
          <div className="card-top"><span>比起術語，更要聽說明</span><span>04 / 10</span></div><h2>「一起做比較好。」<br />然後呢？</h2>
          <div className="speech-note muted-note"><span>模糊的說法</span><p>不清楚能改善什麼，<br />也不知道為什麼適合我。</p></div>
          <div className="speech-note blue-note"><span>具體的說明</span><p>與需求的關聯、效果與限制，<br />還有風險及其他選擇。</p></div>
          <p className="card-copy compact">療程適合與否，請向醫師確認。</p><div className="card-bottom"><span>聽得懂的理由，比專業術語更重要</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="5 / 10"><div className="social-card lime-card">
          <div className="card-top"><span>比較價格時</span><span>05 / 10</span></div><h2>同一種療程，<br />不同的報價。</h2><p className="card-copy">名稱一樣，<br />不代表包含的內容也一樣。</p>
          <dl className="card-dl"><div><dt>劑量</dt><dd>實際使用多少</dd></div><div><dt>範圍</dt><dd>包含哪些施作部位</dd></div><div><dt>次數</dt><dd>單次價格還是多次套票</dd></div></dl>
          <div className="card-bottom"><span>價格旁邊的條件，也要一起比較</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="6 / 10"><div className="social-card photo-card estimate-card">
          <div className="card-top"><span>赴韓之前</span><span>06 / 10</span></div><h2>問初步報價，<br />盡量說得具體。</h2><p className="card-copy">說明膚況、考慮的療程與部位。<br /><strong>也別忘了確認劑量與範圍。</strong></p>
          <figure className="card-photo"><Image src={ARTICLE_IMAGES[1].src} sizes="(max-width: 540px) calc(100vw - 80px), 410px" alt={ARTICLE_IMAGES[1].alt} width={1536} height={1024} /><figcaption>AI 生成示意圖</figcaption></figure>
          <div className="card-bottom"><span>確認實際狀況後，最終金額可能不同</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="7 / 10"><div className="social-card blue-card quote-card">
          <div className="card-top"><span>你可以這樣說</span><span>07 / 10</span></div><span className="large-quote" aria-hidden="true">“</span><h2>今天，<br />我想先<br /><em>諮詢就好。</em></h2>
          <p className="card-copy">預約前，先問能否分開安排<br />諮詢與施作日期。<br />留時間考慮，也是必要的過程。</p><div className="card-bottom"><span>不用急著當場做決定</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="8 / 10"><div className="social-card white-card package-card">
          <div className="card-top"><span>被推薦套票時</span><span>08 / 10</span></div><p className="big-number">10<span>次</span></p><h2>先別只看折扣，<br />想想能用幾次。</h2><p className="card-copy">不容易經常赴韓，<br />就先確認能否完成後續療程。</p><div className="underline-note">需要的次數・回診日期・總金額</div>
          <div className="card-bottom"><span>買得多，不一定就更適合自己</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="9 / 10"><div className="social-card pink-card">
          <div className="card-top"><span>安排諮詢時</span><span>09 / 10</span></div><h2>先比較 2～3 家，<br />再做決定。</h2>
          <ol className="card-steps"><li><span>1</span><div><strong>先預約諮詢</strong><p>確認能否與施作日期分開</p></div></li><li><span>2</span><div><strong>整理說明與報價</strong><p>需求、效果、劑量與範圍</p></div></li><li><span>3</span><div><strong>比較後再預約療程</strong><p>選擇自己理解的方案</p></div></li></ol>
          <div className="card-bottom"><span>無法分開安排，就先比較初步報價</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="投影片" aria-label="10 / 10"><div className="social-card closing-card">
          <div className="card-top"><span>付款前，再確認一次</span><span>10 / 10</span></div><h2>關於我的皮膚，<br /><em>想清楚再選擇。</em></h2>
          <ul className="card-checks"><li>知道為什麼適合自己嗎？</li><li>了解效果、限制與風險嗎？</li><li>比較過劑量、範圍與費用嗎？</li><li>給自己足夠時間考慮了嗎？</li></ul><p className="last-line">充分提問，<br />照自己的步調決定。</p><div className="card-bottom"><span>諮詢前，可以再看一次。</span><span>✓</span></div>
        </div></section>
      </CardCarousel>
      <div className="post-caption"><p><strong>被推薦加做療程，記住這件事。</strong><br />不想接受，可以拒絕。<br />問清楚原因、比較報價，再做決定。</p><Link href={ARTICLE_PATH}>閱讀完整文章與常見問題 →</Link><p className="caption-tags">#韓國皮膚科 #韓國醫美 #醫美諮詢 #療程報價</p><p className="caption-note">本文提供一般諮詢資訊。療程適合與否，請由醫師評估。圖片為 AI 生成示意圖，並非患者或療效照片。</p></div>
    </main>
    <GuideFooter cards /><ArticleFeedback locale="zh-TW" />
  </div>;
}
