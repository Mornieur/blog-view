import React from 'react';
import { ListItem, Skeleton, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

interface SuggestionItemProps {
  text: string;
}

const listItemStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const SuggestionItem: React.FC<SuggestionItemProps> = ({ text }) => (
  <ListItem sx={listItemStyles}>
    <Skeleton
      data-testid="skeleton"
      variant="circular"
      width={40}
      height={40}
    />
    <Typography variant="body1" sx={{ color: '#000' }}>
      {text}
    </Typography>
  </ListItem>
);

export default SuggestionItem;
