import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Post from './Post';
import { useParams } from 'react-router-dom';
import { useBlogPosts } from '../services/useGetBlogPosts';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: () => jest.fn(),
}));
jest.mock('../services/useGetBlogPosts');

describe('Post', () => {
  it('renders loading message when loading', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: true,
      isErrorBlog: false,
    });

    render(<Post />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: true,
    });

    render(<Post />);
    expect(
      screen.getByText('Error loading the post or the post does not exist.')
    ).toBeInTheDocument();
  });

  it('renders the post data when not loading and no error', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [
        {
          id: 1,
          userId: 1,
          title: 'Test Title',
          body: 'Test Body',
        },
      ],
      isLoadingBlog: false,
      isErrorBlog: false,
    });

    render(<Post />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });
});
