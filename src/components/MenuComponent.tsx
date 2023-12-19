import React from 'react';
import { Menu, MenuItem } from '@mui/material';

interface MenuComponentProps {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
}) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>My profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>How to use</MenuItem>
    <MenuItem onClick={handleMenuClose}>Help</MenuItem>
    <MenuItem onClick={handleMenuClose}>Contact us</MenuItem>
    <MenuItem onClick={handleMenuClose}>Terms and Policies of Use</MenuItem>
  </Menu>
);

export default MenuComponent;
