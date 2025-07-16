const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I select {string} fund for reporting', async function(ticker) {
  await this.reportGeneratorPage.selectFundForReporting(ticker);
});

When('I select performance data fields', async function() {
  await this.reportGeneratorPage.selectPerformanceDataFields();
});

When('I select a date range for the report', async function() {
  await this.reportGeneratorPage.selectDateRange();
});

When('I click generate report', async function() {
  await this.reportGeneratorPage.clickGenerateReport();
});

When('I select multiple funds for comparison reporting', async function() {
  await this.reportGeneratorPage.selectMultipleFunds();
});

When('I select comparative data fields', async function() {
  await this.reportGeneratorPage.selectComparativeDataFields();
});

When('I select a fund for reporting', async function() {
  await this.reportGeneratorPage.selectFundForReporting('IVV');
});

When('I generate a report', async function() {
  await this.reportGeneratorPage.selectFundForReporting('IVV');
  await this.reportGeneratorPage.clickGenerateReport();
});

When('I try to generate a report without selecting any funds', async function() {
  await this.reportGeneratorPage.clickGenerateReport();
});

When('I select a historical date range', async function() {
  await this.reportGeneratorPage.selectHistoricalDateRange();
});

Then('I should be redirected to the report generator page', async function() {
  await this.reportGeneratorPage.verifyPageRedirection();
});

Then('I should see report customization options', async function() {
  await this.reportGeneratorPage.verifyCustomizationOptions();
});

Then('I should see fund and index data selection interface', async function() {
  await this.reportGeneratorPage.verifyDataSelectionInterface();
});

Then('I should see options to select funds for reporting', async function() {
  await this.reportGeneratorPage.verifyFundSelectionOptions();
});

Then('I should see data field selection options', async function() {
  await this.reportGeneratorPage.verifyDataFieldOptions();
});

Then('I should see report format options', async function() {
  await this.reportGeneratorPage.verifyReportFormatOptions();
});

Then('I should see date range selection for data', async function() {
  await this.reportGeneratorPage.selectDateRange();
});

Then('I should see a customized report with selected data', async function() {
  await this.reportGeneratorPage.verifyCustomizedReport();
});

Then('I should be able to download the report', async function() {
  await this.reportGeneratorPage.verifyDownloadOptions();
});

Then('the report should contain accurate fund information', async function() {
  await this.reportGeneratorPage.verifyCustomizedReport();
});

Then('I should see a multi-fund comparison report', async function() {
  await this.reportGeneratorPage.verifyMultiFundReport();
});

Then('I should see side-by-side fund metrics', async function() {
  await this.reportGeneratorPage.verifySideBySideMetrics();
});

Then('I should be able to export the comparison data', async function() {
  await this.reportGeneratorPage.verifyDownloadOptions();
});

Then('I should see options for performance data', async function() {
  await this.reportGeneratorPage.verifyPerformanceDataOptions();
});

Then('I should see options for holdings data', async function() {
  await this.reportGeneratorPage.verifyHoldingsDataOptions();
});

Then('I should see options for risk metrics', async function() {
  await this.reportGeneratorPage.verifyRiskMetricsOptions();
});

Then('I should see options for fund characteristics', async function() {
  await this.reportGeneratorPage.verifyFundCharacteristicsOptions();
});

Then('I should see export options for PDF format', async function() {
  await this.reportGeneratorPage.verifyPDFExportOption();
});

Then('I should see export options for Excel format', async function() {
  await this.reportGeneratorPage.verifyExcelExportOption();
});

Then('I should see export options for CSV format', async function() {
  await this.reportGeneratorPage.verifyCSVExportOption();
});

Then('I should be able to download in my preferred format', async function() {
  await this.reportGeneratorPage.verifyDownloadOptions();
});

Then('I should see a validation error message', async function() {
  await this.reportGeneratorPage.verifyValidationError();
});

Then('I should be guided to select required fields', async function() {
  await this.reportGeneratorPage.verifyValidationError();
});

Then('the tool should remain functional for retry', async function() {
  await this.reportGeneratorPage.verifyReportGeneratorPage();
});

Then('I should see historical performance data', async function() {
  await this.reportGeneratorPage.verifyHistoricalData();
});

Then('I should see time-series data in the report', async function() {
  await this.reportGeneratorPage.verifyTimeSeriesData();
});

Then('I should be able to compare different time periods', async function() {
  await this.reportGeneratorPage.verifyHistoricalData();
});

Then('the report generator should be keyboard accessible', async function() {
  await this.reportGeneratorPage.verifyAccessibility();
});

Then('all form fields should have proper labels', async function() {
  await this.reportGeneratorPage.verifyScreenReaderFriendly();
});

Then('the generated reports should be screen reader friendly', async function() {
  await this.reportGeneratorPage.verifyScreenReaderFriendly();
});

Then('the tool should work across different browsers', async function() {
  await this.reportGeneratorPage.verifyReportGeneratorPage();
});
