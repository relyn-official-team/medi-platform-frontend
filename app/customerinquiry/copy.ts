// app/customerinquiry/copy.ts
// 다국어 확장용 카피 데이터.
// 향후 ja / tw / hk 추가 시 아래 ko 블록을 복제하여 번역만 교체하면 됩니다.
//   - 한국어:    /customerinquiry        -> landingCopy.ko
//   - 일본어:    /customerinquiry/ja     -> landingCopy.ja
//   - 대만 번체: /customerinquiry/tw     -> landingCopy.tw
//   - 홍콩 번체: /customerinquiry/hk     -> landingCopy.hk

/** 인라인 텍스트 조각. a=accent(그라데이션), s=strong(굵게) */
export type Seg = { t: string; a?: boolean; s?: boolean };
/** 줄 단위 텍스트 (각 줄은 조각 배열, 줄 사이는 <br/>) */
export type Line = Seg[];

export interface LandingCopy {
  meta: { title: string; description: string };
  nav: { brand: string; links: { label: string; href: string }[]; cta: string };
  hero: {
    badge: string;
    h1: Line[];
    sub: Line[];
    btnPrimary: string;
    btnSecondary: string;
    stats: { n: string; l: string }[];
  };
  marquee: string[];
  pain: {
    chip: string;
    h2: Line[];
    sub: string;
    tags: { text: string; variant: string; align: string }[];
  };
  expert: {
    chip: string;
    h2: Line[];
    hook: Line[];
    desc: string;
    visualLabel: string;
    feats: { icon: string; t: string; d: string }[];
    profile: {
      vip: string;
      avatar: string;
      name: string;
      role: string;
      rows: string[];
      cta: string;
    };
  };
  how: {
    chip: string;
    h2: Line[];
    sub: string;
    steps: { num: string; icon: string; t: string; d: string; tag?: string }[];
  };
  sol: {
    chip: string;
    h2: Line[];
    sub: string;
    cards: { n: string; t: string; d: string }[];
  };
  treat: {
    chip: string;
    h2: Line[];
    cards: { em: string; n: string; ex: string }[];
    moreBtn: string;
    cardCta: string;
  };
  midCta: { text: Line[]; btn: string };
  proof: {
    chip: string;
    h2: Line[];
    stats: { n: string; l: string }[];
    reviews: { text: string; flag: string; name: string; from: string }[];
  };
  form: {
    chip: string;
    lh2: Line[];
    lsub: string;
    perks: string[];
    contact: {
      title: string;
      desc: string;
      lineMain: string;
      lineSub: string;
      whatsappMain: string;
      whatsappSub: string;
      disc: string;
    };
  };
  footer: { brand: string; copyright: string; links: string[] };
}

