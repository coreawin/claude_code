/**
 * 검색 데이터 (CORS 문제 해결을 위해 JS 파일로 제공)
 * common.js에서 로드됨
 */

const SEARCH_QUERIES = [
  {
    "id": "result_01",
    "label": "연비 좋은 SUV 추천해줘",
    "keywords": ["연비", "suv", "하이브리드", "친환경", "경제적", "기름값", "유류비", "절약", "효율", "연료", "소비", "hev", "이브"],
    "description": "연비 특화 하이브리드 SUV 추천"
  },
  {
    "id": "result_02",
    "label": "고성능 세단 보여줘",
    "keywords": ["고성능", "세단", "스포츠", "주행성능", "awd", "터보", "마력", "성능", "빠른", "운전", "다이나믹", "프리미엄", "럭셔리"],
    "description": "고성능 퍼포먼스 세단 추천"
  },
  {
    "id": "result_03",
    "label": "가족이랑 탈 7인승 차",
    "keywords": ["가족", "7인승", "대형", "넓은", "패밀리", "아이", "7인", "아들", "딸", "아이들", "여행", "공간", "실용"],
    "description": "패밀리카 대형 SUV 추천"
  },
  {
    "id": "result_04",
    "label": "수입차 중에 뭐가 좋아?",
    "keywords": ["수입", "수입차", "외제", "bmw", "벤츠", "렉서스", "독일", "유럽", "프리미엄", "고급", "럭셔리", "고품질"],
    "description": "수입 브랜드 추천"
  },
  {
    "id": "result_05",
    "label": "3천만원대 국산차",
    "keywords": ["국산", "저렴", "합리적", "경제적", "3천만", "4천만", "가성비", "저가", "가격", "저렴한", "싼", "비용"],
    "description": "합리적 가격 국산차 추천"
  }
];

