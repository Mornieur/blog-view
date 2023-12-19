import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Error404 from './404';

describe('Error404 Component', () => {
  it('renders the component and checks for text and elements', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    expect(
      screen.getByText(
        "The page you're looking for doesn't exist or has been moved."
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Error 404')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Go Home/i })
    ).toBeInTheDocument();
  });
});
