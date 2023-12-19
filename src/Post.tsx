import { useParams } from 'react-router-dom';
import { useBlogPosts } from './services/useGetBlogPosts';
import HeaderPost from './components/HeaderPost';
import DataPost from './components/DataPost';
import { Box } from '@mui/material';
import Footer from './components/Footer';

const Post = () => {
  const { id } = useParams();
  const {
    allInfoBlog,
    isLoadingBlog: isLoading,
    isErrorBlog: isError,
  } = useBlogPosts(id);

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
      <HeaderPost />
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : isError || !allInfoBlog.length ? (
        <h1>Erro ao carregar o post ou o post não existe.</h1>
      ) : (
        <DataPost title={allInfoBlog[0].title} body={allInfoBlog[0].body} />
      )}
      <Footer />
    </Box>
  );
};

export default Post;
