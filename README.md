# iShares Regression Testing Framework

A comprehensive regression testing framework for the iShares website (ishares.com/us) using Playwright and Cucumber.js. This framework provides end-to-end testing capabilities with Gherkin scenarios that reflect real human user behavior.

## Features

- **Comprehensive Test Coverage**: Tests all major user flows including fund search, filtering, comparison, and details
- **Shadow DOM Support**: CSS selectors optimized for handling shadowRoot elements
- **Human-Centric Scenarios**: Gherkin scenarios written from a real user perspective
- **Page Object Model**: Maintainable and scalable test architecture
- **Cross-Browser Testing**: Support for Chrome, Firefox, Safari, and mobile browsers
- **Parallel Execution**: Faster test runs with parallel test execution
- **Rich Reporting**: HTML and JSON reports with screenshots on failure

## Project Structure

```
ishares-regression-testing/
├── features/                          # Gherkin feature files
│   ├── fund-search.feature           # Fund search functionality tests
│   ├── fund-filtering.feature        # Fund filtering tests
│   ├── fund-comparison.feature       # Fund comparison tests
│   ├── fund-details.feature          # Fund details page tests
│   ├── navigation.feature            # Website navigation tests
│   ├── data-management.feature       # Sorting, pagination, data views
│   └── download-functionality.feature # Download and export tests
├── step-definitions/                  # Cucumber step definitions
│   ├── world.js                      # Test world setup
│   ├── fund-search-steps.js          # Search functionality steps
│   ├── fund-filtering-steps.js       # Filtering steps
│   ├── fund-comparison-steps.js      # Comparison steps
│   ├── fund-details-steps.js         # Fund details steps
│   ├── navigation-steps.js           # Navigation steps
│   ├── data-management-steps.js      # Data management steps
│   └── download-functionality-steps.js # Download steps
├── page-objects/                      # Page Object Model classes
│   ├── HomePage.js                   # Homepage interactions
│   ├── FundScreenerPage.js           # Fund screener page
│   ├── FundDetailsPage.js            # Fund details page
│   └── ComparisonPage.js             # Fund comparison page
├── utils/                            # Utility functions and helpers
│   ├── selectors.js                  # CSS selectors for shadowRoot elements
│   ├── testData.js                   # Test data constants
│   └── helpers.js                    # Common helper functions
├── reports/                          # Test reports (generated)
├── screenshots/                      # Screenshots on failure (generated)
├── cucumber.js                       # Cucumber configuration
├── playwright.config.js              # Playwright configuration
└── package.json                      # Dependencies and scripts
```

## Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

## Usage

### Running All Tests
```bash
npm test
```

### Running Specific Test Suites
```bash
# Run only search functionality tests
npm run test:search

# Run only filtering tests
npm run test:filtering

# Run only comparison tests
npm run test:comparison

# Run only fund details tests
npm run test:details

# Run only navigation tests
npm run test:navigation

# Run only data management tests
npm run test:data

# Run only download functionality tests
npm run test:download
```

### Running Tests in Parallel
```bash
npm run test:parallel
```

### Running Tests in Headless Mode
```bash
npm run test:headless
```

### Running Tests in Debug Mode
```bash
npm run test:debug
```

## Configuration

### Environment Variables
- `HEADLESS=true/false` - Run tests in headless mode
- `DEBUG=true/false` - Enable debug mode with slower execution
- `PARALLEL=<number>` - Number of parallel workers

### Browser Configuration
The framework supports multiple browsers configured in `playwright.config.js`:
- Chrome (default)
- Firefox
- Safari/WebKit
- Mobile Chrome

### Test Data Configuration
Test data is centralized in `utils/testData.js` and includes:
- Search terms (valid and invalid)
- Filter options
- Expected fund data
- Timeout configurations

## Shadow DOM Handling

The iShares website uses custom web components with Shadow DOM. This framework includes specialized CSS selectors in `utils/selectors.js` that handle shadowRoot elements effectively:

```javascript
// Example shadowRoot selector handling
static getShadowRootSelector(hostSelector, shadowSelector) {
  return `${hostSelector} >> ${shadowSelector}`;
}

// Usage in page objects
const selector = await Helpers.handleShadowRoot(
  this.page,
  'ds-primary-nav',
  'nav ul li:has-text("Our Funds")'
);
```

## Page Object Model

The framework uses the Page Object Model pattern for maintainable test code:

- **HomePage.js**: Homepage navigation and global search
- **FundScreenerPage.js**: Fund filtering, searching, and results management
- **FundDetailsPage.js**: Individual fund information and downloads
- **ComparisonPage.js**: Fund comparison functionality

## Test Scenarios

### Fund Search (`fund-search.feature`)
- Keyword search functionality
- Ticker symbol search
- Exposure-based search
- Search validation and error handling
- Case sensitivity and partial matching

### Fund Filtering (`fund-filtering.feature`)
- Asset class filtering
- Geographic/market filtering
- Product range filtering
- Multiple filter combinations
- Filter state persistence

### Fund Comparison (`fund-comparison.feature`)
- Adding/removing funds from comparison
- Comparison data accuracy
- Export functionality
- Mobile comparison interface

### Fund Details (`fund-details.feature`)
- Navigation to fund details
- Tab functionality (Overview, Performance, Holdings, Literature)
- Document downloads (fact sheets, prospectus)
- Data accuracy validation

### Navigation (`navigation.feature`)
- Main menu navigation
- Global search
- Breadcrumb navigation
- Mobile navigation
- Keyboard accessibility

### Data Management (`data-management.feature`)
- Sorting functionality
- Pagination
- Data view switching (Key Facts, Performance, Holdings)
- Large dataset handling

### Download Functionality (`download-functionality.feature`)
- Fund data export
- Document downloads
- File format validation
- Download error handling

## Reporting

The framework generates comprehensive reports:

- **HTML Report**: `reports/cucumber-report.html`
- **JSON Report**: `reports/cucumber-report.json`
- **Playwright Report**: `reports/playwright-report/`
- **Screenshots**: Captured automatically on test failures

## Best Practices

### CSS Selectors
- Use semantic selectors that are less likely to break
- Avoid absolute XPath selectors
- Handle shadowRoot elements using Playwright's built-in support
- Implement fallback selectors for robustness

### Test Data
- Centralize test data in `utils/testData.js`
- Use realistic test data that reflects actual user behavior
- Include both positive and negative test cases

### Error Handling
- Implement retry logic for flaky elements
- Use appropriate timeouts for different operations
- Capture screenshots on failures for debugging

### Maintenance
- Regular updates to selectors as the website evolves
- Monitor test execution times and optimize slow tests
- Keep test scenarios focused and independent

## Troubleshooting

### Common Issues

1. **Element not found errors**
   - Check if selectors need updating for shadowRoot elements
   - Verify element visibility and timing

2. **Timeout errors**
   - Increase timeout values in configuration
   - Check network conditions and page load times

3. **Download failures**
   - Verify download permissions and paths
   - Check for popup blockers or security restrictions

### Debug Mode
Run tests in debug mode for detailed execution information:
```bash
DEBUG=true npm test
```

## Contributing

When adding new test scenarios:

1. Write Gherkin scenarios from a human user perspective
2. Implement corresponding step definitions
3. Update page objects with new functionality
4. Add appropriate CSS selectors for shadowRoot handling
5. Test against the live ishares.com/us site
6. Update documentation

## License

MIT License - See LICENSE file for details
