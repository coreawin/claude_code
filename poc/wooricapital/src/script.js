/**
 * Wooricapital Auto Recommendation Prototype
 * 고객별 맞춤형 자동차 추천 + 자연어 검색
 */

// ============================================
// 전역 변수
// ============================================

let allCustomers = [];
let allProducts = [];
let currentCustomer = null;
let filteredProducts = [];

// 자연어 검색 매핑
const searchMap = {
  // 차종
  '세단': { type: 'sedan' },
  'sedan': { type: 'sedan' },
  'suv': { type: 'suv' },
  '에스유브이': { type: 'suv' },
  '엠피브': { type: 'mpv' },

  // 연비/환경
  '연비': { keyword: 'economy', fuelType: '하이브리드' },
  '하이브리드': { fuelType: '하이브리드' },
  '친환경': { fuelType: '하이브리드' },
  'hev': { fuelType: '하이브리드' },
  '경제적': { priority: 'economy' },

  // 성능
  '고성능': { priority: 'performance' },
  '성능': { priority: 'performance' },
  '스포츠': { priority: 'performance' },
  'awd': { keyword: 'AWD' },

  // 가격대
  '비싼': { priceMin: 60000000 },
  '저가': { priceMax: 40000000 },
  '저렴': { priceMax: 40000000 },
  '합리적': { priceMax: 50000000 },

  // 인원수
  '가족': { seats: 7 },
  '7인': { seats: 7 },
  '5인': { seats: 5 },

  // 브랜드/국가
  '수입': { tag: '수입' },
  '국산': { tag: '국산' },
  '제네시스': { brand: 'GENESIS' },
  '현대': { brand: 'HYUNDAI' },
  'hyundai': { brand: 'HYUNDAI' },
  '기아': { brand: 'KIA' },
  'kia': { brand: 'KIA' },
  'bmw': { brand: 'BMW' },
  '렉서스': { brand: 'LEXUS' },
  'lexus': { brand: 'LEXUS' },

  // 특수 기능
  'awd': { keyword: 'AWD' },
  '4륜': { keyword: 'AWD' },
};

// ============================================
// 초기화
// ============================================

document.addEventListener('DOMContentLoaded', async function () {
    console.log('페이지 로드 완료. 데이터 로딩...');

    try {
        // 데이터 로드
        await loadCustomers();
        await loadProducts();

        // 첫 번째 고객으로 자동 설정 (선택 모달 표시)
        showCustomerSelection();

        // 검색 이벤트 리스너
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });
        }

    } catch (error) {
        console.error('데이터 로드 실패:', error);
    }
});

// ============================================
// 데이터 로드
// ============================================

async function loadCustomers() {
    try {
        const response = await fetch('data/customers.json');
        allCustomers = await response.json();
        console.log('고객 데이터 로드됨:', allCustomers.length);
        return allCustomers;
    } catch (error) {
        console.error('고객 데이터 로드 실패:', error);
        allCustomers = [
            {
                id: 'cust_001',
                name: '김준호',
                gender: '남',
                age: '30대',
                creditScore: 930,
                currentCar: '더뉴스포티지(NQ5)',
                expectedFeature: '주행성능',
                preferredCarType: '세단',
                preferences: { performance: 9, efficiency: 6, design: 7, safety: 8, comfort: 7 },
                isGuest: false,
                avatar: '👨'
            },
            {
                id: 'cust_002',
                name: '이수진',
                gender: '여',
                age: '20대',
                creditScore: 950,
                currentCar: 'C-CLASS(W206)',
                expectedFeature: '연비',
                preferredCarType: 'SUV',
                preferences: { performance: 6, efficiency: 10, design: 8, safety: 9, comfort: 8 },
                isGuest: false,
                avatar: '👩'
            },
            {
                id: 'cust_guest',
                name: '최승훈',
                gender: '남',
                age: '미정',
                creditScore: 0,
                currentCar: '없음',
                expectedFeature: '인기차종',
                preferredCarType: '전체',
                preferences: { performance: 5, efficiency: 5, design: 5, safety: 5, comfort: 5 },
                isGuest: true,
                avatar: '👤'
            }
        ];
    }
}

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        allProducts = await response.json();
        console.log('상품 데이터 로드됨:', allProducts.length);
        return allProducts;
    } catch (error) {
        console.error('상품 데이터 로드 실패:', error);
        allProducts = [];
    }
}

// ============================================
// 검색 기능
// ============================================

