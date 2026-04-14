# 데이터 구조 가이드

## 1. 자동차 상품 데이터 (data/products.json)

화면 구조에 맞는 최적화된 자동차 상품 데이터 구조입니다.

```json
{
  "id": "g80",                          // 고유 ID (이미지 키와 동일)
  "img": "g80",                         // 이미지 파일명 (assets/images/{img}.png)
  "brand": "GENESIS",                   // 브랜드명
  "name": "G80 3.5T AWD 스포츠",       // 모델 풀 네임
  "spec": "3.5L T-GDI · 380마력",      // 엔진/파워 스펙
  "price": "7,890만원~",                // 포맷된 가격 (UI 표시용)
  "priceNum": 78900000,                 // 숫자 가격 (필터링용)
  "tag": "국산",                        // UI 태그
  "tagC": "tag-k",                      // 태그 CSS 클래스 (tag-k, tag-i, tag-h)
  "type": "sedan",                      // 차종 (sedan, suv)
  "priority": "performance",             // 우선순위 (performance, economy, any)
  "fuelType": "가솔린",                 // 연료타입 (가솔린, 하이브리드)
  "fuelEfficiency": "9.2km/L",          // 연비
  "seats": 5,                           // 정원
  "features": [                         // 주요 특징 배열
    "AWD",
    "380마력",
    "스포츠 패키지",
    "파노라마 선루프"
  ],
  "keywords": [                         // 자연어 검색용 키워드
    "제네시스",
    "G80",
    "세단",
    "고성능",
    "주행성능",
    "국산",
    "럭셔리",
    "AWD",
    "고급",
    "프리미엄"
  ]
}
```

### 필드 설명

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| id | string | 고유 ID (이미지 파일명과 동일) | "g80" |
| img | string | 이미지 파일명 | "g80" |
| brand | string | 제조사 브랜드 | "GENESIS", "BMW", "KIA", "HYUNDAI", "LEXUS" |
| name | string | 모델 풀 네임 | "G80 3.5T AWD 스포츠" |
| spec | string | 엔진/성능 스펙 | "3.5L T-GDI · 380마력" |
| price | string | 포맷된 가격 (UI용) | "7,890만원~" |
| priceNum | number | 숫자 가격 (정렬/필터링용) | 78900000 |
| tag | string | UI 태그 | "국산", "수입", "HEV", "수입HEV" |
| tagC | string | 태그 CSS 클래스 | "tag-k" (파랑), "tag-i" (주황), "tag-h" (초록) |
| type | string | 차종 분류 | "sedan" 또는 "suv" |
| priority | string | 추천 우선순위 | "performance", "economy", "any" |
| fuelType | string | 연료타입 | "가솔린", "하이브리드" |
| fuelEfficiency | string | 연비 | "9.2km/L", "15.6km/L" |
| seats | number | 정원 | 5, 7 |
| features | array | 주요 특징 리스트 | ["AWD", "380마력", "스포츠 패키지"] |
| keywords | array | 자연어 검색 키워드 | ["제네시스", "G80", "세단", ...] |

---

## 2. 자연어 검색 매핑 (src/script.js)

검색바에 입력된 자연어를 필터 객체로 변환하는 매핑입니다.

### 검색어 → 필터 맵핑

```javascript
const searchMap = {
  // 차종
  '세단': { type: 'sedan' },
  'suv': { type: 'suv' },

  // 연비/환경
  '연비': { keyword: 'economy', fuelType: '하이브리드' },
  '하이브리드': { fuelType: '하이브리드' },
  '친환경': { fuelType: '하이브리드' },
  '경제적': { priority: 'economy' },

  // 성능
  '고성능': { priority: 'performance' },
  '스포츠': { priority: 'performance' },
  'awd': { keyword: 'AWD' },

  // 가격대
  '비싼': { priceMin: 60000000 },
  '저가': { priceMax: 40000000 },
  '합리적': { priceMax: 50000000 },

  // 인원수
  '가족': { seats: 7 },
  '7인': { seats: 7 },

  // 브랜드
  '제네시스': { brand: 'GENESIS' },
  '현대': { brand: 'HYUNDAI' },
  '기아': { brand: 'KIA' },
  'bmw': { brand: 'BMW' },
  '렉서스': { brand: 'LEXUS' },
}
```

### 검색 필터 객체 구조

```javascript
{
  type: 'sedan',              // 차종 필터
  fuelType: '하이브리드',     // 연료타입 필터
  priority: 'performance',     // 우선순위 필터
  brand: 'GENESIS',           // 브랜드 필터
  tag: '국산',                // 태그 필터
  seats: 7,                   // 최소 정원
  priceMin: 40000000,         // 최소 가격
  priceMax: 60000000,         // 최대 가격
  keyword: ['awd', 'hev']     // 키워드 배열 필터
}
```

### 검색 예시

