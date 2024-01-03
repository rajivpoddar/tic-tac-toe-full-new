import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders the tic-tac-toe game with a 3x3 grid', () => {
  const { getByText, getAllByRole } = render(<App />);
  const playerX = getByText(/Player X/i);
  const playerO = getByText(/Player O/i);
  const cells = getAllByRole('button', { name: '' });
  expect(playerX).toBeInTheDocument();
  expect(playerO).toBeInTheDocument();
  expect(cells.length).toBe(9);
});

test('allows players to click on an empty cell to place their mark', () => {
  const { getAllByRole } = render(<App />);
  const cells = getAllByRole('button', { name: '' });
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('X');
  fireEvent.click(cells[1]);
  expect(cells[1]).toHaveTextContent('O');
});

test('alternates turns between players', () => {
  const { getAllByRole } = render(<App />);
  const cells = getAllByRole('button', { name: '' });
  fireEvent.click(cells[0]);
  fireEvent.click(cells[1]);
  expect(cells[0]).toHaveTextContent('X');
  expect(cells[1]).toHaveTextContent('O');
});

test('updates the scorecards after a player wins a round', () => {
  const { getAllByRole, getByText } = render(<App />);
  const cells = getAllByRole('button', { name: '' });
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X wins
  expect(getByText('Player X').nextSibling).toHaveTextContent('1');
});

test('provides a `Previous Step` button to undo the last move', () => {
  const { getAllByRole, getByText } = render(<App />);
  const cells = getAllByRole('button', { name: '' });
  const previousButton = getByText('Previous Step');
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[1]); // O
  fireEvent.click(previousButton);
  expect(cells[1]).toHaveTextContent('');
});

test('provides a `Reset Board` button to start a new game', () => {
  const { getAllByRole, getByText } = render(<App />);
  const cells = getAllByRole('button', { name: '' });
  const resetButton = getByText('Reset Board');
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[1]); // O
  fireEvent.click(resetButton);
  cells.forEach(cell => {
    expect(cell).toHaveTextContent('');
  });
});

test('highlights the winning combination if a player wins', () => {
  const { getAllByRole, getByText } = render(<App />);
  const cells = getAllByRole('button', { name: '' });
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X wins
  expect(cells[0]).toHaveClass('highlight');
  expect(cells[1]).toHaveClass('highlight');
  expect(cells[2]).toHaveClass('highlight');
});
