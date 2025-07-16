const { chromium } = require('playwright');
const FundScreenerPage = require('./page-objects/FundScreenerPage');

async function testSearchImplementation() {
  console.log('🧪 Testing updated search implementation...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    const fundScreenerPage = new FundScreenerPage(page);
    
    console.log('📍 Navigating to fund screener...');
    await fundScreenerPage.navigate();
    console.log('✅ Navigation successful');
    
    const initialCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 Initial results count: ${initialCount}`);
    
    console.log('🔍 Testing search for "technology"...');
    await fundScreenerPage.performKeywordSearch('technology');
    
    const afterSearchCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 After search results count: ${afterSearchCount}`);
    
    const currentUrl = page.url();
    console.log(`🔗 Current URL: ${currentUrl}`);
    
    const hasSearchInUrl = currentUrl.includes('search=technology');
    console.log(`🔍 Search term in URL: ${hasSearchInUrl}`);
    
    if (hasSearchInUrl && afterSearchCount < initialCount) {
      console.log('✅ Technology search working correctly!');
      
      const results = await fundScreenerPage.getSearchResults();
      console.log(`📋 Found ${results.length} technology funds:`);
      results.forEach((fund, index) => {
        console.log(`  ${index + 1}. ${fund.name} (${fund.ticker})`);
      });
    } else {
      console.log('❌ Technology search may not be working properly');
    }
    
    console.log('\n🔍 Testing search for non-existent fund...');
    await fundScreenerPage.performKeywordSearch('nonexistentfund123');
    
    const noResultsUrl = page.url();
    console.log(`🔗 No results URL: ${noResultsUrl}`);
    
    const noResultsCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 No results count: ${noResultsCount}`);
    
    if (noResultsUrl.includes('search=nonexistentfund123') && noResultsCount === 0) {
      console.log('✅ No results search working correctly!');
    } else {
      console.log('❌ No results search may not be working properly');
    }
    
    await page.screenshot({ path: 'test-search-implementation.png', fullPage: true });
    console.log('📸 Screenshot saved as test-search-implementation.png');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  testSearchImplementation();
}
