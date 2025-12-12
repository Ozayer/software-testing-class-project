import add from '../src/add.js';

describe('add - E-commerce Price Calculations', () => {
  // Normal Cases - Price calculations
  test('should add two positive prices', () => {
    expect(add(10.50, 5.25)).toBe(15.75);
  });

  test('should add multiple small prices', () => {
    expect(add(0.99, 1.99)).toBe(2.98);
  });

  test('should add zero to a price', () => {
    expect(add(10, 0)).toBe(10);
  });

  test('should add two zeros', () => {
    expect(add(0, 0)).toBe(0);
  });

  test('should handle decimal precision', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  // Edge Cases - String numbers (from form inputs)
  test('BUG: String numbers concatenate instead of add', () => {
    expect(add('10', '5')).toBe('105'); // Should be 15
  });

  test('BUG: String and number concatenate', () => {
    expect(add('10.50', 5.50)).toBe('10.505.5'); // Should be 16
  });

  // Edge Cases - Negative values (discounts)
  test('should handle negative values', () => {
    expect(add(100, -10)).toBe(90);
  });

  test('should add two negative values', () => {
    expect(add(-5, -3)).toBe(-8);
  });

  // Edge Cases - Invalid inputs
  test('should handle undefined as 0', () => {
    expect(add(10, undefined)).toBe(10);
  });

  test('should handle null as 0', () => {
    expect(add(10, null)).toBe(10);
  });

  test('should handle NaN inputs', () => {
    const result = add(NaN, 5);
    expect(Number.isNaN(result)).toBe(true);
  });

  test('BUG: Non-numeric strings concatenate', () => {
    const result = add('abc', 5);
    expect(result).toBe('abc5'); // Should return NaN
  });

  // Boundary Cases - Large numbers
  test('should handle large cart totals', () => {
    expect(add(9999.99, 0.01)).toBe(10000);
  });

  test('should handle very small decimals', () => {
    expect(add(0.001, 0.002)).toBeCloseTo(0.003);
  });
});
