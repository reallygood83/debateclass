# 교사/학생 페이지 분리화 PRD (Product Requirements Document) - 최소 변경 중심

**버전**: 1.1
**작성일**: 2025-09-07 (수정)
**작성자**: AI 제품 매니저
**승인자**: [미정]
**개요**: 본 PRD는 기존 작동 중인 Question-Talk 프로그램의 핵심 기능을 유지하면서, 연구대회 피드백(교사/학생 페이지 구분 부족)에 대응하기 위한 최소 분리 계획입니다. 완전한 재구축이 아닌, 역할 기반 접근 강화와 UI 조정을 통해 사용자 경험을 개선합니다. 기존 API, 컴포넌트, 인증 흐름을 최대한 보존하며, 변경 범위를 최소화합니다.

## 1. 서론
### 1.1 비즈니스 요구사항 및 목표
- **비즈니스 맥락**: 기존 프로그램의 안정적 운영을 전제로, 연구대회 예선 피드백(교사/학생 페이지가 구분되지 않음)에 초점. 완전한 새 프로그램이 아닌, 최소 수정으로 역할별 페이지 차별화하여 본선 평가 대응.
- **주요 목표**:
  - 피드백 해결: 역할별 페이지 접근/시각적 구분으로 혼란 최소화 (설문 기반 70%+ 개선).
  - 기능 보존: 기존 세션 관리, 질문 입력, AI 분석 등 100% 유지.
  - 효율성: 개발 시간 1주 이내, 기존 사용자 영향 없음.
- **범위 제한**: 핵심 변경만 (라우팅/레이아웃 조정). 추가 도구 통합은 선택적 (Out of Scope for MVP), 백엔드 변경 없음.
- **가정**: 기존 기능이 원활히 작동 중, 사용자 데이터 무결성 유지.

### 1.4 최소 실행 가능 변경 (Minimal Viable Changes)
- **핵심 초점**: 기존 구조 변경 최소화. 예: AuthContext에 role 추가만, layout.tsx에 조건부 렌더링.
- **영향 범위**: 변경 파일 5-7개 (AuthContext.tsx, layout.tsx, teacher/student pages 래핑).
- **비판적 고려**: 과도한 분리로 기존 사용자 혼란 피함. A/B 테스트로 검증 (분리 전/후 비교).

### 1.2 사용자 페르소나 및 스토리
- **페르소나**:
  - **교사 (Persona A)**: 30-50대 중고등학교 교사, 디지털 도구 익숙. Needs: 세션 관리 효율화, AI 분석. Pain points: 학생 페이지 접근 시 혼란.
  - **학생 (Persona B)**: 15-18세 고등학생, 모바일 중심. Needs: 간단 참여, 실시간 피드백. Pain points: 복잡 UI로 인한 포기.
  - **관리자 (Persona C)**: 학교 IT 담당자. Needs: 배포/유지보수 용이.
- **사용자 스토리** (As a [user], I want [feature] so that [benefit]):
  - As a teacher, I want role-based dashboard access so that I can manage sessions without student UI clutter.
  - As a student, I want simplified session participation page so that I can focus on debating without admin tools.
  - As a teacher, I want integrated tools (e.g., scenario-creation) so that I can prepare lessons efficiently.
  - As a student, I want guest access to sessions so that I can join without full registration.
  - As an admin, I want error logging so that I can monitor system health.

### 1.3 기능 및 비기능 요구사항
- **기능 요구사항 (Functional)** - 최소 중심:
  - F1: 로그인 시 역할 자동 리디렉션 (MUST) – 기존 AuthContext 확장.
  - F2: 페이지 가드 적용 (MUST) – teacher/student 경로 보호, 기존 RequireAuth.tsx 재사용.
  - F3: 레이아웃 조정 (SHOULD) – layout.tsx에 role-based 헤더/사이드바 변형.
  - F4: 추가 도구 통합 (COULD) – 기존 HTML을 React 컴포넌트로 마이그레이션 (iframe 대안, 세밀한 통합 위해 권장). iframe 방식은 스타일 충돌/보안 문제로 비권장.
  - F5: 기존 AI 기능 유지 (MUST) – 변경 없음.
- **비기능 요구사항 (Non-Functional)**:
  - 성능: 페이지 로드 <2초 (95% 사용자).
  - 보안: 역할 기반 접근 100% (OWASP 준수).
  - 접근성: WCAG 2.1 AA 수준 (키보드 네비, 색맹 지원).
  - 호환성: Chrome/Edge/Safari 최신 버전, 모바일 (iOS/Android).
  - 확장성: 사용자 500명까지 스케일 (Firebase 한도 내).

