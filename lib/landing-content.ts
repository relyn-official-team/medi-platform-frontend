import type { LucideIcon } from 'lucide-react';
import {
  TrendingUp,
  BarChart3,
  Globe2,
  Sparkles,
  FileSignature,
  Receipt,
  Database,
  Users,
  Layers3,
  PieChart,
} from 'lucide-react';

export type LandingLocale = 'ko' | 'en' | 'ja' | 'zh';
export type InquiryType = 'HOSPITAL' | 'AGENCY';

export type LandingCard = {
  icon: LucideIcon;
  title: string;
  bold?: string;
  desc?: string;
};

export type LandingContent = {
  locale: LandingLocale;
  htmlLang: string;
  ogLocale: string;
  brandAltName: string;
  badge: string;

  // SEO
  seoHeading: string;
  seoParagraph1: string;
  seoParagraph2: string;
  seoParagraph3: string;
  
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;

  marketOverviewLabel: string;
  marketOverviewTitleBefore: string;
  marketOverviewTitleAccent: string;
  marketOverviewTitleAfter: string;
  marketKeyMessage: string;

  operationalGapLabel: string;
  operationalGapTitleBefore: string;
  operationalGapTitleAccent: string;
  operationalGapTitleAfter: string;
  gapKeyMessage: string;

  networkEffectLabel: string;
  networkEffectTitle: string;
  networkEffectBadge: string;
  networkAgencyValue: string;
  networkHospitalGrowth: string;
  networkHospitalNode: string;
  networkAgencyNode: string;
  networkGrowth: string;

  systemArchitectureLabel: string;
  systemArchitectureTitleAccent: string;
  systemArchitectureTitleAfter: string;
  systemKeyMessage: string;

  onboardingLabel: string;
  onboardingTitle: string;
  onboardingKeyMessage: string;

  closingTitleBefore: string;
  closingTitleAccent: string;
  closingTitleAfter: string;

  footerCompany: string;
  footerAddress: string;
  footerPrivacy: string;
  footerSeoText: string;

  typeSelectTitle: string;
  hospitalInquiryTitle: string;
  hospitalInquiryDesc: string;
  agencyInquiryTitle: string;
  agencyInquiryDesc: string;
  inquiryNotice: string;

  formTitleHospital: string;
  formTitleAgency: string;
  formSubtitle: string;
  orgLabelHospital: string;
  orgLabelAgency: string;
  orgPlaceholderHospital: string;
  orgPlaceholderAgency: string;
  personLabel: string;
  personPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  successMessage: string;
  errorMessage: string;
  backButton: string;
  submitButton: string;
  submittingButton: string;

  marketCards: LandingCard[];
  gapCards: LandingCard[];
  systemCards: LandingCard[];
  onboardingCards: Array<{
    step: string;
    icon: LucideIcon;
    title: string;
    desc: string;
  }>;
};

