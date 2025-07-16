const { chromium } = require('playwright');
const testData = require('./utils/testData');

async function debugFundStructure() {
  console.log('🔍 Debugging fund result structure...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log(`📍 Navigating to: ${testData.urls.fundScreener}`);
    await page.goto(testData.urls.fundScreener, { waitUntil: 'domcontentloaded' });
    
    await page.waitForSelector('screener-root', { timeout: 30000 });
    console.log('✅ Page loaded successfully');
    
    const fundRows = await page.locator('screener-table tbody tr').all();
    console.log(`📊 Found ${fundRows.length} fund rows`);
    
    if (fundRows.length > 0) {
      const firstRow = fundRows[0];
      
      const rowHTML = await firstRow.innerHTML();
      console.log('🔍 First row HTML structure:');
      console.log(rowHTML);
      
      const fundCells = await firstRow.locator('td').all();
      console.log(`📋 Found ${fundCells.length} cells in first row`);
      
      for (let i = 0; i < Math.min(fundCells.length, 5); i++) {
        const cellContent = await fundCells[i].textContent();
        const cellHTML = await fundCells[i].innerHTML();
        console.log(`📄 Cell ${i} content: "${cellContent?.trim()}"`);
        console.log(`📄 Cell ${i} HTML: ${cellHTML}`);
        console.log('---');
      }
      
      const fundLinks = await firstRow.locator('screener-fund-cell a.link-to-product-page').all();
      console.log(`🔗 Found ${fundLinks.length} fund links`);
      
      if (fundLinks.length > 0) {
        const firstLink = fundLinks[0];
        const linkText = await firstLink.textContent();
        const linkHTML = await firstLink.innerHTML();
        console.log(`🔗 Link text: "${linkText}"`);
        console.log(`🔗 Link HTML: ${linkHTML}`);
        
        const ariaLabel = await firstLink.getAttribute('aria-label');
        const href = await firstLink.getAttribute('href');
        console.log(`🏷️ Aria-label: "${ariaLabel}"`);
        console.log(`🔗 Href: "${href}"`);
      }
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  debugFundStructure();
}
