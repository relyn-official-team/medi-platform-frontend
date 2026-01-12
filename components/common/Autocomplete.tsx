"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

export type AutocompleteOption = {
  id: string;
  name: string;
};

type Props = {
  placeholder?: string;
  value?: string; // 선택된 ID
  onChange: (id: string, option: AutocompleteOption) => void;
  fetchUrl: string; // /admin/lookup/hospitals | agencies
};

export default function Autocomplete({
  placeholder,
  value,
  onChange,
  fetchUrl,
}: Props) {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<AutocompleteOption[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // debounce 검색
  useEffect(() => {
    if (!open || keyword.trim().length < 1) {
      setItems([]);
      return;
    }

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get<AutocompleteOption[]>(fetchUrl, {
          params: { q: keyword.trim() },
        });
        setItems(res.data || []);
      } catch (e) {
        console.error(e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [keyword, open, fetchUrl]);

  const handleSelect = (item: AutocompleteOption) => {
    setKeyword(item.name);
    setOpen(false);
    onChange(item.id, item);
  };

  return (
    <div ref={containerRef} className="relative">
      <Input
        placeholder={placeholder}
        value={keyword}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setKeyword(e.target.value);
          setOpen(true);
        }}
      />

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow">
          {loading && (
            <div className="px-3 py-2 text-sm text-gray-500">
              검색중...
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">
              결과가 없습니다.
            </div>
          )}

          {!loading &&
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "flex w-full items-center px-3 py-2 text-left text-sm hover:bg-gray-100"
                )}
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
