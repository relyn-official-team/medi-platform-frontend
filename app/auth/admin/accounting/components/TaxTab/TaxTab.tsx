"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

import TaxFilterBar, { TaxFilter } from "./TaxFilterBar";
import TaxTable from "./TaxTable";
import IssueTaxModal from "./IssueTaxModal";
import ConflictModal, { ConflictInfo } from "./ConflictModal";
import TaxDetailModal from "./TaxDetailModal";
import VoidConfirmModal from "./VoidConfirmModal";

export type TaxStatus = "DRAFT" | "ISSUED" | "VOIDED";
export type TaxTargetType = "HOSPITAL" | "AGENCY";

export type TaxSettlement = {
  id: number;
  targetType: TaxTargetType;
  targetId: string;
  targetName?: string;

  taxDirection?: "PURCHASE" | "SALES";

  startDate: string; // ISO
  endDate: string; // ISO

  revision: number;
  isLatest: boolean;

  supplyAmount: number;
  vatAmount: number;
  totalAmount: number;

  status: TaxStatus;
  issuedAt: string | null;
  issuedBy: string | null;
  memo: string | null;

  createdAt: string;
  updatedAt: string;
};

const defaultFilter: TaxFilter = {
  // issuedAt 기준(기본) - 오늘 ~ 오늘로 자동 세팅하고 싶으면 여기에서 세팅 가능
  issuedFrom: "",
  issuedTo: "",
  // 정산대상기간(선택)
  rangeFrom: "",
  rangeTo: "",
  targetType: "HOSPITAL",
  targetId: "",
  status: "ISSUED",
};

function toISODateOnly(v: string) {
  // input type="date" 값(YYYY-MM-DD)을 그대로 서버로 넘길 때 사용
  return v;
}

export default function TaxTab() {
  const [filters, setFilters] = useState<TaxFilter>(defaultFilter);
  const [rows, setRows] = useState<TaxSettlement[]>([]);
  const [loading, setLoading] = useState(false);

  const [issueOpen, setIssueOpen] = useState(false);
  const [conflict, setConflict] = useState<ConflictInfo | null>(null);
  const [detailRow, setDetailRow] = useState<TaxSettlement | null>(null);
  const [voidRow, setVoidRow] = useState<TaxSettlement | null>(null);

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      limit: 50,
      offset: 0,
    };

    if (filters.targetType) params.targetType = filters.targetType;
    if (filters.targetId?.trim()) params.targetId = filters.targetId.trim();
    if (filters.status) params.status = filters.status;

    // ✅ issuedAt 기준 (from/to)
    if (filters.issuedFrom && filters.issuedTo) {
      params.from = toISODateOnly(filters.issuedFrom);
      params.to = toISODateOnly(filters.issuedTo);
    }

    // ✅ 정산대상기간 보조 필터 (rangeFrom/rangeTo)
    if (filters.rangeFrom && filters.rangeTo) {
      params.rangeFrom = toISODateOnly(filters.rangeFrom);
      params.rangeTo = toISODateOnly(filters.rangeTo);
    }

    return params;
  }, [filters]);

  const fetchIssuedList = async () => {
    try {
      setLoading(true);
      const res = await api.get<TaxSettlement[]>("/admin/tax/issued", {
        params: queryParams,
      });
      setRows(res.data || []);
    } catch (e) {
      console.error(e);
      alert("발행 내역 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 최초 1회 로드
    fetchIssuedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIssued = async () => {
    setIssueOpen(false);
    await fetchIssuedList();
  };

  return (
    <div className="space-y-4">
      {/* 상단 액션 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">세금처리</h2>
          <p className="text-sm text-gray-500">
            발행(ISSUE) / 조회 / VOID / revision 이력 관리
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchIssuedList}>
            새로고침
          </Button>
          <Button onClick={() => setIssueOpen(true)}>발행</Button>
        </div>
      </div>

      {/* 필터 */}
      <div className="rounded-lg border bg-white p-4">
        <TaxFilterBar
          value={filters}
          onChange={setFilters}
          onSearch={fetchIssuedList}
        />
      </div>

      {/* 리스트 */}
      <div className="rounded-lg border bg-white">
        <TaxTable
          rows={rows}
          loading={loading}
          onDetail={(r) => setDetailRow(r)}
          onVoid={(r) => setVoidRow(r)}
        />
      </div>

      {/* 모달: 발행 */}
      <IssueTaxModal
        open={issueOpen}
        onClose={() => setIssueOpen(false)}
        onIssued={handleIssued}
        onConflict={(c) => {
          setIssueOpen(false);
          setConflict(c);
        }}
      />

      {/* 모달: 충돌 */}
      <ConflictModal
        open={!!conflict}
        conflict={conflict}
        onClose={() => setConflict(null)}
        onView={() => {
          // 현재는 “해당 발행 보기”를 상세 모달로 대체
          // (백엔드에서 issuedId로 상세조회 endpoint가 따로 있으면 라우팅으로 교체)
          if (!conflict) return;
          // conflict는 TaxSettlement의 요약이므로, detailRow 형태가 아니어도 history는 호출 가능
          setDetailRow({
            id: conflict.id,
            targetType: conflict.targetType,
            targetId: conflict.targetId,
            startDate: conflict.startDate,
            endDate: conflict.endDate,
            revision: 1,
            isLatest: true,
            supplyAmount: 0,
            vatAmount: 0,
            totalAmount: 0,
            status: "ISSUED",
            issuedAt: null,
            issuedBy: null,
            memo: null,
            createdAt: "",
            updatedAt: "",
          });
          setConflict(null);
        }}
      />

      {/* 모달: 상세(Revision + Items) */}
      <TaxDetailModal
        open={!!detailRow}
        row={detailRow}
        onClose={() => setDetailRow(null)}
      />

      {/* 모달: VOID */}
      <VoidConfirmModal
        open={!!voidRow}
        row={voidRow}
        onClose={() => setVoidRow(null)}
        onVoided={async () => {
          setVoidRow(null);
          await fetchIssuedList();
        }}
      />
    </div>
  );
}
