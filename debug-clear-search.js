const { chromium } = require('playwright');
const FundScreenerPage = require('./page-objects/FundScreenerPage');

async function debugClearSearch() {
  console.log('🧪 Debugging clear search functionality...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    const fundScreenerPage = new FundScreenerPage(page);
    
    console.log('📍 Navigating to fund screener...');
    await fundScreenerPage.navigate();
    console.log('✅ Navigation successful');
    
    console.log('🔍 Performing initial search for "bond"...');
    await fundScreenerPage.performKeywordSearch('bond');
    console.log('✅ Initial search completed');
    
    const initialUrl = page.url();
    console.log(`🔗 URL after bond search: ${initialUrl}`);
    
    const initialCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 Initial result count: ${initialCount}`);
    
    console.log('🧹 Clearing search field...');
    await fundScreenerPage.enterSearchTerm('');
    console.log('✅ Search field cleared');
    
    console.log('🔍 Looking for search input state...');
    const searchInputValue = await page.locator('input[placeholder="Enter keyword, ticker, or fund name"]').inputValue();
    console.log(`📝 Search input value after clear: "${searchInputValue}"`);
    
    console.log('🔍 Clicking search button after clearing...');
    await fundScreenerPage.clickSearchButton();
    await page.waitForTimeout(3000);
    console.log('✅ Search button clicked');
    
    const finalUrl = page.url();
    console.log(`🔗 URL after clear search: ${finalUrl}`);
    
    const finalCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 Final result count: ${finalCount}`);
    
    const hasSearchParam = finalUrl.includes('search=');
    console.log(`🔍 URL still has search parameter: ${hasSearchParam}`);
    
    await page.screenshot({ path: 'debug-clear-search.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-clear-search.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugClearSearch();
}
