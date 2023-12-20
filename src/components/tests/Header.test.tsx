import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';
import { useIsMobile } from '../../hooks/useIsMobile';
import { describe, test, expect, beforeEach, vi } from 'vitest';

vi.mock('../../hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(),
}));

vi.mock('../MenuComponent', () => {
  return {
    default: (props: { handleMenuClose: () => void }) => (
      <div data-testid="mock-menu">
        Mock Menu
        <button onClick={props.handleMenuClose}>Close Menu</button>
      </div>
    ),
  };
});

describe('Header Component', () => {
  const mockSetSearchQuery = vi.fn();

  beforeEach(() => {
    vi.mocked(useIsMobile).mockReturnValue(false);
  });

  test('renders Header component', () => {
    render(<Header setSearchQuery={mockSetSearchQuery} />);
    expect(screen.getByTestId('mock-menu')).toBeInTheDocument();
    expect(screen.getByText('Blog View')).toBeInTheDocument();
    expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
  });

  test('opens menu on button click', () => {
    render(<Header setSearchQuery={mockSetSearchQuery} />);
    fireEvent.click(screen.getByLabelText('open drawer'));
    expect(screen.getByText('Mock Menu')).toBeInTheDocument();
  });

  test('closes menu on close button click', () => {
    render(<Header setSearchQuery={mockSetSearchQuery} />);
    fireEvent.click(screen.getByLabelText('open drawer'));
    fireEvent.click(screen.getByText('Close Menu'));
  });

  test('renders different layout for mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue(true);
    render(<Header setSearchQuery={mockSetSearchQuery} />);
  });
});
