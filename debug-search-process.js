const { chromium } = require('playwright');
const testData = require('./utils/testData');

async function debugSearchProcess() {
  console.log('🔍 Debugging search process...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log(`📍 Navigating to: ${testData.urls.fundScreener}`);
    await page.goto(testData.urls.fundScreener, { waitUntil: 'domcontentloaded' });
    
    await page.waitForSelector('screener-root', { timeout: 30000 });
    console.log('✅ Page loaded successfully');
    
    const searchInputs = await page.locator('input[placeholder*="keyword"], input[placeholder*="ticker"], input[placeholder*="fund name"]').all();
    console.log(`🔍 Found ${searchInputs.length} search inputs`);
    
    if (searchInputs.length > 0) {
      const searchInput = searchInputs[0];
      const placeholder = await searchInput.getAttribute('placeholder');
      console.log(`📝 Search input placeholder: "${placeholder}"`);
      
      console.log('⌨️ Typing "technology" in search input...');
      await searchInput.fill('technology');
      
      const inputValue = await searchInput.inputValue();
      console.log(`📝 Input value after typing: "${inputValue}"`);
    }
    
    const searchButtons = await page.locator('button:has-text("Search"), screener-icon svg, button[aria-label*="search"]').all();
    console.log(`🔍 Found ${searchButtons.length} search buttons`);
    
    const keywordRadio = await page.locator('mat-radio-button:has-text("KEYWORD")').count();
    const exposureRadio = await page.locator('mat-radio-button:has-text("EXPOSURE")').count();
    console.log(`📻 Keyword radio buttons: ${keywordRadio}`);
    console.log(`📻 Exposure radio buttons: ${exposureRadio}`);
    
    if (keywordRadio > 0) {
      console.log('📻 Clicking keyword radio button...');
      await page.click('mat-radio-button:has-text("KEYWORD")');
      await page.waitForTimeout(1000);
    }
    
    if (searchInputs.length > 0 && searchButtons.length > 0) {
      console.log('🔍 Attempting to perform search...');
      await searchInputs[0].fill('technology');
      await page.waitForTimeout(500);
      
      console.log('🖱️ Clicking search button...');
      await searchButtons[0].click();
      
      console.log('⏳ Waiting for results...');
      try {
        await Promise.race([
          page.waitForSelector('screener-funds', { timeout: 10000 }),
          page.waitForSelector('screener-total-funds', { timeout: 10000 })
        ]);
        console.log('✅ Search completed successfully');
        
        const resultsCount = await page.locator('screener-table tbody tr').count();
        console.log(`📊 Found ${resultsCount} result rows`);
        
      } catch (error) {
        console.log('❌ Search timed out or failed');
        
        const pageContent = await page.content();
        const hasLoadingIndicator = pageContent.includes('loading') || pageContent.includes('spinner');
        console.log(`⏳ Page has loading indicator: ${hasLoadingIndicator}`);
        
        const screenerFunds = await page.locator('screener-funds').count();
        const screenerTotalFunds = await page.locator('screener-total-funds').count();
        console.log(`📊 screener-funds elements: ${screenerFunds}`);
        console.log(`📊 screener-total-funds elements: ${screenerTotalFunds}`);
      }
    }
    
    await page.screenshot({ path: 'debug-search-process.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-search-process.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugSearchProcess();
}
