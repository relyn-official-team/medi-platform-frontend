"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  items: {
    specialty: {
      id: string;
      name: string;
    };
  }[];
  onChange: () => void;
}
export default function HospitalSpecialtiesSection({ items, onChange }: Props) {
  const [value, setValue] = useState("");

  const addSpecialty = async () => {
  const name = value.trim();
  if (!name) return;

  // 🔒 중복 등록 방지 (대소문자/공백 무시)
  const exists = items.some(
    (it) => it.specialty.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    alert("이미 등록된 진료 과목입니다.");
    return;
  }

    try {
   await api.post("/hospital/specialties", {
     name,
   });
   setValue("");
   onChange();
 } catch (e) {
   console.error(e);
 }
  };

const removeSpecialty = async (id: string) => {
  try {
    await api.delete(`/hospital/specialties/${id}`);
    onChange();
  } catch (e) {
    console.error(e);
  }
};

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4">
      <h2 className="text-sm font-semibold text-gray-700">진료 과목</h2>

      <div className="flex gap-2">
        <Input
          placeholder="예: 피부과, 성형외과, 치과, 산부인과..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="button" onClick={addSpecialty}>
          추가
        </Button>
      </div>

      {items.length > 0 && (
        <ul className="flex flex-wrap gap-2">
         {items.map((it) => (
    <li
      key={it.specialty.id}
      className="flex items-center gap-2 rounded-md border px-2 py-1 text-sm"
    >
      <span>{it.specialty.name}</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => removeSpecialty(it.specialty.id)}
      >
        삭제
      </Button>
    </li>
  ))}
        </ul>
      )}

      <p className="text-xs text-gray-400">
        ※ 실제 제공 가능한 진료 과목만 등록해주세요.
      </p>
    </div>
  );
}