function handleSearch() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();

    if (!query) {
        // 검색 결과 섹션 숨기기, 추천 섹션 표시
        document.getElementById('search-section').style.display = 'none';
        document.getElementById('recommended-section').style.display = 'block';
        renderRecommendedProducts();
        return;
    }

    // 자연어 검색 쿼리 파싱
    const filters = parseSearchQuery(query);
    console.log('검색 필터:', filters);

    // 필터 적용
    let results = filterProducts(allProducts, filters);

    // 결과 표시
    displaySearchResults(results, query);
}

function parseSearchQuery(query) {
    const filters = {};
    const words = query.split(/\s+/);

    words.forEach(word => {
        if (searchMap[word]) {
            Object.assign(filters, searchMap[word]);
        } else {
            // 부분 매칭 (키워드 검색)
            if (!filters.keyword) filters.keyword = [];
            if (typeof filters.keyword === 'string') {
                filters.keyword = [filters.keyword];
            }
            filters.keyword.push(word);
        }
    });

    return filters;
}

function filterProducts(products, filters) {
    return products.filter(product => {
        // type 필터
        if (filters.type && product.type !== filters.type) {
            return false;
        }

        // fuelType 필터
        if (filters.fuelType && product.fuelType !== filters.fuelType) {
            return false;
        }

        // priority 필터
        if (filters.priority && product.priority !== filters.priority) {
            return false;
        }

        // brand 필터
        if (filters.brand && product.brand !== filters.brand) {
            return false;
        }

        // tag 필터
        if (filters.tag && !product.tag.includes(filters.tag)) {
            return false;
        }

        // seats 필터
        if (filters.seats && product.seats < filters.seats) {
            return false;
        }

        // 가격대 필터
        if (filters.priceMin && product.priceNum < filters.priceMin) {
            return false;
        }
        if (filters.priceMax && product.priceNum > filters.priceMax) {
            return false;
        }

        // keyword 필터 (여러 키워드 중 하나라도 포함)
        if (filters.keyword) {
            const keywords = Array.isArray(filters.keyword) ? filters.keyword : [filters.keyword];
            const allKeywords = [...product.keywords, product.brand.toLowerCase(), product.name.toLowerCase()];

            const hasMatch = keywords.some(kw => {
                return allKeywords.some(pk => pk.includes(kw));
            });

            if (!hasMatch) {
                return false;
            }
        }

        return true;
    });
}

function displaySearchResults(results, query) {
    const searchGrid = document.getElementById('search-grid');
    const searchSection = document.getElementById('search-section');
    const recommendedSection = document.getElementById('recommended-section');

    // 섹션 전환
    searchSection.style.display = 'block';
    recommendedSection.style.display = 'none';

    // 결과 개수 표시
    document.getElementById('search-title').textContent = `검색 결과 - "${query}" (${results.length}개)`;

    if (results.length === 0) {
        searchGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#999;">검색 결과가 없습니다. 다른 검색어를 시도해보세요.</div>';
        return;
    }

    displayProducts(results, searchGrid);
}

// ============================================
// UI 함수
// ============================================

function showCustomerSelection() {
    const modal = document.getElementById('customer-modal');
    const list = document.getElementById('customer-list');

    list.innerHTML = allCustomers.map(customer => `
        <div class="customer-card" onclick="selectCustomer('${customer.id}')">
            <div class="customer-avatar">${customer.avatar}</div>
            <div class="customer-name">${customer.name}</div>
            <div class="customer-info">
                ${customer.isGuest ? '비회원 · 인기차량 추천' : `${customer.age} · 신용점수 ${customer.creditScore}점`}
            </div>
        </div>
    `).join('');

    modal.style.display = 'flex';
}

function selectCustomer(customerId) {
    currentCustomer = allCustomers.find(c => c.id === customerId);

    if (!currentCustomer) {
        console.error('고객을 찾을 수 없습니다:', customerId);
        return;
    }

    console.log('선택된 고객:', currentCustomer.name);

    // UI 업데이트
    updateProfileUI();
    updateBannerUI();
    renderRecommendedProducts();

    // 모달 닫기
    document.getElementById('customer-modal').style.display = 'none';
}

