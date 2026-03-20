const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Login
  await page.goto('http://121.126.210.2:8000/ko/login', { waitUntil: 'networkidle' });
  await page.locator('input[placeholder="example"], input[type="text"]').first().fill('dqsolution');
  await page.locator('input[type="password"]').first().fill('customer3@$#');
  await page.locator('button:has-text("로그인"), button[type="submit"]').first().click();
  await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 10000 });
  await page.waitForSelector('a[href*="workspaces"]', { timeout: 15000 });
  console.log('Login OK. URL:', page.url());

  // Screenshot of workspace page
  await page.screenshot({ path: './web-verify-report/screenshots/ws_page.png', fullPage: true });

  // Find all buttons
  const buttons = await page.locator('button').all();
  console.log(`\n=== Buttons (${buttons.length}) ===`);
  for (const btn of buttons) {
    const text = (await btn.textContent()).trim();
    if (text) console.log(`  [${await btn.isEnabled() ? 'ON' : 'OFF'}] "${text}"`);
  }

  // Click "워크스페이스 추가" button
  console.log('\n=== Clicking 워크스페이스 추가 ===');
  try {
    await page.locator('button:has-text("워크스페이스 추가")').first().click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: './web-verify-report/screenshots/ws_dialog.png', fullPage: true });

    // Find inputs in dialog/modal
    const inputs = await page.locator('input:visible, select:visible, [role="combobox"]:visible').all();
    console.log(`\n=== Dialog inputs (${inputs.length}) ===`);
    for (const inp of inputs) {
      const tag = await inp.evaluate(e => e.tagName);
      const type = await inp.getAttribute('type') || '';
      const placeholder = await inp.getAttribute('placeholder') || '';
      const name = await inp.getAttribute('name') || '';
      const id = await inp.getAttribute('id') || '';
      console.log(`  <${tag}> type=${type} name=${name} id=${id} placeholder=${placeholder}`);
    }

    // Find all visible buttons in dialog
    const dlgBtns = await page.locator('button:visible').all();
    console.log(`\n=== Dialog buttons ===`);
    for (const btn of dlgBtns) {
      const text = (await btn.textContent()).trim();
      if (text) console.log(`  "${text}"`);
    }
  } catch (e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
