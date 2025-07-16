const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the tools page', async function() {
  await this.toolsPage.navigate();
});

When('I click on the {string} menu', async function(menuName) {
  if (menuName === 'Resources') {
    const resourcesSelector = 'a:has-text("Resources"), button:has-text("Resources")';
    await this.page.locator(resourcesSelector).first().click();
    await this.page.waitForTimeout(1000);
  }
});

When('I click on {string} in the dropdown', async function(itemName) {
  if (itemName === 'Tools') {
    const toolsSelector = 'a:has-text("Tools")';
    await this.page.locator(toolsSelector).first().click();
    await this.page.waitForTimeout(2000);
  }
});

When('I click on the {string} investor tab', async function(tabName) {
  await this.toolsPage.selectInvestorType(tabName);
});

When('I resize the browser to mobile view', async function() {
  await this.toolsPage.setMobileView();
});

When('I resize the browser to desktop view', async function() {
  await this.toolsPage.setDesktopView();
});

Then('I should be on the tools page', async function() {
  await this.toolsPage.verifyToolsPageLoaded();
});

Then('I should see {string} heading', async function(headingText) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain(headingText);
});

Then('I should see tabs for {string}, {string}, and {string}', async function(tab1, tab2, tab3) {
  await this.toolsPage.verifyInvestorTabsVisible();
});

Then('I should see individual investor tools displayed', async function() {
  await this.toolsPage.verifyIndividualInvestorTools();
});

Then('I should see {string} section', async function(sectionName) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain(sectionName);
});

Then('I should see financial advisor tools displayed', async function() {
  await this.toolsPage.verifyFinancialAdvisorTools();
});

Then('I should see institutional investor tools displayed', async function() {
  await this.toolsPage.verifyInstitutionalInvestorTools();
});

Then('I should see the following tools:', async function(dataTable) {
  const tools = dataTable.hashes();
  await this.toolsPage.verifyToolsTable(tools);
});

Then('I should see the following advisor tools:', async function(dataTable) {
  const tools = dataTable.hashes();
  await this.toolsPage.verifyToolsTable(tools);
});

Then('I should see the following institutional tools:', async function(dataTable) {
  const tools = dataTable.hashes();
  await this.toolsPage.verifyToolsTable(tools);
});

Then('the tools section should display properly on mobile', async function() {
  await this.toolsPage.verifyResponsiveLayout();
});

Then('the investor type tabs should be accessible', async function() {
  await this.toolsPage.verifyInvestorTabsVisible();
});

Then('the tools section should display properly on desktop', async function() {
  await this.toolsPage.verifyResponsiveLayout();
});
