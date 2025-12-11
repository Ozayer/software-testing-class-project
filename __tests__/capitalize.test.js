import capitalize from '../src/capitalize.js';

describe('capitalize - Text Formatting', () => {
  // Normal Cases - Basic capitalization
  test('should capitalize first letter of lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('should capitalize first letter and lowercase rest', () => {
    expect(capitalize('HELLO')).toBe('Hello');
  });

  test('should handle already capitalized word', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  test('should handle mixed case', () => {
    expect(capitalize('hELLO')).toBe('Hello');
  });

  // Normal Cases - Product names
  test('should capitalize product name', () => {
    expect(capitalize('organic honey')).toBe('Organic honey');
  });

  test('should format category name', () => {
    expect(capitalize('dairy products')).toBe('Dairy products');
  });

  test('should format vendor name', () => {
    expect(capitalize('local farm')).toBe('Local farm');
  });

  // Edge Cases - Empty and whitespace
  test('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  test('should handle string with leading space', () => {
    expect(capitalize(' hello')).toBe(' hello');
  });

  test('should handle string with only spaces', () => {
    expect(capitalize('   ')).toBe('   ');
  });

  // Edge Cases - Single character
  test('should capitalize single lowercase letter', () => {
    expect(capitalize('a')).toBe('A');
  });

  test('should handle single uppercase letter', () => {
    expect(capitalize('A')).toBe('A');
  });

  test('should handle single non-letter character', () => {
    expect(capitalize('1')).toBe('1');
  });

  // Edge Cases - Numbers and special characters
  test('should handle string starting with number', () => {
    expect(capitalize('123abc')).toBe('123abc');
  });

  test('should handle string starting with special character', () => {
    expect(capitalize('!hello')).toBe('!hello');
  });

  test('should handle string with hyphen', () => {
    expect(capitalize('e-commerce')).toBe('E-commerce');
  });

  // Edge Cases - Multiple words
  test('should only capitalize first word', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  test('should not capitalize subsequent words', () => {
    expect(capitalize('the quick brown fox')).toBe('The quick brown fox');
  });

  // Edge Cases - Unicode and accents
  test('should handle accented characters', () => {
    expect(capitalize('école')).toBe('École');
  });

  test('should handle unicode characters', () => {
    expect(capitalize('über')).toBe('Über');
  });

  // Edge Cases - Very long strings
  test('should handle long product description', () => {
    const long = 'a'.repeat(1000);
    const result = capitalize(long);
    expect(result[0]).toBe('A');
    expect(result.length).toBe(1000);
  });

  // Edge Cases - Null and undefined
  test('should convert null to "Null"', () => {
    expect(capitalize(null)).toBe('Null');
  });

  test('should convert undefined to "Undefined"', () => {
    expect(capitalize(undefined)).toBe('Undefined');
  });

  // Edge Cases - Non-string inputs
  test('should handle number input', () => {
    expect(capitalize(123)).toBe('123');
  });

  test('should handle boolean input', () => {
    expect(capitalize(true)).toBe('True');
  });

  test('should handle object input', () => {
    expect(capitalize({})).toBe('[object object]'); // lowercase 'object'
  });

  // E-commerce specific cases
  test('should format product category', () => {
    expect(capitalize('sweeteners')).toBe('Sweeteners');
  });

  test('should format product status', () => {
    expect(capitalize('in stock')).toBe('In stock');
  });

  test('should format user role', () => {
    expect(capitalize('producer')).toBe('Producer');
  });

  test('should format order status', () => {
    expect(capitalize('pending')).toBe('Pending');
  });

  // Edge Cases - All caps abbreviations
  test('should lowercase all caps except first', () => {
    expect(capitalize('USA')).toBe('Usa');
  });

  test('should handle acronym', () => {
    expect(capitalize('API')).toBe('Api');
  });

  // Edge Cases - Trailing spaces
  test('should handle trailing spaces', () => {
    expect(capitalize('hello   ')).toBe('Hello   ');
  });

  test('should handle both leading and trailing spaces', () => {
    expect(capitalize('  hello  ')).toBe('  hello  ');
  });
});
