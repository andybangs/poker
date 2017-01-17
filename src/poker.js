const util = require('./util');
const { max, min } = util;

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
  return hands.reduce((a, b) => handRank(a) > handRank(b) ? a : b);
}

module.exports = { straight, flush, kind, twoPair, cardRanks, handRank, play };
