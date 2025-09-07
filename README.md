# Digital Education Platform

김문정 교사의 디지털 교육 도구 모음

## 📁 프로젝트 구조

```
digital_program/
├── organized_structure/
│   ├── main-platform/              # 메인 플랫폼
│   │   └── main_platform.html      # 4개 도구 통합 메인 페이지
│   ├── digital-tools/              # 독립 HTML 도구들
│   │   ├── scenario-creation.html  # 토론 시나리오 생성 도구
│   │   ├── debate-session.html     # 실시간 토론 진행 도구
│   │   ├── evidence-search.html    # 근거자료 검색 도구
│   │   └── feedback.html          # 학생 의견 피드백 도구
│   └── question-talk/              # 질문톡톡! 논제샘솟! (Next.js)
│       ├── app/                    # Next.js 앱 디렉토리
│       ├── components/             # React 컴포넌트들
│       ├── lib/                    # 유틸리티 라이브러리
│       ├── package.json            # Next.js 프로젝트 설정
│       └── ...                     # 기타 Next.js 파일들
└── README.md                       # 이 파일
```

## 🚀 사용 방법

### 1. 메인 플랫폼 실행 (권장)
```bash
cd /Users/moon/Desktop/digital_program
python3 -m http.server 8000
```
브라우저에서 http://localhost:8000/organized_structure/main-platform/main_platform.html 접속

### 2. 개별 도구 직접 실행
각 도구를 직접 실행하려면:
- `organized_structure/digital-tools/` 폴더의 HTML 파일들을 브라우저로 직접 열기

### 3. 질문톡톡! 논제샘솟! 개발 (Next.js)
```bash
cd organized_structure/question-talk
npm install
npm run dev
```
브라우저에서 http://localhost:3000 접속

## 🛠️ 도구 설명

### 독립 HTML 도구들
1. **토론 시나리오 생성** - AI 기반 토론 시나리오 자동 생성
2. **실시간 토론 진행** - 4단계 토론 진행 시스템
3. **근거자료 검색** - 유튜브/뉴스 기사 연동 검색
4. **학생 의견 피드백** - AI 기반 개별 피드백 시스템

### 질문톡톡! 논제샘솟! (Next.js)
- React 기반 실시간 토론 플랫폼
- Firebase 데이터베이스 연동
- Google Gemini AI API 활용
- 교사/학생 역할별 기능 분리

## 📝 변경 사항

### 2025-09-07 구조 정리
- iframe 기반 통합에서 독립 HTML 파일 시스템으로 변경
- 직접 네비게이션으로 중간 페이지 제거
- 프로젝트 구조 체계화 및 중복 파일 제거
- 명확한 디렉토리 분리로 유지보수성 향상

## 🔧 개발 환경
- HTML5, CSS3, JavaScript (ES6+)
- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Firebase (Auth, Database, Storage)
- Google Gemini AI API

## 👨‍💻 개발자
- **기획/관리**: 김문정 (안양 박달초등학교)
- **개발**: Claude (Anthropic AI)