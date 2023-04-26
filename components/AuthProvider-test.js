import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AuthContext from '../../components/provider/AuthContext';
import Text from 'react-native'

test('renders AuthContext.Provider', async () => {
    const testChild = <Text>Test</Text>;
    const { getByTestId, getByText, getByRole, debug, waitFor } = render(
      <AuthContext>{testChild}</AuthContext>
    );
    const authContextProvider = getByTestId('authcontext-test');
    await waitFor(() => expect(authContextProvider).toBeDefined());
  });
  