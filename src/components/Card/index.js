import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import './card.css';

const Card = ({ rank, flipped, className, draggableId, index }) => {

  const cardSymbol = <img src="images/club.png" height="50"/>;

  return <Draggable draggableId={ draggableId } index={ index } isDragDisabled={ flipped }>
    { provided => (
      <div
        { ...provided.draggableProps }
        { ...provided.dragHandleProps }
        ref={ provided.innerRef }
        className={ cx('card', { 'card--flipped': flipped }, className) }
      >
        <div className="card__rank">{ !flipped && rank }</div>
        <div className="card__symbol">
          { !flipped && cardSymbol }
        </div>
        <div className="card__rank card__rank--flipped">{ !flipped && rank }</div>
      </div>
    ) }
  </Draggable>;
};

Card.propTypes = {
  rank: PropTypes.string,
  flipped: PropTypes.bool,
  className: PropTypes.string,
  index: PropTypes.number,
  draggableId: PropTypes.string
};

export default Card;