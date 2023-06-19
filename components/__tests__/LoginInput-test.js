import React from 'react';
import renderer from 'react-test-renderer';
import { useContext } from 'react';
import LoginInform  from '../../components/provider/LogInForm';
// import { AuthContext } from '../../components/provider/AuthContext';
import { render, fireEvent, findAllByType  } from '@testing-library/react-native';
// import {create, TestRenderer }from 'react-test-renderer';


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