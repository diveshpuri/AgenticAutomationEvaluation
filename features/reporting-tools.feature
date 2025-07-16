Feature: Reporting Tools
  As an investor or financial professional
  I want to use reporting tools
  So that I can generate customized reports with fund and index data

  Background:
    Given I am on the tools page
    And I have selected "Individual Investors" tab

  Scenario: Navigate to Report Generator Tool
    When I click on the "Report Generator Tool" tool
    Then I should be redirected to the report generator page
    And I should see report customization options
    And I should see fund and index data selection interface

  Scenario: Report Generator Tool customization options
    When I click on the "Report Generator Tool" tool
    Then I should see options to select funds for reporting
    And I should see data field selection options
    And I should see report format options
    And I should see date range selection for data

  Scenario: Generate custom fund report
    When I click on the "Report Generator Tool" tool
    And I select "IVV" fund for reporting
    And I select performance data fields
    And I select a date range for the report
    And I click generate report
    Then I should see a customized report with selected data
    And I should be able to download the report
    And the report should contain accurate fund information

  Scenario: Report Generator Tool multiple funds
    When I click on the "Report Generator Tool" tool
    And I select multiple funds for comparison reporting
    And I select comparative data fields
    Then I should see a multi-fund comparison report
    And I should see side-by-side fund metrics
    And I should be able to export the comparison data

  Scenario: Report Generator Tool data field selection
    When I click on the "Report Generator Tool" tool
    And I select a fund for reporting
    Then I should see options for performance data
    And I should see options for holdings data
    And I should see options for risk metrics
    And I should see options for fund characteristics

  Scenario: Report Generator Tool export formats
    When I click on the "Report Generator Tool" tool
    And I generate a report
    Then I should see export options for PDF format
    And I should see export options for Excel format
    And I should see export options for CSV format
    And I should be able to download in my preferred format

  Scenario: Report Generator Tool error handling
    When I click on the "Report Generator Tool" tool
    And I try to generate a report without selecting any funds
    Then I should see a validation error message
    And I should be guided to select required fields
    And the tool should remain functional for retry

  Scenario: Report Generator Tool historical data
    When I click on the "Report Generator Tool" tool
    And I select a fund for reporting
    And I select a historical date range
    Then I should see historical performance data
    And I should see time-series data in the report
    And I should be able to compare different time periods

  Scenario: Report Generator Tool accessibility
    When I click on the "Report Generator Tool" tool
    Then the report generator should be keyboard accessible
    And all form fields should have proper labels
    And the generated reports should be screen reader friendly
    And the tool should work across different browsers
