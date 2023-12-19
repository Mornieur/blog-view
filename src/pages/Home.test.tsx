import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';
import { useBlogPosts } from '../services/useGetBlogPosts';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../hooks/useIsMobile');
jest.mock('../services/useGetBlogPosts');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: false,
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
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: true,
      isErrorBlog: false,
      totalPages: 0,
    });

    render(<Home />);
    expect(screen.getByTestId('loading-box')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows the error message when there is an error', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: true,
      totalPages: 0,
    });

    render(<Home />);
    expect(
      screen.getByText('An error has occurred. Try again later.')
    ).toBeInTheDocument();
  });

  it('shows the Pagination component when not loading', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: false,
      totalPages: 3,
    });

    render(<Home />);
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent('3');
  });

  it('changes page when a different pagination number is clicked', async () => {
    render(<Home />);
    const secondPageButton = screen.getByText(/2/);

    await act(async () => {
      fireEvent.click(secondPageButton);
    });
  });
});
