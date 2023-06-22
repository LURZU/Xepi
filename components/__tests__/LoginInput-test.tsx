import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import LogInform from '../provider/LogInForm';


describe('LoginForm', () => {
  it('should handle email and password change', () => {
    const { getByPlaceholderText } = render(<LogInform />);
    const emailInput = getByTestId('auth-login');
    const passwordInput = getByTestId('auth-password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

 

  // Add more test cases based on your component's behavior

});

