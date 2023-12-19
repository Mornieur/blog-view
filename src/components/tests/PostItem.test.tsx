import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostItem from '../PostItem';

import {
  MemoryRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('PostItem', () => {
  const mockPost = {
    userId: 1,
    id: 1,
    title: 'Test Post Title',
    body: 'Test Post Body',
  };

  it('renders correctly', () => {
    render(
      <Router>
        <PostItem post={mockPost} />
      </Router>
    );

    expect(screen.getAllByText('Test Post Title')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Test Post Body/)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Read More')[0]).toBeInTheDocument();
  });

  it('navigates to the correct page on button click', () => {
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
      <Router>
        <PostItem post={mockPost} />
      </Router>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
