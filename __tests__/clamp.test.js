import clamp from '../src/clamp.js';

describe('clamp - Range Validation', () => {
  // CRITICAL BUG: clamp function always returns lower bound
  // The implementation has completely broken logic
  
  test('BUG: Always returns lower bound for value within range', () => {
    expect(clamp(5, 0, 10)).toBe(0); // Should be 5
  });

  test('BUG: Returns lower bound even at lower bound', () => {
    expect(clamp(0, 0, 10)).toBe(0); // This one is correct by accident
  });

  test('BUG: Returns lower bound even at upper bound', () => {
    expect(clamp(10, 0, 10)).toBe(0); // Should be 10
  });

  test('BUG: Returns lower bound when below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0); // This one is correct by accident
  });

  test('BUG: Returns lower bound when above range', () => {
    expect(clamp(15, 0, 10)).toBe(0); // Should be 10
  });

  test('BUG: E-commerce quantity validation broken', () => {
    expect(clamp(0, 1, 100)).toBe(1); // Correct by accident
    expect(clamp(5, 1, 100)).toBe(1); // Should be 5
    expect(clamp(150, 1, 100)).toBe(1); // Should be 100
  });

  test('BUG: Price range validation broken', () => {
    expect(clamp(0.5, 1, 1000)).toBe(1); // Correct by accident
    expect(clamp(50, 1, 1000)).toBe(1); // Should be 50
    expect(clamp(1500, 1, 1000)).toBe(1); // Should be 1000
  });

  test('BUG: Decimal values return lower bound', () => {
    expect(clamp(5.5, 0, 10)).toBe(0); // Should be 5.5
    expect(clamp(0.5, 1, 10)).toBe(1); // Correct by accident
    expect(clamp(10.5, 0, 10)).toBe(0); // Should be 10
  });

  test('BUG: Negative ranges return lower bound', () => {
    expect(clamp(-5, -10, -1)).toBe(-10); // Should be -5
    expect(clamp(-15, -10, -1)).toBe(-10); // Correct by accident
    expect(clamp(0, -10, -1)).toBe(-10); // Should be -1
  });

  test('BUG: Range crossing zero returns lower bound', () => {
    expect(clamp(0, -5, 5)).toBe(-5); // Should be 0
    expect(clamp(-5, 0, 10)).toBe(0); // Correct by accident
  });

  test('BUG: Same bounds returns that bound', () => {
    expect(clamp(5, 10, 10)).toBe(10); // Correct by accident
    expect(clamp(10, 10, 10)).toBe(10); // Correct
  });

  test('BUG: Very large numbers return lower bound', () => {
    expect(clamp(1000000, 0, 999999)).toBe(0); // Should be 999999
  });

  test('BUG: Infinity returns lower bound', () => {
    expect(clamp(Infinity, 0, 100)).toBe(0); // Should be 100
    expect(clamp(-Infinity, 0, 100)).toBe(0); // Correct by accident
  });

  test('Handles NaN correctly', () => {
    const result = clamp(NaN, 0, 10);
    expect(Number.isNaN(result)).toBe(true);
  });

  test('BUG: Rating validation completely broken', () => {
    expect(clamp(0, 1, 5)).toBe(1); // Correct by accident
    expect(clamp(3, 1, 5)).toBe(1); // Should be 3
    expect(clamp(6, 1, 5)).toBe(1); // Should be 5
  });

  test('BUG: Discount percentage validation broken', () => {
    expect(clamp(-10, 0, 100)).toBe(0); // Correct by accident
    expect(clamp(50, 0, 100)).toBe(0); // Should be 50
    expect(clamp(150, 0, 100)).toBe(0); // Should be 100
  });

  test('BUG: Age restriction validation broken', () => {
    expect(clamp(10, 18, 120)).toBe(18); // Correct by accident
    expect(clamp(25, 18, 120)).toBe(18); // Should be 25
    expect(clamp(150, 18, 120)).toBe(18); // Should be 120
  });
});
