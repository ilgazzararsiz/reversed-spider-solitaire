import { COUNT_OF_CARD_DECKS, COUNT_OF_DECK_ROWS, COUNT_OF_CARDS_TO_OPEN, RANKS } from '../constants';

export const createCards = ranks => {
  const cards = [];
  let id = 1;
  ranks.forEach(rank => {
    for (let i = 0; i < COUNT_OF_CARD_DECKS; i++) {
      cards.push({
        rank: rank.name,
        value: rank.value,
        flipped: true,
        id: `card-${id}-${rank.value}`
      });
      id++;
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
  const lastCardOfDeck = tempDeck[source][tempDeck[source].length - 1];
  if (lastCardOfDeck)
    lastCardOfDeck.flipped = false;
  
  setDecks(tempDeck);
};

export const prepareDecks = (gameCards, setDecks) => {
  const tempDeck = [];
  for (let i = 0; i < COUNT_OF_DECK_ROWS; i++) {
    tempDeck.push([]);
  }
  
  let i = 0;

  gameCards.forEach(gameCard => {
    tempDeck[i % COUNT_OF_DECK_ROWS].push(gameCard);
    i++;
  });

  tempDeck.forEach(deck => {
    deck[deck.length - 1].flipped = false;
  });

  setDecks(tempDeck);
};

export const distributeSpareDeck = (spareCards, setSpareCards, setGameCards, decks, setDecks, notify) =>  {
  let hasEmptyDeck = false;
  decks.forEach(deck => {
    if (deck.length === 0)
      hasEmptyDeck = true;
  });

  if (hasEmptyDeck) {
    notify('Please move a card to empty deck.');
    return;
  }

  const cardsToOpen = spareCards.slice(0, COUNT_OF_CARDS_TO_OPEN);
  setSpareCards(spareCards.slice(COUNT_OF_CARDS_TO_OPEN, spareCards.length));

  cardsToOpen.forEach(cardToOpen => {
    setGameCards(gameCards => [...gameCards, cardToOpen]);
  });

  let i = 0;

  const d = decks;
  cardsToOpen.forEach(gameCard => {
    d[i % COUNT_OF_DECK_ROWS].push({ ...gameCard, flipped: false });
    i++;
  });
  setDecks(d);
};

export const findCompletedDecks = decks => {
  const decksResults = [];
  decks.forEach((deck, i) => {
    if (deck.length >= 13) {
      const hasMaxValue = deck[deck.length - 1].value === 13;
      if (hasMaxValue) {
        let isValueEqual = true;
  
        for (let j = deck.length - 1; j > deck.length - RANKS.length; j--) {
          if (deck[j].value !== deck[j - 1].value + 1 || deck[j].flipped) {
            isValueEqual = false;
          }
        }
        isValueEqual && decksResults.push(i);
      }
    }
  });
  return decksResults;
};