export interface HospitalStatisticsResponse {
  summary: {
    totalReservations: number;
    totalSales: number;
    settledCount: number;
    totalCommission: number;
  };

  commissionHistory: {
    agency: string;
    date: string;
    amount: number;
 patient: {
   name: string;
   age?: number | null;
   nationality?: string | null;
 };
  }[];

  agencyStats: {
    agency: string;
    reservations: number;
    amount: number;
  }[];

  monthly: {
    month: string;
    reservations: number;
    sales: number;
    commission: number;
  }[];
}

export interface AdminAgencyStatisticsResponse {
  summary: {
    base: "reservation" | "settlement";
    totalReservations: number;
    totalSales: number;
    settledCount: number;
    agencyFee: number;
    platformFee: number;
  };
  hospitalStats: {
    hospital: string;
    reservations: number;
    amount: number;
  }[];
  agencyStats: {
    agency: string;
    reservations: number;
    sales: number;
    agencyFee: number;
  }[];
  monthly: {
    month: string;
    reservations: number;
    sales: number;
    agencyFee: number;
  }[];
}

export interface AdminPlatformStatisticsResponse {
  summary: {
    newHospitalCount: number;
    newAgencyCount: number;
    platformFee: number;
  };
  hospitals: {
    name: string;
    createdAt: string;
  }[];
  agencies: {
    name: string;
    createdAt: string;
  }[];
  monthly: {
    month: string;
    hospitalCount: number;
    agencyCount: number;
    platformFee: number;
  }[];
  regionHospitalCount: Record<string, number>;
  regionSales: Record<string, number>;
}

