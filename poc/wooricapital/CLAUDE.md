# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 프로젝트 개요

**Wooricapital Auto Recommendation Prototype** - 우리금융캐피탈 자동차 상품 추천 프로토타입

### 목표
- 사용자의 메타 정보, 성향, 주어진 정보를 바탕으로 자동차 상품 추천
- 결제 시 금융 상품(차량 캐피탈 대출 상품 등) 안내
- 경량한 순수 HTML/CSS/JS 구현 (웹서버 최소화)
- 클라이언트 사이드 검색/필터링으로 인터랙티브 기능 구현

---

## 폴더 구조

```
wooricapital/
├── src/                    # 웹 페이지 소스
│   ├── index.html         # 메인 페이지 (진입점)
│   ├── styles.css         # 스타일시트
│   └── script.js          # JavaScript 로직
├── assets/
│   ├── images/            # 자동차, 상품 이미지
│   └── icons/             # UI 아이콘
├── data/
│   ├── products.json      # 자동차 상품 데이터
│   └── financing.json     # 금융 상품 데이터
├── docs/
│   ├── SPECIFICATION.md   # 프로젝트 명세서
│   ├── QUESTIONS.md       # 추후 질문 및 의사결정 사항
│   └── WIREFRAME.md       # 화면 설계 문서
├── CLAUDE.md              # 이 파일
└── README.md              # 프로젝트 개요
```

---

## 개발 원칙

### 1. 경량성 (Lightweight)
- 외부 라이브러리 최소화 (필요시 CDN으로만 제공)
- 순수 HTML/CSS/JavaScript 선호
- 서버 없이 클라이언트 사이드에서 모든 처리

### 2. 프로토타입 품질
- 기능 완성도 > 코드 최적화
- 빠른 반복 개발 가능한 구조
- 디자인은 기능 검증에 충분한 수준 (완벽한 UI/UX 불필요)

### 3. 구조화
- HTML은 의미론적 구조 유지
- CSS는 BEM 또는 간단한 naming convention
- JavaScript는 모듈화 (필요시 IIFE 또는 ES6 modules)
- 데이터는 JSON으로 별도 관리

---

## 주요 기능 영역

| 영역 | 파일 | 설명 |
|------|------|------|
| 사용자 정보 수집 | src/index.html | 메타 정보, 성향, 예산 등 입력 폼 |
| 상품 필터링 | src/script.js | 사용자 정보 기반 상품 필터링 로직 |
| 상품 추천 | src/script.js | 추천 알고리즘 (가중치 기반) |
| 금융 상품 안내 | src/index.html + script.js | 결제 시 대출 상품 제시 |
| 데이터 관리 | data/*.json | 자동차, 금융상품 마스터 데이터 |

---

## 개발 시 참고사항

### HTML 파일 명명
- 메인: `index.html`
- 필요시 추가 페이지: `recommendation.html`, `financing.html` 등

### 데이터 포맷 (JSON)
상품 데이터는 다음과 같은 구조로 관리:
```json
{
  "id": "unique-id",
  "name": "상품명",
  "category": "분류",
  "price": 10000000,
  "features": ["특징1", "특징2"],
  "tags": ["tag1", "tag2"],
  "recommendScore": 0
}
```

### 인터랙티브 기능 구현
- 폼 입력 → 즉시 필터링 (change 이벤트)
- 검색 기능 (클라이언트 사이드 텍스트 검색)
- 정렬/필터 (배열 메서드 활용)

### 웹서버 필요 시
간단한 local server 테스트만 필요:
```bash
# Node.js가 있다면
npx http-server

# 또는 Python
python -m http.server 8000
```

---

## 추후 질문 및 결정사항

프로젝트 진행 중 다음과 같은 항목들이 결정되어야 합니다:
- [docs/QUESTIONS.md](docs/QUESTIONS.md) 참고
