/**
 * 회원 페이지 로직
 * member.html에서 로드됨
 */

// ============================================
// 고객 데이터
// ============================================

const DATA = {
  A: {
    avatar: '👨',
    name: '김준호',
    meta: '38세 · 남성 · 금융권 대리',
    interest: '세단 (주행성능)',
    creditScore: 930,
    creditGrade: '우수등급',
    loanMax: '최대 8,500만',
    currentCar: '기아 스포티지 NQ5',
    recommendedCars: ['g80', 'bmw5', 'k8', 'grandeur'],
    bannerBg: 'linear-gradient(130deg,#0d1b4b 0%,#1a3278 45%,#2563eb 80%,#5a8dee 100%)',
    bannerText: {
      title: '준호님의 가치를 담은<br>프리미엄 세단',
      subtitle: '고성능과 럭셔리를 동시에 누릴 수 있는 세단 4종을 추천드립니다.',
      badge: '고성능 세단 추천'
    },
    journey: {
      '검색': [
        { tag: '고성능', name: 'Genesis G80', cat: '세단 검색' },
        { tag: '프리미엄', name: 'BMW 5시리즈', cat: '성능 검색' },
        { tag: '가성비', name: 'KIA K8', cat: '국산차 검색' }
      ],
      '클릭': [
        { tag: '상세보기', name: 'Genesis G80 상세', cat: '차량 상세 조회' },
        { tag: '스펙확인', name: 'BMW 5 스펙보기', cat: '사양 확인' }
      ],
      '찜': [
        { tag: '찜', name: 'Genesis G80', cat: '찜한 차량' },
        { tag: '찜', name: 'KIA K8', cat: '찜한 차량' }
      ],
      '담기': [
        { tag: '담기', name: 'Genesis G80', cat: '장바구니 추가' }
      ],
      '구매': []
    }
  },
  B: {
    avatar: '👩',
    name: '이수진',
    meta: '28세 · 여성 · IT 개발자',
    interest: 'SUV (연비 효율)',
    creditScore: 885,
    creditGrade: '우수등급',
    loanMax: '최대 6,500만',
    currentCar: '현대 투싼 NX4',
    recommendedCars: ['sorento', 'tucson', 'nx350h', 'santafe'],
    bannerBg: 'linear-gradient(130deg,#0a4d2c 0%,#16a34a 45%,#22c55e 80%,#86efac 100%)',
    bannerText: {
      title: '수진님을 위한<br>효율적 SUV',
      subtitle: '출퇴근과 주말 나들이를 함께 하는 연비 좋은 SUV를 추천드립니다.',
      badge: '하이브리드 SUV 추천'
    },
    journey: {
      '검색': [
        { tag: '연비', name: 'KIA 쏘렌토 HEV', cat: 'SUV 검색' },
        { tag: '친환경', name: 'Hyundai 싼타페', cat: '하이브리드 검색' },
        { tag: '가족차', name: 'Lexus NX 350h', cat: '럭셔리 검색' }
      ],
      '클릭': [
        { tag: '상세보기', name: 'KIA 쏘렌토 상세', cat: '차량 상세 조회' },
        { tag: '스펙확인', name: 'Hyundai 싼타페 스펙', cat: '사양 확인' }
      ],
      '찜': [
        { tag: '찜', name: 'KIA 쏘렌토', cat: '찜한 차량' },
        { tag: '찜', name: 'Hyundai 투싼', cat: '찜한 차량' }
      ],
      '담기': [
        { tag: '담기', name: 'Hyundai 투싼', cat: '장바구니 추가' }
      ],
      '구매': []
    }
  }
};

// ============================================
// 상태 관리
// ============================================

let currentUser = 'A';
let compareUser = 'none';

// ============================================
// 초기화
// ============================================

window.addEventListener('DOMContentLoaded', function() {
  // 검색 시스템 초기화
  const initResult = initSearch();
  if (initResult) {
    console.log('✅ 검색 시스템 초기화 완료');
  }

  // 첫 번째 사용자로 렌더링
  renderMain();

  // 검색 입력 이벤트
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      handleSearchInput(e.target.value);
    });
  }

  console.log('member.js 로드 완료');
});

