# Local Testing Instructions

## Prerequisites
- Node.js 14+ installed
- npm installed
- Git installed

---

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ozayer/software-testing-class-project.git
cd software-testing-class-project
```

### 2. Install dependencies
```bash
npm install
```

This will install:
- Jest (testing framework)
- C8 (coverage tool)
- Coveralls (coverage reporting)

---

## Running Tests

### Run all tests
```bash
npm test
```

**Expected output:**
```
Test Suites: 12 passed, 12 total
Tests:       302 passed, 302 total
Time:        ~0.6s
```

### Run tests with coverage
```bash
npm run test:coverage
```

**Expected output:**
```
All files                          |   98.55 |    94.95 |   85.71 |   98.55 |
```

### Run specific test file
```bash
npm test __tests__/isEmpty.test.js
```

### Run tests in watch mode (for development)
```bash
npm test -- --watch
```

---

## Coverage Reports

### View coverage in terminal
```bash
npm run test:coverage
```

### View HTML coverage report
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

The HTML report shows:
- Line-by-line coverage
- Branch coverage details
- Uncovered lines highlighted
- Interactive navigation

---

## Test Structure

### Test Files Location
All tests are in `__tests__/` directory:

```
__tests__/
├── isEmpty.test.js          # Pre-planned tests (Phase 1)
├── isEmpty.ai.test.js       # AI-generated tests
├── get.test.js              # Pre-planned tests (Phase 1)
├── get.ai.test.js           # AI-generated tests
├── add.test.js              # E-commerce price calculations
├── filter.test.js           # Product search/filtering
├── toNumber.test.js         # Type conversion
├── reduce.test.js           # Cart totals
├── map.test.js              # Data transformation
├── defaultTo.test.js        # Optional fields
├── clamp.test.js            # Range validation
└── capitalize.test.js       # Text formatting
```

### Test Naming Convention
- `functionName.test.js` - Self-designed tests
- `functionName.ai.test.js` - AI-generated tests

---

## Understanding Test Results

### Test Output Format
```
PASS __tests__/isEmpty.test.js
  isEmpty - Pre-planned Test Suite (Phase 1)
    ✓ Test 1: null should return true (1 ms)
    ✓ Test 2: empty string should return true
    ...
```

### Coverage Metrics
- **Statements:** % of code statements executed
- **Branches:** % of if/else branches tested
- **Functions:** % of functions called
- **Lines:** % of code lines executed

### Quality Gates
- ✅ Line coverage ≥ 80% (achieved: 98.55%)
- ✅ Branch coverage ≥ 75% (achieved: 94.95%)
- ✅ All tests pass (302/302 passing)

---

## Troubleshooting

### Tests fail with "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Coverage report not generated
```bash
# Ensure c8 is installed
npm install --save-dev c8

# Run coverage again
npm run test:coverage
```

### Tests run slowly
```bash
# Run tests in parallel (default)
npm test

# Run specific test file only
npm test __tests__/isEmpty.test.js
```

### "Experimental VM Modules" warning
This is expected and can be ignored. It's due to ES6 module support in Jest.

---

## CI/CD Pipeline

### GitHub Actions
Tests run automatically on:
- Every push to `main` or `feature/add-tests` branches
- Every pull request

### View CI/CD Results
1. Go to: https://github.com/Ozayer/software-testing-class-project/actions
2. Click on latest workflow run
3. View test results and coverage

### Coveralls Integration
Coverage reports are automatically sent to Coveralls:
- View at: https://coveralls.io/github/Ozayer/software-testing-class-project

---

## Test Statistics

| Metric | Value |
|--------|-------|
| Total Test Suites | 12 |
| Total Tests | 302 |
| Passing Tests | 302 (100%) |
| Line Coverage | 98.55% |
| Branch Coverage | 94.95% |
| Function Coverage | 85.71% |
| Test Execution Time | ~0.6s |

---

## Known Issues (Bugs in Library)

Our tests document 4 bugs in the library:

1. **clamp()** - CRITICAL: Always returns lower bound
2. **add()** - HIGH: String concatenation instead of addition
3. **filter()** - HIGH: Returns `[[]]` instead of `[]`
4. **defaultTo()** - MEDIUM: Doesn't handle NaN

See `BUG_REPORT.md` for detailed bug documentation.

---

## Additional Commands

### Clean coverage reports
```bash
rm -rf coverage/
```

### Run tests with verbose output
```bash
npm test -- --verbose
```

### Run tests and update snapshots
```bash
npm test -- --updateSnapshot
```

### Check test coverage for specific file
```bash
npm run test:coverage -- __tests__/isEmpty.test.js
```

---

## Support

For questions or issues:
1. Check this documentation
2. Review test files for examples
3. Check GitHub Actions logs
4. Contact: Md Ozayer Islam or Sayem Rahman

---

**Last Updated:** December 2024  
**Course:** COMP.SE.200-2025-2026-1  
**Institution:** Tampere University
