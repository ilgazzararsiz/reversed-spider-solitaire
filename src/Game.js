import React from 'react';
import Deck from './components/Deck';
import { shuffle, createCards } from './utils';
import { RANKS, SLICE_POINT_OF_DECKS, COUNT_OF_DECK_ROWS } from './constants';
import './game.css';

const Game = () => {

  const cards = shuffle(createCards(RANKS));
  //const spareCards = cards.slice(0, SLICE_POINT_OF_DECKS);
  const gameCards = cards.slice(SLICE_POINT_OF_DECKS, cards.length);

  const decks = [];
  for (let i = 0; i < COUNT_OF_DECK_ROWS; i++) {
    decks.push([]);
  }
  
  let i = 0;

  gameCards.forEach(gameCard => {
    decks[i % 10].push({
      rank: gameCard,
      flipped: true
    });
    i++;
  });

  decks.forEach(deck => {
    deck[deck.length - 1].flipped = false;
  });

  return <div className="game">
    <div className="game__deck">
      {
        decks.map((deckOfCards, index) => {
          return <Deck cards={ deckOfCards } key={ index }/>;
        })
      }
    </div>
  </div>;
};

export default Game;