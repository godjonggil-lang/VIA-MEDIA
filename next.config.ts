import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // 기사 이미지는 전부 /api/image 프록시를 거친다 (src 쿼리는 프록시가 허용 도메인으로 검사)
    localPatterns: [{ pathname: '/api/image' }],
    remotePatterns: [],
  },
}

export default nextConfig
