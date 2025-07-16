const { chromium } = require('playwright');
const FundScreenerPage = require('./page-objects/FundScreenerPage');

async function testNoResultsFix() {
  console.log('🧪 Testing no-results fix...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    const fundScreenerPage = new FundScreenerPage(page);
    
    console.log('📍 Navigating to fund screener...');
    await fundScreenerPage.navigate();
    console.log('✅ Navigation successful');
    
    console.log('🔍 Testing search for non-existent fund...');
    await fundScreenerPage.performKeywordSearch('nonexistentfund123');
    
    const currentUrl = page.url();
    console.log(`🔗 Current URL: ${currentUrl}`);
    
    const totalFundsText = await page.locator('screener-total-funds').textContent();
    console.log(`📊 Total funds text: "${totalFundsText}"`);
    
    const resultCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 Result count: ${resultCount}`);
    
    console.log('🔍 Testing verifyNoResults method...');
    try {
      await fundScreenerPage.verifyNoResults();
      console.log('✅ verifyNoResults passed successfully!');
    } catch (error) {
      console.log('❌ verifyNoResults failed:', error.message);
    }
    
    console.log('\n🔍 Testing search for special characters...');
    await fundScreenerPage.performKeywordSearch('!@#$%');
    
    const specialUrl = page.url();
    console.log(`🔗 Special chars URL: ${specialUrl}`);
    
    const specialTotalText = await page.locator('screener-total-funds').textContent();
    console.log(`📊 Special chars total text: "${specialTotalText}"`);
    
    try {
      await fundScreenerPage.verifyNoResults();
      console.log('✅ Special characters no-results verification passed!');
    } catch (error) {
      console.log('❌ Special characters no-results verification failed:', error.message);
    }
    
    await page.screenshot({ path: 'test-no-results-fix.png', fullPage: true });
    console.log('📸 Screenshot saved as test-no-results-fix.png');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  testNoResultsFix();
}
