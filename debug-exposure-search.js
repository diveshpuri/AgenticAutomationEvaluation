const { chromium } = require('playwright');

async function debugExposureSearch() {
  console.log('🧪 Debugging exposure search functionality...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('📍 Navigating to fund screener...');
    await page.goto('https://www.ishares.com/us/products/etf-investments#/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(5000);
    
    console.log('🔘 Clicking EXPOSURE radio button...');
    await page.click('input[value="exposure"]');
    await page.waitForTimeout(2000);
    
    console.log('📝 Typing "Apple" in exposure search input...');
    const exposureInput = page.locator('input[placeholder*="company"], input[placeholder*="ticker"], input[placeholder*="geography"], input[placeholder*="sector"]').first();
    await exposureInput.fill('Apple');
    await page.waitForTimeout(3000);
    
    console.log('🔍 Looking for dropdown options...');
    const dropdownOptions = await page.locator(':text("APPLE")').all();
    console.log(`Found ${dropdownOptions.length} dropdown options containing "APPLE"`);
    
    for (let i = 0; i < dropdownOptions.length; i++) {
      const optionText = await dropdownOptions[i].textContent();
      console.log(`Option ${i}: "${optionText}"`);
    }
    
    if (dropdownOptions.length > 0) {
      console.log('👆 Clicking first Apple option...');
      await dropdownOptions[0].click();
      await page.waitForTimeout(3000);
      
      const currentUrl = page.url();
      console.log(`🔗 URL after selection: ${currentUrl}`);
      
      const totalFundsText = await page.locator('screener-total-funds').textContent();
      console.log(`📊 Total funds text: "${totalFundsText}"`);
      
      const resultCount = await page.locator('screener-table tbody tr').count();
      console.log(`📊 Result count: ${resultCount}`);
    } else {
      console.log('❌ No dropdown options found');
    }
    
    await page.screenshot({ path: 'debug-exposure-search.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-exposure-search.png');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugExposureSearch();
}
