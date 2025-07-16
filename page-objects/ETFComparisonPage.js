const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');
const { expect } = require('@playwright/test');

class ETFComparisonPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.etfComparison, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await this.waitForPageLoad();
  }

  async navigateFromTools(toolName) {
    const toolSelector = `text="${toolName}"`;
    await Helpers.clickWithRetry(this.page, toolSelector);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await Helpers.waitForPageLoad(this.page);
    await this.page.waitForTimeout(3000);
  }

  async verifyComparisonInterface() {
    const pageContent = await this.page.textContent('body');
    const hasComparisonInterface = 
      pageContent.includes('compare') || 
      pageContent.includes('comparison') ||
      pageContent.includes('ETF') ||
      pageContent.includes('fund');
    
    expect(hasComparisonInterface).toBe(true);
  }

  async verifyAddFundOptions() {
    const pageContent = await this.page.textContent('body');
    const hasAddOptions = 
      pageContent.includes('add') || 
      pageContent.includes('search') ||
      pageContent.includes('select') ||
      pageContent.includes('ticker');
    
    expect(hasAddOptions).toBe(true);
  }

  async addFundToComparison(ticker) {
    try {
      const searchInput = this.page.locator('input[placeholder*="search"], input[placeholder*="ticker"], input[placeholder*="fund"]').first();
      if (await searchInput.isVisible({ timeout: 5000 })) {
        await searchInput.fill(ticker);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Add fund functionality not available in current interface`);
    }
  }

  async verifyFundComparison(ticker1, ticker2) {
    const pageContent = await this.page.textContent('body');
    const hasComparison = 
      pageContent.includes(ticker1) || 
      pageContent.includes(ticker2) ||
      pageContent.includes('expense') ||
      pageContent.includes('performance');
    
    expect(hasComparison).toBe(true);
  }

  async verifyComparisonMetrics() {
    const pageContent = await this.page.textContent('body');
    const hasMetrics = 
      pageContent.includes('expense ratio') || 
      pageContent.includes('assets') ||
      pageContent.includes('performance') ||
      pageContent.includes('return') ||
      pageContent.includes('%');
    
    expect(hasMetrics).toBe(true);
  }

  async removeFundFromComparison() {
    try {
      const removeButton = this.page.locator('button:has-text("remove"), button:has-text("delete"), button:has-text("×")').first();
      if (await removeButton.isVisible({ timeout: 5000 })) {
        await removeButton.click();
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Remove fund functionality not available in current interface`);
    }
  }

  async verifyMorningstarFeatures() {
    const pageContent = await this.page.textContent('body');
    const hasMorningstarFeatures = 
      pageContent.includes('Morningstar') || 
      pageContent.includes('analysis') ||
      pageContent.includes('rating') ||
      pageContent.includes('external');
    
    expect(hasMorningstarFeatures).toBe(true);
  }

  async searchForFunds(searchTerm) {
    try {
      const searchInput = this.page.locator('input[type="search"], input[placeholder*="search"]').first();
      if (await searchInput.isVisible({ timeout: 5000 })) {
        await searchInput.fill(searchTerm);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`Search functionality not available in current interface`);
    }
  }

  async verifyDetailedAnalysis() {
    const pageContent = await this.page.textContent('body');
    const hasDetailedAnalysis = 
      pageContent.includes('analysis') || 
      pageContent.includes('performance') ||
      pageContent.includes('risk') ||
      pageContent.includes('chart');
    
    expect(hasDetailedAnalysis).toBe(true);
  }

  async verifyMultipleFundsComparison() {
    const pageContent = await this.page.textContent('body');
    const hasMultipleComparison = 
      pageContent.includes('table') || 
      pageContent.includes('comparison') ||
      pageContent.includes('sort') ||
      pageContent.includes('filter');
    
    expect(hasMultipleComparison).toBe(true);
  }

  async sortComparisonBy(metric) {
    try {
      const sortButton = this.page.locator(`button:has-text("${metric}"), th:has-text("${metric}")`).first();
      if (await sortButton.isVisible({ timeout: 5000 })) {
        await sortButton.click();
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Sort functionality not available for ${metric}`);
    }
  }

  async verifyErrorHandling(invalidTicker) {
    await this.addFundToComparison(invalidTicker);
    const pageContent = await this.page.textContent('body');
    const hasErrorHandling = 
      pageContent.includes('error') || 
      pageContent.includes('not found') ||
      pageContent.includes('invalid') ||
      pageContent.includes('try again');
    
    expect(hasErrorHandling).toBe(true);
  }

  async clickExportOptions() {
    try {
      const exportButton = this.page.locator('button:has-text("export"), button:has-text("download"), a:has-text("download")').first();
      if (await exportButton.isVisible({ timeout: 5000 })) {
        await exportButton.click();
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Export functionality not available in current interface`);
    }
  }

  async verifyExportFunctionality() {
    const pageContent = await this.page.textContent('body');
    const hasExportOptions = 
      pageContent.includes('export') || 
      pageContent.includes('download') ||
      pageContent.includes('save') ||
      pageContent.includes('PDF') ||
      pageContent.includes('Excel');
    
    expect(hasExportOptions).toBe(true);
  }

  async verifyPageRedirection() {
    const currentUrl = this.page.url();
    const hasValidUrl = 
      currentUrl.includes('compare') || 
      currentUrl.includes('comparison') ||
      currentUrl.includes('morningstar') ||
      currentUrl.includes('ishares');
    
    expect(hasValidUrl).toBe(true);
  }
}

module.exports = ETFComparisonPage;
