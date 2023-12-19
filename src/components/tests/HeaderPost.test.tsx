import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderPost from '../HeaderPost';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('HeaderPost Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('renders HeaderPost component', () => {
    render(<HeaderPost />);
    expect(screen.getByText('Blog Post')).toBeInTheDocument();
    expect(screen.getByLabelText('back')).toBeInTheDocument();
  });

  test('navigates back on back button click', () => {
    render(<HeaderPost />);
    fireEvent.click(screen.getByLabelText('back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
