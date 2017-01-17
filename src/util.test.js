const util = require('./util');
const { max, min } = util;

describe('max', () => {
  it('should return the max value in a given array', () => {
    expect(max([ 5, 4, 3, 2, 1 ])).toBe(5);
    expect(max([ 1, 2, 3, 4, 5 ])).toBe(5);
    expect(max([ 2, 2, 2, 11, 2 ])).toBe(11);
    expect(max([ 1, 0, -1 ])).toBe(1);
    expect(max([ 0, -1, -2 ])).toBe(0);
    expect(max([ -1, -2, -3 ])).toBe(-1);
  });
});

describe('min', () => {
  it('should return the min value in a given array', () => {
    expect(min([ 5, 4, 3, 2, 1 ])).toBe(1);
    expect(min([ 1, 2, 3, 4, 5 ])).toBe(1);
    expect(min([ 2, 2, 2, 11, 2 ])).toBe(2);
    expect(min([ 1, 0, -1 ])).toBe(-1);
    expect(min([ 0, -1, -2 ])).toBe(-2);
    expect(min([ -1, -2, -3 ])).toBe(-3);
  });
});
