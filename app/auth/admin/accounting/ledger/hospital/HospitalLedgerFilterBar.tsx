"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Props {
  value: {
    from: string;
    to: string;
    hospitalName: string;
    direction: string;
    reason: string;
  };
  onChange: (v: any) => void;
  onSearch: () => void;
}

export default function HospitalLedgerFilterBar({
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
   placeholder="병원명"
   value={value.hospitalName}
   onChange={(e) =>
     onChange({ ...value, hospitalName: e.target.value })
   }
 />

      <Select
        value={value.direction}
        onChange={(e) =>
          onChange({ ...value, direction: e.target.value })
        }
      >
        <option value="ALL">구분 전체</option>
        <option value="OUT">차감</option>
        <option value="IN">복구</option>
        <option value="CHARGE">충전</option>
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
