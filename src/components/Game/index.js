import React, { useState, useEffect } from 'react';
import Deck from '../Deck';
import { shuffle, createCards, prepareDecks, moveCards, distributeSpareDeck, findCompletedDecks } from '../../utils';
import { RANKS, SLICE_POINT_OF_DECKS, COUNT_OF_CARD_DECKS } from '../../constants';
import { DragDropContext } from 'react-beautiful-dnd';
import './game.css';

const Game = () => {

  const [decks, setDecks] = useState([]);
  const [cards] = useState(shuffle(createCards(RANKS)));
  const [spareCards, setSpareCards] = useState(cards.slice(0, SLICE_POINT_OF_DECKS));
  const [gameCards, setGameCards] = useState(cards.slice(SLICE_POINT_OF_DECKS, cards.length));
  const [completedDeckCount, setCompletedDeckCount] = useState(0);

  useEffect(() => {
    prepareDecks(gameCards, setDecks);
  //   const completedSeries = [
  //     {
  //       rank: 'A',
  //       value: 1,
  //       flipped: false,
  //       id: 'card-200-1'
  //     },
  //     {
  //       rank: '2',
  //       value: 2,
  //       flipped: false,
  //       id: 'card-200-2'
  //     },
  //     {
  //       rank: '3',
  //       value: 3,
  //       flipped: false,
  //       id: 'card-200-3'
  //     },
  //     {
  //       rank: '4',
  //       value: 4,
  //       flipped: false,
  //       id: 'card-200-4'
  //     },
  //     {
  //       rank: '5',
  //       value: 5,
  //       flipped: false,
  //       id: 'card-200-5'
  //     },
  //     {
  //       rank: '6',
  //       value: 6,
  //       flipped: false,
  //       id: 'card-200-6'
  //     },
  //     {
  //       rank: '7',
  //       value: 7,
  //       flipped: false,
  //       id: 'card-200-7'
  //     },
  //     {
  //       rank: '8',
  //       value: 8,
  //       flipped: false,
  //       id: 'card-200-8'
  //     },
  //     {
  //       rank: '9',
  //       value: 9,
  //       flipped: false,
  //       id: 'card-200-9'
  //     },
  //     {
  //       rank: '10',
  //       value: 10,
  //       flipped: false,
  //       id: 'card-200-10'
  //     },
  //     {
  //       rank: 'J',
  //       value: 11,
  //       flipped: false,
  //       id: 'card-200-11'
  //     },
  //     {
  //       rank: 'Q',
  //       value: 12,
  //       flipped: false,
  //       id: 'card-200-12'
  //     },
  //     {
  //       rank: 'K',
  //       value: 13,
  //       flipped: false,
  //       id: 'card-200-13'
  //     }];
  //   setDecks([completedSeries, completedSeries, [], [], [], [], [], [], [], []]);
  //
  }, []);

  
  useEffect(() => {
    const completedDecks = findCompletedDecks(decks);
    setCompletedDeckCount(completedDecks.length);
    completedDecks.length > 0 && removeCardsFromDeck(completedDecks);
  }, [decks]);

  const renderDecks = decks.map((deckOfCards, i) => {
    return <Deck cards={ deckOfCards } key={ i } droppableId={ `deck-${i}` } />;
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

  const renderCompletedDeckHolders = Array.apply(null, Array(COUNT_OF_CARD_DECKS)).map((v, i) => {
    const gh = completedDeckCount > i ? [{
      rank: 'K',
      value: 13,
      flipped: false,
      id: 'card-200-13'
    }] : [];
    return <Deck droppableId={ `deck-card-holder-${i}` } key={ i } cards={ gh } type="holder"/>;
  });

  const removeCardsFromDeck = completedDecks => {
    const completedDeck = decks[completedDecks[completedDecks.length - 1]];
    completedDeck.splice(-13);
    completedDeck[completedDeck.length - 1].flipped = false;
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
        { renderCompletedDeckHolders }
      </div>
      <div className="game__deck">
        { renderDecks }
      </div>
    </div>
  </DragDropContext>;
};

export default Game;