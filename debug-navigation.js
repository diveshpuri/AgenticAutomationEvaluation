const { chromium } = require('playwright');
const testData = require('./utils/testData');

async function debugNavigation() {
  console.log('🔍 Debugging navigation to iShares fund screener...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log(`📍 Navigating to: ${testData.urls.fundScreener}`);
    await page.goto(testData.urls.fundScreener, { waitUntil: 'networkidle' });
    
    console.log('✅ Page loaded successfully');
    console.log(`📄 Page title: ${await page.title()}`);
    console.log(`🔗 Current URL: ${page.url()}`);
    
    const screenerRoot = await page.locator('screener-root').count();
    console.log(`🎯 screener-root elements found: ${screenerRoot}`);
    
    const body = await page.locator('body').count();
    console.log(`📦 body elements found: ${body}`);
    
    const main = await page.locator('main').count();
    console.log(`📦 main elements found: ${main}`);
    
    const screenerElements = await page.locator('[class*="screener"], [id*="screener"]').count();
    console.log(`🔍 Elements with 'screener' in class/id: ${screenerElements}`);
    
    const pageContent = await page.content();
    const hasScreenerRoot = pageContent.includes('screener-root');
    console.log(`📝 Page contains 'screener-root': ${hasScreenerRoot}`);
    
    const loadingElements = await page.locator('[class*="loading"], [class*="spinner"]').count();
    console.log(`⏳ Loading elements found: ${loadingElements}`);
    
    console.log('⏱️  Waiting 5 more seconds for dynamic content...');
    await page.waitForTimeout(5000);
    
    const screenerRootAfterWait = await page.locator('screener-root').count();
    console.log(`🎯 screener-root elements after wait: ${screenerRootAfterWait}`);
    
    await page.screenshot({ path: 'debug-navigation.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-navigation.png');
    
  } catch (error) {
    console.error('❌ Navigation failed:', error.message);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugNavigation();
}
