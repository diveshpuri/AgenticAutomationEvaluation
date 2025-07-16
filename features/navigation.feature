Feature: Website Navigation Functionality
  As a user
  I want to navigate through the iShares website easily
  So that I can access different sections and find information efficiently

  Background:
    Given I am on the iShares homepage

  @smoke
  Scenario: Main navigation menu functionality
    When I view the main navigation menu
    Then I should see "Our Funds" menu item
    And I should see "Investment Strategies" menu item
    And I should see "Market Insights" menu item
    And I should see "Education" menu item
    And I should see "Resources" menu item
    And I should see "About Us" menu item

  @smoke
  Scenario: Navigate to fund screener from homepage
    When I click on "Our Funds" in the main menu
    And I click on "ETF Investments"
    Then I should be taken to the fund screener page
    And I should see the fund filtering interface

  Scenario: Global search functionality
    When I click on the search icon in the header
    And I search for "technology ETF"
    Then I should see search results
    And the results should include relevant funds and content

  Scenario: Logo navigation
    Given I am on any page of the website
    When I click on the iShares logo
    Then I should be taken to the homepage
    And the homepage should load completely

  Scenario: Breadcrumb navigation
    Given I am on a fund details page
    Then I should see breadcrumb navigation
    And I should be able to click on breadcrumb items to navigate back

  Scenario: Footer navigation
    When I scroll to the bottom of any page
    Then I should see footer links
    And I should be able to access important pages from the footer

  @responsive
  Scenario: Mobile navigation menu
    Given I am using a mobile device
    When I view the navigation menu
    Then I should see a hamburger menu icon
    When I click the hamburger menu
    Then the mobile menu should expand
    And all navigation items should be accessible

  Scenario: Navigation state persistence
    Given I am on the fund screener with applied filters
    When I navigate to a fund details page
    And I return to the screener using browser back
    Then my filters should still be applied
    And my previous state should be maintained

  Scenario: Deep linking functionality
    When I access a direct URL to a fund details page
    Then the page should load correctly
    And all fund information should be displayed
    And navigation should work normally

  @accessibility
  Scenario: Keyboard navigation
    When I navigate using only the keyboard
    Then I should be able to access all menu items using Tab
    And I should be able to activate menu items using Enter
    And focus indicators should be clearly visible

  Scenario: Navigation error handling
    When I navigate to a non-existent page
    Then I should see a 404 error page
    And I should have options to return to main sections
    And the navigation menu should still be functional
