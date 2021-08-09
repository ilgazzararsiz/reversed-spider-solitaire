import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './card.css';

const Card = ({ rank, flipped }) => {

  const cardSymbol = <img src="images/club.png" height="70"/>;

  return <div className={ cx('card', { 'card--flipped': flipped }) }>
    <div className="card__rank">{ !flipped && rank }</div>
    <div className="card__symbol">
      { !flipped && cardSymbol }
    </div>
    <div className="card__rank card__rank--flipped">{ !flipped && rank }</div>
  </div>;
};

Card.propTypes = {
  rank: PropTypes.string,
  flipped: PropTypes.bool
};

export default Card;