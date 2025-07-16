const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const HomePage = require('../page-objects/HomePage');
const FundScreenerPage = require('../page-objects/FundScreenerPage');
const FundDetailsPage = require('../page-objects/FundDetailsPage');
const ComparisonPage = require('../page-objects/ComparisonPage');
const ToolsPage = require('../page-objects/ToolsPage');
const CoreBuilderPage = require('../page-objects/CoreBuilderPage');
const ETFComparisonPage = require('../page-objects/ETFComparisonPage');
const InvestmentDiscoveryPage = require('../page-objects/InvestmentDiscoveryPage');
const ReportGeneratorPage = require('../page-objects/ReportGeneratorPage');
const AdvisorToolsPage = require('../page-objects/AdvisorToolsPage');
const InstitutionalToolsPage = require('../page-objects/InstitutionalToolsPage');

class CustomWorld {
  constructor({ parameters }) {
    this.parameters = parameters;
    this.browser = null;
    this.context = null;
    this.page = null;
    this.homePage = null;
    this.fundScreenerPage = null;
    this.fundDetailsPage = null;
    this.comparisonPage = null;
    this.toolsPage = null;
    this.coreBuilderPage = null;
    this.etfComparisonPage = null;
    this.investmentDiscoveryPage = null;
    this.reportGeneratorPage = null;
    this.advisorToolsPage = null;
    this.institutionalToolsPage = null;
  }

  async init() {
    this.browser = await chromium.launch({
      headless: true,
      slowMo: this.parameters.debug ? 100 : 0
    });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true
    });
    
    this.page = await this.context.newPage();
    
    this.homePage = new HomePage(this.page);
    this.fundScreenerPage = new FundScreenerPage(this.page);
    this.fundDetailsPage = new FundDetailsPage(this.page);
    this.comparisonPage = new ComparisonPage(this.page);
    this.toolsPage = new ToolsPage(this.page);
    this.coreBuilderPage = new CoreBuilderPage(this.page);
    this.etfComparisonPage = new ETFComparisonPage(this.page);
    this.investmentDiscoveryPage = new InvestmentDiscoveryPage(this.page);
    this.reportGeneratorPage = new ReportGeneratorPage(this.page);
    this.advisorToolsPage = new AdvisorToolsPage(this.page);
    this.institutionalToolsPage = new InstitutionalToolsPage(this.page);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);

Before(async function() {
  await this.init();
});

After(async function() {
  await this.cleanup();
});
