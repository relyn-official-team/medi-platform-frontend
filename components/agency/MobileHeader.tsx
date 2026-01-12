"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import clsx from "clsx";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
}

export default function MobileHeader({
  title,
  showBack = true,
  onBack,
  right,
}: MobileHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // 아무 것도 표시할 게 없으면 렌더 자체를 안 해도 됨
  if (!title && !showBack && !right) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 md:hidden">
      <div className="h-12 flex items-center px-4 relative">
        {/* Left */}
        <div className="absolute left-4 flex items-center">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-1 -ml-1 text-gray-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Center */}
        <div
          className={clsx(
            "mx-auto text-sm font-medium text-gray-900 truncate",
            showBack && "pl-6",
            right && "pr-6"
          )}
        >
          {title}
        </div>

        {/* Right */}
        <div className="absolute right-4 flex items-center">
          {right}
        </div>
      </div>
    </header>
  );
}
