import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const HeaderPost = () => {
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#6e3296' }}>
      <Toolbar>
        <IconButton
          edge="start"
          onClick={handleBackPage}
          color="inherit"
          aria-label="back"
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog Post
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPost;
