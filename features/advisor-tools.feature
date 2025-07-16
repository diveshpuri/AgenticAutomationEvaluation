Feature: Advisor Tools
  As a financial advisor
  I want to use advisor-specific tools
  So that I can help my clients construct tax-efficient portfolios and access advanced tools

  Background:
    Given I am on the tools page
    And I have selected "Financial Advisors" tab

  Scenario: Navigate to tax-efficiency optimization tool
    When I click on the "Optimize for tax-efficiency" tool
    Then I should be redirected to the tax optimization page
    And I should see correlation analysis interface
    And I should see holdings overlap analysis options

  Scenario: Tax-efficiency tool correlation analysis
    When I click on the "Optimize for tax-efficiency" tool
    And I select funds for correlation analysis
    Then I should see correlation coefficients between selected funds
    And I should see recommendations for tax-efficient combinations
    And I should see risk-adjusted correlation metrics

  Scenario: Tax-efficiency tool holdings overlap analysis
    When I click on the "Optimize for tax-efficiency" tool
    And I analyze holdings overlap between funds
    Then I should see percentage overlap in holdings
    And I should see recommendations to reduce overlap
    And I should see diversification improvement suggestions

  Scenario: Navigate to Advisor Center tools
    When I click on the "Advanced Tools at Advisor Center" link
    Then I should be redirected to the Advisor Center
    And I should see BlackRock's suite of sophisticated tools
    And I should see professional-grade analysis tools

  Scenario: Tax-efficiency tool portfolio construction
    When I click on the "Optimize for tax-efficiency" tool
    And I build a tax-efficient portfolio
    Then I should see tax-loss harvesting opportunities
    And I should see asset location recommendations
    And I should see after-tax return projections

  Scenario: Advisor tools client portfolio analysis
    When I click on the "Optimize for tax-efficiency" tool
    And I input client portfolio information
    Then I should see tax efficiency analysis
    And I should see recommendations for improvement
    And I should see potential tax savings calculations

  Scenario: Advisor Center tools access verification
    When I click on the "Advanced Tools at Advisor Center" link
    Then I should see tools for portfolio construction
    And I should see risk analysis capabilities
    And I should see client reporting features
    And I should see market research tools

  Scenario: Tax-efficiency tool error handling
    When I click on the "Optimize for tax-efficiency" tool
    And I provide invalid portfolio data
    Then I should see appropriate error messages
    And I should be guided to correct the input
    And the tool should remain functional for retry

  Scenario: Advisor tools professional features
    When I access advisor-specific tools
    Then I should see advanced analytics not available to individual investors
    And I should see client management features
    And I should see institutional-grade research tools
    And I should see compliance and reporting features
