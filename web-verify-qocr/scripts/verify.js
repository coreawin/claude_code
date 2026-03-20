const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

// ── Config ───────────────────────────────────────────────
const VERIFY_URL = 'http://121.126.210.2:8000/ko/login';
const VERIFY_ID  = 'dqsolution';
const VERIFY_PW  = 'customer3@$#';
const VERIFY_OUT = './web-verify-report';
const NTFY_CH    = 'coreawin-claude-code';

// ── ntfy 알림 ─────────────────────────────────────────────
function ntfy(title, body, priority = 'default', tags = 'white_check_mark') {
  return new Promise((resolve) => {
    const data = Buffer.from(body, 'utf-8');
    const req = http.request({
      hostname: 'ntfy.sh', port: 80, path: `/${NTFY_CH}`, method: 'POST',
      headers: {
        'Title': title, 'Priority': priority, 'Tags': tags,
        'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': data.length,
      },
    }, (res) => { res.resume(); resolve(); });
    req.on('error', () => resolve());
    req.write(data); req.end();
  });
}

// ── 결과 관리 ─────────────────────────────────────────────
const results = {
  url: VERIFY_URL, timestamp: new Date().toISOString(),
  summary: { total: 0, pass: 0, fail: 0 }, steps: [],
};
function saveResult() {
  fs.mkdirSync(VERIFY_OUT, { recursive: true });
  fs.writeFileSync(path.join(VERIFY_OUT, 'results.json'), JSON.stringify(results, null, 2));
}
function addStep(name, status, detail, screenshot) {
  results.summary.total++;
  status === 'pass' ? results.summary.pass++ : results.summary.fail++;
  results.steps.push({ name, status, detail, screenshot: screenshot || null, time: new Date().toISOString() });
  saveResult();
  console.log(`[${status.toUpperCase()}] ${name}: ${detail}`);
}

// ── 스크린샷 ──────────────────────────────────────────────
const ssDir = path.join(VERIFY_OUT, 'screenshots');
fs.mkdirSync(ssDir, { recursive: true });
let ssIdx = 1;
async function shot(page, name) {
  const file = `${String(ssIdx++).padStart(2, '0')}_${name}.png`;
  await page.screenshot({ path: path.join(ssDir, file), fullPage: false });
  return file;
}

