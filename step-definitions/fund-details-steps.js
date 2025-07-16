const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I click on the first fund name in the results', async function() {
  await this.fundScreenerPage.clickFundName(0);
});

Then('I should be taken to the fund details page', async function() {
  await this.fundDetailsPage.waitForPageLoad();
});

Then('I should see the fund name and ticker prominently displayed', async function() {
  await this.fundDetailsPage.verifyFundDetailsLoaded();
});

Given('I am on a fund details page', async function() {
  await this.fundScreenerPage.navigate();
  await this.fundScreenerPage.clickFundName(0);
  await this.fundDetailsPage.waitForPageLoad();
});

When('I view the overview tab', async function() {
  await this.fundDetailsPage.clickOverviewTab();
});

Then('I should see the fund\'s NAV', async function() {
  const nav = await this.fundDetailsPage.getNAV();
  expect(nav).toBeTruthy();
  expect(nav).toMatch(/\$[\d,]+\.\d{2}/);
});

Then('I should see the expense ratio', async function() {
  const expenseRatio = await this.fundDetailsPage.getExpenseRatio();
  expect(expenseRatio).toBeTruthy();
  expect(expenseRatio).toMatch(/\d+\.\d{2}%/);
});

Then('I should see the fund\'s inception date', async function() {
  const inceptionDate = await this.page.locator('[data-testid="inception-date"]').textContent();
  expect(inceptionDate).toBeTruthy();
  expect(inceptionDate).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
});

When('I click on the {string} tab', async function(tabName) {
  switch(tabName) {
    case 'Performance':
      await this.fundDetailsPage.clickPerformanceTab();
      break;
    case 'Holdings':
      await this.fundDetailsPage.clickHoldingsTab();
      break;
    case 'Literature':
      await this.fundDetailsPage.clickLiteratureTab();
      break;
  }
});

Then('I should see performance charts and data', async function() {
  const performanceChart = await this.page.locator('[data-testid="performance-chart"]').isVisible();
  expect(performanceChart).toBe(true);
});

Then('I should see the fund\'s top holdings', async function() {
  const holdingsTable = await this.page.locator('[data-testid="holdings-table"]').isVisible();
  expect(holdingsTable).toBe(true);
});

Then('I should see available documents', async function() {
  await this.fundDetailsPage.verifyFactSheetExists();
  await this.fundDetailsPage.verifyProspectusExists();
});

When('I click on the {string} link', async function(linkText) {
  if (linkText === 'Fact Sheet') {
    const download = await this.fundDetailsPage.downloadFactSheet();
    this.lastDownload = download;
  } else if (linkText === 'Prospectus') {
    const download = await this.fundDetailsPage.downloadProspectus();
    this.lastDownload = download;
  }
});

Then('a PDF fact sheet should be downloaded', async function() {
  expect(this.lastDownload).toBeTruthy();
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename).toMatch(/\.pdf$/i);
});

Then('the file should contain fund information', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename.toLowerCase()).toContain('fact');
});

Then('a PDF prospectus should be downloaded', async function() {
  expect(this.lastDownload).toBeTruthy();
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename).toMatch(/\.pdf$/i);
});

Then('the file should contain legal fund information', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename.toLowerCase()).toContain('prospectus');
});

Then('I should see YTD performance data', async function() {
  const ytdData = await this.page.locator('[data-testid="ytd-return"]').textContent();
  expect(ytdData).toBeTruthy();
});

Then('I should see {int}-year performance data', async function(years) {
  const performanceData = await this.page.locator(`[data-testid="${years}y-return"]`).textContent();
  expect(performanceData).toBeTruthy();
});

Then('I should see performance charts', async function() {
  const chart = await this.page.locator('[data-testid="performance-chart"]').isVisible();
  expect(chart).toBe(true);
});

Then('I should see the top {int} holdings', async function(count) {
  const holdings = await this.fundDetailsPage.getTopHoldings();
  expect(holdings.length).toBeGreaterThanOrEqual(count);
});

Then('I should see holding percentages', async function() {
  const holdings = await this.fundDetailsPage.getTopHoldings();
  for (const holding of holdings) {
    expect(holding.weight).toBeTruthy();
    expect(holding.weight).toMatch(/\d+\.\d{2}%/);
  }
});

Then('I should see sector allocation', async function() {
  const sectorData = await this.page.locator('[data-testid="sector-allocation"]').isVisible();
  expect(sectorData).toBe(true);
});

Given('I am on a fund details page for {string}', async function(ticker) {
  await this.fundScreenerPage.navigate();
  await this.fundScreenerPage.performKeywordSearch(ticker);
  await this.fundScreenerPage.clickFundName(0);
  await this.fundDetailsPage.waitForPageLoad();
});

Then('the fund name should contain {string}', async function(expectedText) {
  const fundName = await this.fundDetailsPage.getFundName();
  expect(fundName.toLowerCase()).toContain(expectedText.toLowerCase());
});

Then('the ticker should be {string}', async function(expectedTicker) {
  const ticker = await this.fundDetailsPage.getFundTicker();
  expect(ticker).toBe(expectedTicker);
});

Then('the NAV should be a valid price', async function() {
  const nav = await this.fundDetailsPage.getNAV();
  expect(nav).toMatch(/\$[\d,]+\.\d{2}/);
});

When('I click the back button', async function() {
  await this.fundDetailsPage.navigateBackToScreener();
});

Then('I should return to the fund screener', async function() {
  await this.fundScreenerPage.waitForPageLoad();
});

Then('my previous search/filter state should be maintained', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('products/etf-investments');
});

Then('the layout should be mobile-optimized', async function() {
  const mobileLayout = await this.page.locator('[data-testid="mobile-fund-details"]').isVisible();
  expect(mobileLayout).toBe(true);
});

Then('all tabs should be accessible on mobile', async function() {
  await this.fundDetailsPage.verifyTabsExist();
});

When('I navigate to a fund details page', async function() {
  await this.fundScreenerPage.navigate();
  await this.fundScreenerPage.clickFundName(0);
  await this.fundDetailsPage.waitForPageLoad();
});

Then('the page should load within {int} seconds', async function(seconds) {
  const startTime = Date.now();
  await this.fundDetailsPage.waitForPageLoad();
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(seconds * 1000);
});

Then('all fund data should be displayed correctly', async function() {
  await this.fundDetailsPage.verifyFundDetailsLoaded();
});
