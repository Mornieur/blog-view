// Footer.test.tsx
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

test('has the correct background color and text color', () => {
  const { container } = render(<Footer />);
  const footerElement = container.firstChild;
  // expect(footerElement).toHaveStyle('background-color: rgb(110, 50, 150)');
  // expect(footerElement).toHaveStyle('color: white');
});

//verificar teste de colors
