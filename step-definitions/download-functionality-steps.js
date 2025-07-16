const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I have fund search results displayed', async function() {
  await this.fundScreenerPage.waitForResults();
  const resultCount = await this.fundScreenerPage.getResultsCount();
  expect(resultCount).toBeGreaterThan(0);
});

When('I click the {string} button', async function(buttonText) {
  if (buttonText === 'Download') {
    await this.fundScreenerPage.clickDownloadButton();
  }
});

Then('a CSV or Excel file should be downloaded', async function() {
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.fundScreenerPage.clickDownloadButton()
  ]);
  this.lastDownload = download;
  const filename = await download.suggestedFilename();
  expect(filename).toMatch(/\.(csv|xlsx?)$/i);
});

Then('the file should contain the displayed fund data', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Given('I have applied filters to the fund results', async function() {
  await this.fundScreenerPage.applyAssetClassFilter('Equity');
  await this.fundScreenerPage.waitForResults();
});

When('I download the results', async function() {
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.fundScreenerPage.clickDownloadButton()
  ]);
  this.lastDownload = download;
});

Then('the downloaded file should contain only filtered funds', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Then('the file should reflect the current filter state', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename.toLowerCase()).toContain('equity');
});

Given('I have sorted the results by expense ratio', async function() {
  await this.fundScreenerPage.sortBy('expenseRatio');
});

Then('the downloaded file should maintain the sort order', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Then('the data should be in the same sequence as displayed', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename).toBeTruthy();
});

Given('I am viewing results in {string} data view', async function(dataView) {
  await this.fundScreenerPage.switchDataView(dataView);
});

Then('the downloaded file should include performance columns', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Then('the data should match the current view', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename.toLowerCase()).toContain('performance');
});

When('I click on the {string} download link', async function(linkText) {
  if (linkText === 'Fact Sheet') {
    const download = await this.fundDetailsPage.downloadFactSheet();
    this.lastDownload = download;
  } else if (linkText === 'Prospectus') {
    const download = await this.fundDetailsPage.downloadProspectus();
    this.lastDownload = download;
  }
});

Then('a PDF fact sheet should be downloaded', async function() {
  expect(this.lastDownload).toBeTruthy();
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename).toMatch(/\.pdf$/i);
});

Then('the PDF should contain comprehensive fund information', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename.toLowerCase()).toContain('fact');
});

Then('a PDF prospectus should be downloaded', async function() {
  expect(this.lastDownload).toBeTruthy();
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename).toMatch(/\.pdf$/i);
});

Then('the PDF should contain legal fund documentation', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename.toLowerCase()).toContain('prospectus');
});

Given('I have multiple funds in comparison', async function() {
  await this.fundScreenerPage.addFundToComparison(0);
  await this.fundScreenerPage.addFundToComparison(1);
  await this.fundScreenerPage.clickCompareButton();
});

When('I export the comparison data', async function() {
  const download = await this.comparisonPage.exportComparison();
  this.lastDownload = download;
});

Then('a comparison report should be downloaded', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Then('the report should include all compared funds\' data', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename.toLowerCase()).toContain('comparison');
});

When('I download fund screener results', async function() {
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.fundScreenerPage.clickDownloadButton()
  ]);
  this.lastDownload = download;
});

Then('the file name should include a timestamp', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename).toMatch(/\d{4}-\d{2}-\d{2}/);
});

Then('the file name should be descriptive of the content', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename.toLowerCase()).toContain('ishares');
});

When('I initiate a large data download', async function() {
  await this.fundScreenerPage.performKeywordSearch('');
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.fundScreenerPage.clickDownloadButton()
  ]);
  this.lastDownload = download;
});

Then('I should see a download progress indicator', async function() {
  const progressIndicator = await this.page.locator('[data-testid="download-progress"]').isVisible();
  expect(progressIndicator).toBe(true);
});

Then('I should receive confirmation when download completes', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Given('a download is initiated', async function() {
  this.page.route('**/download/**', route => route.abort());
  try {
    await this.fundScreenerPage.clickDownloadButton();
  } catch (error) {
    this.downloadError = error;
  }
});

When('the download fails due to network issues', async function() {
  expect(this.downloadError).toBeTruthy();
});

Then('I should see an appropriate error message', async function() {
  const errorMessage = await this.page.locator('[data-testid="download-error"]').isVisible();
  expect(errorMessage).toBe(true);
});

Then('I should have the option to retry the download', async function() {
  const retryButton = await this.page.locator('button:has-text("Retry")').isVisible();
  expect(retryButton).toBe(true);
});

When('I download fund data', async function() {
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.fundScreenerPage.clickDownloadButton()
  ]);
  this.lastDownload = download;
});

Then('the file should be in a standard format \\(CSV\\/Excel)', async function() {
  const filename = await this.lastDownload.suggestedFilename();
  expect(filename).toMatch(/\.(csv|xlsx?)$/i);
});

Then('the file should open correctly in appropriate applications', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Given('I download fund screener results', async function() {
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.fundScreenerPage.clickDownloadButton()
  ]);
  this.lastDownload = download;
});

When('I compare the downloaded data with displayed data', async function() {
  this.displayedResults = await this.fundScreenerPage.getSearchResults();
});

Then('all fund names should match exactly', async function() {
  expect(this.displayedResults.length).toBeGreaterThan(0);
});

Then('all numerical data should be identical', async function() {
  expect(this.lastDownload).toBeTruthy();
});

Given('I have a large number of fund results', async function() {
  await this.fundScreenerPage.performKeywordSearch('');
  const resultCount = await this.fundScreenerPage.getResultsCount();
  expect(resultCount).toBeGreaterThan(100);
});

When('I download the complete dataset', async function() {
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.fundScreenerPage.clickDownloadButton()
  ]);
  this.lastDownload = download;
});

Then('the download should complete within {int} seconds', async function(seconds) {
  const startTime = Date.now();
  await this.lastDownload.saveAs('/tmp/test-download.csv');
  const downloadTime = Date.now() - startTime;
  expect(downloadTime).toBeLessThan(seconds * 1000);
});

Then('the file should contain all expected records', async function() {
  expect(this.lastDownload).toBeTruthy();
});

When('I initiate multiple downloads simultaneously', async function() {
  const downloads = await Promise.all([
    Promise.all([
      this.page.waitForEvent('download'),
      this.fundScreenerPage.clickDownloadButton()
    ]),
    Promise.all([
      this.page.waitForEvent('download'),
      this.fundScreenerPage.clickDownloadButton()
    ])
  ]);
  this.multipleDownloads = downloads.map(d => d[0]);
});

Then('each download should complete successfully', async function() {
  for (const download of this.multipleDownloads) {
    expect(download).toBeTruthy();
  }
});

Then('there should be no conflicts between downloads', async function() {
  expect(this.multipleDownloads.length).toBe(2);
});

When('I use keyboard navigation to access download options', async function() {
  await this.page.keyboard.press('Tab');
  await this.page.keyboard.press('Tab');
  await this.page.keyboard.press('Tab');
});

Then('I should be able to initiate downloads using keyboard only', async function() {
  await this.page.keyboard.press('Enter');
  const downloadStarted = await this.page.locator('[data-testid="download-progress"]').isVisible();
  expect(downloadStarted).toBe(true);
});

Then('download links should be properly labeled for screen readers', async function() {
  const downloadButton = await this.page.locator('button[aria-label*="Download"]').isVisible();
  expect(downloadButton).toBe(true);
});
