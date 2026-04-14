const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // 페이지 로드
    await page.goto('https://dpdev2.bot.diquest.com/csqa/#/csqa/qa-detail-new/677995490/6c981e1d-ad12-4484-b3d5-47a85ad49ec1/N', {
      waitUntil: 'networkidle'
    });
    
    console.log('Page loaded, waiting for login form...');
    
    // 로그인 입력 (다양한 셀렉터 시도)
    const userInputs = await page.$$('input[type="text"]');
    const passInputs = await page.$$('input[type="password"]');
    
    if (userInputs.length > 0) {
      await userInputs[0].fill('super');
      console.log('Username entered');
    }
    
    if (passInputs.length > 0) {
      await passInputs[0].fill('diquest5&^%');
      console.log('Password entered');
    }
    
    // 로그인 버튼 클릭
    const buttons = await page.$$('button');
    console.log('Found buttons:', buttons.length);
    
    if (buttons.length > 0) {
      await buttons[buttons.length - 1].click();
      console.log('Login button clicked');
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
    }
    
    // 콘텐츠 로드 대기
    await page.waitForTimeout(5000);
    
    // 스크린샷 저장
    await page.screenshot({ path: 'D:/Claude Code/renewal-page/20260327/actual_screen.png', fullPage: false });
    console.log('Screenshot saved to actual_screen.png');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
