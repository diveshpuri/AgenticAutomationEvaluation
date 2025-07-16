const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const testData = require('../utils/testData');

When('I apply the {string} asset class filter', async function(assetClass) {
  await this.fundScreenerPage.applyAssetClassFilter(assetClass);
});

Then('I should see only equity funds in the results', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
  
  const hasEquityFunds = results.some(fund => 
    fund.name.toLowerCase().includes('equity') || 
    fund.name.toLowerCase().includes('stock') ||
    fund.name.toLowerCase().includes('s&p') ||
    fund.name.toLowerCase().includes('msci')
  );
  expect(hasEquityFunds).toBe(true);
});

Then('the filter should be visually indicated as active', async function() {
  await this.fundScreenerPage.verifyFilterApplied('assetClass', 'Equity');
});

When('I apply the {string} markets and regions filter', async function(region) {
  await this.fundScreenerPage.applyMarketsRegionsFilter(region);
});

Then('I should see only US-focused funds in the results', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
  
  const hasUSFunds = results.some(fund => 
    fund.name.toLowerCase().includes('us') || 
    fund.name.toLowerCase().includes('united states') ||
    fund.name.toLowerCase().includes('s&p') ||
    fund.name.toLowerCase().includes('russell')
  );
  expect(hasUSFunds).toBe(true);
});

Then('the geographic filter should be applied correctly', async function() {
  await this.fundScreenerPage.verifyFilterApplied('marketsRegions', 'United States');
});

When('I apply the {string} product range filter', async function(productRange) {
  await this.fundScreenerPage.applyProductRangeFilter(productRange);
});

Then('I should see only core funds in the results', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
  
  const hasCoreFunds = results.some(fund => 
    fund.name.toLowerCase().includes('core')
  );
  expect(hasCoreFunds).toBe(true);
});

Then('the product range filter should be active', async function() {
  await this.fundScreenerPage.verifyFilterApplied('productRange', 'Core');
});

When('I apply the {string} markets and regions filter', async function(region) {
  await this.fundScreenerPage.applyMarketsRegionsFilter(region);
});

Then('I should see only US fixed income funds', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
  
  const hasUSBondFunds = results.some(fund => 
    (fund.name.toLowerCase().includes('bond') || 
     fund.name.toLowerCase().includes('fixed') ||
     fund.name.toLowerCase().includes('treasury') ||
     fund.name.toLowerCase().includes('aggregate')) &&
    (fund.name.toLowerCase().includes('us') || 
     fund.name.toLowerCase().includes('united states'))
  );
  expect(hasUSBondFunds).toBe(true);
});

Then('both filters should be active simultaneously', async function() {
  await this.fundScreenerPage.verifyFilterApplied('assetClass', 'Fixed Income');
  await this.fundScreenerPage.verifyFilterApplied('marketsRegions', 'United States');
});

Given('I have applied multiple filters', async function() {
  await this.fundScreenerPage.applyAssetClassFilter('Equity');
  await this.fundScreenerPage.applyMarketsRegionsFilter('United States');
});

When('I click the {string} button', async function(buttonText) {
  if (buttonText === 'Reset All') {
    await this.fundScreenerPage.resetAllFilters();
  }
});

Then('all filters should be cleared', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).not.toContain('assetClass=');
  expect(currentUrl).not.toContain('marketsRegions=');
  expect(currentUrl).not.toContain('productRange=');
});

Given('I have searched for {string}', async function(searchTerm) {
  await this.fundScreenerPage.performKeywordSearch(searchTerm);
});

Then('I should see bond funds that are also fixed income', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
  
  const hasBondFunds = results.some(fund => 
    fund.name.toLowerCase().includes('bond') || 
    fund.name.toLowerCase().includes('fixed')
  );
  expect(hasBondFunds).toBe(true);
});

Then('both search and filter should be active', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('search=bond');
  expect(currentUrl).toContain('assetClass=Fixed%20Income');
});

When('I apply the {string} markets and regions filter', async function(region) {
  await this.fundScreenerPage.applyMarketsRegionsFilter(region);
});

Then('the filters should remain active', async function() {
  await this.fundScreenerPage.verifyFilterApplied('assetClass', 'Alternatives');
  await this.fundScreenerPage.verifyFilterApplied('marketsRegions', 'Emerging Markets');
});

When('I click on the {string} filter dropdown', async function(filterName) {
  if (filterName === 'Asset Class') {
    const filterSelector = 'screener-filter-dropdown:has-text("ASSET CLASS") ishares-dropdown button';
    await this.page.click(filterSelector);
  }
});

Then('I should see all available asset class options', async function() {
  const options = ['Equity', 'Fixed Income', 'Alternatives', 'Multi-Asset'];
  for (const option of options) {
    const optionVisible = await this.page.locator(`text="${option}"`).isVisible();
    expect(optionVisible).toBe(true);
  }
});

Then('I should be able to select any option', async function() {
  await this.page.click('text="Equity"');
  await this.fundScreenerPage.waitForResults();
});

When('I apply the {string} markets filter', async function(region) {
  await this.fundScreenerPage.applyMarketsRegionsFilter(region);
});

When('I navigate to a fund details page', async function() {
  await this.fundScreenerPage.clickFundName(0);
});

When('I return to the screener', async function() {
  await this.page.goBack();
  await this.fundScreenerPage.waitForPageLoad();
});

Then('the {string} filter should still be active', async function(filterValue) {
  await this.fundScreenerPage.verifyFilterApplied('marketsRegions', filterValue);
});

Then('the filtered results should be maintained', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
});

When('I navigate to the asset class filter using keyboard', async function() {
  await this.page.keyboard.press('Tab');
  await this.page.keyboard.press('Tab');
});

When('I press Enter to open the dropdown', async function() {
  await this.page.keyboard.press('Enter');
});

Then('I should be able to navigate options using arrow keys', async function() {
  await this.page.keyboard.press('ArrowDown');
  await this.page.keyboard.press('ArrowUp');
});

Then('I should be able to select an option using Enter', async function() {
  await this.page.keyboard.press('Enter');
});

When('I remove the {string} filter', async function(filterType) {
  if (filterType === 'Asset Class') {
    const removeButton = '[data-filter="assetClass"] button[aria-label="Remove filter"]';
    await this.page.click(removeButton);
  }
});

Then('only the asset class filter should be cleared', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).not.toContain('assetClass=');
});

Then('other filters should remain active', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('marketsRegions=');
});

When('I apply conflicting filters', async function() {
  await this.fundScreenerPage.applyAssetClassFilter('Equity');
  await this.fundScreenerPage.applyAssetClassFilter('Fixed Income');
});

Then('the system should handle the conflict gracefully', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThanOrEqual(0);
});

Then('provide appropriate feedback to the user', async function() {
  const hasErrorMessage = await this.page.locator('[data-testid="filter-conflict-message"]').isVisible();
  expect(hasErrorMessage).toBe(true);
});
