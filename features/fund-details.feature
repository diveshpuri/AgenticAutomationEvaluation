Feature: Fund Details Page Functionality
  As an investor
  I want to view detailed information about specific funds
  So that I can make informed investment decisions

  Background:
    Given I am on the iShares fund screener page

  @smoke
  Scenario: Navigate to fund details page
    When I click on the first fund name in the results
    Then I should be taken to the fund details page
    And I should see the fund name and ticker prominently displayed

  @smoke
  Scenario: View fund overview information
    Given I am on a fund details page
    When I view the overview tab
    Then I should see the fund's NAV
    And I should see the expense ratio
    And I should see the fund's inception date

  Scenario: Navigate between fund detail tabs
    Given I am on a fund details page
    When I click on the "Performance" tab
    Then I should see performance charts and data
    When I click on the "Holdings" tab
    Then I should see the fund's top holdings
    When I click on the "Literature" tab
    Then I should see available documents

  Scenario: Download fund fact sheet
    Given I am on a fund details page
    When I click on the "Fact Sheet" link
    Then a PDF fact sheet should be downloaded
    And the file should contain fund information

  Scenario: Download fund prospectus
    Given I am on a fund details page
    When I click on the "Prospectus" link
    Then a PDF prospectus should be downloaded
    And the file should contain legal fund information

  Scenario: View fund performance data
    Given I am on a fund details page
    When I click on the "Performance" tab
    Then I should see YTD performance data
    And I should see 1-year performance data
    And I should see 3-year performance data
    And I should see performance charts

  Scenario: View fund holdings information
    Given I am on a fund details page
    When I click on the "Holdings" tab
    Then I should see the top 10 holdings
    And I should see holding percentages
    And I should see sector allocation

  Scenario: Fund details data accuracy
    Given I am on a fund details page for "IVV"
    Then the fund name should contain "S&P 500"
    And the ticker should be "IVV"
    And the expense ratio should be displayed
    And the NAV should be a valid price

  Scenario: Navigate back to screener
    Given I am on a fund details page
    When I click the back button
    Then I should return to the fund screener
    And my previous search/filter state should be maintained

  @responsive
  Scenario: Fund details on mobile
    Given I am using a mobile device
    When I view a fund details page
    Then the layout should be mobile-optimized
    And all tabs should be accessible on mobile

  Scenario: Fund details page loading performance
    When I navigate to a fund details page
    Then the page should load within 5 seconds
    And all fund data should be displayed correctly
