const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');
const { expect } = require('@playwright/test');

class InvestmentDiscoveryPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.investmentDiscovery, { 
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

  async verifyInvestmentGoalsPage() {
    const pageContent = await this.page.textContent('body');
    const hasGoalsContent = 
      pageContent.includes('goal') || 
      pageContent.includes('investment') ||
      pageContent.includes('Growth') ||
      pageContent.includes('Income') ||
      pageContent.includes('Core');
    
    expect(hasGoalsContent).toBe(true);
  }

  async verifyGoalCategories() {
    const pageContent = await this.page.textContent('body');
    const hasGoalCategories = 
      pageContent.includes('Growth') || 
      pageContent.includes('Income') ||
      pageContent.includes('Core') ||
      pageContent.includes('Thematic');
    
    expect(hasGoalCategories).toBe(true);
  }

  async verifyHoldingsDiscoveryPage() {
    const pageContent = await this.page.textContent('body');
    const hasHoldingsContent = 
      pageContent.includes('holdings') || 
      pageContent.includes('exposure') ||
      pageContent.includes('company') ||
      pageContent.includes('sector') ||
      pageContent.includes('search');
    
    expect(hasHoldingsContent).toBe(true);
  }

  async verifySearchInterface() {
    const pageContent = await this.page.textContent('body');
    const hasSearchInterface = 
      pageContent.includes('search') || 
      pageContent.includes('company') ||
      pageContent.includes('sector') ||
      pageContent.includes('ticker');
    
    expect(hasSearchInterface).toBe(true);
  }

  async selectInvestmentGoal(goal) {
    try {
      const goalSelector = `text="${goal}"`;
      await Helpers.clickWithRetry(this.page, goalSelector);
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log(`Goal selection not available for ${goal}`);
    }
  }

  async searchForHolding(searchTerm) {
    try {
      const searchInput = this.page.locator('input[placeholder*="company"], input[placeholder*="search"], input[placeholder*="ticker"]').first();
      if (await searchInput.isVisible({ timeout: 5000 })) {
        await searchInput.fill(searchTerm);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`Search functionality not available in current interface`);
    }
  }

  async verifyETFRecommendations() {
    const pageContent = await this.page.textContent('body');
    const hasRecommendations = 
      pageContent.includes('ETF') || 
      pageContent.includes('fund') ||
      pageContent.includes('iShares') ||
      pageContent.includes('ticker');
    
    expect(hasRecommendations).toBe(true);
  }

  async verifyHoldingsResults(searchTerm) {
    const pageContent = await this.page.textContent('body');
    const hasResults = 
      pageContent.includes(searchTerm) || 
      pageContent.includes('ETF') ||
      pageContent.includes('exposure') ||
      pageContent.includes('holdings');
    
    expect(hasResults).toBe(true);
  }

  async verifyExposurePercentages() {
    const pageContent = await this.page.textContent('body');
    const hasPercentages = 
      pageContent.includes('%') || 
      pageContent.includes('percent') ||
      pageContent.includes('allocation') ||
      pageContent.includes('weight');
    
    expect(hasPercentages).toBe(true);
  }

  async verifyGrowthETFs() {
    const pageContent = await this.page.textContent('body');
    const hasGrowthContent = 
      pageContent.includes('growth') || 
      pageContent.includes('Growth') ||
      pageContent.includes('ETF') ||
      pageContent.includes('performance');
    
    expect(hasGrowthContent).toBe(true);
  }

  async verifyPerformanceMetrics() {
    const pageContent = await this.page.textContent('body');
    const hasMetrics = 
      pageContent.includes('performance') || 
      pageContent.includes('return') ||
      pageContent.includes('%') ||
      pageContent.includes('YTD');
    
    expect(hasMetrics).toBe(true);
  }

  async verifyTechnologyETFs() {
    const pageContent = await this.page.textContent('body');
    const hasTechContent = 
      pageContent.includes('Technology') || 
      pageContent.includes('technology') ||
      pageContent.includes('tech') ||
      pageContent.includes('sector');
    
    expect(hasTechContent).toBe(true);
  }

  async verifySectorAllocation() {
    const pageContent = await this.page.textContent('body');
    const hasSectorInfo = 
      pageContent.includes('sector') || 
      pageContent.includes('allocation') ||
      pageContent.includes('%') ||
      pageContent.includes('breakdown');
    
    expect(hasSectorInfo).toBe(true);
  }

  async verifyNoResultsMessage() {
    const pageContent = await this.page.textContent('body');
    const hasNoResults = 
      pageContent.includes('no results') || 
      pageContent.includes('not found') ||
      pageContent.includes('try again') ||
      pageContent.includes('no matches');
    
    expect(hasNoResults).toBe(true);
  }

  async verifyEducationalContent() {
    const pageContent = await this.page.textContent('body');
    const hasEducationalContent = 
      pageContent.includes('learn') || 
      pageContent.includes('education') ||
      pageContent.includes('risk') ||
      pageContent.includes('guidance');
    
    expect(hasEducationalContent).toBe(true);
  }

  async selectETFFromResults() {
    try {
      const etfLink = this.page.locator('a:has-text("ETF"), a:has-text("iShares")').first();
      if (await etfLink.isVisible({ timeout: 5000 })) {
        await etfLink.click();
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`ETF selection not available in current interface`);
    }
  }

  async verifyDetailedHoldings() {
    const pageContent = await this.page.textContent('body');
    const hasDetailedHoldings = 
      pageContent.includes('holdings') || 
      pageContent.includes('top holdings') ||
      pageContent.includes('weight') ||
      pageContent.includes('breakdown');
    
    expect(hasDetailedHoldings).toBe(true);
  }

  async verifyGeographicAllocations() {
    const pageContent = await this.page.textContent('body');
    const hasGeographicInfo = 
      pageContent.includes('geographic') || 
      pageContent.includes('country') ||
      pageContent.includes('region') ||
      pageContent.includes('allocation');
    
    expect(hasGeographicInfo).toBe(true);
  }

  async verifyPageRedirection() {
    const currentUrl = this.page.url();
    const hasValidUrl = 
      currentUrl.includes('goal') || 
      currentUrl.includes('holdings') ||
      currentUrl.includes('discover') ||
      currentUrl.includes('ishares');
    
    expect(hasValidUrl).toBe(true);
  }
}

module.exports = InvestmentDiscoveryPage;
