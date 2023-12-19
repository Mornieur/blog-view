import React, { useCallback, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface MenuMobileProps {
  setSuggestionOn: (suggestionOn: boolean) => void;
}

const drawerWidth = 240;

const MenuMobile: React.FC<MenuMobileProps> = ({ setSuggestionOn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const menuItems = [
    { text: 'My profile', action: () => {} },
    { text: 'How to use', action: () => {} },
    { text: 'Help', action: () => {} },
    { text: 'Contact us', action: () => {} },
    { text: 'Terms and Policies of Use', action: () => {} },
    { text: 'Logout', action: () => {} },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          backgroundColor: '#6e3296',
          color: 'white',
          boxShadow: '0 -2px 5px 0 rgba(0,0,0,0.2)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            onClick={() => setSuggestionOn(false)}
            color="inherit"
            aria-label="home"
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            onClick={() => setSuggestionOn(true)}
            color="inherit"
            aria-label="suggested"
          >
            <MailIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="account">
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            onClick={handleDrawerToggle}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <IconButton onClick={handleDrawerToggle} aria-label="close drawer">
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItemButton key={item.text} onClick={item.action}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MenuMobile;
