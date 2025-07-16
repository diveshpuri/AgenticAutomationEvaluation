const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I have selected {string} tab', async function(tabName) {
  await this.toolsPage.selectInvestorType(tabName);
});

When('I click on the {string} tool', async function(toolName) {
  if (toolName === 'Core Builder') {
    await this.coreBuilderPage.navigateFromTools();
  } else {
    await this.toolsPage.clickTool(toolName);
  }
});

When('I select a risk tolerance level', async function() {
  await this.coreBuilderPage.selectRiskTolerance('Moderate');
});

When('I select an investment timeline', async function() {
  await this.coreBuilderPage.selectInvestmentTimeline('Long-term');
});

When('the tool fails to load properly', async function() {
  await this.page.waitForTimeout(1000);
});

Then('I should be redirected to the Core Builder page', async function() {
  await this.coreBuilderPage.verifyPageRedirection();
});

Then('I should see portfolio building interface', async function() {
  await this.coreBuilderPage.verifyPortfolioBuildingInterface();
});

Then('I should see {string} information', async function(infoType) {
  await this.coreBuilderPage.verifyEducationalContent();
});

Then('I should see portfolio allocation options', async function() {
  await this.coreBuilderPage.verifyPortfolioOptions();
});

Then('I should see risk tolerance settings', async function() {
  await this.coreBuilderPage.verifyPortfolioOptions();
});

Then('I should see investment timeline options', async function() {
  await this.coreBuilderPage.verifyPortfolioOptions();
});

Then('I should see {string} recommendations', async function(recommendationType) {
  await this.coreBuilderPage.verifyPortfolioRecommendations();
});

Then('I should see educational content about diversification', async function() {
  await this.coreBuilderPage.verifyEducationalContent();
});

Then('I should see information about {string}', async function(infoType) {
  await this.coreBuilderPage.verifyEducationalContent();
});

Then('I should see guidance on portfolio construction', async function() {
  await this.coreBuilderPage.verifyEducationalContent();
});

Then('I should see risk and return explanations', async function() {
  await this.coreBuilderPage.verifyEducationalContent();
});

Then('I should see updated portfolio recommendations', async function() {
  await this.coreBuilderPage.verifyPortfolioRecommendations();
});

Then('I should see asset allocation percentages', async function() {
  await this.coreBuilderPage.verifyPortfolioRecommendations();
});

Then('I should see recommended Core ETFs for each allocation', async function() {
  await this.coreBuilderPage.verifyPortfolioRecommendations();
});

Then('I should see an appropriate error message', async function() {
  await this.coreBuilderPage.verifyErrorHandling();
});

Then('I should have options to retry or get help', async function() {
  await this.coreBuilderPage.verifyErrorHandling();
});

Then('the page should not crash or become unresponsive', async function() {
  await this.coreBuilderPage.verifyErrorHandling();
});

Then('the tool should be accessible via keyboard navigation', async function() {
  await this.coreBuilderPage.verifyAccessibility();
});

Then('all interactive elements should have proper labels', async function() {
  await this.coreBuilderPage.verifyAccessibility();
});

Then('the tool should work with screen readers', async function() {
  await this.coreBuilderPage.verifyAccessibility();
});

Then('color contrast should meet accessibility standards', async function() {
  await this.coreBuilderPage.verifyAccessibility();
});
