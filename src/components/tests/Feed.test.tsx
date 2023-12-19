import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feed from '../Feed';
import { BrowserRouter as Router } from 'react-router-dom';
import { BlogPost } from '../../services/useGetBlogPosts';

jest.mock('../PostItem', () => {
  return ({ post }: { post: BlogPost }) => (
    <div data-testid={`post-item-${post.id}`}>{post.title}</div>
  );
});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Feed', () => {
  const mockPosts = [
    { id: 1, title: 'Test Post 1', body: 'Body of test post 1', userId: 1 },
    { id: 2, title: 'Test Post 2', body: 'Body of test post 2', userId: 2 },
  ];

  it('displays an error message when there is an error', () => {
    render(
      <Router>
        <Feed searchQuery="" isLoading={false} isError={false} posts={[]} />
      </Router>
    );
    expect(screen.getByText(/No posts found./i)).toBeInTheDocument();
  });

  it('displays posts when provided', () => {
    render(
      <Router>
        <Feed
          searchQuery=""
          isLoading={false}
          isError={false}
          posts={mockPosts}
        />
      </Router>
    );
    expect(screen.getByTestId('post-item-1')).toHaveTextContent('Test Post 1');
    expect(screen.getByTestId('post-item-2')).toHaveTextContent('Test Post 2');
  });

  it('filters posts based on search query', () => {
    render(
      <Router>
        <Feed
          searchQuery="2"
          isLoading={false}
          isError={false}
          posts={mockPosts}
        />
      </Router>
    );
    expect(screen.queryByText('Test Post 1')).toBeNull();
    expect(screen.queryByText('Test Post 2')).toBeInTheDocument();
  });
});
