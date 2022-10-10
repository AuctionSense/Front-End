import { render, screen } from '@testing-library/react';
import App from 'App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('on render the test button is disabled', async () => {
  // Arrange
  render(<BrowserRouter><App /></BrowserRouter>);

  // Act
  expect(await screen.findByRole('button', {name: /test/i})).toBeDisabled;
  // Assert
});
