import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostItem from '../PostItem';
import { BrowserRouter as Router } from 'react-router-dom';

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
        <PostItem post={mockPost} isLast={false} />
      </Router>
    );

    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText(/Test Post Body/)).toBeInTheDocument();
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('navigates to the correct page on button click', () => {
    const navigate = jest.fn();

    render(
      <Router>
        <PostItem post={mockPost} isLast={false} />
      </Router>
    );

    const button = screen.getByTestId(`read-more-button-${mockPost.id}`);
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith(`/post/${mockPost.id}`);
  });

  it('shows the name placeholder correctly', () => {
    render(
      <Router>
        <PostItem post={mockPost} isLast={false} />
      </Router>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
