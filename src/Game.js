import React from 'react';
import Deck from './components/Deck';
import { shuffle, createCards } from './utils';
import { RANKS, SLICE_POINT_OF_DECKS, COUNT_OF_DECK_ROWS } from './constants';
import './game.css';

const Game = () => {

  const cards = shuffle(createCards(RANKS));
  const spareCards = cards.slice(0, SLICE_POINT_OF_DECKS);
  const gameCards = cards.slice(SLICE_POINT_OF_DECKS, cards.length);

  const decks = [];
  for (let i = 0; i < COUNT_OF_DECK_ROWS; i++) {
    decks.push([]);
  }
  
  let i = 0;

  gameCards.forEach(gameCard => {
    decks[i % 10].push(gameCard);
    i++;
  });

  decks.forEach(deck => {
    deck[deck.length - 1].flipped = false;
  });

  const renderDecks = decks.map((deckOfCards, index) => {
    return <Deck cards={ deckOfCards } key={ index }/>;
  });
  

  const distributeSpareDeck = () =>  {
    //TODO: card distribution will be handle here.
  };

  return <div className="game">
    <div className="game__deck">
      <Deck cards={ spareCards } className="game__deck--spare" type="spare" onClick={ distributeSpareDeck }/>
      <Deck cards={ [] } className="game__deck--transparent" />
      <Deck cards={ [] } />
      <Deck cards={ [] } />
      <Deck cards={ [] } />
      <Deck cards={ [] } />
      <Deck cards={ [] } />
      <Deck cards={ [] } />
      <Deck cards={ [] } />
      <Deck cards={ [] } />
    </div>
    <div className="game__deck">
      { renderDecks }
    </div>
  </div>;
};

export default Game;