const ko: LandingCopy = {
  meta: {
    title: "RELYN — K-뷰티 프리미엄 컨시어지",
    description:
      "연예인·아이돌·셀럽 담당 VIP 상담실장 출신이 한국 피부·성형·치과·웰니스 시술을 1:1로 추천하고 예약까지 무료로 대행합니다.",
  },
  nav: {
    brand: "RELYN",
    links: [
      { label: "시술 보기", href: "#treatments" },
      { label: "진행 방법", href: "#how" },
      { label: "상담 신청", href: "#consult" },
    ],
    cta: "무료 상담 →",
  },
  hero: {
    badge: "K-뷰티 프리미엄 컨시어지 · 예약까지 무료 대행",
    h1: [
      [{ t: "한국인이 실제로 가는 병원," }],
      [{ t: "이제 여러분도 알 수 있습니다", a: true }],
    ],
    sub: [
      [{ t: "검색해도 안 나오는 강남 클리닉 정보." }],
      [{ t: "연예인·아이돌·셀럽 담당 VIP 상담실장 출신", s: true }, { t: "이" }],
      [{ t: "지금 여러분의 상황에 맞게 직접 알려드립니다." }],
    ],
    btnPrimary: "무료 상담받기 →",
    btnSecondary: "시술 둘러보기",
    stats: [
      { n: "500+", l: "상담 완료" },
      { n: "12개국", l: "해외 고객" },
      { n: "4.9★", l: "평균 만족도" },
      { n: "무료 ", l: "고객 상담 비용" },
    ],
  },
  marquee: [
    "리프팅",
    "울쎄라",
    "써마지",
    "인모드",
    "티타늄 리프팅",
    "보톡스",
    "필러",
    "스킨부스터",
    "리쥬란",
    "쥬베룩",
    "물광주사",
    "엑소좀",
    "색소·미백",
    "레이저 토닝",
    "여드름 관리",
    "모공·흉터",
  ],
  pain: {
    chip: "이런 경험 있으신가요?",
    h2: [[{ t: "한국 시술 알아볼 때" }], [{ t: "다들 겪는 일", a: true }]],
    sub: "검색할수록 오히려 더 복잡해지는 느낌, 저희가 해결해드립니다.",
    tags: [
      { text: "어디가 좋은지 모르겠다", variant: "outline", align: "left" },
      { text: "같은 시술인데 가격이 왜 이렇게 다를까", variant: "filled", align: "right" },
      { text: "영어 된다더니 막상 가면 소통이 안 된다", variant: "outline", align: "left" },
      { text: "내 상황에 딱 맞는 정보가 없다", variant: "outline", align: "right" },
    ],
  },
  expert: {
    chip: "왜 저희인가요?",
    h2: [
      [{ t: "연예인·아이돌·셀럽 담당" }],
      [{ t: "VIP 상담실장 출신", a: true }, { t: "이" }],
      [{ t: "직접 알려주는 정보" }],
    ],
    hook: [
      [
        { t: "강남에서 " },
        { t: "10년 넘게", s: true },
        { t: " 연예인, 아이돌, 인플루언서들의 시술을 옆에서 챙겨온 상담실장 출신만 아는 정보가 있습니다." },
      ],
      [
        { t: "어느 원장님이 어떤 시술에 강한지, 어디서 예약하면 다른지 — " },
        { t: "검색으로는 절대 안 나오는 것들", s: true },
        { t: "입니다." },
      ],
    ],
    desc: "그 노하우를 바탕으로 여러분 상황에 맞는 병원과 시술을 찾아드리고, 예약까지 대신 진행합니다. 상담부터 예약 확정까지가 저희의 역할입니다.",
    visualLabel: "RELYN 전문가 상담 장면",
    feats: [
      {
        icon: "👁",
        t: "관광객은 모르는 병원 리스트",
        d: "광고 없이 현지인 입소문만으로 유지되는 강남 클리닉 정보 보유",
      },
      {
        icon: "🎯",
        t: "내 상황에 맞는 1:1 추천",
        d: "피부 타입, 원하는 결과, 예산을 모두 반영한 맞춤 추천. 템플릿이 아닙니다.",
      },
      {
        icon: "📋",
        t: "예약 & 가격 협상까지 대행",
        d: "병원 섭외부터 예약 확정까지 전부 처리. 직접 연락할 필요 없습니다.",
      },
    ],
    profile: {
      vip: "VIP",
      avatar: "👤",
      name: "VIP 전담 상담실장 출신",
      role: "10년+ 경력 · 강남 프리미엄 네트워크",
      rows: [
        "연예인·아이돌·셀럽 VIP 담당 상담 이력",
        "강남 클리닉 10곳+ 독점 파트너 네트워크",
        "피부·성형·치과·웰니스 전 분야 커버",
        "1:1 맞춤 상담 · 예약 확정까지 직접 진행",
        "고객 만족도 4.9 / 5.0 (500+ 상담 기준)",
      ],
      cta: "무료 상담받기 →",
    },
  },
  how: {
    chip: "진행 방법",
    h2: [[{ t: "딱 " }, { t: "3단계", a: true }, { t: "면 됩니다" }]],
    sub: "복잡한 거 없습니다. 궁금한 거 말씀해 주시면 나머지는 저희가 다 합니다.",
    steps: [
      {
        num: "01",
        icon: "📋",
        t: "궁금한 거 말씀해 주세요",
        d: "관심 있는 시술, 대략적인 예산, 방문 일정만 알려주시면 됩니다. 3분이면 충분합니다.",
        tag: "✦ 완전 무료",
      },
      {
        num: "02",
        icon: "💬",
        t: "맞춤 정보를 받으세요",
        d: "지금 상황에 딱 맞는 병원과 시술을 알려드립니다. 어떤 걸 선택할지 함께 정리해 드립니다.",
      },
      {
        num: "03",
        icon: "✈️",
        t: "예약 확정 후 한국에 오세요",
        d: "병원 예약과 가격 협상까지 모두 저희가 진행합니다. 확정된 일정만 받아서 오시면 됩니다.",
      },
    ],
  },
  sol: {
    chip: "우리가 하는 일",
    h2: [[{ t: "검색 말고," }], [{ t: "아는 사람한테 물어보세요", a: true }]],
    sub: "정보의 질이 다릅니다. 현지에서 10년 쌓은 네트워크가 여러분의 선택을 바꿉니다.",
    cards: [
      {
        n: "01",
        t: "현지인만 아는 병원 추천",
        d: "광고 없이 입소문으로만 유지되는 강남 클리닉 리스트. 외부에 잘 알려지지 않은 곳들입니다.",
      },
      {
        n: "02",
        t: "나한테 맞는 시술 찾기",
        d: "피부 타입, 얼굴 구조, 예산 전부 반영한 맞춤 추천. 일반적인 후기와 차원이 다릅니다.",
      },
      {
        n: "03",
        t: "예약 & 가격 협상 대행",
        d: "병원 섭외, 가격 조율, 예약 확정까지 전부 처리합니다. 외국인이라 바가지 쓸 일 없습니다.",
      },
      {
        n: "04",
        t: "예약까지 모든 과정 무료",
        d: "예약이 확정되면 병원에서 수수료를 받는 구조. 고객님 비용은 처음부터 끝까지 무료 입니다.",
      },
    ],
  },
  treat: {
    chip: "시술 카테고리",
    h2: [[{ t: "한국인이 " }, { t: "실제로 받는", a: true }, { t: " 시술" }]],
    cards: [
      { em: "⚡", n: "리프팅", ex: "울쎄라 · 써마지 · 인모드 · 티타늄" },
      { em: "💉", n: "보톡스", ex: "주름 · 사각턱 · 승모근 · 종아리" },
      { em: "💧", n: "필러", ex: "이마 · 코 · 입술 · 팔자 · 턱끝" },
      { em: "✨", n: "스킨부스터", ex: "리쥬란 · 쥬베룩 · 물광 · 엑소좀" },
      { em: "💫", n: "색소·미백", ex: "토닝 · 잡티 · 기미 · 홍조 · 피부톤" },
      { em: "🌿", n: "여드름·흉터", ex: "여드름 관리 · 모공 · 흉터 · 재생" },
    ],
    moreBtn: "더 많은 시술정보 자세히 보기 →",
    cardCta: "상담받기 →",
  },
  midCta: {
    text: [
      [{ t: "어떤 시술이 나한테 맞는지" }],
      [{ t: "그냥 물어보세요. 무료입니다.", a: true }],
    ],
    btn: "무료 상담받기 →",
  },
  proof: {
    chip: "실제 후기",
    h2: [[{ t: "12개국", a: true }, { t: " 고객이 찾아온" }], [{ t: "이유가 있습니다" }]],
    stats: [
      { n: "500+", l: "상담 완료 건수" },
      { n: "12", l: "서비스 국가 수" },
      { n: "4.9★", l: "평균 만족도" },
      { n: "0원", l: "고객 상담 비용" },
    ],
    reviews: [
      {
        text: "혼자 찾다가 포기했던 강남 클리닉을 연결해줬어요. 제 피부에 딱 맞는 원장님이었고 결과도 완벽했습니다.",
        flag: "🇺🇸",
        name: "Sarah M.",
        from: "미국 뉴욕 · 피부 리프팅",
      },
      {
        text: "처음 갔던 병원보다 40% 저렴한 가격에 더 좋은 의사를 만났어요. 가격 협상까지 해줄 줄 몰랐습니다.",
        flag: "🇸🇬",
        name: "Priya L.",
        from: "싱가포르 · 코 성형 상담",
      },
      {
        text: "어디 가야 할지 몰라 막막했는데 딱 맞는 병원 찾아주고 예약까지 다 해줬어요. 혼자였으면 몇 배는 헤맸을 것 같습니다.",
        flag: "🇦🇪",
        name: "Layla K.",
        from: "UAE 두바이 · 모발이식",
      },
    ],
  },
  form: {
    chip: "지금 시작하세요",
    lh2: [
      [{ t: "궁금한 거" }],
      [{ t: "그냥 " }, { t: "물어보세요", a: true }],
      [{ t: "어차피 무료입니다" }],
    ],
    lsub: "어떤 병원이 맞는지 정리해드리고 예약까지 대신 진행합니다. 거기까지가 저희 역할입니다. 예약이 확정되면 병원에서 수수료를 받는 구조라 고객님 비용은 무료 입니다.",
    perks: [
      "지금 상황에 맞는 병원·시술 1:1 추천",
      "현지인이 실제로 내는 가격 그대로 공유",
      "병원 섭외·예약·가격 협상 전부 대행",
      "상담부터 예약 확정까지 모두 무료",
    ],
    contact: {
      title: "문의 채널 선택",
      desc: "편하신 메신저를 선택해 문의해 주세요.",
      lineMain: "LINE 문의",
      lineSub: "LINE으로 상담 시작하기",
      whatsappMain: "WhatsApp 문의",
      whatsappSub: "WhatsApp으로 상담 시작하기",
      disc: "상담 가능 시간 및 답변 속도는 채널 상황에 따라 달라질 수 있습니다.",
    },
  },
  footer: {
    brand: "RELYN",
    copyright: "© 2026 RELYN. All rights reserved.",
    links: ["개인정보처리방침", "이용약관", "문의하기"],
  },
};

