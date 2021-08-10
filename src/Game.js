import React from 'react';
import Deck from './components/Deck';
import './game.css';

const Game = () => {

  const cards = [
    {
      rank: 'A',
      flipped: true
    },
    {
      rank: '5',
      flipped: true
    },
    {
      rank: '9',
      flipped: true
    },
    {
      rank: '9',
      flipped: true
    },
    {
      rank: '9',
      flipped: false
    },
    {
      rank: '9',
      flipped: false
    },
    {
      rank: '9',
      flipped: false
    }
  ];

  return <div className="game">
    <div className="game__deck">
      <Deck cards={ cards } />
      <Deck cards={ cards } />
      <Deck cards={ cards } />
      <Deck cards={ cards } />
      <Deck cards={ [] }/>
    </div>
  </div>;
};

export default Game;