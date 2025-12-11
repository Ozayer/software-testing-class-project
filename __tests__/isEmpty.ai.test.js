import isEmpty from '../src/isEmpty.js';

describe('isEmpty - AI-Generated Test Suite', () => {
  describe('Normal Cases - Null and Undefined', () => {
    test('should return true for null', () => {
      expect(isEmpty(null)).toBe(true);
    });

    test('should return true for undefined', () => {
      expect(isEmpty(undefined)).toBe(true);
    });
  });

  describe('Normal Cases - Strings', () => {
    test('should return true for empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    test('should return false for non-empty string', () => {
      expect(isEmpty('hello')).toBe(false);
    });

    test('should return false for string with spaces', () => {
      expect(isEmpty('   ')).toBe(false);
    });
  });

  describe('Normal Cases - Arrays', () => {
    test('should return true for empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    test('should return false for array with elements', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    test('should return false for array with single element', () => {
      expect(isEmpty([0])).toBe(false);
    });

    test('should return false for array with null element', () => {
      expect(isEmpty([null])).toBe(false);
    });
  });

  describe('Normal Cases - Objects', () => {
    test('should return true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    test('should return false for object with properties', () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    test('should return false for object with null value', () => {
      expect(isEmpty({ a: null })).toBe(false);
    });

    test('should return false for object with multiple properties', () => {
      expect(isEmpty({ a: 1, b: 2, c: 3 })).toBe(false);
    });
  });

  describe('Edge Cases - Primitive Values', () => {
    test('should return true for number 0', () => {
      expect(isEmpty(0)).toBe(true);
    });

    test('should return true for number 1', () => {
      expect(isEmpty(1)).toBe(true);
    });

    test('should return true for negative number', () => {
      expect(isEmpty(-5)).toBe(true);
    });

    test('should return true for NaN', () => {
      expect(isEmpty(NaN)).toBe(true);
    });

    test('should return true for boolean false', () => {
      expect(isEmpty(false)).toBe(true);
    });

    test('should return true for boolean true', () => {
      expect(isEmpty(true)).toBe(true);
    });
  });

  describe('Edge Cases - Maps', () => {
    test('should return true for empty Map', () => {
      expect(isEmpty(new Map())).toBe(true);
    });

    test('should return false for Map with entries', () => {
      const map = new Map();
      map.set('key', 'value');
      expect(isEmpty(map)).toBe(false);
    });

    test('should return false for Map with multiple entries', () => {
      const map = new Map();
      map.set('a', 1);
      map.set('b', 2);
      expect(isEmpty(map)).toBe(false);
    });
  });

  describe('Edge Cases - Sets', () => {
    test('should return true for empty Set', () => {
      expect(isEmpty(new Set())).toBe(true);
    });

    test('should return false for Set with values', () => {
      const set = new Set([1, 2, 3]);
      expect(isEmpty(set)).toBe(false);
    });

    test('should return false for Set with single value', () => {
      const set = new Set(['a']);
      expect(isEmpty(set)).toBe(false);
    });
  });

  describe('Edge Cases - Functions', () => {
    test('should return true for function', () => {
      expect(isEmpty(() => {})).toBe(true);
    });

    test('should return true for named function', () => {
      function myFunc() {}
      expect(isEmpty(myFunc)).toBe(true);
    });
  });

  describe('Edge Cases - Typed Arrays', () => {
    test('should return true for empty Uint8Array', () => {
      expect(isEmpty(new Uint8Array(0))).toBe(true);
    });

    test('should return false for Uint8Array with elements', () => {
      expect(isEmpty(new Uint8Array([1, 2, 3]))).toBe(false);
    });

    test('should return true for empty Int32Array', () => {
      expect(isEmpty(new Int32Array(0))).toBe(true);
    });
  });

  describe('Boundary Cases - Large Collections', () => {
    test('should return false for very long string', () => {
      const longString = 'a'.repeat(10000);
      expect(isEmpty(longString)).toBe(false);
    });

    test('should return false for large array', () => {
      const largeArray = Array(10000).fill(0);
      expect(isEmpty(largeArray)).toBe(false);
    });

    test('should return false for object with many properties', () => {
      const largeObj = {};
      for (let i = 0; i < 1000; i++) {
        largeObj[`key${i}`] = i;
      }
      expect(isEmpty(largeObj)).toBe(false);
    });

    test('should return false for Map with many entries', () => {
      const largeMap = new Map();
      for (let i = 0; i < 1000; i++) {
        largeMap.set(`key${i}`, i);
      }
      expect(isEmpty(largeMap)).toBe(false);
    });
  });

  describe('Edge Cases - Arguments Object', () => {
    test('should return true for empty arguments', () => {
      function testFunc() {
        return isEmpty(arguments);
      }
      expect(testFunc()).toBe(true);
    });

    test('should return false for arguments with values', () => {
      function testFunc() {
        return isEmpty(arguments);
      }
      expect(testFunc(1, 2, 3)).toBe(false);
    });
  });

  describe('Edge Cases - Buffers', () => {
    test('should return true for empty Buffer', () => {
      expect(isEmpty(Buffer.alloc(0))).toBe(true);
    });

    test('should return false for Buffer with data', () => {
      expect(isEmpty(Buffer.from([1, 2, 3]))).toBe(false);
    });
  });

  describe('Edge Cases - Special Objects', () => {
    test('should return true for object with only non-enumerable properties', () => {
      const obj = {};
      Object.defineProperty(obj, 'hidden', { value: 42, enumerable: false });
      expect(isEmpty(obj)).toBe(true);
    });

    test('should return false for object with enumerable property', () => {
      const obj = {};
      Object.defineProperty(obj, 'visible', { value: 42, enumerable: true });
      expect(isEmpty(obj)).toBe(false);
    });
  });
});
