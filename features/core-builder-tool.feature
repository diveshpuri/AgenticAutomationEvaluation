Feature: Core Builder Tool
  As an individual investor
  I want to use the Core Builder tool
  So that I can build a diversified portfolio with iShares Core ETFs

  Background:
    Given I am on the tools page
    And I have selected "Individual Investors" tab

  Scenario: Navigate to Core Builder tool
    When I click on the "Core Builder" tool
    Then I should be redirected to the Core Builder page
    And I should see portfolio building interface
    And I should see "Get started with a diversified portfolio" information

  Scenario: Core Builder tool displays portfolio building options
    When I click on the "Core Builder" tool
    Then I should see portfolio allocation options
    And I should see risk tolerance settings
    And I should see investment timeline options
    And I should see "Core ETFs" recommendations

  Scenario: Core Builder tool provides educational content
    When I click on the "Core Builder" tool
    Then I should see educational content about diversification
    And I should see information about "Core ETFs"
    And I should see guidance on portfolio construction
    And I should see risk and return explanations

  Scenario: Core Builder tool handles user input
    When I click on the "Core Builder" tool
    And I select a risk tolerance level
    And I select an investment timeline
    Then I should see updated portfolio recommendations
    And I should see asset allocation percentages
    And I should see recommended Core ETFs for each allocation

  Scenario: Core Builder tool error handling
    When I click on the "Core Builder" tool
    And the tool fails to load properly
    Then I should see an appropriate error message
    And I should have options to retry or get help
    And the page should not crash or become unresponsive

  Scenario: Core Builder tool accessibility
    When I click on the "Core Builder" tool
    Then the tool should be accessible via keyboard navigation
    And all interactive elements should have proper labels
    And the tool should work with screen readers
    And color contrast should meet accessibility standards
