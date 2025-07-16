const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the iShares homepage', async function() {
  await this.homePage.navigate();
});

When('I view the main navigation menu', async function() {
  await this.homePage.verifyNavigationMenus();
});

Then('I should see {string} menu item', async function(menuItem) {
  const menuSelector = `ds-primary-nav nav ul li:has-text("${menuItem}")`;
  const menuVisible = await this.page.locator(menuSelector).isVisible();
  expect(menuVisible).toBe(true);
});

When('I click on {string} in the main menu', async function(menuItem) {
  if (menuItem === 'Our Funds') {
    await this.homePage.clickOurFundsMenu();
  }
});

When('I click on {string}', async function(linkText) {
  await this.page.click(`text="${linkText}"`);
});

Then('I should be taken to the fund screener page', async function() {
  await this.fundScreenerPage.waitForPageLoad();
});

Then('I should see the fund filtering interface', async function() {
  const filterInterface = await this.page.locator('screener-container').isVisible();
  expect(filterInterface).toBe(true);
});

When('I click on the search icon in the header', async function() {
  await this.homePage.openSearch();
});

When('I perform global search for {string}', async function(searchTerm) {
  await this.homePage.performGlobalSearch(searchTerm);
});

Then('I should see search results', async function() {
  const hasResults = await this.page.locator('[data-testid="search-results"]').isVisible();
  expect(hasResults).toBe(true);
});

Then('the results should include relevant funds and content', async function() {
  const resultCount = await this.page.locator('[data-testid="search-result-item"]').count();
  expect(resultCount).toBeGreaterThan(0);
});

Given('I am on any page of the website', async function() {
  await this.fundScreenerPage.navigate();
});

When('I click on the iShares logo', async function() {
  await this.page.click('ds-primary-nav a[href*="ishares"]');
});

Then('I should be taken to the homepage', async function() {
  await this.homePage.waitForPageLoad();
});

Then('the homepage should load completely', async function() {
  await this.homePage.verifyHomepageLoaded();
});

Given('I am on a fund details page', async function() {
  await this.fundScreenerPage.navigate();
  await this.fundScreenerPage.clickFundName(0);
  await this.fundDetailsPage.waitForPageLoad();
});

Then('I should see breadcrumb navigation', async function() {
  const breadcrumbs = await this.page.locator('[data-testid="breadcrumbs"]').isVisible();
  expect(breadcrumbs).toBe(true);
});

Then('I should be able to click on breadcrumb items to navigate back', async function() {
  const breadcrumbLink = this.page.locator('[data-testid="breadcrumbs"] a').first();
  await breadcrumbLink.click();
  await this.page.waitForLoadState('networkidle');
});

When('I scroll to the bottom of any page', async function() {
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
});

Then('I should see footer links', async function() {
  const footer = await this.page.locator('footer').isVisible();
  expect(footer).toBe(true);
});

Then('I should be able to access important pages from the footer', async function() {
  const footerLinks = await this.page.locator('footer a').count();
  expect(footerLinks).toBeGreaterThan(0);
});

Given('I am using a mobile device', async function() {
  await this.page.setViewportSize({ width: 375, height: 667 });
});

When('I view the navigation menu', async function() {
  await this.page.waitForSelector('ds-primary-nav');
});

Then('I should see a hamburger menu icon', async function() {
  const hamburgerMenu = await this.page.locator('[data-testid="mobile-menu-toggle"]').isVisible();
  expect(hamburgerMenu).toBe(true);
});

When('I click the hamburger menu', async function() {
  await this.page.click('[data-testid="mobile-menu-toggle"]');
});

Then('the mobile menu should expand', async function() {
  const expandedMenu = await this.page.locator('[data-testid="mobile-menu-expanded"]').isVisible();
  expect(expandedMenu).toBe(true);
});

Then('all navigation items should be accessible', async function() {
  const menuItems = await this.page.locator('[data-testid="mobile-menu-item"]').count();
  expect(menuItems).toBeGreaterThan(0);
});

Given('I am on the fund screener with applied filters', async function() {
  await this.fundScreenerPage.navigate();
  await this.fundScreenerPage.applyAssetClassFilter('Equity');
});

When('I navigate to a fund details page', async function() {
  await this.fundScreenerPage.clickFundName(0);
  await this.fundDetailsPage.waitForPageLoad();
});

When('I return to the screener using browser back', async function() {
  await this.page.goBack();
  await this.fundScreenerPage.waitForPageLoad();
});

Then('my filters should still be applied', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('assetClass=Equity');
});

Then('my previous state should be maintained', async function() {
  const results = await this.fundScreenerPage.getSearchResults();
  expect(results.length).toBeGreaterThan(0);
});

When('I access a direct URL to a fund details page', async function() {
  await this.page.goto('https://www.ishares.com/us/products/239726/ishares-core-sp-500-etf');
});

Then('the page should load correctly', async function() {
  await this.fundDetailsPage.waitForPageLoad();
});

Then('all fund information should be displayed', async function() {
  await this.fundDetailsPage.verifyFundDetailsLoaded();
});

Then('navigation should work normally', async function() {
  const navVisible = await this.page.locator('ds-primary-nav').isVisible();
  expect(navVisible).toBe(true);
});

When('I navigate using only the keyboard', async function() {
  await this.page.keyboard.press('Tab');
});

Then('I should be able to access all menu items using Tab', async function() {
  for (let i = 0; i < 6; i++) {
    await this.page.keyboard.press('Tab');
    const focusedElement = await this.page.locator(':focus').isVisible();
    expect(focusedElement).toBe(true);
  }
});

Then('I should be able to activate menu items using Enter', async function() {
  await this.page.keyboard.press('Enter');
  await this.page.waitForLoadState('networkidle');
});

Then('focus indicators should be clearly visible', async function() {
  const focusedElement = await this.page.locator(':focus').isVisible();
  expect(focusedElement).toBe(true);
});

When('I navigate to a non-existent page', async function() {
  await this.page.goto('https://www.ishares.com/us/nonexistent-page');
});

Then('I should see a 404 error page', async function() {
  const errorPage = await this.page.locator('[data-testid="404-page"]').isVisible();
  expect(errorPage).toBe(true);
});

Then('I should have options to return to main sections', async function() {
  const homeLink = await this.page.locator('a[href="/us"]').isVisible();
  expect(homeLink).toBe(true);
});

Then('the navigation menu should still be functional', async function() {
  const navVisible = await this.page.locator('ds-primary-nav').isVisible();
  expect(navVisible).toBe(true);
});
