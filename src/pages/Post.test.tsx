import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from './Post';
import { useParams } from 'react-router-dom';
import { useBlogPosts } from '../services/useGetBlogPosts';
import { describe, it, expect, vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: () => vi.fn(),
  };
});
vi.mock('../services/useGetBlogPosts');

describe('Post', () => {
  it('renders loading message when loading', () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useBlogPosts).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: true,
      isErrorBlog: false,
      totalPages: 1,
      hasMoreBlog: false,
      setPage: vi.fn(),
    });

    render(<Post />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useBlogPosts).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: true,
      hasMoreBlog: false,
      setPage: vi.fn(),
      totalPages: 1,
    });

    render(<Post />);
    expect(
      screen.getByText('Error loading the post or the post does not exist.')
    ).toBeInTheDocument();
  });

  it('renders the post data when not loading and no error', () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useBlogPosts).mockReturnValue({
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
      hasMoreBlog: false,
      setPage: vi.fn(),
      totalPages: 1,
    });

    render(<Post />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });
});
