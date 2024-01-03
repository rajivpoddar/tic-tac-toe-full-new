import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ScoreCard from './components/ScoreCard';
import Button from './components/Button';

function App() {
  const [history, setHistory] = useState([{ board: Array(9).fill(null), isXNext: true }]);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });

  useEffect(() => {
    const winnerInfo = calculateWinner(current.board);
    if (winnerInfo.winner && currentMove === history.length - 1) {
      setScores(scores => ({
        ...scores,
        xScore: winnerInfo.winner === 'X' ? scores.xScore + 1 : scores.xScore,
        oScore: winnerInfo.winner === 'O' ? scores.oScore + 1 : scores.oScore
      }));
    }
  }, [current.board, currentMove, history.length]);

  const handleCellClick = (index) => {
    const historySlice = history.slice(0, currentMove + 1);
    const current = historySlice[currentMove];
    const squares = current.board;
    if (squares[index] || calculateWinner(squares).winner) return;

    const newSquares = [...squares];
    newSquares[index] = current.isXNext ? 'X' : 'O';
    setHistory([...historySlice, { board: newSquares, isXNext: !current.isXNext }]);
    setCurrentMove(historySlice.length);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return { winner: null, line: [] };
  };

  const handleUndo = () => {
    if (currentMove === 0) return;
    setCurrentMove(currentMove - 1);
  };

  const handleReset = () => {
    setHistory([{ board: Array(9).fill(null), isXNext: true }]);
    setCurrentMove(0);
  };

  return (
    <div className='App'>
      <div className="scoreboard">
        <ScoreCard player='Player X' score={scores.xScore} />
        <ScoreCard player='Player O' score={scores.oScore} />
      </div>
      <GameBoard cells={current.board} onCellClick={handleCellClick} winningLine={calculateWinner(current.board).line} />
      <div className="buttons">
        <Button label='Previous Step' onClick={handleUndo} />
        <Button label='Reset Board' onClick={handleReset} />
      </div>
    </div>
  );
}

export default App;
