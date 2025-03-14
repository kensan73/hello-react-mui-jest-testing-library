import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import {Component} from './Component';

test('renders MyComponent', () => {
  render(<Component />);
  const element = screen.getByText('hello world');
  expect(element).toBeInTheDocument();
});
