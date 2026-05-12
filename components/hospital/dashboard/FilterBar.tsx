"use client";

import { useState } from "react";
import { Search, CalendarRange, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterProps {
  onFilter: (filters: {
    keyword: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export default function FilterBar({ onFilter }: FilterProps) {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applyFilter = () => {
    onFilter({ keyword: keyword.trim(), startDate, endDate });
  };

  const resetFilter = () => {
    setKeyword("");
    setStartDate("");
    setEndDate("");
    onFilter({ keyword: "", startDate: "", endDate: "" });
  };

  const hasActiveFilter = keyword || startDate || endDate;

  return (
    <div className="flex flex-wrap items-end gap-2 sm:gap-3">
      {/* 검색어 */}
      <div className="relative min-w-[180px] flex-1">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <Input
          placeholder="환자명 / 에이전시명 / 시술명"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              applyFilter();
            }
          }}
          className="h-9 pl-8 pr-3 text-sm rounded-xl border-gray-200 bg-white focus:border-blue-300 focus:ring-blue-100"
        />
      </div>

      {/* 날짜 범위 */}
      <div className="flex items-center gap-1.5">
        <CalendarRange className="h-3.5 w-3.5 text-gray-400 shrink-0" />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="h-9 w-[130px] text-sm rounded-xl border-gray-200 bg-white focus:border-blue-300 focus:ring-blue-100"
        />
        <span className="text-gray-400 text-xs">~</span>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="h-9 w-[130px] text-sm rounded-xl border-gray-200 bg-white focus:border-blue-300 focus:ring-blue-100"
        />
      </div>

      {/* 버튼 */}
      <div className="flex items-center gap-2">
        <Button
          onClick={applyFilter}
          size="sm"
          className="h-9 rounded-xl bg-[#0b1220] px-4 text-[13px] font-semibold text-white hover:bg-[#0b1220]/90"
        >
          검색
        </Button>

        {hasActiveFilter && (
          <Button
            onClick={resetFilter}
            size="sm"
            variant="outline"
            className="h-9 rounded-xl border-gray-200 px-3 text-[13px] text-gray-500 hover:bg-gray-50"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            초기화
          </Button>
        )}
      </div>
    </div>
  );
}
