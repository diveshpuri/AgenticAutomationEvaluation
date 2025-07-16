const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I search for {string} exposure', async function(searchTerm) {
  await this.investmentDiscoveryPage.searchForHolding(searchTerm);
});

When('I select {string} as my investment goal', async function(goal) {
  await this.investmentDiscoveryPage.selectInvestmentGoal(goal);
});

When('I search for {string} sector exposure', async function(sector) {
  await this.investmentDiscoveryPage.searchForHolding(sector);
});

When('I search for a non-existent company or sector', async function() {
  await this.investmentDiscoveryPage.searchForHolding('NONEXISTENT_COMPANY_XYZ');
});

When('I search for a specific holding', async function() {
  await this.investmentDiscoveryPage.searchForHolding('Microsoft');
});

When('I select an ETF from the results', async function() {
  await this.investmentDiscoveryPage.selectETFFromResults();
});

Then('I should be redirected to the investment goals page', async function() {
  await this.investmentDiscoveryPage.verifyPageRedirection();
});

Then('I should see different investment goal categories', async function() {
  await this.investmentDiscoveryPage.verifyGoalCategories();
});

Then('I should see goal-based fund recommendations', async function() {
  await this.investmentDiscoveryPage.verifyETFRecommendations();
});

Then('I should see investment goals like {string}, {string}, {string}, and {string}', async function(goal1, goal2, goal3, goal4) {
  await this.investmentDiscoveryPage.verifyGoalCategories();
});

Then('I should be able to select a specific investment goal', async function() {
  await this.investmentDiscoveryPage.selectInvestmentGoal('Growth');
});

Then('I should see ETFs recommended for each goal category', async function() {
  await this.investmentDiscoveryPage.verifyETFRecommendations();
});

Then('I should be redirected to the holdings discovery page', async function() {
  await this.investmentDiscoveryPage.verifyPageRedirection();
});

Then('I should see search interface for companies and sectors', async function() {
  await this.investmentDiscoveryPage.verifySearchInterface();
});

Then('I should see options to find ETFs with specific exposures', async function() {
  await this.investmentDiscoveryPage.verifySearchInterface();
});

Then('I should see ETFs that hold Apple stock', async function() {
  await this.investmentDiscoveryPage.verifyHoldingsResults('Apple');
});

Then('I should see exposure percentages and fund details', async function() {
  await this.investmentDiscoveryPage.verifyExposurePercentages();
});

Then('I should be able to view fund holdings breakdown', async function() {
  await this.investmentDiscoveryPage.verifyDetailedHoldings();
});

Then('I should see growth-oriented ETFs', async function() {
  await this.investmentDiscoveryPage.verifyGrowthETFs();
});

Then('I should see performance metrics for growth funds', async function() {
  await this.investmentDiscoveryPage.verifyPerformanceMetrics();
});

Then('I should see risk characteristics of growth investments', async function() {
  await this.investmentDiscoveryPage.verifyPerformanceMetrics();
});

Then('I should see ETFs with technology sector holdings', async function() {
  await this.investmentDiscoveryPage.verifyTechnologyETFs();
});

Then('I should see sector allocation percentages', async function() {
  await this.investmentDiscoveryPage.verifySectorAllocation();
});

Then('I should be able to compare technology ETFs', async function() {
  await this.investmentDiscoveryPage.verifyTechnologyETFs();
});

Then('I should see an appropriate {string} message', async function(messageType) {
  if (messageType === 'no results') {
    await this.investmentDiscoveryPage.verifyNoResultsMessage();
  }
});

Then('I should be able to try again with a different search term', async function() {
  await this.investmentDiscoveryPage.searchForHolding('Apple');
});

Then('the tool should provide search suggestions', async function() {
  await this.investmentDiscoveryPage.verifySearchInterface();
});

Then('I should see educational content about that goal', async function() {
  await this.investmentDiscoveryPage.verifyEducationalContent();
});

Then('I should see risk and return explanations', async function() {
  await this.investmentDiscoveryPage.verifyEducationalContent();
});

Then('I should see guidance on goal-based investing', async function() {
  await this.investmentDiscoveryPage.verifyEducationalContent();
});

Then('I should see detailed holdings breakdown', async function() {
  await this.investmentDiscoveryPage.verifyDetailedHoldings();
});

Then('I should see top holdings and their weights', async function() {
  await this.investmentDiscoveryPage.verifyDetailedHoldings();
});

Then('I should see sector and geographic allocations', async function() {
  await this.investmentDiscoveryPage.verifyGeographicAllocations();
});
