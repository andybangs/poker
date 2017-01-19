const poker = require('./poker');
const {
  straight,
  flush,
  kind,
  twoPair,
  cardRanks,
  handRank,
  play,
  sortedDeck,
  deal
} = poker;

const deck = '2C 3C 4C 5C 6C 7C 8C 9C TC JC QC KC AC 2D 3D 4D 5D 6D 7D 8D 9D TD JD QD KD AD 2H 3H 4H 5H 6H 7H 8H 9H TH JH QH KH AH 2S 3S 4S 5S 6S 7S 8S 9S TS JS QS KS AS'.split(
  ' '
);
const tenHighStraightFlush = '6C 7C 8C 9C TC'.split(' ');
const fourOfAKindNines = '9D 9H 9S 9C 7D'.split(' ');
const fullHouseTensOverSevens = 'TD TC TH 7C 7D'.split(' ');
const kingHighFlush = 'KH 7H 5H QH 3H'.split(' ');
const sixHighStraight = '2C 3C 4C 5S 6S'.split(' ');
const fiveHighStraight = 'AS 2S 3S 4S 5C'.split(' ');
const threeOfAKindTwos = '2C 2S 2H 7C 4H'.split(' ');
const twoPairNineFive = '5S 5D 9H 9C 6S'.split(' ');
const onePairFours = '4A 4S AH KA QS'.split(' ');
const aceHigh = 'AS 2S 3S 4S 6C'.split(' ');
const sevenHigh = '2S 3S 4S 6C 7D'.split(' ');

describe('straight', () => {
  it('should return true if ranks is a straight, else return false', () => {
    expect(straight([ 9, 8, 7, 6, 5 ])).toBe(true);
    expect(straight([ 9, 8, 8, 6, 5 ])).toBe(false);
    expect(straight([ 2, 2, 2, 1, 1 ])).toBe(false);
    expect(straight([ 5, 4, 3, 2, 1 ])).toBe(true);
  });
});

describe('flush', () => {
  it('should return true if hand is a flush, else return false', () => {
    expect(flush(tenHighStraightFlush)).toBe(true);
    expect(flush(kingHighFlush)).toBe(true);
    expect(flush(fourOfAKindNines)).toBe(false);
    expect(flush(fullHouseTensOverSevens)).toBe(false);
  });
});

describe('kind', () => {
  it('should return the highest n-of-a-kind rank or false if none exist', () =>
    {
      expect(kind(4, [ 12, 12, 12, 12, 1 ])).toBe(12);
      expect(kind(3, [ 12, 12, 12, 12, 1 ])).toBe(false);
      expect(kind(2, [ 12, 12, 12, 12, 1 ])).toBe(false);
      expect(kind(1, [ 12, 12, 12, 12, 1 ])).toBe(1);
      expect(kind(3, [ 3, 3, 3, 2, 1 ])).toBe(3);
      expect(kind(2, [ 4, 4, 3, 2, 2 ])).toBe(4);
      expect(kind(2, [ 2, 2, 3, 4, 4 ])).toBe(4);
    });
});

describe('twoPair', () => {
  it(
    'should return an array: `[ highest, lowest ]` if two pair exist, else return false',
    () => {
      expect(twoPair([ 4, 4, 3, 2, 2 ])).toEqual([ 4, 2 ]);
      expect(twoPair([ 4, 4, 3, 2, 1 ])).toBe(false);
    }
  );
});

