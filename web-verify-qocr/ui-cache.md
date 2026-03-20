# OCR Dashboard UI 캐시 (재활용 정보)

> 검증 과정에서 파악된 UI 구조 정보를 저장합니다.
> verify.js 작성 시 이 파일을 먼저 참조하면 inspect 과정을 생략할 수 있습니다.

---

## 로그인 페이지 (`/ko/login`)

| 요소 | 셀렉터 | 비고 |
|------|--------|------|
| 아이디 입력 | `input[placeholder="example"]` | type=text |
| 비밀번호 입력 | `input[type="password"]` | |
| 로그인 버튼 | `button:has-text("로그인")` | type=submit |
| 로그인 성공 판정 | URL에 `/workspaces` 포함 | |

**스크린샷**: `web-verify-report/screenshots/01_login_page.png`

---

## 공통 레이아웃 (로그인 후)

| 요소 | 셀렉터 | 비고 |
|------|--------|------|
| 사이드바 컨테이너 | `[data-slot="sidebar"]` | nav 태그는 링크 없음 주의 |
| 사이드바 링크 | `[data-slot="sidebar"] a[href="/workspaces"]` | href에 `/ko` prefix 없음 |
| React 하이드레이션 대기 | `a[href*="workspaces"]` waitForSelector | networkidle 후에도 필요 |

> ⚠️ 사이드바 링크 클릭 시 `/en/` 로케일로 전환됨 → `page.goto('/ko/...')` 직접 이동 사용

---

## 워크스페이스 페이지 (`/ko/workspaces`)

### 페이지 버튼
| 버튼 | 셀렉터 | 비고 |
|------|--------|------|
| 워크스페이스 추가 | `button:has-text("워크스페이스 추가").first()` | 우측 상단 |
| 업로드 | `button:has-text("업로드")` | |

### 워크스페이스 생성 다이얼로그
다이얼로그 제목: **"워크스페이스 생성"**

| 요소 | 셀렉터 | 비고 |
|------|--------|------|
| 제목 입력 | `input#title` | placeholder="워크스페이스 제목을 입력하세요" |
| 모델 유형 | `button:has-text("Layout Detection")` | 기본값 Layout Detection 선택됨 |
| 취소 버튼 | `button:has-text("취소")` | |
| 추가 확인 버튼 | `button:has-text("워크스페이스 추가").last()` | dialog 내 확인 버튼 |

**스크린샷**: `web-verify-report/screenshots/05_workspace_dialog_open.png`

### 네비게이션 주의사항
- 로그인 후 이미 `/ko/workspaces`에 있으므로 `goto()` 재호출 시 타임아웃 발생
- 해결: `if (!page.url().includes('/workspaces'))` 조건 후 `domcontentloaded` 사용

---

## 메뉴 전체 경로 (inspect 결과)

| 메뉴명 | href (sidebar) | 직접 이동 URL |
|--------|---------------|--------------|
| 워크스페이스 | `/workspaces` | `/ko/workspaces` |
| 목록 및 관리 | `/models` | `/ko/models` |
| 학습 | `/models/train` | `/ko/models/train` |
| API 설정 | `/models/default` | `/ko/models/default` |
| 학습 진행 상태 | `/monitoring/train` | `/ko/monitoring/train` |
| 데모 | `/monitoring/demo` | `/ko/monitoring/demo` |
| 비교 데모 | `/monitoring/demo-comparison` | `/ko/monitoring/demo-comparison` |
| 로그 조회 | `/monitoring/logs` | `/ko/monitoring/logs` |

---

## 재활용 방법

spec 파일(`web-verfity-qocr-spec.md`)에서 새 항목 작성 시:
1. 이 파일에서 해당 페이지 셀렉터 먼저 확인
2. 이미 파악된 UI면 inspect 스크립트 실행 없이 바로 verify.js 작성
3. 새로운 다이얼로그/UI 발견 시 이 파일에 추가