// ── Main ──────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ ignoreHTTPSErrors: true });

  // ════════════════════════════════════════════════════════
  // STEP 1: 로그인
  // ════════════════════════════════════════════════════════
  console.log('\n=== STEP 1: 로그인 ===');
  try {
    await page.goto(VERIFY_URL, { waitUntil: 'networkidle', timeout: 15000 });
    await shot(page, 'login_page');

    await page.locator('input[placeholder="example"], input[type="text"]').first().fill(VERIFY_ID);
    await page.locator('input[type="password"]').first().fill(VERIFY_PW);
    await shot(page, 'login_filled');
    await page.locator('button:has-text("로그인"), button[type="submit"]').first().click();

    await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 10000 });
    // ISSUE-003: networkidle 후 React 하이드레이션 완료까지 명시적 대기
    await page.waitForSelector('a[href*="workspaces"]', { timeout: 15000 });

    const afterUrl = page.url();
    const ssAfter = await shot(page, 'after_login');
    const isSuccess = afterUrl.includes('/workspaces');

    addStep('로그인', isSuccess ? 'pass' : 'fail',
      `ID: ${VERIFY_ID} | Redirected to: ${afterUrl}`, ssAfter);
    await ntfy(
      '[Web Verify] STEP1 Login - ' + (isSuccess ? 'OK' : 'FAIL'),
      `ID: ${VERIFY_ID}\nRedirected to: ${afterUrl}\nResult: ${isSuccess ? 'Pass - workspaces page loaded' : 'Fail - not redirected to workspaces'}`,
      isSuccess ? 'default' : 'urgent',
      isSuccess ? 'white_check_mark' : 'x,rotating_light'
    );

    if (!isSuccess) { await browser.close(); process.exit(1); }
  } catch (e) {
    await shot(page, 'login_error').catch(() => {});
    addStep('로그인', 'fail', e.message, null);
    await ntfy('[Web Verify] STEP1 Login - FAILED', `Error: ${e.message}`, 'urgent', 'x,rotating_light');
    await browser.close();
    process.exit(1);
  }

  // ════════════════════════════════════════════════════════
  // STEP 2: 워크스페이스 추가
  // ════════════════════════════════════════════════════════
  console.log('\n=== STEP 2: 워크스페이스 추가 ===');
  const WS_NAME = '테스트 입력 워크스페이스';
  try {
    // 워크스페이스 페이지 이동 (이미 해당 페이지면 생략)
    if (!page.url().includes('/workspaces')) {
      await page.goto('http://121.126.210.2:8000/ko/workspaces', { waitUntil: 'domcontentloaded', timeout: 15000 });
    }
    await page.waitForSelector('[data-slot="sidebar"]', { timeout: 15000 });
    await page.waitForSelector('button:has-text("워크스페이스 추가")', { timeout: 10000 });
    await shot(page, 'workspace_list_before');

    // "워크스페이스 추가" 버튼 클릭
    await page.locator('button:has-text("워크스페이스 추가")').first().click();
    await page.waitForSelector('input#title', { timeout: 8000 });
    await shot(page, 'workspace_dialog_open');

    // 제목 입력
    await page.locator('input#title').fill(WS_NAME);

    // 모델 유형 확인 (Layout Detection 이미 선택됨)
    const modelType = (await page.locator('button:has-text("Layout Detection")').first().textContent()).trim();
    console.log(`  모델 유형: ${modelType}`);
    await shot(page, 'workspace_dialog_filled');

    // 다이얼로그 내 "워크스페이스 추가" 버튼 클릭 (마지막 버튼 = 확인 버튼)
    await page.locator('button:has-text("워크스페이스 추가")').last().click();
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    await page.waitForTimeout(1500);

    const ssAfter = await shot(page, 'workspace_list_after');

    // 목록에서 추가된 워크스페이스 확인
    const found = await page.locator(`text="${WS_NAME}"`).first().isVisible().catch(() => false);
    const ssResult = await shot(page, 'workspace_verify_result');

    addStep('워크스페이스 추가', found ? 'pass' : 'fail',
      found ? `"${WS_NAME}" 목록 확인됨` : `"${WS_NAME}" 목록에서 찾을 수 없음`, ssResult);

    await ntfy(
      `[Web Verify] STEP2 Workspace Add - ${found ? 'OK' : 'FAIL'}`,
      `Action: Create workspace\nTitle: ${WS_NAME}\nModel Type: ${modelType}\nResult: ${found ? 'Found in list - Pass' : 'NOT found in list - Fail'}`,
      found ? 'default' : 'urgent',
      found ? 'white_check_mark' : 'x,rotating_light'
    );

    if (!found) { await browser.close(); process.exit(1); }
  } catch (e) {
    await shot(page, 'workspace_error').catch(() => {});
    addStep('워크스페이스 추가', 'fail', e.message, null);
    await ntfy('[Web Verify] STEP2 Workspace Add - FAILED', `Error: ${e.message}`, 'urgent', 'x,rotating_light');
    await browser.close();
    process.exit(1);
  }

  // ════════════════════════════════════════════════════════
  // 최종 결과
  // ════════════════════════════════════════════════════════
  await browser.close();
  const { total, pass, fail } = results.summary;
  console.log(`\n=== 완료: Pass ${pass}/${total}, Fail ${fail} ===`);

  await ntfy(
    `[Web Verify] All Done - Pass ${pass}/${total} Fail ${fail}`,
    `Target: ${VERIFY_URL}\nTotal: ${total} | Pass: ${pass} | Fail: ${fail}\nReport: ${VERIFY_OUT}/report.html`,
    'high',
    fail > 0 ? 'x,rotating_light' : 'white_check_mark,tada'
  );

  // HTML 리포트 생성
  require('./report.js');

  process.exit(fail > 0 ? 1 : 0);
})();
