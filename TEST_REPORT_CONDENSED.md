# Software Testing Assignment - Test Report

## E-Commerce Utility Library Testing

---

**Course:** COMP.SE.200-2025-2026-1 - Software Testing  
**Institution:** Tampere University | **Academic Year:** 2024-2025

**Team Members:**
- Md Ozayer Islam (Student ID: 151960099)
- Sayem Rahman (Student ID: 152132363)

**Repository:** https://github.com/Ozayer/software-testing-class-project  
**Coveralls:** https://coveralls.io/github/Ozayer/software-testing-class-project

**Date:** December 2024

---

## Table of Contents

1. Definitions, Acronyms and Abbreviations
2. Introduction
3. Implementation of CI-Pipeline and Tests
4. Findings and Conclusions
5. AI and Testing
6. Course Feedback & Learning Reflection
7. References
8. Appendix

---

## 1. Definitions, Acronyms and Abbreviations

| Term | Definition |
|------|-----------|
| **CI/CD** | Continuous Integration/Continuous Deployment |
| **E2E** | End-to-End testing |
| **NaN** | Not a Number (JavaScript value) |
| **Test Coverage** | Percentage of code executed during testing |
| **Quality Gate** | Minimum quality criteria that must be met |
| **Utility Library** | JavaScript functions for data processing and manipulation |
| **Predicate Function** | Function returning boolean values for filtering/validation |

---

## 2. Introduction

### Purpose

This test report documents comprehensive unit testing of a utility library for an e-commerce application selling food products from small vendors. The report covers:
- CI/CD pipeline implementation and test execution (302 unit tests)
- Test coverage metrics (98.55% line, 94.95% branch)
- Bugs discovered and their business impact
- Comparison of self-designed vs AI-generated tests

### Scope

We tested 10 critical utility functions:
- **Validation:** isEmpty
- **Data Access:** get
- **Filtering:** filter, map, reduce
- **Calculations:** add, clamp
- **Conversion:** toNumber, capitalize
- **Defaults:** defaultTo

### Context

The e-commerce platform requires a robust utility library for form validation, price calculations, filtering products, and data transformations. Our testing validates the library's suitability for production deployment.

---

## 3. Implementation of CI-Pipeline and Tests

### 3.1 Testing Environment

**Local Environment:**
- Node.js 18
- Jest testing framework
- C8 code coverage tool
- npm package manager

**CI/CD Pipeline:**
- GitHub Actions workflow (triggers on push/PR)
- Automated test execution
- Coverage reporting to Coveralls
- GitHub GITHUB_TOKEN (no exposed secrets)

### 3.2 Test Implementation Strategy

| Phase | Activity | Time | Output |
|-------|----------|------|--------|
| Pre-planned (isEmpty, get) | Manual test case design | 2h | 18 tests |
| AI-generated (isEmpty, get) | Microsoft Copilot test generation | 0.5h | 105 tests |
| Remaining 8 functions | Manual test implementation | 4h | 224 tests |
| **Total** | | **6.5h** | **302 tests** |

### 3.3 GitHub Actions Workflow

**Configuration:** `.github/workflows/test.yml`
- Triggers: push & pull requests to main/master
- Node.js 18 environment
- Automatic Coveralls upload with GITHUB_TOKEN
- No manual secret management required

### 3.4 Running Tests Locally

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Generate coverage report
npm run test:coverage

