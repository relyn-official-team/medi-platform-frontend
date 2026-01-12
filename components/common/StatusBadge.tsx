"use client";

import { cn } from "@/lib/utils";

type Variant = "gray" | "blue" | "green" | "red";

const VARIANT_STYLE: Record<Variant, string> = {
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
};

export default function StatusBadge({
  label,
  variant = "gray",
}: {
  label: string;
  variant?: Variant;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        VARIANT_STYLE[variant]
      )}
    >
      {label}
    </span>
  );
}
