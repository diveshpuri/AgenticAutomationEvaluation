Feature: ETF Comparison Tools
  As an investor
  I want to use ETF comparison tools
  So that I can compare different funds and make informed investment decisions

  Background:
    Given I am on the tools page
    And I have selected "Individual Investors" tab

  Scenario: Navigate to Compare ETFs tool
    When I click on the "Compare iShares ETFs" tool
    Then I should be redirected to the ETF comparison page
    And I should see fund comparison interface
    And I should see options to add funds for comparison

  Scenario: Compare ETFs tool functionality
    When I click on the "Compare iShares ETFs" tool
    And I add "IVV" to the comparison
    And I add "VOO" to the comparison
    Then I should see side-by-side comparison of the selected ETFs
    And I should see key metrics like expense ratio, assets, and performance
    And I should be able to remove funds from comparison

  Scenario: Navigate to Morningstar Multi Fund Comparison tool
    When I click on the "Morningstar Multi Fund Comparison Tool" tool
    Then I should be redirected to the Morningstar comparison page
    And I should see advanced comparison features
    And I should see options to compare iShares ETFs with external funds

  Scenario: Morningstar comparison tool functionality
    When I click on the "Morningstar Multi Fund Comparison Tool" tool
    And I search for funds to compare
    Then I should see detailed fund analysis
    And I should see performance charts and metrics
    And I should see risk analysis and ratings

  Scenario: Comparison tools handle multiple funds
    When I click on the "Compare iShares ETFs" tool
    And I add multiple ETFs to the comparison
    Then I should see all selected funds in the comparison table
    And I should be able to sort by different metrics
    And I should be able to filter comparison results

  Scenario: Comparison tools error handling
    When I click on the "Compare iShares ETFs" tool
    And I search for a non-existent fund ticker
    Then I should see an appropriate error message
    And I should be able to try again with a valid ticker
    And the comparison tool should remain functional

  Scenario: Export comparison results
    When I click on the "Compare iShares ETFs" tool
    And I add funds to the comparison
    And I click on export or download options
    Then I should be able to download the comparison data
    And the exported file should contain the comparison metrics
    And the export should be in a readable format
