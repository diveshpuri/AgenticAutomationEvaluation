# GitHub Actions Workflows

## Daily ETF Scraper

The `daily-etf-scraper.yml` workflow automatically runs the iShares ETF scraper script every day at 9:00 AM UTC.

### Features

- **Scheduled Execution**: Runs daily at 9:00 AM UTC (after US market close)
- **Manual Trigger**: Can be manually triggered via GitHub Actions UI
- **Artifact Storage**: Saves JSON results as downloadable artifacts for 30 days
- **Auto-commit**: Automatically commits updated data back to the repository
- **Environment Setup**: Installs Python, dependencies, and Playwright browsers

### Workflow Steps

1. Checkout the repository code
2. Set up Python 3.12 environment
3. Install Python dependencies from `requirements.txt`
4. Install Playwright Chromium browser
5. Execute the ETF scraper script
6. Upload results as artifacts
7. Commit and push updated JSON data

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
