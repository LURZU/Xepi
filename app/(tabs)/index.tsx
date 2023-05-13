


import React, { useCallback, useContext, useState } from 'react';
import { Modal, Text, View, StyleSheet, Button, Alert } from 'react-native';

import LoginInform from '../../components/provider/LogInForm';
import { AuthContext } from '../../components/provider/AuthContext';
// Rest of the import statements
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';

SplashScreen.preventAutoHideAsync();


export default function App() {


  const { user } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    'Inter': require('../../assets/fonts/Inter.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  }
    // If user is connected and email is verified11
    if(user?.connected && user?.isEmailVerified === true) {
      console.log('Email verified')
      return(
        <View>
          <Text style={styles.p}>Bienvenue, {user?.email}</Text>
          <Text  style={styles.p}>Composant carte coming soon</Text>
        </View>
      )
    } else if(user?.connected && user?.isEmailVerified === false) {
     
    } 

      return ( 
      <View >
      <LoginInform />
      </View>  
      );
  
    

}


const styles = StyleSheet.create({
  p: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  }

});
