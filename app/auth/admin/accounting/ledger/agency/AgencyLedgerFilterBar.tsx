"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Props {
value: {
  from: string;
  to: string;
  direction: string;
  reason: string;
  agencyName: string; // 🔥 추가
};

  onChange: (v: any) => void;
  onSearch: () => void;
}


export default function AgencyLedgerFilterBar({
  value,
  onChange,
  onSearch,
}: Props) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <Input
        type="date"
        value={value.from}
        onChange={(e) => onChange({ ...value, from: e.target.value })}
      />

      <Input
        type="date"
        value={value.to}
        onChange={(e) => onChange({ ...value, to: e.target.value })}
      />

      <Input
  placeholder="에이전시명"
  value={value.agencyName}
  onChange={(e) =>
    onChange({ ...value, agencyName: e.target.value })
  }
/>


      <Select
        value={value.direction}
        onChange={(e) =>
          onChange({ ...value, direction: e.target.value })
        }
      >
        <option value="ALL">구분 전체</option>
        <option value="IN">수익</option>
        <option value="OUT">취소</option>
      </Select>

      <Select
        value={value.reason}
        onChange={(e) =>
          onChange({ ...value, reason: e.target.value })
        }
      >
        <option value="ALL">사유 전체</option>
        <option value="SETTLED">정산</option>
        <option value="REVERTED">원복</option>
      </Select>

      <Button onClick={onSearch}>조회</Button>
    </div>
  );
}
