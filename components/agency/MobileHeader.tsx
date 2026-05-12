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

  if (!title && !showBack && !right) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-[0_1px_8px_rgba(2,6,23,0.06)] md:hidden">
      <div className="h-12 flex items-center px-4 relative">
        {/* Left */}
        <div className="absolute left-3 flex items-center">
          {showBack && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-8 h-8 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Center */}
        <div
          className={clsx(
            "mx-auto text-[15px] font-semibold text-gray-900 truncate",
            showBack && "pl-6",
            right && "pr-6"
          )}
        >
          {title}
        </div>

        {/* Right */}
        <div className="absolute right-3 flex items-center">
          {right}
        </div>
      </div>
    </header>
  );
}
