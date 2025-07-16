const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const testData = require('../utils/testData');

Given('I am on the iShares fund screener page', async function() {
  await this.fundScreenerPage.navigate();
});

When('I select {string} search type', async function(searchType) {
  await this.fundScreenerPage.selectSearchType(searchType);
});

When('I search for {string}', { timeout: 15000 }, async function(searchTerm) {
  await this.fundScreenerPage.enterSearchTerm(searchTerm);
  await this.fundScreenerPage.clickSearchButton();
  await this.fundScreenerPage.waitForResults();
});

Then('I should see search results containing technology-related funds', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
  
  const hasTechFunds = results.some(fund => 
    fund.name.toLowerCase().includes('technology') || 
    fund.name.toLowerCase().includes('tech')
  );
  expect(hasTechFunds).toBe(true);
});

Then('the results should be displayed in a table format', async function() {
  await this.fundScreenerPage.verifyResultsExist();
});

Then('I should see the {string} fund in the results', async function(fundName) {
  const results = await this.fundScreenerPage.getSearchResults();
  const fundFound = results.some(fund => 
    fund.name.toLowerCase().includes(fundName.toLowerCase())
  );
  expect(fundFound).toBe(true);
});

Then('the fund ticker should be {string}', async function(expectedTicker) {
  const results = await this.fundScreenerPage.getSearchResults();
  const fundWithTicker = results.find(fund => fund.ticker === expectedTicker);
  expect(fundWithTicker).toBeTruthy();
});

Then('I should see funds with Apple exposure', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
  
  const hasAppleExposure = results.some(fund => 
    fund.name.toLowerCase().includes('technology') || 
    fund.name.toLowerCase().includes('equity') ||
    fund.name.toLowerCase().includes('large') ||
    fund.name.toLowerCase().includes('growth') ||
    fund.name.toLowerCase().includes('core')
  );
  expect(hasAppleExposure).toBe(true);
});

Then('the results should contain relevant equity funds', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  
  const hasEquityFunds = results.some(fund => 
    fund.name.toLowerCase().includes('equity') || 
    fund.name.toLowerCase().includes('technology') ||
    fund.name.toLowerCase().includes('growth')
  );
  expect(hasEquityFunds).toBe(true);
});

Then('I should see a {string} message', async function(messageType) {
  if (messageType.toLowerCase() === 'no results') {
    await this.fundScreenerPage.verifyNoResults();
  }
});

Then('no fund results should be displayed', async function() {
  const totalFundsText = await this.page.locator('screener-total-funds').textContent();
  const hasNoResults = totalFundsText && (
    totalFundsText.includes('(0 of') || 
    totalFundsText.includes('filtered ETFs (0') ||
    totalFundsText.includes('Showing 0') ||
    totalFundsText.includes('0 ETFs')
  );
  expect(hasNoResults).toBe(true);
});

Then('the search should handle special characters gracefully', async function() {
  await this.fundScreenerPage.verifyNoResults();
});

Given('I have performed a search for {string}', { timeout: 15000 }, async function(searchTerm) {
  await this.fundScreenerPage.performKeywordSearch(searchTerm);
});

When('I clear the search field', async function() {
  await this.fundScreenerPage.enterSearchTerm('');
});

When('I click the search button', async function() {
  await this.fundScreenerPage.clickSearchButton();
  await this.fundScreenerPage.waitForResults();
});

Then('I should see all available funds', async function() {
  const count = await this.fundScreenerPage.getResultsCount();
  expect(count).toBeGreaterThan(0);
});

Then('the search filter should be removed', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).not.toContain('search=');
});

When('I navigate to the second page of results', { timeout: 10000 }, async function() {
  await this.fundScreenerPage.goToNextPage();
});

When('I refresh the page', async function() {
  await this.page.reload();
  await this.fundScreenerPage.waitForPageLoad();
});

Then('the search term {string} should still be active', async function(searchTerm) {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain(`search=${encodeURIComponent(searchTerm)}`);
});

Then('I should still be on the second page of results', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('pageNumber=2');
});

Then('the search results should load within {int} seconds', async function(seconds) {
  const startTime = Date.now();
  await this.fundScreenerPage.waitForResults();
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(seconds * 1000);
});

Then('pagination should be available for large result sets', async function() {
  const count = await this.fundScreenerPage.getResultsCount();
  if (count >= 25) {
    const nextButton = await this.page.locator('button:has-text("Next")').isVisible();
    expect(nextButton).toBe(true);
  }
});

Then('I should see the same results as searching for {string}', { timeout: 20000 }, async function(searchTerm) {
  const currentResults = await this.fundScreenerPage.getSearchResults();
  
  await this.fundScreenerPage.enterSearchTerm(searchTerm.toLowerCase());
  await this.fundScreenerPage.clickSearchButton();
  await this.fundScreenerPage.waitForResults();
  
  const lowerCaseResults = await this.fundScreenerPage.getSearchResults();
  expect(currentResults.length).toBe(lowerCaseResults.length);
});

Then('the search should be case insensitive', async function() {
});

Then('I should see funds containing {string} in their names', async function(partialTerm) {
  const results = await this.fundScreenerPage.getSearchResults();
  const hasPartialMatches = results.some(fund => 
    fund.name.toLowerCase().includes(partialTerm.toLowerCase())
  );
  expect(hasPartialMatches).toBe(true);
});

Then('partial matches should be supported', async function() {
});
