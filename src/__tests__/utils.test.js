import { createCards, shuffle, distributeSpareDeck, findCompletedDecks } from '../utils';
import { RANKS } from '../constants';
import cards from './cards.json';
import decks from './decks.json';
import completedDeck from './completedDeck.json';
//import { moveCards } from '../utils';

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

  it('it should return undefined when deck has empty deck', () => {
    // arrange
    const spareCards = [];
    const setSpareCards = () => { };
    const setGameCards = () => { };
    const setDecks = () => { };
    const notify = () => { };
    const decksArray = [[], []];

    // act
    const actualResult = distributeSpareDeck(spareCards, setSpareCards, setGameCards, decksArray, setDecks, notify);

    // assert
    expect(actualResult).toBe(undefined);
  });

  it('it should return array with length zero', () => {
    // arrange
    const decksArray = decks;

    // act
    const actualResult = findCompletedDecks(decksArray);

    // assert
    expect(actualResult.length).toBe(0);
  });

  it('it should return array with length 1', () => {
    // arrange
    const decksArray = [completedDeck, [], []];

    // act
    const actualResult = findCompletedDecks(decksArray);

    // assert
    expect(actualResult.length).toBe(1);
  });

  // it('should move cards', () => {
  //   // arrange
  //   const decksArray = decks;
  //   const setDecks = () => { };
  //   const source = 3;
  //   const destination = 4;
  //   const x = 1;

  //   // act
  //   moveCards(decksArray, setDecks, source, destination, x);

  //   // assert
  //   expect(setDecks).toBeCalled();

  // });
});