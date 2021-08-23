import React, { useState, useEffect } from 'react';
import Deck from '../Deck';
import { shuffle, createCards, prepareDecks, moveCards, distributeSpareDeck, findCompletedDecks } from '../../utils';
import { RANKS, SLICE_POINT_OF_DECKS, COUNT_OF_CARD_DECKS } from '../../constants';
import { DragDropContext } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './game.css';

const Game = () => {

  const [decks, setDecks] = useState([]);
  const [cards] = useState(shuffle(createCards(RANKS)));
  const [spareCards, setSpareCards] = useState(cards.slice(0, SLICE_POINT_OF_DECKS));
  const [gameCards, setGameCards] = useState(cards.slice(SLICE_POINT_OF_DECKS, cards.length));
  const [completedDeckCount, setCompletedDeckCount] = useState(0);

  const notify = message => toast(message);
  
  useEffect(() => {
    prepareDecks(gameCards, setDecks);
  }, []);

  
  useEffect(() => {
    const completedDecks = findCompletedDecks(decks);
    setCompletedDeckCount(completedDecks.length + completedDeckCount);
    completedDecks.length > 0 && removeCardsFromDeck(completedDecks);
  }, [decks]);
  
  useEffect(() => {
    completedDeckCount === 8 && notify('CONGRATULATIONS! GAME FINISHED SUCCESSFULLY! :)');
  }, [completedDeckCount]);

  const renderDecks = decks.map((deckOfCards, i) => {
    return <Deck cards={ deckOfCards } key={ i } droppableId={ `deck-${i}` } />;
  });

  const onDragEnd = e => {
    const sourceId = e.source.droppableId.split('-')[1];
    if (e.destination) {
      const destinationId = e.destination?.droppableId.split('-')[1];
      const sourceRank = parseInt(e.draggableId.split('-')[2]);
      if (decks[destinationId]) {
        let destinationRank;
        try {
          destinationRank = decks[destinationId][decks[destinationId].length - 1].value;
        } catch (e) {
          console.log('🚀 ~ file: index.js ~ line 123 ~ Game ~ e', e);
        }
        if (destinationRank === sourceRank - 1 || decks[destinationId].length === 0) {
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
          console.log('🚀 ~ file: index.js ~ line 67 ~ Game ~ decks', JSON.stringify(decks));
        } else {
          // eslint-disable-next-line no-useless-escape
          notify('Invalid card move ¯\\_(ツ)_/¯');
        }
      }
    }
  };

  const renderCompletedDeckHolders = Array.apply(null, Array(COUNT_OF_CARD_DECKS)).map((v, i) => {
    const completedCardSeries = completedDeckCount > i ? [{
      rank: 'K',
      value: 13,
      flipped: false,
      id: 'card-200-13'
    }] : [];
    return <Deck droppableId={ `deck-card-holder-${i}` } key={ i } cards={ completedCardSeries } type="holder"/>;
  });

  const removeCardsFromDeck = completedDecks => {
    const completedDeck = decks[completedDecks[completedDecks.length - 1]];
    completedDeck.splice(-13);
    if (completedDeck.length !== 0) {
      completedDeck[completedDeck.length - 1].flipped = false;
    }
    notify('Wow! Deck completed.');
  };
  
  return <DragDropContext onDragEnd={ onDragEnd }>
    <div className="game">
      <div className="game__deck">
        <Deck cards={ spareCards }
          className="game__deck--spare"
          type="spare"
          onClick={ () => distributeSpareDeck(spareCards, setSpareCards, setGameCards, decks, setDecks, notify) }
          droppableId={ 'deck-spare' }
        />
        <Deck className="game__deck--transparent" droppableId={ 'deck-transparent' } />
        { renderCompletedDeckHolders }
      </div>
      <div className="game__deck">
        { renderDecks }
      </div>
    </div>
    <ToastContainer position="top-center"/>
  </DragDropContext>;
};

export default Game;