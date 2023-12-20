import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import { useBlogPosts } from '../services/useGetBlogPosts';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../hooks/useIsMobile');
vi.mock('../services/useGetBlogPosts');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Home', () => {
  beforeEach(() => {
    vi.mocked(useBlogPosts).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: false,
      hasMoreBlog: false,
      setPage: vi.fn(),
      totalPages: 1,
    });
  });

  it('renders the Home component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-container')).toBeInTheDocument();
  });

  it('shows the loading state', () => {
    vi.mocked(useBlogPosts).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: true,
      isErrorBlog: false,
      hasMoreBlog: false,
      setPage: vi.fn(),
      totalPages: 0,
    });

    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.getByTestId('loading-box')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows the error message when there is an error', () => {
    vi.mocked(useBlogPosts).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: true,
      hasMoreBlog: false,
      setPage: vi.fn(),
      totalPages: 0,
    });

    render(
      <Router>
        <Home />
      </Router>
    );
    expect(
      screen.getByText('An error has occurred. Try again later.')
    ).toBeInTheDocument();
  });

  it('shows the Pagination component when not loading', () => {
    vi.mocked(useBlogPosts).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: false,
      hasMoreBlog: false,
      setPage: vi.fn(),
      totalPages: 3,
    });

    render(
      <Router>
        <Home />
      </Router>
    );
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent('3');
  });

  it('changes page when a different pagination number is clicked', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const secondPageButton = screen.getByText(/2/);

    await act(async () => {
      fireEvent.click(secondPageButton);
    });
  });
});
