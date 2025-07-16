Feature: Download and Export Functionality
  As an investor
  I want to download fund data and documents
  So that I can analyze information offline and keep records

  Background:
    Given I am on the iShares fund screener page

  @smoke
  Scenario: Download fund screener results
    Given I have fund search results displayed
    When I click the "Download" button
    Then a CSV or Excel file should be downloaded
    And the file should contain the displayed fund data

  Scenario: Download filtered results
    Given I have applied filters to the fund results
    When I download the results
    Then the downloaded file should contain only filtered funds
    And the file should reflect the current filter state

  Scenario: Download sorted results
    Given I have sorted the results by expense ratio
    When I download the results
    Then the downloaded file should maintain the sort order
    And the data should be in the same sequence as displayed

  Scenario: Download with specific data view
    Given I am viewing results in "Performance" data view
    When I download the results
    Then the downloaded file should include performance columns
    And the data should match the current view

  @smoke
  Scenario: Download fund fact sheet
    Given I am on a fund details page
    When I click on the "Fact Sheet" download link
    Then a PDF fact sheet should be downloaded
    And the PDF should contain comprehensive fund information

  Scenario: Download fund prospectus
    Given I am on a fund details page
    When I click on the "Prospectus" download link
    Then a PDF prospectus should be downloaded
    And the PDF should contain legal fund documentation

  Scenario: Download fund comparison
    Given I have multiple funds in comparison
    When I export the comparison data
    Then a comparison report should be downloaded
    And the report should include all compared funds' data

  Scenario: Download file naming convention
    When I download fund screener results
    Then the file name should include a timestamp
    And the file name should be descriptive of the content

  Scenario: Download progress indication
    When I initiate a large data download
    Then I should see a download progress indicator
    And I should receive confirmation when download completes

  @error-handling
  Scenario: Handle download failures
    Given a download is initiated
    When the download fails due to network issues
    Then I should see an appropriate error message
    And I should have the option to retry the download

  Scenario: Download file format validation
    When I download fund data
    Then the file should be in a standard format (CSV/Excel)
    And the file should open correctly in appropriate applications

  Scenario: Download data accuracy
    Given I download fund screener results
    When I compare the downloaded data with displayed data
    Then all fund names should match exactly
    And all numerical data should be identical

  @performance
  Scenario: Large dataset download performance
    Given I have a large number of fund results
    When I download the complete dataset
    Then the download should complete within 30 seconds
    And the file should contain all expected records

  Scenario: Multiple simultaneous downloads
    When I initiate multiple downloads simultaneously
    Then each download should complete successfully
    And there should be no conflicts between downloads

  Scenario: Download accessibility
    When I use keyboard navigation to access download options
    Then I should be able to initiate downloads using keyboard only
    And download links should be properly labeled for screen readers