// ============================================
// UI 렌더링
// ============================================

/**
 * 메인 콘텐츠 렌더링 (추천 차량)
 */
function renderMain() {
  const customer = DATA[currentUser];
  const recommendedSection = document.getElementById('recommended-section');

  if (!recommendedSection) return;

  // 배너
  const bannerHtml = `
    <div class="banner" style="background: ${customer.bannerBg};">
      <div class="banner-txt">
        <h2>${customer.bannerText.title}</h2>
        <p>${customer.bannerText.subtitle}</p>
        <span class="banner-badge">${customer.bannerText.badge}</span>
      </div>
      <div class="banner-deco">🚗</div>
    </div>
  `;

  // 추천 차량 섹션
  const carGridHtml = `
    <div class="sec-label">
      <span class="badge badge-${currentUser.toLowerCase()}">${currentUser}사용자</span>
      <span class="sec-title">추천 <span style="color: ${currentUser === 'A' ? '#1a56db' : '#28c76f'}">차량</span></span>
    </div>
    <div class="car-grid">
      ${customer.recommendedCars.map(carKey => {
        const car = getCarFromAllResults(carKey);
        if (!car) return '';
        return `
          <div class="car-card" onclick="viewDetails('${carKey}')">
            <div class="car-img">
              <img src="${CAR_IMGS[carKey]}" alt="${car.name}">
              <span class="img-tag ${car.tagC}">${car.tag}</span>
              <div class="img-btns">
                <button class="ib" onclick="viewDetails('${carKey}'); event.stopPropagation();">상세</button>
                <button class="ib" onclick="selectProduct('${carKey}'); event.stopPropagation();">선택</button>
              </div>
            </div>
            <div class="car-info">
              <div class="car-brand">${car.brand}</div>
              <div class="car-name">${car.name}</div>
              <div class="car-spec">${car.spec}</div>
              <div class="price-row">
                <span class="price" style="color: ${currentUser === 'A' ? '#1a56db' : '#28c76f'}">${car.price}</span>
              </div>
              <div class="price-sub">${car.sub}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  recommendedSection.innerHTML = bannerHtml + carGridHtml;

  // 사이드바 업데이트
  updateSidebar();

  // 검색 컨테이너 숨기기
  const resultsContainer = document.getElementById('search-results-container');
  if (resultsContainer) {
    resultsContainer.style.display = 'none';
  }
}

/**
 * 사이드바 업데이트
 */
function updateSidebar() {
  const customer = DATA[currentUser];

  // 색상 정의
  const colorA = '#1a56db';
  const colorB = '#28c76f';
  const color = currentUser === 'A' ? colorA : colorB;
  const bgGradient = currentUser === 'A'
    ? 'linear-gradient(135deg,#4f8ef7,#1a56db)'
    : 'linear-gradient(135deg,#48d98a,#28c76f)';

  document.getElementById('sbAvatar').textContent = customer.avatar;
  document.getElementById('sbName').textContent = customer.name;
  document.getElementById('sbName').style.color = color;
  document.getElementById('sbMeta').textContent = customer.meta;
  document.getElementById('sbInterest').textContent = customer.interest;
  document.getElementById('sbInterest').style.color = color;

  document.getElementById('crScore').textContent = customer.creditScore;
  document.getElementById('crScore').style.color = color;
  document.getElementById('crGrade').textContent = customer.creditGrade;
  document.getElementById('crLoan').textContent = customer.loanMax;
  document.getElementById('crLoan').style.color = color;
  document.getElementById('curCar').textContent = customer.currentCar;

  // 고객 여정 초기화 (첫 탭: 검색)
  updateJourneyList('검색');

  // 선택 드롭다운 업데이트
  document.getElementById('selA').value = currentUser;
}

/**
 * 고객 여정 리스트 업데이트
 */
