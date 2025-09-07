/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 최적화 완전 비활성화 - API 라우트 정적 생성 방지
  trailingSlash: false,
  
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
    // 정적 생성 타임아웃 단축 (빠른 실패)
    staticPageGenerationTimeout: 10,
    // 워커 스레드 비활성화
    workerThreads: false,
    // ISR 캐시 완전 비활성화
    isrMemoryCacheSize: 0,
    // App Router에서 동적 렌더링 강제
    forceSwcTransforms: true
  },

  // 정적 최적화 비활성화
  generateStaticParams: false,
  
  // 출력 설정 - 서버리스 최적화
  output: 'standalone',
  
  // 빌드 시 type checking 및 linting 건너뛰기
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 빌드 병렬화 비활성화 (메모리 절약)
  swcMinify: true,
  
  // API 라우트 정적 생성 강제 방지
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
}

module.exports = nextConfig