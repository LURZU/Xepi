import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Text, Image, Button} from 'react-native';
import { View } from '../components/Themed';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/provider/AuthContext';
import ProfilScreen from '../components/Screen/ProfilScreen';
import ProfilAssocScreen from '../components/Screen/ProfilAssocScreen';
import ProfilePicture from '../components/Screen/ProfilePicture';
import { API_URL } from '@env';
import axios from 'axios';
import { useNavigation } from 'expo-router';


export default function LoginScreen() {
  const navigation = useNavigation();
  const [editProfile, setEditProfile] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const [userData, setUserData] = useState({})

  const value_change = (value: string) => {
    setEditProfile(!editProfile);
  };

  const signOutPress = () => {
    navigation.navigate('index');
    signOut();
  }
  
  const formData = async () => {
    try {
      if(user?.type === "Association") {
        const response = await axios.get(`${API_URL}/associations/user/${user?.id}`);
        setUserData(response.data);
      } else if(user?.type === "Particuliers") {
        const response = await axios.get(`${API_URL}/users/${user?.id}`);
        setUserData(response.data);
      }
    
    } catch (error) {
      console.error(error);
    }
  }

  const toggleOverlay = () => {
    formData();
    setEditProfile(!editProfile);
  }

  if(user?.connected && user?.isEmailVerified === true && !user?.firstconnexion && user?.type === "Particuliers") { 
    console.log('user connected'+ user?.type)
    return (
      <View style={{height: '100%', width: '100%', marginTop: 15}}>
        <Image source={require('../assets/images/don/cat-futuristic.jpg')} 
          style={styles.tinyLogo}/>
        <Text style={styles.p}>Bienvenue, {user?.email}!</Text>
        <ProfilScreen />
       <Pressable style={styles.pressable} onPress={signOutPress}><Text style={{textAlign: 'center', fontSize: 16 ,textDecorationLine: 'underline'}}>Se Déconnecter</Text></Pressable>
      </View>
    );
  } else if(user?.connected && user?.isEmailVerified === true && user?.type === "Association" && !user?.firstconnexion) {
    return (
      <View style={{height: '100%', width: '100%', marginTop: 15}}>
        <Image source={{
            uri: '../../assets/images/adaptive-icon.png',
          }} 
          style={styles.tinyLogo}/>
          <Pressable onPress={toggleOverlay}>
            <Text style={{textAlign: 'center', fontSize: 16 ,textDecorationLine: 'underline'}}>Modifier l'image de présentation</Text>
          </Pressable>
          <ProfilePicture visible={editProfile} data={userData} changeState={value_change}/>
        <Text style={styles.p}>Bienvenue, {user?.email}!</Text>
        <ProfilAssocScreen />
       <Pressable style={styles.pressable} onPress={signOutPress}><Text style={{textAlign: 'center', fontSize: 16 ,textDecorationLine: 'underline'}}>Se Déconnecter</Text></Pressable>
      </View>
    );
  } else {
    return (
      <View >
        <Text style={styles.p}>Veuillez vous connecter ou contacter un admin</Text>
        <Pressable onPress={signOutPress}><Text>Se Déconnecter</Text></Pressable>
      </View>
    );
  }

  

}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
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
