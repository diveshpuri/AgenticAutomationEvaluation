Feature: Fund Filtering Functionality
  As an investor
  I want to filter funds by various criteria
  So that I can narrow down my investment options

  Background:
    Given I am on the iShares fund screener page

  @smoke
  Scenario: Filter funds by asset class
    When I apply the "Equity" asset class filter
    Then I should see only equity funds in the results
    And the filter should be visually indicated as active

  @smoke
  Scenario: Filter funds by markets and regions
    When I apply the "United States" markets and regions filter
    Then I should see only US-focused funds in the results
    And the geographic filter should be applied correctly

  Scenario: Filter funds by product range
    When I apply the "Core" product range filter
    Then I should see only core funds in the results
    And the product range filter should be active

  Scenario: Apply multiple filters simultaneously
    When I apply the "Fixed Income" asset class filter
    And I apply the "United States" markets and regions filter
    Then I should see only US fixed income funds
    And both filters should be active simultaneously

  Scenario: Reset all filters
    Given I have applied multiple filters
    When I click the "Reset All" button
    Then all filters should be cleared
    And I should see all available funds

  Scenario: Filter combination with search
    Given I have searched for "bond"
    When I apply the "Fixed Income" asset class filter
    Then I should see bond funds that are also fixed income
    And both search and filter should be active

  Scenario: Filter with no matching results
    When I apply the "Alternatives" asset class filter
    And I apply the "Emerging Markets" markets and regions filter
    And I search for "technology"
    Then I should see a "No results" message
    And the filters should remain active

  Scenario: Filter dropdown functionality
    When I click on the "Asset Class" filter dropdown
    Then I should see all available asset class options
    And I should be able to select any option

  Scenario: Filter state persistence
    When I apply the "International Developed" markets filter
    And I navigate to a fund details page
    And I return to the screener
    Then the "International Developed" filter should still be active
    And the filtered results should be maintained

  @accessibility
  Scenario: Filter accessibility
    When I navigate to the asset class filter using keyboard
    And I press Enter to open the dropdown
    Then I should be able to navigate options using arrow keys
    And I should be able to select an option using Enter

  Scenario: Clear individual filters
    Given I have applied multiple filters
    When I remove the "Asset Class" filter
    Then only the asset class filter should be cleared
    And other filters should remain active

  Scenario: Filter validation
    When I apply conflicting filters
    Then the system should handle the conflict gracefully
    And provide appropriate feedback to the user
