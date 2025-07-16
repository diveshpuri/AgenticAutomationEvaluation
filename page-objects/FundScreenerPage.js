const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');
const { expect } = require('@playwright/test');

class FundScreenerPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.fundScreener, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await Helpers.waitForPageLoad(this.page);
    await Helpers.waitForElement(this.page, Selectors.fundScreener.container);
  }

  async performKeywordSearch(keyword) {
    await this.selectSearchType('keyword');
    await this.enterSearchTerm(keyword);
    await this.clickSearchButton();
    await this.waitForResults();
  }

  async performExposureSearch(exposure) {
    await this.selectSearchType('exposure');
    await this.page.waitForTimeout(2000); // Wait for UI to update
    
    const exposureInput = this.page.locator('input[placeholder*="company"], input[placeholder*="ticker"], input[placeholder*="geography"], input[placeholder*="sector"]').first();
    await exposureInput.fill(exposure);
    await this.page.waitForTimeout(2000); // Wait for dropdown to appear
    
    try {
      await this.page.click(`:text("${exposure.toUpperCase()}")`, { timeout: 5000 });
    } catch (error) {
      try {
        await this.page.click(`:text("${exposure}")`, { timeout: 5000 });
      } catch (error2) {
        const dropdownOptions = await this.page.locator(`:text("${exposure.toUpperCase()}")`).all();
        if (dropdownOptions.length > 0) {
          await dropdownOptions[0].click();
        } else {
          throw new Error(`No dropdown options found for exposure term: ${exposure}`);
        }
      }
    }
    
    await this.waitForResults();
  }

  async selectSearchType(type) {
    const radioSelector = type === 'keyword' 
      ? Selectors.fundScreener.keywordRadio 
      : Selectors.fundScreener.exposureRadio;
    
    await Helpers.clickWithRetry(this.page, radioSelector);
  }

  async enterSearchTerm(term) {
    try {
      const exposureInput = this.page.locator('input[placeholder*="company"], input[placeholder*="ticker"], input[placeholder*="geography"], input[placeholder*="sector"]').first();
      if (await exposureInput.isVisible({ timeout: 2000 })) {
        await exposureInput.fill(term);
        return;
      }
    } catch (error) {
    }
    
    await Helpers.typeWithClear(this.page, Selectors.fundScreener.searchInput, term);
  }

  async clickSearchButton() {
    try {
      const exposureInput = this.page.locator('input[placeholder*="company"], input[placeholder*="ticker"], input[placeholder*="geography"], input[placeholder*="sector"]').first();
      if (await exposureInput.isVisible({ timeout: 2000 })) {
        await exposureInput.press('Enter');
        await this.page.waitForTimeout(1000);
        return;
      }
    } catch (error) {
    }
    
    try {
      const searchInput = this.page.locator(Selectors.fundScreener.searchInput).first();
      if (await searchInput.isVisible({ timeout: 2000 })) {
        await searchInput.press('Enter');
        await this.page.waitForTimeout(1000);
        return;
      }
    } catch (error) {
    }
    
    const allInputs = await this.page.locator('input[type="text"], input[type="search"]').all();
    for (const input of allInputs) {
      if (await input.isVisible()) {
        await input.press('Enter');
        await this.page.waitForTimeout(1000);
        break;
      }
    }
  }

  async waitForResults() {
    // Wait for the search to process and results to update
    await this.page.waitForTimeout(3000);
    
    // Wait for URL to change (indicating search was triggered) or timeout
    await Promise.race([
      this.page.waitForURL(/search=/, { timeout: 10000 }),
      this.page.waitForURL(/sbeCode=/, { timeout: 10000 }),
      this.page.waitForTimeout(8000)
    ]);
    
    await this.page.waitForTimeout(2000);
  }

  async applyAssetClassFilter(assetClass) {
    const filterSelector = await Helpers.handleShadowRoot(
      this.page,
      'screener-filter-dropdown:has-text("ASSET CLASS")',
      'ishares-dropdown button'
    );
    
    await Helpers.clickWithRetry(this.page, filterSelector);
    await this.page.click(`text="${assetClass}"`);
    await this.waitForResults();
  }

  async applyMarketsRegionsFilter(region) {
    const filterSelector = await Helpers.handleShadowRoot(
      this.page,
      'screener-filter-dropdown:has-text("MARKETS & REGIONS")',
      'ishares-dropdown button'
    );
    
    await Helpers.clickWithRetry(this.page, filterSelector);
    await this.page.click(`text="${region}"`);
    await this.waitForResults();
  }

  async applyProductRangeFilter(range) {
    const filterSelector = await Helpers.handleShadowRoot(
      this.page,
      'screener-filter-dropdown:has-text("PRODUCT RANGE")',
      'ishares-dropdown button'
    );
    
    await Helpers.clickWithRetry(this.page, filterSelector);
    await this.page.click(`text="${range}"`);
    await this.waitForResults();
  }

  async resetAllFilters() {
    await Helpers.clickWithRetry(this.page, Selectors.fundScreener.resetFilters);
    await this.waitForResults();
  }

  async sortBy(sortOption) {
    const sortSelector = await Helpers.handleShadowRoot(
      this.page,
      'screener-sort-dropdown',
      'select, button'
    );
    
    await Helpers.clickWithRetry(this.page, sortSelector);
    await this.page.click(`text="${sortOption}"`);
    await this.waitForResults();
  }

  async switchDataView(view) {
    const viewSelector = Selectors.fundScreener.dataView[view];
    await Helpers.clickWithRetry(this.page, viewSelector);
    await this.waitForResults();
  }

  async getSearchResults() {
    const results = [];
    const fundRows = await this.page.locator(Selectors.fundResults.fundRow).all();
    
    for (const row of fundRows) {
      const fundLink = row.locator(Selectors.fundResults.fundName).first();
      
      const nameElement = fundLink.locator('.fund-name, .column-fundName');
      const name = await nameElement.textContent();
      
      const tickerElement = fundLink.locator('.ticker, .column-localExchangeTicker');
      const ticker = await tickerElement.textContent();
      
      results.push({ 
        name: name?.trim() || '', 
        ticker: ticker?.trim() || ''
      });
    }
    
    return results;
  }

  async getResultsCount() {
    return await this.page.locator(Selectors.fundResults.fundRow).count();
  }

  async verifyNoResults() {
    const totalFundsText = await this.page.locator('screener-total-funds').textContent();
    
    const hasNoResults = totalFundsText && (
      totalFundsText.includes('(0 of') || 
      totalFundsText.includes('filtered ETFs (0') ||
      totalFundsText.includes('Showing 0') ||
      totalFundsText.includes('0 ETFs')
    );
    
    if (!hasNoResults) {
      throw new Error(`Expected no results indication but got: "${totalFundsText}"`);
    }
    
  }

  async verifyResultsExist() {
    const count = await this.getResultsCount();
    expect(count).toBeGreaterThan(0);
  }

  async addFundToComparison(fundIndex = 0) {
    const checkboxes = await this.page.locator(Selectors.fundResults.comparison.addToCompare).all();
    if (checkboxes[fundIndex]) {
      await checkboxes[fundIndex].check();
    }
  }

  async clickCompareButton() {
    await Helpers.clickWithRetry(this.page, Selectors.fundResults.comparison.compareButton);
  }

  async goToNextPage() {
    const currentUrl = this.page.url();
    const urlObj = new URL(currentUrl);
    const currentPage = parseInt(urlObj.hash.match(/pageNumber=(\d+)/)?.[1] || '1');
    const nextPage = currentPage + 1;
    
    const newUrl = currentUrl.replace(/pageNumber=\d+/, `pageNumber=${nextPage}`);
    await this.page.goto(newUrl);
    await this.waitForResults();
  }

  async goToPreviousPage() {
    const currentUrl = this.page.url();
    const urlObj = new URL(currentUrl);
    const currentPage = parseInt(urlObj.hash.match(/pageNumber=(\d+)/)?.[1] || '1');
    
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const newUrl = currentUrl.replace(/pageNumber=\d+/, `pageNumber=${prevPage}`);
      await this.page.goto(newUrl);
      await this.waitForResults();
    }
  }

  async getCurrentPageNumber() {
    const currentUrl = this.page.url();
    const pageNumber = currentUrl.match(/pageNumber=(\d+)/)?.[1] || '1';
    return pageNumber;
  }

  async clickDownloadButton() {
    await Helpers.clickWithRetry(this.page, Selectors.fundScreener.downloadButton);
  }

  async clickFundName(fundIndex = 0) {
    const fundNames = await this.page.locator(Selectors.fundResults.fundName).all();
    if (fundNames[fundIndex]) {
      await fundNames[fundIndex].click();
      await Helpers.waitForPageLoad(this.page);
    }
  }

  async verifyFilterApplied(filterType, filterValue) {
    const activeFilter = `[data-filter="${filterType}"][data-value="${filterValue}"]`;
    await Helpers.verifyElementExists(this.page, activeFilter);
  }

  async verifySortApplied(sortOption) {
    const activeSortIndicator = `[data-sort="${sortOption}"][aria-sort="ascending"], [data-sort="${sortOption}"][aria-sort="descending"]`;
    await Helpers.verifyElementExists(this.page, activeSortIndicator);
  }
}

module.exports = FundScreenerPage;
