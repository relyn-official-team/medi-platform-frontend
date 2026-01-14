export interface AgencyHospitalListItem {
  id: string;
  name: string;

  location: {
    city: string;
    district: string;
  } | null;

  consultLanguages: string[];

  coverImageUrl: string | null;

  priceMin: number | null;
  priceMax: number | null;
  priceMinDisplay: number | null;
  priceMaxDisplay: number | null;

  topProcedures: string[];

  agencyCommissionRate: number;
  settlementCalcType: "PERCENTAGE" | "PER_RESERVATION";
  settlementFlatAmount: number;

  // ⭐ 병원 별점 요약
  ratingAvg?: number;     // 예: 4.9
  ratingCount?: number;   // 예: 3496

 businessHours?: {
   [key: string]: {
     enabled: boolean;
     open: string;   // "09:00"
     close: string;  // "18:00"
   };
 };
}

// =========================
// 병원 상세 전용 타입
// =========================

export interface HospitalImage {
  url: string;
  type: string | null;
  isCover: boolean;
  sortOrder: number;
}

export interface HospitalPricingItem {
  id: string;
  procedureName: string;
  originalPrice: number | null;
  discountPrice: number | null;
  currency: string | null;
  note: string | null;
}

export interface HospitalSpecialtyItem {
  specialty: {
    id: string;
    name: string;
  };
}

export interface SignatureCare {
   title: string;
   description: string;
   images: string[];
 }



export interface AgencyHospitalDetail {
  id: string;
  name: string;

  country?: string | null;
  address?: string | null;
  phone?: string | null;
  hotlinePhone?: string | null;

  consultLanguages: string[];
 businessHours?: {
   [key: string]: {
     enabled: boolean;
     open: string;
     close: string;
   };
 };

  introduction?: string | null;
  afterCare?: string | null;
  signatureCares?: SignatureCare[];

  hasSpecialist?: boolean;
  canSelectDirector?: boolean;

  // 수수료
  agencyCommissionRate: number;
  settlementCalcType: "PERCENTAGE" | "PER_RESERVATION";
  settlementFlatAmount: number;
  platformCommissionRate?: number;
  platformFlatAmount?: number;

  location?: {
    city: string;
    district: string;
  } | null;

  images: HospitalImage[];
  pricingItems: HospitalPricingItem[];
  specialties: HospitalSpecialtyItem[];

  // ⭐ 병원 별점 요약
  ratingAvg?: number;
  ratingCount?: number;
}

