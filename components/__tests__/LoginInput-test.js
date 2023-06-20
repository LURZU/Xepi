import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginInform } from '../provider/LogInForm';

describe('LoginInform', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoginInform />);
    expect(getByText('Connectez-vous')).toBeTruthy();
  });

  it('has a login button', () => {
    const { getByText } = render(<LoginInform />);
    expect(getByText('Se connecter')).toBeTruthy();
  });

  it('shows an error message when email is not valid', () => {
    const { getByText, getByPlaceholderText } = render(<LoginInform />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'invalid email');
    const loginButton = getByText('Se connecter');
    fireEvent.press(loginButton);
    expect(getByText('Adresse e-mail invalide')).toBeTruthy();
  });

});

