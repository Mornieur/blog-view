import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography, Button, SxProps, Theme } from '@mui/material';

const boxErrorStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#6e3296',
  overflow: 'hidden',
  p: 0,
  borderRadius: 0,
};

const buttonStyles: SxProps<Theme> = {
  mt: 2,
  backgroundColor: '#f98404',
  color: '#fff',
  fontWeight: 'bold',
};

const errorIconStyles: SxProps<Theme> = {
  fontSize: 50,
  color: '#f98404',
  p: 1,
};

const Error404: React.FC = () => {
  return (
    <Box
      textAlign="center"
      p={4}
      bgcolor="white"
      borderRadius={4}
      boxShadow={3}
      sx={boxErrorStyles}
    >
      <ErrorOutlineIcon sx={errorIconStyles} />
      <Typography variant="h4" component="h1" color="white" gutterBottom>
        Error 404
      </Typography>
      <img
        src={require('../assets/error-404.png')}
        alt="Error 404"
        style={{
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
      <Typography variant="h6" sx={{ p: 1 }} color="white">
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={buttonStyles}
        role="button"
      >
        Go Home
      </Button>
    </Box>
  );
};

export default Error404;
