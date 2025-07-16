const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');
const { expect } = require('@playwright/test');

class ToolsPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.tools, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await this.waitForPageLoad();
  }

  async navigateFromHomepage() {
    await this.page.goto(testData.urls.homepage, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await this.waitForPageLoad();
    
    await Helpers.clickWithRetry(this.page, Selectors.navigation.resourcesMenu);
    await this.page.waitForTimeout(1000);
    await Helpers.clickWithRetry(this.page, Selectors.navigation.toolsMenuItem);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await Helpers.waitForPageLoad(this.page);
    await Helpers.waitForElement(this.page, Selectors.tools.container);
    await this.page.waitForTimeout(2000);
  }

  async selectInvestorType(type) {
    const tabSelector = Selectors.tools.investorTabs[type.toLowerCase().replace(' ', '')];
    await Helpers.clickWithRetry(this.page, tabSelector);
    await this.page.waitForTimeout(2000);
  }

  async verifyToolsPageLoaded() {
    await Helpers.verifyElementExists(this.page, Selectors.tools.heading);
    const headingText = await this.page.locator(Selectors.tools.heading).textContent();
    expect(headingText).toContain('TOOLS FOR INVESTORS');
  }

  async verifyInvestorTabsVisible() {
    await Helpers.verifyElementExists(this.page, Selectors.tools.investorTabs.individualinvestors);
    await Helpers.verifyElementExists(this.page, Selectors.tools.investorTabs.financialadvisors);
    await Helpers.verifyElementExists(this.page, Selectors.tools.investorTabs.institutionalinvestors);
  }

  async verifyIndividualInvestorTools() {
    await this.selectInvestorType('Individual Investors');
    
    await Helpers.verifyElementExists(this.page, Selectors.tools.sections.buildPortfolio);
    await Helpers.verifyElementExists(this.page, Selectors.tools.sections.discoverCompare);
    
    const buildPortfolioText = await this.page.locator(Selectors.tools.sections.buildPortfolio).textContent();
    expect(buildPortfolioText).toContain('BUILD A DIVERSIFIED PORTFOLIO');
    
    const discoverCompareText = await this.page.locator(Selectors.tools.sections.discoverCompare).textContent();
    expect(discoverCompareText).toContain('DISCOVER & COMPARE');
  }

  async verifyFinancialAdvisorTools() {
    await this.selectInvestorType('Financial Advisors');
    
    await Helpers.verifyElementExists(this.page, Selectors.tools.sections.seekBetterOutcomes);
    
    const sectionText = await this.page.locator(Selectors.tools.sections.seekBetterOutcomes).textContent();
    expect(sectionText).toContain('SEEK BETTER OUTCOMES FOR CLIENTS & PROSPECTS');
  }

  async verifyInstitutionalInvestorTools() {
    await this.selectInvestorType('Institutional Investors');
    
    await Helpers.verifyElementExists(this.page, Selectors.tools.sections.analyticsTools);
  }

  async verifyToolExists(toolName, description) {
    const toolElements = await this.page.locator(`text="${toolName}"`).all();
    expect(toolElements.length).toBeGreaterThan(0);
    
    if (description) {
      const descriptionElements = await this.page.locator(`text="${description}"`).all();
      expect(descriptionElements.length).toBeGreaterThan(0);
    }
  }

  async clickTool(toolName) {
    const toolSelector = `text="${toolName}"`;
    await Helpers.clickWithRetry(this.page, toolSelector);
    await Helpers.waitForPageLoad(this.page);
  }

  async verifyToolsTable(toolsData) {
    for (const tool of toolsData) {
      await this.verifyToolExists(tool['Tool Name'], tool['Description']);
    }
  }

  async setMobileView() {
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.waitForTimeout(1000);
  }

  async setDesktopView() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.waitForTimeout(1000);
  }

  async verifyResponsiveLayout() {
    await Helpers.verifyElementExists(this.page, Selectors.tools.container);
    await Helpers.verifyElementExists(this.page, Selectors.tools.investorTabs.individualinvestors);
  }
}

module.exports = ToolsPage;
