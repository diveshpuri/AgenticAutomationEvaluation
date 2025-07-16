#!/usr/bin/env python3
"""
Test cases to validate iShares.com/us website functionality and data extraction.
This script validates that the website structure and data are accessible for scraping.
"""

import asyncio
import json
import sys
from playwright.async_api import async_playwright
from datetime import datetime
import re

class iSharesWebsiteValidator:
    """Test validator for iShares website functionality"""
    
    def __init__(self):
        self.test_results = []
        self.browser = None
        self.context = None
        self.page = None
    
    async def setup(self):
        """Setup browser and page for testing"""
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(headless=True)
        self.context = await self.browser.new_context()
        self.page = await self.context.new_page()
    
    async def teardown(self):
        """Cleanup browser resources"""
        if self.browser:
            await self.browser.close()
    
    def log_test_result(self, test_name, passed, message="", data=None):
        """Log test result"""
        result = {
            "test_name": test_name,
            "passed": passed,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "data": data
        }
        self.test_results.append(result)
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
    
    async def test_website_accessibility(self):
        """Test 1: Verify iShares website is accessible"""
        try:
            response = await self.page.goto("https://www.ishares.com/us/products/etf-investments")
            
            if response.status == 200:
                self.log_test_result(
                    "Website Accessibility", 
                    True, 
                    f"Website loaded successfully (HTTP {response.status})"
                )
            else:
                self.log_test_result(
                    "Website Accessibility", 
                    False, 
                    f"Website returned HTTP {response.status}"
                )
        except Exception as e:
            self.log_test_result(
                "Website Accessibility", 
                False, 
                f"Failed to load website: {str(e)}"
            )
    
    async def test_etf_screener_page_load(self):
        """Test 2: Verify ETF screener page loads with data"""
        try:
            await self.page.goto("https://www.ishares.com/us/products/etf-investments#/?productView=etf&pageNumber=1&sortColumn=totalNetAssets&sortDirection=desc&dataView=keyFacts")
            
            await self.page.wait_for_selector('screener-table', timeout=30000)
            
            etf_rows = await self.page.query_selector_all('screener-table tbody tr')
            
            if len(etf_rows) >= 3:
                self.log_test_result(
                    "ETF Screener Data Load", 
                    True, 
                    f"Found {len(etf_rows)} ETF rows in screener table"
                )
            else:
                self.log_test_result(
                    "ETF Screener Data Load", 
                    False, 
                    f"Only found {len(etf_rows)} ETF rows, expected at least 3"
                )
        except Exception as e:
            self.log_test_result(
                "ETF Screener Data Load", 
                False, 
                f"Failed to load ETF screener: {str(e)}"
            )
    
    async def test_table_structure_validation(self):
        """Test 3: Validate table structure and column headers"""
        try:
            table_headers = await self.page.query_selector_all('screener-table thead th')
            header_texts = []
            
            for header in table_headers:
                text = await header.inner_text()
                header_texts.append(text.strip())
            
            expected_columns = ["Fund Name", "Net Assets", "YTD Return"]
            found_columns = []
            
            for expected in expected_columns:
                for header in header_texts:
                    if expected.lower() in header.lower():
                        found_columns.append(expected)
                        break
            
            if len(found_columns) >= 2:
                self.log_test_result(
                    "Table Structure Validation", 
                    True, 
                    f"Found expected columns: {found_columns}",
                    {"headers": header_texts}
                )
            else:
                self.log_test_result(
                    "Table Structure Validation", 
                    False, 
                    f"Missing expected columns. Found: {header_texts}"
                )
        except Exception as e:
            self.log_test_result(
                "Table Structure Validation", 
                False, 
                f"Failed to validate table structure: {str(e)}"
            )
    
    async def test_top_etf_data_extraction(self):
        """Test 4: Validate top ETF data can be extracted"""
        try:
            etf_rows = await self.page.query_selector_all('screener-table tbody tr')
            
            if len(etf_rows) == 0:
                self.log_test_result(
                    "Top ETF Data Extraction", 
                    False, 
                    "No ETF rows found for data extraction"
                )
                return
            
            first_row = etf_rows[0]
            
            fund_cell = await first_row.query_selector('th')
            fund_link = await fund_cell.query_selector('a') if fund_cell else None
            
            if fund_link:
                fund_text = await fund_link.inner_text()
                fund_url = await fund_link.get_attribute('href')
                
                table_cells = await first_row.query_selector_all('td')
                
                extracted_data = {
                    "fund_text": fund_text.strip(),
                    "fund_url": fund_url,
                    "table_cells_count": len(table_cells)
                }
                
                if fund_text and fund_url and len(table_cells) >= 3:
                    self.log_test_result(
                        "Top ETF Data Extraction", 
                        True, 
                        f"Successfully extracted data from first ETF row",
                        extracted_data
                    )
                else:
                    self.log_test_result(
                        "Top ETF Data Extraction", 
                        False, 
                        f"Incomplete data extraction from first ETF row",
                        extracted_data
                    )
            else:
                self.log_test_result(
                    "Top ETF Data Extraction", 
                    False, 
                    "Could not find fund link in first ETF row"
                )
        except Exception as e:
            self.log_test_result(
                "Top ETF Data Extraction", 
                False, 
                f"Failed to extract ETF data: {str(e)}"
            )
    
    async def test_individual_etf_page_access(self):
        """Test 5: Validate individual ETF pages are accessible"""
        try:
            etf_rows = await self.page.query_selector_all('screener-table tbody tr')
            
            if len(etf_rows) == 0:
                self.log_test_result(
                    "Individual ETF Page Access", 
                    False, 
                    "No ETF rows found to test individual pages"
                )
                return
            
            first_row = etf_rows[0]
            fund_cell = await first_row.query_selector('th')
            fund_link = await fund_cell.query_selector('a') if fund_cell else None
            
            if fund_link:
                fund_url = await fund_link.get_attribute('href')
                full_url = f"https://www.ishares.com{fund_url}" if fund_url.startswith('/') else fund_url
                
                etf_page = await self.context.new_page()
                response = await etf_page.goto(full_url)
                
                if response.status == 200:
                    await etf_page.wait_for_selector('h1', timeout=15000)
                    
                    page_title = await etf_page.title()
                    
                    self.log_test_result(
                        "Individual ETF Page Access", 
                        True, 
                        f"ETF page loaded successfully: {page_title}",
                        {"url": full_url, "status": response.status}
                    )
                else:
                    self.log_test_result(
                        "Individual ETF Page Access", 
                        False, 
                        f"ETF page returned HTTP {response.status}",
                        {"url": full_url}
                    )
                
                await etf_page.close()
            else:
                self.log_test_result(
                    "Individual ETF Page Access", 
                    False, 
                    "Could not find ETF URL to test individual page"
                )
        except Exception as e:
            self.log_test_result(
                "Individual ETF Page Access", 
                False, 
                f"Failed to access individual ETF page: {str(e)}"
            )
    
    async def test_nav_data_availability(self):
        """Test 6: Validate NAV data is available on ETF pages"""
        try:
            etf_rows = await self.page.query_selector_all('screener-table tbody tr')
            
            if len(etf_rows) == 0:
                self.log_test_result(
                    "NAV Data Availability", 
                    False, 
                    "No ETF rows found to test NAV data"
                )
                return
            
            first_row = etf_rows[0]
            fund_cell = await first_row.query_selector('th')
            fund_link = await fund_cell.query_selector('a') if fund_cell else None
            
            if fund_link:
                fund_url = await fund_link.get_attribute('href')
                full_url = f"https://www.ishares.com{fund_url}" if fund_url.startswith('/') else fund_url
                
                etf_page = await self.context.new_page()
                await etf_page.goto(full_url)
                await etf_page.wait_for_selector('h1', timeout=15000)
                
                page_content = await etf_page.content()
                
                nav_indicators = [
                    '$' in page_content and re.search(r'\$\d+\.\d{2}', page_content),
                    'NAV' in page_content.upper(),
                    'Net Asset Value' in page_content,
                    re.search(r'\d+\.\d+%', page_content)  # Percentage values
                ]
                
                found_indicators = sum(1 for indicator in nav_indicators if indicator)
                
                if found_indicators >= 2:
                    self.log_test_result(
                        "NAV Data Availability", 
                        True, 
                        f"Found {found_indicators}/4 NAV data indicators on ETF page"
                    )
                else:
                    self.log_test_result(
                        "NAV Data Availability", 
                        False, 
                        f"Only found {found_indicators}/4 NAV data indicators"
                    )
                
                await etf_page.close()
            else:
                self.log_test_result(
                    "NAV Data Availability", 
                    False, 
                    "Could not access ETF page to check NAV data"
                )
        except Exception as e:
            self.log_test_result(
                "NAV Data Availability", 
                False, 
                f"Failed to validate NAV data: {str(e)}"
            )
    
    async def test_css_selectors_validity(self):
        """Test 7: Validate CSS selectors used in scraper are working"""
        try:
            screener_table = await self.page.query_selector('screener-table')
            tbody_rows = await self.page.query_selector_all('screener-table tbody tr')
            
            selectors_test = {
                'screener-table': screener_table is not None,
                'tbody tr': len(tbody_rows) > 0
            }
            
            if len(tbody_rows) > 0:
                first_row = tbody_rows[0]
                th_element = await first_row.query_selector('th')
                td_elements = await first_row.query_selector_all('td')
                
                selectors_test.update({
                    'th (fund cell)': th_element is not None,
                    'td (table cells)': len(td_elements) > 0
                })
            
            passed_selectors = sum(1 for result in selectors_test.values() if result)
            total_selectors = len(selectors_test)
            
            if passed_selectors == total_selectors:
                self.log_test_result(
                    "CSS Selectors Validity", 
                    True, 
                    f"All {total_selectors} CSS selectors working correctly",
                    selectors_test
                )
            else:
                self.log_test_result(
                    "CSS Selectors Validity", 
                    False, 
                    f"Only {passed_selectors}/{total_selectors} CSS selectors working",
                    selectors_test
                )
        except Exception as e:
            self.log_test_result(
                "CSS Selectors Validity", 
                False, 
                f"Failed to validate CSS selectors: {str(e)}"
            )
    
    async def run_all_tests(self):
        """Run all validation tests"""
        print("🧪 Starting iShares Website Validation Tests")
        print("=" * 60)
        
        await self.setup()
        
        try:
            await self.test_website_accessibility()
            await self.test_etf_screener_page_load()
            await self.test_table_structure_validation()
            await self.test_top_etf_data_extraction()
            await self.test_individual_etf_page_access()
            await self.test_nav_data_availability()
            await self.test_css_selectors_validity()
            
        finally:
            await self.teardown()
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['passed'])
        failed_tests = total_tests - passed_tests
        
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {passed_tests}/{total_tests} tests passed")
        
        if failed_tests > 0:
            print(f"❌ {failed_tests} tests failed")
            print("\nFailed Tests:")
            for result in self.test_results:
                if not result['passed']:
                    print(f"  - {result['test_name']}: {result['message']}")
        else:
            print("✅ All tests passed!")
        
        with open('ishares_validation_results.json', 'w') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'summary': {
                    'total_tests': total_tests,
                    'passed_tests': passed_tests,
                    'failed_tests': failed_tests,
                    'success_rate': f"{(passed_tests/total_tests)*100:.1f}%"
                },
                'test_results': self.test_results
            }, f, indent=2)
        
        print(f"\n📄 Detailed results saved to 'ishares_validation_results.json'")
        
        return 0 if failed_tests == 0 else 1

async def main():
    """Main function to run validation tests"""
    validator = iSharesWebsiteValidator()
    exit_code = await validator.run_all_tests()
    sys.exit(exit_code)

if __name__ == "__main__":
    asyncio.run(main())
