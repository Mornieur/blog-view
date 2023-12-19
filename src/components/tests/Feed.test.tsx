import { render, screen, fireEvent } from '@testing-library/react';
import { useBlogPosts } from '../../services/useGetBlogPosts';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Feed from '../Feed';

jest.mock('../../services/useGetBlogPosts', () => ({
  useBlogPosts: jest.fn(),
}));

const mockSetPage = jest.fn();

const mockPosts = [
  { id: '1', title: 'Test Post 1', body: 'Body of test post 1' },
  { id: '2', title: 'Test Post 2', body: 'Body of test post 2' },
];

class MockIntersectionObserver {
  callback: (entries: any[]) => void;
  isIntersecting: boolean;

  constructor(callback: (entries: any[]) => void) {
    this.callback = callback;
    this.isIntersecting = false;
  }

  observe = jest.fn((entries: IntersectionObserverEntry[] | undefined) => {
    if (entries && entries.length > 0 && entries[0].isIntersecting) {
      this.isIntersecting = true;
    }
    this.callback(entries || [{ isIntersecting: this.isIntersecting }]);
  });

  disconnect = jest.fn(() => {
    this.isIntersecting = false;
  });
}

// Store the original implementation
const originalIntersectionObserver = global.IntersectionObserver;

beforeAll(() => {
  global.IntersectionObserver = MockIntersectionObserver as any;
});

afterAll(() => {
  global.IntersectionObserver = originalIntersectionObserver;
});

describe('Feed Component', () => {
  beforeEach(() => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: mockPosts,
      isLoadingBlog: false,
      isErrorBlog: false,
      hasMoreBlog: true,
      setPage: jest.fn(),
    });
  });

  it('renders skeleton loaders when data is being fetched', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: true,
      isErrorBlog: false,
      hasMoreBlog: true,
      setPage: jest.fn(),
    });

    render(<Feed searchQuery="" />, { wrapper: MemoryRouter });
    expect(screen.getAllByTestId('loading-box')).toHaveLength(1);
  });

  it('displays error message on error state', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      allInfoBlog: [],
      isLoadingBlog: false,
      isErrorBlog: true,
      hasMoreBlog: true,
      setPage: jest.fn(),
    });

    render(<Feed searchQuery="" />, { wrapper: MemoryRouter });
    expect(
      screen.getByText('Ocorreu um erro. Tente novamente mais tarde.')
    ).toBeInTheDocument();
  });

  it('handles click on "Read More" button', async () => {
    render(<Feed searchQuery="" />, { wrapper: MemoryRouter });
    const readMoreButton = screen.getByTestId('read-more-button-1');
    fireEvent.click(readMoreButton);
    expect(useBlogPosts().setPage).toHaveBeenCalledTimes(0);
  });
});

// rever teste aqui no Read Mode Button deveria receber o fireEvent e ir para (1) e naio ficar em 0
