"use client";

import { useState } from "react";
import api from "@/lib/api";
import AgencyLedgerFilterBar from "./AgencyLedgerFilterBar";
import AgencyLedgerTable from "./AgencyLedgerTable";

export type AgencyLedgerDirection = "IN" | "OUT";
export type AgencyLedgerReason = "SETTLED" | "REVERTED";

export interface AgencyLedgerRow {
  settlementId: number;
  reservationId: number;
  settledAt: string;

  direction: AgencyLedgerDirection;
  reason: AgencyLedgerReason;

  patientName: string | null;

  // 🔥 추가 (어드민용)
  agency: {
    id: string;
    name: string;
  };

  hospital: {
    id: string;
    name: string;
  };

  amount: number;

  commission: {
    calcType: "PERCENTAGE" | "PER_RESERVATION";
    rate: number | null;
    flatAmount: number | null;
    appliedAt: string | null;
  };
}


interface AgencyLedgerResponse {
  rows: AgencyLedgerRow[];
  summary: {
    totalAmount: number;
    count: number;
  };
}

interface FilterState {
  from: string;
  to: string;
  direction: "ALL" | AgencyLedgerDirection;
  reason: "ALL" | AgencyLedgerReason;
  agencyName: string; // 🔥 추가
}

const defaultFilter: FilterState = {
  from: "",
  to: "",
  direction: "ALL",
  reason: "ALL",
  agencyName: "", // 🔥 추가
};


export default function AgencyLedgerTab() {
  const agencyOnlyColumns = [
  { key: "agency.name", label: "에이전시명" },
  { key: "hospital.name", label: "병원명" },
  { key: "amount", label: "수수료 금액", align: "right", bold: true },
  { key: "commission", label: "수수료 방식" },
];


  const [filters, setFilters] = useState<FilterState>(defaultFilter);
  const [rows, setRows] = useState<AgencyLedgerRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLedger = async () => {
    if (!filters.from || !filters.to) {
      alert("기간을 선택하세요.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get<AgencyLedgerResponse>("/admin/ledger/agency", {
params: {
  from: filters.from,
  to: filters.to,
  agencyName: filters.agencyName || undefined, // 🔥 추가
  direction:
    filters.direction !== "ALL" ? filters.direction : undefined,
  reason: filters.reason !== "ALL" ? filters.reason : undefined,
},

      });

      setRows(res.data.rows);
    } catch (e) {
      console.error(e);
      alert("에이전시 Ledger 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <AgencyLedgerFilterBar
        value={filters}
        onChange={setFilters}
        onSearch={fetchLedger}
      />

      <AgencyLedgerTable rows={rows} loading={loading} />
    </div>
  );
}
