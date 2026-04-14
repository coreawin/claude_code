/**
 * 비회원/공통 AI 채팅 로직
 * demo_non_member.html 방식 그대로 이식
 */

// ============================================
// AI 상담 시나리오 데이터
// ============================================

var SCENARIO = [
  // ① 성별
  { type: "agent",    delay: 700,
    text: "안녕하세요! 우리WON카 AI 추천 상담사입니다 😊\n몇 가지만 여쭤보고 딱 맞는 차를 찾아드릴게요.\n\n먼저, 성별이 어떻게 되시나요?" },

  { type: "user",     delay: 2000, text: "여성이에요" },
  { type: "progress", delay: 200,  index: 1 },

  // ② 나이대
  { type: "agent",    delay: 900,
    text: "네, 감사합니다! 😊\n연령대는 어떻게 되시나요?" },

  { type: "user",     delay: 1800, text: "20대 후반이에요" },
  { type: "progress", delay: 200,  index: 2 },

  // ③ 직업군
  { type: "agent",    delay: 900,
    text: "직업군도 여쭤봐도 될까요?\n예를 들어 직장인, 자영업자, 학생 등이요." },

  { type: "user",     delay: 2000, text: "마케팅 회사 다니고 있어요" },
  { type: "progress", delay: 200,  index: 3 },

  // ④ 우선순위
  { type: "agent",    delay: 1000,
    text: "차량 선택에서 가장 중요하게 생각하시는 게 뭔가요?\n연비, 주행성능, 편의성 중에서 꼽아주신다면요." },

  { type: "user",     delay: 2200, text: "연비요! 출퇴근 거리가 길어서 연비가 제일 중요해요" },
  { type: "progress", delay: 200,  index: 4 },

  // ⑤ 차종
  { type: "agent",    delay: 900,
    text: "마지막으로 세단과 SUV 중 어떤 스타일을 선호하세요?" },

  { type: "user",     delay: 1800, text: "SUV가 좋아요. 실용적으로 쓸 수 있을 것 같아서요." },
  { type: "progress", delay: 200,  index: 5 },

  // 분석 중
  { type: "agent",    delay: 800,
    text: "감사합니다! 입력해주신 조건을 분석하고 있습니다 🔍" },

  // 조건 요약
  { type: "summary",  delay: 1200,
    items: [
      { ico: "👩", label: "성별",     val: "여성" },
      { ico: "🎂", label: "나이",     val: "20대 후반" },
      { ico: "💼", label: "직업",     val: "직장인 (마케팅)" },
      { ico: "🌿", label: "우선순위", val: "연비" },
      { ico: "🚙", label: "선호 차종", val: "SUV" }
    ]
  },

  // 추천
  { type: "agent",    delay: 1000,
    text: "분석 완료! 고객님 조건에 딱 맞는\n연비 특화 하이브리드 SUV를 추천해드립니다 🎯" },

  { type: "rec",      delay: 700,
    cars: ["sorento", "tucson", "nx350h", "santafe"] }
];

// ============================================
// 채팅 패널 열기 / 닫기
// ============================================

/**
 * 채팅 패널 열기 (매번 처음부터 시작)
 */
function openChat() {
  var chatPanel = document.getElementById("chatPanel");
  var backdrop  = document.getElementById("backdrop");
  var chatBody  = document.getElementById("chatBody");

  // 패널 오픈
  chatPanel.classList.add("open");
  backdrop.classList.add("on");

  // 이전 채팅 내용 삭제
  if (chatBody) chatBody.innerHTML = "";

  // 프로그레스 바 초기화
  updateProgress(0);

  // 시나리오 새로 시작
  playScenario();
}

/**
 * 채팅 패널 닫기
 */
function closeChat() {
  document.getElementById("chatPanel").classList.remove("open");
  document.getElementById("backdrop").classList.remove("on");
}

// backdrop 클릭 시 닫기
document.addEventListener("DOMContentLoaded", function() {
  var bd = document.getElementById("backdrop");
  if (bd) bd.addEventListener("click", closeChat);
});

// ============================================
// 시나리오 실행 (demo_non_member.html 방식)
// ============================================

/**
 * 시나리오 자동 재생
 * 누적 타이머(t) 방식으로 시간차 보장
 */
