const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');

class ComparisonPage {
  constructor(page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await Helpers.waitForPageLoad(this.page);
    await Helpers.waitForElement(this.page, Selectors.comparison.container);
  }

  async getComparedFunds() {
    const funds = [];
    const fundElements = await this.page.locator(Selectors.comparison.comparedFunds).all();
    
    for (const fund of fundElements) {
      const name = await fund.locator('[data-testid="fund-name"]').textContent();
      const ticker = await fund.locator('[data-testid="fund-ticker"]').textContent();
      funds.push({ name: name?.trim(), ticker: ticker?.trim() });
    }
    
    return funds;
  }

  async getComparedFundsCount() {
    return await this.page.locator(Selectors.comparison.comparedFunds).count();
  }

  async removeFundFromComparison(fundIndex = 0) {
    const removeButtons = await this.page.locator(Selectors.comparison.removeButton).all();
    if (removeButtons[fundIndex]) {
      await removeButtons[fundIndex].click();
      await Helpers.waitForElement(this.page, Selectors.comparison.container);
    }
  }

  async clearAllComparisons() {
    await Helpers.clickWithRetry(this.page, Selectors.comparison.clearAll);
    await Helpers.waitForElement(this.page, Selectors.comparison.container);
  }

  async exportComparison() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.click(Selectors.comparison.exportComparison)
    ]);
    return download;
  }

  async verifyComparisonPageLoaded() {
    await Helpers.verifyElementExists(this.page, Selectors.comparison.container);
  }

  async verifyFundInComparison(fundName) {
    const comparisonText = await Helpers.getElementText(this.page, Selectors.comparison.container);
    expect(comparisonText.toLowerCase()).toContain(fundName.toLowerCase());
  }

  async verifyComparisonEmpty() {
    const count = await this.getComparedFundsCount();
    expect(count).toBe(0);
  }

  async verifyMaximumFundsReached() {
    const count = await this.getComparedFundsCount();
    expect(count).toBeLessThanOrEqual(4);
  }

  async getComparisonData() {
    const data = {
      funds: await this.getComparedFunds(),
      expenseRatios: [],
      netAssets: [],
      performance: []
    };

    const expenseElements = await this.page.locator('[data-testid="expense-ratio"]').all();
    for (const element of expenseElements) {
      const ratio = await element.textContent();
      data.expenseRatios.push(ratio?.trim());
    }

    const assetElements = await this.page.locator('[data-testid="net-assets"]').all();
    for (const element of assetElements) {
      const assets = await element.textContent();
      data.netAssets.push(assets?.trim());
    }

    return data;
  }

  async verifyComparisonDataAccuracy() {
    const data = await this.getComparisonData();
    
    expect(data.funds.length).toBeGreaterThan(0);
    expect(data.expenseRatios.length).toBe(data.funds.length);
    expect(data.netAssets.length).toBe(data.funds.length);
    
    for (const fund of data.funds) {
      expect(fund.name).toBeTruthy();
      expect(fund.ticker).toBeTruthy();
    }
  }
}

module.exports = ComparisonPage;
