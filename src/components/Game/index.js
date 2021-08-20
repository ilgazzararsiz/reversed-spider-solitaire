import React, { useState, useEffect } from 'react';
import Deck from '../Deck';
import { shuffle, createCards, prepareDecks, moveCards, distributeSpareDeck } from '../../utils';
import { RANKS, SLICE_POINT_OF_DECKS } from '../../constants';
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

  const onDragEnd = e => {
    const sourceId = e.source.droppableId.split('-')[1];
    if (e.destination) {
      const destinationId = e.destination?.droppableId.split('-')[1];
      const sourceRank = parseInt(e.draggableId.split('-')[2]);
      if (decks[destinationId]) {
        const destinationRank = decks[destinationId][decks[destinationId].length - 1].value;
    
        if (destinationRank === sourceRank - 1) {
          let x = 1;
          const sourceIndex = e.source.index;
          const lastIndex = decks[sourceId].length - 1;
          
          let canMoveCards = true;
          
          if (sourceIndex < lastIndex) {
            x = lastIndex - sourceIndex + 1;
            for (let i = sourceIndex; i < lastIndex; i++) {
              if (decks[sourceId][i].value !== decks[sourceId][i + 1].value - 1) {
                canMoveCards = false;
              }
            }
          }
          canMoveCards && moveCards(decks, setDecks, sourceId, destinationId, x);
        }
      }
    }
  };

  return <DragDropContext onDragEnd={ onDragEnd }>
    <div className="game">
      <div className="game__deck">
        <Deck cards={ spareCards }
          className="game__deck--spare"
          type="spare"
          onClick={ () => distributeSpareDeck(spareCards, setSpareCards, setGameCards, decks, setDecks) }
          droppableId={ 'deck-spare' }
        />
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