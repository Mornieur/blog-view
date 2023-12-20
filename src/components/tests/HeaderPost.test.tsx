import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderPost from '../HeaderPost';
import { useNavigate } from 'react-router-dom';
import { describe, test, expect, beforeEach, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('HeaderPost Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
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
