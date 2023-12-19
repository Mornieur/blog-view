import React from 'react';
import { List, ListItem, Skeleton, Typography } from '@mui/material';

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

const SuggestedBox = () => {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#fff',
        flex: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderRadius: '10px',
        marginTop: '1rem',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: '#6e3296',
          fontWeight: '600',
          p: '10px',
          boxShadow: '0 1px 5px -2px rgba(0,0,0,.2)',
        }}
      >
        Suggested for you
      </Typography>
      <article style={{ overflowY: 'auto' }}>
        <List
          sx={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}
        >
          {suggestions.map((suggestion) => (
            <ListItem
              key={suggestion.id}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Typography variant="body1" sx={{ color: '#000' }}>
                {suggestion.text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </article>
    </div>
  );
};

export default SuggestedBox;
