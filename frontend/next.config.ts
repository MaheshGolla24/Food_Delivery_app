import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://127.0.0.1:8001/api/auth/:path*',
      },
      {
        source: '/api/orders/:path*',
        destination: 'http://127.0.0.1:8002/api/orders/:path*',
      },
    ];
  },
};

export default nextConfig;
