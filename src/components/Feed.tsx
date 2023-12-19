import React, { useCallback, useRef } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Button,
  Box,
  Skeleton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BlogPost, useBlogPosts } from '../services/useGetBlogPosts';

const Feed: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const navigate = useNavigate();
  const {
    allInfoBlog: posts,
    isLoadingBlog: isLoading,
    isErrorBlog: isError,
    hasMoreBlog: hasMore,
    setPage,
  } = useBlogPosts();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPage]
  );

  const handleDataBlog = (post: BlogPost) => {
    navigate(`/post/${post.id}`);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <List
      data-testid="post-list"
      sx={{
        margin: 2,
        padding: '1rem 0.5rem',
        width: '100%',
        maxWidth: 700,
        borderRadius: '10px',
        backgroundColor: '#fff',
      }}
    >
      {isLoading && (
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
      )}
      {!isLoading && isError && (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Ocorreu um erro. Tente novamente mais tarde.
        </Typography>
      )}
      {!isLoading && !isError && filteredPosts.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Nenhuma postagem encontrada.
        </Typography>
      )}
      {!isLoading &&
        !isError &&
        filteredPosts.length > 0 &&
        filteredPosts.map((post, index) => (
          <ListItem
            data-testid={`post-item-${post.id}`}
            key={post.id}
            alignItems="flex-start"
            sx={{
              mb: 1,
              gap: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
            ref={filteredPosts.length === index + 1 ? lastPostElementRef : null}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                mb: 1,
                ml: 0.5,
              }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Typography
                variant="body1"
                color={'#4a494a'}
                sx={{ fontWeight: 600 }}
              >
                Name
              </Typography>
            </Box>
            <Typography variant="h6" color={'#4a494a'} sx={{ fontWeight: 600 }}>
              {post.title}
            </Typography>
            <Skeleton variant="rectangular" width={'100%'} height={300} />
            <ListItemText
              primary={<Typography variant="h6">{post.title}</Typography>}
              secondary={post.body.substring(0, 100) + '...'}
              sx={{ margin: '1rem 0' }}
            />
            <Button
              data-testid={`read-more-button-${post.id}`}
              variant="contained"
              sx={{
                backgroundColor: '#6e3296',
                padding: '10px 20px',
                lineHeight: 0,
                border: 'medium',
                maxWidth: '200px',
                height: '30px',
                alignSelf: 'flex-end',
                mr: 3,
              }}
              onClick={() => handleDataBlog(post)}
            >
              Read More
            </Button>
          </ListItem>
        ))}
    </List>
  );
};

export default Feed;