function updateProfileUI() {
    // 우측 프로필 패널 업데이트
    document.getElementById('profile-avatar').textContent = currentCustomer.avatar;
    document.getElementById('profile-name').textContent = currentCustomer.name;

    if (currentCustomer.isGuest) {
        document.getElementById('profile-hint').textContent = '비회원 · 인기차량 추천';
    } else {
        document.getElementById('profile-hint').textContent =
            `${currentCustomer.age} · 신용점수 ${currentCustomer.creditScore}점`;
    }

    // 상세 정보 표시
    const detailsDiv = document.getElementById('profile-details');
    if (!currentCustomer.isGuest) {
        detailsDiv.style.display = 'block';
        document.getElementById('detail-gender').textContent = currentCustomer.gender;
        document.getElementById('detail-age').textContent = currentCustomer.age;
        document.getElementById('detail-score').textContent = `${currentCustomer.creditScore}점`;
        document.getElementById('detail-car').textContent = currentCustomer.currentCar;
        document.getElementById('detail-type').textContent = currentCustomer.preferredCarType;
    } else {
        detailsDiv.style.display = 'none';
    }

    // 상단 배지 업데이트
    document.getElementById('user-badge').textContent = `${currentCustomer.avatar} ${currentCustomer.name}`;
}

function updateBannerUI() {
    // 배너는 CSS 배경이므로 여기서는 타이틀만 업데이트
    if (currentCustomer.isGuest) {
        document.getElementById('rec-title').textContent = '인기 자동차';
    } else {
        document.getElementById('rec-title').textContent = `${currentCustomer.name}님을 위한 추천 자동차`;
    }
}

// ============================================
// 상품 추천 렌더링
// ============================================

function renderRecommendedProducts() {
    if (currentCustomer.isGuest) {
        // 비회원: 인기차량 (상위 4개)
        filteredProducts = allProducts.slice(0, 4);
    } else {
        // 회원: 성향에 맞는 추천
        filteredProducts = getRecommendedProducts(currentCustomer);
    }

    displayProducts(filteredProducts, document.getElementById('products-grid'));
}

function getRecommendedProducts(customer) {
    // 추천 점수 계산
    let scored = allProducts.map(product => {
        let score = 0;
        let matchCount = 0;

        // 고객의 선호도와 상품의 가중치 비교
        for (let key in customer.preferences) {
            if (product.weights && product.weights[key]) {
                // 공통 항목이 높을수록 높은 점수
                const customerPref = customer.preferences[key];
                const productWeight = product.weights[key];
                score += (customerPref * productWeight) / 10;
                matchCount++;
            }
        }

        score = matchCount > 0 ? score / matchCount : 0;

        // 차종 일치 보너스
        if (customer.preferredCarType !== '전체' && product.type === customer.preferredCarType) {
            score += 5;
        }

        return {
            ...product,
            recommendScore: Math.round(score * 10) / 10
        };
    });

    // 높은 점수순으로 정렬
    return scored.sort((a, b) => b.recommendScore - a.recommendScore);
}

function displayProducts(products, container) {
    container.innerHTML = products.map(product => {
        const imagePath = `assets/images/${product.img}.png`;

        return `
            <div class="prod-card">
                <div class="pc-img">
                    <img src="${imagePath}" alt="${product.name}" style="max-width:100%; max-height:100%; object-fit:contain;">
                    <span class="pc-tag ${product.tagC}">${product.tag}</span>
                    <div class="pc-btns">
                        <button class="pc-btn" onclick="viewDetails('${product.id}')">상세</button>
                        <button class="pc-btn" onclick="selectProduct('${product.id}')">선택</button>
                    </div>
                </div>
                <div class="pc-info">
                    <div class="pc-brand">${product.brand}</div>
                    <div class="pc-name">${product.name}</div>
                    <div class="pc-spec">${product.fuelEfficiency}</div>
                    <div class="pc-price">${product.price}</div>
                    <div style="font-size:10px;color:#1a56db;margin-top:5px;font-weight:700;">
                        ${product.recommendScore ? '★ ' + product.recommendScore + '점' : '인기'}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// 사용자 액션
// ============================================

function switchCustomer() {
    showCustomerSelection();
}

function viewDetails(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        alert(`${product.brand} ${product.name}\n\n가격: ${product.price}\n엔진: ${product.spec}\n연비: ${product.fuelEfficiency}\n\n주요 특징: ${product.features.join(', ')}`);
    }
}

function selectProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        alert(`${product.brand} ${product.name}이(가) 선택되었습니다.\n\n금융상품 안내 페이지로 이동합니다.`);
        // TODO: 금융상품 페이지로 이동
    }
}

function openChat() {
    document.getElementById('chat-panel').classList.add('open');
}

function closeChat() {
    document.getElementById('chat-panel').classList.remove('open');
}

function scrollToProducts() {
    document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' });
}

console.log('스크립트 초기화 완료');