### 1.4 성공 지표 및 KPI
- **정량적 지표**:
  - 개발 완료율: 100% 기능 구현.
  - 버그 수정률: 발견 버그 95% 이내 해결.
  - 성능: Lighthouse 점수 90+.
  - 사용자 만족도: NPS (Net Promoter Score) 7+ (테스트 사용자 10명 설문).
- **정성적 지표**:
  - 역할 구분 명확성: 사용자 인터뷰 "쉬움" 응답 80%.
  - 교육 효과: 참여 세션 수 증가 (기존 대비).
- **측정 방법**: Google Analytics 통합, A/B 테스트 (분리 전/후).

**비판적 검토 요약**: PRD를 최소 변경으로 재조정하여 기존 프로그램 운영 원활성 우선. 단계/기간 단축, 도구 통합 선택적으로 변경하여 피드백 대응에 초점. 사용자 스토리 중 과도한 부분(도구 통합)은 선택적으로 유지.

### 가정 및 범위
- 역할: 사용자 등록 시 'teacher'/'student' 선택 (기존 register 페이지 수정).
- 통합 도구: 4개 HTML 파일을 React로 변환.
- 제외: 백엔드 전체 재설계 (기존 API 유지).

## 2. 현재 구조 상세 분석
### 파일/디렉토리 구조 (주요 관련 부분)
- **인증**: `app/auth/login/page.tsx`, `lib/auth.ts`, `contexts/AuthContext.tsx` – 역할 정보 저장 미흡.
- **레이아웃**: `app/layout.tsx` – 모든 페이지 공유, 역할별 커스터마이징 없음.
- **교사 페이지**: `app/teacher/dashboard/page.tsx`, `app/teacher/session/[sessionId]/page.tsx` – SessionManager.tsx 등 컴포넌트 사용.
- **학생 페이지**: `app/student/session/[sessionCode]/page.tsx` – QuestionInput.tsx 등 컴포넌트.
- **공통**: `components/common/` (Header.tsx, Button.tsx), `lib/firebase.ts`.
- **API**: `app/api/sessions/` – 역할 확인 로직 추가 필요.
- **추가 도구**: `organized_structure/digital-tools/` – HTML 파일들, 마이그레이션 대상.

### 기존 문제 및 영향
- 로그인 후 역할 무시: 모든 사용자가 동일 UI 노출 → 접근 오류.
- 공유 레이아웃: 교사/학생 테마 혼합 → UX 혼란.
- 도구 미통합: 별도 파일 → 네비게이션 불편.

## 3. 개발 단계별 계획
개발을 5단계로 나누어 진행. 각 단계는 작업 목록, 세부 구현, 예상 시간, 테스트 항목 포함. Git 브랜치로 관리 (e.g., feature/role-separation-stage1).

### 단계 1: 준비 및 인증 강화 (예상: 1일)
**목적**: 기존 인증에 역할 추가 (최소 변경). 복잡도: 낮음.
- **작업 목록**:
  1. 역할 선택 UI 추가: 기존 register 페이지에 간단 드롭다운 (teacher/student), Firebase에 role 필드 저장 (기존 auth.ts 확장).
  2. AuthContext 수정: role 상태 추가, 로그인 후 role 기반 리디렉션 (기존 useEffect 활용).
  3. 기존 RequireAuth.tsx 확장: role prop 지원으로 역할 가드 재사용.
- **보존 포인트**: 기존 로그인/등록 로직 변경 최소, 백엔드 API 호출不变.
- **세부 구현**:
  - register 페이지: 드롭다운으로 역할 선택, Firebase에 저장.
  - 리디렉션: useEffect로 role 확인 후 router.push.
- **예상 버그 및 대응**:
  - 버그: 역할 저장 실패 (Firebase 권한 오류) – 대응: try-catch로 에러 핸들링, 콘솔 로그 추가. 테스트: 모킹된 사용자 생성.
  - 버그: 리디렉션 무한 루프 – 대응: loading 상태 추가, role null 시 대기.
- **테스트 항목**: 단위 테스트 (Jest로 AuthContext), E2E (Cypress로 로그인/리디렉션). 성공 기준: 100% 역할별 리디렉션.

