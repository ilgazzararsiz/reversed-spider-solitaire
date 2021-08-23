import { createCards, shuffle } from '../utils';
import { RANKS } from '../constants';
import cards from './cards.json';

describe('Util Tests', () => {
  it('should create cards', () => {
    // arrange
    const ranks = RANKS;
    const expectedResult = cards;
    
    // act
    const actualResult = createCards(ranks);

    // assert
    expect(actualResult).toEqual(expectedResult);
  });

  it('should shuffle cards array', () => {
    // arrange
    const cardsArray = cards;

    // act
    const actualResult = shuffle(cardsArray);

    // assert
    expect(false).toBe(cardsArray !== actualResult);
  });
});