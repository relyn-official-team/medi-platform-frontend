import type { LucideIcon } from "lucide-react";
import {
  BadgeHelp,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Eye,
  Languages,
  MessageCircleMore,
  ScanFace,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

export const LINE_URL = "https://lin.ee/VlIklsv";

export const WHATSAPP_MESSAGE = `안녕하세요.
태국 임직원 전용 페이지를 보고 문의드립니다.
한국 미용시술 상담을 받고 싶습니다.

관심 시술:
방문 예정일:
고민 부위:
예산 범위:`;

export const WHATSAPP_URL = `https://wa.me/message/B6Y5CZ5WGIHXP1?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const pageCopy = {
  lang: "ko-KR",
  eventPrefix: "KR",
  headerAria: "RELYN 페이지 상단으로 이동",
  headerNote: "K-BEAUTY CONSULTATION · THAILAND",
  heroAlt: "서울에서 한국 미용 상담을 계획하는 태국 직장인",
  heroKicker: "EXCLUSIVE CONSULTATION FOR EMPLOYEES IN THAILAND",
  heroTitle: "태국 임직원을 위한",
  heroTitleAccent: "한국 미용시술 무료상담",
  heroLead: "병원 선택, 시술 정보, 일정 조율까지 RELYN이 한국 현지에서 상담을 도와드립니다.",
  heroNote: "특정 병원 광고가 아닌, 고객님의 고민과 일정에 맞춘 상담을 먼저 진행합니다.",
  heroLocation: "SEOUL · KOREA",
  painKicker: "BEFORE YOU BOOK",
  painTitle: "한국 병원에 직접 예약하기, 생각보다 어렵지 않으셨나요?",
  solutionKicker: "YOUR LOCAL CONSULTATION PARTNER",
  solutionTitle: "RELYN은 한국 미용시술 상담을 더 쉽게 만들어드립니다.",
  solutionBody:
    "고객님의 고민 부위, 희망 시술, 방문 일정, 예산을 먼저 확인한 뒤 한국 현지 기준으로 상담과 예약 과정을 도와드립니다.",
  solutionQuote:
    "병원에 바로 연락하기 부담스러운 분들도 먼저 RELYN을 통해 편하게 상담을 시작할 수 있습니다.",
  supportLabel: "RELYN SUPPORT",
  concernsKicker: "BEAUTY CONCERNS IN YOUR 20s–30s",
  concernsTitle: "20~30대가 많이 상담하는 대표 미용 고민",
  concernsBody: "시술명보다 고민의 원인을 먼저 살펴보면 첫 상담을 더 구체적으로 시작할 수 있습니다.",
  consultLabel: "RELYN 상담 안내",
  treatmentsAria: "상담 가능한 시술 방향",
  trustKicker: "WHY WE START WITH A CONVERSATION",
  trustTitle: "왜 병원명을 먼저 공개하지 않나요?",
  trustBodyOne:
    "한국 미용시술은 같은 시술명이라도 고객님의 피부 상태, 고민 부위, 방문 일정, 예산에 따라 선택지가 달라질 수 있습니다.",
  trustBodyTwo:
    "RELYN은 특정 병원을 먼저 노출하기보다 상담 내용을 확인한 뒤 고객님에게 맞는 방향을 안내하는 방식을 지향합니다.",
  trustNotice: "최종 시술 가능 여부와 세부 상담은 의료진 상담 후 결정됩니다.",
  processKicker: "HOW IT WORKS",
  processTitle: "상담은 이렇게 진행됩니다.",
  employeeBadgeCode: "TH",
  employeeBadgeText: "EMPLOYEE\nPRIVATE\nCONSULTATION",
  employeeKicker: "FOR PARTNER COMPANY EMPLOYEES",
  employeeTitle: "태국 기업 임직원을 위한 전용 상담 페이지",
  employeeBody:
    "본 페이지는 제휴 기업 임직원을 위해 제공되는 한국 미용시술 상담 페이지입니다. 한국 방문 예정이 있거나 한국 미용시술에 관심이 있다면 RELYN을 통해 먼저 편하게 상담받아보세요.",
  employeeNotice: "실제 시술 비용, 가능 여부, 상세 조건은 상담 및 병원 확인 후 안내됩니다.",
  faqKicker: "FREQUENTLY ASKED QUESTIONS",
  faqTitle: "자주 묻는 질문",
  faqBody: "RELYN 상담을 시작하기 전에 많이 궁금해하시는 내용을 안내합니다.",
  finalKicker: "START WITH RELYN",
  finalTitle: "한국 미용시술,",
  finalTitleAccent: "먼저 RELYN에게 무료로 상담해보세요.",
  finalBody:
    "병원 선택이 어렵거나 직접 예약이 부담스럽다면 LINE 또는 WhatsApp으로 편하게 문의해주세요.",
  finalLine: "LINE 무료상담하기",
  finalWhatsapp: "WhatsApp 무료상담하기",
  finalNote: "상담 후 예약 진행 여부는 자유롭게 결정하실 수 있습니다.",
  footerTagline: "한국 미용시술 상담 및 예약 조율 파트너",
  footerDisclaimer:
    "본 페이지는 한국 미용시술 상담 및 예약 조율을 위한 안내 페이지입니다. 최종 시술 가능 여부, 비용, 세부 시술 내용은 의료진 상담 및 병원 확인 후 결정됩니다.",
  floatingAria: "상담 채널",
  floatingLabel: "편한 메신저로 문의하세요.",
  floatingLine: "LINE 무료상담",
  floatingWhatsapp: "WhatsApp",
} as const;

export type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const painPoints: IconCard[] = [
  {
    title: "어떤 병원이 맞는지 판단하기 어려움",
    description: "광고는 많지만 내 고민에 맞는 병원을 고르기 어렵습니다.",
    icon: BadgeHelp,
  },
  {
    title: "언어와 상담 방식의 불편함",
    description: "한국어 상담, 예약 방식, 시술 설명이 익숙하지 않을 수 있습니다.",
    icon: Languages,
  },
  {
    title: "가격과 시술 범위 확인의 어려움",
    description: "같은 시술명이라도 병원마다 구성과 기준이 다를 수 있습니다.",
    icon: CircleDollarSign,
  },
  {
    title: "짧은 여행 일정 속 예약 부담",
    description: "한국 방문 일정 안에서 상담, 시술, 회복 일정을 맞추기 어렵습니다.",
    icon: Clock3,
  },
];

export const supportItems = [
  "희망 시술 상담",
  "고민 부위 확인",
  "예상 일정 확인",
  "예산 범위 확인",
  "외국인 상담 가능 여부 확인",
  "예약 가능 일정 조율",
  "방문 전 안내사항 전달",
];

export type Concern = {
  id: "skin" | "line" | "eye";
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  consult: string;
  treatments: string[];
  notice: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

export const concerns: Concern[] = [
  {
    id: "skin",
    eyebrow: "SKIN TEXTURE",
    title: "화장으로도 가려지지 않는 피부결과 모공 고민",
    summary:
      "피부가 거칠어 보이거나 메이크업 후에도 모공과 요철이 도드라져 보이면 사진이나 영상에서 피부 컨디션이 더 신경 쓰일 수 있습니다.",
    detail:
      "20~30대는 심한 여드름이 아니더라도 모공, 붉은기, 여드름 흔적, 피부결 개선 상담을 많이 찾습니다.",
    consult:
      "피부 상태와 방문 일정을 확인한 뒤 피부결, 모공, 여드름 흔적, 붉은기 관리 방향을 상담해드립니다.",
    treatments: [
      "스킨부스터",
      "리쥬란",
      "쥬베룩",
      "물광주사",
      "모공 레이저 상담",
      "피부 진정 관리",
    ],
    notice:
      "개인 피부 상태에 따라 적합한 시술은 달라질 수 있으며, 최종 시술 가능 여부는 의료진 상담 후 결정됩니다.",
    image: "/customerinquiry/b2b/concern-skin.png",
    imageAlt: "피부결과 수분감을 표현한 스킨케어 이미지",
    icon: Sparkles,
  },
  {
    id: "line",
    eyebrow: "FACE CONTOUR",
    title: "사진 속 얼굴 라인이 무겁게 보일 때",
    summary:
      "평소보다 얼굴이 부어 보이거나 턱선과 볼 라인이 또렷하지 않아 보이는 고민이 있을 수 있습니다.",
    detail:
      "20~30대 고객은 큰 수술보다 자연스럽게 얼굴 라인을 정리하거나 탄력을 관리하는 시술 상담을 선호하는 경우가 많습니다.",
    consult:
      "얼굴 라인 고민이 붓기, 지방, 근육, 탄력 저하 중 어떤 원인에 가까운지 확인한 뒤 상담 방향을 안내드립니다.",
    treatments: ["인모드", "슈링크", "울쎄라", "턱 보톡스", "윤곽주사", "리프팅 관리 상담"],
    notice:
      "얼굴 라인 고민은 원인에 따라 추천 방향이 달라질 수 있습니다. 정확한 시술 가능 여부는 상담 후 안내됩니다.",
    image: "/customerinquiry/b2b/concern-line.png",
    imageAlt: "얼굴 라인을 표현한 뷰티 이미지",
    icon: ScanFace,
  },
  {
    id: "eye",
    eyebrow: "EYE AREA",
    title: "충분히 쉬어도 피곤해 보이는 눈밑 고민",
    summary:
      "눈밑이 꺼져 보이거나 어두워 보이면 실제보다 피곤하고 나이 들어 보이는 인상을 줄 수 있습니다.",
    detail:
      "눈밑은 피부가 얇고 예민한 부위이기 때문에 무리한 시술보다 원인을 먼저 확인하는 것이 중요합니다.",
    consult:
      "눈밑 고민이 꺼짐, 색소, 혈관, 피부 얇음, 지방 구조 중 어떤 원인에 가까운지 상담을 통해 방향을 정리해드립니다.",
    treatments: [
      "눈밑 리쥬란",
      "눈밑 스킨부스터",
      "다크서클 상담",
      "눈밑 필러 상담",
      "색소·피부톤 관리",
      "눈밑지방재배치 상담",
    ],
    notice: "눈밑 부위는 예민한 부위이므로 정확한 시술 가능 여부는 의료진 상담 후 결정됩니다.",
    image: "/customerinquiry/b2b/concern-eye.png",
    imageAlt: "눈밑 피부 고민을 표현한 스킨케어 이미지",
    icon: Eye,
  },
];

export const trustPoints: IconCard[] = [
  {
    title: "상담 내용 기반 안내",
    description: "희망 시술과 고민 부위를 먼저 확인합니다.",
    icon: MessageCircleMore,
  },
  {
    title: "일정과 예산을 함께 고려",
    description: "한국 방문 일정에 맞는 상담 방향을 제안합니다.",
    icon: CalendarDays,
  },
  {
    title: "최종 선택은 고객이 결정",
    description: "상담 후 안내받은 내용을 기준으로 고객님이 직접 결정할 수 있습니다.",
    icon: UserRoundCheck,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "LINE 또는 WhatsApp 상담 시작",
    description: "이름, 방문 예정일, 고민 부위, 희망 시술을 알려주세요.",
  },
  {
    step: "02",
    title: "상담 내용 확인",
    description: "피부 고민, 예산, 일정, 선호 시술을 확인합니다.",
  },
  {
    step: "03",
    title: "한국 현지 기준 안내",
    description: "상담 내용을 기준으로 가능한 시술 방향과 예약 가능성을 안내합니다.",
  },
  {
    step: "04",
    title: "예약 조율 및 방문 안내",
    description: "예약 확정 후 방문 전 안내사항을 전달드립니다.",
  },
];

export const employeeBenefits = [
  "무료 1:1 상담",
  "한국 현지 기준 안내",
  "방문 일정 기반 예약 조율",
  "외국인 고객 상담 지원",
  "병원 직접 문의 전 사전 상담 가능",
];

export const faqs = [
  {
    question: "상담은 무료인가요?",
    answer: "네. LINE 또는 WhatsApp을 통한 1차 상담은 무료로 진행됩니다.",
  },
  {
    question: "병원명을 먼저 알 수 없나요?",
    answer:
      "상담 전에는 병원명을 페이지에 노출하지 않습니다. 희망 시술, 일정, 예산, 고민 부위를 확인한 뒤 적합한 상담 방향을 안내드립니다.",
  },
  {
    question: "어떤 정보를 보내면 되나요?",
    answer: "이름, 방문 예정일, 고민 부위, 희망 시술, 예산 범위를 보내주시면 상담이 더 빠르게 진행됩니다.",
  },
  {
    question: "한국어를 못해도 괜찮나요?",
    answer: "네. 외국인 고객 상담을 고려하여 안내드립니다.",
  },
  {
    question: "LINE과 WhatsApp 상담 내용이 다른가요?",
    answer: "상담 내용은 동일합니다. 고객님이 더 편하게 사용하는 메신저를 선택해 문의하시면 됩니다.",
  },
  {
    question: "상담 후 꼭 예약해야 하나요?",
    answer: "아닙니다. 상담 후 예약 진행 여부는 자유롭게 결정하실 수 있습니다.",
  },
  {
    question: "회사에 상담 내용이 공유되나요?",
    answer:
      "개인 상담 내용은 개별 상담 기준으로 진행됩니다. 회사 제공 페이지를 통해 들어오더라도 상담 내용은 개인 문의로 취급됩니다.",
  },
];

export const privacyIcon = ShieldCheck;
