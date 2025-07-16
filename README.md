# iShares ETF Scraper

This Playwright script automates the process of extracting the top 3 iShares ETFs by assets under management and their NAV details from BlackRock's website.

## Features

- Navigates to iShares ETF screener page
- Extracts top 3 ETFs sorted by net assets
- Gets detailed NAV information for each ETF including:
  - Fund name and symbol
  - Current NAV (Net Asset Value)
  - NAV change (1-day)
  - YTD return
  - Net assets under management
  - Expense ratio
- Saves results to JSON file for further processing

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install Playwright browsers:
```bash
playwright install chromium
```

## Usage

Run the scraper:
```bash
python ishares_etf_scraper.py
```

The script will:
1. Navigate to the iShares website
2. Extract data from the top 3 ETFs
3. Display results in the terminal
4. Save results to `ishares_top_etfs.json`

## Output

The script outputs both console display and a JSON file with the following structure:

```json
{
  "timestamp": "2025-07-16T14:56:38.123456",
  "top_etfs": [
    {
      "rank": 1,
      "fund_name": "iShares Core S&P 500 ETF",
      "symbol": "IVV",
      "nav": "$625.28",
      "nav_change": "-2.43 (-0.39%)",
      "ytd_return": "6.90%",
      "net_assets": "629,406M",
      "expense_ratio": "0.03%",
      "url": "https://www.ishares.com/us/products/239726/ishares-core-sp-500-etf"
    }
  ]
}
```

## Notes

- The script uses headless browser mode for efficiency
- Includes error handling and timeouts for robust operation
- Automatically handles page navigation and data extraction
- Results are timestamped for tracking purposes
