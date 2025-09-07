/** @type {import('next').NextConfig} */
const nextConfig = {
  // 모든 API 라우트를 동적으로 렌더링하도록 강제
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ]
  },
  
  // 빌드 시 정적 생성 최적화
  experimental: {
    // 정적 생성 타임아웃 증가 (기본 60초)
    staticPageGenerationTimeout: 30,
    // 워커 풀 사이즈 제한
    workerThreads: false,
    // 메모리 사용량 최적화
    isrMemoryCacheSize: 0
  },

  // 출력 설정
  output: 'standalone',
  
  // 빌드 시 type checking 건너뛰기 (빠른 빌드)
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint 에러 무시 (빌드 속도 향상)
  eslint: {
    ignoreDuringBuilds: false,
  }
}

module.exports = nextConfig