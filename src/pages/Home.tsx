import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Feed from '../components/Feed';
import Header from '../components/Header';
import MenuMobile from '../components/MenuMobile';
import SuggestedBox from '../components/SuggestedBox';
import { useIsMobile } from '../hooks/useIsMobile';
import { useBlogPosts } from '../services/useGetBlogPosts';

const loadingStyles: SxProps<Theme> = {
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  gap: 4,
};

const paginationStyles: SxProps<Theme> = {
  backgroundColor: '#fff',
  p: 1,
  mb: 5,
  borderRadius: '10px',
};

const contentContainerStyles: SxProps<Theme> = {
  display: 'flex',
  padding: 2,
  gap: 1,
  justifyContent: 'center',
};

const homeStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#ececec',
  position: 'relative',
  mb: 4,
};

const desktopContentStyles = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionView, setSuggestionView] = useState(false);
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const {
    allInfoBlog: posts,
    isLoadingBlog: isLoading,
    isErrorBlog: isError,
    totalPages,
  } = useBlogPosts('', page);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setTimeout(() => {
      const element = document.getElementById('posts-list');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <Box sx={homeStyles} data-testid="home-container">
      <Header setSearchQuery={setSearchQuery} data-testid="header-component" />
      {isLoading ? (
        <Box data-testid="loading-box" sx={loadingStyles}>
          <Typography variant="h5">Loading...</Typography>
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={contentContainerStyles} data-testid="content-container">
          {isMobile ? (
            suggestionView ? (
              <SuggestedBox data-testid="suggested-box" />
            ) : (
              <Feed
                searchQuery={searchQuery}
                data-testid="feed"
                isError={isError}
                isLoading={isLoading}
                posts={posts}
              />
            )
          ) : (
            <Box sx={desktopContentStyles} data-testid="desktop-content">
              <Feed
                searchQuery={searchQuery}
                data-testid="feed"
                isError={isError}
                isLoading={isLoading}
                posts={posts}
              />
              <SuggestedBox data-testid="suggested-box" />
            </Box>
          )}
        </Container>
      )}
      {!isLoading && isError && (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          An error has occurred. Try again later.
        </Typography>
      )}

      {!isLoading && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
          size="large"
          data-testid="pagination"
          sx={paginationStyles}
        />
      )}

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
