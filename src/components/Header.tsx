import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ListItem,
  ListItemText,
  SxProps,
  Theme,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import FaceIcon from '@mui/icons-material/Face';
import { SearchBar } from './Search';
import { useIsMobile } from '../hooks/useIsMobile';
import MenuComponent from './MenuComponent';

const appBarStyles: SxProps<Theme> = {
  backgroundColor: '#6e3296',
  width: '100%',
  display: 'flex',
  gap: 1,
};

const accountIconStyles: SxProps<Theme> = {
  color: '#fff',
  mr: 1,
  fontSize: '3rem',
  display: 'flex',
};

const divStyles = {
  display: 'flex',
  alignItems: 'center',
  placeContent: 'center',
  width: '80%',
  padding: '0 1rem',
  alignSelf: 'center',
};

const typographyStyles: SxProps<Theme> = {
  color: '#fff',
  fontWeight: 'bold',
  mr: 10,
};

const listItemStyles: SxProps<Theme> = {
  gap: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pr: 0,
};

const faceIconStyles: SxProps<Theme> = {
  color: '#fff',
  marginRight: 1,
  fontSize: '3rem',
};

const listItemTextStyles: SxProps<Theme> = {
  flex: '1 1 auto',
  color: '#fff',
  mr: 4,
  '& .MuiListItemText-primary': { fontWeight: 600 },
  '& .MuiListItemText-secondary': { color: '#fff' },
};

const iconButtonStyles: SxProps<Theme> = {
  color: '#fff',
};

export const menuIconStyles: SxProps<Theme> = {
  fontSize: '3rem',
};

interface HeaderProps {
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useIsMobile();
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={appBarStyles}>
      <Toolbar>
        <AccountCircleIcon sx={accountIconStyles} />
        <SearchBar setSearchQuery={setSearchQuery} />
        {!isMobile && (
          <>
            <div style={divStyles}>
              <Typography sx={typographyStyles} variant="h6">
                My Blog
              </Typography>
            </div>
            <article>
              <ListItem alignItems="flex-start" sx={listItemStyles}>
                <FaceIcon sx={faceIconStyles} />
                <ListItemText
                  primary="User"
                  secondary="Logout"
                  sx={listItemTextStyles}
                />
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleMenuOpen}
                  sx={iconButtonStyles}
                >
                  <MenuIcon sx={menuIconStyles} />
                </IconButton>
              </ListItem>
            </article>
          </>
        )}
        <MenuComponent
          anchorEl={anchorEl}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
