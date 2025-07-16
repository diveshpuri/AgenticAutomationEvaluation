const { chromium } = require('playwright');
const FundScreenerPage = require('./page-objects/FundScreenerPage');

async function debugPagination() {
  console.log('🧪 Debugging pagination functionality...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    const fundScreenerPage = new FundScreenerPage(page);
    
    console.log('📍 Navigating to fund screener...');
    await fundScreenerPage.navigate();
    console.log('✅ Navigation successful');
    
    console.log('🔍 Performing search for "equity" to get multiple pages...');
    await fundScreenerPage.performKeywordSearch('equity');
    console.log('✅ Search completed');
    
    const currentUrl = page.url();
    console.log(`🔗 Current URL: ${currentUrl}`);
    
    const resultCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 Result count: ${resultCount}`);
    
    console.log('🔍 Looking for pagination controls...');
    const nextButton = await page.locator('button:has-text("Next")').count();
    console.log(`📊 Next button count: ${nextButton}`);
    
    const paginationControls = await page.locator('[class*="pagination"], [class*="pager"], button[aria-label*="next"], button[aria-label*="Next"]').count();
    console.log(`📊 Pagination controls count: ${paginationControls}`);
    
    const allButtons = await page.locator('button').all();
    console.log(`📊 Total buttons on page: ${allButtons.length}`);
    
    for (let i = 0; i < Math.min(allButtons.length, 10); i++) {
      const buttonText = await allButtons[i].textContent();
      const isVisible = await allButtons[i].isVisible();
      console.log(`Button ${i}: "${buttonText}" (visible: ${isVisible})`);
    }
    
    await page.screenshot({ path: 'debug-pagination.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-pagination.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugPagination();
}
