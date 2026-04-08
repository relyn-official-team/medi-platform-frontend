import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RELYN",
  description: "",
  metadataBase: new URL("https://www.relynplatform.com"),
  alternates: {
    canonical: "/",
    languages: {
      ko: "/",
      ja: "/ja",
      en: "/en",
      zh: "/zh",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">

    <head>
      {/* PWA / iOS Web Push 필수 */}
      <link rel="manifest" href="/manifest.json" />

      {/* iOS Web App 인식용 */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="RELYN" />

      {/* iOS 아이콘 (없어도 동작은 하지만 권장) */}
      <link rel="apple-touch-icon" href="/relyn_logo_push.jpg" />
    </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
