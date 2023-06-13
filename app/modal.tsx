import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/provider/AuthContext';
import ProfilScreen from '../components/Screen/ProfilScreen';

export default function ModalScreen() {

  const { user } = useContext(AuthContext);
  return (
      <>

      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
