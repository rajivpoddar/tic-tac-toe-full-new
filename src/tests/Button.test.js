import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

test('renders button with label', () => {
  render(<Button label='Test Button' />);
  const buttonElement = screen.getByRole('button', { name: 'Test Button' });
  expect(buttonElement).toBeInTheDocument();
});

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<Button label='Clickable' onClick={handleClick} />);
  const buttonElement = screen.getByRole('button', { name: 'Clickable' });
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
