Feature: Fund Search Functionality
  As an investor
  I want to search for funds using different criteria
  So that I can find funds that match my investment needs

  Background:
    Given I am on the iShares fund screener page

  @smoke
  Scenario: Search for funds using keyword search
    When I select "keyword" search type
    And I search for "technology"
    Then I should see search results containing technology-related funds
    And the results should be displayed in a table format

  @smoke
  Scenario: Search for funds using ticker symbol
    When I select "keyword" search type
    And I search for "IVV"
    Then I should see the "iShares Core S&P 500 ETF" fund in the results
    And the fund ticker should be "IVV"

  Scenario: Search for funds using exposure search
    When I select "exposure" search type
    And I search for "Apple"
    Then I should see funds with Apple exposure
    And the results should contain relevant equity funds

  Scenario: Search with no results
    When I select "keyword" search type
    And I search for "nonexistentfund123"
    Then I should see a "No results" message
    And no fund results should be displayed

  Scenario: Search with special characters
    When I select "keyword" search type
    And I search for "!@#$%"
    Then I should see a "No results" message
    And the search should handle special characters gracefully

  Scenario: Clear search results
    Given I have performed a search for "bond"
    When I clear the search field
    And I click the search button
    Then I should see all available funds
    And the search filter should be removed

  Scenario: Search result persistence
    When I search for "equity"
    And I navigate to the second page of results
    And I refresh the page
    Then the search term "equity" should still be active
    And I should still be on the second page of results

  @performance
  Scenario: Search performance with large result set
    When I search for "ETF"
    Then the search results should load within 10 seconds
    And pagination should be available for large result sets

  Scenario: Case insensitive search
    When I search for "TECHNOLOGY"
    Then I should see the same results as searching for "technology"
    And the search should be case insensitive

  Scenario: Partial word search
    When I search for "tech"
    Then I should see funds containing "technology" in their names
    And partial matches should be supported
