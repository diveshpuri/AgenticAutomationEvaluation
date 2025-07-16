class Selectors {
  static get navigation() {
    return {
      mainNav: 'ds-primary-nav nav',
      ourFundsMenu: 'ds-primary-nav nav ul li:has-text("Our Funds")',
      searchButton: 'ds-primary-nav [data-testid="search-button"], ds-primary-nav button[aria-label*="Search"]',
      searchInput: 'ds-primary-nav input[type="search"], ds-primary-nav input[placeholder*="Search"]',
      logo: 'ds-primary-nav a[href*="ishares"]'
    };
  }

  static get fundScreener() {
    return {
      container: 'screener-root',
      searchInput: 'input[placeholder="Enter keyword, ticker, or fund name"]',
      searchButton: 'screener-icon svg',
      keywordRadio: 'mat-radio-button:has-text("KEYWORD")',
      exposureRadio: 'mat-radio-button:has-text("EXPOSURE")',
      
      filters: {
        productView: 'screener-filter-dropdown:has-text("PRODUCT VIEW"), ishares-dropdown:has-text("ETFs")',
        assetClass: 'screener-filter-dropdown:has-text("ASSET CLASS"), ishares-dropdown:has-text("Asset Class")',
        marketsRegions: 'screener-filter-dropdown:has-text("MARKETS & REGIONS"), ishares-dropdown:has-text("Markets")',
        productRange: 'screener-filter-dropdown:has-text("PRODUCT RANGE"), ishares-dropdown:has-text("Product Range")'
      },
      
      resetFilters: 'button:has-text("RESET ALL"), [data-testid="reset-filters"]',
      downloadButton: 'button:has-text("DOWNLOAD"), [data-testid="download-button"]',
      
      dataView: {
        keyFacts: 'button:has-text("KEY FACTS"), [data-view="keyFacts"]',
        performance: 'button:has-text("PERFORMANCE"), [data-view="performance"]',
        holdings: 'button:has-text("HOLDINGS"), [data-view="holdings"]'
      },
      
      sorting: {
        sortDropdown: 'select[name="sort"], screener-sort-dropdown',
        totalNetAssets: 'option[value="totalNetAssets"], button:has-text("Net Assets")',
        expenseRatio: 'option[value="expenseRatio"], button:has-text("Expense Ratio")',
        inceptionDate: 'option[value="inceptionDate"], button:has-text("Inception Date")'
      }
    };
  }

  static get fundResults() {
    return {
      resultsContainer: 'screener-funds',
      fundRow: 'screener-table tbody tr',
      fundName: 'screener-fund-cell a.link-to-product-page',
      fundTicker: 'screener-fund-cell a.link-to-product-page',
      expenseRatio: 'td:nth-child(4)',
      netAssets: 'td:nth-child(5)',
      
      comparison: {
        addToCompare: 'input[type="checkbox"][data-testid="compare"], .compare-checkbox',
        compareButton: 'button:has-text("Compare"), [data-testid="compare-button"]',
        removeFromCompare: 'button:has-text("Remove"), [data-testid="remove-compare"]'
      },
      
      pagination: {
        nextPage: 'button:has-text("Next"), [data-testid="next-page"]',
        prevPage: 'button:has-text("Previous"), [data-testid="prev-page"]',
        pageNumber: '.page-number, [data-testid="page-number"]'
      },
      
      noResults: 'screener-total-funds:has-text("0 ETFs"), screener-total-funds:has-text("No results"), .no-results-message',
      loadingSpinner: '.loading, [data-testid="loading"]'
    };
  }

  static get fundDetails() {
    return {
      container: '[data-testid="fund-details"], .fund-details-container',
      fundName: 'h1, .fund-title, [data-testid="fund-name"]',
      ticker: '.ticker, [data-testid="ticker"]',
      nav: '[data-testid="nav"], .nav-price',
      expenseRatio: '[data-testid="expense-ratio"], .expense-ratio',
      
      tabs: {
        overview: 'button:has-text("Overview"), [data-tab="overview"]',
        performance: 'button:has-text("Performance"), [data-tab="performance"]',
        holdings: 'button:has-text("Holdings"), [data-tab="holdings"]',
        literature: 'button:has-text("Literature"), [data-tab="literature"]'
      },
      
      factSheet: 'a:has-text("Fact Sheet"), [data-testid="fact-sheet"]',
      prospectus: 'a:has-text("Prospectus"), [data-testid="prospectus"]'
    };
  }

  static get comparison() {
    return {
      container: '[data-testid="comparison"], .comparison-container',
      comparedFunds: '.compared-fund, [data-testid="compared-fund"]',
      removeButton: 'button:has-text("Remove"), [data-testid="remove-fund"]',
      clearAll: 'button:has-text("Clear All"), [data-testid="clear-comparison"]',
      exportComparison: 'button:has-text("Export"), [data-testid="export-comparison"]'
    };
  }

  static getShadowRootSelector(hostSelector, shadowSelector) {
    return `${hostSelector} >> ${shadowSelector}`;
  }

  static getFlexibleSelector(...selectors) {
    return selectors.join(', ');
  }
}

module.exports = Selectors;