const SEARCH_RESULTS = {
  "result_01": {
    "queryId": "result_01",
    "title": "연비 특화 하이브리드 SUV",
    "description": "출퇴근 거리가 긴 분께 특히 추천드립니다",
    "cars": [
      {
        "img": "sorento",
        "brand": "KIA",
        "name": "쏘렌토 하이브리드<br>시그니처",
        "spec": "1.6T HEV · 복합 16.0km/L",
        "price": "3,896만",
        "sub": "월 할부 약 75만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "연비 1위"
      },
      {
        "img": "tucson",
        "brand": "HYUNDAI",
        "name": "투싼 하이브리드<br>인스퍼레이션",
        "spec": "1.6T HEV · 복합 15.6km/L",
        "price": "2,990만",
        "sub": "월 할부 약 58만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "가성비 최고"
      },
      {
        "img": "nx350h",
        "brand": "LEXUS",
        "name": "NX 350h<br>F SPORT",
        "spec": "2.5L HEV · 복합 14.6km/L",
        "price": "6,560만",
        "sub": "월 할부 약 127만원 (60개월)",
        "tag": "수입HEV",
        "tagC": "tag-i",
        "highlight": "럭셔리 연비"
      },
      {
        "img": "santafe",
        "brand": "HYUNDAI",
        "name": "싼타페 하이브리드<br>캘리그래피",
        "spec": "1.6T HEV · 복합 14.2km/L",
        "price": "3,690만",
        "sub": "월 할부 약 71만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "7인승 연비"
      }
    ]
  },
  "result_02": {
    "queryId": "result_02",
    "title": "고성능 퍼포먼스 세단",
    "description": "드라이빙의 즐거움을 느낄 수 있는 세단들",
    "cars": [
      {
        "img": "g80",
        "brand": "GENESIS",
        "name": "G80 3.5T AWD<br>스포츠 패키지",
        "spec": "3.5L T-GDI · 380마력 · AWD",
        "price": "7,890만",
        "sub": "월 할부 약 153만원 (60개월)",
        "tag": "국산",
        "tagC": "tag-k",
        "highlight": "380마력 최고 출력"
      },
      {
        "img": "bmw5",
        "brand": "BMW",
        "name": "5시리즈 530i<br>xDrive M스포츠",
        "spec": "2.0L 터보 · 252마력 · AWD",
        "price": "8,230만",
        "sub": "월 할부 약 161만원 (60개월)",
        "tag": "수입",
        "tagC": "tag-i",
        "highlight": "독일의 정통 스포츠"
      },
      {
        "img": "k8",
        "brand": "KIA",
        "name": "K8 3.5 GDI<br>시그니처",
        "spec": "3.5L GDI · 300마력 · FWD",
        "price": "4,256만",
        "sub": "월 할부 약 82만원 (60개월)",
        "tag": "국산",
        "tagC": "tag-k",
        "highlight": "300마력 감각"
      },
      {
        "img": "grandeur",
        "brand": "HYUNDAI",
        "name": "그랜저 캘리그래피<br>3.5 GDI",
        "spec": "3.5L GDI · 304마력 · FWD",
        "price": "4,870만",
        "sub": "월 할부 약 94만원 (60개월)",
        "tag": "국산",
        "tagC": "tag-k",
        "highlight": "304마력 강력함"
      }
    ]
  },
  "result_03": {
    "queryId": "result_03",
    "title": "패밀리카 대형 SUV",
    "description": "가족 모두가 편하게 탈 수 있는 넓은 공간의 SUV",
    "cars": [
      {
        "img": "sorento",
        "brand": "KIA",
        "name": "쏘렌토 하이브리드<br>시그니처",
        "spec": "1.6T HEV · 7인승 · 복합 16.0km/L",
        "price": "3,896만",
        "sub": "월 할부 약 75만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "7인승 + 연비"
      },
      {
        "img": "santafe",
        "brand": "HYUNDAI",
        "name": "싼타페 하이브리드<br>캘리그래피",
        "spec": "1.6T HEV · 7인승 · 복합 14.2km/L",
        "price": "3,690만",
        "sub": "월 할부 약 71만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "패밀리 특화"
      },
      {
        "img": "tucson",
        "brand": "HYUNDAI",
        "name": "투싼 하이브리드<br>인스퍼레이션",
        "spec": "1.6T HEV · 5인승 · 복합 15.6km/L",
        "price": "2,990만",
        "sub": "월 할부 약 58만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "경제적 선택"
      }
    ]
  },
  "result_04": {
    "queryId": "result_04",
    "title": "수입 브랜드 추천",
    "description": "독일과 일본의 프리미엄 브랜드 추천",
    "cars": [
      {
        "img": "bmw5",
        "brand": "BMW",
        "name": "5시리즈 530i<br>xDrive M스포츠",
        "spec": "2.0L 터보 · 252마력 · AWD",
        "price": "8,230만",
        "sub": "월 할부 약 161만원 (60개월)",
        "tag": "수입",
        "tagC": "tag-i",
        "highlight": "독일 프리미엄"
      },
      {
        "img": "nx350h",
        "brand": "LEXUS",
        "name": "NX 350h<br>F SPORT",
        "spec": "2.5L HEV · 복합 14.6km/L",
        "price": "6,560만",
        "sub": "월 할부 약 127만원 (60개월)",
        "tag": "수입HEV",
        "tagC": "tag-i",
        "highlight": "렉서스 고급감"
      }
    ]
  },
  "result_05": {
    "queryId": "result_05",
    "title": "합리적 가격 국산차",
    "description": "3~4천만원대 가성비 최고의 국산차 추천",
    "cars": [
      {
        "img": "tucson",
        "brand": "HYUNDAI",
        "name": "투싼 하이브리드<br>인스퍼레이션",
        "spec": "1.6T HEV · 복합 15.6km/L",
        "price": "2,990만",
        "sub": "월 할부 약 58만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "2천만원대"
      },
      {
        "img": "santafe",
        "brand": "HYUNDAI",
        "name": "싼타페 하이브리드<br>캘리그래피",
        "spec": "1.6T HEV · 7인승 · 복합 14.2km/L",
        "price": "3,690만",
        "sub": "월 할부 약 71만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "7인승 가성비"
      },
      {
        "img": "sorento",
        "brand": "KIA",
        "name": "쏘렌토 하이브리드<br>시그니처",
        "spec": "1.6T HEV · 7인승 · 복합 16.0km/L",
        "price": "3,896만",
        "sub": "월 할부 약 75만원 (60개월)",
        "tag": "HEV",
        "tagC": "tag-h",
        "highlight": "합리적 선택"
      },
      {
        "img": "k8",
        "brand": "KIA",
        "name": "K8 3.5 GDI<br>시그니처",
        "spec": "3.5L GDI · 300마력 · FWD",
        "price": "4,256만",
        "sub": "월 할부 약 82만원 (60개월)",
        "tag": "국산",
        "tagC": "tag-k",
        "highlight": "세단 선택"
      }
    ]
  }
};

console.log('search_data.js 로드 완료 - SEARCH_QUERIES:', SEARCH_QUERIES.length, '개, SEARCH_RESULTS: 5개');
