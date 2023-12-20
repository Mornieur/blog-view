import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';
import { test, expect } from 'vitest';

test('renders Footer component', () => {
  render(<Footer />);
  const currentYear = new Date().getFullYear();
  expect(screen.getByText('Blog View')).toBeInTheDocument();
  expect(
    screen.getByText(`© ${currentYear} Blog View Company. All Rights Reserved.`)
  ).toBeInTheDocument();
});