| 검색어 | 필터 | 결과 |
|--------|------|------|
| "연비 좋은 SUV" | `{ fuelType: '하이브리드', type: 'suv' }` | 하이브리드 SUV만 표시 |
| "비싼 세단" | `{ priceMin: 60000000, type: 'sedan' }` | 6천만원 이상 세단 표시 |
| "가족 7인" | `{ seats: 7 }` | 7인승 차량만 표시 |
| "현대 하이브리드" | `{ brand: 'HYUNDAI', fuelType: '하이브리드' }` | 현대 하이브리드만 표시 |
| "고성능 awd" | `{ priority: 'performance', keyword: 'AWD' }` | 고성능 AWD 차량만 표시 |

---

## 3. 고객 정보 데이터 (data/customers.json)

사용자 프로필 정보 및 선호도 가중치입니다.

```json
{
  "id": "cust_001",
  "name": "김준호",
  "gender": "남",
  "age": "30대",
  "creditScore": 930,
  "currentCar": "더뉴스포티지(NQ5)",
  "expectedFeature": "주행성능",
  "preferredCarType": "세단",
  "preferences": {
    "performance": 9,    // 주행성능: 1~10
    "efficiency": 6,     // 연비: 1~10
    "design": 7,         // 디자인: 1~10
    "safety": 8,         // 안전성: 1~10
    "comfort": 7         // 편의성: 1~10
  },
  "isGuest": false,
  "avatar": "👨"
}
```

### 추천 알고리즘

1. **고객 선호도 가중치** × **상품 평가 가중치** 계산
2. 차종 일치 시 보너스 점수 추가
3. 높은 점수순 정렬

```javascript
// 예시: 고객 선호도와 상품 가중치
고객 선호도: { performance: 9, efficiency: 6, design: 7, safety: 8, comfort: 7 }
상품 가중치: { performance: 8, efficiency: 9, design: 7, safety: 9, comfort: 8 }

추천 점수 = (9*8 + 6*9 + 7*7 + 8*9 + 7*8) / 5 = 72.8 / 5 = 14.56
```

---

## 4. 고객별 추천 전략

### 고객A - 김준호 (성능 중심)
- **선호도**: 성능(9) > 안전(8) > 디자인(7) = 편의(7)
- **우선차종**: 세단
- **추천 차량**: G80, BMW 5시리즈, K8

### 고객B - 이수진 (연비 중심)
- **선호도**: 연비(10) > 안전(9) = 편의(8) > 디자인(8)
- **우선차종**: SUV
- **추천 차량**: 쏘렌토, 투싼, NX350h

### 고객C - 최승훈 (비회원/인기차량)
- **선호도**: 모두 5점 (균형)
- **우선차종**: 전체
- **추천 차량**: 인기순 (상위 4개)

---

## 5. 새 자동차 추가 체크리스트

기존 자동차를 추가할 때 확인해야 할 항목:

```json
{
  "id": "new_car",
  "img": "new_car",           // ✓ assets/images/new_car.png 파일 생성?
  "brand": "BRAND",           // ✓ 기존 브랜드와 일치?
  "name": "Full Name",        // ✓ 길이 적절? (30자 이하)
  "spec": "...",              // ✓ 엔진/파워 정보 포함?
  "price": "...",             // ✓ "숫자만원~" 형식?
  "priceNum": 0,              // ✓ price와 일치?
  "tag": "국산|수입|HEV|수입HEV", // ✓ 정확한 태그?
  "tagC": "tag-k|tag-i|tag-h", // ✓ 올바른 CSS 클래스?
  "type": "sedan|suv",        // ✓ 차종 정확?
  "priority": "performance|economy|any", // ✓ 우선순위 설정?
  "fuelType": "가솔린|하이브리드", // ✓ 연료타입 정확?
  "fuelEfficiency": "X.Xkm/L", // ✓ 실제 연비값?
  "seats": 5|7,               // ✓ 정원 정확?
  "features": [],             // ✓ 3~5개 주요 특징?
  "keywords": []              // ✓ 10개 이상 검색 키워드?
}
```

---

## 6. 검색 성능 최적화

현재 구현:
- **배열 순회**: O(n) - 8개 차량이므로 무시할 수 있음
- **필터 비교**: 단순 === 또는 includes() 사용
- **캐싱**: 없음 (필요시 추가 가능)

향후 확장 시 고려사항:
- 차량 수 > 1000대: 인덱싱 필요
- 실시간 검색: 레이트 스로틀링 추가
- 자동완성: 트라이(Trie) 자료구조 고려

---

## 7. 차종/브랜드 확장 가능 목록

### 차종 (type)
- sedan (세단) ✓
- suv (SUV) ✓
- mpv (미니밴/MPV) - 예약
- coupe (쿠페) - 예약
- hatchback (해치백) - 예약

### 브랜드
- GENESIS ✓
- BMW ✓
- KIA ✓
- HYUNDAI ✓
- LEXUS ✓
- 추가 가능: Mercedes-Benz, Audi, Volvo 등

### 연료타입
- 가솔린 ✓
- 하이브리드 ✓
- 디젤 - 예약
- 전기(EV) - 예약
- 수소(FCEV) - 예약
