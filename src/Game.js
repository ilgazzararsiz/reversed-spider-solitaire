import React, { useState, useEffect } from 'react';
import Deck from './components/Deck';
import { shuffle, createCards } from './utils';
import { RANKS, SLICE_POINT_OF_DECKS, COUNT_OF_DECK_ROWS, COUNT_OF_CARDS_TO_OPEN } from './constants';
import './game.css';

const Game = () => {

  const [cards] = useState(shuffle(createCards(RANKS)));
  const [spareCards, setSpareCards] = useState(cards.slice(0, SLICE_POINT_OF_DECKS));
  const [gameCards, setGameCards] = useState(cards.slice(SLICE_POINT_OF_DECKS, cards.length));

  const [decks, setDecks] = useState([]);

  const prepareDecks = () => {
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

  useEffect(() => {
    prepareDecks();
  }, []);


  const renderDecks = decks.map((deckOfCards, index) => {
    return <Deck cards={ deckOfCards } key={ index }/>;
  });
  

  const distributeSpareDeck = () =>  {
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

  return <div className="game">
    <div className="game__deck">
      <Deck cards={ spareCards } className="game__deck--spare" type="spare" onClick={ distributeSpareDeck }/>
      <Deck className="game__deck--transparent" />
      <Deck />
      <Deck />
      <Deck />
      <Deck />
      <Deck />
      <Deck />
      <Deck />
      <Deck />
    </div>
    <div className="game__deck">
      { renderDecks }
    </div>
  </div>;
};

export default Game;