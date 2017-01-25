const deck = require('./deck');
const { buildCards, sortedDeck, redCards, blackCards } = deck;

const deckArr = '2C 3C 4C 5C 6C 7C 8C 9C TC JC QC KC AC 2D 3D 4D 5D 6D 7D 8D 9D TD JD QD KD AD 2H 3H 4H 5H 6H 7H 8H 9H TH JH QH KH AH 2S 3S 4S 5S 6S 7S 8S 9S TS JS QS KS AS'.split(
  ' '
);

const redCardsArr = '2D 3D 4D 5D 6D 7D 8D 9D TD JD QD KD AD 2H 3H 4H 5H 6H 7H 8H 9H TH JH QH KH AH'.split(
  ' '
);

const blackCardsArr = '2C 3C 4C 5C 6C 7C 8C 9C TC JC QC KC AC 2S 3S 4S 5S 6S 7S 8S 9S TS JS QS KS AS'.split(
  ' '
);

describe('buildCards', () => {
  it('should return an array of cards for given suits', () => {
    expect(
      buildCards([ 'C', 'S' ])
    ).toEqual([ '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS' ]);
  });
});

describe('redCards', () => {
  it('should return an array representing all red cards in a deck', () => {
    expect(redCards()).toEqual(redCardsArr);
  });

  it('should contain 26 cards', () => {
    expect(redCards()).toHaveLength(26);
  });
});

describe('blackCards', () => {
  it('should return an array representing all black cards in a deck', () => {
    expect(blackCards()).toEqual(blackCardsArr);
  });

  it('should contain 26 cards', () => {
    expect(blackCards()).toHaveLength(26);
  });
});

describe('sortedDeck', () => {
  it('should return an array representing a sorted deck', () => {
    expect(sortedDeck()).toEqual(deckArr);
  });

  it('should contain 52 cards', () => {
    expect(sortedDeck()).toHaveLength(52);
  });
});
