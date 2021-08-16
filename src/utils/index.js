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