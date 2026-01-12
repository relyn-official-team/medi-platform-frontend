"use client";


import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Props {
  value: string;
  onSave: (value: string) => void;
}

export default function HospitalIntroductionSection({
  value,
  onSave,
}: Props) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4">
      <h3 className="text-base font-semibold text-gray-900">병원 소개</h3>

      <textarea
        className="w-full min-h-[120px] rounded-md border p-3 text-sm"
        placeholder="병원의 강점, 전문성, 의료진 경력 등을 자유롭게 작성해주세요."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />

      <div className="flex justify-end">
         <Button size="sm" type="button" onClick={() => onSave(localValue)}>
            저장
         </Button>
      </div>

      <p className="text-xs text-gray-400">
        ※ 해외 환자에게 노출되는 정보입니다.
      </p>
    </div>
  );
}
