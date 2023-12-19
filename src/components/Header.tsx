import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import FaceIcon from '@mui/icons-material/Face';
import { SearchBar } from './Search';
import { useIsMobile } from '../hooks/useIsMobile';
import MenuComponent from './MenuComponent';

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
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#6e3296',
        width: '100%',
        display: 'flex',
        gap: 1,
      }}
    >
      <Toolbar>
        <AccountCircleIcon
          sx={{ color: '#fff', mr: 1, fontSize: '3rem', display: 'flex' }}
        />
        <SearchBar setSearchQuery={setSearchQuery} />
        {!isMobile && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                placeContent: 'center',
                width: '80%',
                padding: '0 1rem',
                alignSelf: 'center',
              }}
            >
              <Typography
                sx={{ color: '#fff', fontWeight: 'bold', mr: 10 }}
                variant="h6"
              >
                My Blog
              </Typography>
            </div>
            <article>
              <ListItem
                alignItems="flex-start"
                sx={{
                  gap: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pr: 0,
                }}
              >
                <FaceIcon
                  sx={{ color: '#fff', marginRight: 1, fontSize: '3rem' }}
                />
                <ListItemText
                  primary="User"
                  secondary="Logout"
                  sx={{
                    flex: '1 1 auto',
                    color: '#fff',
                    mr: 4,
                    '& .MuiListItemText-primary': { fontWeight: 600 },
                    '& .MuiListItemText-secondary': { color: '#fff' },
                  }}
                />
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleMenuOpen}
                  sx={{ color: '#fff' }}
                >
                  <MenuIcon sx={{ fontSize: '3rem' }} />
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
