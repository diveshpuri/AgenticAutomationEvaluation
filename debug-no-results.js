const { chromium } = require('playwright');
const testData = require('./utils/testData');

async function debugNoResults() {
  console.log('🔍 Debugging no results state...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log(`📍 Navigating to: ${testData.urls.fundScreener}`);
    await page.goto(testData.urls.fundScreener, { waitUntil: 'domcontentloaded' });
    
    await page.waitForSelector('screener-root', { timeout: 30000 });
    console.log('✅ Page loaded successfully');
    
    console.log('🔍 Performing search for "nonexistentfund123"...');
    
    const searchInput = await page.locator('input[placeholder*="keyword"]').first();
    await searchInput.fill('nonexistentfund123');
    await page.waitForTimeout(500);
    
    const searchButton = await page.locator('screener-icon svg').first();
    await searchButton.click();
    
    console.log('⏳ Waiting for search to complete...');
    await page.waitForTimeout(5000);
    
    const screenerTotalFunds = await page.locator('screener-total-funds').count();
    console.log(`📊 screener-total-funds elements: ${screenerTotalFunds}`);
    
    if (screenerTotalFunds > 0) {
      const totalFundsText = await page.locator('screener-total-funds').first().textContent();
      console.log(`📊 Total funds text: "${totalFundsText}"`);
    }
    
    const resultRows = await page.locator('screener-table tbody tr').count();
    console.log(`📊 Result rows found: ${resultRows}`);
    
    const noResultsElements = await page.locator('*:has-text("no results"), *:has-text("No results"), *:has-text("0 ETFs"), *:has-text("0 funds")').all();
    console.log(`🚫 Found ${noResultsElements.length} potential no-results elements`);
    
    for (let i = 0; i < noResultsElements.length; i++) {
      const element = noResultsElements[i];
      const text = await element.textContent();
      const tagName = await element.evaluate(el => el.tagName);
      const className = await element.getAttribute('class');
      console.log(`🚫 Element ${i}: <${tagName}> class="${className}" text="${text?.trim()}"`);
    }
    
    const pageContent = await page.content();
    const hasZeroETFs = pageContent.includes('0 ETFs');
    const hasNoResults = pageContent.toLowerCase().includes('no results');
    const hasZeroFunds = pageContent.includes('0 funds');
    
    console.log(`📄 Page contains "0 ETFs": ${hasZeroETFs}`);
    console.log(`📄 Page contains "no results": ${hasNoResults}`);
    console.log(`📄 Page contains "0 funds": ${hasZeroFunds}`);
    
    const emptyTableElements = await page.locator('tbody:empty, .empty-results, .no-data').all();
    console.log(`📊 Empty table indicators: ${emptyTableElements.length}`);
    
    await page.screenshot({ path: 'debug-no-results.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-no-results.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugNoResults();
}
