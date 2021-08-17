import React, { useState, useEffect } from 'react';
import Deck from '../Deck';
import { shuffle, createCards, prepareDecks, moveCards } from '../../utils';
import { RANKS, SLICE_POINT_OF_DECKS, COUNT_OF_DECK_ROWS, COUNT_OF_CARDS_TO_OPEN } from '../../constants';
import { DragDropContext } from 'react-beautiful-dnd';
import './game.css';

const Game = () => {

  const [decks, setDecks] = useState([]);
  const [cards] = useState(shuffle(createCards(RANKS)));
  const [spareCards, setSpareCards] = useState(cards.slice(0, SLICE_POINT_OF_DECKS));
  const [gameCards, setGameCards] = useState(cards.slice(SLICE_POINT_OF_DECKS, cards.length));

  useEffect(() => {
    prepareDecks(gameCards, setDecks);
  }, []);

  const renderDecks = decks.map((deckOfCards, index) => {
    return <Deck cards={ deckOfCards } key={ index } droppableId={ `deck-${index}` } />;
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

  const onDragEnd = e => {
    const sourceId = e.source.droppableId.split('-')[1];
    const destinationId = e.destination.droppableId.split('-')[1];

    moveCards(decks, setDecks, sourceId, destinationId, 1);

  };

  return <DragDropContext onDragEnd={ onDragEnd }>
    <div className="game">
      <div className="game__deck">
        <Deck cards={ spareCards } className="game__deck--spare" type="spare" onClick={ distributeSpareDeck } droppableId={ 'deck-spare' }/>
        <Deck className="game__deck--transparent" droppableId={ 'deck-transparent' } />
        <Deck droppableId={ 'deck-card-holder-1' } />
        <Deck droppableId={ 'deck-card-holder-2' } />
        <Deck droppableId={ 'deck-card-holder-3' } />
        <Deck droppableId={ 'deck-card-holder-4' } />
        <Deck droppableId={ 'deck-card-holder-5' } />
        <Deck droppableId={ 'deck-card-holder-6' } />
        <Deck droppableId={ 'deck-card-holder-7' } />
        <Deck droppableId={ 'deck-card-holder-8' } />
      </div>
      <div className="game__deck">
        { renderDecks }
      </div>
    </div>
  </DragDropContext>;
};

export default Game;