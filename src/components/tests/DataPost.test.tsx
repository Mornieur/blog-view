import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataPost from '../DataPost';

describe('DataPost Component', () => {
  it('renders the title and body', () => {
    const title = 'Test Title';
    const body = 'This is the body of the post.';

    render(<DataPost title={title} body={body} />);

    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();

    expect(screen.getByText(body)).toBeInTheDocument();
  });

  it('has a skeleton before image load', () => {
    render(<DataPost title="" body="" />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
