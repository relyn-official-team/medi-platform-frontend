//frontend/app/auth/hospital/business/page.tsx

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BusinessInfoSection from "./components/BusinessInfoSection";
import ChargeSection from "./components/ChargeSection";
import RefundAccountSection from "./components/RefundAccountSection";

interface HospitalBusinessInfo {
  businessName?: string | null;
  businessNumber?: string | null;
  businessAddress?: string | null;
  businessLicenseUrl?: string | null;

  refundBankName?: string | null;
  refundAccountNumber?: string | null;
  refundAccountHolder?: string | null;

  chargeBalance: number;
}

export default function HospitalBusinessPage() {
  const [data, setData] = useState<HospitalBusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [chargeAmount, setChargeAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
     초기 데이터 로딩
  ----------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get<HospitalBusinessInfo>("/hospital/settings");
        setData(res.data);
      } catch (e) {
        console.error(e);
        setError("사업자 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  /* -----------------------------
     환불 계좌 저장
  ----------------------------- */
  const saveRefundAccount = async () => {
    if (!data) return;
    try {
      setSaving(true);
      await api.patch("/hospital/settings", {
        refundBankName: data.refundBankName,
        refundAccountNumber: data.refundAccountNumber,
        refundAccountHolder: data.refundAccountHolder,
      });
      alert("환불 계좌 정보가 저장되었습니다.");
    } catch (e) {
      console.error(e);
      alert("환불 계좌 저장 실패");
    } finally {
      setSaving(false);
    }
  };

  /* -----------------------------
     충전 요청
  ----------------------------- */
  const requestCharge = async () => {
    if (!chargeAmount || chargeAmount <= 0) {
      alert("충전 금액을 입력하세요.");
      return;
    }

    try {
      await api.post("/hospital/charge/request", {
        amount: chargeAmount,
      });
      alert("충전 요청이 접수되었습니다.\n입금 후 관리자 승인까지 대기해주세요.");
      setChargeAmount(0);
    } catch (e) {
      console.error(e);
      alert("충전 요청 실패");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <p className="text-sm text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <p className="text-sm text-red-500">{error ?? "데이터 오류"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-xl font-semibold">사업자 · 충전 관리</h1>

        {/* ================= 사업자 정보 ================= */}
        <BusinessInfoSection
          businessName={data.businessName}
          businessNumber={data.businessNumber}
          businessAddress={data.businessAddress}
          businessLicenseUrl={data.businessLicenseUrl}
          onChange={(v) => setData({ ...data, ...v })}
          onSaved={() => {
          // 저장 성공 → 현재 state 유지 (GET으로 덮어쓰지 않음)
          }}
        />

        {/* ================= 충전 ================= */}
        <ChargeSection
          chargeBalance={data.chargeBalance}
          onRequested={async () => {
            const res = await api.get<HospitalBusinessInfo>("/hospital/settings");
            setData(res.data);
          }}
        />


        {/* ================= 환불 계좌 ================= */}
        <RefundAccountSection
          refundBankName={data.refundBankName}
          refundAccountNumber={data.refundAccountNumber}
          refundAccountHolder={data.refundAccountHolder}
          onChange={(v) => setData({ ...data, ...v })}
        />

      </div>
    </div>
  );
}
