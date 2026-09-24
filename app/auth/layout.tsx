import type { Metadata } from "next";

// Public pages opt into indexing individually. Keep every authenticated workspace excluded.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null, languages: {} },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
