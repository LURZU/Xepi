import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable, Button, Image } from 'react-native';
import DropDownInput from '../input/DropDownInput';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { API_URL } from '@env';
import { AuthContext } from '../provider/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface FormErrors {
  [key: string]: string;
}

export default function ProfilePicture(props: any) {
  const [ isModalVisible, setIsModalVisible ] = useState(props.visible);
  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleForm = async () => {
    // Check if form is valid before sending to backend
      try {
        const userData = {
          profil_picture: image
        };
        // send PATCH request to backend api 
        const response = await axios.patch(`${API_URL}/associations/${props.data[0]._id}`, userData);
        
        setIsModalVisible(false);
      } catch (error) {
        console.error(error);
      }
  
  };


  const CancelButton = () => {
    setIsModalVisible(!isModalVisible);
    props.changeState();
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      const fileName = result.uri.split('/').pop();
      const newPath = FileSystem.documentDirectory + fileName;

      try {
        await FileSystem.moveAsync({
          from: result.uri,
          to: newPath
        });
        console.log(newPath);
        setImage(newPath);  // Enregistrez le lien de l'image localement dans votre état
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  useEffect(() => {
    setIsModalVisible(props.visible);
  }, [props.visible])

  return(
    <>
    <Modal 
    animationType="slide"
    visible={isModalVisible}
    >
      <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20, marginBottom: 15,fontWeight: 'bold'}}>Modifier l'image de présentation de votre association</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Pressable style={styles.ChooseButton} onPress={pickImage} >
          <Text style={{ color: '#FFF', fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Choisir une image</Text>
        </Pressable>
      </View>
      <Pressable style={styles.ValidateButton} testID="auth-button" onPress={handleForm}>
            <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Valider le changement</Text>
      </Pressable>
      <Pressable style={styles.CancelButton} testID="auth-button" onPress={CancelButton}>
            <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Annuler</Text>
      </Pressable>
    </Modal>
    </>
  )
 
}

const styles = StyleSheet.create({
  ChooseButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 'auto',
    borderRadius: 15,
    color: "#FFF",
    fontSize: 20,
    backgroundColor: '#A7DDFB',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  ValidateButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 'auto',
    borderRadius: 15,
    color: "#FFF",
    fontSize: 30,
    backgroundColor: '#F9943B',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  CancelButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 'auto',
    borderRadius: 15,
    color: "#FFF",
    fontSize: 30,
    backgroundColor: '#606060',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  }
   
})