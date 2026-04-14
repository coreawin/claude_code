const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // 화면에 띄우기
  const page = await browser.newPage();
  
  try {
    console.log('Opening URL...');
    await page.goto('https://dpdev2.bot.diquest.com/csqa/#/csqa/qa-detail-new/677995490/6c981e1d-ad12-4484-b3d5-47a85ad49ec1/N');
    
    // 페이지 렌더링 대기
    await page.waitForTimeout(3000);
    
    // 현재 URL 확인
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    
    // 모든 input 요소 찾기
    const inputs = await page.locator('input').all();
    console.log('Found inputs:', inputs.length);
    
    for (let i = 0; i < inputs.length; i++) {
      const type = await inputs[i].getAttribute('type');
      const name = await inputs[i].getAttribute('name');
      const id = await inputs[i].getAttribute('id');
      console.log(`Input ${i}: type=${type}, name=${name}, id=${id}`);
    }
    
    // 페이지 살피기
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('Keeping browser open for inspection...');
    await page.waitForTimeout(10000);
    await browser.close();
  }
})();
