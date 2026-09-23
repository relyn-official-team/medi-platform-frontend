import Link from "next/link";
import Image from "@/app/korean-skin-treatments/shared/GuideImage";
import ArticleFeedback from "../../upsell-kr/ArticleFeedback";
import CardCarousel from "../../upsell-kr/CardCarousel";
import { GuideFooter, GuideHeader } from "../GuideChrome";
import { ARTICLE_IMAGES, ARTICLE_PATH, getArticleMetadata, getArticleJsonLd } from "../article";

export const metadata = getArticleMetadata(true);

export default function JapaneseUpsellCardsPage() {
  return <div className="skin-guide jp-guide cards-body" lang="ja-JP">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd(true)).replace(/</g, "\\u003c") }} />
    <GuideHeader cards />
    <main className="cards-main">
      <div className="post-heading"><span className="post-mark" aria-hidden="true">読</span><div><h1>韓国の美容皮膚科へ行く前に、10枚で確認</h1><p>追加施術と見積もりの相談ノート</p></div><span className="post-count" aria-hidden="true">10枚</span></div>
      <CardCarousel locale="ja-JP">
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="1 / 10"><div className="social-card cover-card">
          <div className="card-top"><span>韓国の美容皮膚科へ行く前に</span><span>01 / 10</span></div><p className="cover-tag">その場で、急いで決めなくても</p>
          <h2>追加施術、<br />本当に<br />必要ですか？</h2><p className="cover-subtitle">勧誘と、自分に必要な提案。<br />その違いを考えましょう。</p><div className="card-bottom"><span>自分のための施術選びノート</span><span>次へ →</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="2 / 10"><div className="social-card photo-card">
          <div className="card-top"><span>まず、言葉を知る</span><span>02 / 10</span></div><h2>「アップセル」<br />とは？</h2><p className="card-copy">当初より高いプランや、<br />多い量の購入を勧める<br />販売手法のことです。</p>
          <figure className="card-photo"><Image src={ARTICLE_IMAGES[0].src} sizes="(max-width: 540px) calc(100vw - 80px), 410px" alt={ARTICLE_IMAGES[0].alt} width={1536} height={1024} /><figcaption>AI生成画像</figcaption></figure><div className="card-bottom"><span>大切なのは、自分に必要かどうか</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="3 / 10"><div className="social-card pink-card">
          <div className="card-top"><span>こんなときは</span><span>03 / 10</span></div><h2>1つの施術の相談が、<br />いくつもの提案に？</h2>
          <div className="scenario"><p><span>当初の希望</span><strong>リジュラン</strong></p><div className="scenario-arrow" aria-hidden="true">↓</div><p><span>追加の提案</span><strong>Thermage・Ultherapy<br />トーニング10回</strong></p></div>
          <p className="card-copy">一緒に受けないといけない？<br /><strong>まず、必要な理由を確認。</strong></p><div className="card-bottom"><span>原稿の個人事例。出典の詳細は本文へ</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="4 / 10"><div className="social-card white-card">
          <div className="card-top"><span>言葉より、説明を確かめる</span><span>04 / 10</span></div><h2>「一緒に受けると<br />よいですよ」の先は？</h2>
          <div className="speech-note muted-note"><span>あいまいな説明</span><p>何に、どう役立つのかが<br />よくわからない。</p></div><div className="speech-note blue-note"><span>具体的な説明</span><p>悩みとの関係、効果と限界、<br />リスクや別の選択肢まで。</p></div>
          <p className="card-copy compact">自分に適しているかは、医師へ。</p><div className="card-bottom"><span>専門用語より、理解できる理由を</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="5 / 10"><div className="social-card lime-card">
          <div className="card-top"><span>料金を比較するとき</span><span>05 / 10</span></div><h2>同じ施術名でも、<br />見積もりは違う。</h2><p className="card-copy">名前が同じでも、<br />内容まで同じとは限りません。</p>
          <dl className="card-dl"><div><dt>使用量</dt><dd>どのくらい使うのか</dd></div><div><dt>範囲</dt><dd>どの部位まで含むのか</dd></div><div><dt>回数</dt><dd>単発か、コースか</dd></div></dl><div className="card-bottom"><span>価格と条件を、セットで比較</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="6 / 10"><div className="social-card photo-card estimate-card">
          <div className="card-top"><span>渡韓する前に</span><span>06 / 10</span></div><h2>概算は、<br />具体的に聞く。</h2><p className="card-copy">肌の状態、希望の施術と部位を<br />詳しく伝えましょう。<br /><strong>必要な量と範囲も忘れずに。</strong></p>
          <figure className="card-photo"><Image src={ARTICLE_IMAGES[1].src} sizes="(max-width: 540px) calc(100vw - 80px), 410px" alt={ARTICLE_IMAGES[1].alt} width={1536} height={1024} /><figcaption>AI生成画像</figcaption></figure><div className="card-bottom"><span>状態の確認後に、金額が変わることも</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="7 / 10"><div className="social-card blue-card quote-card">
          <div className="card-top"><span>こう伝えても大丈夫</span><span>07 / 10</span></div><span className="large-quote" aria-hidden="true">“</span><h2>今日は、<br /><em>相談だけ</em><br />にします。</h2><p className="card-copy">相談と施術を別の日にできるか、<br />予約前に確認しましょう。<br />考える時間も大切です。</p><div className="card-bottom"><span>決断を急がない</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="8 / 10"><div className="social-card white-card package-card">
          <div className="card-top"><span>コースを勧められたら</span><span>08 / 10</span></div><p className="big-number">10<span>回</span></p><h2>割引率より先に、<br />通える回数を。</h2><p className="card-copy">何度も韓国へ行くのが難しければ、<br />利用し切れるかを考えましょう。</p><div className="underline-note">必要な回数・通院日程・支払総額</div><div className="card-bottom"><span>まとめ買いが、自分に合うとは限らない</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="9 / 10"><div className="social-card pink-card">
          <div className="card-top"><span>相談の日程を決めるとき</span><span>09 / 10</span></div><h2>2〜3か所で相談。<br />決めるのは、その後。</h2><ol className="card-steps"><li><span>1</span><div><strong>まずは相談を予約</strong><p>施術と日程を分けられるか確認</p></div></li><li><span>2</span><div><strong>説明と見積もりを整理</strong><p>悩み・効果・使用量・範囲</p></div></li><li><span>3</span><div><strong>比較してから施術を予約</strong><p>自分が納得できる内容を選ぶ</p></div></li></ol><div className="card-bottom"><span>別日にできなければ、先に概算を比較</span><span>→</span></div>
        </div></section>
        <section className="slide" role="group" aria-roledescription="スライド" aria-label="10 / 10"><div className="social-card closing-card">
          <div className="card-top"><span>支払う前に、もう一度</span><span>10 / 10</span></div><h2>自分の肌のことは、<br /><em>納得してから選ぶ。</em></h2><ul className="card-checks"><li>自分に必要な理由を聞きましたか？</li><li>効果・限界・リスクを確認しましたか？</li><li>量・範囲・料金を比較しましたか？</li><li>考える時間は十分にありましたか？</li></ul><p className="last-line">質問は十分に。<br />決断は、自分のペースで。</p><div className="card-bottom"><span>相談前に、もう一度読んでみてください。</span><span>✓</span></div>
        </div></section>
      </CardCarousel>
      <div className="post-caption"><p><strong>追加施術を勧められたら、思い出して。</strong><br />希望しない施術は、断って構いません。<br />理由を聞き、見積もりを比べてから決めましょう。</p><Link prefetch={false} href={ARTICLE_PATH}>事例と詳しい説明・よくある質問を読む →</Link><p className="caption-tags">#韓国美容皮膚科 #美容医療 #カウンセリング #見積もり比較</p><p className="caption-note">一般的な相談のための情報です。適した施術は医師に確認してください。画像はAIで生成したイメージであり、患者や施術効果の写真ではありません。</p></div>
    </main>
    <GuideFooter cards /><ArticleFeedback locale="ja-JP" />
  </div>;
}
