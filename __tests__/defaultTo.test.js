import defaultTo from '../src/defaultTo.js';

describe('defaultTo - Optional Fields Handling', () => {
  // Normal Cases - Null and undefined
  test('should return default for null', () => {
    expect(defaultTo(null, 'default')).toBe('default');
  });

  test('should return default for undefined', () => {
    expect(defaultTo(undefined, 'default')).toBe('default');
  });

  test('should NOT return default for NaN (only checks null/undefined)', () => {
    // NOTE: Function only checks null/undefined, not NaN
    const result = defaultTo(NaN, 10);
    expect(Number.isNaN(result)).toBe(true);
  });

  // Normal Cases - Valid values
  test('should return value when not null/undefined/NaN', () => {
    expect(defaultTo('value', 'default')).toBe('value');
  });

  test('should return number value', () => {
    expect(defaultTo(42, 0)).toBe(42);
  });

  test('should return string value', () => {
    expect(defaultTo('hello', 'default')).toBe('hello');
  });

  test('should return object value', () => {
    const obj = { a: 1 };
    expect(defaultTo(obj, {})).toBe(obj);
  });

  test('should return array value', () => {
    const arr = [1, 2, 3];
    expect(defaultTo(arr, [])).toBe(arr);
  });

  // Edge Cases - Falsy values that should NOT use default
  test('should return false instead of default', () => {
    expect(defaultTo(false, true)).toBe(false);
  });

  test('should return 0 instead of default', () => {
    expect(defaultTo(0, 10)).toBe(0);
  });

  test('should return empty string instead of default', () => {
    expect(defaultTo('', 'default')).toBe('');
  });

  // Edge Cases - Product fields
  test('should handle missing product category', () => {
    const category = defaultTo(null, 'Uncategorized');
    expect(category).toBe('Uncategorized');
  });

  test('should handle optional product description', () => {
    const description = defaultTo(undefined, 'No description available');
    expect(description).toBe('No description available');
  });

  test('should preserve zero price', () => {
    const price = defaultTo(0, 9.99);
    expect(price).toBe(0);
  });

  test('should preserve false availability flag', () => {
    const available = defaultTo(false, true);
    expect(available).toBe(false);
  });

  // Edge Cases - Different default types
  test('should use number as default', () => {
    expect(defaultTo(null, 0)).toBe(0);
  });

  test('should use boolean as default', () => {
    expect(defaultTo(undefined, false)).toBe(false);
  });

  test('should use object as default', () => {
    const defaultObj = { default: true };
    expect(defaultTo(null, defaultObj)).toBe(defaultObj);
  });

  test('should use array as default', () => {
    const defaultArr = [1, 2, 3];
    expect(defaultTo(undefined, defaultArr)).toBe(defaultArr);
  });

  // Edge Cases - Nested usage
  test('should chain defaultTo calls', () => {
    const value = defaultTo(defaultTo(null, undefined), 'final');
    expect(value).toBe('final');
  });

  test('should handle default being null', () => {
    expect(defaultTo(undefined, null)).toBe(null);
  });

  test('should handle default being undefined', () => {
    expect(defaultTo(null, undefined)).toBe(undefined);
  });

  // Boundary Cases - Complex objects
  test('should handle Date objects', () => {
    const date = new Date();
    expect(defaultTo(date, new Date(0))).toBe(date);
  });

  test('should handle RegExp objects', () => {
    const regex = /test/;
    expect(defaultTo(regex, /default/)).toBe(regex);
  });

  test('should handle function values', () => {
    const fn = () => 'test';
    expect(defaultTo(fn, () => 'default')).toBe(fn);
  });

  // E-commerce specific scenarios
  test('should handle optional discount field', () => {
    const discount = defaultTo(undefined, 0);
    expect(discount).toBe(0);
  });

  test('should handle optional tax rate', () => {
    const taxRate = defaultTo(null, 0.1);
    expect(taxRate).toBe(0.1);
  });

  test('should preserve zero discount', () => {
    const discount = defaultTo(0, 10);
    expect(discount).toBe(0);
  });

  test('should handle missing product image', () => {
    const image = defaultTo(null, '/images/placeholder.png');
    expect(image).toBe('/images/placeholder.png');
  });
});
