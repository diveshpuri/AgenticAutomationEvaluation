const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.base);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await Helpers.waitForPageLoad(this.page);
    await Helpers.waitForElement(this.page, Selectors.navigation.mainNav);
  }

  async clickOurFundsMenu() {
    const selector = await Helpers.handleShadowRoot(
      this.page,
      'ds-primary-nav',
      'nav ul li:has-text("Our Funds")'
    );
    await Helpers.clickWithRetry(this.page, selector);
  }

  async openSearch() {
    const selector = await Helpers.handleShadowRoot(
      this.page,
      'ds-primary-nav',
      '[data-testid="search-button"], button[aria-label*="Search"]'
    );
    await Helpers.clickWithRetry(this.page, selector);
  }

  async performGlobalSearch(searchTerm) {
    await this.openSearch();
    
    const searchInputSelector = await Helpers.handleShadowRoot(
      this.page,
      'ds-primary-nav',
      'input[type="search"], input[placeholder*="Search"]'
    );
    
    await Helpers.typeWithClear(this.page, searchInputSelector, searchTerm);
    await this.page.keyboard.press('Enter');
    await Helpers.waitForPageLoad(this.page);
  }

  async navigateToFundScreener() {
    await this.clickOurFundsMenu();
    await this.page.click('text="ETF Investments"');
    await Helpers.waitForPageLoad(this.page);
  }

  async verifyHomepageLoaded() {
    await Helpers.verifyElementExists(this.page, Selectors.navigation.logo);
    await Helpers.verifyElementExists(this.page, Selectors.navigation.mainNav);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async verifyNavigationMenus() {
    const expectedMenus = ['Our Funds', 'Investment Strategies', 'Market Insights', 'Education', 'Resources', 'About Us'];
    
    for (const menu of expectedMenus) {
      const menuSelector = `ds-primary-nav nav ul li:has-text("${menu}")`;
      await Helpers.verifyElementExists(this.page, menuSelector);
    }
  }

  async clickCompareButton() {
    const compareSelector = await Helpers.handleShadowRoot(
      this.page,
      'ds-primary-nav',
      'button:has-text("Compare"), [data-testid="compare-button"]'
    );
    await Helpers.clickWithRetry(this.page, compareSelector);
  }
}

module.exports = HomePage;
