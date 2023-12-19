import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuMobile from '../MenuMobile';

describe('MenuMobile Component', () => {
  const mockSetSuggestionOn = jest.fn();

  beforeEach(() => {
    render(<MenuMobile setSuggestionOn={mockSetSuggestionOn} />);
  });

  test('renders MenuMobile component', () => {
    expect(screen.getByLabelText('home')).toBeInTheDocument();
    expect(screen.getByLabelText('suggested')).toBeInTheDocument();
    expect(screen.getByLabelText('account')).toBeInTheDocument();
    expect(screen.getByLabelText('menu')).toBeInTheDocument();
  });

  test('opens and closes the drawer', async () => {
    expect(screen.queryByText('My profile')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('menu'));
    expect(screen.getByText('My profile')).toBeVisible();

    fireEvent.click(screen.getByLabelText('close drawer'));

    await waitFor(() => {
      expect(screen.queryByText('My profile')).not.toBeInTheDocument();
    });
  });

  test('calls setSuggestionOn with correct arguments', () => {
    fireEvent.click(screen.getByLabelText('home'));
    expect(mockSetSuggestionOn).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByLabelText('suggested'));
    expect(mockSetSuggestionOn).toHaveBeenCalledWith(true);
  });

  test('menu items perform correct actions', () => {
    fireEvent.click(screen.getByLabelText('menu'));
    fireEvent.click(screen.getByText('How to use'));
  });
});