function playScenario() {
  var t = 0;

  for (var i = 0; i < SCENARIO.length; i++) {
    var step = SCENARIO[i];
    t += step.delay;

    (function(s, fireAt) {
      setTimeout(function() { playStep(s); }, fireAt);
    })(step, t);

    // agent 타입은 타이핑 인디케이터 표시 시간을 누적에 추가
    // 다음 step이 반드시 메시지 출력 이후에 시작되도록 함
    if (step.type === "agent") {
      t += 500 + step.text.length * 20;
    }

    // summary 타입도 렌더 시간 확보
    if (step.type === "summary") {
      t += 400;
    }
  }
}

/**
 * 각 시나리오 스텝 실행
 */
function playStep(step) {
  if (step.type === "agent") {
    // 타이핑 인디케이터 표시 → 지정 시간 후 메시지로 교체
    var tid = showTyping();
    var dur = 500 + step.text.length * 20;
    (function(id, txt) {
      setTimeout(function() {
        removeTyping(id);
        appendAgent(txt);
      }, dur);
    })(tid, step.text);

  } else if (step.type === "user") {
    appendUser(step.text);

  } else if (step.type === "progress") {
    updateProgress(step.index);

  } else if (step.type === "summary") {
    var rows = step.items.map(function(it) {
      return '<div class="cond-row">' +
        '<span class="cond-ico">' + it.ico + '</span>' +
        '<span style="color:#6b7280;font-size:11px;">' + it.label + '</span>' +
        '<span style="margin-left:auto;font-weight:700;color:#1a1a2e;font-size:11px;">' + it.val + '</span>' +
        '</div>';
    }).join("");
    appendAgentHTML(
      '<div class="cond-summary">' +
        '<div class="cs-title">📋 수집된 고객 조건</div>' +
        rows +
      '</div>'
    );

  } else if (step.type === "rec") {
    showRec(step.cars);
  }
}

// ============================================
// 타이핑 인디케이터
// ============================================

var typCount = 0;

function showTyping() {
  var id = "typ" + (++typCount);
  var chatBody = document.getElementById("chatBody");
  chatBody.insertAdjacentHTML("beforeend",
    '<div class="typing-row msg-anim" id="' + id + '">' +
      '<div class="m-av av-bot">🤖</div>' +
      '<div class="typing-bub"><span></span><span></span><span></span></div>' +
    '</div>'
  );
  chatScroll();
  return id;
}

function removeTyping(id) {
  var el = document.getElementById(id);
  if (el) el.remove();
}

// ============================================
// 메시지 렌더링 함수
// ============================================

function appendAgent(text) {
  document.getElementById("chatBody").insertAdjacentHTML("beforeend",
    '<div class="msg msg-anim">' +
      '<div class="m-av av-bot">🤖</div>' +
      '<div class="msg-r">' +
        '<div class="bubble b-bot">' + text.replace(/\n/g, "<br>") + '</div>' +
        '<div class="m-time">' + chatNow() + '</div>' +
      '</div>' +
    '</div>'
  );
  chatScroll();
}

function appendAgentHTML(html) {
  document.getElementById("chatBody").insertAdjacentHTML("beforeend",
    '<div class="msg msg-anim">' +
      '<div class="m-av av-bot">🤖</div>' +
      '<div class="msg-r" style="max-width:88%">' +
        '<div class="bubble b-bot" style="padding:12px 14px;">' + html + '</div>' +
        '<div class="m-time">' + chatNow() + '</div>' +
      '</div>' +
    '</div>'
  );
  chatScroll();
}

function appendUser(text) {
  document.getElementById("chatBody").insertAdjacentHTML("beforeend",
    '<div class="msg msg-user msg-anim">' +
      '<div class="m-av av-usr">👤</div>' +
      '<div class="msg-r">' +
        '<div class="bubble b-usr">' + text + '</div>' +
        '<div class="m-time">' + chatNow() + '</div>' +
      '</div>' +
    '</div>'
  );
  chatScroll();
}

// ============================================
// 프로그레스 바 업데이트
// ============================================

