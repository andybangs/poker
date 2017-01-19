const util = require('./util');
const { max, min, shuffle } = util;

function straight(ranks) {
  return max(ranks) - min(ranks) === 4 && new Set(ranks).size === 5;
}

function flush(hand) {
  return new Set(hand.map(card => card.charAt(1))).size === 1;
}

function kind(n, ranks) {
  const rankCounts = ranks.reduce(
    (acc, curr) => {
      acc[curr] ? acc[curr] += 1 : acc[curr] = 1;
      return acc;
    },
    {}
  );

  for (const key of Object.keys(rankCounts).sort((a, b) => a < b)) {
    if (rankCounts[key] === n)
      return parseInt(key, 10);
  }

  return false;
}

function twoPair(ranks) {
  const highPair = kind(2, ranks);

  if (highPair) {
    const lowPair = kind(2, ranks.filter(rank => rank !== highPair));
    return lowPair && [ highPair, lowPair ];
  }

  return false;
}

function cardRanks(hand) {
  const ranks = hand
    .map(card => parseInt('--23456789TJQKA'.indexOf(card.charAt(0))), 10)
    .sort((a, b) => a < b);

  const fiveHighStraightRank = [ 14, 5, 4, 3, 2 ];
  if (ranks.join(',') === fiveHighStraightRank.join(','))
    return [ 5, 4, 3, 2, 1 ];

  return ranks;
}

function handRank(hand) {
  const ranks = cardRanks(hand);

  if (straight(ranks) && flush(hand))
    return [ 8, max(ranks) ];
  else if (kind(4, ranks))
    return [ 7, kind(4, ranks), kind(1, ranks) ];
  else if (kind(3, ranks) && kind(2, ranks))
    return [ 6, kind(3, ranks), kind(2, ranks) ];
  else if (flush(hand))
    return [ 5 ].concat(ranks);
  else if (straight(ranks))
    return [ 4, max(ranks) ];
  else if (kind(3, ranks))
    return [ 3, kind(3, ranks) ].concat(ranks);
  else if (twoPair(ranks))
    return [ 2 ].concat(twoPair(ranks)).concat(ranks);
  else if (kind(2, ranks))
    return [ 1, kind(2, ranks) ].concat(ranks);
  else
    return [ 0 ].concat(ranks);
}

function play(hands) {
  return hands
    .map(hand => [ hand ])
    .reduce((a, b) => {
      const rankAStr = handRank(a[0]).join(',');
      const rankBStr = handRank(b[0]).join(',');

      if (rankAStr === rankBStr)
        return a.concat(b);

      return rankAStr > rankBStr ? a : b;
    });
}

function sortedDeck() {
  const suits = 'C D H S'.split(' ');
  const ranks = '2 3 4 5 6 7 8 9 T J Q K A'.split(' ');
  return suits.reduce(
    (deck, suit) => {
      return deck.concat(ranks.map(rank => rank + suit));
    },
    []
  );
}

function deal(numHands, handSize = 5, deck = sortedDeck()) {
  if (numHands * handSize > deck.length)
    throw new Error('Not enough cards in deck');

  const shuffledDeck = shuffle(deck);
  const hands = Array(numHands).fill(null).map(_ => Array(handSize).fill(null));

  for (let i = 0; i < numHands; i++) {
    for (let j = 0; j < handSize; j++) {
      hands[i][j] = shuffledDeck.shift();
    }
  }

  return hands;
}

module.exports = {
  straight,
  flush,
  kind,
  twoPair,
  cardRanks,
  handRank,
  play,
  sortedDeck,
  deal
};