function updateJourneyList(tabName) {
  const customer = DATA[currentUser];
  const jList = document.getElementById('jList');
  const items = customer.journey[tabName] || [];

  jList.innerHTML = items.map(item => `
    <div class="j-item">
      <div class="j-thumb">
        ${['검색', '클릭', '찜', '담기', '구매'].indexOf(tabName) + 1}
      </div>
      <div>
        <div class="j-tag">${item.tag}</div>
        <div class="j-name">${item.name}</div>
        <div class="j-cat">${item.cat}</div>
      </div>
    </div>
  `).join('');
}

// ============================================
// 사용자 선택 및 조작
// ============================================

/**
 * A 사용자 선택
 */
function onSelectA(value) {
  currentUser = value;
  if (value === 'C') {
    showGuestView();
  } else {
    showMemberView();
    renderMain();
  }
}

/**
 * B 사용자 선택
 */
function onSelectB(value) {
  compareUser = value;
}

/**
 * 적용 버튼
 */
function apply() {
  if (compareUser !== 'none') {
    alert(`${currentUser}사용자와 ${compareUser}사용자를 비교하는 기능은 추후 추가됩니다.`);
  }
  renderMain();
}

/**
 * 이전 사용자
 */
function prevUser() {
  currentUser = currentUser === 'A' ? 'B' : 'A';
  renderMain();
}

/**
 * 다음 사용자
 */
function nextUser() {
  currentUser = currentUser === 'A' ? 'B' : 'A';
  renderMain();
}

/**
 * 새로고침
 */
function refresh() {
  renderMain();
  console.log(`${currentUser}사용자 정보 새로고침됨`);
}

// ============================================
// 비회원/회원 뷰 전환
// ============================================

/**
 * 회원 뷰 표시
 */
function showMemberView() {
  const memberSidebar = document.getElementById('memberSidebar');
  const guestSidebar = document.getElementById('guestSidebar');
  if (memberSidebar) memberSidebar.style.display = '';
  if (guestSidebar) guestSidebar.style.display = 'none';
}

/**
 * 비회원 뷰 표시
 */
function showGuestView() {
  const memberSidebar = document.getElementById('memberSidebar');
  const guestSidebar = document.getElementById('guestSidebar');
  if (memberSidebar) memberSidebar.style.display = 'none';
  if (guestSidebar) guestSidebar.style.display = 'flex';
  renderGuestMain();
}

/**
 * 비회원 메인 콘텐츠 렌더링
 */
function renderGuestMain() {
  const section = document.getElementById('recommended-section');
  if (!section) return;

  // 비회원용 배너 + 인기차 목록
  const html = `
    <div class="banner" onclick="openChat()" style="background: linear-gradient(120deg,#1e3a5f,#2563eb 60%,#60a5fa); cursor:pointer;">
      <div>
        <h2>나만의 맞춤 신차,<br>AI가 찾아드립니다</h2>
        <p>몇 가지 질문으로 고객님께 딱 맞는<br>차량을 바로 추천해드려요.</p>
        <span class="banner-cta">✨ AI 추천 받기 →</span>
      </div>
      <div class="banner-deco">🤖</div>
      <div class="banner-hint">👆 클릭하면 AI 상담을 시작합니다</div>
    </div>
    <div class="sec-hdr">
      <span style="font-size:15px">✨</span>
      <h3>요즘 주목 받는 신차 안내</h3>
    </div>
    <div class="prod-grid" id="popularGrid"></div>
  `;

  section.innerHTML = html;
  renderPopularCars();

  // 검색 결과 숨기기
  const resultsContainer = document.getElementById('search-results-container');
  if (resultsContainer) {
    resultsContainer.style.display = 'none';
  }
}

/**
 * 인기 차량 목록 렌더링
 */
