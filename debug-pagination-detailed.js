const { chromium } = require('playwright');
const FundScreenerPage = require('./page-objects/FundScreenerPage');

async function debugPaginationDetailed() {
  console.log('🧪 Debugging pagination in detail...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    const fundScreenerPage = new FundScreenerPage(page);
    
    console.log('📍 Navigating to fund screener...');
    await fundScreenerPage.navigate();
    
    console.log('🔍 Performing search for "ETF" to get many results...');
    await fundScreenerPage.performKeywordSearch('ETF');
    
    const currentUrl = page.url();
    console.log(`🔗 Current URL: ${currentUrl}`);
    
    const resultCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 Result count: ${resultCount}`);
    
    console.log('🔗 Trying to navigate to page 2 via URL...');
    const page2Url = currentUrl.replace('pageNumber=1', 'pageNumber=2');
    await page.goto(page2Url);
    await page.waitForTimeout(3000);
    
    const newUrl = page.url();
    console.log(`🔗 New URL: ${newUrl}`);
    
    const newResultCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 New result count: ${newResultCount}`);
    
    console.log('🔍 Looking for pagination-related elements...');
    const paginationElements = await page.locator('[class*="pagination"], [class*="pager"], [class*="page"]').all();
    console.log(`📊 Pagination elements found: ${paginationElements.length}`);
    
    for (let i = 0; i < Math.min(paginationElements.length, 5); i++) {
      const elementText = await paginationElements[i].textContent();
      const elementClass = await paginationElements[i].getAttribute('class');
      console.log(`Pagination element ${i}: "${elementText}" (class: ${elementClass})`);
    }
    
    await page.screenshot({ path: 'debug-pagination-detailed.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-pagination-detailed.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugPaginationDetailed();
}
