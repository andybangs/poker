function buildCards(suits) {
  const ranks = '23456789TJQKA'.split('');
  return suits.reduce(
    (deck, suit) => {
      return deck.concat(ranks.map(rank => rank + suit));
    },
    []
  );
}

function sortedDeck() {
  return buildCards([ 'C', 'D', 'H', 'S' ]);
}

function redCards() {
  return buildCards([ 'D', 'H' ]);
}

function blackCards() {
  return buildCards([ 'C', 'S' ]);
}

module.exports = { buildCards, sortedDeck, redCards, blackCards };
