"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          // 기본 UI 통일
          "h-9 rounded-md border border-gray-300 bg-white px-2 text-sm",
          // focus / disabled / mobile UX
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "disabled:bg-gray-100 disabled:text-gray-400",
          // 모바일 터치 영역 안정화
          "touch-manipulation",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export { Select };
