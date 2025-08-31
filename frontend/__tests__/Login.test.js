// __tests__/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/components/Login';
import { useNavigate } from 'react-router-dom';

// suppress act() warnings
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

describe('<Login />', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(navigate);
    localStorage.clear();
    global.fetch = jest.fn();
  });

  it('toggles password visibility', () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input' });
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(screen.getByLabelText(/toggle password visibility/i));
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByLabelText(/toggle password visibility/i));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('logs in successfully and navigates to /dashboard', async () => {
    render(<Login />);

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'tok123' }),
    });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), { target: { value: 'pass1' } });
    fireEvent.click(screen.getByRole('button', { name: /^login$/i }));

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('tok123');
      expect(localStorage.getItem('EMSusername')).toBe('user1');
      expect(navigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows error message on invalid credentials', async () => {
    render(<Login />);

    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'bad' }),
    });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'u' } });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), { target: { value: 'p' } });
    fireEvent.click(screen.getByRole('button', { name: /^login$/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      expect(navigate).not.toHaveBeenCalled();
    });
  });
});
