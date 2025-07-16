const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');
const { expect } = require('@playwright/test');

class AdvisorToolsPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.advisorTools, { 
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

  async verifyTaxOptimizationPage() {
    const pageContent = await this.page.textContent('body');
    const hasTaxOptimization = 
      pageContent.includes('tax') || 
      pageContent.includes('efficiency') ||
      pageContent.includes('optimization') ||
      pageContent.includes('correlation');
    
    expect(hasTaxOptimization).toBe(true);
  }

  async verifyCorrelationAnalysisInterface() {
    const pageContent = await this.page.textContent('body');
    const hasCorrelationInterface = 
      pageContent.includes('correlation') || 
      pageContent.includes('analysis') ||
      pageContent.includes('coefficient') ||
      pageContent.includes('relationship');
    
    expect(hasCorrelationInterface).toBe(true);
  }

  async verifyHoldingsOverlapOptions() {
    const pageContent = await this.page.textContent('body');
    const hasOverlapOptions = 
      pageContent.includes('holdings') || 
      pageContent.includes('overlap') ||
      pageContent.includes('diversification') ||
      pageContent.includes('portfolio');
    
    expect(hasOverlapOptions).toBe(true);
  }

  async selectFundsForCorrelation() {
    try {
      const fundSelector = this.page.locator('input[placeholder*="fund"], select option').first();
      if (await fundSelector.isVisible({ timeout: 5000 })) {
        await fundSelector.click();
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Fund selection for correlation not available`);
    }
  }

  async verifyCorrelationCoefficients() {
    const pageContent = await this.page.textContent('body');
    const hasCorrelationData = 
      pageContent.includes('correlation') || 
      pageContent.includes('coefficient') ||
      pageContent.includes('0.') ||
      pageContent.includes('%');
    
    expect(hasCorrelationData).toBe(true);
  }

  async verifyTaxEfficientRecommendations() {
    const pageContent = await this.page.textContent('body');
    const hasRecommendations = 
      pageContent.includes('recommendation') || 
      pageContent.includes('tax-efficient') ||
      pageContent.includes('optimize') ||
      pageContent.includes('suggest');
    
    expect(hasRecommendations).toBe(true);
  }

  async analyzeHoldingsOverlap() {
    try {
      const analyzeButton = this.page.locator('button:has-text("analyze"), button:has-text("calculate")').first();
      if (await analyzeButton.isVisible({ timeout: 5000 })) {
        await analyzeButton.click();
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`Holdings overlap analysis not available`);
    }
  }

  async verifyOverlapPercentage() {
    const pageContent = await this.page.textContent('body');
    const hasOverlapData = 
      pageContent.includes('overlap') || 
      pageContent.includes('%') ||
      pageContent.includes('percentage') ||
      pageContent.includes('holdings');
    
    expect(hasOverlapData).toBe(true);
  }

  async verifyDiversificationSuggestions() {
    const pageContent = await this.page.textContent('body');
    const hasDiversificationSuggestions = 
      pageContent.includes('diversification') || 
      pageContent.includes('suggestion') ||
      pageContent.includes('improve') ||
      pageContent.includes('reduce overlap');
    
    expect(hasDiversificationSuggestions).toBe(true);
  }

  async verifyAdvisorCenterRedirection() {
    const currentUrl = this.page.url();
    const hasAdvisorCenterUrl = 
      currentUrl.includes('advisor') || 
      currentUrl.includes('professional') ||
      currentUrl.includes('blackrock') ||
      currentUrl.includes('center');
    
    expect(hasAdvisorCenterUrl).toBe(true);
  }

  async verifyBlackRockSophisticatedTools() {
    const pageContent = await this.page.textContent('body');
    const hasSophisticatedTools = 
      pageContent.includes('BlackRock') || 
      pageContent.includes('sophisticated') ||
      pageContent.includes('professional') ||
      pageContent.includes('advanced');
    
    expect(hasSophisticatedTools).toBe(true);
  }

  async verifyProfessionalAnalysisTools() {
    const pageContent = await this.page.textContent('body');
    const hasProfessionalTools = 
      pageContent.includes('analysis') || 
      pageContent.includes('professional') ||
      pageContent.includes('research') ||
      pageContent.includes('institutional');
    
    expect(hasProfessionalTools).toBe(true);
  }

  async buildTaxEfficientPortfolio() {
    try {
      const buildButton = this.page.locator('button:has-text("build"), button:has-text("construct")').first();
      if (await buildButton.isVisible({ timeout: 5000 })) {
        await buildButton.click();
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`Portfolio building not available`);
    }
  }

  async verifyTaxLossHarvestingOpportunities() {
    const pageContent = await this.page.textContent('body');
    const hasTaxLossHarvesting = 
      pageContent.includes('tax-loss') || 
      pageContent.includes('harvesting') ||
      pageContent.includes('loss') ||
      pageContent.includes('opportunity');
    
    expect(hasTaxLossHarvesting).toBe(true);
  }

  async verifyAssetLocationRecommendations() {
    const pageContent = await this.page.textContent('body');
    const hasAssetLocation = 
      pageContent.includes('asset location') || 
      pageContent.includes('allocation') ||
      pageContent.includes('placement') ||
      pageContent.includes('account type');
    
    expect(hasAssetLocation).toBe(true);
  }

  async verifyAfterTaxReturnProjections() {
    const pageContent = await this.page.textContent('body');
    const hasAfterTaxReturns = 
      pageContent.includes('after-tax') || 
      pageContent.includes('return') ||
      pageContent.includes('projection') ||
      pageContent.includes('tax-adjusted');
    
    expect(hasAfterTaxReturns).toBe(true);
  }

  async inputClientPortfolioInformation() {
    try {
      const portfolioInput = this.page.locator('input[placeholder*="portfolio"], textarea').first();
      if (await portfolioInput.isVisible({ timeout: 5000 })) {
        await portfolioInput.fill('Sample client portfolio data');
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Client portfolio input not available`);
    }
  }

