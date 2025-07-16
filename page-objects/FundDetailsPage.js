const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');

class FundDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await Helpers.waitForPageLoad(this.page);
    await Helpers.waitForElement(this.page, Selectors.fundDetails.container);
  }

  async getFundName() {
    return await Helpers.getElementText(this.page, Selectors.fundDetails.fundName);
  }

  async getFundTicker() {
    return await Helpers.getElementText(this.page, Selectors.fundDetails.ticker);
  }

  async getNAV() {
    return await Helpers.getElementText(this.page, Selectors.fundDetails.nav);
  }

  async getExpenseRatio() {
    return await Helpers.getElementText(this.page, Selectors.fundDetails.expenseRatio);
  }

  async clickOverviewTab() {
    await Helpers.clickWithRetry(this.page, Selectors.fundDetails.tabs.overview);
  }

  async clickPerformanceTab() {
    await Helpers.clickWithRetry(this.page, Selectors.fundDetails.tabs.performance);
  }

  async clickHoldingsTab() {
    await Helpers.clickWithRetry(this.page, Selectors.fundDetails.tabs.holdings);
  }

  async clickLiteratureTab() {
    await Helpers.clickWithRetry(this.page, Selectors.fundDetails.tabs.literature);
  }

  async downloadFactSheet() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.click(Selectors.fundDetails.factSheet)
    ]);
    return download;
  }

  async downloadProspectus() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.click(Selectors.fundDetails.prospectus)
    ]);
    return download;
  }

  async verifyFundDetailsLoaded() {
    await Helpers.verifyElementExists(this.page, Selectors.fundDetails.fundName);
    await Helpers.verifyElementExists(this.page, Selectors.fundDetails.ticker);
  }

  async verifyTabsExist() {
    const tabs = ['overview', 'performance', 'holdings', 'literature'];
    for (const tab of tabs) {
      await Helpers.verifyElementExists(this.page, Selectors.fundDetails.tabs[tab]);
    }
  }

  async verifyFactSheetExists() {
    await Helpers.verifyElementExists(this.page, Selectors.fundDetails.factSheet);
  }

  async verifyProspectusExists() {
    await Helpers.verifyElementExists(this.page, Selectors.fundDetails.prospectus);
  }

  async getPerformanceData() {
    await this.clickPerformanceTab();
    await Helpers.waitForElement(this.page, '[data-testid="performance-chart"]');
    
    return {
      ytdReturn: await Helpers.getElementText(this.page, '[data-testid="ytd-return"]'),
      oneYearReturn: await Helpers.getElementText(this.page, '[data-testid="1y-return"]'),
      threeYearReturn: await Helpers.getElementText(this.page, '[data-testid="3y-return"]')
    };
  }

  async getTopHoldings() {
    await this.clickHoldingsTab();
    await Helpers.waitForElement(this.page, '[data-testid="holdings-table"]');
    
    const holdings = [];
    const holdingRows = await this.page.locator('[data-testid="holding-row"]').all();
    
    for (const row of holdingRows.slice(0, 5)) {
      const name = await row.locator('[data-testid="holding-name"]').textContent();
      const weight = await row.locator('[data-testid="holding-weight"]').textContent();
      holdings.push({ name: name?.trim(), weight: weight?.trim() });
    }
    
    return holdings;
  }

  async verifyFundDataAccuracy(expectedData) {
    const actualName = await this.getFundName();
    const actualTicker = await this.getFundTicker();
    
    expect(actualName.toLowerCase()).toContain(expectedData.name.toLowerCase());
    expect(actualTicker).toBe(expectedData.ticker);
  }

  async navigateBackToScreener() {
    await this.page.goBack();
    await Helpers.waitForPageLoad(this.page);
  }
}

module.exports = FundDetailsPage;
