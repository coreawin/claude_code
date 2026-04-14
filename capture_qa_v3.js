const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Opening login page...');
    await page.goto('https://dpdev2.bot.diquest.com/csqa/#/login');
    
    // 페이지 로드 대기
    await page.waitForTimeout(2000);
    
    // input 찾기 (텍스트 필드가 1, 비밀번호가 2)
    const textInputs = await page.locator('input[type="text"]').all();
    const passInputs = await page.locator('input[type="password"]').all();
    
    console.log('Text inputs:', textInputs.length);
    console.log('Password inputs:', passInputs.length);
    
    if (textInputs.length > 0) {
      await textInputs[0].fill('super');
      console.log('Username entered');
    }
    
    if (passInputs.length > 0) {
      await passInputs[0].fill('diquest5&^%');
      console.log('Password entered');
    }
    
    // 로그인 버튼 찾기
    const loginBtn = await page.locator('button').first();
    if (loginBtn) {
      await loginBtn.click();
      console.log('Login button clicked');
    }
    
    // 로그인 후 대기
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {
      console.log('Navigation timeout (expected)');
    });
    
    await page.waitForTimeout(3000);
    
    // 현재 URL 확인
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    
    // 원래 URL로 이동
    await page.goto('https://dpdev2.bot.diquest.com/csqa/#/csqa/qa-detail-new/677995490/6c981e1d-ad12-4484-b3d5-47a85ad49ec1/N');
    await page.waitForTimeout(5000);
    
    // 스크린샷 저장
    await page.screenshot({ path: 'D:/Claude Code/renewal-page/20260327/actual_screen.png', fullPage: false });
    console.log('Screenshot saved');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
