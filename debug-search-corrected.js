const { chromium } = require('playwright');
const testData = require('./utils/testData');

async function debugSearchCorrected() {
  console.log('🔍 Debugging corrected search process...');
  
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
    
    console.log('🔍 Testing search for "technology"...');
    
    await page.click('mat-radio-button:has-text("KEYWORD")');
    await page.waitForTimeout(1000);
    
    const searchInput = await page.locator('input[placeholder*="keyword"]').first();
    await searchInput.fill('');
    await page.waitForTimeout(500);
    await searchInput.type('technology');
    await page.waitForTimeout(500);
    
    const inputValue = await searchInput.inputValue();
    console.log(`📝 Input value: "${inputValue}"`);
    
    const searchButtons = await page.locator('screener-icon svg').all();
    console.log(`🔍 Found ${searchButtons.length} search buttons`);
    
    let clickedButton = false;
    for (let i = 0; i < searchButtons.length; i++) {
      const isVisible = await searchButtons[i].isVisible();
      console.log(`🔍 Search button ${i}: visible=${isVisible}`);
      
      if (isVisible && !clickedButton) {
        console.log(`🖱️ Clicking visible search button ${i}...`);
        await searchButtons[i].click();
        clickedButton = true;
      }
    }
    
    if (!clickedButton) {
      console.log('❌ No visible search button found!');
      return;
    }
    
    console.log('⏳ Waiting for search to process...');
    await page.waitForTimeout(5000);
    
    const afterRows = await page.locator('screener-table tbody tr').count();
    const afterTotal = await page.locator('screener-total-funds').textContent();
    const currentUrl = page.url();
    
    console.log(`📊 After search: ${afterRows} rows, total text: "${afterTotal}"`);
    console.log(`🔗 Current URL: ${currentUrl}`);
    
    const hasSearchInUrl = currentUrl.includes('search=') || currentUrl.includes('keyword=');
    console.log(`🔍 Search term in URL: ${hasSearchInUrl}`);
    
    console.log('\n🔍 Testing search for "nonexistentfund123"...');
    
    await searchInput.fill('');
    await page.waitForTimeout(500);
    await searchInput.type('nonexistentfund123');
    await page.waitForTimeout(500);
    
    for (let i = 0; i < searchButtons.length; i++) {
      const isVisible = await searchButtons[i].isVisible();
      if (isVisible) {
        await searchButtons[i].click();
        break;
      }
    }
    
    console.log('⏳ Waiting for no-results search to process...');
    await page.waitForTimeout(5000);
    
    const noResultRows = await page.locator('screener-table tbody tr').count();
    const noResultTotal = await page.locator('screener-total-funds').textContent();
    const noResultUrl = page.url();
    
    console.log(`📊 No-result search: ${noResultRows} rows, total text: "${noResultTotal}"`);
    console.log(`🔗 No-result URL: ${noResultUrl}`);
    
    await page.screenshot({ path: 'debug-search-corrected.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-search-corrected.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugSearchCorrected();
}
