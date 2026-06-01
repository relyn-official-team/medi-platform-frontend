import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: {
    template: "%s | RELYN",
    default: "RELYN — 해외환자 유치 병원·에이전시 B2B 플랫폼",
  },
  description:
    "RELYN은 해외환자 유치를 원하는 한국 병원과 글로벌 에이전시를 연결하는 B2B 플랫폼입니다. 계약 표준화, 정산 자동화, 데이터 통합 관리까지 해외환자 유치에 필요한 모든 운영 구조를 하나의 시스템으로 제공합니다.",
  metadataBase: new URL("https://relynplatform.com"),
  alternates: {
    canonical: "https://relynplatform.com/",
    languages: {
      "ko-KR": "https://relynplatform.com/",
      "en-US": "https://relynplatform.com/en",
      "ja-JP": "https://relynplatform.com/ja",
      "zh-CN": "https://relynplatform.com/zh",
      "th-TH": "https://relynplatform.com/th",
      "x-default": "https://relynplatform.com/",
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko-KR" suppressHydrationWarning>

    <head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="RELYN" />
      <link rel="apple-touch-icon" href="/relyn_logo_push.jpg" />
    </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ClientLayout>{children}</ClientLayout>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17991152486"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', 'AW-17991152486');
        `}
      </Script>

      {/* GA4 (Google Analytics) — 사이트 공통 1회 로드. / 포함 전 페이지에서 감지됨 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9CR46NPFK7"
        strategy="afterInteractive"
      />
      <Script id="ga4-base" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', 'G-9CR46NPFK7');
        `}
      </Script>
      </body>
    </html>
  );
}
