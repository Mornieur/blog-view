import React from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  Skeleton,
  SxProps,
  Theme,
} from '@mui/material';
import { BlogPost } from '../services/useGetBlogPosts';
import { useNavigate } from 'react-router-dom';

type PostItemProps = {
  post: BlogPost;
  isLast: boolean;
};

const listItemStyles: SxProps<Theme> = {
  mb: 1,
  gap: 1,
  display: 'flex',
  flexDirection: 'column',
};

const boxStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
  mb: 1,
  ml: 0.5,
  mt: 1,
};

const typographyStyles: SxProps<Theme> = {
  variant: 'body1',
  color: '#4a494a',
  fontWeight: 600,
};

const buttonStyles: SxProps<Theme> = {
  backgroundColor: '#6e3296',
  padding: '10px 20px',
  lineHeight: 0,
  border: 'medium',
  maxWidth: '200px',
  height: '30px',
  alignSelf: 'flex-end',
  mr: 3,
};

const PostItem: React.FC<PostItemProps> = ({ post, isLast }) => {
  const navigate = useNavigate();

  const handleDataBlog = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <ListItem
      data-testid={`post-item-${post.id}`}
      key={post.id}
      alignItems="flex-start"
      sx={listItemStyles}
    >
      <Box sx={boxStyles}>
        <Skeleton variant="circular" width={40} height={40} />
        <Typography sx={typographyStyles}>Name</Typography>
      </Box>
      <Typography variant="h6" sx={typographyStyles}>
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
        sx={buttonStyles}
        onClick={handleDataBlog}
      >
        Read More
      </Button>
    </ListItem>
  );
};

export default PostItem;
