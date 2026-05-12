/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backendBaseUrl =
      process.env.BACKEND_BASE_URL || "http://localhost:5000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendBaseUrl}/api/:path*`,
      },
    ];
  },

  async headers() {
    return [
      // 보안 헤더 — 전체 경로
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // 정적 에셋 장기 캐시 (Core Web Vitals 개선)
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
