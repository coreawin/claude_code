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

  console.log('Current URL:', page.url());

  // Wait for React hydration (ISSUE-003 fix)
  await page.waitForSelector('a[href*="workspaces"]', { timeout: 15000 });
  console.log('Sidebar ready (waitForSelector passed)\n');

  // 1. Check what HTML tags contain the nav links
  const navInfo = await page.evaluate(() => {
    const selectors = ['nav', 'aside', '[role="navigation"]', '[data-slot="sidebar"]', '[data-sidebar]'];
    const result = {};
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      result[sel] = el ? `EXISTS (tag: ${el.tagName}, children: ${el.querySelectorAll('a').length} links)` : 'NOT FOUND';
    }
    return result;
  });
  console.log('\n=== Container elements ===');
  for (const [sel, info] of Object.entries(navInfo)) {
    console.log(`  ${sel}: ${info}`);
  }

  // 2. Dump all <a> tags with their href and parent tag
  const allLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.textContent.trim().slice(0, 30),
      href: a.getAttribute('href'),
      parent: a.parentElement?.tagName + '.' + (a.parentElement?.className || '').slice(0, 30),
      grandparent: a.parentElement?.parentElement?.tagName,
    })).filter(l => l.text && l.href && l.href !== '/');
  });
  console.log('\n=== All links (filtered) ===');
  allLinks.forEach(l => console.log(`  "${l.text}" → ${l.href}  [parent: ${l.parent}]`));

  // 3. Check if nav a[href="/workspaces"] exists directly
  const directCheck = await page.evaluate(() => {
    const tests = [
      'nav a[href="/workspaces"]',
      'nav a[href="/ko/workspaces"]',
      'aside a[href="/workspaces"]',
      'aside a[href="/ko/workspaces"]',
      'a[href="/workspaces"]',
      'a[href="/ko/workspaces"]',
    ];
    return tests.map(sel => ({ sel, found: !!document.querySelector(sel) }));
  });
  console.log('\n=== Direct selector checks ===');
  directCheck.forEach(c => console.log(`  ${c.found ? '✅' : '❌'} ${c.sel}`));

  await browser.close();
})();
