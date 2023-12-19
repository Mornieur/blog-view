import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase } from '@mui/material';
import { useIsMobile } from '../hooks/useIsMobile';

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');
  const isMobile = useIsMobile();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '2rem',
        width: isMobile ? '100%' : '20%',
      }}
    >
      <SearchIcon sx={{ color: '#6e3296', p: '8px', ml: '1rem' }} />
      <InputBase
        value={inputValue}
        onChange={handleInputChange}
        sx={{
          color: '#000000',
          backgroundColor: '#fff',
          pl: '1rem',
          pr: '2px',
          width: '100%',
        }}
        placeholder="Pesquisar..."
      />
      <IconButton
        type="submit"
        aria-label="search"
        sx={{ p: '10px', color: '#6e3296' }}
      />
    </form>
  );
};
