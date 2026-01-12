"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  suggestions: string[];
  onInputChange: (value: string) => void;
  onSelect: (value: string) => void;
  onConfirm?: (value: string) => void;
  placeholder?: string;
}

export default function LanguageAutocompleteInput({
  value,
  suggestions,
  onInputChange,
  onConfirm,
  onSelect,
  placeholder = "상담언어 입력",
}: Props) {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const keyword = value.trim().toLowerCase();

  const filtered = keyword
    ? suggestions
        .filter(Boolean)
        .filter((lang) => lang.toLowerCase().includes(keyword))
    : [];

 
  /* -----------------------------
     키보드 컨트롤
  ------------------------------ */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % filtered.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) =>
        i <= 0 ? filtered.length - 1 : i - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0) {
        onSelect(filtered[highlightIndex]);
        setOpen(false);
        setHighlightIndex(-1);
        return;
      }

 // 🔹 드롭다운 선택이 없으면 입력값으로 확정
 if (value.trim() && onConfirm) {
   onConfirm(value.trim());
   setOpen(false);
   setHighlightIndex(-1);
 }
    }

    if (e.key === "Escape") {
      setOpen(false);
      setHighlightIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onInputChange(e.target.value);
   if (e.target.value.trim()) {
     setOpen(true);
   } else {
     setOpen(false);
   }
          setHighlightIndex(-1);
        }}
        onFocus={() => {
  if (value.trim() && filtered.length > 0) {
    setOpen(true);
  }
        }}
 onBlur={(e) => {
  const next = e.relatedTarget as Node | null;

   // 드롭다운(li) 클릭 등으로 포커스가 컨테이너 내부로 이동한 경우 닫지 않음
   if (next && containerRef.current?.contains(next)) {
     return;
   }

   setOpen(false);
   setHighlightIndex(-1);
 }}

        onKeyDown={onKeyDown}
        className="
          w-full rounded-md border border-gray-300
          px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      {open && filtered.length > 0 && (
        <ul
          className="
            absolute z-30 mt-1 max-h-48 w-full overflow-auto
            rounded-md border border-gray-200 bg-white
            shadow-lg
          "
        >
          {filtered.map((lang, idx) => (
            <li
              key={`${lang}-${idx}`}
              tabIndex={-1}
              onMouseDown={() => {
                onSelect(lang);
                setOpen(false);
                setHighlightIndex(-1);
              }}
              onMouseEnter={() => setHighlightIndex(idx)}
              className={`
                cursor-pointer px-3 py-2 text-sm
                ${
                  idx === highlightIndex
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-50"
                }
              `}
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
