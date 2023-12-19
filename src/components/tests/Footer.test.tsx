import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../Footer';

test('renders Footer component', () => {
  const { getByText } = render(<Footer />);
  const currentYear = new Date().getFullYear();
  expect(getByText('My Blog')).toBeInTheDocument();
  expect(
    getByText(`© ${currentYear} My Blog Company. All Rights Reserved.`)
  ).toBeInTheDocument();
});
