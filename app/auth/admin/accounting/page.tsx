"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AccountingTabs from "./components/AccountingTabs";
import TaxTab from "./components/TaxTab/TaxTab";
import HospitalLedgerTab from "./ledger/hospital/HospitalLedgerTab";
import AgencyLedgerTab from "./ledger/agency/AgencyLedgerTab";

type TabKey = "hospital" | "agency" | "tax";

export default function AdminAccountingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = (searchParams.get("tab") as TabKey) || "tax";

  const title = useMemo(() => {
    switch (tab) {
      case "hospital":
        return "회계정리 - 병원용";
      case "agency":
        return "회계정리 - 에이전시용";
      case "tax":
      default:
        return "회계정리 - 세금처리";
    }
  }, [tab]);

  const setTab = (next: TabKey) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("tab", next);
    router.push(`/auth/admin/accounting?${sp.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 페이지 헤더 */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            관리자 회계정리 화면 (병원/에이전시/세금처리)
          </p>
        </div>
      </div>

      {/* 탭 + 콘텐츠 */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <AccountingTabs value={tab} onChange={setTab} />

        <div className="mt-6">
          {tab === "tax" && <TaxTab />}

          {tab === "hospital" && (<HospitalLedgerTab />
          )}

          {tab === "agency" && (<AgencyLedgerTab />
          )}
        </div>
      </div>
    </div>
  );
}