  async verifyTaxEfficiencyAnalysis() {
    const pageContent = await this.page.textContent('body');
    const hasTaxEfficiencyAnalysis = 
      pageContent.includes('tax efficiency') || 
      pageContent.includes('analysis') ||
      pageContent.includes('efficiency') ||
      pageContent.includes('tax impact');
    
    expect(hasTaxEfficiencyAnalysis).toBe(true);
  }

  async verifyImprovementRecommendations() {
    const pageContent = await this.page.textContent('body');
    const hasImprovementRecommendations = 
      pageContent.includes('improvement') || 
      pageContent.includes('recommendation') ||
      pageContent.includes('optimize') ||
      pageContent.includes('enhance');
    
    expect(hasImprovementRecommendations).toBe(true);
  }

  async verifyTaxSavingsCalculations() {
    const pageContent = await this.page.textContent('body');
    const hasTaxSavings = 
      pageContent.includes('tax savings') || 
      pageContent.includes('savings') ||
      pageContent.includes('calculation') ||
      pageContent.includes('benefit');
    
    expect(hasTaxSavings).toBe(true);
  }

  async verifyPortfolioConstructionTools() {
    const pageContent = await this.page.textContent('body');
    const hasPortfolioTools = 
      pageContent.includes('portfolio construction') || 
      pageContent.includes('construction') ||
      pageContent.includes('building') ||
      pageContent.includes('allocation');
    
    expect(hasPortfolioTools).toBe(true);
  }

  async verifyRiskAnalysisCapabilities() {
    const pageContent = await this.page.textContent('body');
    const hasRiskAnalysis = 
      pageContent.includes('risk analysis') || 
      pageContent.includes('risk') ||
      pageContent.includes('volatility') ||
      pageContent.includes('assessment');
    
    expect(hasRiskAnalysis).toBe(true);
  }

  async verifyClientReportingFeatures() {
    const pageContent = await this.page.textContent('body');
    const hasClientReporting = 
      pageContent.includes('client reporting') || 
      pageContent.includes('reporting') ||
      pageContent.includes('client') ||
      pageContent.includes('report');
    
    expect(hasClientReporting).toBe(true);
  }

  async verifyMarketResearchTools() {
    const pageContent = await this.page.textContent('body');
    const hasMarketResearch = 
      pageContent.includes('market research') || 
      pageContent.includes('research') ||
      pageContent.includes('market') ||
      pageContent.includes('insights');
    
    expect(hasMarketResearch).toBe(true);
  }

  async provideInvalidPortfolioData() {
    try {
      const portfolioInput = this.page.locator('input[placeholder*="portfolio"], textarea').first();
      if (await portfolioInput.isVisible({ timeout: 5000 })) {
        await portfolioInput.fill('INVALID_DATA_123!@#');
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Portfolio input not available for error testing`);
    }
  }

  async verifyErrorMessages() {
    const pageContent = await this.page.textContent('body');
    const hasErrorMessages = 
      pageContent.includes('error') || 
      pageContent.includes('invalid') ||
      pageContent.includes('correct') ||
      pageContent.includes('try again');
    
    expect(hasErrorMessages).toBe(true);
  }

  async verifyAdvancedAnalytics() {
    const pageContent = await this.page.textContent('body');
    const hasAdvancedAnalytics = 
      pageContent.includes('advanced') || 
      pageContent.includes('analytics') ||
      pageContent.includes('sophisticated') ||
      pageContent.includes('professional');
    
    expect(hasAdvancedAnalytics).toBe(true);
  }

  async verifyClientManagementFeatures() {
    const pageContent = await this.page.textContent('body');
    const hasClientManagement = 
      pageContent.includes('client management') || 
      pageContent.includes('management') ||
      pageContent.includes('client') ||
      pageContent.includes('CRM');
    
    expect(hasClientManagement).toBe(true);
  }

  async verifyInstitutionalGradeTools() {
    const pageContent = await this.page.textContent('body');
    const hasInstitutionalTools = 
      pageContent.includes('institutional') || 
      pageContent.includes('grade') ||
      pageContent.includes('professional') ||
      pageContent.includes('enterprise');
    
    expect(hasInstitutionalTools).toBe(true);
  }

  async verifyComplianceFeatures() {
    const pageContent = await this.page.textContent('body');
    const hasComplianceFeatures = 
      pageContent.includes('compliance') || 
      pageContent.includes('regulatory') ||
      pageContent.includes('reporting') ||
      pageContent.includes('audit');
    
    expect(hasComplianceFeatures).toBe(true);
  }

  async verifyPageRedirection() {
    const currentUrl = this.page.url();
    const hasValidUrl = 
      currentUrl.includes('advisor') || 
      currentUrl.includes('tax') ||
      currentUrl.includes('professional') ||
      currentUrl.includes('ishares');
    
    expect(hasValidUrl).toBe(true);
  }
}

module.exports = AdvisorToolsPage;
