"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterBarBaseProps {
  children: ReactNode;
  sticky?: boolean;
  className?: string;
}

export default function FilterBarBase({
  children,
  sticky = false,
  className,
}: FilterBarBaseProps) {
  return (
    <div
      className={cn(
        "bg-white",
        "px-0 pt-3 pb-2",
        className
      )}
    >
      {children}
    </div>
  );
}
