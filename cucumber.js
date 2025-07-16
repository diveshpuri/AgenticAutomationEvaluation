module.exports = {
  default: {
    require: ['step-definitions/**/*.js'],
    format: ['progress', 'json:reports/cucumber-report.json', 'html:reports/cucumber-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    parallel: process.env.PARALLEL ? parseInt(process.env.PARALLEL) : 1,
    retry: 1,
    retryTagFilter: '@flaky',
    worldParameters: {
      headless: process.env.HEADLESS === 'true',
      debug: process.env.DEBUG === 'true',
      baseUrl: 'https://www.ishares.com/us'
    }
  }
};
