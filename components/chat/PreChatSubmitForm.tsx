"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {PreChatFormDraft } from "@/types/chat";


interface Props {
  reservationId: string;
  mode: "submit" | "edit";
  initialData: PreChatFormDraft;
  onSubmitted?: () => void;
  onUpdated?: () => void;
}

export default function PreChatSubmitForm({
  reservationId,
  mode,
  initialData,
  onSubmitted,
  onUpdated,
}: Props) {
 const [form, setForm] = useState({
   patientName: initialData?.patientName ?? "",
   patientAge: initialData?.patientAge?.toString() ?? "",
   patientNationality: initialData?.patientNationality ?? "",
   procedureName: initialData?.procedureName ?? "",
   reservationDate: initialData?.reservationDate ?? "",
   reservationTime: initialData?.reservationTime ?? "",
 });

useEffect(() => {
  if (!initialData) return;

  setForm({
    patientName: initialData.patientName ?? "",
    patientAge: initialData.patientAge?.toString() ?? "",
    patientNationality: initialData.patientNationality ?? "",
    procedureName: initialData.procedureName ?? "",
    reservationDate: initialData.reservationDate ?? "",
    reservationTime: initialData.reservationTime ?? "",
  });
}, [initialData]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
   if (submitting) return;
  setSubmitting(true);

  if (
    !form.patientName ||
    Number(form.patientAge) <= 0 ||
    !form.patientNationality ||
    !form.procedureName ||
   !form.reservationDate ||
    !form.reservationTime
  ) {
    alert("필수 정보를 모두 입력해주세요.");
    setSubmitting(false);
    return;
  }

    const payload = {
      patientName: form.patientName,
      patientAge: Number(form.patientAge),
      patientNationality: form.patientNationality,
      procedureName: form.procedureName,
      reservationDate: form.reservationDate,
      reservationTime: form.reservationTime,
    };



  try {
    if (mode === "submit") {
      await api.patch(
        `/chat/pre-chat/${reservationId}/submit`,
        payload
      );
      onSubmitted?.();
    } else {
      await api.patch(
        `/chat/threads/${reservationId}/update`,
        payload
      );
      onUpdated?.();
    }
  } finally {
    setSubmitting(false);
  }

  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">

        {/* ⚠️ 안내 문구 */}
  <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2 text-center">
    <p className="text-xs font-medium text-yellow-800">
      예약정보 수정 전, 상대방과 소통 후 진행 바랍니다.
    </p>
  </div>

      {/* 입력 필드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* 환자명 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">환자명</label>
          <input
            name="patientName"
            placeholder="환자명"
 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={form.patientName}
            onChange={handleChange}
          />
        </div>

        {/* 나이 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">나이</label>
          <input
            name="patientAge"
            type="number"
            placeholder="나이"
 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={form.patientAge}
            onChange={handleChange}
          />
        </div>

        {/* 국적 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">국적</label>
          <input
            name="patientNationality"
            placeholder="국적"
 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={form.patientNationality}
            onChange={handleChange}
          />
        </div>

        {/* 시술명 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">시술명</label>
          <input
            name="procedureName"
            placeholder="희망 시술"
 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={form.procedureName}
            onChange={handleChange}
          />
        </div>

        {/* 예약일 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">예약일</label>
          <input
            name="reservationDate"
            type="date"
 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={form.reservationDate}
            onChange={handleChange}
          />
        </div>

        {/* 예약시간 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">예약시간</label>
          <input
            name="reservationTime"
            type="time"
 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={form.reservationTime}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={submitting}
 className={`w-full rounded-lg py-2.5 text-sm font-medium text-white
   ${submitting
     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
     : "bg-blue-600 hover:bg-blue-700"
   }`}
        >
          {mode === "submit" ? "예약 신청하기" : "예약 정보 수정"}
        </button>
      </div>
      </div>
    </div>
  );
}
