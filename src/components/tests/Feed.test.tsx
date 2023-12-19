import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feed from '../Feed';
import { BrowserRouter as Router } from 'react-router-dom';
import { BlogPost } from '../../services/useGetBlogPosts';

jest.mock('../components/PostItem', () => {
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

  it('displays loading skeleton when loading', () => {
    render(
      <Router>
        <Feed searchQuery="" isLoading={true} isError={false} posts={[]} />
      </Router>
    );
    expect(screen.queryByTestId('post-list')).toBeNull();
  });

  it('displays an error message when there is an error', () => {
    render(
      <Router>
        <Feed searchQuery="" isLoading={false} isError={true} posts={[]} />
      </Router>
    );
    expect(
      screen.getByText('Nenhuma postagem encontrada.')
    ).toBeInTheDocument();
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
    expect(screen.getByTestId('post-item-1')).toHaveTextContent('First Post');
    expect(screen.getByTestId('post-item-2')).toHaveTextContent('Second Post');
  });

  it('filters posts based on search query', () => {
    render(
      <Router>
        <Feed
          searchQuery="Second"
          isLoading={false}
          isError={false}
          posts={mockPosts}
        />
      </Router>
    );
    expect(screen.queryByText('First Post')).toBeNull();
    expect(screen.getByTestId('post-item-2')).toHaveTextContent('Second Post');
  });
});
