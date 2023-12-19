import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Feed from '../components/Feed';
import Header from '../components/Header';
import MenuMobile from '../components/MenuMobile';
import SuggestedBox from '../components/SuggestedBox';
import { useIsMobile } from '../hooks/useIsMobile';
import { useBlogPosts } from '../services/useGetBlogPosts';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionView, setSuggestionView] = useState(false);
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();

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
  };

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
      }}
      data-testid="home-container"
    >
      <Header setSearchQuery={setSearchQuery} data-testid="header-component" />
      {isLoading ? (
        <Box
          data-testid="loading-box"
          sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}
        >
          <CircularProgress />
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', marginTop: 2 }}
          >
            Carregando...
          </Typography>
        </Box>
      ) : (
        <Container
          sx={{ display: 'flex', padding: 2, gap: 1, justifyContent: 'center' }}
          data-testid="content-container"
        >
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
            <Box
              sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
              data-testid="desktop-content"
            >
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
          Ocorreu um erro. Tente novamente mais tarde.
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
          data-testId="pagination"
          sx={{
            backgroundColor: '#fff',
            p: 1,
            borderRadius: '10px',
          }}
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
