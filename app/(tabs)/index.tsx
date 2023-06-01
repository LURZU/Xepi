


import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginInform from '../../components/provider/LogInForm';
import { AuthContext } from '../../components/provider/AuthContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FirstConnectAssociation from '../../components/parameters/first_connect_association';
import MapScreen from '../../components/Screen/MapScreen';
import FirstConnectParticuliers from '../../components/parameters/first_connect_particuliers';

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

  // Enlever commentaire pour utiliser l'app sans le login
  return(
    <View>
      {/* <MapScreen/> */}
    </View>
  )
    // If user is connected and email is verified11
    // console.log(user?.firstconnexion+' '+user?.type+' '+user?.isEmailVerified+' '+user?.connected+' '+user?.id)
    if(user?.connected && user?.isEmailVerified === true && user?.type === 'Particuliers' && !user?.firstconnexion) {
      return(
        <View>
        <MapScreen/>
      </View>
      )
    } else if (user?.firstconnexion && user?.type === 'Association' && user?.isEmailVerified && user?.connected) {
      console.log('Première connexion association')
      return(
        <View>
          <FirstConnectAssociation />
        </View>
      )
    } else if (user?.firstconnexion && user?.type === 'Particuliers' && user?.isEmailVerified && user?.connected) {
      console.log('Première connexion particuliers')
      return(
        <View>
          <FirstConnectParticuliers />
        </View>
      )
    }


return(
      <View >
        <LoginInform />
      </View>  
)
    

}


const styles = StyleSheet.create({
  p: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  }

});
