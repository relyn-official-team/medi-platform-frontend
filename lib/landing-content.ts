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

export type LandingLocale = 'ko' | 'en' | 'ja' | 'zh' | 'th';
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

  faqSectionLabel: string;
  faqSectionTitle: string;
  faqTabHospital: string;
  faqTabAgency: string;
  faqHospital: Array<{ q: string; a: string }>;
  faqAgency: Array<{ q: string; a: string }>;
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
    '해외환자유치 과정에서 발생하는 계약, 정산, 데이터 관리 문제를 하나의 시스템으로 통합하며,',
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

    faqSectionLabel: 'FAQ',
    faqSectionTitle: '자주 묻는 질문',
    faqTabHospital: '병원',
    faqTabAgency: '에이전시',
    faqHospital: [
      {
        q: 'RELYN은 어떤 플랫폼인가요?',
        a: 'RELYN은 해외환자 유치를 원하는 한국 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약 표준화, 정산 자동화, 데이터 통합 관리까지 해외환자 유치에 필요한 운영 구조를 하나의 시스템으로 제공합니다.',
      },
      {
        q: '어떤 진료과목 병원이 입점되어 있나요?',
        a: '피부과, 성형외과, 치과를 중심으로 안과, 내과, 건강검진센터까지 다양한 진료과목으로 지속 확대하고 있습니다.',
      },
      {
        q: '해외환자 유치 경험이 없어도 입점이 가능한가요?',
        a: '네, 가능합니다. RELYN은 기존 해외환자 유치 경험이 없는 병원도 쉽게 시작할 수 있도록 표준화된 계약 양식과 운영 프로세스를 제공합니다. 별도의 준비 없이 플랫폼 내에서 바로 운영을 시작할 수 있습니다.',
      },
      {
        q: '수수료 구조는 어떻게 되나요?',
        a: '수수료는 병원이 직접 설정하며, 플랫폼 내에서 투명하게 관리됩니다. 에이전시와의 수수료 협의 및 정산이 시스템 안에서 자동으로 처리되어 별도의 수작업이 필요 없습니다.',
      },
      {
        q: '기존 에이전시와의 계약에 영향이 있나요?',
        a: '기존 계약을 그대로 유지하면서 RELYN을 도입할 수 있습니다. 기존 에이전시와의 관계를 플랫폼에 등록하여 정산을 자동화하거나, 새로운 에이전시 채널을 추가하는 방식으로 활용 가능합니다.',
      },
      {
        q: '어떤 나라 환자를 유치할 수 있나요?',
        a: '국가 제한 없이 전 세계 에이전시 네트워크를 통해 다양한 국가의 환자 유치가 가능합니다. 중동, 동남아, 동아시아, CIS 등 글로벌 에이전시와의 연결을 지원합니다.',
      },
    ],
    faqAgency: [
      {
        q: 'RELYN을 통해 어떤 병원과 연결할 수 있나요?',
        a: '피부과, 성형외과, 치과를 포함한 다양한 진료과목의 한국 병원과 연결이 가능합니다. 또한 에이전시가 원하는 병원이 아직 입점되지 않은 경우, RELYN을 통해 해당 병원의 입점을 직접 제안하고 연결할 수 있습니다.',
      },
      {
        q: '기존에 병원과 직접 계약이 되어 있는데 RELYN을 사용해야 하나요?',
        a: '기존 계약을 유지하면서 RELYN을 통해 정산 자동화와 데이터 통합 관리의 편의성을 추가로 누릴 수 있습니다. 또한 기존에 거래하지 않던 새로운 병원과의 연결 채널을 확장하는 데도 활용할 수 있습니다.',
      },
      {
        q: '수수료는 어떻게 정산되나요?',
        a: '수수료는 병원이 설정한 구조에 따라 결정되며, 플랫폼 내에서 투명하게 확인하고 자동으로 정산됩니다. 별도의 협의 없이 시스템 안에서 처리됩니다.',
      },
      {
        q: '플랫폼 이용 비용이 있나요?',
        a: '에이전시에게는 별도의 플랫폼 이용료가 없습니다. 무료로 가입하고 바로 한국 병원과의 연결을 시작할 수 있습니다.',
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

    faqSectionLabel: 'FAQ',
    faqSectionTitle: 'Frequently Asked Questions',
    faqTabHospital: 'Hospitals',
    faqTabAgency: 'Agencies',
    faqHospital: [
      {
        q: 'What is RELYN?',
        a: 'RELYN is a B2B platform connecting Korean hospitals seeking to attract international patients with global agencies. It provides a unified system covering contract standardization, automated settlements, and integrated data management for international patient acquisition.',
      },
      {
        q: 'What medical specialties are available on the platform?',
        a: 'The platform is continuously expanding across specialties including dermatology, plastic surgery, and dentistry, with ophthalmology, internal medicine, and health screening centers being added.',
      },
      {
        q: 'Can hospitals without prior experience join?',
        a: 'Yes. RELYN provides standardized contract templates and operational processes so hospitals without prior international patient experience can get started easily — no special preparation required.',
      },
      {
        q: 'How does the commission structure work?',
        a: 'Hospitals set their own commission rates, which are managed transparently within the platform. Commission agreements and settlements with agencies are processed automatically, eliminating manual work.',
      },
      {
        q: 'Will joining RELYN affect existing agency contracts?',
        a: 'Existing contracts remain fully intact. Hospitals can register current agency relationships on the platform to automate settlements, or use RELYN to add new agency channels alongside existing ones.',
      },
      {
        q: 'Which countries can patients be attracted from?',
        a: 'There are no country restrictions. Through our global agency network, hospitals can attract patients from anywhere in the world — including the Middle East, Southeast Asia, East Asia, CIS regions, and beyond.',
      },
    ],
    faqAgency: [
      {
        q: 'Which hospitals can I connect with through RELYN?',
        a: 'Agencies can connect with Korean hospitals across various specialties including dermatology, plastic surgery, and dentistry. If a desired hospital is not yet on the platform, agencies can directly propose and facilitate their onboarding through RELYN.',
      },
      {
        q: 'We already have direct contracts with hospitals. Do we need RELYN?',
        a: 'Existing contracts stay in place. RELYN adds the convenience of automated settlements and integrated data management on top of your current relationships, while also helping you expand into new hospital connections you don\'t yet have.',
      },
      {
        q: 'How are commissions settled?',
        a: 'Commissions are determined by the structure set by each hospital and processed automatically and transparently within the platform — no separate negotiations required.',
      },
      {
        q: 'Is there a fee to use the platform?',
        a: 'There is no platform fee for agencies. Sign up for free and start connecting with Korean hospitals right away.',
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

    faqSectionLabel: 'FAQ',
    faqSectionTitle: 'よくある質問',
    faqTabHospital: '病院',
    faqTabAgency: 'エージェンシー',
    faqHospital: [
      {
        q: 'RELYNとはどのようなプラットフォームですか？',
        a: 'RELYNは、海外患者の誘致を希望する韓国の病院とグローバルエージェンシーをつなぐB2Bプラットフォームです。契約の標準化、精算の自動化、データの一元管理まで、海外患者誘致に必要な運営体制をひとつのシステムで提供します。',
      },
      {
        q: 'どのような診療科の病院が登録されていますか？',
        a: '皮膚科、整形外科、歯科を中心に、眼科、内科、健康診断センターなど多様な診療科へと継続的に拡大しています。',
      },
      {
        q: '海外患者誘致の経験がなくても登録できますか？',
        a: 'はい、可能です。RELYNは経験のない病院でもすぐに始められるよう、標準化された契約書式と運営プロセスを提供しています。特別な準備なしにプラットフォーム上で運営を開始できます。',
      },
      {
        q: '手数料の仕組みはどうなっていますか？',
        a: '手数料は病院が自ら設定し、プラットフォーム内で透明に管理されます。エージェンシーとの手数料交渉や精算はシステム内で自動処理されるため、手作業は不要です。',
      },
      {
        q: '既存のエージェンシーとの契約に影響はありますか？',
        a: '既存の契約を維持したままRELYNを導入できます。既存のエージェンシーとの関係をプラットフォームに登録して精算を自動化したり、新しいエージェンシーチャンネルを追加したりすることが可能です。',
      },
      {
        q: 'どの国の患者を誘致できますか？',
        a: '国の制限はなく、グローバルなエージェンシーネットワークを通じて世界中の患者を誘致できます。中東、東南アジア、東アジア、CIS地域など、幅広いグローバルエージェンシーとの連携をサポートします。',
      },
    ],
    faqAgency: [
      {
        q: 'RELYNではどのような病院と連携できますか？',
        a: '皮膚科、整形外科、歯科をはじめ、多様な診療科の韓国病院と連携が可能です。希望する病院がまだ登録されていない場合は、RELYNを通じてその病院の登録を直接提案・調整することもできます。',
      },
      {
        q: 'すでに病院と直接契約があるのですが、RELYNを使う必要がありますか？',
        a: '既存の契約はそのまま維持しながら、RELYNで精算の自動化やデータ一元管理の利便性を追加で享受できます。また、これまで取引のなかった新たな病院との連携チャンネルを広げることも可能です。',
      },
      {
        q: '手数料の精算はどのように行われますか？',
        a: '手数料は各病院が設定した構造に基づいて決まり、プラットフォーム内で透明に確認・自動精算されます。別途の交渉なしにシステム内で処理されます。',
      },
      {
        q: 'プラットフォームの利用料はかかりますか？',
        a: 'エージェンシーには別途の利用料はかかりません。無料で登録し、すぐに韓国の病院との連携を始めることができます。',
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

    faqSectionLabel: 'FAQ',
    faqSectionTitle: '常见问题',
    faqTabHospital: '医院',
    faqTabAgency: '代理机构',
    faqHospital: [
      {
        q: 'RELYN是什么平台？',
        a: 'RELYN是一个连接希望吸引海外患者的韩国医院与全球代理机构的B2B平台。它将合同标准化、结算自动化和数据统一管理整合为一个系统，为海外患者引流提供完整的运营架构。',
      },
      {
        q: '平台上有哪些科室的医院？',
        a: '目前以皮肤科、整形外科、口腔科为核心，同时持续扩展至眼科、内科及健康体检中心等多个科室。',
      },
      {
        q: '没有海外患者引流经验也可以入驻吗？',
        a: '当然可以。RELYN为没有海外患者引流经验的医院提供标准化合同模板和运营流程，无需特别准备，即可在平台上直接开始运营。',
      },
      {
        q: '佣金结构是怎样的？',
        a: '佣金由医院自行设定，并在平台内透明管理。与代理机构的佣金协商和结算均在系统内自动完成，无需手动处理。',
      },
      {
        q: '加入RELYN会影响与现有代理机构的合同吗？',
        a: '现有合同完全保持不变。您可以将现有代理关系注册到平台以实现结算自动化，或通过RELYN新增代理渠道，与现有合作并行运营。',
      },
      {
        q: '可以吸引哪些国家的患者？',
        a: '没有国家限制。通过全球代理网络，可以吸引来自世界各地的患者，涵盖中东、东南亚、东亚、独联体等地区的全球代理合作。',
      },
    ],
    faqAgency: [
      {
        q: '通过RELYN可以与哪些医院合作？',
        a: '可以与皮肤科、整形外科、口腔科等多个科室的韩国医院建立合作。如果希望合作的医院尚未入驻，代理机构也可以通过RELYN直接提议并协助该医院入驻。',
      },
      {
        q: '我们已经与医院有直接合同，还需要使用RELYN吗？',
        a: '现有合同保持不变，同时还可通过RELYN享受结算自动化和数据统一管理的便利。此外，还可借助平台拓展与尚未合作的新医院之间的连接渠道。',
      },
      {
        q: '佣金如何结算？',
        a: '佣金根据各医院设定的结构确定，并在平台内透明查看、自动结算，无需另行协商，系统内自动处理。',
      },
      {
        q: '使用平台需要付费吗？',
        a: '代理机构无需支付任何平台使用费。免费注册后即可立即开始与韩国医院建立合作。',
      },
    ],
  },

  th: {
    locale: 'th',
    htmlLang: 'th',
    ogLocale: 'th_TH',
    brandAltName: 'เรลิน',
    badge: 'Global Client Acquisition Infrastructure',

    seoHeading: 'RELYN | แพลตฟอร์มเชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่ต่างประเทศ',
    seoParagraph1: 'RELYN เป็นแพลตฟอร์ม B2B ที่เชื่อมโยงโรงพยาบาลเกาหลีที่ต้องการดึงดูดผู้ป่วยต่างชาติกับเอเจนซี่ทั่วโลก',
    seoParagraph2: 'มาตรฐานสัญญา การชำระเงินอัตโนมัติ และการจัดการข้อมูลแบบรวมศูนย์',
    seoParagraph3: 'โรงพยาบาลขยายช่องทางการรับผู้ป่วยต่างชาติ เอเจนซี่สร้างเครือข่ายที่มั่นคง',

    heroTitleLine1: 'แพลตฟอร์มเชื่อมโยง',
    heroTitleLine2: 'โรงพยาบาล·เอเจนซี่',
    heroDescription: 'RELYN เป็นแพลตฟอร์ม B2B ที่เชื่อมโยงโรงพยาบาลเกาหลีกับเอเจนซี่ทั่วโลก ผสานการจัดการสัญญา การชำระเงิน และข้อมูลในระบบเดียว',
    primaryCta: 'ติดต่อสอบถาม',
    secondaryCta: 'แชทคาคาโอ',

    marketOverviewLabel: 'MARKET OVERVIEW',
    marketOverviewTitleBefore: 'ตลาดเข้าสู่',
    marketOverviewTitleAccent: 'ขั้นการขยายตัว',
    marketOverviewTitleAfter: 'แล้ว',
    marketKeyMessage: 'ตลาดก้าวข้ามการฟื้นตัวสู่ขั้นการขยายตัวเชิงโครงสร้าง',

    operationalGapLabel: 'OPERATIONAL GAP',
    operationalGapTitleBefore: 'แต่โครงสร้างการดำเนินงาน',
    operationalGapTitleAccent: 'ยังไม่เป็นระบบ',
    operationalGapTitleAfter: '',
    gapKeyMessage: 'ตลาดเติบโตแล้ว แต่ยังขาดระบบที่ชัดเจน',

    networkEffectLabel: 'NETWORK EFFECT',
    networkEffectTitle: 'Network Effect',
    networkEffectBadge: 'มูลค่าเอเจนซี่เพิ่มขึ้น',
    networkAgencyValue: 'High Quality Options',
    networkHospitalGrowth: 'More Clients',
    networkHospitalNode: 'โรงพยาบาล',
    networkAgencyNode: 'เอเจนซี่',
    networkGrowth: 'ยิ่งเชื่อมต่อมากขึ้น โครงสร้างยิ่งแข็งแกร่ง',

    systemArchitectureLabel: 'SYSTEM ARCHITECTURE',
    systemArchitectureTitleAccent: 'โครงสร้าง',
    systemArchitectureTitleAfter: 'ที่ RELYN สร้างขึ้น',
    systemKeyMessage: 'แปลงธุรกรรมให้เป็นโครงสร้างที่จัดการได้ เพื่อความสะดวกสูงสุด',

    onboardingLabel: 'ONBOARDING PROCESS',
    onboardingTitle: 'กระบวนการเริ่มต้น',
    onboardingKeyMessage: 'สามารถเริ่มใช้งานได้โดยไม่ต้องเปลี่ยนวิธีดำเนินงานเดิม',

    closingTitleBefore: 'ตลาดเติบโตแล้ว',
    closingTitleAccent: 'ถึงเวลาออกแบบระบบ',
    closingTitleAfter: '',

    footerCompany: 'บริษัท เรลิน จำกัด | ผู้อำนวยการ จาง กีซอก | เลขทะเบียนธุรกิจ 299-03-03608',
    footerAddress: 'ชั้น 5 ห้อง 603 อาคารอินเทคบิลดิง เลขที่ 512 ยอกซัมโร กังนัม โซล เกาหลีใต้',
    footerPrivacy: 'นโยบายความเป็นส่วนตัว',
    footerSeoText: 'แพลตฟอร์มดึงดูดผู้ป่วยต่างชาติ · การรับผู้ป่วยชาวต่างชาติ · เชื่อมโยงโรงพยาบาลกับเอเจนซี่',

    typeSelectTitle: 'ต้องการสอบถามเรื่องใด?',
    hospitalInquiryTitle: 'สอบถามสำหรับโรงพยาบาล',
    hospitalInquiryDesc: 'สำหรับโรงพยาบาลที่ต้องการดึงดูดผู้ป่วยต่างชาติ',
    agencyInquiryTitle: 'สอบถามสำหรับเอเจนซี่',
    agencyInquiryDesc: 'สำหรับเอเจนซี่ที่ต้องการเชื่อมต่อกับโรงพยาบาลเกาหลี',
    inquiryNotice: 'เจ้าหน้าที่จะติดต่อกลับภายใน 1-2 วันทำการ',

    formTitleHospital: 'แบบฟอร์มสอบถามสำหรับโรงพยาบาล',
    formTitleAgency: 'แบบฟอร์มสอบถามสำหรับเอเจนซี่',
    formSubtitle: 'กรุณากรอกข้อมูลด้านล่าง',
    orgLabelHospital: 'ชื่อโรงพยาบาล',
    orgLabelAgency: 'ชื่อเอเจนซี่',
    orgPlaceholderHospital: 'กรุณากรอกชื่อโรงพยาบาล',
    orgPlaceholderAgency: 'กรุณากรอกชื่อเอเจนซี่',
    personLabel: 'ชื่อผู้ติดต่อ',
    personPlaceholder: 'กรุณากรอกชื่อผู้ติดต่อ',
    phoneLabel: 'หมายเลขโทรศัพท์',
    phonePlaceholder: 'กรุณากรอกหมายเลขโทรศัพท์',
    emailLabel: 'อีเมล',
    emailPlaceholder: 'กรุณากรอกอีเมล',
    successMessage: 'ส่งข้อมูลเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับโดยเร็ว',
    errorMessage: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
    backButton: 'ย้อนกลับ',
    submitButton: 'ส่งข้อมูล',
    submittingButton: 'กำลังส่ง...',

    marketCards: [
      { icon: TrendingUp, title: 'หลังโควิด', bold: 'จำนวนผู้ป่วยต่างชาติฟื้นตัวอย่างรวดเร็ว' },
      { icon: BarChart3, title: 'ขั้นตอนราคาสูง', bold: 'โครงสร้างรายได้ขยายตัว' },
      { icon: Globe2, title: 'ประเทศและช่องทาง', bold: 'แหล่งที่มาหลากหลายขึ้น' },
      { icon: Sparkles, title: 'คลินิกพรีเมียม', bold: 'การแข่งขันรุนแรงขึ้น' },
    ],
    gapCards: [
      { icon: FileSignature, title: 'การดำเนินงาน', bold: 'ศูนย์กลางสัญญาเฉพาะบุคคล' },
      { icon: Receipt, title: 'โครงสร้างค่าคอมมิชชัน', bold: 'ไม่เป็นมาตรฐาน' },
      { icon: Database, title: 'การจัดการชำระเงิน', bold: 'ใช้ Excel เป็นหลัก' },
    ],
    systemCards: [
      {
        icon: FileSignature,
        title: 'มาตรฐานสัญญา',
        desc: 'เริ่มต้นความร่วมมือที่น่าเชื่อถือด้วยแบบฟอร์มสัญญาและกระบวนการที่มาตรฐาน',
      },
      {
        icon: Receipt,
        title: 'มาตรฐานการชำระเงิน',
        desc: 'ขจัดความเสี่ยงทางการเงินด้วยระบบค่าคอมมิชชันที่โปร่งใสและการชำระเงินอัตโนมัติ',
      },
      {
        icon: Database,
        title: 'การจัดการข้อมูลรวมศูนย์',
        desc: 'รวมช่องทางและข้อมูลรายได้ที่กระจัดกระจายในแดชบอร์ดเดียว',
      },
      {
        icon: Users,
        title: 'การสร้างความสัมพันธ์',
        desc: 'สร้างระบบนิเวศพันธมิตรที่ยั่งยืนเกินกว่าการเชื่อมต่อครั้งเดียว',
      },
    ],
    onboardingCards: [
      {
        step: '01',
        icon: FileSignature,
        title: 'ลงทะเบียนสัญญาเดิม',
        desc: 'ลงทะเบียนข้อมูลสัญญาที่ดำเนินการอยู่บนแพลตฟอร์มเพื่อเริ่มดิจิทัลไลเซชัน',
      },
      {
        step: '02',
        icon: Layers3,
        title: 'ตั้งค่าโครงสร้างการชำระเงิน',
        desc: 'ตั้งค่าอัตราค่าคอมมิชชันและรอบการชำระเงินที่ซับซ้อนในระบบเพื่อสร้างฐานการชำระเงินอัตโนมัติ',
      },
      {
        step: '03',
        icon: PieChart,
        title: 'เริ่มการดำเนินงานรวมศูนย์',
        desc: 'จัดการพันธมิตรและรายได้ทั้งหมดในแดชบอร์ดเดียว',
      },
    ],

    faqSectionLabel: 'FAQ',
    faqSectionTitle: 'คำถามที่พบบ่อย',
    faqTabHospital: 'โรงพยาบาล',
    faqTabAgency: 'เอเจนซี่',
    faqHospital: [
      {
        q: 'RELYN คืออะไร?',
        a: 'RELYN เป็นแพลตฟอร์ม B2B ที่เชื่อมโยงโรงพยาบาลเกาหลีที่ต้องการดึงดูดผู้ป่วยต่างชาติกับเอเจนซี่ทั่วโลก ให้บริการครบวงจรตั้งแต่มาตรฐานสัญญา การชำระเงินอัตโนมัติ ไปจนถึงการจัดการข้อมูลแบบรวมศูนย์ในระบบเดียว',
      },
      {
        q: 'มีโรงพยาบาลสาขาใดบ้างในแพลตฟอร์ม?',
        a: 'มีโรงพยาบาลด้านผิวหนัง ศัลยกรรมความงาม และทันตกรรมเป็นหลัก และกำลังขยายไปยังจักษุวิทยา อายุรกรรม และศูนย์ตรวจสุขภาพอย่างต่อเนื่อง',
      },
      {
        q: 'โรงพยาบาลที่ไม่มีประสบการณ์รับผู้ป่วยต่างชาติสามารถเข้าร่วมได้หรือไม่?',
        a: 'ได้เลย RELYN มีแบบฟอร์มสัญญาและกระบวนการดำเนินงานที่มาตรฐาน ทำให้โรงพยาบาลที่ไม่มีประสบการณ์เริ่มต้นได้ง่าย ไม่ต้องเตรียมตัวเพิ่มเติม สามารถเริ่มดำเนินการบนแพลตฟอร์มได้ทันที',
      },
      {
        q: 'โครงสร้างค่าคอมมิชชันเป็นอย่างไร?',
        a: 'ค่าคอมมิชชันกำหนดโดยโรงพยาบาลและจัดการอย่างโปร่งใสในแพลตฟอร์ม การเจรจาค่าคอมมิชชันและการชำระเงินกับเอเจนซี่ดำเนินการโดยอัตโนมัติในระบบ ไม่ต้องทำงานด้วยมือ',
      },
      {
        q: 'การเข้าร่วม RELYN จะส่งผลต่อสัญญาเอเจนซี่เดิมหรือไม่?',
        a: 'สามารถนำ RELYN มาใช้โดยคงสัญญาเดิมไว้ได้ สามารถลงทะเบียนความสัมพันธ์กับเอเจนซี่เดิมในแพลตฟอร์มเพื่อทำให้การชำระเงินเป็นอัตโนมัติ หรือเพิ่มช่องทางเอเจนซี่ใหม่ได้',
      },
      {
        q: 'สามารถดึงดูดผู้ป่วยจากประเทศใดได้บ้าง?',
        a: 'ไม่จำกัดประเทศ สามารถดึงดูดผู้ป่วยจากทั่วโลกผ่านเครือข่ายเอเจนซี่ระดับโลก ครอบคลุมตะวันออกกลาง เอเชียตะวันออกเฉียงใต้ เอเชียตะวันออก และกลุ่มประเทศ CIS',
      },
    ],
    faqAgency: [
      {
        q: 'สามารถเชื่อมต่อกับโรงพยาบาลใดผ่าน RELYN ได้บ้าง?',
        a: 'สามารถเชื่อมต่อกับโรงพยาบาลเกาหลีในหลายสาขา รวมถึงผิวหนัง ศัลยกรรมความงาม และทันตกรรม หากโรงพยาบาลที่ต้องการยังไม่ได้เข้าร่วม เอเจนซี่สามารถเสนอให้โรงพยาบาลนั้นเข้าร่วมแพลตฟอร์มได้โดยตรงผ่าน RELYN',
      },
      {
        q: 'เรามีสัญญาโดยตรงกับโรงพยาบาลอยู่แล้ว ยังต้องใช้ RELYN หรือไม่?',
        a: 'คงสัญญาเดิมไว้ได้ พร้อมรับความสะดวกจากการชำระเงินอัตโนมัติและการจัดการข้อมูลรวมศูนย์ผ่าน RELYN นอกจากนี้ยังสามารถขยายช่องทางเชื่อมต่อกับโรงพยาบาลใหม่ที่ยังไม่เคยทำงานด้วยได้',
      },
      {
        q: 'ค่าคอมมิชชันชำระอย่างไร?',
        a: 'ค่าคอมมิชชันกำหนดตามโครงสร้างที่แต่ละโรงพยาบาลตั้งไว้ และดำเนินการชำระเงินโดยอัตโนมัติอย่างโปร่งใสในแพลตฟอร์ม ไม่ต้องเจรจาเพิ่มเติม ระบบจัดการให้ทั้งหมด',
      },
      {
        q: 'มีค่าใช้จ่ายในการใช้แพลตฟอร์มหรือไม่?',
        a: 'ไม่มีค่าใช้จ่ายสำหรับเอเจนซี่ สมัครฟรีและเริ่มเชื่อมต่อกับโรงพยาบาลเกาหลีได้ทันที',
      },
    ],
  },
};

export function getLandingContent(locale: string): LandingContent {
  if (locale === 'en' || locale === 'ja' || locale === 'zh' || locale === 'ko' || locale === 'th') {
    return landingContentMap[locale];
  }
  return landingContentMap.ko;
}