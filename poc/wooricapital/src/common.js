/**
 * 공통 유틸리티 및 이미지 관리
 * member.html, non_member.html에서 로드됨
 */

// ============================================
// 이미지 경로 관리
// ============================================

const CAR_IMGS = {
  g80:      '../assets/images/g80.png',
  bmw5:     '../assets/images/bmw5.png',
  k8:       '../assets/images/k8.png',
  grandeur: '../assets/images/grandeur.png',
  sorento:  '../assets/images/sorento.png',
  tucson:   '../assets/images/tucson.png',
  nx350h:   '../assets/images/nx350h.png',
  santafe:  '../assets/images/santafe.png',
};

// ============================================
// 자연어 검색 기능
// ============================================

let searchQueries = [];
let searchDebounceTimer = null;

/**
 * 검색 초기화 - 페이지 로드 시 실행
 * search_data.js에서 로드된 데이터 사용
 */
function initSearch() {
  // search_data.js에서 SEARCH_QUERIES를 전역으로 제공
  if (typeof SEARCH_QUERIES !== 'undefined') {
    searchQueries = SEARCH_QUERIES;
    console.log('검색 질의 로드됨:', searchQueries.length, '개');
    return true;
  } else {
    console.error('SEARCH_QUERIES 데이터를 찾을 수 없습니다. search_data.js가 로드되었나요?');
    return false;
  }
}

/**
 * 검색 입력 핸들러 (디바운스 적용)
 */
function handleSearchInput(inputValue) {
  clearTimeout(searchDebounceTimer);

  searchDebounceTimer = setTimeout(() => {
    performSearch(inputValue);
  }, 500); // 0.5초 디바운스
}

/**
 * 검색 수행
 */
async function performSearch(query) {
  const cleanQuery = query.trim().toLowerCase();

  // 빈 검색: 기본 상태로 복귀
  if (!cleanQuery) {
    showDefaultResults();
    return;
  }

  // 키워드 토크나이즈
  const keywords = cleanQuery.split(/\s+/);

  // 각 질의와 매칭 점수 계산
  const matches = searchQueries.map(q => {
    const intersection = keywords.filter(k =>
      q.keywords.some(qk => qk.includes(k) || k.includes(qk.substring(0, 2)))
    );
    return {
      ...q,
      score: intersection.length
    };
  }).filter(m => m.score > 0);

  // 점수 높은 순으로 정렬
  matches.sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    showNoResults(keywords);
  } else {
    await displaySearchResults(matches);
  }
}

/**
 * 검색 결과 표시 (복수 결과셋)
 * search_data.js의 SEARCH_RESULTS 객체에서 데이터 직접 사용
 */
function displaySearchResults(matches) {
  const resultsContainer = document.getElementById('search-results-container');

  if (!resultsContainer) {
    console.error('검색 결과 컨테이너 없음');
    return;
  }

  // 기본 추천 섹션 숨기기
  const recommendedSection = document.getElementById('recommended-section');
  if (recommendedSection) {
    recommendedSection.style.display = 'none';
  }

  resultsContainer.innerHTML = '';
  resultsContainer.style.display = 'block';

  // 각 결과셋 렌더링
  for (const match of matches) {
    if (typeof SEARCH_RESULTS !== 'undefined' && SEARCH_RESULTS[match.id]) {
      const resultData = SEARCH_RESULTS[match.id];
      const section = createSearchResultSection(resultData, match.score);
      resultsContainer.appendChild(section);
    } else {
      console.error(`결과셋을 찾을 수 없음 (${match.id})`);
    }
  }
}

/**
 * 검색 결과 섹션 HTML 생성 (car-grid 2열 형식)
 */
function createSearchResultSection(resultData, score) {
  const section = document.createElement('div');
  section.className = 'search-result-section';
  section.innerHTML = `
    <div class="search-result-header">
      <h3>${resultData.title}</h3>
      <p class="search-result-desc">${resultData.description}</p>
    </div>
    <div class="car-grid" id="search-grid-${resultData.queryId}">
      ${resultData.cars.map(car => `
        <div class="car-card" onclick="viewDetails('${car.img}')">
          <div class="car-img">
            <img src="${CAR_IMGS[car.img]}" alt="${car.name}" style="max-width:100%; max-height:100%; object-fit:contain;">
            <span class="img-tag ${car.tagC}">${car.tag}</span>
            <div class="img-btns">
              <button class="ib" onclick="viewDetails('${car.img}'); event.stopPropagation();">상세</button>
              <button class="ib" onclick="selectProduct('${car.img}'); event.stopPropagation();">선택</button>
            </div>
          </div>
          <div class="car-info">
            <div class="car-brand">${car.brand}</div>
            <div class="car-name">${car.name}</div>
            <div class="car-spec">${car.spec}</div>
            <div class="price-row">
              <span class="price">${car.price}</span>
            </div>
            <div class="price-sub">${car.sub}</div>
            <div style="font-size:10px;color:#1a56db;margin-top:5px;font-weight:700;">★ ${car.highlight}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  return section;
}

/**
 * 검색 결과 없음 표시
 */
function showNoResults(keywords) {
  const resultsContainer = document.getElementById('search-results-container');

  if (!resultsContainer) return;

  const recommendedSection = document.getElementById('recommended-section');
  if (recommendedSection) {
    recommendedSection.style.display = 'none';
  }

  resultsContainer.innerHTML = `
    <div class="search-no-result">
      <div class="no-result-icon">🔍</div>
      <div class="no-result-text">"${keywords.join(' ')}"에 맞는 검색 결과가 없습니다.</div>
      <div class="no-result-subtitle">다른 검색어를 시도해보세요.</div>
      <div class="search-suggestions">
        <div class="suggestion-title">추천 검색어:</div>
        <div class="suggestion-chips">
          ${searchQueries.map(q => `
            <div class="suggestion-chip" onclick="document.querySelector('#search-input').value='${q.label}'; handleSearchInput('${q.label}')">
              ${q.description}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  resultsContainer.style.display = 'block';
}

/**
 * 기본 상태로 복귀 (검색창 비움)
 */
function showDefaultResults() {
  const resultsContainer = document.getElementById('search-results-container');
  const recommendedSection = document.getElementById('recommended-section');

  if (resultsContainer) {
    resultsContainer.style.display = 'none';
  }

  if (recommendedSection) {
    recommendedSection.style.display = 'block';
  }
}

/**
 * 상품 선택 핸들러
 */
function selectProduct(imgKey) {
  alert(`${imgKey.toUpperCase()} 차량이 선택되었습니다.\n금융상품 안내로 이동합니다.`);
  // TODO: 금융상품 페이지로 이동
}

/**
 * 상품 상세 보기 핸들러
 */
function viewDetails(imgKey) {
  // 현재는 기본 alert (추후 모달로 변경 가능)
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

console.log('common.js 로드 완료');
