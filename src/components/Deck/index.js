import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Card from '../Card';
import { Droppable } from 'react-beautiful-dnd';
import './deck.css';

const Deck = ( { cards, className, type, onClick, droppableId } ) => {

  const findClassName = (card, i) => {
    if (i === 0) {
      return '';
    } else if (card.flipped || cards[i - 1].flipped) {
      return 'deck__card--sticky';
    } else if (cards.length - 1 === i || !card.flipped) {
      return 'deck__card deck__card--on-top';
    } else {
      return 'deck__card';
    }
  };

  const renderCards = cardsArray => {
    return cardsArray.map((card, i) => {
      return <Card
        draggableId={ card.id }
        index={ i }
        rank={ card.rank }
        flipped={ card.flipped }
        className={ type !== 'spare' ? findClassName(card, i) : '' }
        key={ i }
        isCompletedCard={ type === 'holder' }
      />;
    });
  };

  const displayCards = type === 'spare' ? renderCards(cards.slice(0, 1)) : renderCards(cards);

  return <Droppable droppableId={ droppableId }>
    { provided => (
      <div className={ cx('deck', className) } onClick={ onClick } ref={ provided.innerRef } { ...provided.droppableProps }>
        { displayCards }
        { provided.placeholder }
      </div>
    ) }
  </Droppable>;
};

Deck.propTypes = {
  cards: PropTypes.array,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  droppableId: PropTypes.string
};

Deck.defaultProps = {
  cards: []
};

export default Deck;