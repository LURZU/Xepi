


import React, { useContext, useState } from 'react';
import { Modal, Text, View, StyleSheet, Button } from 'react-native';

import LoginInform from '../../components/provider/LogInForm';
import { AuthContext } from '../../components/provider/AuthContext';

export default function App() {
  const { user } = useContext(AuthContext);

    
    if(user?.connected) {
      console.log("User :" + user?.connected)
      return(
        <View>
          <Text style={styles.p}>Bienvenue, {user?.email}</Text>
          <Text  style={styles.p}>Composant carte coming soon</Text>
        </View>
      )
    } else {
      return ( <View >
      <LoginInform />
      </View>  );
    }
    

}


const styles = StyleSheet.create({
  p: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
  }

});
