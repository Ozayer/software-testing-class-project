import toNumber from '../src/toNumber.js';

describe('toNumber - Type Conversion for E-commerce', () => {
  // Normal Cases - String to number
  test('should convert string number to number', () => {
    expect(toNumber('10')).toBe(10);
  });

  test('should convert decimal string to number', () => {
    expect(toNumber('12.50')).toBe(12.50);
  });

  test('should convert negative string to number', () => {
    expect(toNumber('-5')).toBe(-5);
  });

  test('should convert zero string to number', () => {
    expect(toNumber('0')).toBe(0);
  });

  // Normal Cases - Already numbers
  test('should return number as is', () => {
    expect(toNumber(42)).toBe(42);
  });

  test('should return decimal as is', () => {
    expect(toNumber(3.14)).toBe(3.14);
  });

  test('should return zero as is', () => {
    expect(toNumber(0)).toBe(0);
  });

  test('should return negative number as is', () => {
    expect(toNumber(-10)).toBe(-10);
  });

  // Edge Cases - Whitespace
  test('should handle string with leading whitespace', () => {
    expect(toNumber('  10')).toBe(10);
  });

  test('should handle string with trailing whitespace', () => {
    expect(toNumber('10  ')).toBe(10);
  });

  test('should handle string with both leading and trailing whitespace', () => {
    expect(toNumber('  10  ')).toBe(10);
  });

  // Edge Cases - Special values
  test('should handle Infinity', () => {
    expect(toNumber(Infinity)).toBe(Infinity);
  });

  test('should handle -Infinity', () => {
    expect(toNumber(-Infinity)).toBe(-Infinity);
  });

  test('should handle NaN', () => {
    expect(toNumber(NaN)).toBeNaN();
  });

  // Edge Cases - Boolean
  test('should convert true to 1', () => {
    expect(toNumber(true)).toBe(1);
  });

  test('should convert false to 0', () => {
    expect(toNumber(false)).toBe(0);
  });

  // Edge Cases - Null and undefined
  test('should convert null to 0', () => {
    expect(toNumber(null)).toBe(0);
  });

  test('should convert undefined to NaN', () => {
    expect(toNumber(undefined)).toBeNaN();
  });

  // Edge Cases - Empty string
  test('should convert empty string to 0', () => {
    expect(toNumber('')).toBe(0);
  });

  test('should convert whitespace-only string to 0', () => {
    expect(toNumber('   ')).toBe(0);
  });

  // Edge Cases - Invalid strings
  test('should return NaN for non-numeric string', () => {
    expect(toNumber('abc')).toBeNaN();
  });

  test('should return NaN for mixed alphanumeric', () => {
    expect(toNumber('12abc')).toBeNaN();
  });

  // Edge Cases - Objects
  test('should handle object with valueOf', () => {
    const obj = { valueOf: () => 42 };
    expect(toNumber(obj)).toBe(42);
  });

  test('should handle empty object', () => {
    expect(toNumber({})).toBeNaN();
  });

  test('should handle empty array', () => {
    expect(toNumber([])).toBe(0);
  });

  test('should handle array with single number', () => {
    expect(toNumber([42])).toBe(42);
  });

  // Boundary Cases - Very large/small numbers
  test('should handle very large number', () => {
    expect(toNumber('999999999999')).toBe(999999999999);
  });

  test('should handle very small decimal', () => {
    expect(toNumber('0.0001')).toBe(0.0001);
  });

  // Edge Cases - Hexadecimal
  test('should handle hex string', () => {
    expect(toNumber('0x10')).toBe(16);
  });

  // Edge Cases - Binary
  test('should handle binary string', () => {
    expect(toNumber('0b1010')).toBe(10);
  });

  // Edge Cases - Octal
  test('should handle octal string', () => {
    expect(toNumber('0o10')).toBe(8);
  });
});
