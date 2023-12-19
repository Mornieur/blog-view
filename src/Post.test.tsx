import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Post from './Post';
import { MemoryRouter } from 'react-router-dom';
import { useBlogPosts } from './services/useGetBlogPosts';

jest.mock('./services/useGetBlogPosts', () => ({
  useBlogPosts: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('<Post />', () => {
  it('renders loading state initially', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: true,
      isErrorBlog: false,
    });

    renderWithRouter(<Post />);
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it('renders error message when there is an error', async () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: true,
    });

    renderWithRouter(<Post />);
    expect(
      screen.getByText(/Erro ao carregar o post ou o post não existe./i)
    ).toBeInTheDocument();
  });

  it('renders the post data when loading is complete', async () => {
    const mockPostData = { title: 'Test Title', body: 'Test Body' };
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [mockPostData],
      isLoadingBlog: false,
      isErrorBlog: false,
    });

    renderWithRouter(<Post />);
    await waitFor(() => {
      expect(screen.getByText(mockPostData.title)).toBeInTheDocument();
      expect(screen.getByText(mockPostData.body)).toBeInTheDocument();
    });
  });
});
