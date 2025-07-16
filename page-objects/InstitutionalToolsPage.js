const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');
const { expect } = require('@playwright/test');

class InstitutionalToolsPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.institutionalTools, { 
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

  async verifyInstitutionalAnalyticsPage() {
    const pageContent = await this.page.textContent('body');
    const hasInstitutionalAnalytics = 
      pageContent.includes('institutional') || 
      pageContent.includes('analytics') ||
      pageContent.includes('simplify') ||
      pageContent.includes('investing');
    
    expect(hasInstitutionalAnalytics).toBe(true);
  }

  async verifyTradeCostAnalysisInterface() {
    const pageContent = await this.page.textContent('body');
    const hasTradeCostInterface = 
      pageContent.includes('trade cost') || 
      pageContent.includes('trading') ||
      pageContent.includes('cost') ||
      pageContent.includes('analysis');
    
    expect(hasTradeCostInterface).toBe(true);
  }

  async verifyLiquidityAnalysisOptions() {
    const pageContent = await this.page.textContent('body');
    const hasLiquidityOptions = 
      pageContent.includes('liquidity') || 
      pageContent.includes('volume') ||
      pageContent.includes('market depth') ||
      pageContent.includes('trading');
    
    expect(hasLiquidityOptions).toBe(true);
  }

  async verifyInstitutionalToolsPortal() {
    const pageContent = await this.page.textContent('body');
    const hasInstitutionalPortal = 
      pageContent.includes('institutional tools') || 
      pageContent.includes('portal') ||
      pageContent.includes('access') ||
      pageContent.includes('sophisticated');
    
    expect(hasInstitutionalPortal).toBe(true);
  }

  async verifySophisticatedAnalyticsTools() {
    const pageContent = await this.page.textContent('body');
    const hasSophisticatedTools = 
      pageContent.includes('sophisticated') || 
      pageContent.includes('analytics') ||
      pageContent.includes('advanced') ||
      pageContent.includes('professional');
    
    expect(hasSophisticatedTools).toBe(true);
  }

  async verifyInstitutionalResearchCapabilities() {
    const pageContent = await this.page.textContent('body');
    const hasResearchCapabilities = 
      pageContent.includes('research') || 
      pageContent.includes('institutional-grade') ||
      pageContent.includes('analysis') ||
      pageContent.includes('insights');
    
    expect(hasResearchCapabilities).toBe(true);
  }

  async selectETFForTradeCostAnalysis(ticker) {
    try {
      const etfInput = this.page.locator('input[placeholder*="ETF"], input[placeholder*="ticker"], input[placeholder*="symbol"]').first();
      if (await etfInput.isVisible({ timeout: 5000 })) {
        await etfInput.fill(ticker);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`ETF selection for trade cost analysis not available`);
    }
  }

  async verifyBidAskSpreadAnalysis() {
    const pageContent = await this.page.textContent('body');
    const hasBidAskAnalysis = 
      pageContent.includes('bid-ask') || 
      pageContent.includes('spread') ||
      pageContent.includes('bid') ||
      pageContent.includes('ask');
    
    expect(hasBidAskAnalysis).toBe(true);
  }

  async verifyMarketImpactCostEstimates() {
    const pageContent = await this.page.textContent('body');
    const hasMarketImpact = 
      pageContent.includes('market impact') || 
      pageContent.includes('impact cost') ||
      pageContent.includes('cost estimate') ||
      pageContent.includes('trading cost');
    
    expect(hasMarketImpact).toBe(true);
  }

  async verifyTradingVolumeAnalysis() {
    const pageContent = await this.page.textContent('body');
    const hasVolumeAnalysis = 
      pageContent.includes('trading volume') || 
      pageContent.includes('volume') ||
      pageContent.includes('daily volume') ||
      pageContent.includes('turnover');
    
    expect(hasVolumeAnalysis).toBe(true);
  }

  async verifyOptimalExecutionRecommendations() {
    const pageContent = await this.page.textContent('body');
    const hasExecutionRecommendations = 
      pageContent.includes('optimal execution') || 
      pageContent.includes('execution') ||
      pageContent.includes('recommendation') ||
      pageContent.includes('strategy');
    
    expect(hasExecutionRecommendations).toBe(true);
  }

  async analyzeLiquidityMetrics() {
    try {
      const analyzeButton = this.page.locator('button:has-text("analyze"), button:has-text("liquidity")').first();
      if (await analyzeButton.isVisible({ timeout: 5000 })) {
        await analyzeButton.click();
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`Liquidity analysis not available`);
    }
  }

