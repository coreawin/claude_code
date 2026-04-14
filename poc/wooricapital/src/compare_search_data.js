/**
 * 비교 사용자(B, 수진) 관점의 검색결과 데이터
 * 연비·실용성 우선으로 구성 (A사용자 SEARCH_RESULTS와 쿼리ID 동일)
 */

var COMPARE_SEARCH_RESULTS = {
  "result_01": {
    queryId: "result_01",
    title: "수진님 추천 · 연비 특화 하이브리드 SUV",
    description: "연비·실용성 우선으로 재정렬된 결과",
    cars: [
      { img: "tucson",  brand: "HYUNDAI", name: "투싼<br>하이브리드",   spec: "1.6T HEV 4WD",      price: "3,247만원~", sub: "월 할부 약 67만원 (60개월)",  tag: "HEV",    tagC: "tag-h", highlight: "연비 15.6km/L · 소형 SUV 1위" },
      { img: "sorento", brand: "KIA",     name: "쏘렌토<br>하이브리드", spec: "1.6T HEV 7인승",    price: "3,890만원~", sub: "월 할부 약 78만원 (60개월)",  tag: "HEV",    tagC: "tag-h", highlight: "패밀리 SUV · 7인승 실용성" },
      { img: "santafe", brand: "HYUNDAI", name: "싼타페<br>하이브리드", spec: "1.6T HEV 7인승",    price: "4,110만원~", sub: "월 할부 약 83만원 (60개월)",  tag: "HEV",    tagC: "tag-h", highlight: "대형 패밀리카 · 넓은 공간" },
      { img: "nx350h",  brand: "LEXUS",   name: "NX 350h<br>F SPORT",  spec: "2.5 HEV AWD",       price: "6,530만원~", sub: "월 할부 약 127만원 (60개월)", tag: "수입HEV", tagC: "tag-i", highlight: "프리미엄 HEV · 정숙성 최고" }
    ]
  },
  "result_02": {
    queryId: "result_02",
    title: "수진님 추천 · 고성능 세단",
    description: "가성비 높은 고성능 세단 중심",
    cars: [
      { img: "k8",       brand: "KIA",     name: "K8<br>3.5 GDI",        spec: "3.5 GDI 시그니처",    price: "4,302만원~", sub: "월 할부 약 86만원 (60개월)",  tag: "국산", tagC: "tag-k", highlight: "국산 대형 세단 가성비 1위" },
      { img: "grandeur", brand: "HYUNDAI", name: "그랜저<br>캘리그래피",  spec: "3.5 GDI 캘리그래피", price: "4,750만원~", sub: "월 할부 약 95만원 (60개월)",  tag: "국산", tagC: "tag-k", highlight: "국민 세단 · 편의사양 풍부" },
      { img: "bmw5",     brand: "BMW",     name: "5시리즈<br>530i",       spec: "530i xDrive M스포츠", price: "7,260만원~", sub: "월 할부 약 142만원 (60개월)", tag: "수입", tagC: "tag-i", highlight: "수입 세단 엔트리 · 승차감" },
      { img: "g80",      brand: "GENESIS", name: "G80<br>3.5T AWD",      spec: "3.5T AWD 스포츠",     price: "8,190만원~", sub: "월 할부 약 162만원 (60개월)", tag: "국산", tagC: "tag-k", highlight: "국산 프리미엄 플래그십" }
    ]
  },
  "result_03": {
    queryId: "result_03",
    title: "수진님 추천 · 패밀리카 7인승",
    description: "실용적인 패밀리카 우선 추천",
    cars: [
      { img: "tucson",  brand: "HYUNDAI", name: "투싼<br>하이브리드",   spec: "1.6T HEV 4WD",   price: "3,247만원~", sub: "월 할부 약 67만원 (60개월)", tag: "HEV", tagC: "tag-h", highlight: "소형 패밀리 SUV · 연비 우수" },
      { img: "santafe", brand: "HYUNDAI", name: "싼타페<br>하이브리드", spec: "1.6T HEV 7인승", price: "4,110만원~", sub: "월 할부 약 83만원 (60개월)", tag: "HEV", tagC: "tag-h", highlight: "넓은 공간 · 7인승 패밀리카" },
      { img: "sorento", brand: "KIA",     name: "쏘렌토<br>하이브리드", spec: "1.6T HEV 7인승", price: "3,890만원~", sub: "월 할부 약 78만원 (60개월)", tag: "HEV", tagC: "tag-h", highlight: "KIA 대표 패밀리카 · 7인승" }
    ]
  },
  "result_04": {
    queryId: "result_04",
    title: "수진님 추천 · 수입차",
    description: "실용성 높은 수입 HEV 중심",
    cars: [
      { img: "nx350h", brand: "LEXUS", name: "NX 350h<br>F SPORT", spec: "2.5 HEV AWD",       price: "6,530만원~", sub: "월 할부 약 127만원 (60개월)", tag: "수입HEV", tagC: "tag-i", highlight: "렉서스 입문 · 연비+프리미엄" },
      { img: "bmw5",   brand: "BMW",   name: "5시리즈<br>530i",    spec: "530i xDrive M스포츠", price: "7,260만원~", sub: "월 할부 약 142만원 (60개월)", tag: "수입",   tagC: "tag-i", highlight: "수입 세단 대표 · 주행 편의" }
    ]
  },
  "result_05": {
    queryId: "result_05",
    title: "수진님 추천 · 3천만원대 국산차",
    description: "합리적 가격 + 연비 중심 국산차",
    cars: [
      { img: "tucson",  brand: "HYUNDAI", name: "투싼<br>하이브리드",   spec: "1.6T HEV 4WD",    price: "3,247만원~", sub: "월 할부 약 67만원 (60개월)", tag: "HEV", tagC: "tag-h", highlight: "가성비 최강 HEV SUV" },
      { img: "sorento", brand: "KIA",     name: "쏘렌토<br>하이브리드", spec: "1.6T HEV",         price: "3,890만원~", sub: "월 할부 약 78만원 (60개월)", tag: "HEV", tagC: "tag-h", highlight: "3천만원대 7인승 최강" },
      { img: "santafe", brand: "HYUNDAI", name: "싼타페<br>하이브리드", spec: "1.6T HEV 7인승",  price: "4,110만원~", sub: "월 할부 약 83만원 (60개월)", tag: "HEV", tagC: "tag-h", highlight: "대형 SUV 국산 대표" },
      { img: "k8",      brand: "KIA",     name: "K8<br>3.5 GDI",       spec: "3.5 GDI",          price: "4,302만원~", sub: "월 할부 약 86만원 (60개월)", tag: "국산", tagC: "tag-k", highlight: "대형 세단 가성비 No.1" }
    ]
  }
};

console.log('compare_search_data.js 로드 완료');
