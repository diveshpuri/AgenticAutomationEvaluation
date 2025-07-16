const { chromium } = require('playwright');
const FundScreenerPage = require('./page-objects/FundScreenerPage');

async function debugCucumberExposure() {
  console.log('🧪 Debugging Cucumber exposure search step...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    const fundScreenerPage = new FundScreenerPage(page);
    
    console.log('📍 Navigating to fund screener...');
    await fundScreenerPage.navigate();
    console.log('✅ Navigation successful');
    
    console.log('🔘 Selecting exposure search type...');
    await fundScreenerPage.selectSearchType('exposure');
    console.log('✅ Exposure search type selected');
    
    console.log('📝 Entering search term "Apple"...');
    await fundScreenerPage.enterSearchTerm('Apple');
    console.log('✅ Search term entered');
    
    console.log('🔍 Clicking search button...');
    await fundScreenerPage.clickSearchButton();
    console.log('✅ Search button clicked');
    
    console.log('⏳ Waiting for results...');
    await fundScreenerPage.waitForResults();
    console.log('✅ Wait for results completed');
    
    const currentUrl = page.url();
    console.log(`🔗 Final URL: ${currentUrl}`);
    
    const totalFundsText = await page.locator('screener-total-funds').textContent();
    console.log(`📊 Total funds text: "${totalFundsText}"`);
    
    const resultCount = await fundScreenerPage.getResultsCount();
    console.log(`📊 Result count: ${resultCount}`);
    
    await page.screenshot({ path: 'debug-cucumber-exposure.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-cucumber-exposure.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugCucumberExposure();
}
