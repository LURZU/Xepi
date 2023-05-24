import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

import { AuthContext } from '../provider/AuthContext';

export default function ProfilScreen() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.center}>
      <Image source={{
          uri: '../../assets/images/adaptive-icon.png',
        }} 
        style={styles.tinyLogo}/>
      <Text style={styles.p}>Bienvenue, {user?.email}!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    
  },
  p: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    backgroundColor: "grey",
    borderRadius: 50,
    alignSelf: "center",
  },

})
