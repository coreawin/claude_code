# Wooricapital Auto Recommendation Prototype

우리금융캐피탈 자동차 상품 추천 시스템 프로토타입

## 프로젝트 소개

사용자의 메타 정보(나이, 직업, 예산), 성향 정보(선호 기능, 우선순위), 그리고 신용등급 등을 바탕으로 맞춤형 자동차 상품을 추천하고, 결제 시 금융상품(차량 캐피탈 대출 상품)을 안내하는 프로토타입입니다.

## 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Data**: JSON (정적 데이터)
- **Deployment**: 정적 웹 페이지 (서버 불필요)
- **Browser**: 최신 Chrome, Firefox, Safari, Edge

## 프로젝트 구조

```
wooricapital/
├── src/                      # 웹 페이지 소스
│   ├── index.html           # 메인 페이지
│   ├── styles.css           # 스타일시트
│   └── script.js            # JavaScript 로직
├── assets/
│   ├── images/              # 자동차 이미지
│   └── icons/               # UI 아이콘
├── data/
│   ├── products.json        # 자동차 상품 데이터
│   └── financing.json       # 금융상품 데이터
├── docs/
│   ├── SPECIFICATION.md     # 프로젝트 명세서 ⭐ 필독
│   ├── QUESTIONS.md         # 의사결정 체크리스트
│   └── WIREFRAME.md         # 화면 설계 (예정)
├── CLAUDE.md                # 개발 가이드
└── README.md                # 이 파일
```

## 빠른 시작

### 1단계: 초기 화면 설계 확정

프로젝트를 시작하기 전에 다음을 확인하세요:

1. **명세서 검토**: [docs/SPECIFICATION.md](docs/SPECIFICATION.md)
2. **질문 사항 확인**: [docs/QUESTIONS.md](docs/QUESTIONS.md)
3. **초기 HTML 파일 제공**: `docs/WIREFRAME.md` 또는 `src/` 폴더에 저장

### 2단계: 필수 결정사항 확인

프로젝트 진행 전 다음 항목들을 확정해야 합니다:

✅ **반드시 결정할 사항** (개발 시작 전)

- 초기 화면 HTML 기획 파일
- 사용자 입력 폼의 필드 및 옵션 (Q2.1)
- 샘플 상품 데이터 (Q3.1)
- 금융상품 계산식 (Q4.1)
- 추천 알고리즘 방식 (Q3.2)

⏳ **선택적 결정사항** (개발 중 진행 가능)

- 디자인 스타일 (Q5.1)
- 폼 구성 방식: 한 페이지 vs 다단계 (Q5.2)
- 상품 표시 방식: 카드 vs 테이블 (Q5.3)
- 추가 기능 (Q7.1)

### 3단계: 개발 시작

필수 사항이 확정되면, Claude Code가 다음 순서로 개발합니다:

1. **Phase 1**: HTML 구조 + CSS 기본 스타일 + 샘플 데이터
2. **Phase 2**: 사용자 입력 수집 + 상품 필터링 + 추천 알고리즘
3. **Phase 3**: 인터랙티브 기능 (검색, 정렬, 필터링)
4. **Phase 4**: 금융상품 안내 화면 + 월 납부금 계산
5. **Phase 5**: 통합 테스트 + 최적화

## 주요 기능

### 🎯 사용자 정보 수집
- 기본 정보 (이름, 나이, 직업)
- 재정 정보 (예산, 월 수입, 신용등급)
- 성향 정보 (선호 옵션별 우선순위)
- 차량 유형 선택

### 💡 상품 추천
- 사용자 조건에 맞는 상품 필터링
- 성향 기반 우선순위 매김
- 상위 추천 상품 표시

### 🔍 인터랙티브 기능
- 실시간 검색/필터링
- 정렬 (가격, 추천도, 연비)
- 상품 비교 (선택 사항)

### 💰 금융상품 안내
- 신용등급별 대출 옵션
- 예상 월 납부금 자동 계산
- 다양한 대출 기간 비교

## 사용 방법

### 브라우저에서 직접 열기
```bash
# 로컬 폴더 열기
# Windows: wooricapital 폴더 → src/index.html 더블클릭

# 또는 Mac/Linux에서
open src/index.html
```

### 간단한 웹서버 필요 시
```bash
# Node.js 설치되어 있다면
npx http-server

# 또는 Python 3
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

## 개발 참고사항

### 코드 스타일
- HTML: 의미론적 구조 (semantic HTML5)
- CSS: BEM 또는 간단한 naming convention
- JavaScript: ES6+, 모듈화 권장

### 데이터 관리
- 모든 정적 데이터는 `data/` 폴더의 JSON 파일로 관리
- 클라이언트 사이드에서 fetch() 또는 직접 로드

### 성능
- 데이터 크기가 작으므로 별도 최적화 불필요
- 필요시 localStorage로 사용자 입력값 저장 가능

## 추후 확장

현재는 프로토타입이므로 다음과 같이 확장 가능:

- **백엔드 연동**: 금융상품 실시간 조회
- **결제 시스템**: 신청 및 계약 프로세스
- **사용자 계정**: 저장, 추천 이력 관리
- **A/B 테스트**: 다양한 추천 알고리즘 검증

## 관련 문서

- [CLAUDE.md](CLAUDE.md) - 개발 가이드 및 기술 정보
- [docs/SPECIFICATION.md](docs/SPECIFICATION.md) - 상세 명세서
- [docs/QUESTIONS.md](docs/QUESTIONS.md) - 의사결정 체크리스트
- [docs/WIREFRAME.md](docs/WIREFRAME.md) - 초기 화면 설계 (예정)

## 문의 및 피드백

프로젝트 진행 중 질문이나 수정사항은 [docs/QUESTIONS.md](docs/QUESTIONS.md)의 해당 섹션에 기록해주세요.

---

**프로젝트 생성**: 2026-04-03  
**상태**: 🔨 초기 구성 완료, 개발 대기 중
