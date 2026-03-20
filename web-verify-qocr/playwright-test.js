const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://121.126.210.2:8000/ko/login');
  const title = await page.title();
  const url = page.url();
  console.log('✅ 페이지 로드 성공');
  console.log('Title:', title);
  console.log('URL:', url);
  await browser.close();
})();
