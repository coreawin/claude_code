# CLAUDE.md

Claude Code (claude.ai/code)가 이 저장소의 코드를 작업할 때 참고할 지침입니다.

## 프로젝트 개요

[프로젝트 설명, 기술 스택, 주요 목적을 작성하세요]

## 설치 및 개발 환경

### 필수 요구사항
- [필요한 도구와 버전을 나열하세요]
  - 예시: Node.js 18+, Python 3.10+, Docker 등

### 설치 방법
```bash
# 프로젝트별 설치 명령어를 작성하세요
# 예시:
# npm install
# pip install -r requirements.txt
```

### 프로젝트 실행
```bash
# 개발 서버 시작 명령어를 작성하세요
# 예시:
# npm run dev
# python manage.py runserver
```

## 테스트

### 전체 테스트 실행
```bash
# 예시: npm test, pytest 등
```

### 단일 테스트 실행
```bash
# 예시: npm test -- fileName.test.js
```

### 커버리지 확인
```bash
# 예시: npm test -- --coverage
```

## 빌드 및 배포

### 프로덕션 빌드
```bash
# 예시: npm run build, cargo build --release 등
```

### 코드 품질 검사
```bash
# 린팅 명령어를 작성하세요
# 예시: npm run lint, black ., cargo fmt 등
```

## 아키텍처

### 전체 구조
```
[주요 아키텍처 패턴과 구조를 작성하세요]

예시:
- Backend: REST API (Express/Flask/Spring Boot)
- Frontend: [프레임워크] components
- Database: [데이터베이스 타입과 스키마 설명]
```

### 주요 컴포넌트
- **[컴포넌트명]**: [목적과 책임 설명]
- **[컴포넌트명]**: [목적과 책임 설명]

### 중요한 설계 결정사항
- [주요 아키텍처 선택과 이유를 기록하세요]

## 파일 구조

```
[의미 있는 디렉토리 구조를 작성하세요]

예시:
src/
  ├── api/           # REST endpoints
  ├── models/        # Data models
  ├── services/      # Business logic
  └── utils/         # Shared utilities
```

## 환경 변수

[필요한 환경 변수와 목적을 기록하세요]

예시:
```
DATABASE_URL=          # PostgreSQL 연결 문자열
API_KEY=              # 외부 서비스 API 키
DEBUG=                # 디버그 로깅 활성화
```

## 자주 사용하는 명령어

| 작업 | 명령어 |
|------|--------|
| 개발 서버 시작 | `[command]` |
| 테스트 실행 | `[command]` |
| 빌드 | `[command]` |
| 코드 검사 | `[command]` |
| 배포 | `[command]` |

## 참고 문서

- [README.md 링크 (있으면)]
- [API 문서 링크 (있으면)]
- [설정 가이드 링크 (있으면)]

## 향후 개발자를 위한 참고사항

[이 프로젝트의 특수한 통찰, 주의사항, 중요한 배경정보 등을 기록하세요. 이는 향후 Claude 인스턴스가 더 효율적으로 작업하는 데 도움이 됩니다]
