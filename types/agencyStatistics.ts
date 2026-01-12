export interface AgencyStatisticsResponse {
  summary: {
    totalReservations: number;
    settledCount: number;
    totalSales: number;
    agencyRevenue: number;
  };
  hospitalStats: {
    hospital: string;
    reservations: number;
    sales: number;
    revenue: number;
  }[];
  monthly: {
    month: string;
    reservations: number;
    sales: number;
    revenue: number;
  }[];
}
