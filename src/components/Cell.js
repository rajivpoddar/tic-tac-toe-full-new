import React from 'react';

function Cell({ value, onClick, isWinningCell }) {
  return (
    <button className={`cell ${isWinningCell ? 'highlight' : ''}`} onClick={onClick}>
      {value}
    </button>
  );
}

export default Cell;