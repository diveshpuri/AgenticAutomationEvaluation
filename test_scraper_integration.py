#!/usr/bin/env python3
"""
Integration tests for the iShares ETF scraper to validate end-to-end functionality.
This script tests the actual scraper script and validates the output data quality.
"""

import asyncio
import json
import subprocess
import sys
import os
from datetime import datetime
import re

class ScraperIntegrationTester:
    """Integration tester for the ETF scraper script"""
    
    def __init__(self):
        self.test_results = []
        self.scraper_output = None
        self.json_output = None
    
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
    
    def test_scraper_execution(self):
        """Test 1: Verify scraper script executes without errors"""
        try:
            result = subprocess.run(
                [sys.executable, 'ishares_etf_scraper_final.py'],
                capture_output=True,
                text=True,
                timeout=120  # 2 minute timeout
            )
            
            self.scraper_output = {
                'stdout': result.stdout,
                'stderr': result.stderr,
                'returncode': result.returncode
            }
            
            if result.returncode == 0:
                self.log_test_result(
                    "Scraper Execution", 
                    True, 
                    "Scraper executed successfully without errors"
                )
            else:
                self.log_test_result(
                    "Scraper Execution", 
                    False, 
                    f"Scraper failed with return code {result.returncode}",
                    {"stderr": result.stderr}
                )
        except subprocess.TimeoutExpired:
            self.log_test_result(
                "Scraper Execution", 
                False, 
                "Scraper execution timed out after 2 minutes"
            )
        except Exception as e:
            self.log_test_result(
                "Scraper Execution", 
                False, 
                f"Failed to execute scraper: {str(e)}"
            )
    
    def test_json_output_generation(self):
        """Test 2: Verify JSON output file is generated"""
        try:
            if os.path.exists('ishares_top_etfs.json'):
                with open('ishares_top_etfs.json', 'r') as f:
                    self.json_output = json.load(f)
                
                self.log_test_result(
                    "JSON Output Generation", 
                    True, 
                    "JSON output file generated successfully"
                )
            else:
                self.log_test_result(
                    "JSON Output Generation", 
                    False, 
                    "JSON output file not found"
                )
        except json.JSONDecodeError as e:
            self.log_test_result(
                "JSON Output Generation", 
                False, 
                f"JSON output file is malformed: {str(e)}"
            )
        except Exception as e:
            self.log_test_result(
                "JSON Output Generation", 
                False, 
                f"Failed to read JSON output: {str(e)}"
            )
    
    def test_json_structure_validation(self):
        """Test 3: Validate JSON output structure"""
        if not self.json_output:
            self.log_test_result(
                "JSON Structure Validation", 
                False, 
                "No JSON output available for validation"
            )
            return
        
        try:
            required_fields = ['timestamp', 'top_etfs']
            missing_fields = []
            
            for field in required_fields:
                if field not in self.json_output:
                    missing_fields.append(field)
            
            if missing_fields:
                self.log_test_result(
                    "JSON Structure Validation", 
                    False, 
                    f"Missing required fields: {missing_fields}"
                )
            else:
                self.log_test_result(
                    "JSON Structure Validation", 
                    True, 
                    "JSON structure contains all required fields"
                )
        except Exception as e:
            self.log_test_result(
                "JSON Structure Validation", 
                False, 
                f"Failed to validate JSON structure: {str(e)}"
            )
    
    def test_etf_data_completeness(self):
        """Test 4: Validate ETF data completeness"""
        if not self.json_output or 'top_etfs' not in self.json_output:
            self.log_test_result(
                "ETF Data Completeness", 
                False, 
                "No ETF data available for validation"
            )
            return
        
        try:
            etfs = self.json_output['top_etfs']
            
            if len(etfs) != 3:
                self.log_test_result(
                    "ETF Data Completeness", 
                    False, 
                    f"Expected 3 ETFs, found {len(etfs)}"
                )
                return
            
            required_etf_fields = [
                'rank', 'fund_name', 'symbol', 'nav', 
                'nav_change', 'ytd_return', 'net_assets', 
                'expense_ratio', 'url'
            ]
            
            all_complete = True
            incomplete_etfs = []
            
            for i, etf in enumerate(etfs):
                missing_fields = []
                for field in required_etf_fields:
                    if field not in etf or not etf[field] or etf[field] == "N/A":
                        missing_fields.append(field)
                
                if missing_fields:
                    all_complete = False
                    incomplete_etfs.append({
                        'rank': etf.get('rank', i+1),
                        'symbol': etf.get('symbol', 'Unknown'),
                        'missing_fields': missing_fields
                    })
            
            if all_complete:
                self.log_test_result(
                    "ETF Data Completeness", 
                    True, 
                    "All 3 ETFs have complete data"
                )
            else:
                self.log_test_result(
                    "ETF Data Completeness", 
                    False, 
                    f"Some ETFs have incomplete data",
                    {"incomplete_etfs": incomplete_etfs}
                )
        except Exception as e:
            self.log_test_result(
                "ETF Data Completeness", 
                False, 
                f"Failed to validate ETF data completeness: {str(e)}"
            )
    
    def test_nav_data_format(self):
        """Test 5: Validate NAV data format"""
        if not self.json_output or 'top_etfs' not in self.json_output:
            self.log_test_result(
                "NAV Data Format", 
                False, 
                "No ETF data available for NAV validation"
            )
            return
        
        try:
            etfs = self.json_output['top_etfs']
            nav_format_issues = []
            
            for etf in etfs:
                symbol = etf.get('symbol', 'Unknown')
                nav = etf.get('nav', '')
                nav_change = etf.get('nav_change', '')
                
                if nav and nav != "N/A":
                    if not re.search(r'\$\d+\.\d{2}', nav):
                        nav_format_issues.append(f"{symbol}: Invalid NAV format '{nav}'")
                
                if nav_change and nav_change != "N/A":
                    if not re.search(r'[-+]?\d+\.\d+.*%', nav_change):
                        nav_format_issues.append(f"{symbol}: Invalid NAV change format '{nav_change}'")
            
            if not nav_format_issues:
                self.log_test_result(
                    "NAV Data Format", 
                    True, 
                    "All NAV data formats are valid"
                )
            else:
                self.log_test_result(
                    "NAV Data Format", 
                    False, 
                    f"Found {len(nav_format_issues)} NAV format issues",
                    {"issues": nav_format_issues}
                )
        except Exception as e:
            self.log_test_result(
                "NAV Data Format", 
                False, 
                f"Failed to validate NAV data format: {str(e)}"
            )
    
    def test_expected_etf_symbols(self):
        """Test 6: Validate expected top ETF symbols are present"""
        if not self.json_output or 'top_etfs' not in self.json_output:
            self.log_test_result(
                "Expected ETF Symbols", 
                False, 
                "No ETF data available for symbol validation"
            )
            return
        
        try:
            etfs = self.json_output['top_etfs']
            extracted_symbols = [etf.get('symbol', '') for etf in etfs]
            
            expected_symbols = ['IVV', 'IEFA', 'AGG']  # Based on historical data
            
            found_expected = []
            for symbol in expected_symbols:
                if symbol in extracted_symbols:
                    found_expected.append(symbol)
            
            if len(found_expected) >= 2:  # Allow some flexibility
                self.log_test_result(
                    "Expected ETF Symbols", 
                    True, 
                    f"Found {len(found_expected)}/3 expected top ETFs: {found_expected}",
                    {"extracted_symbols": extracted_symbols}
                )
            else:
                self.log_test_result(
                    "Expected ETF Symbols", 
                    False, 
                    f"Only found {len(found_expected)}/3 expected ETFs",
                    {"expected": expected_symbols, "extracted": extracted_symbols}
                )
        except Exception as e:
            self.log_test_result(
                "Expected ETF Symbols", 
                False, 
                f"Failed to validate ETF symbols: {str(e)}"
            )
    
    def test_url_accessibility(self):
        """Test 7: Validate ETF URLs are accessible"""
        if not self.json_output or 'top_etfs' not in self.json_output:
            self.log_test_result(
                "URL Accessibility", 
                False, 
                "No ETF data available for URL validation"
            )
            return
        
        try:
            etfs = self.json_output['top_etfs']
            url_issues = []
            
            for etf in etfs:
                symbol = etf.get('symbol', 'Unknown')
                url = etf.get('url', '')
                
                if not url or url == "N/A":
                    url_issues.append(f"{symbol}: Missing URL")
                elif not url.startswith('https://www.ishares.com'):
                    url_issues.append(f"{symbol}: Invalid URL format '{url}'")
            
            if not url_issues:
                self.log_test_result(
                    "URL Accessibility", 
                    True, 
                    "All ETF URLs are properly formatted"
                )
            else:
                self.log_test_result(
                    "URL Accessibility", 
                    False, 
                    f"Found {len(url_issues)} URL issues",
                    {"issues": url_issues}
                )
        except Exception as e:
            self.log_test_result(
                "URL Accessibility", 
                False, 
                f"Failed to validate URLs: {str(e)}"
            )
    
    def run_all_tests(self):
        """Run all integration tests"""
        print("🔧 Starting ETF Scraper Integration Tests")
        print("=" * 60)
        
        self.test_scraper_execution()
        self.test_json_output_generation()
        self.test_json_structure_validation()
        self.test_etf_data_completeness()
        self.test_nav_data_format()
        self.test_expected_etf_symbols()
        self.test_url_accessibility()
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['passed'])
        failed_tests = total_tests - passed_tests
        
        print("\n" + "=" * 60)
        print(f"📊 Integration Test Summary: {passed_tests}/{total_tests} tests passed")
        
        if failed_tests > 0:
            print(f"❌ {failed_tests} tests failed")
            print("\nFailed Tests:")
            for result in self.test_results:
                if not result['passed']:
                    print(f"  - {result['test_name']}: {result['message']}")
        else:
            print("✅ All integration tests passed!")
        
        with open('scraper_integration_results.json', 'w') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'summary': {
                    'total_tests': total_tests,
                    'passed_tests': passed_tests,
                    'failed_tests': failed_tests,
                    'success_rate': f"{(passed_tests/total_tests)*100:.1f}%"
                },
                'scraper_output': self.scraper_output,
                'test_results': self.test_results
            }, f, indent=2)
        
        print(f"\n📄 Detailed results saved to 'scraper_integration_results.json'")
        
        return 0 if failed_tests == 0 else 1

def main():
    """Main function to run integration tests"""
    tester = ScraperIntegrationTester()
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
