import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostItem from '../PostItem';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('PostItem', () => {
  const mockPost = {
    userId: 1,
    id: 1,
    title: 'Test Post Title',
    body: 'Test Post Body',
  };

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Test Post Title')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Test Post Body/)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Read More')[0]).toBeInTheDocument();
  });

  it('navigates to the correct page on button click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<PostItem post={mockPost} />} />
          <Route path="*" element={null} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByTestId(`read-more-button-${mockPost.id}`);
    fireEvent.click(button);
    waitFor(() => {
      expect(screen.getByTestId('location-display')).toHaveTextContent(
        `/post/${mockPost.id}`
      );
    });
  });

  it('shows the name placeholder correctly', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
