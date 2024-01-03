import React from 'react';
import Cell from './Cell';

function GameBoard({ cells, onCellClick, winningLine }) {
  return (
    <div className='game-board'>
      {cells.map((cell, index) => (
        <Cell key={index} value={cell} onClick={() => onCellClick(index)} isWinningCell={winningLine.includes(index)} />
      ))}
    </div>
  );
}

export default GameBoard;