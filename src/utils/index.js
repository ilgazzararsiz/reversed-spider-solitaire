import { COUNT_OF_CARD_RANK } from '../constants';

export const createCards = ranks => {
  const cards = [];
  ranks.forEach(rank => {
    for (let i = 0; i < COUNT_OF_CARD_RANK; i++) {
      cards.push({
        rank: rank,
        flipped: true
      });
    }
  });
  return cards;
};

export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const moveCards = (decks, setDecks, source, destination, x) => {
  const a = [];
  const tempDeck = [...decks];

  for (let i = x; i >= 1; i--) {
    a.push(tempDeck[source][tempDeck[source].length - i]);
    tempDeck[source][tempDeck[source].length - i].flipped = false;
  }
  
  a.forEach(e => {
    tempDeck[destination].push(e);
  });
  
  tempDeck[source].splice(-x);
  tempDeck[source][tempDeck[source].length - 1].flipped = false;
  
  setDecks(tempDeck);
};