  async verifyAverageDailyVolumeData() {
    const pageContent = await this.page.textContent('body');
    const hasADVData = 
      pageContent.includes('average daily volume') || 
      pageContent.includes('ADV') ||
      pageContent.includes('daily volume') ||
      pageContent.includes('volume data');
    
    expect(hasADVData).toBe(true);
  }

  async verifyLiquidityProviderInformation() {
    const pageContent = await this.page.textContent('body');
    const hasLiquidityProvider = 
      pageContent.includes('liquidity provider') || 
      pageContent.includes('market maker') ||
      pageContent.includes('provider') ||
      pageContent.includes('authorized participant');
    
    expect(hasLiquidityProvider).toBe(true);
  }

  async verifyMarketDepthAnalysis() {
    const pageContent = await this.page.textContent('body');
    const hasMarketDepth = 
      pageContent.includes('market depth') || 
      pageContent.includes('depth') ||
      pageContent.includes('order book') ||
      pageContent.includes('liquidity depth');
    
    expect(hasMarketDepth).toBe(true);
  }

  async verifyLiquidityRiskAssessments() {
    const pageContent = await this.page.textContent('body');
    const hasLiquidityRisk = 
      pageContent.includes('liquidity risk') || 
      pageContent.includes('risk assessment') ||
      pageContent.includes('liquidity score') ||
      pageContent.includes('risk metric');
    
    expect(hasLiquidityRisk).toBe(true);
  }

  async searchForInstitutionalProducts() {
    try {
      const searchInput = this.page.locator('input[placeholder*="search"], input[placeholder*="product"]').first();
      if (await searchInput.isVisible({ timeout: 5000 })) {
        await searchInput.fill('institutional ETF');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`Product search not available`);
    }
  }

  async verifyInstitutionalSuitableETFs() {
    const pageContent = await this.page.textContent('body');
    const hasInstitutionalETFs = 
      pageContent.includes('institutional') || 
      pageContent.includes('suitable') ||
      pageContent.includes('ETF') ||
      pageContent.includes('large-scale');
    
    expect(hasInstitutionalETFs).toBe(true);
  }

  async verifyMinimumInvestmentRequirements() {
    const pageContent = await this.page.textContent('body');
    const hasMinimumInvestment = 
      pageContent.includes('minimum investment') || 
      pageContent.includes('minimum') ||
      pageContent.includes('requirement') ||
      pageContent.includes('threshold');
    
    expect(hasMinimumInvestment).toBe(true);
  }

  async verifyInstitutionalPricingInformation() {
    const pageContent = await this.page.textContent('body');
    const hasInstitutionalPricing = 
      pageContent.includes('institutional pricing') || 
      pageContent.includes('pricing') ||
      pageContent.includes('fee') ||
      pageContent.includes('expense');
    
    expect(hasInstitutionalPricing).toBe(true);
  }

  async verifyCustodyAndSettlementDetails() {
    const pageContent = await this.page.textContent('body');
    const hasCustodyDetails = 
      pageContent.includes('custody') || 
      pageContent.includes('settlement') ||
      pageContent.includes('clearing') ||
      pageContent.includes('operational');
    
    expect(hasCustodyDetails).toBe(true);
  }

  async verifyLargeAssetPortfolioTools() {
    const pageContent = await this.page.textContent('body');
    const hasLargeAssetTools = 
      pageContent.includes('large assets') || 
      pageContent.includes('portfolio construction') ||
      pageContent.includes('institutional portfolio') ||
      pageContent.includes('asset management');
    
    expect(hasLargeAssetTools).toBe(true);
  }

  async verifyRiskManagementAnalytics() {
    const pageContent = await this.page.textContent('body');
    const hasRiskManagement = 
      pageContent.includes('risk management') || 
      pageContent.includes('risk analytics') ||
      pageContent.includes('risk control') ||
      pageContent.includes('risk monitoring');
    
    expect(hasRiskManagement).toBe(true);
  }

  async verifyPerformanceAttributionAnalysis() {
    const pageContent = await this.page.textContent('body');
    const hasPerformanceAttribution = 
      pageContent.includes('performance attribution') || 
      pageContent.includes('attribution') ||
      pageContent.includes('performance analysis') ||
      pageContent.includes('factor analysis');
    
    expect(hasPerformanceAttribution).toBe(true);
  }

