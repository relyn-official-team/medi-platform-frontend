"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterProps {
  onFilter: (filters: {
    keyword: string;
    startDate: string;
    endDate: string;
  }) => void;
}

/**
 * 상단 검색/날짜 필터 바
 * - 키워드: 환자명 / 에이전시명 / 시술명
 * - 날짜: 시작일 ~ 종료일
 */
export default function FilterBar({ onFilter }: FilterProps) {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applyFilter = () => {
    onFilter({
      keyword: keyword.trim(),
      startDate,
      endDate,
    });
  };

  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      {/* 좌측: 검색 + 날짜 */}
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            검색어 (환자명 / 에이전시or병원명 / 시술)
          </label>
          <Input
            placeholder="예: 홍길동 / ABC Agency / 풀페이스 지방이식"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      applyFilter();
    }
  }}
            className="h-10"
          />
        </div>

        <div className="flex items-end gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              시작일
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-10 w-[140px]"
            />
          </div>

          <span className="pb-2 text-gray-400">~</span>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              종료일
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-10 w-[140px]"
            />
          </div>
        </div>
      </div>

      {/* 우측: 버튼 */}
      <div className="flex items-center">
        <Button
          variant="outline"
          className="h-10 px-4"
          onClick={applyFilter}
        >
          필터 적용
        </Button>
      </div>
    </div>
  );
}
