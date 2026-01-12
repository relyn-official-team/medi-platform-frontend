"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabKey = "hospital" | "agency" | "tax";

export default function AccountingTabs({
  value,
  onChange,
}: {
  value: TabKey;
  onChange: (v: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "hospital", label: "병원용" },
    { key: "agency", label: "에이전시용" },
    { key: "tax", label: "세금처리" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <Button
          key={t.key}
          type="button"
          variant={value === t.key ? "default" : "outline"}
          className={cn("h-9")}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
}
