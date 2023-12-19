import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from '../Feed';

describe('Feed Component', () => {
  const mockPosts = [
    { id: 1, title: 'Test Post 1', body: 'Body of test post 1', userId: 1 },
    { id: 2, title: 'Test Post 2', body: 'Body of test post 2', userId: 2 },
  ];

  it('renders the Feed component', () => {
    render(
      <Feed
        searchQuery=""
        isLoading={false}
        isError={false}
        posts={mockPosts}
      />
    );

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('displays loading skeleton when isLoading is true', () => {
    render(<Feed searchQuery="" isLoading={true} isError={false} posts={[]} />);

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('displays error message when isError is true', () => {
    render(<Feed searchQuery="" isLoading={false} isError={true} posts={[]} />);

    expect(
      screen.getByText('An error occurred while fetching posts.')
    ).toBeInTheDocument();
  });
});