describe('cardRanks', () => {
  it('should return a sorted (hi->lo) array of ranks for a given hand', () => {
    expect(cardRanks(tenHighStraightFlush)).toEqual([ 10, 9, 8, 7, 6 ]);
    expect(cardRanks(fourOfAKindNines)).toEqual([ 9, 9, 9, 9, 7 ]);
    expect(cardRanks(fullHouseTensOverSevens)).toEqual([ 10, 10, 10, 7, 7 ]);
    expect(cardRanks(kingHighFlush)).toEqual([ 13, 12, 7, 5, 3 ]);
    expect(cardRanks(sixHighStraight)).toEqual([ 6, 5, 4, 3, 2 ]);
    expect(cardRanks(fiveHighStraight)).toEqual([ 5, 4, 3, 2, 1 ]);
    expect(cardRanks(threeOfAKindTwos)).toEqual([ 7, 4, 2, 2, 2 ]);
    expect(cardRanks(twoPairNineFive)).toEqual([ 9, 9, 6, 5, 5 ]);
    expect(cardRanks(onePairFours)).toEqual([ 14, 13, 12, 4, 4 ]);
    expect(cardRanks(aceHigh)).toEqual([ 14, 6, 4, 3, 2 ]);
    expect(cardRanks(sevenHigh)).toEqual([ 7, 6, 4, 3, 2 ]);
  });
});

describe('handRank', () => {
  it('should return an array representing the rank of a given hand', () => {
    expect(handRank(tenHighStraightFlush)).toEqual([ 8, 10 ]);
    expect(handRank(fourOfAKindNines)).toEqual([ 7, 9, 7 ]);
    expect(handRank(fullHouseTensOverSevens)).toEqual([ 6, 10, 7 ]);
    expect(handRank(kingHighFlush)).toEqual([ 5, 13, 12, 7, 5, 3 ]);
    expect(handRank(sixHighStraight)).toEqual([ 4, 6 ]);
    expect(handRank(fiveHighStraight)).toEqual([ 4, 5 ]);
    expect(handRank(threeOfAKindTwos)).toEqual([ 3, 2, 7, 4, 2, 2, 2 ]);
    expect(handRank(twoPairNineFive)).toEqual([ 2, 9, 5, 9, 9, 6, 5, 5 ]);
    expect(handRank(onePairFours)).toEqual([ 1, 4, 14, 13, 12, 4, 4 ]);
    expect(handRank(aceHigh)).toEqual([ 0, 14, 6, 4, 3, 2 ]);
    expect(handRank(sevenHigh)).toEqual([ 0, 7, 6, 4, 3, 2 ]);
  });
});

describe('play', () => {
  it('should return an array of winning hands given an array of hands', () => {
    // ten hands
    expect(
      play([
        tenHighStraightFlush,
        fourOfAKindNines,
        fullHouseTensOverSevens,
        kingHighFlush,
        sixHighStraight,
        fiveHighStraight,
        threeOfAKindTwos,
        twoPairNineFive,
        onePairFours,
        aceHigh,
        sevenHigh
      ])
    ).toEqual([ tenHighStraightFlush ]);
    // two equal hands
    expect(
      play([ fullHouseTensOverSevens, fullHouseTensOverSevens ])
    ).toEqual([ fullHouseTensOverSevens, fullHouseTensOverSevens ]);
    // one hand
    expect(play([ kingHighFlush ])).toEqual([ kingHighFlush ]);
    // one hundred hands
    expect(
      play([ onePairFours ].concat(Array.of(99).fill(aceHigh)))
    ).toEqual([ onePairFours ]);
  });
});

describe('sortedDeck', () => {
  it('should return an array representing a sorted deck', () => {
    expect(sortedDeck()).toEqual(deck);
  });

  it('should contain 52 cards', () => {
    expect(sortedDeck()).toHaveLength(52);
  });
});

describe('deal', () => {
  it('should return an array of length `numHands`', () => {
    expect(deal(4)).toHaveLength(4);
  });

  it('should return an array with elements of length `handSize`', () => {
    deal(4).forEach(hand => expect(hand).toHaveLength(5));
  });

  it('should return an array of hands such that no two hands are equal', () => {
    const hands = deal(2, 26);
    expect(hands[0]).not.toEqual(hands[1]);
  });

  it('should throw if cards needed exceed size of deck', () => {
    expect(() => deal(8, 7)).toThrow();
    expect(() => deal(7, 7)).not.toThrow();
  });
});