# View coverage
open coverage/lcov-report/index.html
```

**Results:** All 302 tests pass with 98.55% line coverage

### 3.5 Self-Designed vs AI-Generated Test Comparison

| Aspect | Self-Designed | AI-Generated |
|--------|---------------|--------------|
| **Functions** | isEmpty, get | isEmpty, get |
| **Total Tests** | 18 | 105 |
| **Time Required** | 2 hours | 30 minutes |
| **Edge Cases** | Limited (e-commerce focused) | Extensive (technical) |
| **Bugs Found** | 4 bugs | 0 bugs |
| **Business Relevance** | High | Medium |
| **Test Count per Function** | 2-3 categories | 8-10 categories |

#### Key Findings

**Self-Designed Strengths:**
- ✅ Business-scenario focused (e.g., cart calculations, form validation)
- ✅ Clear intent and maintainability
- ✅ Directly revealed 4 bugs

**AI-Generated Strengths:**
- ✅ Comprehensive edge cases (TypedArrays, Buffers, prototype chain)
- ✅ 5.8x faster test generation
- ✅ Discovered JavaScript features we weren't aware of
- ⚠️ Some tests not relevant to e-commerce use

**Recommendation:** Hybrid approach optimal—use AI for technical baseline, add business-specific tests manually.

---

## 4. Findings and Conclusions

### 4.1 Bugs Discovered

We identified **4 significant bugs** that prevent production deployment:

| Bug | Function | Severity | Impact |
|-----|----------|----------|--------|
| BUG-001 | clamp() | 🔴 CRITICAL | Always returns lower bound; breaks quantity/price validation |
| BUG-002 | add() | 🟠 HIGH | String concatenation; wrong cart totals ($10+$5=$105) |
| BUG-003 | filter() | 🟠 HIGH | Returns [[]] instead of []; incorrect "no results" |
| BUG-004 | defaultTo() | 🟡 MEDIUM | Doesn't handle NaN; invalid values propagate |

#### Business Impact Assessment

**BUG-001 (clamp):** User orders 5 items → System forces to 1 item. **BLOCKER.**

**BUG-002 (add):** Price calculations fundamentally broken. Customers charged incorrectly. **BLOCKER.**

**BUG-003 (filter):** Displays "1 product found" when there are none. UX degradation.

**BUG-004 (defaultTo):** NaN values not sanitized. Data quality issue.

*Detailed bug reports with code examples available in `BUG_REPORT.md`*

### 4.2 Test Coverage

| Metric | Achieved | Required | Status |
|--------|----------|----------|--------|
| Line Coverage | 98.55% | ≥80% | ✅ PASS |
| Branch Coverage | 94.95% | ≥75% | ✅ PASS |
| Tests Passing | 302/302 | 100% | ✅ PASS |
| Test Execution Time | 0.6s | <30s | ✅ PASS |

**Coverage by Function:**
- isEmpty: 97.1% | get: 100% | filter: 100% | add: 100% | toNumber: 96.92%
- reduce: 100% | map: 100% | defaultTo: 100% | clamp: 100% | capitalize: 100%

### 4.3 Quality Assessment

#### Is the Library Production-Ready?

**Answer: NO** ❌

**Reasons:**
1. Critical bug in clamp() (completely non-functional)
2. High-priority bugs in add() and filter() (financial/UX impact)
3. Medium bug in defaultTo() (data quality)
4. No integration or E2E testing performed
5. No security testing conducted

#### Quality Gate Results

| Criteria | Status |
|----------|--------|
| Coverage ≥80% | ✅ PASS (98.55%) |
| Coverage ≥75% branch | ✅ PASS (94.95%) |
| All unit tests pass | ✅ PASS (302/302) |
| No critical bugs | ❌ FAIL (1 critical) |
| CI/CD functional | ✅ PASS |

**Overall: CONDITIONAL PASS** — Excellent test coverage and CI/CD, but critical bugs prevent production use.

#### Required Actions Before Deployment

1. 🔴 **Fix clamp() function** (blocking)
2. 🟠 **Fix add() function** (blocking for transactions)
3. 🟠 **Fix filter() function** (UX impact)
4. 🟡 **Fix defaultTo() function** (data quality)
5. Implement integration tests
6. Conduct security audit
7. Perform load testing

**Estimated Time to Production:** 2-3 weeks after bug fixes

---

## 5. AI and Testing

### 5.1 Planned vs Actual AI Usage

**Phase 1 Plan:** Use AI for test case generation, edge case discovery, and test data creation.

**Phase 2 Execution:** ✅ We used AI as planned
- Generated 105 comprehensive tests for isEmpty and get
- Discovered edge cases we hadn't considered (TypedArrays, Buffers, prototype chain)
- Achieved 5.8x productivity gain (105 tests in 30 min vs 18 tests in 2 hours)

**Did NOT use AI for:** Test data generation, bug pattern recognition, or report writing (per requirements)

### 5.2 Unexpected Findings

**AI Test Quality Issues:**
- One test had subtle logic error requiring manual fix (deep nesting scenario)
- ~20% of AI tests not relevant to e-commerce context
- AI tests are harder to modify than hand-written tests

**Surprising Discovery:**
- Self-designed tests (18) found 4 bugs
- AI-generated tests (105) found 0 bugs
- **Lesson:** Business-focused tests more effective at finding real issues

### 5.3 Advantages Confirmed vs New Insights

| Advantage | Status | Notes |
|-----------|--------|-------|
| Fast test generation | ✅ Confirmed | 5.8x faster |
| Comprehensive edge cases | ✅ Confirmed | Taught us about JavaScript features |
| Reduced workload | ✅ Confirmed | Significant time savings |
| Context understanding | ⚠️ Limitation | Generated irrelevant scenarios |
| Over-reliance risk | ⚠️ Manageable | Requires careful review (~30 min per 100 tests) |

### 5.4 Optimal Strategy

**Best Practice:** Hybrid approach
1. Use AI for technical baseline coverage (30 min)
2. Review and filter AI tests (30 min)
3. Add business-specific tests manually (1 hour)
4. **Total time:** 2 hours for ~120 comprehensive tests

**Conclusion:** AI is a valuable tool but not a replacement for domain expertise. Use AI for breadth, humans for depth and business relevance.

---

## 6. Course Feedback & Learning Reflection

### 6.1 Assignment Difficulty

This assignment was **well-balanced but time-intensive**:
- ✅ Learning progression clear (plan → implement → analyze)
- ✅ Good mix of technical and analytical skills
- ⚠️ Phase 1 (planning) underestimated the actual implementation complexity
- ⚠️ Balancing pre-planned tests with AI-generated tests required careful filtering

**Time Estimate Accuracy:**
- Phase 1 (planning): 3 hours ✅
- Phase 2 (testing): Estimated 4 hours, actual 6.5 hours (documentation & bug analysis took longer)
- Phase 3 (reporting): Estimated 2 hours, actual 3 hours

**What Was Harder Than Expected:**
- Bug analysis and documentation (determining business impact)
- Distinguishing between AI-relevant and business-relevant test cases
- Setting up GitHub Actions securely without exposing secrets

**What Was Easier Than Expected:**
- Local testing setup (pytest-like framework was familiar)
- CI/CD integration (GitHub Actions documentation was clear)
- Test writing itself (repetitive once the pattern was established)

### 6.2 Learning Outcomes

**Technical Skills Gained:**
1. **Testing frameworks:** Hands-on Jest experience with ES6 modules
2. **CI/CD pipelines:** Practical GitHub Actions workflow implementation
3. **Coverage analysis:** Understanding line vs branch coverage limitations
4. **Security:** Learning to use GITHUB_TOKEN instead of exposed secrets
5. **JavaScript depth:** Discovered TypedArrays, Buffers, prototype chains through AI-generated tests

**Process Skills Developed:**
1. **Quality gates:** Defined clear passing criteria before testing
2. **Bug prioritization:** Learned to assess business impact, not just technical severity
3. **Test design:** Understood that comprehensive test count ≠ quality (self-designed tests found more bugs)
4. **Hybrid workflows:** Recognized value of combining AI and human expertise

**Most Valuable Learning:**
The realization that **tests reveal actual behavior, not just expected behavior**. When clamp() returned the lower bound consistently, our tests documented it accurately—highlighting the need for honest testing, not confirmation testing.

### 6.3 Reflection on Course Structure

**Strengths:**
- Two-phase assignment provided both planning and execution experience
- Real-world CI/CD emphasis (not just local testing)
- AI exploration encouraged thoughtful tool usage
- Bug discovery made testing feel impactful

**Suggestions for Improvement:**
- Provide sample GitHub Actions workflow earlier (we spent time researching)
- Clarify token/secret management guidance upfront
- Include template for bug report severity classification
- Add examples of "false confidence" from high test counts

**Overall Assessment:** This assignment successfully bridges testing theory and practice. The forced contemplation of AI usage is especially valuable as the field evolves.

---

## 7. References

1. Jest Documentation. https://jestjs.io/
2. GitHub Actions. https://github.com/features/actions
3. Coveralls Documentation. https://coveralls.io/
4. Node.js Documentation. https://nodejs.org/docs/
5. JavaScript Standard Library. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/
6. C8 Coverage Tool. https://github.com/bcoe/c8
7. Software Testing Best Practices. IEEE Standards (referenced during Phase 1)

---

## 8. Appendix

### Appendix A: Phase 1 Test Plan

**Location:** `resources/test_plan.pdf`

**Summary:**
- E-commerce scenarios (Customer Purchase, Producer Management, Cart Management)
- Function prioritization (Critical: isEmpty, get; High: filter, add, etc.)
- Pre-planned test cases for isEmpty (11 tests) and get (7 tests)
- Quality gates: ≥80% line coverage, ≥75% branch coverage, all tests passing

### Appendix B: Bug Report Details

**Location:** `BUG_REPORT.md` in repository root

**Complete bug reports include:**
- Detailed code examples for each bug
- Test evidence (failing test cases)
- Root cause analysis
- Business impact assessment per user scenario
- Reproduction steps

### Appendix C: GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

Key features:
- Triggers on push/PR to main, master branches
- Node.js 18 environment
- Runs `npm run test:coverage` automatically
- Uploads LCOV report to Coveralls via GITHUB_TOKEN
- No manual secrets required
- Typical execution time: ~60 seconds

### Appendix D: Jest & Coverage Configuration

**Jest Config** (`jest.config.js`):
- Node.js test environment
- ES6 module support
- Excludes `/node_modules/` and `src/.internal/` from coverage
- Matches test files: `__tests__/**/*.js` and `*.test.js`

**Coverage Tool** (`package.json` scripts):
```json
{
  "test": "npm run jest",
  "test:coverage": "c8 --reporter=lcov --reporter=text npm test",
  "jest": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
}
```

### Appendix E: Test Statistics

**Distribution:**
- isEmpty: 67 tests (11 pre-planned, 56 AI-generated)
- get: 56 tests (7 pre-planned, 49 AI-generated)
- add, filter: 17 tests each
- toNumber: 38 tests
- reduce, map, defaultTo, clamp, capitalize: 22-40 tests each
- **Total: 302 tests**

**Categories:**
- Normal cases: 145 tests (48%)
- Edge cases: 112 tests (37%)
- Boundary cases: 45 tests (15%)

**Execution:** All 302 tests pass in 0.6 seconds

### Appendix F: Live Resources

**GitHub Actions:** https://github.com/Ozayer/software-testing-class-project/actions
- See workflow execution logs
- View all test runs and coverage uploads
- Check integration status

**Coveralls Dashboard:** https://coveralls.io/github/Ozayer/software-testing-class-project
- Current coverage: 98.55% / 94.95%
- Coverage trends
- Detailed per-file breakdowns

---

## Conclusion

This utility library demonstrates excellent test coverage (98.55%) with a robust CI/CD pipeline, but **is not production-ready** due to 4 bugs (1 critical, 2 high, 1 medium). The testing process successfully identified critical issues that would have impacted customers directly. With bug fixes and integration testing, the library could serve production use within 2-3 weeks.

The hybrid approach of combining self-designed and AI-generated tests proved effective, with self-designed tests excelling at business logic validation and AI tests providing comprehensive technical coverage.

---

**Report prepared by:** Md Ozayer Islam & Sayem Rahman  
**Date:** December 12, 2025
