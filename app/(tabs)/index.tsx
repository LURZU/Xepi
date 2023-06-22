


import React, { useCallback, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginInform from '../../components/provider/LogInForm';
import { AuthContext } from '../../components/provider/AuthContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FirstConnectAssociation from '../../components/parameters/first_connect_association';
import MapScreen from '../../components/Screen/MapScreen';
import FirstConnectParticuliers from '../../components/parameters/first_connect_particuliers';
import AssociationFormScreen from '../../components/Screen/AssociationFormScreen';
import ProfilAssocScreen from '../../components/Screen/ProfilAssocScreen';

SplashScreen.preventAutoHideAsync();


export default function App() {


  const { user, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, []);

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
  // return(
  //   <View>
  //     {/* <MapScreen/> */}
  //   </View>
  // )
    // If user is connected and email is verified11
  
    if(user?.connected && user?.isEmailVerified === true && user?.type === 'Particuliers' && !user?.firstconnexion) {
      return(
        <View>
          <MapScreen/>
        </View>
      )
    } else if(user?.connected && user?.isEmailVerified === true && user?.type === 'Association' && !user?.firstconnexion) {
      return(
        <View>
          <ProfilAssocScreen/>
        </View>
      )
    } else if (user?.firstconnexion && user?.type === 'Association' && user?.isEmailVerified && user?.connected) {
      return(
        <View>
          <FirstConnectAssociation />
        </View>
      )
    } else if (user?.firstconnexion && user?.type === 'Particuliers' && user?.isEmailVerified && user?.connected) {
      return(
        <View>
          <FirstConnectParticuliers />
        </View>
      )
    } else if(user?.connected && user?.isEmailVerified === true && user?.type === 'admin' && !user?.firstconnexion) {
      return(
        <View>
          <AssociationFormScreen/>
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
