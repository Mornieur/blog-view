import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../Search';
import { useIsMobile } from '../../hooks/useIsMobile';

jest.mock('../../hooks/useIsMobile', () => ({
  useIsMobile: jest.fn(),
}));

describe('SearchBar Component', () => {
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    (useIsMobile as jest.Mock).mockReturnValue(false);
    render(<SearchBar setSearchQuery={mockSetSearchQuery} />);
  });

  test('renders SearchBar component', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  test('updates input value and calls setSearchQuery on change', () => {
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test query');
  });

  test('submits form and calls setSearchQuery', () => {
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test submit' } });
    fireEvent.submit(screen.getByRole('search'));
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test submit');
  });
});
