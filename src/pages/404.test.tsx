import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Error404 from './404';
import { describe, it, expect } from 'vitest';

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

  it('renders the Error 404 heading', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { name: /Error 404/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the error message', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    const errorMessage = screen.getByText(
      "The page you're looking for doesn't exist or has been moved."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the Go Home button', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    const goHomeButton = screen.getByRole('button', { name: /Go Home/i });
    expect(goHomeButton).toBeInTheDocument();
  });
});
