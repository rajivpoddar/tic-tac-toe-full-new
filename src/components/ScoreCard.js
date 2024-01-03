import React from 'react';

function ScoreCard({ player, score }) {
  return (
    <div className='score-card'>
      <p>{player}</p>
      <p className='score'>{score}</p>
    </div>
  );
}

export default ScoreCard;