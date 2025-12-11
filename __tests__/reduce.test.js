import reduce from '../src/reduce.js';

describe('reduce - Cart Total Calculations', () => {
  const cartItems = [
    { product: 'Honey', quantity: 2, price: 12.50 },
    { product: 'Bread', quantity: 1, price: 8.99 },
    { product: 'Milk', quantity: 3, price: 3.50 }
  ];

  // Normal Cases - Sum calculations
  test('should calculate total cart price', () => {
    const total = reduce(cartItems, (sum, item) => sum + (item.quantity * item.price), 0);
    expect(total).toBeCloseTo(44.49);
  });

  test('should sum simple array of numbers', () => {
    const result = reduce([1, 2, 3, 4, 5], (sum, n) => sum + n, 0);
    expect(result).toBe(15);
  });

  test('should calculate total quantity', () => {
    const total = reduce(cartItems, (sum, item) => sum + item.quantity, 0);
    expect(total).toBe(6);
  });

  // Normal Cases - Object accumulation
  test('should group items by category', () => {
    const products = [
      { name: 'Honey', category: 'Sweeteners' },
      { name: 'Bread', category: 'Bakery' },
      { name: 'Milk', category: 'Dairy' }
    ];
    const result = reduce(products, (acc, item) => {
      acc[item.category] = item.name;
      return acc;
    }, {});
    expect(result).toEqual({
      Sweeteners: 'Honey',
      Bakery: 'Bread',
      Dairy: 'Milk'
    });
  });

  test('should build array from accumulation', () => {
    const result = reduce([1, 2, 3], (acc, n) => {
      acc.push(n * 2);
      return acc;
    }, []);
    expect(result).toEqual([2, 4, 6]);
  });

  // Normal Cases - With initial value
  test('should use initial value', () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n, 10);
    expect(result).toBe(16);
  });

  test('should work without initial value', () => {
    const result = reduce([1, 2, 3, 4], (sum, n) => sum + n);
    expect(result).toBe(10);
  });

  // Edge Cases - Empty array
  test('should return initial value for empty array', () => {
    const result = reduce([], (sum, n) => sum + n, 0);
    expect(result).toBe(0);
  });

  test('should return undefined for empty array without initial value', () => {
    const result = reduce([], (sum, n) => sum + n);
    expect(result).toBe(undefined);
  });

  // Edge Cases - Single element
  test('should handle single element with initial value', () => {
    const result = reduce([5], (sum, n) => sum + n, 10);
    expect(result).toBe(15);
  });

  test('should return single element without initial value', () => {
    const result = reduce([42], (sum, n) => sum + n);
    expect(result).toBe(42);
  });

  // Edge Cases - Null/undefined
  test('should handle null collection', () => {
    const result = reduce(null, (sum, n) => sum + n, 0);
    expect(result).toBe(0);
  });

  test('should handle undefined collection', () => {
    const result = reduce(undefined, (sum, n) => sum + n, 0);
    expect(result).toBe(0);
  });

  // Edge Cases - Object collection
  test('should reduce object values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = reduce(obj, (sum, value) => sum + value, 0);
    expect(result).toBe(6);
  });

  test('should reduce object with keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = reduce(obj, (acc, value, key) => {
      acc[key] = value * 2;
      return acc;
    }, {});
    expect(result).toEqual({ a: 2, b: 4, c: 6 });
  });

  // Edge Cases - Complex accumulation
  test('should find maximum value', () => {
    const result = reduce([3, 7, 2, 9, 1], (max, n) => n > max ? n : max, -Infinity);
    expect(result).toBe(9);
  });

  test('should find minimum value', () => {
    const result = reduce([3, 7, 2, 9, 1], (min, n) => n < min ? n : min, Infinity);
    expect(result).toBe(1);
  });

  // Boundary Cases
  test('should handle large arrays', () => {
    const largeArray = Array(1000).fill(1);
    const result = reduce(largeArray, (sum, n) => sum + n, 0);
    expect(result).toBe(1000);
  });

  test('should handle nested calculations', () => {
    const orders = [
      { items: [{ price: 10 }, { price: 20 }] },
      { items: [{ price: 15 }] }
    ];
    const total = reduce(orders, (sum, order) => {
      return sum + reduce(order.items, (itemSum, item) => itemSum + item.price, 0);
    }, 0);
    expect(total).toBe(45);
  });
});
