const { chromium } = require('playwright');
const testData = require('./utils/testData');

async function debugSearchDetailed() {
  console.log('🔍 Debugging detailed search process...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log(`📍 Navigating to: ${testData.urls.fundScreener}`);
    await page.goto(testData.urls.fundScreener, { waitUntil: 'domcontentloaded' });
    
    await page.waitForSelector('screener-root', { timeout: 30000 });
    console.log('✅ Page loaded successfully');
    
    const initialRows = await page.locator('screener-table tbody tr').count();
    const initialTotal = await page.locator('screener-total-funds').textContent();
    console.log(`📊 Initial state: ${initialRows} rows, total text: "${initialTotal}"`);
    
    const keywordRadioChecked = await page.locator('mat-radio-button:has-text("KEYWORD") input').isChecked();
    console.log(`📻 Keyword radio checked: ${keywordRadioChecked}`);
    
    console.log('📻 Clicking keyword radio button...');
    await page.click('mat-radio-button:has-text("KEYWORD")');
    await page.waitForTimeout(1000);
    
    const keywordRadioCheckedAfter = await page.locator('mat-radio-button:has-text("KEYWORD") input').isChecked();
    console.log(`📻 Keyword radio checked after click: ${keywordRadioCheckedAfter}`);
    
    const searchInput = await page.locator('input[placeholder*="keyword"]').first();
    console.log('🔍 Found search input, clearing and typing...');
    
    await searchInput.fill('');
    await page.waitForTimeout(500);
    await searchInput.type('nonexistentfund123');
    await page.waitForTimeout(500);
    
    const inputValue = await searchInput.inputValue();
    console.log(`📝 Input value: "${inputValue}"`);
    
    const searchButtons = await page.locator('screener-icon svg').all();
    console.log(`🔍 Found ${searchButtons.length} search buttons`);
    
    for (let i = 0; i < searchButtons.length; i++) {
      const isVisible = await searchButtons[i].isVisible();
      const isEnabled = await searchButtons[i].isEnabled();
      console.log(`🔍 Search button ${i}: visible=${isVisible}, enabled=${isEnabled}`);
    }
    
    console.log('🖱️ Clicking search button...');
    const searchButton = searchButtons[0];
    await searchButton.click();
    
    console.log('⏳ Waiting for search to process...');
    await page.waitForTimeout(3000);
    
    const currentUrl = page.url();
    console.log(`🔗 Current URL: ${currentUrl}`);
    
    const afterRows = await page.locator('screener-table tbody tr').count();
    const afterTotal = await page.locator('screener-total-funds').textContent();
    console.log(`📊 After search: ${afterRows} rows, total text: "${afterTotal}"`);
    
    const loadingElements = await page.locator('[class*="loading"], [class*="spinner"], [aria-busy="true"]').count();
    console.log(`⏳ Loading elements: ${loadingElements}`);
    
    console.log('⏳ Waiting 5 more seconds...');
    await page.waitForTimeout(5000);
    
    const finalRows = await page.locator('screener-table tbody tr').count();
    const finalTotal = await page.locator('screener-total-funds').textContent();
    const finalUrl = page.url();
    console.log(`📊 Final state: ${finalRows} rows, total text: "${finalTotal}"`);
    console.log(`🔗 Final URL: ${finalUrl}`);
    
    const hasSearchInUrl = finalUrl.includes('search=') || finalUrl.includes('keyword=');
    console.log(`🔍 Search term in URL: ${hasSearchInUrl}`);
    
    await page.screenshot({ path: 'debug-search-detailed.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-search-detailed.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugSearchDetailed();
}
