"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import Autocomplete from "@/components/common/Autocomplete";


export type TaxFilter = {
  issuedFrom?: string; // YYYY-MM-DD
  issuedTo?: string; // YYYY-MM-DD
  rangeFrom?: string; // YYYY-MM-DD
  rangeTo?: string; // YYYY-MM-DD
  targetType?: "HOSPITAL" | "AGENCY";
  targetId?: string;
  status?: "ISSUED" | "VOIDED" | "DRAFT";
};

export default function TaxFilterBar({
  value,
  onChange,
  onSearch,
}: {
  value: TaxFilter;
  onChange: (v: TaxFilter) => void;
  onSearch: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
      {/* 대상 유형 */}
      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs text-gray-500">대상</label>
        <Select
        value={value.targetType || "HOSPITAL"}
        onChange={(e) =>
            onChange({
            ...value,
            targetType: e.target.value as "HOSPITAL" | "AGENCY",
            })
        }
        >
        <option value="HOSPITAL">병원</option>
        <option value="AGENCY">에이전시</option>
        </Select>
      </div>

      {/* 대상 ID (초기버전: name autocomplete 대신 id 입력) */}
      <div className="lg:col-span-3">
<label className="mb-1 block text-xs text-gray-500">
  {value.targetType === "HOSPITAL" ? "병원" : "에이전시"}
</label>

<Autocomplete
  placeholder={
    value.targetType === "HOSPITAL"
      ? "병원명 검색"
      : "에이전시명 검색"
  }
  value={value.targetId}
  fetchUrl={
    value.targetType === "HOSPITAL"
      ? "/admin/lookup/hospitals"
      : "/admin/lookup/agencies"
  }
  onChange={(id) =>
    onChange({
      ...value,
      targetId: id,
    })
  }
/>
      </div>

      {/* 상태 */}
      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs text-gray-500">상태</label>
        <Select
        value={value.status || "ISSUED"}
        onChange={(e) =>
            onChange({
            ...value,
            status: e.target.value as "ISSUED" | "VOIDED" | "DRAFT",
            })
        }
        >
        <option value="ISSUED">ISSUED</option>
        <option value="VOIDED">VOIDED</option>
        <option value="DRAFT">DRAFT</option>
        </Select>
      </div>

      {/* 발행일(issuedAt) */}
      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs text-gray-500">발행일 From</label>
        <Input
          type="date"
          value={value.issuedFrom || ""}
          onChange={(e) => onChange({ ...value, issuedFrom: e.target.value })}
        />
      </div>

      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs text-gray-500">발행일 To</label>
        <Input
          type="date"
          value={value.issuedTo || ""}
          onChange={(e) => onChange({ ...value, issuedTo: e.target.value })}
        />
      </div>

      {/* 정산기간(start/end) - 선택 */}
      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs text-gray-500">
          정산기간 From
        </label>
        <Input
          type="date"
          value={value.rangeFrom || ""}
          onChange={(e) => onChange({ ...value, rangeFrom: e.target.value })}
        />
      </div>

      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs text-gray-500">정산기간 To</label>
        <Input
          type="date"
          value={value.rangeTo || ""}
          onChange={(e) => onChange({ ...value, rangeTo: e.target.value })}
        />
      </div>

      {/* 버튼 */}
      <div className="lg:col-span-1 flex items-end">
        <Button className="w-full" onClick={onSearch}>
          검색
        </Button>
      </div>
    </div>
  );
}
