import { Box, Container } from '@mui/material';
import { useState } from 'react';
import Feed from './components/Feed';
import Header from './components/Header';
import MenuMobile from './components/MenuMobile';
import SuggestedBox from './components/SuggestedBox';
import { useIsMobile } from './hooks/useIsMobile';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionView, setSuggestionView] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ececec',
        position: 'relative',
        paddingBottom: '56px',
      }}
      data-testid="home-container"
    >
      <Header setSearchQuery={setSearchQuery} data-testid="header-component" />
      <Container
        sx={{ display: 'flex', padding: 2, gap: 1, justifyContent: 'center' }}
        data-testid="content-container"
      >
        {isMobile ? (
          suggestionView ? (
            <SuggestedBox data-testid="suggested-box" />
          ) : (
            <Feed searchQuery={searchQuery} data-testid="feed" />
          )
        ) : (
          <Box
            sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
            data-testid="desktop-content"
          >
            <Feed searchQuery={searchQuery} data-testid="feed" />
            <SuggestedBox data-testid="suggested-box" />
          </Box>
        )}
      </Container>
      {isMobile && (
        <MenuMobile
          setSuggestionOn={setSuggestionView}
          data-testid="menu-mobile"
        />
      )}
    </Box>
  );
};

export default Home;
