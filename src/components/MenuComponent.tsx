import React from 'react';
import { Menu } from '@mui/material';
import MenuItemComponent from './MenuItemComponent';

interface MenuComponentProps {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
}) => {
  const menuItems = [
    'My profile',
    'How to use',
    'Help',
    'Contact us',
    'Terms and Policies of Use',
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuItems.map((item) => (
        <MenuItemComponent
          key={item}
          text={item}
          handleMenuClose={handleMenuClose}
        />
      ))}
    </Menu>
  );
};

export default MenuComponent;
