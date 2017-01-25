const utils = require('./utils');
const { combinations, product, hasDuplicates, max, min, shuffle } = utils;

describe('combinations', () => {
  it('should return k-sized combinations of elements in a set', () => {
    expect(combinations([ 1, 2, 3 ], 1)).toEqual([ [ 1 ], [ 2 ], [ 3 ] ]);

    expect(
      combinations([ 1, 2, 3 ], 2)
    ).toEqual([ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ]);

    expect(combinations([ 1, 2, 3 ], 3)).toEqual([ [ 1, 2, 3 ] ]);
  });

  it(
    'should return an empty array if k is greater than the number of elements in the set',
    () => {
      expect(combinations([ 1, 2, 3 ], 4)).toEqual([]);
    }
  );

  it('should return an empty array if k is less than 0', () => {
    expect(combinations([ 1, 2, 3 ], -1)).toEqual([]);
  });
});

describe('product', () => {
  it('should return the Cartesian product of input arrays', () => {
    expect(
      product([ 1, 2 ], [ 3, 4 ])
    ).toEqual([ [ 1, 3 ], [ 1, 4 ], [ 2, 3 ], [ 2, 4 ] ]);

    expect(
      product([ 1 ], [ 2, 3 ], [ 'a', 'b' ])
    ).toEqual([ [ 1, 2, 'a' ], [ 1, 2, 'b' ], [ 1, 3, 'a' ], [ 1, 3, 'b' ] ]);
  });
});

describe('hasDuplicates', () => {
  it('should return true if array has repeated elements', () => {
    expect(hasDuplicates([ 1, 2, 3, 4, 4 ])).toBe(true);
    expect(hasDuplicates([ 'one', 'two', 'three', 'four', 'four' ])).toBe(true);
  });

  it('should return false if array has norepeated elements', () => {
    expect(hasDuplicates([ 1, 2, 3, 4 ])).toBe(false);
    expect(hasDuplicates([ 'one', 'two', 'three', 'four' ])).toBe(false);
  });
});

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

describe('shuffle', () => {
  const deck = '2C 3C 4C 5C 6C 7C 8C 9C TC JC QC KC AC 2D 3D 4D 5D 6D 7D 8D 9D TD JD QD KD AD 2H 3H 4H 5H 6H 7H 8H 9H TH JH QH KH AH 2S 3S 4S 5S 6S 7S 8S 9S TS JS QS KS AS'.split(
    ' '
  );

  it('should return an array not equal to the array passed in', () => {
    expect(shuffle(deck)).not.toEqual(deck);
  });

  it('should return an array of equal length', () => {
    expect(shuffle(deck)).toHaveLength(deck.length);
  });
});
