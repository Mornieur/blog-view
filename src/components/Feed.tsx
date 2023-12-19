import React from 'react';
import { List, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../services/useGetBlogPosts';
import PostItem from './PostItem';

type FeedProps = {
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  posts: BlogPost[];
};

const Feed: React.FC<FeedProps> = ({
  searchQuery,
  isLoading,
  isError,

  posts,
}) => {
  const navigate = useNavigate();

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <List
        data-testid="post-list"
        sx={{
          margin: '0 2rem',
          padding: '0 0.5rem',
          width: '100%',
          maxWidth: 700,
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}
      >
        {!isLoading && !isError && filteredPosts.length === 0 && (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Nenhuma postagem encontrada.
          </Typography>
        )}
        {!isLoading &&
          !isError &&
          filteredPosts.length > 0 &&
          filteredPosts.map((post, index) => (
            <PostItem
              key={post.id}
              post={post}
              isLast={filteredPosts.length === index + 1}
            />
          ))}
      </List>
    </div>
  );
};

export default Feed;