function renderPopularCars() {
  const grid = document.getElementById('popularGrid');
  if (!grid || typeof SEARCH_RESULTS === 'undefined') return;

  // SEARCH_RESULTS의 모든 차량을 모아서 표시
  const allCars = [];
  for (const resultId in SEARCH_RESULTS) {
    SEARCH_RESULTS[resultId].cars.forEach(car => {
      // 중복 제거
      if (!allCars.find(c => c.img === car.img)) {
        allCars.push(car);
      }
    });
  }

  grid.innerHTML = allCars.slice(0, 8).map(car => `
    <div class="prod-card">
      <div class="pc-img">
        <img src="${CAR_IMGS[car.img]}" alt="${car.name}" style="max-width:100%; max-height:100%; object-fit:contain;">
        <span class="pc-tag ${car.tagC}">${car.tag}</span>
        <div class="pc-btns">
          <button class="pc-btn" onclick="viewDetails('${car.img}')">상세</button>
          <button class="pc-btn" onclick="selectProduct('${car.img}')">선택</button>
        </div>
      </div>
      <div class="pc-info">
        <div class="pc-brand">${car.brand}</div>
        <div class="pc-name">${car.name}</div>
        <div class="pc-spec">${car.spec}</div>
        <div class="pc-price">${car.price}</div>
      </div>
    </div>
  `).join('');
}

// ============================================
// 로고 클릭 핸들러
// ============================================

/**
 * 로고 클릭 = 검색 초기화 (홈으로)
 */
function logoHome() {
  const input = document.getElementById('search-input');
  if (input) input.value = '';
  showDefaultResults();
}

/**
 * 탭 전환 (고객 여정)
 */
function setTab(element, tabName) {
  // 기존 활성 탭 제거
  const tabs = document.querySelectorAll('.jtab');
  tabs.forEach(t => t.classList.remove('on'));

  // 새 탭 활성화
  element.classList.add('on');

  // 고객 여정 리스트 업데이트
  updateJourneyList(tabName);
}

// ============================================
// 검색 기능 통합
// ============================================

/**
 * 전체 결과셋에서 차량 찾기 (renderMain용)
 */
function getCarFromAllResults(carKey) {
  // SEARCH_RESULTS의 모든 결과셋에서 찾기
  if (typeof SEARCH_RESULTS !== 'undefined') {
    for (const resultId in SEARCH_RESULTS) {
      const result = SEARCH_RESULTS[resultId];
      const car = result.cars.find(c => c.img === carKey);
      if (car) return car;
    }
  }
  return null;
}

// ============================================
// 차량 선택 / 상세보기 (common.js 함수 오버라이드)
// ============================================

function selectProduct(imgKey) {
  alert(`${imgKey.toUpperCase()} 차량이 선택되었습니다.\n금융상품 안내로 이동합니다.`);
}

function viewDetails(imgKey) {
  const carInfo = {
    g80: 'GENESIS G80 3.5T AWD 스포츠패키지 - 380마력',
    bmw5: 'BMW 5시리즈 530i xDrive M스포츠 - 252마력',
    k8: 'KIA K8 3.5 GDI 시그니처 - 300마력',
    grandeur: 'HYUNDAI 그랜저 캘리그래피 3.5 GDI - 304마력',
    sorento: 'KIA 쏘렌토 하이브리드 시그니처 - 7인승, 연비 16.0km/L',
    tucson: 'HYUNDAI 투싼 하이브리드 인스퍼레이션 - 연비 15.6km/L',
    nx350h: 'LEXUS NX 350h F SPORT - 연비 14.6km/L',
    santafe: 'HYUNDAI 싼타페 하이브리드 캘리그래피 - 7인승, 연비 14.2km/L'
  };
  alert(carInfo[imgKey] || '차량 정보를 찾을 수 없습니다.');
}

// ============================================
// 채팅 패널 헬퍼 함수
// ============================================

/**
 * 견적 차량 리스트 초기화
 */
function resetCr() {
  const crList = document.getElementById('crList');
  if (crList) {
    crList.innerHTML = `
      <div class="cr-empty-wrap">
        <div class="cr-empty-ico">🚗</div>
        <div class="cr-empty-txt">AI 상담 후<br>관심 차량이 표시됩니다</div>
      </div>
    `;
  }
}

console.log('member.js 로드 완료');
