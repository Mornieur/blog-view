import React from 'react';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

import { BlogPost } from '../services/useGetBlogPosts';
import PostItem from './PostItem';

type FeedProps = {
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  posts: BlogPost[];
};

const listItemStylesError: SxProps<Theme> = {
  mb: 1,
  gap: 1,
  display: 'flex',
  flexDirection: 'column',
};

const typographyStylesError: SxProps<Theme> = {
  variant: 'body1',
  color: '#4a494a',
  fontWeight: 600,
  width: '100%',
};

const boxNotFound: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  mb: 1,
  ml: 0.5,
  mt: 1,
  maxWidth: 700,
  width: '100%',
  height: '100vh',
  textAlign: 'center',
  alignItems: 'center',
};

const postListStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '0 2rem',
  padding: '0 0.5rem',
  width: '100%',
  maxWidth: 700,
  borderRadius: '10px',
  backgroundColor: '#fff',
};

const Feed: React.FC<FeedProps> = ({
  searchQuery,
  isLoading,
  isError,
  posts,
}) => {
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <List data-testid="post-list" sx={postListStyle}>
      {isError && (
        <ListItem sx={listItemStylesError}>
          <Typography
            sx={typographyStylesError}
            variant="body1"
            data-testid="error-message"
          >
            Error loading posts.
          </Typography>
        </ListItem>
      )}

      {!isLoading && !isError && filteredPosts.length === 0 && (
        <Box sx={boxNotFound}>
          <Typography sx={typographyStylesError} variant="body1">
            No posts found.
          </Typography>
        </Box>
      )}

      {!isLoading &&
        !isError &&
        filteredPosts.length > 0 &&
        filteredPosts.map((post) => <PostItem key={post.id} post={post} />)}

      {isLoading && (
        <ListItem data-testid="loading-indicator" sx={listItemStylesError}>
          Loading...
          <CircularProgress />
        </ListItem>
      )}
    </List>
  );
};

export default Feed;
