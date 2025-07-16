const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I sort the results by {string}', async function(sortOption) {
  await this.fundScreenerPage.sortBy(sortOption);
});

Then('the funds should be ordered by net assets in descending order', async function() {
  await this.fundScreenerPage.verifySortApplied('totalNetAssets');
});

Then('the sort indicator should show descending order', async function() {
  const sortIndicator = await this.page.locator('[data-sort="totalNetAssets"][aria-sort="descending"]').isVisible();
  expect(sortIndicator).toBe(true);
});

Then('the funds should be ordered by expense ratio in ascending order', async function() {
  await this.fundScreenerPage.verifySortApplied('expenseRatio');
});

Then('the sort indicator should show ascending order', async function() {
  const sortIndicator = await this.page.locator('[data-sort="expenseRatio"][aria-sort="ascending"]').isVisible();
  expect(sortIndicator).toBe(true);
});

Then('the funds should be ordered by inception date', async function() {
  await this.fundScreenerPage.verifySortApplied('inceptionDate');
});

Then('newer funds should appear first by default', async function() {
  const sortIndicator = await this.page.locator('[data-sort="inceptionDate"][aria-sort="descending"]').isVisible();
  expect(sortIndicator).toBe(true);
});

Given('I have sorted by {string} in descending order', async function(sortOption) {
  await this.fundScreenerPage.sortBy(sortOption);
});

When('I click the sort column again', async function() {
  await this.page.click('[data-sort="totalNetAssets"]');
  await this.fundScreenerPage.waitForResults();
});

Then('the sort order should change to ascending', async function() {
  const sortIndicator = await this.page.locator('[data-sort="totalNetAssets"][aria-sort="ascending"]').isVisible();
  expect(sortIndicator).toBe(true);
});

Then('the sort indicator should update accordingly', async function() {
  const sortIndicator = await this.page.locator('[aria-sort="ascending"]').isVisible();
  expect(sortIndicator).toBe(true);
});

Given('there are more than {int} fund results', async function(count) {
  const resultCount = await this.fundScreenerPage.getResultsCount();
  if (resultCount <= count) {
    await this.fundScreenerPage.performKeywordSearch('ETF');
  }
});

When('I view the results', async function() {
  await this.fundScreenerPage.waitForResults();
});

Then('I should see pagination controls', async function() {
  const paginationVisible = await this.page.locator('[data-testid="pagination"]').isVisible();
  expect(paginationVisible).toBe(true);
});

Then('I should see {string} button if more pages exist', async function(buttonText) {
  const nextButton = await this.page.locator(`button:has-text("${buttonText}")`).isVisible();
  expect(nextButton).toBe(true);
});

Given('I am on page {int} of results', async function(pageNumber) {
  if (pageNumber === 2) {
    await this.fundScreenerPage.goToNextPage();
  }
});

When('I click the {string} button', async function(buttonText) {
  if (buttonText === 'Next') {
    await this.fundScreenerPage.goToNextPage();
  } else if (buttonText === 'Previous') {
    await this.fundScreenerPage.goToPreviousPage();
  }
});

Then('I should be taken to page {int}', async function(pageNumber) {
  const currentPage = await this.fundScreenerPage.getCurrentPageNumber();
  expect(parseInt(currentPage)).toBe(pageNumber);
});

Then('the page number should update to {int}', async function(pageNumber) {
  const currentPage = await this.fundScreenerPage.getCurrentPageNumber();
  expect(parseInt(currentPage)).toBe(pageNumber);
});

Then('I should see different funds', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
});

When('I select {string} data view', async function(dataView) {
  await this.fundScreenerPage.switchDataView(dataView);
});

Then('I should see fund names, tickers, and key metrics', async function() {
  const fundName = await this.page.locator('[data-column="name"]').isVisible();
  const ticker = await this.page.locator('[data-column="ticker"]').isVisible();
  expect(fundName).toBe(true);
  expect(ticker).toBe(true);
});