const ja: LandingCopy = {
  meta: {
    title: "RELYN — Kビューティー プレミアムコンシェルジュ",
    description:
      "RELYNは、韓国の美容皮膚科・美容施術を検討している方へ、相談から予約案内までサポートするサービスです。",
  },
  nav: {
    brand: "RELYN",
    links: [
      { label: "施術を見る", href: "#treatments" },
      { label: "ご利用の流れ", href: "#how" },
      { label: "相談する", href: "#consult" },
    ],
    cta: "無料相談 →",
  },
  hero: {
    badge: "Kビューティー プレミアムコンシェルジュ・予約案内まで無料サポート",
    h1: [
      [{ t: "韓国人が実際に通うクリニック、" }],
      [{ t: "日本語でわかりやすくご案内します", a: true }],
    ],
    sub: [
      [{ t: "検索だけでは見つけにくい韓国・江南のクリニック情報。" }],
      [
        { t: "芸能人・アイドル・インフルエンサー対応経験のある専任カウンセラー", s: true },
        { t: "が" },
      ],
      [{ t: "あなたの希望や状況に合わせてご案内します。" }],
    ],
    btnPrimary: "無料相談する →",
    btnSecondary: "施術を見る",
    stats: [
      { n: "500+", l: "相談実績" },
      { n: "12か国", l: "海外のお客様" },
      { n: "4.9★", l: "平均満足度" },
      { n: "無料", l: "相談費用" },
    ],
  },
  marquee: [
    "リフトアップ",
    "ウルセラ",
    "サーマクール",
    "インモード",
    "チタニウムリフト",
    "ボトックス",
    "ヒアルロン酸・フィラー",
    "スキンブースター",
    "リジュラン",
    "ジュベルック",
    "水光注射",
    "エクソソーム",
    "シミ・美白",
    "レーザートーニング",
    "ニキビ治療",
    "毛穴・ニキビ跡",
  ],
  pain: {
    chip: "こんなお悩みはありませんか？",
    h2: [[{ t: "韓国の施術を調べるとき" }], [{ t: "多くの方が感じること", a: true }]],
    sub: "調べれば調べるほど複雑に感じる情報を、わかりやすく整理します。",
    tags: [
      { text: "どこが良いのかわからない", variant: "outline", align: "left" },
      { text: "同じ施術なのに、なぜ料金がこんなに違うのか", variant: "filled", align: "right" },
      { text: "日本語対応と聞いたのに、細かい希望がうまく伝わらない", variant: "outline", align: "left" },
      { text: "自分に合う情報が見つからない", variant: "outline", align: "right" },
    ],
  },
  expert: {
    chip: "なぜRELYNなのか",
    h2: [
      [{ t: "VIP対応経験のある" }],
      [{ t: "専任カウンセラー", a: true }, { t: "が" }],
      [{ t: "わかりやすくご案内します" }],
    ],
    hook: [
      [
        { t: "韓国・江南で" },
        { t: "10年以上", s: true },
        { t: "、芸能人・アイドル・インフルエンサーの美容相談に関わってきた現場経験をもとにご案内します。" },
      ],
      [
        { t: "どのクリニックがどの施術に強いのか、どのように予約すればよいのか――" },
        { t: "一般検索だけでは見つけにくい情報", s: true },
        { t: "を整理してご案内します。" },
      ],
    ],
    desc: "その経験をもとに、お客様の状況に合うクリニックや施術を整理し、予約案内までサポートします。",
    visualLabel: "RELYNの相談サポートイメージ",
    feats: [
      {
        icon: "👁",
        t: "観光客向けではないクリニック情報",
        d: "広告だけでは判断しにくい、現地で選ばれるクリニック情報を整理",
      },
      {
        icon: "🎯",
        t: "自分に合う1:1提案",
        d: "肌状態、希望する仕上がり、予算をふまえてご案内します。",
      },
      {
        icon: "📋",
        t: "予約条件の確認までサポート",
        d: "クリニック確認から予約案内まで、必要な流れをサポートします。",
      },
    ],
    profile: {
      vip: "VIP",
      avatar: "👤",
      name: "VIP対応経験のある専任カウンセラー",
      role: "10年以上の経験・韓国江南ネットワーク",
      rows: [
        "芸能人・アイドル・インフルエンサー対応経験",
        "江南クリニックとのネットワーク",
        "美容皮膚・美容施術を中心に対応",
        "1:1相談から予約案内までサポート",
        "相談満足度 4.9 / 5.0",
      ],
      cta: "無料相談する →",
    },
  },
  how: {
    chip: "ご利用の流れ",
    h2: [[{ t: "たった" }, { t: "3ステップ", a: true }, { t: "で進められます" }]],
    sub: "気になることを教えていただければ、必要な情報を整理してご案内します。",
    steps: [
      {
        num: "01",
        icon: "📋",
        t: "気になる内容を送る",
        d: "希望の施術、予算、訪問予定日を簡単にお知らせください。",
        tag: "✦ 無料",
      },
      {
        num: "02",
        icon: "💬",
        t: "あなたに合う情報を受け取る",
        d: "状況に合わせてクリニックや施術情報を整理してご案内します。",
      },
      {
        num: "03",
        icon: "✈️",
        t: "予約内容を確認して韓国へ",
        d: "予約内容と日程を確認し、韓国での施術準備を進められます。",
      },
    ],
  },
  sol: {
    chip: "RELYNがすること",
    h2: [[{ t: "検索だけで迷わず、" }], [{ t: "現地を知る人に聞いてください", a: true }]],
    sub: "情報の質が変わります。現地で積み重ねたネットワークをもとに、選択をサポートします。",
    cards: [
      {
        n: "01",
        t: "現地で選ばれるクリニック情報",
        d: "広告だけではわかりにくい江南クリニック情報を整理してご案内します。",
      },
      {
        n: "02",
        t: "自分に合う施術探し",
        d: "肌状態、顔立ち、予算をふまえて、候補をわかりやすく整理します。",
      },
      {
        n: "03",
        t: "予約条件の確認サポート",
        d: "クリニック確認、予約内容、日程調整の流れをサポートします。",
      },
      {
        n: "04",
        t: "相談から予約サポートまで無料",
        d: "お客様の相談費用は無料です。必要な情報を確認してから進められます。",
      },
    ],
  },
  treat: {
    chip: "施術カテゴリー",
    h2: [[{ t: "韓国で" }, { t: "実際に選ばれる", a: true }, { t: "美容施術" }]],
    cards: [
      {
        em: "⚡",
        n: "リフトアップ",
        ex: "ウルセラ・サーマクール・インモード・チタニウムリフト",
      },
      { em: "💉", n: "ボトックス", ex: "表情じわ・エラ・肩・ふくらはぎ" },
      { em: "💧", n: "ヒアルロン酸・フィラー", ex: "額・鼻・唇・ほうれい線・あご" },
      {
        em: "✨",
        n: "スキンブースター",
        ex: "リジュラン・ジュベルック・水光注射・エクソソーム",
      },
      { em: "🌙", n: "シミ・美白", ex: "レーザートーニング・シミ・肝斑・赤み・くすみ" },
      { em: "🌿", n: "ニキビ・ニキビ跡", ex: "ニキビケア・毛穴・ニキビ跡・肌再生" },
    ],
    moreBtn: "もっと施術情報を見る →",
    cardCta: "相談する →",
  },
  midCta: {
    text: [
      [{ t: "どの施術が自分に合うか" }],
      [{ t: "まずは無料でご相談ください。", a: true }],
    ],
    btn: "無料相談する →",
  },
  proof: {
    chip: "実際の声",
    h2: [[{ t: "12か国", a: true }, { t: "のお客様に" }], [{ t: "選ばれる理由があります" }]],
    stats: [
      { n: "500+", l: "相談実績" },
      { n: "12", l: "対応国" },
      { n: "4.9★", l: "平均満足度" },
      { n: "0円", l: "相談費用" },
    ],
    reviews: [
      {
        text: "一人で探していた時は迷っていましたが、自分に合うクリニック候補を整理してもらえて安心できました。",
        flag: "🇯🇵",
        name: "Mika T.",
        from: "日本 東京・リフトアップ相談",
      },
      {
        text: "料金や予約内容を事前に確認できたので、韓国での施術準備がスムーズでした。",
        flag: "🇯🇵",
        name: "Yuri K.",
        from: "日本 大阪・肌管理",
      },
      {
        text: "どこに相談すればよいかわからなかったのですが、LINEで流れを確認できて安心しました。",
        flag: "🇯🇵",
        name: "Aoi S.",
        from: "日本 福岡・スキンブースター相談",
      },
    ],
  },
  form: {
    chip: "今すぐ相談",
    lh2: [
      [{ t: "気になることを" }],
      [{ t: "そのまま相談", a: true }],
      [{ t: "してください" }],
    ],
    lsub:
      "どのクリニックが合うのか、どの施術を検討すればよいのかを整理してご案内します。相談から予約サポートまで無料で対応します。",
    perks: [
      "希望や状況に合わせたクリニック・施術の1:1案内",
      "クリニックで確認できる料金情報を基準に案内",
      "予約内容と日程確認をサポート",
      "相談から予約サポートまで無料",
    ],
    contact: {
      title: "相談方法を選択",
      desc: "ご希望のメッセンジャーからお気軽にご相談ください。",
      lineMain: "LINEで相談",
      lineSub: "LINEで無料相談を開始",
      whatsappMain: "WhatsAppで相談",
      whatsappSub: "WhatsAppで無料相談を開始",
      disc: "対応時間や返信速度は、各チャネルの状況により異なる場合があります。",
    },
  },
  footer: {
    brand: "RELYN",
    copyright: "© 2026 RELYN. All rights reserved.",
    links: ["プライバシーポリシー", "利用規約", "お問い合わせ"],
  },
};

export type Locale = "ko" | "ja" | "tw" | "hk";

export const landingCopy: Partial<Record<Locale, LandingCopy>> = {
  ko,
  ja,
  // tw: { ... },  // 대만 번체 버전 추가 시
  // hk: { ... },  // 홍콩 번체 버전 추가 시
};

export default landingCopy;
