import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
      },
      {
        protocol: 'https',
        hostname: 'figma.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // GitHub 이미지 호스팅
      },
      {
        protocol: 'https',
        hostname: '**', // 기타 HTTPS 이미지 (필요시 제한)
      },
    ],
  },
};

export default nextConfig;
