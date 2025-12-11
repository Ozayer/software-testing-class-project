import get from '../src/get.js';

describe('get - AI-Generated Test Suite', () => {
  describe('Normal Cases - Simple Property Access', () => {
    test('should return value for simple property', () => {
      expect(get({ a: 1 }, 'a')).toBe(1);
    });

    test('should return value for simple property with array path', () => {
      expect(get({ a: 1 }, ['a'])).toBe(1);
    });

    test('should return string value', () => {
      expect(get({ name: 'John' }, 'name')).toBe('John');
    });

    test('should return boolean value', () => {
      expect(get({ active: true }, 'active')).toBe(true);
    });

    test('should return null value', () => {
      expect(get({ value: null }, 'value')).toBe(null);
    });

    test('should return 0 value', () => {
      expect(get({ count: 0 }, 'count')).toBe(0);
    });

    test('should return empty string value', () => {
      expect(get({ text: '' }, 'text')).toBe('');
    });
  });

  describe('Normal Cases - Nested Objects', () => {
    test('should return nested value with dot notation', () => {
      expect(get({ a: { b: 2 } }, 'a.b')).toBe(2);
    });

    test('should return deeply nested value with dot notation', () => {
      expect(get({ a: { b: { c: { d: 3 } } } }, 'a.b.c.d')).toBe(3);
    });

    test('should return nested value with array path', () => {
      expect(get({ a: { b: 2 } }, ['a', 'b'])).toBe(2);
    });

    test('should return deeply nested value with array path', () => {
      expect(get({ a: { b: { c: { d: 3 } } } }, ['a', 'b', 'c', 'd'])).toBe(3);
    });

    test('should return nested object', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(get(obj, 'a.b')).toEqual({ c: 1 });
    });
  });

  describe('Normal Cases - Array Indices', () => {
    test('should return array element with bracket notation', () => {
      expect(get({ items: [1, 2, 3] }, 'items[0]')).toBe(1);
    });

    test('should return array element with numeric key in array path', () => {
      expect(get({ items: [1, 2, 3] }, ['items', '0'])).toBe(1);
    });

    test('should return nested array element', () => {
      expect(get({ items: [{ id: 1 }, { id: 2 }] }, 'items[0].id')).toBe(1);
    });

    test('should return deeply nested array element', () => {
      expect(get({ a: [[1, 2], [3, 4]] }, 'a[0][1]')).toBe(2);
    });

    test('should return nested array with bracket and dot notation', () => {
      expect(get({ data: [{ items: [10, 20, 30] }] }, 'data[0].items[1]')).toBe(20);
    });
  });

  describe('Normal Cases - Default Values', () => {
    test('should return default value when property missing', () => {
      expect(get({}, 'missing', 'default value')).toBe('default value');
    });

    test('should return default value when nested property missing', () => {
      expect(get({ a: {} }, 'a.b.c', 'fallback')).toBe('fallback');
    });

    test('should return default value as null', () => {
      expect(get({}, 'missing', null)).toBe(null);
    });

    test('should return default value as 0', () => {
      expect(get({}, 'missing', 0)).toBe(0);
    });

    test('should return default value as false', () => {
      expect(get({}, 'missing', false)).toBe(false);
    });

    test('should return default value as empty array', () => {
      expect(get({}, 'missing', [])).toEqual([]);
    });

    test('should return default value as empty object', () => {
      expect(get({}, 'missing', {})).toEqual({});
    });

    test('should not return default when property exists with falsy value', () => {
      expect(get({ value: false }, 'value', true)).toBe(false);
    });

    test('should not return default when property exists with 0', () => {
      expect(get({ value: 0 }, 'value', 10)).toBe(0);
    });

    test('should not return default when property exists with empty string', () => {
      expect(get({ value: '' }, 'value', 'default')).toBe('');
    });
  });

  describe('Edge Cases - Null and Undefined Objects', () => {
    test('should return undefined for null object without default', () => {
      expect(get(null, 'a')).toBe(undefined);
    });

    test('should return undefined for null object with any path', () => {
      expect(get(null, 'a.b.c')).toBe(undefined);
    });

    test('should return default value for null object', () => {
      expect(get(null, 'a', 'default')).toBe('default');
    });

    test('should return undefined for undefined object without default', () => {
      expect(get(undefined, 'a')).toBe(undefined);
    });

    test('should return default value for undefined object', () => {
      expect(get(undefined, 'a', 'default')).toBe('default');
    });
  });

  describe('Edge Cases - Invalid and Empty Paths', () => {
    test('should return undefined for null path without default', () => {
      expect(get({ a: 1 }, null)).toBe(undefined);
    });

    test('should return default value for null path', () => {
      expect(get({ a: 1 }, null, 'default')).toBe('default');
    });

    test('should return undefined for empty string path', () => {
      expect(get({ a: 1 }, '')).toBe(undefined);
    });

    test('should return default value for empty string path', () => {
      expect(get({ a: 1 }, '', 'default')).toBe('default');
    });

    test('should return undefined for empty array path', () => {
      expect(get({ a: 1 }, [])).toBe(undefined);
    });
  });

  describe('Edge Cases - Special Characters in Keys', () => {
    test('should return value for key with spaces', () => {
      expect(get({ 'my key': 'value' }, 'my key')).toBe('value');
    });

    test('should return value for key with special characters', () => {
      expect(get({ 'a-b': 1 }, 'a-b')).toBe(1);
    });

    test('should return value for key with dots (bracket notation)', () => {
      expect(get({ 'a.b': 1 }, ['a.b'])).toBe(1);
    });

    test('should return value for key with numeric string', () => {
      expect(get({ '123': 'numeric key' }, '123')).toBe('numeric key');
    });

    test('should return value for key with symbols', () => {
      expect(get({ 'key@value': 42 }, 'key@value')).toBe(42);
    });
  });

  describe('Edge Cases - Undefined and Null in Path', () => {
    test('should return default when intermediate property is undefined', () => {
      expect(get({ a: undefined }, 'a.b', 'default')).toBe('default');
    });

    test('should return default when intermediate property is null', () => {
      expect(get({ a: null }, 'a.b', 'default')).toBe('default');
    });

    test('should return value when intermediate property is object', () => {
      expect(get({ a: { b: 2 } }, 'a.b')).toBe(2);
    });

    test('should return default when accessing property on primitive', () => {
      expect(get({ a: 123 }, 'a.b', 'default')).toBe('default');
    });
  });

  describe('Edge Cases - Array Out of Bounds', () => {
    test('should return undefined for array index out of bounds', () => {
      expect(get({ items: [1, 2] }, 'items[5]')).toBe(undefined);
    });

    test('should return default for array index out of bounds', () => {
      expect(get({ items: [1, 2] }, 'items[5]', 'default')).toBe('default');
    });

    test('should return undefined for negative array index', () => {
      expect(get({ items: [1, 2, 3] }, 'items[-1]')).toBe(undefined);
    });

    test('should return value for negative array index with array path', () => {
      expect(get({ items: [1, 2, 3] }, ['items', '-1'])).toBe(undefined);
    });
  });

  describe('Edge Cases - Objects and Arrays Mixing', () => {
    test('should return value from array of objects', () => {
      expect(get({ users: [{ id: 1, name: 'John' }] }, 'users[0].name')).toBe('John');
    });

    test('should return value from nested arrays and objects', () => {
      expect(get(
        { data: { results: [{ items: [{ value: 42 }] }] } },
        'data.results[0].items[0].value'
      )).toBe(42);
    });

    test('should return array of objects', () => {
      const users = [{ id: 1 }, { id: 2 }];
      expect(get({ users }, 'users')).toEqual(users);
    });
  });

  describe('Boundary Cases - Very Deep Nesting', () => {
    test('should handle 10-level deep nesting', () => {
      const obj = { a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 'deep' } } } } } } } } } };
      expect(get(obj, 'a.b.c.d.e.f.g.h.i.j')).toBe('deep');
    });

    test('should handle 20-level deep nesting', () => {
      let obj = { value: 'result' };
      const path = [];
      for (let i = 19; i >= 0; i--) {
        path.unshift(`level${i}`);
        obj = { [`level${i}`]: obj };
      }
      expect(get(obj, path)).toEqual({ value: 'result' });
    });

    test('should return default for missing path in deep structure', () => {
      const obj = { a: { b: { c: { d: 1 } } } };
      expect(get(obj, 'a.b.c.d.e.f', 'default')).toBe('default');
    });
  });

  describe('Boundary Cases - Large Arrays and Objects', () => {
    test('should handle large array', () => {
      const items = Array(1000).fill(0).map((_, i) => ({ id: i }));
      expect(get({ items }, 'items[999].id')).toBe(999);
    });

    test('should handle object with many properties', () => {
      const obj = {};
      for (let i = 0; i < 1000; i++) {
        obj[`prop${i}`] = i;
      }
      expect(get({ data: obj }, 'data.prop500')).toBe(500);
    });
  });

  describe('Edge Cases - Prototype Chain', () => {
    test('should return value from own properties', () => {
      const obj = { own: 'value' };
      expect(get(obj, 'own')).toBe('value');
    });

    test('should access properties on prototype', () => {
      const parent = { inherited: 'value' };
      const child = Object.create(parent);
      expect(get(child, 'inherited')).toBe('value');
    });
  });

  describe('Edge Cases - Complex Values', () => {
    test('should return function value', () => {
      const fn = () => 'test';
      expect(get({ fn }, 'fn')).toBe(fn);
    });

    test('should return Date object', () => {
      const date = new Date('2024-01-01');
      expect(get({ date }, 'date')).toBe(date);
    });

    test('should return Map object', () => {
      const map = new Map([['key', 'value']]);
      expect(get({ map }, 'map')).toBe(map);
    });

    test('should return Set object', () => {
      const set = new Set([1, 2, 3]);
      expect(get({ set }, 'set')).toBe(set);
    });

    test('should return RegExp object', () => {
      const regex = /test/i;
      expect(get({ regex }, 'regex')).toBe(regex);
    });
  });
});
