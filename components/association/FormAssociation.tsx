import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import DropDownInput from '../input/DropDownInput';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { API_URL } from '@env';
import { AuthContext } from '../provider/AuthContext';

interface FormErrors {
  [key: string]: string;
}

export default function FormAssociation(props: any) {
  const { user } = useContext(AuthContext);
  if(props.data[0] === undefined){ 
    return(<Modal><Text>Problème connexion serveur</Text></Modal>)
  }
  const [isModalVisible, setIsModalVisible] = useState(props.visible);
  const [phone, setPhone] = useState(props.data[0].phone);
  const [address, setAdress] = useState(props.data[0].adresse);
  const [rna, setRNA] = useState(props.data[0].rna);
  const [name, setName] = useState(props.data[0].name);
  const [postalCode, setPostalCode] = useState(props.data[0].postcode);
  const [description, setDescription] = useState(props.data[0].description);
  const [city, setCity] = useState(props.data[0].town);
  const [conditions, setConditions] = useState(false);
  const [blockText, setBlockText] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [type, setType] = useState('');

  const getDataCategory = async () => {
    try {
      // send get request to backend api to category
      const dataType = await axios.get(API_URL+'/category');
      const categories = dataType.data;
      // Extract names and stocks from categories and create a new array
      const categoryData = categories.map((category: { name: string; }) => {
        return category.name;
    });
    setType(categoryData);
    } catch (error) {
      setType('error');
    }
  };

  useEffect(() => {
    setIsModalVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    getDataCategory();
  }, []);

    //Check if form is valid front side
    const validateForm = () => {
      const errors: FormErrors = {};

  
      if (!name || name.length < 2) {
        errors.lastname = 'Veuillez entrer un nom valide';
      }
  
      if (!phone || !/^\d+$/.test(phone) || phone.length !== 10) {
        errors.phone = 'Veuillez entrer un numéro de téléphone valide';
      }
  
      if (!city || city.length < 2) {
        errors.adress = 'Veuillez entrer une ville valide';
      }
  
      if (!postalCode || postalCode.length < 5) {
        errors.adress = 'Veuillez entrer code postal valide';
      }
  
      if (!address || address.length < 2) {
        errors.adress = 'Veuillez entrer une adresse valide';
      }
  
      if (!rna || rna.length < 9 || rna[0] !== 'w') {
        errors.rna = 'Veuillez entrer un RNA valide';
      }
      if (!description) {
        errors.description = 'Votre description doit contenir moins de 255 caractères';
      }
  
      setFormErrors(errors);
  
      return Object.keys(errors).length === 0;
    };

  const handleForm = async () => {
    // Check if form is valid before sending to backend
    if (validateForm()) {
      try {
        const userData = {
          rna: rna,
          name: name,
          town: city,
          postcode: postalCode,
          adresse: address,
          description: description,
          phone: phone,
          coordinate: props.data[0].coordinate,
          user_id: props.data[0].user_id,
          type: props.data[0].type,
        };
        // send PATCH request to backend api 
        const response = await axios.patch(`${API_URL}/associations/${props.data[0]._id}`, userData);
        
        setIsModalVisible(false);
      } catch (error) {
        console.error(error);
      }
    } 
  };

  useEffect(() => {
    if(description.length >= 255){
      setBlockText(true)
    }else{
      setBlockText(false)
    }
  }, [description])



  const CancelButton = () => {
    setIsModalVisible(!isModalVisible);
    props.onValueChange(false);
  };



  return (
    <>
      <Modal 
      animationType="slide"
      visible={isModalVisible}
      >
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 25, textAlign: 'center', marginTop: 30, fontWeight: 'bold', marginBottom: 15 }}>
            Modifier mes informations
          </Text>
        
        </View>

        <View style={{ paddingHorizontal: 30, width: '100%' }}>

        <View style={styles.inputLog}>
            <Ionicons name="information" size={24} color="black"  style={styles.icon} />
            <Text style={[styles.icon, {fontWeight: 'bold'}]}>N°RNA :</Text>
            <TextInput
              value={rna}
              onChangeText={setRNA}
              editable={false}
              placeholderTextColor="#000"
              placeholder="Numéro RNA"
              style={styles.inputText}
              testID="auth-login"
            />
          </View>
          {formErrors.rna && <Text style={styles.errorText}>{formErrors.rna}</Text>}

          <View style={[styles.inputLog, {height: 100} ]}>
          <MaterialIcons name="description" size={24} color="black" style={styles.icon}  />
        
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline = {true}
              editable={!blockText}
              placeholderTextColor="#000"
              placeholder="Numéro RNA"
              style={[styles.inputText , {height: 100} ]}
              testID="auth-login"
              scrollEnabled ={true}
            />
            <Text style={{color: '#8b8b8b', fontSize: 12}}>{description.length}/256</Text>
          </View>
          {formErrors.description && <Text style={styles.errorText}>{formErrors.description}</Text>}

        <View style={styles.inputLog}>
            <FontAwesome name="user" size={24} color="black" style={styles.icon} />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholderTextColor="#000"
              placeholder="Nom"
              style={styles.inputText}
              testID="auth-login"
            />
          </View>
          {formErrors.name && <Text style={styles.errorText}>{formErrors.name}</Text>}

          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <View style={[styles.inputLog2col, { alignItems: 'center' }]}>
              <FontAwesome name="map" size={24} color="black" style={styles.icon} />
              <TextInput
                value={city}
                onChangeText={setCity}
                placeholderTextColor="#000"
                placeholder="Ville"
                style={styles.inputText}
                testID="auth-login"
              />
            </View>

            <View style={[styles.inputLog2col, { alignItems: 'center' }]}>
              <FontAwesome name="map-marker" size={24} color="black" style={styles.icon} />
              <TextInput
                value={postalCode}
                onChangeText={setPostalCode}
                keyboardType="numeric" 
                placeholderTextColor="#000"
                placeholder="Code postal"
                style={styles.inputText}
                testID="auth-login"
              />
              
            </View>
          </View>
          {formErrors.postalCode && <Text style={styles.errorText}>{formErrors.postalCode}</Text>}

          <View style={styles.inputLog}>
            <MaterialIcons name="place" size={24} color="black" style={styles.icon} />
            <TextInput
              value={address}
              onChangeText={setAdress}
              placeholderTextColor="#000"
              placeholder="Adresse"
              style={styles.inputText}
              testID="auth-login"
            />
          </View>
          {formErrors.adress && <Text style={styles.errorText}>{formErrors.adress}</Text>}

          <View style={styles.inputLog}>
            <MaterialIcons name="phone" size={24} color="black" style={styles.icon} />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor="#000"
              placeholder="Téléphone"
              style={styles.inputText}
              testID="auth-login"
            />
          </View>
          {formErrors.phone && <Text style={styles.errorText}>{formErrors.phone}</Text>}

         

         

          <Pressable style={styles.logInButton} testID="auth-button" onPress={handleForm}>
            <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Modifier</Text>
          </Pressable>

          <Pressable style={styles.CancelButton} testID="auth-button" onPress={CancelButton}>
            <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Annuler</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: -10,
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 0,
  },
  paragraph: {
    fontSize: 13,

  },
  checkbox: {
    marginLeft: 30,
    margin: 8,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 15,
    alignSelf: 'center',
    
  },
  logInButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 'auto',
    borderRadius: 15,
    color: "#FFF",
    fontSize: 30,
    backgroundColor: '#F9943B',
    width: '40%',
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
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
    inputText: {
        backgroundColor: "#F2F2F2",
        color: "#000000",
        height: 57,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    container: {
        color: "#000",
        backgroundColor: "#F2F2F2",
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 0,
        paddingHorizontal: 0,
        borderRadius: 20,
        width: '85%', 
        alignSelf: 'center', 
        overflow: 'visible',
        }, 
        picker: {
        height: 40,
        },
        icon: {
            alignSelf: 'center',
            marginRight: 10,
          },
        inputLog: {
        color: "#000",
        backgroundColor: "#F2F2F2",
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 20,
        marginBottom: 15,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        
        },
        inputLog2col: {
          color: "#000",
          backgroundColor: "#F2F2F2",
          height: 60,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          borderRadius: 20,
          marginBottom: 15,
          width: '48%',
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginRight: 15,
          
          },
        left:{
            textAlign: 'left',
            marginTop: 0,
            marginBottom:10,
            marginLeft: 25,
            width: '85%',
          }
   
})