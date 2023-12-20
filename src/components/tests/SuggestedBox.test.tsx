import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuggestedBox from '../SuggestedBox';
import { describe, test, expect } from 'vitest';

describe('SuggestedBox Component', () => {
  test('renders SuggestedBox component with title and suggestions', () => {
    render(<SuggestedBox />);

    const titleElement = screen.getByText('Suggested for you');
    expect(titleElement).toBeInTheDocument();

    const suggestions = screen.getAllByText(/Suggestion/);
    expect(suggestions).toHaveLength(6);

    suggestions.forEach((suggestion, index) => {
      expect(suggestion).toHaveTextContent(`Suggestion ${index + 1}`);
    });
  });
});
