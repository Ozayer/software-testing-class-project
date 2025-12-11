import isEmpty from '../src/isEmpty.js';

describe('isEmpty - Pre-planned Test Suite (Phase 1)', () => {
  // Normal Cases
  test('Test 1: null should return true', () => {
    expect(isEmpty(null)).toBe(true);
  });

  test('Test 2: empty string should return true', () => {
    expect(isEmpty('')).toBe(true);
  });

  test('Test 3: empty array should return true', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('Test 4: undefined should return true', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test('Test 5: empty object should return true', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('Test 6: non-empty string should return false', () => {
    expect(isEmpty('any string')).toBe(false);
  });

  test('Test 7: non-empty array should return false', () => {
    expect(isEmpty([1, 'Hello'])).toBe(false);
  });

  // Edge and Error Cases
  test('Test 8: false should return true', () => {
    expect(isEmpty(false)).toBe(true);
  });

  test('Test 9: 0 should return true', () => {
    expect(isEmpty(0)).toBe(true);
  });

  test('Test 10: whitespace string should return false', () => {
    expect(isEmpty('  ')).toBe(false);
  });

  test('Test 11: empty function should return true', () => {
    expect(isEmpty(function () {})).toBe(true);
  });
});
