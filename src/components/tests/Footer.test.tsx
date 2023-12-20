import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../Footer';

test('renders Footer component', () => {
  const { getByText } = render(<Footer />);
  const currentYear = new Date().getFullYear();
  expect(getByText('Blog View')).toBeInTheDocument();
  expect(
    getByText(`© ${currentYear} Blog View Company. All Rights Reserved.`)
  ).toBeInTheDocument();
});
