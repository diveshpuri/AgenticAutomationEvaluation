const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I select an ETF for trade cost analysis', async function() {
  await this.institutionalToolsPage.selectETFForTradeCostAnalysis('IVV');
});

When('I analyze ETF liquidity metrics', async function() {
  await this.institutionalToolsPage.analyzeLiquidityMetrics();
});

When('I search for appropriate products for institutional use', async function() {
  await this.institutionalToolsPage.searchForInstitutionalProducts();
});

When('I access institutional tools', async function() {
  await this.institutionalToolsPage.navigate();
});

When('I provide invalid trade size or parameters', async function() {
  await this.institutionalToolsPage.provideInvalidTradeParameters();
});

When('I use institutional analytics tools', async function() {
  await this.institutionalToolsPage.navigate();
});

When('I generate analysis reports', async function() {
  await this.institutionalToolsPage.generateAnalysisReports();
});

Then('I should be redirected to the institutional analytics page', async function() {
  await this.institutionalToolsPage.verifyPageRedirection();
});

Then('I should see ETF trade cost analysis interface', async function() {
  await this.institutionalToolsPage.verifyTradeCostAnalysisInterface();
});

Then('I should see liquidity analysis options', async function() {
  await this.institutionalToolsPage.verifyLiquidityAnalysisOptions();
});

Then('I should be redirected to the institutional tools portal', async function() {
  await this.institutionalToolsPage.verifyInstitutionalToolsPortal();
});

Then('I should see sophisticated analytics tools', async function() {
  await this.institutionalToolsPage.verifySophisticatedAnalyticsTools();
});

Then('I should see institutional-grade research capabilities', async function() {
  await this.institutionalToolsPage.verifyInstitutionalResearchCapabilities();
});

Then('I should see bid-ask spread analysis', async function() {
  await this.institutionalToolsPage.verifyBidAskSpreadAnalysis();
});

Then('I should see market impact cost estimates', async function() {
  await this.institutionalToolsPage.verifyMarketImpactCostEstimates();
});

Then('I should see trading volume analysis', async function() {
  await this.institutionalToolsPage.verifyTradingVolumeAnalysis();
});

Then('I should see optimal execution recommendations', async function() {
  await this.institutionalToolsPage.verifyOptimalExecutionRecommendations();
});

Then('I should see average daily volume data', async function() {
  await this.institutionalToolsPage.verifyAverageDailyVolumeData();
});

Then('I should see liquidity provider information', async function() {
  await this.institutionalToolsPage.verifyLiquidityProviderInformation();
});

Then('I should see market depth analysis', async function() {
  await this.institutionalToolsPage.verifyMarketDepthAnalysis();
});

Then('I should see liquidity risk assessments', async function() {
  await this.institutionalToolsPage.verifyLiquidityRiskAssessments();
});

Then('I should see institutional-suitable ETFs', async function() {
  await this.institutionalToolsPage.verifyInstitutionalSuitableETFs();
});

Then('I should see minimum investment requirements', async function() {
  await this.institutionalToolsPage.verifyMinimumInvestmentRequirements();
});

Then('I should see institutional pricing information', async function() {
  await this.institutionalToolsPage.verifyInstitutionalPricingInformation();
});

Then('I should see custody and settlement details', async function() {
  await this.institutionalToolsPage.verifyCustodyAndSettlementDetails();
});

Then('I should see portfolio construction tools for large assets', async function() {
  await this.institutionalToolsPage.verifyLargeAssetPortfolioTools();
});

Then('I should see risk management analytics', async function() {
  await this.institutionalToolsPage.verifyRiskManagementAnalytics();
});

Then('I should see performance attribution analysis', async function() {
  await this.institutionalToolsPage.verifyPerformanceAttributionAnalysis();
});

Then('I should see benchmark comparison tools', async function() {
  await this.institutionalToolsPage.verifyBenchmarkComparisonTools();
});

Then('I should be guided to correct the input', async function() {
  await this.institutionalToolsPage.verifyErrorMessages();
});

Then('the tool should provide valid parameter ranges', async function() {
  await this.institutionalToolsPage.verifyValidParameterRanges();
});

Then('I should be able to export data in institutional formats', async function() {
  await this.institutionalToolsPage.verifyInstitutionalDataExportFormats();
});

Then('I should see options for API data access', async function() {
  await this.institutionalToolsPage.verifyAPIDataAccess();
});

Then('I should see bulk data download capabilities', async function() {
  await this.institutionalToolsPage.verifyBulkDataDownload();
});

Then('I should see contact information for institutional support', async function() {
  await this.institutionalToolsPage.verifyInstitutionalSupportContact();
});

Then('I should see dedicated relationship manager details', async function() {
  await this.institutionalToolsPage.verifyRelationshipManagerDetails();
});

Then('I should see professional services offerings', async function() {
  await this.institutionalToolsPage.verifyProfessionalServicesOfferings();
});

Then('I should see custom solution options', async function() {
  await this.institutionalToolsPage.verifyCustomSolutionOptions();
});
