import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SuggestionItem from '../SuggestionItem';

describe('SuggestionItem', () => {
  it('renders the suggestion text correctly', () => {
    const testText = 'Test Suggestion';

    render(<SuggestionItem text={testText} />);

    const suggestionText = screen.getByText(testText);
    expect(suggestionText).toBeInTheDocument();
    expect(suggestionText).toHaveStyle('color: #000');
  });

  it('renders a skeleton image', () => {
    render(<SuggestionItem text="Test Suggestion" />);

    const skeletonImage = screen.getByTestId('skeleton');
    expect(skeletonImage).toBeInTheDocument();
  });
});