export const landingContentMap: Record<LandingLocale, LandingContent> = {
  ko: {
    locale: 'ko',
    htmlLang: 'ko',
    ogLocale: 'ko_KR',
    brandAltName: '렐린',
    badge: 'Global Client Acquisition Infrastructure',
  seoHeading: '해외환자유치 병원·에이전시 연결 플랫폼',
  seoParagraph1:
    'RELYN은 해외환자유치를 원하는 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다.',
  seoParagraph2:
    '해외환자유치 과정에서 발생하는 계약, 정산, 데이터 관리 문제를 하나의 시스템으로 통합합니다.',
  seoParagraph3:
    '병원은 해외환자유치 채널을 확장하고, 에이전시는 안정적인 환자 유치 네트워크를 확보할 수 있습니다.',
    heroTitleLine1: '연결을 넘어,',
    heroTitleLine2: '기준을 만드는 구조',
    heroDescription:
      '글로벌 고객 유치 시장에서 발생하는 계약·정산·데이터의 분산을 해결하여, 병원과 에이전시 간의 거래를 “표준 구조”로 전환합니다.',
    primaryCta: '상담문의',
    secondaryCta: '카카오 채팅문의',

    marketOverviewLabel: 'MARKET OVERVIEW',
    marketOverviewTitleBefore: '시장은 ',
    marketOverviewTitleAccent: '확장 단계',
    marketOverviewTitleAfter: '에 진입했습니다',
    marketKeyMessage: '시장은 회복을 넘어 구조적 확장 단계에 진입했습니다',

    operationalGapLabel: 'OPERATIONAL GAP',
    operationalGapTitleBefore: '그러나 운영 구조는 ',
    operationalGapTitleAccent: '체계화 되어있지 않습니다',
    operationalGapTitleAfter: '',
    gapKeyMessage: '성장한 시장, 그러나 체계는 부재합니다',

    networkEffectLabel: 'NETWORK EFFECT',
    networkEffectTitle: 'Network Effect',
    networkEffectBadge: '연결이 쌓일수록 구조는 더욱 강해집니다',
    networkAgencyValue: '에이전시 가치 상승',
    networkHospitalGrowth: '병의원 유입 확대',
    networkHospitalNode: '병의원',
    networkAgencyNode: '에이전시',
    networkGrowth: '↑↑ 증가',

    systemArchitectureLabel: 'SYSTEM ARCHITECTURE',
    systemArchitectureTitleAccent: 'RELYN',
    systemArchitectureTitleAfter: '이 만드는 체계',
    systemKeyMessage: '거래를 체계적인 관리 가능한 구조로 만들어 최고의 편의성을 제공합니다',

    onboardingLabel: 'ONBOARDING PROCESS',
    onboardingTitle: '도입 프로세스',
    onboardingKeyMessage: '기존 운영 방식을 바꾸지 않아도 도입 가능합니다',

    closingTitleBefore: '성장한 시장, 이제 ',
    closingTitleAccent: '체계',
    closingTitleAfter: '를 설계할 차례입니다',

    footerCompany: '주식회사 렐린 | 대표이사 장기석 | 사업자등록번호 299-03-03608',
    footerAddress: '서울특별시 강남구 역삼로 512, 5층 603(대치동, 인테크빌딩)',
    footerPrivacy: '개인정보처리방침',
    footerSeoText: '해외환자유치 · 외국인환자유치 · 병원 에이전시 연결 플랫폼',

    typeSelectTitle: '문의 유형 선택',
    hospitalInquiryTitle: '병원입점문의',
    hospitalInquiryDesc: '병원 입점 관련 상담을 접수합니다.',
    agencyInquiryTitle: '에이전시제휴문의',
    agencyInquiryDesc: '에이전시 파트너십 관련 상담을 접수합니다.',
    inquiryNotice: '상담내용은 이메일로 접수되며, 담당자가 확인 후 연락드립니다.',

    formTitleHospital: '병원입점문의',
    formTitleAgency: '에이전시제휴문의',
    formSubtitle: '필수 항목만 입력하면 바로 접수됩니다.',
    orgLabelHospital: '병원명',
    orgLabelAgency: '에이전시명',
    orgPlaceholderHospital: '병원명을 입력해 주세요',
    orgPlaceholderAgency: '에이전시명을 입력해 주세요',
    personLabel: '성함',
    personPlaceholder: '성함을 입력해 주세요',
    phoneLabel: '연락처',
    phonePlaceholder: '연락처를 입력해 주세요',
    emailLabel: 'Email',
    emailPlaceholder: '연락가능한 이메일 주소를 입력해주세요.',
    successMessage: '접수되었습니다. 담당자가 확인 후 연락드리겠습니다.',
    errorMessage: '입력값을 확인해주세요. 또는 잠시 후 다시 시도해주세요.',
    backButton: '유형 다시 선택',
    submitButton: '접수하기',
    submittingButton: '전송 중...',

    marketCards: [
      { icon: TrendingUp, title: '코로나 이후', bold: '글로벌 고객 수 빠른 회복' },
      { icon: BarChart3, title: '고단가 시술 중심', bold: '매출 구조 확대' },
      { icon: Globe2, title: '국가 및 채널', bold: '유입 경로 다변화' },
      { icon: Sparkles, title: '프리미엄 클리닉', bold: '경쟁 심화' },
    ],
    gapCards: [
      { icon: FileSignature, title: '개별 계약 중심', bold: '운영' },
      { icon: Receipt, title: '표준화되지 않은', bold: '수수료 구조' },
      { icon: Database, title: '엑셀 기반', bold: '정산 관리' },
    ],
    systemCards: [
      {
        icon: FileSignature,
        title: '계약의\n기준 정립',
        desc: '표준화된 계약 양식과\n프로세스를 통해\n신뢰 가능한 협업 시작',
      },
      {
        icon: Receipt,
        title: '정산의\n기준 정립',
        desc: '투명한 수수료 체계와\n자동화된 정산으로\n재무적 리스크 제거',
      },
      {
        icon: Database,
        title: '데이터의\n통합 관리',
        desc: '분산된 유입 경로와\n매출 데이터를\n하나의 대시보드로 통합',
      },
      {
        icon: Users,
        title: '관계의\n구조화',
        desc: '일회성 연결을 넘어\n지속 가능한\n파트너십 생태계 구축',
      },
    ],
    onboardingCards: [
      {
        step: '01',
        icon: FileSignature,
        title: '기존 계약 등록',
        desc: '현재 운영 중인 계약 정보를 플랫폼에 간단히 등록하여 디지털화를 시작합니다.',
      },
      {
        step: '02',
        icon: Layers3,
        title: '정산 구조 세팅',
        desc: '복잡한 수수료율과 정산 주기를 시스템에 설정하여 자동 정산의 기반을 마련합니다.',
      },
      {
        step: '03',
        icon: PieChart,
        title: '통합 운영 시작',
        desc: '단일 대시보드에서 모든 파트너와 매출을 한눈에 관리합니다.',
      },
    ],
  },

  en: {
    locale: 'en',
    htmlLang: 'en',
    ogLocale: 'en_US',
    brandAltName: 'RELYN',
    badge: 'Global Client Acquisition Infrastructure',
  seoHeading: 'Global Patient Acquisition Platform for Hospitals and Agencies',
  seoParagraph1:
    'RELYN is a B2B platform connecting hospitals and global agencies for patient acquisition.',
  seoParagraph2:
    'It integrates contracts, settlements, and operational data into a unified system.',
  seoParagraph3:
    'Hospitals can expand acquisition channels, while agencies secure reliable networks.',
    heroTitleLine1: 'Beyond Connections,',
    heroTitleLine2: 'A Structure That Sets the Standard',
    heroDescription:
      'RELYN resolves fragmented contracts, settlements, and data operations in global patient acquisition, turning hospital–agency transactions into a standardized operating structure.',
    primaryCta: 'Contact Us',
    secondaryCta: 'Chat on Kakao',

    marketOverviewLabel: 'MARKET OVERVIEW',
    marketOverviewTitleBefore: 'The market has entered a ',
    marketOverviewTitleAccent: 'growth phase',
    marketOverviewTitleAfter: '',
    marketKeyMessage: 'The market is moving beyond recovery and into structural expansion.',

    operationalGapLabel: 'OPERATIONAL GAP',
    operationalGapTitleBefore: 'However, the operating structure is ',
    operationalGapTitleAccent: 'still not systemized',
    operationalGapTitleAfter: '',
    gapKeyMessage: 'The market has grown, but the operating system has not.',

    networkEffectLabel: 'NETWORK EFFECT',
    networkEffectTitle: 'Network Effect',
    networkEffectBadge: 'The more connections accumulate, the stronger the structure becomes.',
    networkAgencyValue: 'Agency Value Growth',
    networkHospitalGrowth: 'Hospital Inflow Expansion',
    networkHospitalNode: 'Hospitals',
    networkAgencyNode: 'Agencies',
    networkGrowth: 'Growth',

    systemArchitectureLabel: 'SYSTEM ARCHITECTURE',
    systemArchitectureTitleAccent: 'RELYN',
    systemArchitectureTitleAfter: ' Framework',
    systemKeyMessage: 'We turn transactions into a structured, manageable system that delivers maximum operational convenience.',

    onboardingLabel: 'ONBOARDING PROCESS',
    onboardingTitle: 'Onboarding Process',
    onboardingKeyMessage: 'Implementation is possible without changing your current way of operating.',

    closingTitleBefore: 'The market has grown. Now it is time to design the ',
    closingTitleAccent: 'system',
    closingTitleAfter: '.',

    footerCompany: 'RELYN Co., Ltd. | CEO Jang Gi-seok | Business Registration No. 299-03-03608',
    footerAddress: '5F 603, 512 Yeoksam-ro, Gangnam-gu, Seoul, Republic of Korea',
    footerPrivacy: 'Privacy Policy',
    footerSeoText: 'global patient acquisition platform for hospitals and agencies',

    typeSelectTitle: 'Select Inquiry Type',
    hospitalInquiryTitle: 'Hospital Partnership Inquiry',
    hospitalInquiryDesc: 'Submit an inquiry regarding hospital onboarding.',
    agencyInquiryTitle: 'Agency Partnership Inquiry',
    agencyInquiryDesc: 'Submit an inquiry regarding agency partnership.',
    inquiryNotice: 'Your inquiry will be received by email, and our team will contact you after review.',

    formTitleHospital: 'Hospital Partnership Inquiry',
    formTitleAgency: 'Agency Partnership Inquiry',
    formSubtitle: 'Only the required fields are needed to submit.',
    orgLabelHospital: 'Hospital Name',
    orgLabelAgency: 'Agency Name',
    orgPlaceholderHospital: 'Enter the hospital name',
    orgPlaceholderAgency: 'Enter the agency name',
    personLabel: 'Name',
    personPlaceholder: 'Enter your name',
    phoneLabel: 'Contact Number',
    phonePlaceholder: 'Enter your contact number',
    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email',
    successMessage: 'Your inquiry has been submitted. We will contact you after review.',
    errorMessage: 'Please check the input values or try again later.',
    backButton: 'Change inquiry type',
    submitButton: 'Submit',
    submittingButton: 'Sending...',

    marketCards: [
      { icon: TrendingUp, title: 'Post-COVID', bold: 'Rapid Recovery in Global Client Volume' },
      { icon: BarChart3, title: 'High-Value Procedures', bold: 'Expanded Revenue Structure' },
      { icon: Globe2, title: 'Markets & Channels', bold: 'Diversified Acquisition Paths' },
      { icon: Sparkles, title: 'Premium Clinics', bold: 'Intensified Competition' },
    ],
    gapCards: [
      { icon: FileSignature, title: 'Individually Managed', bold: 'Contracts' },
      { icon: Receipt, title: 'Non-Standardized', bold: 'Commission Structure' },
      { icon: Database, title: 'Spreadsheet-Based', bold: 'Settlement Management' },
    ],
    systemCards: [
      {
        icon: FileSignature,
        title: 'Contract\nStandardization',
        desc: 'Start reliable collaboration through standardized contract formats and workflows.',
      },
      {
        icon: Receipt,
        title: 'Settlement\nStandardization',
        desc: 'Remove financial risk with transparent commission structures and automated settlements.',
      },
      {
        icon: Database,
        title: 'Integrated\nData Management',
        desc: 'Consolidate acquisition channels and revenue data into one dashboard.',
      },
      {
        icon: Users,
        title: 'Structured\nRelationships',
        desc: 'Build a sustainable partnership ecosystem beyond one-time introductions.',
      },
    ],
    onboardingCards: [
      {
        step: '01',
        icon: FileSignature,
        title: 'Register Existing Contracts',
        desc: 'Digitize your current operating contracts by registering them in the platform.',
      },
      {
        step: '02',
        icon: Layers3,
        title: 'Set Settlement Rules',
        desc: 'Configure commission rates and settlement cycles to establish the basis for automation.',
      },
      {
        step: '03',
        icon: PieChart,
        title: 'Start Unified Operations',
        desc: 'Manage partners and revenue from a single dashboard.',
      },
    ],
  },

  ja: {
    locale: 'ja',
    htmlLang: 'ja',
    ogLocale: 'ja_JP',
    brandAltName: 'RELYN',
    badge: 'Global Client Acquisition Infrastructure',
  seoHeading: '海外患者誘致向け 病院・エージェンシー連携プラットフォーム',
  seoParagraph1:
    'RELYNは海外患者誘致を目指す病院とグローバルエージェンシーをつなぐB2Bプラットフォームです。',
  seoParagraph2:
    '契約・精算・データ管理を一つのシステムに統合します。',
  seoParagraph3:
    '病院は誘致チャネルを拡張し、エージェンシーは安定したネットワークを確保できます。',
    heroTitleLine1: '単なる接続を超えて、',
    heroTitleLine2: '基準をつくる仕組みへ',
    heroDescription:
      'RELYNは、グローバル患者誘致における契約・精算・データ運営の分散を解消し、病院とエージェンシー間の取引を標準化された運営構造へ転換します。',
    primaryCta: 'お問い合わせ',
    secondaryCta: 'Kakaoチャット',

    marketOverviewLabel: 'MARKET OVERVIEW',
    marketOverviewTitleBefore: '市場は',
    marketOverviewTitleAccent: '拡大フェーズ',
    marketOverviewTitleAfter: 'に入りました',
    marketKeyMessage: '市場は回復段階を超え、構造的拡大フェーズに入りました。',

    operationalGapLabel: 'OPERATIONAL GAP',
    operationalGapTitleBefore: 'しかし運営構造はまだ',
    operationalGapTitleAccent: '体系化されていません',
    operationalGapTitleAfter: '',
    gapKeyMessage: '市場は成長した一方で、仕組みはまだ不足しています。',

    networkEffectLabel: 'NETWORK EFFECT',
    networkEffectTitle: 'Network Effect',
    networkEffectBadge: 'つながりが増えるほど、構造はさらに強くなります。',
    networkAgencyValue: 'エージェンシー価値の向上',
    networkHospitalGrowth: '医療機関への流入拡大',
    networkHospitalNode: '病院・クリニック',
    networkAgencyNode: 'エージェンシー',
    networkGrowth: '増加',

    systemArchitectureLabel: 'SYSTEM ARCHITECTURE',
    systemArchitectureTitleAccent: 'RELYN',
    systemArchitectureTitleAfter: 'がつくる仕組み',
    systemKeyMessage: '取引を管理可能な構造へ変え、最高レベルの運営利便性を提供します。',

    onboardingLabel: 'ONBOARDING PROCESS',
    onboardingTitle: '導入プロセス',
    onboardingKeyMessage: '現在の運営方式を大きく変えずに導入できます。',

    closingTitleBefore: '成長した市場に、今必要なのは',
    closingTitleAccent: '仕組み',
    closingTitleAfter: 'の設計です',

    footerCompany: 'RELYN Co., Ltd. | 代表取締役 チャン・ギソク | 事業者登録番号 299-03-03608',
    footerAddress: '大韓民国 ソウル特別市 江南区 駅三路 512 5階 603',
    footerPrivacy: '個人情報処理方針',
    footerSeoText: '海外患者誘致 病院 エージェンシー 連携プラットフォーム',

    typeSelectTitle: 'お問い合わせ種別を選択',
    hospitalInquiryTitle: '病院提携のお問い合わせ',
    hospitalInquiryDesc: '病院の導入に関するご相談を受け付けます。',
    agencyInquiryTitle: 'エージェンシー提携のお問い合わせ',
    agencyInquiryDesc: 'エージェンシー提携に関するご相談を受け付けます。',
    inquiryNotice: 'お問い合わせ内容はメールで受け付け、担当者が確認後ご連絡いたします。',

    formTitleHospital: '病院提携のお問い合わせ',
    formTitleAgency: 'エージェンシー提携のお問い合わせ',
    formSubtitle: '必須項目のみ入力すれば送信できます。',
    orgLabelHospital: '病院名',
    orgLabelAgency: 'エージェンシー名',
    orgPlaceholderHospital: '病院名を入力してください',
    orgPlaceholderAgency: 'エージェンシー名を入力してください',
    personLabel: 'お名前',
    personPlaceholder: 'お名前を入力してください',
    phoneLabel: '連絡先',
    phonePlaceholder: '連絡先を入力してください',
    successMessage: '送信が完了しました。確認後ご連絡いたします。',
    emailLabel: 'E-mail',
    emailPlaceholder: 'メールアドレスを入力してください。',
    errorMessage: '入力内容をご確認のうえ、再度お試しください。',
    backButton: '種別を再選択',
    submitButton: '送信する',
    submittingButton: '送信中...',

    marketCards: [
      { icon: TrendingUp, title: 'コロナ後', bold: 'グローバル顧客数の急速な回復' },
      { icon: BarChart3, title: '高単価施術中心', bold: '売上構造の拡大' },
      { icon: Globe2, title: '国・チャネル', bold: '流入経路の多様化' },
      { icon: Sparkles, title: 'プレミアムクリニック', bold: '競争の激化' },
    ],
    gapCards: [
      { icon: FileSignature, title: '個別契約中心の', bold: '運営' },
      { icon: Receipt, title: '標準化されていない', bold: '手数料構造' },
      { icon: Database, title: 'Excelベースの', bold: '精算管理' },
    ],
    systemCards: [
      {
        icon: FileSignature,
        title: '契約の\n基準整備',
        desc: '標準化された契約様式とプロセスにより、信頼できる協業を始めます。',
      },
      {
        icon: Receipt,
        title: '精算の\n基準整備',
        desc: '透明な手数料体系と自動化された精算で、財務リスクを減らします。',
      },
      {
        icon: Database,
        title: 'データの\n統合管理',
        desc: '分散した流入経路と売上データを一つのダッシュボードに統合します。',
      },
      {
        icon: Users,
        title: '関係の\n構造化',
        desc: '単発の接続を超え、持続可能なパートナーシップ生態系を構築します。',
      },
    ],
    onboardingCards: [
      {
        step: '01',
        icon: FileSignature,
        title: '既存契約の登録',
        desc: '現在運営中の契約情報をプラットフォームに登録し、デジタル化を開始します。',
      },
      {
        step: '02',
        icon: Layers3,
        title: '精算構造の設定',
        desc: '手数料率と精算周期を設定し、自動精算の基盤を整えます。',
      },
      {
        step: '03',
        icon: PieChart,
        title: '統合運営の開始',
        desc: '単一ダッシュボードで全パートナーと売上を一元管理します。',
      },
    ],
  },

  zh: {
    locale: 'zh',
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
    brandAltName: 'RELYN',
    badge: 'Global Client Acquisition Infrastructure',
  seoHeading: '国际患者引流 医院与代理合作平台',
  seoParagraph1:
    'RELYN 是连接医院与全球代理机构的患者引流平台。',
  seoParagraph2:
    '将合同、结算与数据管理整合为统一系统。',
  seoParagraph3:
    '帮助医院拓展获客渠道，代理机构建立稳定网络。',
    heroTitleLine1: '不止于连接，',
    heroTitleLine2: '而是建立行业标准的结构',
    heroDescription:
      'RELYN 解决国际患者引流中合同、结算与数据运营分散的问题，将医院与代理机构之间的合作转化为标准化运营结构。',
    primaryCta: '联系我们',
    secondaryCta: 'Kakao 聊天咨询',

    marketOverviewLabel: 'MARKET OVERVIEW',
    marketOverviewTitleBefore: '市场已进入',
    marketOverviewTitleAccent: '扩张阶段',
    marketOverviewTitleAfter: '',
    marketKeyMessage: '市场已不只是复苏，而是进入结构性扩张阶段。',

    operationalGapLabel: 'OPERATIONAL GAP',
    operationalGapTitleBefore: '但运营结构仍然',
    operationalGapTitleAccent: '缺乏体系化',
    operationalGapTitleAfter: '',
    gapKeyMessage: '市场在增长，但体系仍然缺位。',

    networkEffectLabel: 'NETWORK EFFECT',
    networkEffectTitle: 'Network Effect',
    networkEffectBadge: '连接越多，整体结构就越强。',
    networkAgencyValue: '代理机构价值提升',
    networkHospitalGrowth: '医院导流扩大',
    networkHospitalNode: '医院/诊所',
    networkAgencyNode: '代理机构',
    networkGrowth: '增长',

    systemArchitectureLabel: 'SYSTEM ARCHITECTURE',
    systemArchitectureTitleAccent: 'RELYN',
    systemArchitectureTitleAfter: ' 构建的体系',
    systemKeyMessage: '我们将交易转化为可管理、可扩展的体系，提供更高效的运营便利性。',

    onboardingLabel: 'ONBOARDING PROCESS',
    onboardingTitle: '导入流程',
    onboardingKeyMessage: '无需大幅改变现有运营方式也能快速导入。',

    closingTitleBefore: '市场已经增长，现在是时候设计',
    closingTitleAccent: '体系',
    closingTitleAfter: '了',

    footerCompany: 'RELYN Co., Ltd. | 首席执行官 张基锡 | 企业注册号 299-03-03608',
    footerAddress: '韩国首尔特别市江南区驿三路 512，5层 603',
    footerPrivacy: '隐私政策',
    footerSeoText: '国际患者引流 医院 代理合作 平台',

    typeSelectTitle: '选择咨询类型',
    hospitalInquiryTitle: '医院入驻咨询',
    hospitalInquiryDesc: '提交有关医院入驻的咨询。',
    agencyInquiryTitle: '代理合作咨询',
    agencyInquiryDesc: '提交有关代理合作的咨询。',
    inquiryNotice: '咨询内容将通过电子邮件接收，负责人确认后会与您联系。',

    formTitleHospital: '医院入驻咨询',
    formTitleAgency: '代理合作咨询',
    formSubtitle: '仅填写必填项即可提交。',
    orgLabelHospital: '医院名称',
    orgLabelAgency: '代理机构名称',
    orgPlaceholderHospital: '请输入医院名称',
    orgPlaceholderAgency: '请输入代理机构名称',
    personLabel: '姓名',
    personPlaceholder: '请输入姓名',
    phoneLabel: '联系方式',
    phonePlaceholder: '请输入联系方式',
    emailLabel: 'E-mail',
    emailPlaceholder: '請輸入您的電子郵件地址。',
    successMessage: '已成功提交，我们确认后将与您联系。',
    errorMessage: '请检查输入内容，或稍后再试。',
    backButton: '重新选择类型',
    submitButton: '提交',
    submittingButton: '发送中...',

    marketCards: [
      { icon: TrendingUp, title: '后疫情时代', bold: '全球客户数量快速恢复' },
      { icon: BarChart3, title: '高客单价项目', bold: '收入结构扩大' },
      { icon: Globe2, title: '国家与渠道', bold: '流入路径多元化' },
      { icon: Sparkles, title: '高端诊所', bold: '竞争加剧' },
    ],
    gapCards: [
      { icon: FileSignature, title: '以单独合同为主的', bold: '运营' },
      { icon: Receipt, title: '未标准化的', bold: '佣金结构' },
      { icon: Database, title: '基于 Excel 的', bold: '结算管理' },
    ],
    systemCards: [
      {
        icon: FileSignature,
        title: '合同标准\n建立',
        desc: '通过标准化合同格式与流程，开启更可信赖的合作。',
      },
      {
        icon: Receipt,
        title: '结算标准\n建立',
        desc: '通过透明佣金体系与自动化结算，降低财务风险。',
      },
      {
        icon: Database,
        title: '数据统一\n管理',
        desc: '将分散的流量来源与营收数据整合到一个仪表盘中。',
      },
      {
        icon: Users,
        title: '合作关系\n结构化',
        desc: '超越一次性连接，建立可持续的合作生态。',
      },
    ],
    onboardingCards: [
      {
        step: '01',
        icon: FileSignature,
        title: '登记现有合同',
        desc: '将当前合作中的合同信息录入平台，开启数字化管理。',
      },
      {
        step: '02',
        icon: Layers3,
        title: '设置结算结构',
        desc: '配置佣金比例与结算周期，建立自动结算基础。',
      },
      {
        step: '03',
        icon: PieChart,
        title: '开始统一运营',
        desc: '在一个仪表盘中统一管理所有合作方与营收。',
      },
    ],
  },
};

export function getLandingContent(locale: string): LandingContent {
  if (locale === 'en' || locale === 'ja' || locale === 'zh' || locale === 'ko') {
    return landingContentMap[locale];
  }
  return landingContentMap.ko;
}