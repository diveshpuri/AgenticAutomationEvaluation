#!/usr/bin/env python3
"""
Playwright script to scrape top 3 iShares ETFs by assets under management
and extract their NAV details from BlackRock's website.

This script automates the process of:
1. Navigating to BlackRock's iShares ETF screener
2. Extracting the top 3 ETFs sorted by net assets
3. Getting detailed NAV information for each ETF
4. Outputting results in both console and JSON format
"""

import asyncio
import json
from playwright.async_api import async_playwright
from datetime import datetime
import re

async def scrape_ishares_etfs():
    """
    Scrape top 3 iShares ETFs by assets under management and get their NAV details.
    
    Returns:
        list: List of dictionaries containing ETF data
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        try:
            print("Navigating to iShares ETF screener...")
            await page.goto("https://www.ishares.com/us/products/etf-investments#/?productView=etf&pageNumber=1&sortColumn=totalNetAssets&sortDirection=desc&dataView=keyFacts")
            
            await page.wait_for_selector('screener-table', timeout=30000)
            print("ETF screener page loaded successfully")
            
            etf_rows = await page.query_selector_all('screener-table tbody tr')
            top_etfs = []
            
            for i in range(min(3, len(etf_rows))):
                row = etf_rows[i]
                
                fund_cell = await row.query_selector('th')
                if not fund_cell:
                    print(f"Could not find fund cell for ETF #{i+1}")
                    continue
                
                fund_link_element = await fund_cell.query_selector('a')
                fund_url = await fund_link_element.get_attribute('href') if fund_link_element else None
                
                fund_text = await fund_link_element.inner_text() if fund_link_element else ""
                lines = fund_text.strip().split('\n')
                fund_name = lines[0].strip() if lines else "N/A"
                symbol = lines[-1].strip() if len(lines) > 1 else "N/A"
                
                row_text = await row.inner_text()
                row_parts = row_text.split('\t')  # Split by tabs to get column data
                
                net_assets = "N/A"
                ytd_return = "N/A"
                
                for part in row_parts:
                    part = part.strip()
                    if part.endswith('M') and ',' in part:
                        net_assets = part
                    elif '%' in part and len(part) < 10 and not part.startswith('0.'):
                        ytd_return = part
                
                if fund_url:
                    fund_page = await context.new_page()
                    full_url = f"https://www.ishares.com{fund_url}" if fund_url.startswith('/') else fund_url
                    await fund_page.goto(full_url)
                    
                    try:
                        await fund_page.wait_for_selector('h1', timeout=15000)
                        
                        nav = "N/A"
                        nav_change = "N/A"
                        expense_ratio = "N/A"
                        
                        page_content = await fund_page.content()
                        
                        nav_match = re.search(r'\$(\d{1,4}(?:,\d{3})*\.\d{2})', page_content)
                        if nav_match:
                            nav = f"${nav_match.group(1)}"
                        
                        change_match = re.search(r'(-?\d+\.\d+)\s*\((-?\d+\.\d+%)\)', page_content)
                        if change_match:
                            nav_change = f"{change_match.group(1)} ({change_match.group(2)})"
                        
                        expense_match = re.search(r'Expense Ratio:\s*(\d+\.\d+%)', page_content)
                        if expense_match:
                            expense_ratio = expense_match.group(1)
                        
                        etf_data = {
                            'rank': i + 1,
                            'fund_name': fund_name,
                            'symbol': symbol,
                            'nav': nav,
                            'nav_change': nav_change,
                            'ytd_return': ytd_return,
                            'net_assets': net_assets,
                            'expense_ratio': expense_ratio,
                            'url': full_url
                        }
                        
                        top_etfs.append(etf_data)
                        print(f"Extracted data for ETF #{i+1}: {symbol}")
                        
                    except Exception as e:
                        print(f"Error extracting details for ETF #{i+1}: {str(e)}")
                    
                    await fund_page.close()
                else:
                    print(f"Could not find URL for ETF #{i+1}")
            
            return top_etfs
            
        except Exception as e:
            print(f"Error during scraping: {str(e)}")
            import traceback
            traceback.print_exc()
            return []
        
        finally:
            await browser.close()

async def main():
    """
    Main function to run the scraper and display results.
    """
    print("iShares ETF Scraper - Top 3 ETFs by Assets Under Management")
    print("=" * 70)
    
    etfs = await scrape_ishares_etfs()
    
    if etfs:
        print(f"\nTop 3 iShares ETFs by Net Assets (as of {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}):")
        print("=" * 80)
        
        for etf in etfs:
            print(f"\n{etf['rank']}. {etf['fund_name']} ({etf['symbol']})")
            print(f"   NAV: {etf['nav']}")
            print(f"   NAV Change: {etf['nav_change']}")
            print(f"   YTD Return: {etf['ytd_return']}")
            print(f"   Net Assets: {etf['net_assets']}")
            print(f"   Expense Ratio: {etf['expense_ratio']}")
            print(f"   URL: {etf['url']}")
        
        output_file = 'ishares_top_etfs.json'
        with open(output_file, 'w') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'description': 'Top 3 iShares ETFs by Net Assets Under Management',
                'source': 'https://www.ishares.com/us/products/etf-investments',
                'top_etfs': etfs
            }, f, indent=2)
        
        print(f"\nResults saved to '{output_file}'")
        print("\nScript completed successfully!")
        
    else:
        print("No ETF data could be extracted. Please check the website structure or network connectivity.")

if __name__ == "__main__":
    asyncio.run(main())
