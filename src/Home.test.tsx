import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

jest.mock('./components/Feed', () => () => <div data-testid="feed">Feed</div>);
jest.mock('./components/Header', () => () => (
  <div data-testid="header">Header</div>
));
jest.mock('./components/MenuMobile', () => () => (
  <div data-testid="menu-mobile">MenuMobile</div>
));
jest.mock('./components/SuggestedBox', () => () => (
  <div data-testid="suggested-box">SuggestedBox</div>
));
jest.mock('./hooks/useIsMobile', () => ({
  useIsMobile: jest.fn(),
}));

import { useIsMobile } from './hooks/useIsMobile';

describe('Home Component', () => {
  it('renders Feed in desktop view', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false);

    render(<Home />);

    expect(screen.getByTestId('feed')).toBeInTheDocument();
    expect(screen.queryByTestId('suggested-box')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-mobile')).not.toBeInTheDocument();

    expect(screen.getByTestId('feed').textContent).toContain('Feed');
  });

  it('renders MenuMobile in mobile view', () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);

    render(<Home />);

    expect(screen.getByTestId('menu-mobile')).toBeInTheDocument();
  });
});

// expect(screen.getByTestId('feed')).not.toBeInTheDocument();
// expect(screen.queryByTestId('suggested-box')).not.toBeInTheDocument();
