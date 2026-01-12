"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReservationStatus } from "@/types/reservation";
import {
   ReservationStatusLabel,
   ReservationStatusBadgeClass,
 } from "@/types/reservationStatus";


type SettlementListItem = {
   settlementId: number;
   reservationId: number;
   status: ReservationStatus;
   patientName: string | null;
   agencyName: string | null;
   hospital: {
     id: string;
     name: string;
   };
   amount: {
     total: number;
     agencyFee: number;
     platformFee: number;
   };
   settlementAt: string;
   voided: {
     isVoided: boolean;
     reason: string | null;
   };
 };

type SettlementListResponse = {
   items: SettlementListItem[];
   pagination: {
     page: number;
     limit: number;
     total: number;
   };
 };

export default function AdminReservationsPage() {
  const [items, setItems] = useState<SettlementListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [hospitalName, setHospitalName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    if (!startDate || !endDate) {
      alert("기간은 필수입니다.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get<SettlementListResponse>("/admin/settlements", {
        params: {
          status: "SETTLED",
          hospitalName: hospitalName || undefined,
          startDate,
          endDate,
        },
      });
      setItems(res.data.items);
    } catch (e) {
      console.error(e);
      alert("정산 목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleRevert = async (item: SettlementListItem) => {
  const ok = confirm(
    `[정산 원복]\n\n환자명: ${item.patientName}\n병원: ${item.hospital.name}\n\n정산을 원복하시겠습니까?`
  );
  if (!ok) return;

  await api.patch(
    `/admin/reservations/${item.reservationId}/revert-settlement`,
    {
      reason: "관리자 정산 원복",
    }
  );

  alert("정산이 원복되었습니다.\n병원/에이전시에 예약대기 카드가 생성됩니다.");
  fetchData(); // 리스트 재조회
};


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">관리자 정산 관리</h1>

      {/* 🔍 필터 */}
      <div className="flex gap-4 items-end flex-wrap">
        <div>
          <label className="text-sm">시작일</label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div>
          <label className="text-sm">종료일</label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <div>
          <label className="text-sm">병원명 입력</label>
          <Input
            placeholder="병원명 입력"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                fetchData();
              }
            }}
          />
        </div>

        <Button onClick={fetchData} disabled={loading}>
          조회
        </Button>
      </div>

      {/* 📋 리스트 */}
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>환자명</th>
              <th>에이전시</th>
              <th>병원</th>
              <th>상태</th>
              <th>결제금액</th>
              <th>수수료</th>
              <th>정산일</th>
              <th>원복</th>
              <th>원복진행</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.settlementId} className="border-t">
                <td className="p-2">{s.patientName ?? "-"}</td>
                <td>{s.agencyName}</td>
                <td>{s.hospital.name}</td>
<td>
   <span
     className={`px-2 py-1 text-xs border rounded ${ReservationStatusBadgeClass[s.status as ReservationStatus]}`}
   >
     {ReservationStatusLabel[s.status as ReservationStatus]}
   </span>
 </td>
                <td>{s.amount.total.toLocaleString()}</td>
                <td>
                  A:{s.amount.agencyFee.toLocaleString()} / P:
                  {s.amount.platformFee.toLocaleString()}
                </td>
                <td>{new Date(s.settlementAt).toLocaleDateString()}</td>
                <td>
                  {s.voided.isVoided ? (
                    <span className="text-red-500">원복됨</span>
                  ) : (
                    <span className="text-green-600">가능</span>
                  )}
                </td>
                <td>
                {s.status === "SETTLED" && (
                    <button
                    className="text-red-600 hover:underline text-sm"
                    onClick={() => handleRevert(s)}
                    >
                    원복
                    </button>
                )}
                </td>

              </tr>
            ))}
            {!items.length && !loading && (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-400">
                  데이터 없음
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
