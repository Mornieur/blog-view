import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase } from '@mui/material';
import { useIsMobile } from '../hooks/useIsMobile';
import { SxProps, Theme } from '@mui/system';

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const formStyles = (isMobile: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: '2rem',
  width: isMobile ? '100%' : '20%',
});

const searchIconStyles: SxProps<Theme> = {
  color: '#6e3296',
  p: '8px',
  ml: '1rem',
};

const inputBaseStyles: SxProps<Theme> = {
  color: '#000000',
  backgroundColor: '#fff',
  pl: '1rem',
  pr: '2px',
  width: '100%',
};

const iconButtonStyles: SxProps<Theme> = {
  p: '10px',
  color: '#6e3296',
};

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
    <form onSubmit={handleSubmit} role="search" style={formStyles(isMobile)}>
      <SearchIcon sx={searchIconStyles} />
      <InputBase
        value={inputValue}
        onChange={handleInputChange}
        sx={inputBaseStyles}
        placeholder="Pesquisar..."
      />
      <IconButton type="submit" aria-label="search" sx={iconButtonStyles} />
    </form>
  );
};