### 단계 2: 라우팅 및 접근 제어 구현 (예상: 1-2일)
**목적**: 기존 경로 보호 (최소 변경). 복잡도: 낮음.
- **작업 목록**:
  1. 미들웨어 추가: `middleware.ts` 생성 – /teacher/* 및 /student/* 경로에 role 확인 (기존 RequireAuth 확장).
  2. 페이지 가드 적용: 기존 컴포넌트로 teacher/student 페이지 래핑 (새 컴포넌트 생성 최소).
  3. 세션 접근: 기존 API 호출에 role 체크 추가 (백엔드 변경 없음, 프론트 검증).
- **보존 포인트**: 미들웨어로 서버사이드 체크 최소, 클라이언트 가드 우선.
- **세부 구현**:
  - 미들웨어: Next.js middleware API 사용, headers/cookies로 role 검증.
  - Unauthorized 페이지: 새로 생성 (`app/unauthorized/page.tsx`) – "접근 권한 없음" 메시지 + 로그인 유도.
- **예상 버그 및 대응**:
  - 버그: 미들웨어 성능 저하 (모든 요청 검사) – 대응: 캐싱 (role in sessionStorage), 정적 페이지 제외.
  - 버그: 코드 유효성 실패 (잘못된 세션 코드) – 대응: API 에러 핸들링 (try-catch in page.tsx), 사용자 친화적 메시지 ("세션 없음").
  - 버그: 게스트 학생 접근 시 로그인 강제 – 대응: 세션 코드로 임시 게스트 role 할당 (임시 토큰 생성).
- **테스트 항목**: 보안 테스트 (잘못된 role로 접근 시도), 로드 테스트 (미들웨어 지연 측정). 성공 기준: 무단 접근 100% 차단.

### 단계 3: UI/UX 조정 (예상: 2일)
**목적**: 기존 레이아웃에 역할 변형 추가. 복잡도: 중간.
- **작업 목록**:
  1. layout.tsx 수정: role 확인 후 조건부 렌더링 (teacher: 사이드바 추가, student: 간단 헤더).
  2. Header.tsx 확장: role prop으로 메뉴 변형 (기존 컴포넌트 재사용).
  3. 테마 적용: CSS 변수로 색상 변경 (기존 globals.css 확장).
- **보존 포인트**: 새 레이아웃 파일 생성 피함, 기존 스타일 유지.
- **세부 구현**:
  - 루트 레이아웃: role 확인 후 해당 레이아웃 렌더링 (dynamic import).
  - 예: teacher layout – <Sidebar> with SessionList.tsx.
- **예상 버그 및 대응**:
  - 버그: 테마 충돌 (globals.css 오버라이드 실패) – 대응: !important 피하고 specificity 조정, 브라우저 devtools로 디버그.
  - 버그: 레이아웃 전환 시 hydration mismatch (SSR/CSR 불일치) – 대응: useEffect로 클라이언트 사이드 role 로드, Next.js dynamic rendering.
  - 버그: 모바일 뷰포트 이슈 – 대응: media queries 테스트 (Chrome DevTools), 사용자 에이전트 기반 폴백.
- **테스트 항목**: UI 테스트 (Storybook으로 컴포넌트 스냅샷), 크로스 브라우저/디바이스 테스트. 성공 기준: 역할별 UI 100% 구분.

### 단계 4: 기능 점검 및 최소 통합 (예상: 1-2일)
**목적**: 기존 기능 역할 맞춤 + 도구 통합 (선택적). 복잡도: 낮음.
- **작업 목록**:
  1. 기존 페이지 래핑: teacher/student pages에 RoleGuard 적용 (기능 변경 없음).
  2. 도구 통합: 기존 HTML을 React 컴포넌트로 마이그레이션 (e.g., scenario-creation.html → ScenarioCreation.tsx). iframe 대신 사용으로 일관된 UX/스타일 보장. 대안: 새 탭 링크 (iframe 피함).
  3. AI/세션 기능 테스트: 변경 후 원활 작동 확인.
- **보존 포인트**: 도구 변환 최소 (JS 이벤트만 React로), 기존 API 호출不变.

**도구 마이그레이션 vs iframe 설명**:
- **마이그레이션**: HTML 코드를 React 컴포넌트로 변환 (DOM 구조 유지, 이벤트 React화). 장점: 앱과 스타일/테마 통합, 접근성 향상, 보안 안전. 단점: 초기 개발 시간 (1-2시간/도구). 기존 기능 보존에 적합.
- **iframe**: HTML을 임베드 (별도 문서 로드). 장점: 빠른 구현. 단점: 스타일 충돌 (Tailwind 적용 안 됨), 보안 위험 (XSS), UX 저하 (스크롤/키보드 이슈), 모바일 호환성 문제. 사용자 선호에 따라 마이그레이션 권장.
- **세부 구현**:
  - 도구 예: debate-session.html → DebateSession 컴포넌트, props로 role 전달 (teacher: monitor mode, student: participate mode).
  - 공유 자료: /materials 페이지에 role-based permissions (useAuth hook).
- **예상 버그 및 대응**:
  - 버그: HTML 마이그레이션 시 JS 이벤트 손실 – 대응: React event handlers 재구현, 콘솔 에러 모니터링.
  - 버그: AI API 호출 실패 (rate limit) – 대응: retry logic (exponential backoff), fallback 메시지.
  - 버그: 실시간 동기화 지연/충돌 – 대응: optimistic updates (local state 먼저 변경), conflict resolution (last-write-wins).
  - 버그: 도구 접근 권한 오류 – 대응: RoleGuard 로그 추가, Sentry 같은 에러 트래킹 도입.
- **테스트 항목**: 통합 테스트 (도구 + AI), 부하 테스트 (동시 사용자 10명). 성공 기준: 모든 도구 역할별 작동.

### 단계 5: 테스트 및 배포 (예상: 1일)
**목적**: 기존 기능 보존 검증. 복잡도: 낮음.
- **작업 목록**:
  1. 전체 테스트: 단위/통합/E2E (기존 기능 중심).
  2. 사용자 테스트: 역할별 접근 시뮬레이션.
  3. 배포: 기존 환경에 업데이트 (변경 최소로).
- **세부 구현**: CI/CD 파이프라인 (GitHub Actions)으로 자동 테스트.
- **예상 버그 및 대응**:
  - 버그: 배포 시 환경 변수 누락 – 대응: .env.example 검증 스크립트.
  - 버그: 테스트 실패 (플레이크) – 대응: 재시도 옵션, mock 데이터 사용.
  - 버그: 프로덕션 에러 (CORS 등) – 대응: 로그 모니터링 (Firebase Console), hotfix 브랜치.
- **테스트 항목**: 코드 커버리지 80%+, 보안 스캔 (OWASP). 성공 기준: 버그 0개, 사용자 만족도 90%+.

## 4. 전체 타임라인 및 리소스
- **총 기간**: 6-8일 (최소 변경으로 단축).
- **주별 마일스톤**: 일별: Day1: 단계1, Day2-3: 단계2-3, Day4-5: 단계4, Day6: 단계5.
- **리소스**: 개발 도구 (VSCode, Next.js 14+), 라이브러리 (React Hook Form for forms), 비용 (AI API 사용량).
- **성공 지표**: 역할 분리 100%, 기존 기능 보존 100%, 버그 수정률 95%.

## 5. 위험 관리 및 후속 조치
- **주요 위험**: 시간 초과 – 대응: 주간 리뷰 미팅.
- **예상 버그 요약**: 인증(20%), UI(30%), 통합(50%) – 우선순위로 테스트.
- **후속**: 사용자 피드백 수집 후 v2 (e.g., 다중 역할 지원). 문서화 (README 업데이트).

본 계획서는 촘촘한 단계로 구현을 안내하며, 실제 개발 시 유연 조정 가능합니다. 이를 통해 프로그램의 교육적 가치가 크게 향상될 것입니다.

### 6. 부록
- **와이어프레임 스케치** (텍스트 기반, 최소 변경):
  - 기존 Layout + Role Variant: [Header(role-based) | Content (Protected by Guard)]
- **용어 사전**: Role Guard - 역할 기반 접근 제어 컴포넌트.
- **참조 문서**: Next.js Docs (App Router), Firebase Auth Guide.
- **변경 이력**:
  - v1.0: Initial draft.
  - v1.1: PRD 보완.
  - v1.2: 최소 변경 중심 수정 (기존 기능 보존 강조).
- **용어 사전**: Role Guard - 역할 기반 접근 제어 컴포넌트.
- **참조 문서**: Next.js Docs (App Router), Firebase Auth Guide.
- **변경 이력**:
  - v1.0: Initial draft.
  - v1.1: PRD 보완 (사용자 스토리, KPI 추가).

작성일: 2025-09-07 (수정: 2025-09-07)
작성자: AI 제품 매니저