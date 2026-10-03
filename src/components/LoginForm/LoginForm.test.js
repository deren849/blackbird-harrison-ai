import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here
test('renders email and password input fields', () => {
  render(<LoginForm />);
  const submitButton = screen.getByRole('button', { name: /sign in/i });
  fireEvent.click(submitButton);
  expect(screen.getByText('Email is required')).toBeInTheDocument();
});

test ('renders password error message for invalid password', () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email address/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(submitButton);
  expect(screen.getByText('Password is required')).toBeInTheDocument();
});

test("mentions password requirements when password is too short", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });
  fireEvent.change(emailInput, { target: { value: 'user@harrison.ai' } });
  fireEvent.change(passwordInput, { target: { value: 'Short1!' } });
  fireEvent.click(submitButton);
  expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
});

test("mentions password requirements when password is doent meet criteria", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });
  fireEvent.change(emailInput, { target: { value: 'user@harrison.ai' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } }); 
  fireEvent.click(submitButton);
  expect(screen.getByText(/password must contain uppercase, lowercase, number, and special character/i)).toBeInTheDocument();
});

test("shows success message when form is valid", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });
  fireEvent.change(emailInput, { target: { value: 'admin@harrison.ai' } });
  fireEvent.change(passwordInput, { target: { value: 'Admin@123!' } });
  fireEvent.click(submitButton);
  expect(screen.getByText(/form submitted successfully!/i)).toBeInTheDocument();
});