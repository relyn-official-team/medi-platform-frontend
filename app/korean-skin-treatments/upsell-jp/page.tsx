import Image from "@/app/korean-skin-treatments/shared/GuideImage";
import Link from "next/link";
import ArticleFeedback from "../upsell-kr/ArticleFeedback";
import { GuideFooter, GuideHeader, GuideToc } from "./GuideChrome";
import { ARTICLE_FAQS, ARTICLE_IMAGES, ARTICLE_PATH, ARTICLE_SOURCE, ARTICLE_TITLE, getArticleJsonLd, getArticleMetadata } from "./article";
import { SKIN_GUIDE_PATHS } from "@/lib/skin-guide-locales";

export const metadata = getArticleMetadata();
const imageSizes = "(max-width: 600px) calc(100vw - 40px), (max-width: 808px) calc(100vw - 60px), (max-width: 920px) 748px, (max-width: 1150px) calc(100vw - 292px), 748px";

export default function JapaneseUpsellArticlePage() {
  return <div className="skin-guide jp-guide blog-body" lang="ja-JP">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd()).replace(/</g, "\\u003c") }} />
    <GuideHeader />
    <div className="content-layout">
      <aside className="article-sidebar"><GuideToc /></aside>
      <details className="mobile-toc"><summary>この記事の目次 <span>6つのテーマ</span></summary><GuideToc /></details>
      <main id="article" className="blog-article">
        <article aria-labelledby="article-title">
          <header className="article-header">
            <p className="article-category">韓国美容医療・カウンセリングノート</p>
            <h1 id="article-title">{ARTICLE_TITLE}</h1>
            <p className="article-subtitle">勧められた施術は、自分に必要？<br />提案の理由と、見積もり・コース料金を確かめるために。</p>
            <div className="article-meta"><span>RELYN · 日本から渡韓する方へ</span><Link prefetch={false} href={SKIN_GUIDE_PATHS["ko-KR"]} hrefLang="ko-KR">韓国語の原文</Link></div>
          </header>
          <aside className="reading-note" aria-label="先に知っておきたい要点">
            <p className="note-heading">追加施術を勧められたら、まずこの3つ</p>
            <p className="quick-answer"><strong>希望しない施術は、断って構いません。</strong>迷うときは、自分の悩みにどう関係するかを聞き、使用量・施術範囲・総額を確認しましょう。その場で決める必要はありません。</p>
            <ol><li>「なぜ自分に必要なのか」を確かめる。</li><li>価格だけでなく、量・部位・回数を比較する。</li><li>可能なら、相談と施術の日程を分ける。</li></ol>
          </aside>
          <div className="article-prose">
            <p>受けたい施術を決め、料金も調べて韓国の美容皮膚科を予約したのに、カウンセリングで別の施術も勧められ、予算を超える見積もりになった。そんなとき、何を基準に考えればよいのでしょうか。</p>
            <p>より高いプランや多い使用量を勧める<strong>「アップセル」</strong>は、韓国の利用者にも話題になることがあります。日本からの旅行者だけの悩みではありません。追加施術を提案されたら、まず<mark>「自分に必要な理由」</mark>を具体的に確認してみましょう。</p>
          </div>
          <figure className="blog-photo">
            <Image src={ARTICLE_IMAGES[0].src} alt={ARTICLE_IMAGES[0].alt} sizes={imageSizes} width={1536} height={1024} loading="eager" fetchPriority="high" />
            <figcaption>施術を決める前に、説明を聞く時間を。<span>AI生成のイメージ画像</span></figcaption>
          </figure>
          <div className="article-prose">
            <section id="additional-procedures" aria-labelledby="additional-procedures-title">
              <p className="chapter-label">01. 追加施術を勧められたとき</p>
              <h2 id="additional-procedures-title">勧誘はどう断ればいい？<br />まず、当初の希望を伝えましょう。</h2>
              <p>アップセルとは、当初選んだものより高額なプランや上位のオプション、より多い量の購入を促す販売手法です。事前に見た料金と、来院後の見積もりに差が出る理由の一つにもなります。</p>
              <p>韓国語の原稿には、リジュランだけを希望して予約したのに、Thermage、Ultherapy、トーニング10回まで勧められたという韓国の利用者の声が引用されています。一緒に受けないといけないような説明に戸惑った、という事例です。</p>
              <p className="small-source">事例について：韓国語原稿が引用したBlindの2025年の個人投稿です。原文リンクがなく、ここでは内容を検証できていません。個人の経験であり、すべてのクリニックや施術に当てはまるものではありません。</p>
              <p>別の施術も勧められたら、もともと改善したかった悩みとどう関係するかを尋ねてください。希望しない場合は、意思をはっきり伝えて大丈夫です。</p>
              <blockquote><p>「今日は予約した施術についてだけ、<br />相談したいです。」</p></blockquote>
              <p>断った後も勧誘が続く、希望した施術だけでは受けにくいと感じる場合は、いったん判断を持ち帰り、事前に調べておいたほかのクリニックの説明と比較する方法もあります。</p>
            </section>
            <section id="assess-recommendations" aria-labelledby="assess-recommendations-title">
              <p className="chapter-label">02. 自分に必要な提案かを確かめる</p>
              <h2 id="assess-recommendations-title">「一緒に受けるとよい」の先に、<br />どんな説明がありますか？</h2>
              <p>導入している機器や施術の組み合わせ方は、クリニックによって異なります。専門的に聞こえるかどうかより、<strong>自分の悩みとの関係が具体的に説明されているか</strong>を確認しましょう。</p>
              <ul className="article-questions">
                <li>この施術は、私のどの悩みに対するものですか？</li><li>組み合わせた場合、期待できる効果と限界は何ですか？</li>
                <li>リスクや副作用、ほかの選択肢はありますか？</li><li>追加しない場合、どのような違いがありますか？</li>
              </ul>
              <p>施術が自分に適しているか、同時に受けられるかといった医学的な判断は、医師に確認してください。医師との相談が可能なら、その時間を優先しましょう。</p>
              <p className="source-reference">日本の消費者庁も、<a href={ARTICLE_SOURCE}>美容医療を受ける前の確認事項</a>として、効果だけでなくリスクや代替案の説明を受け、急いで決める必要があるか考えるよう案内しています。ここでは相談時の確認事項を参考にしており、韓国の法制度を説明する資料としては扱っていません。</p>
            </section>
            <section id="compare-estimates" aria-labelledby="compare-estimates-title">
              <p className="chapter-label">03. 見積もりが想定より高くなったとき</p>
              <h2 id="compare-estimates-title">表示価格と見積もりが違うのはなぜ？<br />同じ施術名でも、条件を比べましょう。</h2>
              <p>同じ名称の施術でも、実際の使用量や対象部位が違えば見積もりは変わることがあります。対面で肌の状態を確認してから料金が決まる場合もあるため、予約前に正確な金額を出すのが難しいこともあります。</p>
              <figure className="blog-photo">
                <Image src={ARTICLE_IMAGES[1].src} alt={ARTICLE_IMAGES[1].alt} sizes={imageSizes} width={1536} height={1024} loading="lazy" />
                <figcaption>「いくらか」と一緒に、「何が含まれるか」も確認。<span>AI生成のイメージ画像</span></figcaption>
              </figure>
              <p>概算を問い合わせるときは、現在の肌の状態、希望する施術、気になる部位を具体的に伝えましょう。必要な量と範囲を確認したうえで、予算には少し余裕を持たせておくと考えやすくなります。</p>
              <p>韓国語の原稿には、低価格で案内された施術の実際の金額が、表示価格の1.5〜2倍になった例も登場します。これは一般的な上乗せ率でも、あなたの費用を予測する数字でもありません。倍率を想定するより、<mark>自分に必要な量と施術範囲</mark>を事前に確かめてください。</p>
              <div className="comparison-wrap"><table className="comparison-table">
                <caption>見積書で確認したい4つの項目</caption>
                <thead><tr><th scope="col">比べる項目</th><th scope="col">そのまま聞ける質問</th></tr></thead>
                <tbody>
                  <tr><th scope="row">使用量</th><td>この料金はどのくらいの量を前提にしていますか？私の場合はどれくらい必要ですか？</td></tr>
                  <tr><th scope="row">施術範囲</th><td>希望する部位はすべて含まれていますか？別料金になる部位はありますか？</td></tr>
                  <tr><th scope="row">回数・内容</th><td>1回分の料金ですか？複数回の契約をした場合の、1回あたりの料金ですか？</td></tr>
                  <tr><th scope="row">支払総額</th><td>追加項目やその他の費用を含む総額はいくらですか？通貨も確認させてください。</td></tr>
                </tbody>
              </table></div>
            </section>
            <section id="packages" aria-labelledby="packages-title">
              <p className="chapter-label">04. 回数券・コースがお得に見えるとき</p>
              <h2 id="packages-title">韓国の美容施術、まとめ買いはお得？<br />まず、通い切れるかを考えましょう。</h2>
              <p>まだ施術を決めていないなら、単発の料金とコース内容、大きい使用量の割引を比較することはできます。ただし、割引率と同時に<strong>必要な回数、通える日程、支払う総額</strong>を見てください。</p>
              <p>日本から何度も渡韓するのが難しければ、すべての回数を利用できるかが重要です。クリニックに有効期限を確認し、医師に必要な回数と間隔を聞いてから、滞在日数や次回の旅行予定と照らし合わせましょう。通院の見通しを考えずに支払いを急かされたら、慎重に検討してください。</p>
            </section>
            <section id="consultation-plan" aria-labelledby="consultation-plan-title">
              <p className="chapter-label">05. 相談と施術の日程を考える</p>
              <h2 id="consultation-plan-title">カウンセリングだけでも大丈夫？<br />予約時に、別日での施術が可能か確認を。</h2>
              <p>安さだけで1か所に決めるより、2〜3か所の説明を比較してみましょう。初回を相談だけの予定にできれば、情報を整理する時間が持てます。予約時には相談のみの受診が可能か、相談料がかかるかも確認してください。</p>
              <ol className="article-steps">
                <li><strong>相談日と施術日を分けられるか確認する</strong><p>説明を聞いてから決めたいことを、予約時に伝えます。</p></li>
                <li><strong>提案の理由と見積もりを整理する</strong><p>自分の悩みとの関係、期待できる効果と限界、量・範囲・料金を記録します。</p></li>
                <li><strong>比較してから施術を予約する</strong><p>各クリニックの説明を振り返り、納得できる内容を選びましょう。</p></li>
              </ol>
              <p>予約状況や旅行日程によっては、相談と施術を同じ日にする必要があるかもしれません。分けにくい場合は、候補のクリニックを最後の相談予定にするか、渡韓前に肌の状態や希望を詳しく伝え、提案内容と概算を先に比較しておく方法もあります。</p>
            </section>
            <section className="blog-faq" id="questions" aria-labelledby="questions-title">
              <p className="chapter-label">渡韓前によくある質問</p>
              <h2 id="questions-title">カウンセリングの前に、<br />こんなことも気になりませんか？</h2>
              {ARTICLE_FAQS.map(({ question, answer }, index) => <div key={question}><h3 id={`question-${index + 1}`}>{question}</h3><p>{answer}</p></div>)}
            </section>
            <div className="article-ending"><p>予約前には、料金だけでなく「自分が必要とする情報を、十分に説明してくれるか」という視点でもクリニックを見てみましょう。</p><p><strong>質問は十分に。<br />決めるのは、自分のペースで。</strong></p></div>
          </div>
          <footer className="article-footer">
            <p>RELYNが提供する、韓国語のカウンセリングノートをもとにした日本語版です。一般的な相談・料金比較の情報であり、個別の診断ではありません。適した施術や併用については、診察を受けたうえで医師に相談してください。</p>
            <p>事例は出典の確認範囲を明記しています。画像はAIで生成したイメージであり、実際の患者や施術効果の写真ではありません。</p>
            <div className="article-tags"><span>#韓国美容皮膚科</span><span>#美容医療</span><span>#カウンセリング</span><span>#見積もり比較</span></div>
            <Link prefetch={false} className="end-link" href={`${ARTICLE_PATH}/cards`}>10枚のカードで要点を振り返る →</Link>
          </footer>
        </article>
      </main>
    </div>
    <GuideFooter /><ArticleFeedback locale="ja-JP" />
  </div>;
}
