const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I select funds for correlation analysis', async function() {
  await this.advisorToolsPage.selectFundsForCorrelation();
});

When('I analyze holdings overlap between funds', async function() {
  await this.advisorToolsPage.analyzeHoldingsOverlap();
});

When('I build a tax-efficient portfolio', async function() {
  await this.advisorToolsPage.buildTaxEfficientPortfolio();
});

When('I input client portfolio information', async function() {
  await this.advisorToolsPage.inputClientPortfolioInformation();
});

When('I provide invalid portfolio data', async function() {
  await this.advisorToolsPage.provideInvalidPortfolioData();
});

When('I access advisor-specific tools', async function() {
  await this.advisorToolsPage.navigate();
});

Then('I should be redirected to the tax optimization page', async function() {
  await this.advisorToolsPage.verifyPageRedirection();
});

Then('I should see correlation analysis interface', async function() {
  await this.advisorToolsPage.verifyCorrelationAnalysisInterface();
});

Then('I should see holdings overlap analysis options', async function() {
  await this.advisorToolsPage.verifyHoldingsOverlapOptions();
});

Then('I should see correlation coefficients between selected funds', async function() {
  await this.advisorToolsPage.verifyCorrelationCoefficients();
});

Then('I should see recommendations for tax-efficient combinations', async function() {
  await this.advisorToolsPage.verifyTaxEfficientRecommendations();
});

Then('I should see risk-adjusted correlation metrics', async function() {
  await this.advisorToolsPage.verifyCorrelationCoefficients();
});

Then('I should see percentage overlap in holdings', async function() {
  await this.advisorToolsPage.verifyOverlapPercentage();
});

Then('I should see recommendations to reduce overlap', async function() {
  await this.advisorToolsPage.verifyDiversificationSuggestions();
});

Then('I should see diversification improvement suggestions', async function() {
  await this.advisorToolsPage.verifyDiversificationSuggestions();
});

Then('I should be redirected to the Advisor Center', async function() {
  await this.advisorToolsPage.verifyAdvisorCenterRedirection();
});

Then('I should see BlackRock\'s suite of sophisticated tools', async function() {
  await this.advisorToolsPage.verifyBlackRockSophisticatedTools();
});

Then('I should see professional-grade analysis tools', async function() {
  await this.advisorToolsPage.verifyProfessionalAnalysisTools();
});

Then('I should see tax-loss harvesting opportunities', async function() {
  await this.advisorToolsPage.verifyTaxLossHarvestingOpportunities();
});

Then('I should see asset location recommendations', async function() {
  await this.advisorToolsPage.verifyAssetLocationRecommendations();
});

Then('I should see after-tax return projections', async function() {
  await this.advisorToolsPage.verifyAfterTaxReturnProjections();
});

Then('I should see tax efficiency analysis', async function() {
  await this.advisorToolsPage.verifyTaxEfficiencyAnalysis();
});

Then('I should see recommendations for improvement', async function() {
  await this.advisorToolsPage.verifyImprovementRecommendations();
});

Then('I should see potential tax savings calculations', async function() {
  await this.advisorToolsPage.verifyTaxSavingsCalculations();
});

Then('I should see tools for portfolio construction', async function() {
  await this.advisorToolsPage.verifyPortfolioConstructionTools();
});

Then('I should see risk analysis capabilities', async function() {
  await this.advisorToolsPage.verifyRiskAnalysisCapabilities();
});

Then('I should see client reporting features', async function() {
  await this.advisorToolsPage.verifyClientReportingFeatures();
});

Then('I should see market research tools', async function() {
  await this.advisorToolsPage.verifyMarketResearchTools();
});

Then('I should be guided to correct the input', async function() {
  await this.advisorToolsPage.verifyErrorMessages();
});

Then('the tool should remain functional for retry', async function() {
  await this.advisorToolsPage.verifyTaxOptimizationPage();
});

Then('I should see advanced analytics not available to individual investors', async function() {
  await this.advisorToolsPage.verifyAdvancedAnalytics();
});

Then('I should see client management features', async function() {
  await this.advisorToolsPage.verifyClientManagementFeatures();
});

Then('I should see institutional-grade research tools', async function() {
  await this.advisorToolsPage.verifyInstitutionalGradeTools();
});

Then('I should see compliance and reporting features', async function() {
  await this.advisorToolsPage.verifyComplianceFeatures();
});
