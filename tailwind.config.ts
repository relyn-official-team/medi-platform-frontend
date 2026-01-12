import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 메인 브랜드 (Figma 문서 Primary Blue)
        primary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // 메인 버튼/강조
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },

        // 정산 대기(오렌지 계열)
        "settle-wait": {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },

        // 상태 뱃지 색
        success: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          500: "#22c55e",
          600: "#16a34a",
        },
        danger: {
          50:  "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
        },
        gray: {
          50:  "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2933",
          900: "#111827",
        },
        // 카드/배경
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f9fafb",
        },
        border: {
          subtle: "#e5e7eb",
          strong: "#d1d5db",
        },
      },

      fontSize: {
        // 문서 기준
        xs: ["12px", "16px"],
        sm: ["13px", "18px"],
        base: ["14px", "20px"],
        lg: ["16px", "24px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
      },

      borderRadius: {
        md: "8px",   // 입력 필드, 작은 카드
        lg: "12px",  // ReservationCard
        xl: "16px",  // 대시보드 주요 카드
        "2xl": "24px",
      },

      boxShadow: {
        // Figma 카드 섀도우 근사치
        card: "0 10px 30px rgba(15,23,42,0.08)",
      },

      spacing: {
        // 문서에서 자주 쓰는 값 정리 (px 기준)
        3: "0.75rem",  // 12px
        4: "1rem",     // 16px
        5: "1.25rem",  // 20px
        6: "1.5rem",   // 24px
        8: "2rem",     // 32px
        10: "2.5rem",  // 40px
      },
    },
  },
  plugins: [],
};

export default config;
