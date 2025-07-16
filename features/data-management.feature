Feature: Data Management and Display Functionality
  As an investor
  I want to sort, paginate, and view fund data in different formats
  So that I can analyze funds efficiently

  Background:
    Given I am on the iShares fund screener page

  @smoke
  Scenario: Sort funds by net assets
    When I sort the results by "Total Net Assets"
    Then the funds should be ordered by net assets in descending order
    And the sort indicator should show descending order

  @smoke
  Scenario: Sort funds by expense ratio
    When I sort the results by "Expense Ratio"
    Then the funds should be ordered by expense ratio in ascending order
    And the sort indicator should show ascending order

  Scenario: Sort funds by inception date
    When I sort the results by "Inception Date"
    Then the funds should be ordered by inception date
    And newer funds should appear first by default

  Scenario: Change sort direction
    Given I have sorted by "Total Net Assets" in descending order
    When I click the sort column again
    Then the sort order should change to ascending
    And the sort indicator should update accordingly

  Scenario: Pagination functionality
    Given there are more than 25 fund results
    When I view the results
    Then I should see pagination controls
    And I should see "Next" button if more pages exist

  Scenario: Navigate to next page
    Given I am on page 1 of results
    When I click the "Next" button
    Then I should be taken to page 2
    And the page number should update to 2
    And I should see different funds

  Scenario: Navigate to previous page
    Given I am on page 2 of results
    When I click the "Previous" button
    Then I should be taken to page 1
    And the page number should update to 1

  @smoke
  Scenario: Switch data view to Key Facts
    When I select "Key Facts" data view
    Then I should see fund names, tickers, and key metrics
    And the data view should be highlighted as active

  Scenario: Switch data view to Performance
    When I select "Performance" data view
    Then I should see performance-related columns
    And I should see YTD returns and other performance metrics

  Scenario: Switch data view to Holdings
    When I select "Holdings" data view
    Then I should see holdings-related information
    And I should see top holdings data for each fund

  Scenario: Data view persistence with sorting
    Given I am in "Performance" data view
    When I sort by "YTD Return"
    Then the performance data should be sorted correctly
    And the data view should remain as "Performance"

  Scenario: Results per page consistency
    When I navigate through multiple pages
    Then each page should show the same number of results
    And the pagination should be consistent

  @performance
  Scenario: Large dataset handling
    Given there are hundreds of fund results
    When I navigate through multiple pages
    Then each page should load within 3 seconds
    And the sorting should work efficiently

  Scenario: Data refresh functionality
    Given I am viewing fund results
    When I refresh the page
    Then the data should reload
    And my current sort and view settings should be maintained

  Scenario: Empty state handling
    Given I have applied filters that return no results
    When I view the data management controls
    Then sorting and pagination should be disabled
    And appropriate messaging should be displayed
