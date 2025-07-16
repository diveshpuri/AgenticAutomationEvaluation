Feature: Institutional Tools
  As an institutional investor
  I want to use institutional-specific tools
  So that I can analyze ETF trade costs, liquidity, and access sophisticated analytics

  Background:
    Given I am on the tools page
    And I have selected "Institutional Investors" tab

  Scenario: Navigate to Analytics to Help Simplify Investing tool
    When I click on the "Analytics to Help Simplify Investing" tool
    Then I should be redirected to the institutional analytics page
    And I should see ETF trade cost analysis interface
    And I should see liquidity analysis options

  Scenario: Access institutional tools portal
    When I click on the "ACCESS OUR INSTITUTIONAL TOOLS" link
    Then I should be redirected to the institutional tools portal
    And I should see sophisticated analytics tools
    And I should see institutional-grade research capabilities

  Scenario: ETF trade cost analysis functionality
    When I click on the "Analytics to Help Simplify Investing" tool
    And I select an ETF for trade cost analysis
    Then I should see bid-ask spread analysis
    And I should see market impact cost estimates
    And I should see trading volume analysis
    And I should see optimal execution recommendations

  Scenario: Liquidity analysis for institutional trading
    When I click on the "Analytics to Help Simplify Investing" tool
    And I analyze ETF liquidity metrics
    Then I should see average daily volume data
    And I should see liquidity provider information
    And I should see market depth analysis
    And I should see liquidity risk assessments

  Scenario: Product search for institutional needs
    When I click on the "Analytics to Help Simplify Investing" tool
    And I search for appropriate products for institutional use
    Then I should see institutional-suitable ETFs
    And I should see minimum investment requirements
    And I should see institutional pricing information
    And I should see custody and settlement details

  Scenario: Advanced analytics for large-scale investing
    When I access institutional tools
    Then I should see portfolio construction tools for large assets
    And I should see risk management analytics
    And I should see performance attribution analysis
    And I should see benchmark comparison tools

  Scenario: Institutional tools error handling
    When I click on the "Analytics to Help Simplify Investing" tool
    And I provide invalid trade size or parameters
    Then I should see appropriate error messages
    And I should be guided to correct the input
    And the tool should provide valid parameter ranges

  Scenario: Institutional tools data export
    When I use institutional analytics tools
    And I generate analysis reports
    Then I should be able to export data in institutional formats
    And I should see options for API data access
    And I should see bulk data download capabilities

  Scenario: Institutional tools professional support
    When I access institutional tools
    Then I should see contact information for institutional support
    And I should see dedicated relationship manager details
    And I should see professional services offerings
    And I should see custom solution options
