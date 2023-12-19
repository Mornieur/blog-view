import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography, Button, Container } from '@mui/material';

const boxErrorStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#000',
  overflow: 'hidden',
  p: 0,
  borderRadius: 0,
};

const containerErrorStyles = {
  maxWidth: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: '10px',
  backgroundColor: '#fff',
  p: 5,
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
      <Container maxWidth="sm" sx={containerErrorStyles}>
        <ErrorOutlineIcon sx={{ fontSize: 50, color: 'orange' }} />
        <Typography variant="h4" component="h1" color="error" gutterBottom>
          Error 404
        </Typography>
        <Typography variant="body1" color="textSecondary">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#6e3296' }}
          role="button"
        >
          Go Home
        </Button>
      </Container>
    </Box>
  );
};

export default Error404;