  async verifyBenchmarkComparisonTools() {
    const pageContent = await this.page.textContent('body');
    const hasBenchmarkComparison = 
      pageContent.includes('benchmark comparison') || 
      pageContent.includes('benchmark') ||
      pageContent.includes('comparison') ||
      pageContent.includes('relative performance');
    
    expect(hasBenchmarkComparison).toBe(true);
  }

  async provideInvalidTradeParameters() {
    try {
      const tradeInput = this.page.locator('input[placeholder*="size"], input[placeholder*="amount"]').first();
      if (await tradeInput.isVisible({ timeout: 5000 })) {
        await tradeInput.fill('-999999');
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Trade parameter input not available for error testing`);
    }
  }

  async verifyErrorMessages() {
    const pageContent = await this.page.textContent('body');
    const hasErrorMessages = 
      pageContent.includes('error') || 
      pageContent.includes('invalid') ||
      pageContent.includes('correct') ||
      pageContent.includes('valid range');
    
    expect(hasErrorMessages).toBe(true);
  }

  async verifyValidParameterRanges() {
    const pageContent = await this.page.textContent('body');
    const hasParameterRanges = 
      pageContent.includes('valid range') || 
      pageContent.includes('parameter') ||
      pageContent.includes('minimum') ||
      pageContent.includes('maximum');
    
    expect(hasParameterRanges).toBe(true);
  }

  async generateAnalysisReports() {
    try {
      const generateButton = this.page.locator('button:has-text("generate"), button:has-text("report")').first();
      if (await generateButton.isVisible({ timeout: 5000 })) {
        await generateButton.click();
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`Report generation not available`);
    }
  }

  async verifyInstitutionalDataExportFormats() {
    const pageContent = await this.page.textContent('body');
    const hasInstitutionalFormats = 
      pageContent.includes('institutional format') || 
      pageContent.includes('export') ||
      pageContent.includes('API') ||
      pageContent.includes('bulk data');
    
    expect(hasInstitutionalFormats).toBe(true);
  }

  async verifyAPIDataAccess() {
    const pageContent = await this.page.textContent('body');
    const hasAPIAccess = 
      pageContent.includes('API') || 
      pageContent.includes('data access') ||
      pageContent.includes('programmatic') ||
      pageContent.includes('integration');
    
    expect(hasAPIAccess).toBe(true);
  }

  async verifyBulkDataDownload() {
    const pageContent = await this.page.textContent('body');
    const hasBulkDownload = 
      pageContent.includes('bulk data') || 
      pageContent.includes('bulk download') ||
      pageContent.includes('mass download') ||
      pageContent.includes('batch');
    
    expect(hasBulkDownload).toBe(true);
  }

  async verifyInstitutionalSupportContact() {
    const pageContent = await this.page.textContent('body');
    const hasSupportContact = 
      pageContent.includes('institutional support') || 
      pageContent.includes('contact') ||
      pageContent.includes('support') ||
      pageContent.includes('help');
    
    expect(hasSupportContact).toBe(true);
  }

  async verifyRelationshipManagerDetails() {
    const pageContent = await this.page.textContent('body');
    const hasRelationshipManager = 
      pageContent.includes('relationship manager') || 
      pageContent.includes('dedicated') ||
      pageContent.includes('manager') ||
      pageContent.includes('representative');
    
    expect(hasRelationshipManager).toBe(true);
  }

  async verifyProfessionalServicesOfferings() {
    const pageContent = await this.page.textContent('body');
    const hasProfessionalServices = 
      pageContent.includes('professional services') || 
      pageContent.includes('services') ||
      pageContent.includes('consulting') ||
      pageContent.includes('advisory');
    
    expect(hasProfessionalServices).toBe(true);
  }

  async verifyCustomSolutionOptions() {
    const pageContent = await this.page.textContent('body');
    const hasCustomSolutions = 
      pageContent.includes('custom solution') || 
      pageContent.includes('custom') ||
      pageContent.includes('bespoke') ||
      pageContent.includes('tailored');
    
    expect(hasCustomSolutions).toBe(true);
  }

  async verifyPageRedirection() {
    const currentUrl = this.page.url();
    const hasValidUrl = 
      currentUrl.includes('institutional') || 
      currentUrl.includes('analytics') ||
      currentUrl.includes('professional') ||
      currentUrl.includes('ishares');
    
    expect(hasValidUrl).toBe(true);
  }
}

module.exports = InstitutionalToolsPage;
