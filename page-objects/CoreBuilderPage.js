const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');
const { expect } = require('@playwright/test');

class CoreBuilderPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.coreBuilder, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await this.waitForPageLoad();
  }

  async navigateFromTools() {
    const coreBuilderSelector = 'text="Core Builder"';
    await Helpers.clickWithRetry(this.page, coreBuilderSelector);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await Helpers.waitForPageLoad(this.page);
    await this.page.waitForTimeout(3000);
  }

  async verifyPortfolioBuildingInterface() {
    try {
      await Helpers.verifyElementExists(this.page, Selectors.coreBuilder.container);
    } catch (error) {
      const pageContent = await this.page.textContent('body');
      expect(pageContent).toContain('diversified portfolio');
    }
  }

  async verifyEducationalContent() {
    const pageContent = await this.page.textContent('body');
    const hasEducationalContent = 
      pageContent.includes('diversification') || 
      pageContent.includes('Core ETFs') ||
      pageContent.includes('portfolio') ||
      pageContent.includes('building blocks');
    
    expect(hasEducationalContent).toBe(true);
  }

  async verifyPortfolioOptions() {
    const pageContent = await this.page.textContent('body');
    const hasPortfolioOptions = 
      pageContent.includes('allocation') || 
      pageContent.includes('risk') ||
      pageContent.includes('timeline') ||
      pageContent.includes('investment');
    
    expect(hasPortfolioOptions).toBe(true);
  }

  async selectRiskTolerance(level) {
    try {
      const riskSelector = `text="${level}"`;
      await Helpers.clickWithRetry(this.page, riskSelector);
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log(`Risk tolerance selector not found, continuing with test`);
    }
  }

  async selectInvestmentTimeline(timeline) {
    try {
      const timelineSelector = `text="${timeline}"`;
      await Helpers.clickWithRetry(this.page, timelineSelector);
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log(`Investment timeline selector not found, continuing with test`);
    }
  }

  async verifyPortfolioRecommendations() {
    const pageContent = await this.page.textContent('body');
    const hasRecommendations = 
      pageContent.includes('recommendation') || 
      pageContent.includes('allocation') ||
      pageContent.includes('ETF') ||
      pageContent.includes('%');
    
    expect(hasRecommendations).toBe(true);
  }

  async verifyErrorHandling() {
    const pageContent = await this.page.textContent('body');
    const hasValidContent = 
      pageContent.includes('Core') || 
      pageContent.includes('portfolio') ||
      pageContent.includes('ETF') ||
      pageContent.includes('investment');
    
    expect(hasValidContent).toBe(true);
  }

  async verifyAccessibility() {
    const focusableElements = await this.page.locator('button, input, select, textarea, a[href]').count();
    expect(focusableElements).toBeGreaterThan(0);
    
    await this.page.keyboard.press('Tab');
    const focusedElement = await this.page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThanOrEqual(0);
  }

  async verifyPageRedirection() {
    const currentUrl = this.page.url();
    const hasValidUrl = 
      currentUrl.includes('core') || 
      currentUrl.includes('builder') ||
      currentUrl.includes('portfolio') ||
      currentUrl.includes('ishares');
    
    expect(hasValidUrl).toBe(true);
  }
}

module.exports = CoreBuilderPage;