function updateProgress(idx) {
  for (var i = 0; i < 5; i++) {
    var ps = document.getElementById("ps" + i);
    var pl = document.getElementById("pl" + i);
    if (!ps || !pl) continue;

    if (i < idx) {
      ps.className = "prog-step done";
      pl.className = "";
    } else if (i === idx && idx < 5) {
      ps.className = "prog-step active";
      pl.className = "cur";
    } else {
      ps.className = "prog-step";
      pl.className = "";
    }
  }
}

// ============================================
// 추천 차량 렌더링 + 견적 패널
// ============================================

/**
 * 추천 차량 카드 표시 + crList에 추가
 */
function showRec(keys) {
  var cars = keys.map(function(k) {
    return getCarByKey(k);
  }).filter(Boolean);

  var cards = cars.map(function(c) {
    return '<div class="rc" onclick="addCr(\'' + c.img + '\',\'' + c.brand + '\',\'' + c.name.replace(/<br>/g, ' ') + '\',\'' + c.spec + '\',\'' + c.price + '\')">' +
      '<div class="rc-img"><img src="' + CAR_IMGS[c.img] + '" alt="' + c.brand + '"></div>' +
      '<div class="rc-info">' +
        '<div class="rc-brand">' + c.brand + '</div>' +
        '<div class="rc-name">' + c.name + '</div>' +
        '<div class="rc-spec">' + c.spec + '</div>' +
        '<div class="rc-price">' + c.price + '</div>' +
        '<button class="rc-btn" onclick="event.stopPropagation();addCr(\'' + c.img + '\',\'' + c.brand + '\',\'' + c.name.replace(/<br>/g, ' ') + '\',\'' + c.spec + '\',\'' + c.price + '\')">견적 담기</button>' +
      '</div>' +
    '</div>';
  }).join("");

  appendAgentHTML(
    '<div style="font-size:12px;color:#555;margin-bottom:8px;">🎯 고객님 맞춤 추천 차량 · 연비 특화 하이브리드 SUV</div>' +
    '<div class="rec-wrap">' + cards + '</div>' +
    '<div style="font-size:11px;color:#94a3b8;margin-top:10px;">원하시는 차량을 선택하면 견적을 담아드려요!</div>'
  );

  // crList에도 자동 추가
  cars.forEach(function(c) {
    addCr(c.img, c.brand, c.name.replace(/<br>/g, ' '), c.spec, c.price);
  });

  // 프로그레스 완료
  updateProgress(5);
}

/**
 * crList에 차량 추가 (중복 방지)
 */
function addCr(key, brand, name, spec, price) {
  var list = document.getElementById("crList");
  if (!list) return;
  if (list.querySelector('[data-key="' + key + '"]')) return;

  var empty = list.querySelector(".cr-empty-wrap");
  if (empty) empty.remove();

  list.insertAdjacentHTML("beforeend",
    '<div class="cr-item" data-key="' + key + '">' +
      '<div class="cr-item-img"><img src="' + CAR_IMGS[key] + '" alt="' + brand + '"></div>' +
      '<div class="cr-item-info">' +
        '<div class="cr-item-brand">' + brand + '</div>' +
        '<div class="cr-item-name">' + name + '</div>' +
        '<div class="cr-item-price">' + price + '</div>' +
      '</div>' +
    '</div>'
  );
}

/**
 * 견적 패널 초기화
 */
function resetCr() {
  var list = document.getElementById("crList");
  if (list) {
    list.innerHTML =
      '<div class="cr-empty-wrap">' +
        '<div class="cr-empty-ico">🚗</div>' +
        '<div class="cr-empty-txt">AI 상담 후<br>관심 차량이 표시됩니다</div>' +
      '</div>';
  }
}

// ============================================
// 유틸리티
// ============================================

function chatScroll() {
  var b = document.getElementById("chatBody");
  if (b) b.scrollTop = b.scrollHeight;
}

function chatNow() {
  return new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

/**
 * key로 차량 정보 검색 (SEARCH_RESULTS에서)
 */
function getCarByKey(key) {
  if (typeof SEARCH_RESULTS === "undefined") return null;
  for (var resultId in SEARCH_RESULTS) {
    var result = SEARCH_RESULTS[resultId];
    for (var i = 0; i < result.cars.length; i++) {
      if (result.cars[i].img === key) return result.cars[i];
    }
  }
  return null;
}

console.log("non_member.js 로드 완료");
