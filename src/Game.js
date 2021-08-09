import React from 'react';
import Card from './components/Card';
import './game.css';

const Game = () => {
  
  return <div className="game">
    <Card rank="8" flipped />
    <Card rank="10" />
    <Card rank="J" />
  </div>;
};

export default Game;