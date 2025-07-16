# GitHub Actions Workflows

## Daily ETF Scraper

The `daily-etf-scraper.yml` workflow automatically runs the iShares ETF scraper script every day at 9:00 AM UTC.

### Features

- **Scheduled Execution**: Runs daily at 9:00 AM UTC (after US market close)
- **Manual Trigger**: Can be manually triggered via GitHub Actions UI
- **Website Validation**: Tests iShares website accessibility and structure before scraping
- **Data Quality Tests**: Validates extracted ETF data completeness and format
- **Artifact Storage**: Saves JSON results and test reports as downloadable artifacts for 30 days
- **Auto-commit**: Automatically commits updated data back to the repository
- **Environment Setup**: Installs Python, dependencies, and Playwright browsers

### Workflow Steps

1. Checkout the repository code
2. Set up Python 3.12 environment
3. Install Python dependencies from `requirements.txt`
4. Install Playwright Chromium browser
5. **Run website validation tests** - Verify iShares website is accessible and functional
6. **Execute the ETF scraper script** - Extract top 3 ETF data
7. **Run integration tests** - Validate scraper output and data quality
8. Upload results and test reports as artifacts
9. Commit and push updated JSON data

### Test Validation

The workflow includes comprehensive testing:

- **Website Validation** (`test_ishares_validation.py`):
  - Website accessibility and load times
  - ETF screener page functionality
  - Table structure and data availability
  - CSS selector validity
  - Individual ETF page access

- **Integration Testing** (`test_scraper_integration.py`):
  - Scraper execution without errors
  - JSON output generation and structure
  - ETF data completeness and format validation
  - Expected ETF symbols verification
  - URL accessibility checks

### Manual Execution

To run the workflow manually:
1. Go to the "Actions" tab in your GitHub repository
2. Select "Daily iShares ETF Scraper" workflow
3. Click "Run workflow" button
4. Choose the branch and click "Run workflow"

### Monitoring

- Check the "Actions" tab to monitor workflow runs
- Download artifacts to access historical data
- View commit history to see daily data updates

### Configuration

The workflow can be customized by modifying:
- **Schedule**: Change the cron expression in `daily-etf-scraper.yml`
- **Retention**: Adjust `retention-days` for artifact storage
- **Timezone**: Modify cron schedule for different execution times
