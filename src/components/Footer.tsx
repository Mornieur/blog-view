import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#6e3296',
        color: 'white',
        padding: '0.5rem 0',
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          My Blog
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          © {new Date().getFullYear()} My Blog Company. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
