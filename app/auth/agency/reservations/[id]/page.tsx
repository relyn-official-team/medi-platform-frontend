"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Badge } from "@/components/ui/badge";

type ReservationDetail = {
  id: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";
  createdAt: string;

  hospital: {
    id?: string;
    name?: string;
    address?: string | null;
    phone?: string | null;
    hotlinePhone?: string | null;
  };

  patient: {
    name: string;
    age: number;
    nationality: string;
  };

  procedureName: string;
  reservationDate: string;
  reservationTime: string;
  memo?: string | null;
  language?: string | null;

  options: {
    needSedation: boolean;
    needInterpreter: boolean;
    needTaxRefund: boolean;
    isUrgent: boolean;
  };
};


const STATUS_LABEL: Record<string, string> = {
  PENDING: "대기",
  CONFIRMED: "확정",
  COMPLETED: "완료",
  CANCELED: "취소",
};

export default function AgencyReservationDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const [data, setData] = useState<ReservationDetail | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<ReservationDetail>(
          `/agency/reservations/${id}`
        );
        setData(res.data);
      } catch (e) {
        console.error("Failed to load reservation detail", e);
      }
    })();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">예약 상세</h1>
        <Badge>{STATUS_LABEL[data.status]}</Badge>
      </div>

      {/* 병원 정보 */}
      <section className="bg-white border rounded-lg p-4 space-y-1">
        <div className="font-semibold">병원 정보</div>
        <div>{data.hospital.name}</div>
        <div className="text-sm text-gray-600">{data.hospital.address}</div>
        <div className="text-sm">
          {data.hospital.phone ?? "-"} / {data.hospital.hotlinePhone ?? "-"}
        </div>
      </section>

      {/* 환자 정보 */}
      <section className="bg-white border rounded-lg p-4 space-y-1">
        <div className="font-semibold">환자 정보</div>
        <div>
          {data.patient.name} ({data.patient.nationality}, {data.patient.age})
        </div>
      </section>

      {/* 예약 정보 */}
      <section className="bg-white border rounded-lg p-4 space-y-1">
        <div className="font-semibold">예약 정보</div>
        <div>시술명: {data.procedureName}</div>
        <div>
          일정: {data.reservationDate.slice(0, 10)} {data.reservationTime}
        </div>
        {data.language && <div>언어: {data.language}</div>}
        {data.memo && <div className="text-sm">메모: {data.memo}</div>}
      </section>

      {/* 옵션 */}
      <section className="bg-white border rounded-lg p-4 space-y-1">
        <div className="font-semibold">요청 옵션</div>
        <div className="text-sm">
          {data.options.needSedation && "마취 · "}
          {data.options.needInterpreter && "통역 · "}
          {data.options.needTaxRefund && "Tax Refund · "}
          {data.options.isUrgent && "긴급"}
          {!Object.values(data.options).some(Boolean) && "-"}
        </div>
      </section>
    </div>
  );
}
