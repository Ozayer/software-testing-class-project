import get from '../src/get.js';

describe('get - Pre-planned Test Suite (Phase 1)', () => {
  // Normal Cases
  test('Test 12: nested object with string path should return value', () => {
    expect(get({a: {b: 2}}, 'a.b')).toBe(2);
  });

  test('Test 13: simple property access should return value', () => {
    expect(get({a: 1}, 'a')).toBe(1);
  });

  test('Test 14: nested object with array path should return value', () => {
    expect(get({a: {b: 2}}, ['a', 'b'])).toBe(2);
  });

  test('Test 15: missing property with default value should return default', () => {
    expect(get({}, 'missing', 'default value')).toBe('default value');
  });

  // Edge and Error Cases
  test('Test 16: null object should return undefined', () => {
    expect(get(null, 'a')).toBe(undefined);
  });

  test('Test 17: null path should return undefined', () => {
    expect(get({a: 1}, null)).toBe(undefined);
  });

  test('Test 18: empty string path should return undefined', () => {
    expect(get({a: 1}, '')).toBe(undefined);
  });
});
