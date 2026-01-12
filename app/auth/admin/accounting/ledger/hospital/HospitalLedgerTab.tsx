"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import HospitalLedgerFilterBar from "./HospitalLedgerFilterBar";
import HospitalLedgerTable from "./HospitalLedgerTable";

interface HospitalLedgerResponse {
  rows: HospitalLedgerRow[];
  summary?: {
    totalAmount: number;
    count: number;
  };
}

export type HospitalLedgerDirection = "IN" | "OUT";
export type HospitalLedgerReason = "SETTLED" | "REVERTED"| "CHARGE";

export interface HospitalLedgerRow {
  settlementId: number;
  settledAt: string;

  direction: HospitalLedgerDirection;
  reason: HospitalLedgerReason;

  patientName: string | null;

  hospital: {
    id: string;
    name: string;
  };

  agency: {
    id: string;
    name: string;
  } | null;

  fee: {
    agencyFee: number;
    platformFee: number;
    totalFee: number;
  };

  commission: {
    calcType: "PERCENTAGE" | "PER_RESERVATION";
    rate: number | null;
    flatAmount: number | null;
    appliedAt: string | null;
  };
}


interface FilterState {
  from: string;
  to: string;
  hospitalName: string;
  direction: "ALL" | HospitalLedgerDirection;
  reason: "ALL" | HospitalLedgerReason;
}

const defaultFilter: FilterState = {
  from: "",
  to: "",
  hospitalName: "",
  direction: "ALL",
  reason: "ALL",
};

export default function HospitalLedgerTab() {
  const [filters, setFilters] = useState<FilterState>(defaultFilter);
  const [rows, setRows] = useState<HospitalLedgerRow[]>([]);
  const [loading, setLoading] = useState(false);




  const fetchLedger = async () => {
    if (!filters.from || !filters.to) {
      alert("기간을 선택하세요.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get<HospitalLedgerResponse>("/admin/ledger/hospital", {
        params: {
          from: filters.from,
          to: filters.to,
     hospitalName:
       filters.hospitalName.trim() !== ""
         ? filters.hospitalName
         : undefined,
          direction:
            filters.direction !== "ALL" ? filters.direction : undefined,
          reason: filters.reason !== "ALL" ? filters.reason : undefined,
        },
      });

      setRows(res.data.rows);
    } catch (e) {
      console.error(e);
      alert("병원 Ledger 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 최초 진입 시 조회 안 함 (기간 필수)
  }, []);

  return (
    <div className="space-y-4">
      <HospitalLedgerFilterBar
        value={filters}
        onChange={setFilters}
        onSearch={fetchLedger}
      />

      <HospitalLedgerTable rows={rows} loading={loading} />
    </div>
  );
}
