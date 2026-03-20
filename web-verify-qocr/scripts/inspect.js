const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://121.126.210.2:8000/ko/login', { waitUntil: 'networkidle' });

  // Login
  await page.locator('input[placeholder="example"], input[type="text"]').first().fill('dqsolution');
  await page.locator('input[type="password"]').first().fill('customer3@$#');
  await page.locator('button:has-text("로그인"), button[type="submit"]').first().click();
  await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 10000 });
  await page.waitForLoadState('networkidle');

  // Screenshot
  await page.screenshot({ path: './web-verify-report/screenshots/debug_after_login.png', fullPage: true });

  // Dump sidebar links
  const links = await page.locator('nav a, aside a, [role="navigation"] a, [data-slot="sidebar"] a').all();
  console.log(`\n=== Found ${links.length} nav links ===`);
  for (const link of links) {
    const text = (await link.textContent()).trim();
    const href = await link.getAttribute('href');
    const enabled = await link.isEnabled();
    console.log(`  [${enabled ? 'ON' : 'OFF'}] "${text}" → ${href}`);
  }

  // Also check sidebar items by text
  const menuTexts = ['워크스페이스', '목록 및 관리', '학습', 'API 설정', '학습 진행 상태', '데모', '비교 데모', '로그 조회'];
  console.log('\n=== Menu item locators ===');
  for (const text of menuTexts) {
    const els = await page.locator(`text="${text}"`).all();
    console.log(`"${text}": ${els.length} element(s)`);
    for (const el of els) {
      const tag = await el.evaluate(e => e.tagName);
      const role = await el.getAttribute('role');
      const enabled = await el.isEnabled();
      const visible = await el.isVisible();
      console.log(`  <${tag}> role=${role} enabled=${enabled} visible=${visible}`);
    }
  }

  await browser.close();
})();
