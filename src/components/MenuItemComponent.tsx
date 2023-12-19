import React from 'react';
import { MenuItem } from '@mui/material';

interface MenuItemComponentProps {
  text: string;
  handleMenuClose: () => void;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  text,
  handleMenuClose,
}) => <MenuItem onClick={handleMenuClose}>{text}</MenuItem>;

export default MenuItemComponent;
