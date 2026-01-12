"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

type ChargeStatus = "PENDING" | "APPROVED" | "REJECTED" | "REFUNDED";

interface ChargeRequest {
  id: number;
  amount: number;
  status: ChargeStatus;
  createdAt: string;
  depositedAt?: string | null;
  paymentMethod?: "FIXED_ACCOUNT" | "VIRTUAL_ACCOUNT";
  bankName?: string | null;
  accountNo?: string | null;
  accountHolder?: string | null;
  hospital: {
    id: string;
    name: string;
    chargeBalance: number;
  };
}

export default function AdminChargeRequestsPage() {
  const [requests, setRequests] = useState<ChargeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const fetchRequests = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await api.get<ChargeRequest[]>("/admin/charge/requests");
      setRequests(res.data);
    } catch (e) {
      console.error("Fetch charge requests error:", e);
      setError("충전 신청 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: number) => {
    if (!confirm("충전을 승인하시겠습니까?")) return;
    try {
      setActionLoadingId(id);
      await api.patch(`/admin/charge/requests/${id}/approve`);
      await fetchRequests();
    } catch (e) {
      console.error("Approve error:", e);
      alert("승인 처리에 실패했습니다.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm("충전 요청을 반려하시겠습니까?")) return;
    try {
      setActionLoadingId(id);
      await api.patch(`/admin/charge/requests/${id}/reject`);
      await fetchRequests();
    } catch (e) {
      console.error("Reject error:", e);
      alert("반려 처리에 실패했습니다.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRefund = async (id: number) => {
  if (!confirm("해당 충전을 환불 처리하시겠습니까?")) return;

  try {
    setActionLoadingId(id);
    await api.patch(`/admin/charge/requests/${id}/refund`);
    await fetchRequests();
  } catch (e: any) {
    console.error("Refund error:", e);

    const message =
      e?.response?.data?.message ??
      "환불 처리 중 오류가 발생했습니다.";

    if (message.includes("충전금이 부족")) {
      alert(
        "해당 충전금은 이미 병원에서 사용되어 환불할 수 없습니다.\n\n" +
        "정산 내역을 확인해주세요."
      );
    } else {
      alert(message);
    }
  } finally {
    setActionLoadingId(null);
  }
};


  const handleDownloadBusinessLicense = async (hospitalId: string) => {
   try {
     const res = await api.get<{ downloadUrl: string }>(
       `/admin/hospitals/${hospitalId}/business-license/download`
     );

     const { downloadUrl } = res.data;
     if (!downloadUrl) {
       alert("사업자등록증 파일이 없습니다.");
       return;
     }

     window.open(downloadUrl, "_blank");
   } catch (e) {
     console.error("Business license download error:", e);
     alert("사업자등록증 다운로드 실패");
   }
 };

  const formatDateTime = (value: string) => {
    return new Date(value).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (value: number) =>
    value.toLocaleString("ko-KR") + "원";
  const formatPaymentMethod = (
    v?: "FIXED_ACCOUNT" | "VIRTUAL_ACCOUNT"
  ) => {
    if (v === "VIRTUAL_ACCOUNT") return "가상계좌";
    return "고정계좌";
  };

 const [statusFilter, setStatusFilter] =
   useState<"ALL" | "PENDING">("ALL");
 const [keyword, setKeyword] = useState("");

 const filteredRequests = requests.filter((req) => {
  if (statusFilter === "PENDING" && req.status !== "PENDING") {
    return false;
  }

  if (keyword.trim()) {
    return req.hospital?.name
      ?.toLowerCase()
      .includes(keyword.toLowerCase());
  }




  return true;
});


  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4">관리자 – 충전 신청 관리</h1>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
  <input
    type="text"
    placeholder="병원명 검색"
    className="border rounded-md px-3 py-2 text-sm w-full md:w-64"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
  />

  <div className="flex gap-2">
    <Button
      variant={statusFilter === "ALL" ? "default" : "outline"}
      onClick={() => setStatusFilter("ALL")}
    >
      전체
    </Button>
    <Button
      variant={statusFilter === "PENDING" ? "default" : "outline"}
      onClick={() => setStatusFilter("PENDING")}
    >
      승인 대기
    </Button>
  </div>
</div>




        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p>로딩 중...</p>
        ) : requests.length === 0 ? (
          <p>현재 등록된 충전 신청이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 border rounded-lg bg-white px-4 py-3"
              >
                <div className="space-y-1">
                  <div className="font-semibold">
                    {req.hospital?.name ?? "알 수 없는 병원"}
                  </div>
                    <Button
                    size="sm"
                    variant="outline"
                    className="mt-1"
                    onClick={() =>
                      handleDownloadBusinessLicense(req.hospital.id)
                    }
                  >
                    사업자등록증
                  </Button>
                  <div className="text-sm text-gray-600">
                    신청 금액: <span className="font-medium">
                      {formatAmount(req.amount)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    신청일: {formatDateTime(req.createdAt)}
                  </div>
                  <div className="text-xs text-gray-500">
                    입금방식: {formatPaymentMethod(req.paymentMethod)}
                  </div>

                  {req.bankName && (
                    <div className="text-xs text-gray-500">
                      입금계좌: {req.bankName} {req.accountNo}
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    현재 병원 충전금 잔액:{" "}
                    {formatAmount(req.hospital?.chargeBalance ?? 0)}
                  </div>
                  <div className="text-xs">
                    상태:{" "}
                    <span
                      className={
                        req.status === "PENDING"
                          ? "text-orange-600 font-medium"
                          : req.status === "APPROVED"
                          ? "text-green-600 font-medium"
                          : "text-gray-500 font-medium"
                      }
                    >
                      {req.status === "PENDING"
                        ? "승인 대기"
                        : req.status === "APPROVED"
                        ? "승인 완료"
                        : req.status === "REFUNDED"
                        ? "환불 완료"
                        : "반려"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 md:justify-end">
                  {req.status === "PENDING" ? (
                    <>
                      <Button
                        variant="outline"
                        disabled={actionLoadingId === req.id}
                        onClick={() => handleReject(req.id)}
                      >
                        반려
                      </Button>
                      <Button
                        disabled={actionLoadingId === req.id}
                        onClick={() => handleApprove(req.id)}
                      >
                        승인
                      </Button>
                    </>
                  ) : req.status === "APPROVED" ? (
                    <Button
                      variant="outline"
                      disabled={actionLoadingId === req.id}
                      onClick={() => handleRefund(req.id)}
                    >
                      환불
                    </Button>
                  ) : (
                    <span className="text-xs text-gray-500">
                      이미 처리된 신청입니다.
                    </span>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
