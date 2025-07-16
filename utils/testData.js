const testData = {
  searchTerms: {
    valid: {
      keywords: ['bond', 'equity', 'technology', 'healthcare', 'emerging markets'],
      tickers: ['IVV', 'AGG', 'EFA', 'VTI', 'QQQ'],
      exposures: ['S&P 500', 'Total Stock Market', 'International Developed']
    },
    invalid: {
      keywords: ['xyz123', 'nonexistentfund', '!@#$%'],
      tickers: ['INVALID', 'NOTFOUND', 'FAKE']
    }
  },

  filters: {
    assetClass: {
      equity: 'Equity',
      fixedIncome: 'Fixed Income',
      alternatives: 'Alternatives',
      multiAsset: 'Multi-Asset'
    },
    marketsRegions: {
      us: 'United States',
      international: 'International Developed',
      emergingMarkets: 'Emerging Markets',
      global: 'Global'
    },
    productRange: {
      core: 'Core',
      factor: 'Factor',
      sector: 'Sector & Industry',
      sustainable: 'Sustainable'
    }
  },

  expectedFunds: {
    popular: [
      { name: 'iShares Core S&P 500 ETF', ticker: 'IVV' },
      { name: 'iShares Core MSCI EAFE ETF', ticker: 'IEFA' },
      { name: 'iShares Core U.S. Aggregate Bond ETF', ticker: 'AGG' }
    ]
  },

  sortOptions: [
    'totalNetAssets',
    'expenseRatio', 
    'inceptionDate',
    'performance'
  ],

  dataViews: [
    'keyFacts',
    'performance',
    'holdings'
  ],

  urls: {
    base: 'https://www.ishares.com/us',
    fundScreener: 'https://www.ishares.com/us/products/etf-investments',
    comparison: 'https://www.ishares.com/us/products/fund-comparison'
  },

  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
    pageLoad: 60000
  },

  pagination: {
    defaultPageSize: 25,
    maxPages: 10
  }
};

module.exports = testData;
