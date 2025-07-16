# iShares Regression Testing Framework

## Overview
This PR adds a comprehensive regression testing framework for ishares.com/us with complete test coverage of critical user flows from a human perspective.

## Key Features
- **All 10 scenarios passing** with 49 steps completed successfully
- Gherkin scenarios designed from human user perspective  
- Playwright scripts with CSS selectors optimized for shadowRoot handling
- Robust Page Object Model implementation
- Complete test coverage including keyword search, ticker search, exposure search, filtering, and pagination

## Technical Achievements
- Successfully decoded complex exposure search functionality that looks up fund holdings, sectors, and geography breakdowns
- Implemented URL-based pagination navigation using pageNumber parameters
- Created robust shadowRoot element handling using Playwright's native shadow DOM support
- Added comprehensive error handling and retry mechanisms
- Developed dynamic search type detection for keyword vs exposure searches

## Test Results
- **10 scenarios (10 passed)**
- **49 steps (49 passed)**  
- **Execution time: ~2m22s**

## Test Coverage
✅ **Keyword Search** - Basic fund search functionality  
✅ **Ticker Symbol Search** - Specific fund ticker searches  
✅ **Exposure Search** - Complex holdings/sector/geography search (Apple exposure)  
✅ **No Results Handling** - Graceful error handling  
✅ **Special Character Search** - Robust input validation  
✅ **Clear Search Results** - Filter removal functionality  
✅ **Search Result Persistence** - State management across navigation  
✅ **Search Performance** - Performance testing with large datasets  
✅ **Case Insensitive Search** - Input flexibility  
✅ **Partial Word Search** - Partial term matching  

## Framework Structure
```
ishares-regression-testing/
├── features/                    # Gherkin scenarios
├── step-definitions/           # Cucumber step implementations  
├── page-objects/              # Page Object Model classes
├── utils/                     # Utility functions and configuration
└── debug-scripts/             # Comprehensive debugging methodology
```

## Files Added
- Complete Cucumber.js + Playwright framework
- Gherkin feature files with human-centric scenarios
- Page Object Model classes for maintainable selectors
- Utility functions and configuration files
- Comprehensive documentation and setup instructions

## Execution Commands
```bash
# Install dependencies
npm install

# Run complete fund search regression suite (✅ All passing)
npm run test:search

# Run all regression tests
npm test
```

Link to Devin run: https://app.devin.ai/sessions/73a25efef882458dba45430c67ce4d3d  
Requested by: divesh.puri@gmail.com
