Feature: Tools Section Navigation
  As an investor using iShares website
  I want to navigate through the tools section
  So that I can access appropriate tools for my investor type

  Background:
    Given I am on the iShares homepage

  Scenario: Navigate to tools section from main menu
    When I click on the "Resources" menu
    And I click on "Tools" in the dropdown
    Then I should be on the tools page
    And I should see "TOOLS FOR INVESTORS" heading
    And I should see tabs for "Individual Investors", "Financial Advisors", and "Institutional Investors"

  Scenario: Switch between investor type tabs
    Given I am on the tools page
    When I click on the "Individual Investors" investor tab
    Then I should see individual investor tools displayed
    And I should see "BUILD A DIVERSIFIED PORTFOLIO" section
    And I should see "DISCOVER & COMPARE iSHARES ETFs" section
    When I click on the "Financial Advisors" investor tab
    Then I should see financial advisor tools displayed
    And I should see "SEEK BETTER OUTCOMES FOR CLIENTS & PROSPECTS" section
    When I click on the "Institutional Investors" investor tab
    Then I should see institutional investor tools displayed

  Scenario: Verify correct tools are displayed for Individual Investors
    Given I am on the tools page
    When I click on the "Individual Investors" investor tab
    Then I should see the following tools:
      | Tool Name                           | Description                                                    |
      | Core Builder                        | Get started with a diversified portfolio                      |
      | View our full list of products      | See all iShares funds or search for a specific fund          |
      | Explore by goals                    | Learn how iShares ETFs can help you pursue your investment goals |
      | Compare iShares ETFs                | Compare ETFs side-by-side and find the right fit             |
      | Discover by holdings                | Find an ETF with exposures to a company or sector            |
      | Report Generator Tool               | Build customized reports with fund and index data            |
      | Morningstar Multi Fund Comparison   | See side-by-side comparison of iShares ETFs                  |

  Scenario: Verify correct tools are displayed for Financial Advisors
    Given I am on the tools page
    When I click on the "Financial Advisors" investor tab
    Then I should see the following advisor tools:
      | Tool Name                    | Description                                                           |
      | Optimize for tax-efficiency  | Find iShares ETFs based on correlation and holdings overlap          |

  Scenario: Verify correct tools are displayed for Institutional Investors
    Given I am on the tools page
    When I click on the "Institutional Investors" investor tab
    Then I should see the following institutional tools:
      | Tool Name                           | Description                                                    |
      | Analytics to Help Simplify Investing | Search for the appropriate product and analyze ETF trade costs |

  Scenario: Tools section responsive behavior
    Given I am on the tools page
    When I resize the browser to mobile view
    Then the tools section should display properly on mobile
    And the investor type tabs should be accessible
    When I resize the browser to desktop view
    Then the tools section should display properly on desktop
