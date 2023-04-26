import React from 'react';
import renderer from 'react-test-renderer';
import { useContext } from 'react';
import LoginInform  from '../../components/provider/LogInForm';
// import { AuthContext } from '../../components/provider/AuthContext';
import { render, fireEvent, findAllByType  } from '@testing-library/react-native';
// import {create, TestRenderer }from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<LoginInform />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test('Password input check', () => {
    
//       const { getByTestId } = render(<LoginInform />);
//       const contextProvider = getByTestId('auth-password');
//       fireEvent.changeText(contextProvider, { target: { value: 'test password' } });
//       expect(contextProvider.value).toEqual('test password'); 
     
//   });


  test('Password auth check', () => {
    const { getByTestId } = render(<LoginInform />);
    const input = getByTestId('auth-password');
    fireEvent.changeText(input, '123');
    expect(input.props.value).toBe('123');
  });

  
  test('Login auth check', () => {
    const { getByTestId } = render(<LoginInform />);
    const input = getByTestId('auth-login');
    fireEvent.changeText(input, '123');
    expect(input.props.value).toBe('123');
  });

  test('Button auth check', () => {
    const { getByTestId } = render(<LoginInform />);
    const input = getByTestId('auth-button');
    fireEvent.press(input);
  });


  test('Context ', async () => {
    const { getByTestId } = render(
      <LoginInform />
    );
    const inputLog = getByTestId('auth-login'); 
    fireEvent.changeText(inputLog, 'test');
    const inputPass = getByTestId('auth-password'); 
    fireEvent.changeText(inputPass, 'test');
    const ModalAuth = getByTestId('auth-button');
    fireEvent.press(ModalAuth);
  
    const modalVisibility = getByTestId('auth-modal');
    const allModals = await findAllByType(modalVisibility.type);
  
    expect(allModals[1].props.visible).toBe(true);
  });