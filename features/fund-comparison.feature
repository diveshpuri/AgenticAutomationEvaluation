Feature: Fund Comparison Functionality
  As an investor
  I want to compare multiple funds side by side
  So that I can make informed investment decisions

  Background:
    Given I am on the iShares fund screener page

  @smoke
  Scenario: Add funds to comparison
    When I select the first fund for comparison
    And I select the second fund for comparison
    Then both funds should be added to the comparison basket
    And the comparison counter should show "2"

  @smoke
  Scenario: View fund comparison
    Given I have added 2 funds to comparison
    When I click the "Compare" button
    Then I should be taken to the comparison page
    And I should see both funds displayed side by side

  Scenario: Remove fund from comparison
    Given I have added 3 funds to comparison
    When I remove the second fund from comparison
    Then the comparison should show 2 funds
    And the removed fund should no longer be visible

  Scenario: Maximum comparison limit
    When I try to add more than 4 funds to comparison
    Then I should see a message about the maximum limit
    And only 4 funds should be in the comparison

  Scenario: Clear all comparisons
    Given I have added multiple funds to comparison
    When I click "Clear All" in the comparison
    Then the comparison basket should be empty
    And the comparison counter should show "0"

  Scenario: Comparison data accuracy
    Given I have 2 funds in comparison
    When I view the comparison page
    Then I should see accurate fund names and tickers
    And I should see expense ratios for both funds
    And I should see net assets for both funds

  Scenario: Export comparison data
    Given I have funds in comparison
    When I click the "Export" button on comparison page
    Then a comparison report should be downloaded
    And the file should contain the compared fund data

  Scenario: Comparison persistence across sessions
    Given I have added funds to comparison
    When I refresh the page
    Then the comparison basket should maintain the selected funds
    And the comparison counter should remain accurate

  Scenario: Compare funds from different pages
    Given I am on page 1 of results
    When I add a fund to comparison
    And I navigate to page 2
    And I add another fund to comparison
    Then both funds should be in the comparison basket
    And I should be able to compare funds from different pages

  @responsive
  Scenario: Comparison on mobile devices
    Given I am using a mobile device
    When I add funds to comparison
    Then the comparison interface should be mobile-friendly
    And I should be able to view comparisons on mobile

  Scenario: Comparison with filtered results
    Given I have applied filters to the fund list
    When I add filtered funds to comparison
    Then the comparison should work with filtered funds
    And the comparison should maintain filter context

  Scenario: Detailed comparison view
    Given I have funds in comparison
    When I view the detailed comparison
    Then I should see performance data for each fund
    And I should see holdings information
    And I should see risk metrics comparison
