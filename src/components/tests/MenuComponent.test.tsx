import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuComponent from '../MenuComponent';

describe('MenuComponent', () => {
  const mockHandleMenuClose = jest.fn();

  const renderMenu = (isMenuOpen: boolean) =>
    render(
      <MenuComponent
        anchorEl={document.createElement('div')}
        isMenuOpen={isMenuOpen}
        handleMenuClose={mockHandleMenuClose}
      />
    );

  test('renders menu items when open', () => {
    renderMenu(true);
    expect(screen.getByText('My profile')).toBeInTheDocument();
    expect(screen.getByText('How to use')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Contact us')).toBeInTheDocument();
    expect(screen.getByText('Terms and Policies of Use')).toBeInTheDocument();
  });

  test('does not render menu items when closed', () => {
    renderMenu(false);
    expect(screen.queryByText('My profile')).not.toBeVisible();
    expect(screen.queryByText('How to use')).not.toBeVisible();
  });

  test('calls handleMenuClose on menu item click', () => {
    renderMenu(true);
    fireEvent.click(screen.getByText('My profile'));
    expect(mockHandleMenuClose).toHaveBeenCalledTimes(1);
  });
});
