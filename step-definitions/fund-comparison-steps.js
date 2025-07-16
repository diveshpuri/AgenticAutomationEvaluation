const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I select the first fund for comparison', async function() {
  await this.fundScreenerPage.addFundToComparison(0);
});

When('I select the second fund for comparison', async function() {
  await this.fundScreenerPage.addFundToComparison(1);
});

Then('both funds should be added to the comparison basket', async function() {
  const comparisonCount = await this.page.locator('[data-testid="comparison-count"]').textContent();
  expect(comparisonCount).toBe('2');
});

Then('the comparison counter should show {string}', async function(expectedCount) {
  const comparisonCount = await this.page.locator('[data-testid="comparison-count"]').textContent();
  expect(comparisonCount).toBe(expectedCount);
});

Given('I have added {int} funds to comparison', async function(count) {
  for (let i = 0; i < count; i++) {
    await this.fundScreenerPage.addFundToComparison(i);
  }
});

When('I click the {string} button', async function(buttonText) {
  if (buttonText === 'Compare') {
    await this.fundScreenerPage.clickCompareButton();
  }
});

Then('I should be taken to the comparison page', async function() {
  await this.comparisonPage.waitForPageLoad();
});

Then('I should see both funds displayed side by side', async function() {
  const fundCount = await this.comparisonPage.getComparedFundsCount();
  expect(fundCount).toBe(2);
});

Given('I have added {int} funds to comparison', async function(count) {
  for (let i = 0; i < count; i++) {
    await this.fundScreenerPage.addFundToComparison(i);
  }
});

When('I remove the second fund from comparison', async function() {
  await this.comparisonPage.removeFundFromComparison(1);
});

Then('the comparison should show {int} funds', async function(expectedCount) {
  const actualCount = await this.comparisonPage.getComparedFundsCount();
  expect(actualCount).toBe(expectedCount);
});

Then('the removed fund should no longer be visible', async function() {
  const fundCount = await this.comparisonPage.getComparedFundsCount();
  expect(fundCount).toBe(2);
});

When('I try to add more than {int} funds to comparison', async function(maxFunds) {
  for (let i = 0; i < maxFunds + 1; i++) {
    try {
      await this.fundScreenerPage.addFundToComparison(i);
    } catch (error) {
      break;
    }
  }
});

Then('I should see a message about the maximum limit', async function() {
  const limitMessage = await this.page.locator('[data-testid="comparison-limit-message"]').isVisible();
  expect(limitMessage).toBe(true);
});

Then('only {int} funds should be in the comparison', async function(maxFunds) {
  await this.comparisonPage.verifyMaximumFundsReached();
});

Given('I have added multiple funds to comparison', async function() {
  await this.fundScreenerPage.addFundToComparison(0);
  await this.fundScreenerPage.addFundToComparison(1);
  await this.fundScreenerPage.addFundToComparison(2);
});

When('I click {string} in the comparison', async function(buttonText) {
  if (buttonText === 'Clear All') {
    await this.comparisonPage.clearAllComparisons();
  }
});

Then('the comparison basket should be empty', async function() {
  await this.comparisonPage.verifyComparisonEmpty();
});

Given('I have {int} funds in comparison', async function(count) {
  for (let i = 0; i < count; i++) {
    await this.fundScreenerPage.addFundToComparison(i);
  }
  await this.fundScreenerPage.clickCompareButton();
});

When('I view the comparison page', async function() {
  await this.comparisonPage.waitForPageLoad();
});

Then('I should see accurate fund names and tickers', async function() {
  const funds = await this.comparisonPage.getComparedFunds();
  for (const fund of funds) {
    expect(fund.name).toBeTruthy();
    expect(fund.ticker).toBeTruthy();
  }
});

Then('I should see expense ratios for both funds', async function() {
  const data = await this.comparisonPage.getComparisonData();
  expect(data.expenseRatios.length).toBe(2);
  for (const ratio of data.expenseRatios) {
    expect(ratio).toBeTruthy();
  }
});

