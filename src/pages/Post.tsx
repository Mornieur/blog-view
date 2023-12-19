import { useParams } from 'react-router-dom';
import { useBlogPosts } from '../services/useGetBlogPosts';
import HeaderPost from '../components/HeaderPost';
import DataPost from '../components/DataPost';
import {
  Box,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import Footer from '../components/Footer';

const boxStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  gap: 3,
};

const LoadingMessage = () => <Typography variant="h5">Loading...</Typography>;
const ErrorMessage = () => (
  <Typography variant="h5">
    Error loading the post or the post does not exist.
  </Typography>
);

interface Params {
  id: string;
  [key: string]: string | undefined;
}

const Post = () => {
  const { id } = useParams<Params>();
  const {
    allInfoBlog,
    isLoadingBlog: isLoading,
    isErrorBlog: isError,
  } = useBlogPosts(id);

  const renderPostData = () => {
    if (isLoading) {
      return (
        <Box sx={boxStyles}>
          <LoadingMessage />
          <CircularProgress />
        </Box>
      );
    }

    if (isError || !allInfoBlog.length) {
      return (
        <Box sx={boxStyles}>
          <ErrorMessage />
        </Box>
      );
    }

    const { title, body } = allInfoBlog[0];
    return <DataPost title={title} body={body} />;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <HeaderPost data-testid="header-post" />
      {renderPostData()}
      <Footer data-testid="footer" />
    </Box>
  );
};

export default Post;
