import React from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';
import Card from '../Card';
import './deck.css';

const Deck = ( { cards } ) => {

  const findClassName = (card, i) => {
    if (i === 0) {
      return '';
    } else if (card.flipped || cards[i - 1].flipped) {
      return 'deck__card--sticky';
    } else if (cards.length - 1 === i) {
      return 'deck__card deck__card--on-top';
    } else {
      return 'deck__card';
    }
  };

  const renderCards = cards.map((card, i) => {
    return <Card
      rank={ card.rank }
      flipped={ card.flipped }
      className={ findClassName(card, i) }
      key={ i }
    />;
  });

  return <div className="deck">
    { renderCards }
  </div>;
};

Deck.propTypes = {
  cards: PropTypes.string
};

export default Deck;