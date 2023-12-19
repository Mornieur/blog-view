import { useParams } from 'react-router-dom';
import { useBlogPosts } from '../services/useGetBlogPosts';
import HeaderPost from '../components/HeaderPost';
import DataPost from '../components/DataPost';
import { Box } from '@mui/material';
import Footer from '../components/Footer';

const LoadingMessage = () => <h1>Carregando...</h1>;
const ErrorMessage = () => (
  <h1>Erro ao carregar o post ou o post não existe.</h1>
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
      return <LoadingMessage />;
    }

    if (isError || !allInfoBlog.length) {
      return <ErrorMessage />;
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
