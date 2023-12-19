import React from 'react';
import { List, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import SuggestionItem from './SuggestionItem';

interface Suggestion {
  id: number;
  text: string;
}

const suggestions: Suggestion[] = [
  { id: 1, text: 'Suggestion 1' },
  { id: 2, text: 'Suggestion 2' },
  { id: 3, text: 'Suggestion 3' },
  { id: 4, text: 'Suggestion 4' },
  { id: 5, text: 'Suggestion 5' },
  { id: 6, text: 'Suggestion 6' },
];

const boxStyles: SxProps<Theme> = {
  display: 'flex',
  backgroundColor: '#fff',
  flex: 'auto',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  borderRadius: '10px',
  mt: '1rem',
};

const typographyStyles: SxProps<Theme> = {
  color: '#6e3296',
  fontWeight: '600',
  p: '10px',
  boxShadow: '0 1px 5px -2px rgba(0,0,0,.2)',
};

const listStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 0',
};

const SuggestedBox: React.FC = () => (
  <div style={boxStyles as React.CSSProperties}>
    <Typography variant="body1" sx={typographyStyles}>
      Suggested for you
    </Typography>
    <article style={{ overflowY: 'auto' }}>
      <List sx={listStyles}>
        {suggestions.map((suggestion) => (
          <SuggestionItem key={suggestion.id} text={suggestion.text} />
        ))}
      </List>
    </article>
  </div>
);

export default SuggestedBox;
