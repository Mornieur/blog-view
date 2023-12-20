import React from 'react';
import { Box, Typography, Container, SxProps, Theme } from '@mui/material';

const footerStyles: SxProps<Theme> = {
  bgcolor: '#6e3296',
  color: 'white',
  padding: '0.5rem 0',
  width: '100%',
  position: 'fixed',
  bottom: 0,
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box sx={footerStyles}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Blog View
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          © {year} Blog View Company. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
