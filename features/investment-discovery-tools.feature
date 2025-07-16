Feature: Investment Discovery Tools
  As an investor
  I want to use investment discovery tools
  So that I can find ETFs that match my investment goals and holdings preferences

  Background:
    Given I am on the tools page
    And I have selected "Individual Investors" tab

  Scenario: Navigate to Investment Goals tool
    When I click on the "Explore by goals" tool
    Then I should be redirected to the investment goals page
    And I should see different investment goal categories
    And I should see goal-based fund recommendations

  Scenario: Investment Goals tool displays goal categories
    When I click on the "Explore by goals" tool
    Then I should see investment goals like "Growth", "Income", "Core", and "Thematic"
    And I should be able to select a specific investment goal
    And I should see ETFs recommended for each goal category

  Scenario: Navigate to Discover by Holdings tool
    When I click on the "Discover by holdings" tool
    Then I should be redirected to the holdings discovery page
    And I should see search interface for companies and sectors
    And I should see options to find ETFs with specific exposures

  Scenario: Discover by Holdings tool functionality
    When I click on the "Discover by holdings" tool
    And I search for "Apple" exposure
    Then I should see ETFs that hold Apple stock
    And I should see exposure percentages and fund details
    And I should be able to view fund holdings breakdown

  Scenario: Investment Goals tool goal selection
    When I click on the "Explore by goals" tool
    And I select "Growth" as my investment goal
    Then I should see growth-oriented ETFs
    And I should see performance metrics for growth funds
    And I should see risk characteristics of growth investments

  Scenario: Discover by Holdings sector search
    When I click on the "Discover by holdings" tool
    And I search for "Technology" sector exposure
    Then I should see ETFs with technology sector holdings
    And I should see sector allocation percentages
    And I should be able to compare technology ETFs

  Scenario: Investment discovery tools error handling
    When I click on the "Discover by holdings" tool
    And I search for a non-existent company or sector
    Then I should see an appropriate "no results" message
    And I should be able to try again with a different search term
    And the tool should provide search suggestions

  Scenario: Investment Goals tool educational content
    When I click on the "Explore by goals" tool
    And I select an investment goal category
    Then I should see educational content about that goal
    And I should see risk and return explanations
    And I should see guidance on goal-based investing

  Scenario: Discover by Holdings detailed analysis
    When I click on the "Discover by holdings" tool
    And I search for a specific holding
    And I select an ETF from the results
    Then I should see detailed holdings breakdown
    And I should see top holdings and their weights
    And I should see sector and geographic allocations