Then('the data view should be highlighted as active', async function() {
  const activeView = await this.page.locator('[data-view="keyFacts"][aria-selected="true"]').isVisible();
  expect(activeView).toBe(true);
});

Then('I should see performance-related columns', async function() {
  const performanceColumn = await this.page.locator('[data-column="ytdReturn"]').isVisible();
  expect(performanceColumn).toBe(true);
});

Then('I should see YTD returns and other performance metrics', async function() {
  const ytdData = await this.page.locator('[data-testid="ytd-return"]').isVisible();
  expect(ytdData).toBe(true);
});

Then('I should see holdings-related information', async function() {
  const holdingsColumn = await this.page.locator('[data-column="topHoldings"]').isVisible();
  expect(holdingsColumn).toBe(true);
});

Then('I should see top holdings data for each fund', async function() {
  const holdingsData = await this.page.locator('[data-testid="holdings-data"]').isVisible();
  expect(holdingsData).toBe(true);
});

Given('I am in {string} data view', async function(dataView) {
  await this.fundScreenerPage.switchDataView(dataView);
});

When('I sort by {string}', async function(sortOption) {
  await this.fundScreenerPage.sortBy(sortOption);
});

Then('the performance data should be sorted correctly', async function() {
  await this.fundScreenerPage.verifySortApplied('ytdReturn');
});

Then('the data view should remain as {string}', async function(dataView) {
  const activeView = await this.page.locator(`[data-view="${dataView}"][aria-selected="true"]`).isVisible();
  expect(activeView).toBe(true);
});

When('I navigate through multiple pages', async function() {
  await this.fundScreenerPage.goToNextPage();
  await this.fundScreenerPage.goToNextPage();
  await this.fundScreenerPage.goToPreviousPage();
});

Then('each page should show the same number of results', async function() {
  const resultCount = await this.fundScreenerPage.getResultsCount();
  expect(resultCount).toBeLessThanOrEqual(25);
  expect(resultCount).toBeGreaterThan(0);
});

Then('the pagination should be consistent', async function() {
  const paginationVisible = await this.page.locator('[data-testid="pagination"]').isVisible();
  expect(paginationVisible).toBe(true);
});

Given('there are hundreds of fund results', async function() {
  await this.fundScreenerPage.performKeywordSearch('');
});

Then('each page should load within {int} seconds', async function(seconds) {
  const startTime = Date.now();
  await this.fundScreenerPage.goToNextPage();
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(seconds * 1000);
});

Then('the sorting should work efficiently', async function() {
  const startTime = Date.now();
  await this.fundScreenerPage.sortBy('expenseRatio');
  const sortTime = Date.now() - startTime;
  expect(sortTime).toBeLessThan(5000);
});

Given('I am viewing fund results', async function() {
  await this.fundScreenerPage.waitForResults();
});

When('I reload the page', async function() {
  await this.page.reload();
  await this.fundScreenerPage.waitForPageLoad();
});

Then('the data should reload', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
});

Then('my current sort and view settings should be maintained', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('sortColumn=');
  expect(currentUrl).toContain('dataView=');
});

Given('I have applied filters that return no results', async function() {
  await this.fundScreenerPage.performKeywordSearch('nonexistentfund123');
});

When('I view the data management controls', async function() {
  await this.page.waitForSelector('[data-testid="data-controls"]');
});

Then('sorting and pagination should be disabled', async function() {
  const sortDisabled = await this.page.locator('[data-testid="sort-dropdown"]:disabled').isVisible();
  const paginationDisabled = await this.page.locator('[data-testid="pagination"]:disabled').isVisible();
  expect(sortDisabled || paginationDisabled).toBe(true);
});

Then('appropriate messaging should be displayed', async function() {
  const noResultsMessage = await this.page.locator('[data-testid="no-results"]').isVisible();
  expect(noResultsMessage).toBe(true);
});
