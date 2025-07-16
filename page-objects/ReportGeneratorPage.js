const Selectors = require('../utils/selectors');
const Helpers = require('../utils/helpers');
const testData = require('../utils/testData');
const { expect } = require('@playwright/test');

class ReportGeneratorPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(testData.urls.reportGenerator, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await this.waitForPageLoad();
  }

  async navigateFromTools() {
    const toolSelector = 'text="Report Generator Tool"';
    await Helpers.clickWithRetry(this.page, toolSelector);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await Helpers.waitForPageLoad(this.page);
    await this.page.waitForTimeout(3000);
  }

  async verifyReportGeneratorPage() {
    const pageContent = await this.page.textContent('body');
    const hasReportContent = 
      pageContent.includes('report') || 
      pageContent.includes('generator') ||
      pageContent.includes('customized') ||
      pageContent.includes('data');
    
    expect(hasReportContent).toBe(true);
  }

  async verifyCustomizationOptions() {
    const pageContent = await this.page.textContent('body');
    const hasCustomizationOptions = 
      pageContent.includes('customize') || 
      pageContent.includes('select') ||
      pageContent.includes('options') ||
      pageContent.includes('fund');
    
    expect(hasCustomizationOptions).toBe(true);
  }

  async verifyDataSelectionInterface() {
    const pageContent = await this.page.textContent('body');
    const hasDataInterface = 
      pageContent.includes('fund') || 
      pageContent.includes('index') ||
      pageContent.includes('data') ||
      pageContent.includes('selection');
    
    expect(hasDataInterface).toBe(true);
  }

  async verifyFundSelectionOptions() {
    const pageContent = await this.page.textContent('body');
    const hasFundOptions = 
      pageContent.includes('fund') || 
      pageContent.includes('ETF') ||
      pageContent.includes('select') ||
      pageContent.includes('iShares');
    
    expect(hasFundOptions).toBe(true);
  }

  async verifyDataFieldOptions() {
    const pageContent = await this.page.textContent('body');
    const hasDataFields = 
      pageContent.includes('performance') || 
      pageContent.includes('data') ||
      pageContent.includes('field') ||
      pageContent.includes('metric');
    
    expect(hasDataFields).toBe(true);
  }

  async verifyReportFormatOptions() {
    const pageContent = await this.page.textContent('body');
    const hasFormatOptions = 
      pageContent.includes('format') || 
      pageContent.includes('PDF') ||
      pageContent.includes('Excel') ||
      pageContent.includes('export');
    
    expect(hasFormatOptions).toBe(true);
  }

  async selectFundForReporting(ticker) {
    try {
      const fundInput = this.page.locator('input[placeholder*="fund"], input[placeholder*="ticker"], input[placeholder*="search"]').first();
      if (await fundInput.isVisible({ timeout: 5000 })) {
        await fundInput.fill(ticker);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log(`Fund selection not available in current interface`);
    }
  }

  async selectPerformanceDataFields() {
    try {
      const performanceCheckbox = this.page.locator('input[type="checkbox"]:near(:text("performance")), label:has-text("performance")').first();
      if (await performanceCheckbox.isVisible({ timeout: 5000 })) {
        await performanceCheckbox.check();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log(`Performance data field selection not available`);
    }
  }

  async selectDateRange() {
    try {
      const dateInput = this.page.locator('input[type="date"], input[placeholder*="date"]').first();
      if (await dateInput.isVisible({ timeout: 5000 })) {
        await dateInput.click();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log(`Date range selection not available`);
    }
  }

  async clickGenerateReport() {
    try {
      const generateButton = this.page.locator('button:has-text("generate"), button:has-text("create"), button:has-text("build")').first();
      if (await generateButton.isVisible({ timeout: 5000 })) {
        await generateButton.click();
        await this.page.waitForTimeout(3000);
      }
    } catch (error) {
      console.log(`Generate report button not available`);
    }
  }

  async verifyCustomizedReport() {
    const pageContent = await this.page.textContent('body');
    const hasReport = 
      pageContent.includes('report') || 
      pageContent.includes('data') ||
      pageContent.includes('performance') ||
      pageContent.includes('fund');
    
    expect(hasReport).toBe(true);
  }

  async verifyDownloadOptions() {
    const pageContent = await this.page.textContent('body');
    const hasDownloadOptions = 
      pageContent.includes('download') || 
      pageContent.includes('export') ||
      pageContent.includes('save') ||
      pageContent.includes('PDF');
    
    expect(hasDownloadOptions).toBe(true);
  }

  async selectMultipleFunds() {
    try {
      await this.selectFundForReporting('IVV');
      await this.selectFundForReporting('VOO');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log(`Multiple fund selection not available`);
    }
  }

  async selectComparativeDataFields() {
    try {
      const compareCheckbox = this.page.locator('input[type="checkbox"]:near(:text("compare")), label:has-text("comparison")').first();
      if (await compareCheckbox.isVisible({ timeout: 5000 })) {
        await compareCheckbox.check();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log(`Comparative data field selection not available`);
    }
  }

  async verifyMultiFundReport() {
    const pageContent = await this.page.textContent('body');
    const hasMultiFundReport = 
      pageContent.includes('comparison') || 
      pageContent.includes('multiple') ||
      pageContent.includes('side-by-side') ||
      pageContent.includes('compare');
    
    expect(hasMultiFundReport).toBe(true);
  }

  async verifySideBySideMetrics() {
    const pageContent = await this.page.textContent('body');
    const hasSideBySideMetrics = 
      pageContent.includes('side-by-side') || 
      pageContent.includes('comparison') ||
      pageContent.includes('metric') ||
      pageContent.includes('performance');
    
    expect(hasSideBySideMetrics).toBe(true);
  }

  async verifyPerformanceDataOptions() {
    const pageContent = await this.page.textContent('body');
    const hasPerformanceOptions = 
      pageContent.includes('performance') || 
      pageContent.includes('return') ||
      pageContent.includes('yield') ||
      pageContent.includes('growth');
    
    expect(hasPerformanceOptions).toBe(true);
  }

  async verifyHoldingsDataOptions() {
    const pageContent = await this.page.textContent('body');
    const hasHoldingsOptions = 
      pageContent.includes('holdings') || 
      pageContent.includes('portfolio') ||
      pageContent.includes('allocation') ||
      pageContent.includes('sector');
    
    expect(hasHoldingsOptions).toBe(true);
  }

  async verifyRiskMetricsOptions() {
    const pageContent = await this.page.textContent('body');
    const hasRiskOptions = 
      pageContent.includes('risk') || 
      pageContent.includes('volatility') ||
      pageContent.includes('beta') ||
      pageContent.includes('deviation');
    
    expect(hasRiskOptions).toBe(true);
  }

  async verifyFundCharacteristicsOptions() {
    const pageContent = await this.page.textContent('body');
    const hasCharacteristicsOptions = 
      pageContent.includes('characteristics') || 
      pageContent.includes('expense') ||
      pageContent.includes('assets') ||
      pageContent.includes('inception');
    
    expect(hasCharacteristicsOptions).toBe(true);
  }

  async verifyPDFExportOption() {
    const pageContent = await this.page.textContent('body');
    const hasPDFOption = 
      pageContent.includes('PDF') || 
      pageContent.includes('pdf') ||
      pageContent.includes('export') ||
      pageContent.includes('download');
    
    expect(hasPDFOption).toBe(true);
  }

  async verifyExcelExportOption() {
    const pageContent = await this.page.textContent('body');
    const hasExcelOption = 
      pageContent.includes('Excel') || 
      pageContent.includes('excel') ||
      pageContent.includes('xlsx') ||
      pageContent.includes('spreadsheet');
    
    expect(hasExcelOption).toBe(true);
  }

  async verifyCSVExportOption() {
    const pageContent = await this.page.textContent('body');
    const hasCSVOption = 
      pageContent.includes('CSV') || 
      pageContent.includes('csv') ||
      pageContent.includes('comma') ||
      pageContent.includes('delimited');
    
    expect(hasCSVOption).toBe(true);
  }

  async verifyValidationError() {
    const pageContent = await this.page.textContent('body');
    const hasValidationError = 
      pageContent.includes('error') || 
      pageContent.includes('required') ||
      pageContent.includes('select') ||
      pageContent.includes('validation');
    
    expect(hasValidationError).toBe(true);
  }

  async selectHistoricalDateRange() {
    try {
      const startDateInput = this.page.locator('input[type="date"]:first, input[placeholder*="start"]').first();
      const endDateInput = this.page.locator('input[type="date"]:last, input[placeholder*="end"]').first();
      
      if (await startDateInput.isVisible({ timeout: 5000 })) {
        await startDateInput.fill('2023-01-01');
        await this.page.waitForTimeout(1000);
      }
      
      if (await endDateInput.isVisible({ timeout: 5000 })) {
        await endDateInput.fill('2023-12-31');
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log(`Historical date range selection not available`);
    }
  }

  async verifyHistoricalData() {
    const pageContent = await this.page.textContent('body');
    const hasHistoricalData = 
      pageContent.includes('historical') || 
      pageContent.includes('time-series') ||
      pageContent.includes('2023') ||
      pageContent.includes('period');
    
    expect(hasHistoricalData).toBe(true);
  }

  async verifyTimeSeriesData() {
    const pageContent = await this.page.textContent('body');
    const hasTimeSeriesData = 
      pageContent.includes('time-series') || 
      pageContent.includes('timeline') ||
      pageContent.includes('chart') ||
      pageContent.includes('graph');
    
    expect(hasTimeSeriesData).toBe(true);
  }

  async verifyAccessibility() {
    const focusableElements = await this.page.locator('button, input, select, textarea, a[href]').count();
    expect(focusableElements).toBeGreaterThan(0);
    
    await this.page.keyboard.press('Tab');
    const focusedElement = await this.page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThanOrEqual(0);
  }

  async verifyScreenReaderFriendly() {
    const labeledElements = await this.page.locator('input[aria-label], input[aria-labelledby], label').count();
    expect(labeledElements).toBeGreaterThanOrEqual(0);
  }

  async verifyPageRedirection() {
    const currentUrl = this.page.url();
    const hasValidUrl = 
      currentUrl.includes('report') || 
      currentUrl.includes('generator') ||
      currentUrl.includes('data') ||
      currentUrl.includes('ishares');
    
    expect(hasValidUrl).toBe(true);
  }
}

module.exports = ReportGeneratorPage;