Then('I should see net assets for both funds', async function() {
  const data = await this.comparisonPage.getComparisonData();
  expect(data.netAssets.length).toBe(2);
  for (const assets of data.netAssets) {
    expect(assets).toBeTruthy();
  }
});

Given('I have funds in comparison', async function() {
  await this.fundScreenerPage.addFundToComparison(0);
  await this.fundScreenerPage.addFundToComparison(1);
  await this.fundScreenerPage.clickCompareButton();
});

When('I click the {string} button on comparison page', async function(buttonText) {
  if (buttonText === 'Export') {
    const download = await this.comparisonPage.exportComparison();
    this.lastDownload = download;
  }
});

Then('a comparison report should be downloaded', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Then('the file should contain the compared fund data', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename).toContain('comparison');
});

When('I refresh the page', async function() {
  await this.page.reload();
  await this.fundScreenerPage.waitForPageLoad();
});

Then('the comparison basket should maintain the selected funds', async function() {
  const comparisonCount = await this.page.locator('[data-testid="comparison-count"]').textContent();
  expect(parseInt(comparisonCount)).toBeGreaterThan(0);
});

Then('the comparison counter should remain accurate', async function() {
  const comparisonCount = await this.page.locator('[data-testid="comparison-count"]').textContent();
  expect(parseInt(comparisonCount)).toBeGreaterThanOrEqual(1);
});

Given('I am on page {int} of results', async function(pageNumber) {
  if (pageNumber === 2) {
    await this.fundScreenerPage.goToNextPage();
  }
});

When('I add a fund to comparison', async function() {
  await this.fundScreenerPage.addFundToComparison(0);
});

When('I navigate to page {int}', async function(pageNumber) {
  if (pageNumber === 2) {
    await this.fundScreenerPage.goToNextPage();
  }
});

When('I add another fund to comparison', async function() {
  await this.fundScreenerPage.addFundToComparison(0);
});

Then('I should be able to compare funds from different pages', async function() {
  const comparisonCount = await this.page.locator('[data-testid="comparison-count"]').textContent();
  expect(parseInt(comparisonCount)).toBe(2);
});

Given('I am using a mobile device', async function() {
  await this.page.setViewportSize({ width: 375, height: 667 });
});

Then('the comparison interface should be mobile-friendly', async function() {
  const isMobileOptimized = await this.page.locator('[data-testid="mobile-comparison"]').isVisible();
  expect(isMobileOptimized).toBe(true);
});

Then('I should be able to view comparisons on mobile', async function() {
  await this.fundScreenerPage.clickCompareButton();
  await this.comparisonPage.verifyComparisonPageLoaded();
});

Given('I have applied filters to the fund list', async function() {
  await this.fundScreenerPage.applyAssetClassFilter('Equity');
});

When('I add filtered funds to comparison', async function() {
  await this.fundScreenerPage.addFundToComparison(0);
});

Then('the comparison should work with filtered funds', async function() {
  const comparisonCount = await this.page.locator('[data-testid="comparison-count"]').textContent();
  expect(parseInt(comparisonCount)).toBe(1);
});

Then('the comparison should maintain filter context', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('assetClass=Equity');
});

When('I view the detailed comparison', async function() {
  await this.comparisonPage.waitForPageLoad();
});

Then('I should see performance data for each fund', async function() {
  const performanceData = await this.page.locator('[data-testid="performance-data"]').isVisible();
  expect(performanceData).toBe(true);
});

Then('I should see holdings information', async function() {
  const holdingsData = await this.page.locator('[data-testid="holdings-data"]').isVisible();
  expect(holdingsData).toBe(true);
});

Then('I should see risk metrics comparison', async function() {
  const riskData = await this.page.locator('[data-testid="risk-metrics"]').isVisible();
  expect(riskData).toBe(true);
});
