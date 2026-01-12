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
};

module.exports = nextConfig;