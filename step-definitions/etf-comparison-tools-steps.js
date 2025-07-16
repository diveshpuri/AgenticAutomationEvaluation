const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I add {string} to the comparison', async function(ticker) {
  await this.etfComparisonPage.addFundToComparison(ticker);
});

When('I search for funds to compare', async function() {
  await this.etfComparisonPage.searchForFunds('technology ETF');
});

When('I add multiple ETFs to the comparison', async function() {
  await this.etfComparisonPage.addFundToComparison('IVV');
  await this.etfComparisonPage.addFundToComparison('VOO');
  await this.etfComparisonPage.addFundToComparison('VTI');
});

When('I search for a non-existent fund ticker', async function() {
  await this.etfComparisonPage.verifyErrorHandling('NONEXISTENT123');
});

When('I add funds to the comparison', async function() {
  await this.etfComparisonPage.addFundToComparison('IVV');
  await this.etfComparisonPage.addFundToComparison('VOO');
});

When('I click on export or download options', async function() {
  await this.etfComparisonPage.clickExportOptions();
});

Then('I should be redirected to the ETF comparison page', async function() {
  await this.etfComparisonPage.verifyPageRedirection();
});

Then('I should see fund comparison interface', async function() {
  await this.etfComparisonPage.verifyComparisonInterface();
});

Then('I should see options to add funds for comparison', async function() {
  await this.etfComparisonPage.verifyAddFundOptions();
});

Then('I should see side-by-side comparison of the selected ETFs', async function() {
  await this.etfComparisonPage.verifyFundComparison('IVV', 'VOO');
});

Then('I should see key metrics like expense ratio, assets, and performance', async function() {
  await this.etfComparisonPage.verifyComparisonMetrics();
});

Then('I should be able to remove funds from comparison', async function() {
  await this.etfComparisonPage.removeFundFromComparison();
});

Then('I should be redirected to the Morningstar comparison page', async function() {
  await this.etfComparisonPage.verifyPageRedirection();
});

Then('I should see advanced comparison features', async function() {
  await this.etfComparisonPage.verifyMorningstarFeatures();
});

Then('I should see options to compare iShares ETFs with external funds', async function() {
  await this.etfComparisonPage.verifyMorningstarFeatures();
});

Then('I should see detailed fund analysis', async function() {
  await this.etfComparisonPage.verifyDetailedAnalysis();
});

Then('I should see performance charts and metrics', async function() {
  await this.etfComparisonPage.verifyDetailedAnalysis();
});

Then('I should see risk analysis and ratings', async function() {
  await this.etfComparisonPage.verifyDetailedAnalysis();
});

Then('I should see all selected funds in the comparison table', async function() {
  await this.etfComparisonPage.verifyMultipleFundsComparison();
});

Then('I should be able to sort by different metrics', async function() {
  await this.etfComparisonPage.sortComparisonBy('Expense Ratio');
});

Then('I should be able to filter comparison results', async function() {
  await this.etfComparisonPage.verifyMultipleFundsComparison();
});

Then('I should be able to try again with a valid ticker', async function() {
  await this.etfComparisonPage.addFundToComparison('IVV');
});

Then('the comparison tool should remain functional', async function() {
  await this.etfComparisonPage.verifyComparisonInterface();
});

Then('I should be able to download the comparison data', async function() {
  await this.etfComparisonPage.verifyExportFunctionality();
});

Then('the exported file should contain the comparison metrics', async function() {
  await this.etfComparisonPage.verifyExportFunctionality();
});

Then('the export should be in a readable format', async function() {
  await this.etfComparisonPage.verifyExportFunctionality();
});
