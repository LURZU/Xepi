import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import DropDownInput from '../input/DropDownInput';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { API_URL } from '@env';
import { AuthContext } from '../../components/provider/AuthContext';

interface FormErrors {
  [key: string]: string;
}

export default function FirstConnectParticuliers(props: any) {
  const { user } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(props.visible);
  const [phone, setPhone] = useState('');
  const [address, setAdress] = useState('');
  const [rna, setRNA] = useState('');
  const [name, setName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [conditions, setConditions] = useState(false);
  const [role, setRole] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [type, setType] = useState('');

  // DropDownInput set UseState value (role)
  const handleSelectedValue = (value: string) => {
    setRole(value);
  };


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
      console.error(error);
      setType('error');
    }
  };

  useEffect(() => {
    getDataCategory();
    console.log(type);
  }, []);


  const handleForm = async () => {
    // Check if form is valid before sending to backend
    if (validateForm()) {
      try {
        const userData = {
          rna: rna,
          name: name,
          town: city,
          postcode: postalCode,
          coordinate: address,
          phone: phone,
          type: role,
        };

        const userConfirm = {
          first_name: name,
          last_name: name,
          phone,
          address,
          bool_newsletter: conditions,
          isEmailVerified: true,
          first_connexion: false,
          role,
        };
        // send PATCH request to backend api nested in axios
        const response = await axios.post(API_URL+'/associations/add', userData);
        const newuser = await axios.patch(API_URL+'/users/'+user?.id, userConfirm);
        setIsModalVisible(false);
      } catch (error) {
        console.error(error);
      }
    } 
  };

  //Check if form is valid front side
  const validateForm = () => {
    const errors: FormErrors = {};

    if (!rna || rna.length < 2) {
      errors.firstname = 'Veuillez entrer un prénom valide';
    }

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

    if (!rna || rna.length < 9 || rna[0] !== 'W') {
      errors.rna = 'Veuillez entrer un RNA valide';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };



  return (
    <>
      <Modal 
      animationType="slide"
      visible={isModalVisible}
      >
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 25, textAlign: 'center', marginTop: 30, fontWeight: 'bold' }}>
            Bienvenue sur <Text style={{ color: '#F9943B' }}>XEPI</Text>,
          </Text>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>
            Nous avons quelques questions à vous poser
          </Text>
        </View>

        <View style={{ paddingHorizontal: 30, width: '100%' }}>

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

          <View style={styles.inputLog}>
            <Ionicons name="information" size={24} color="black"  style={styles.icon} />
            <TextInput
              value={rna}
              onChangeText={setRNA}
              placeholderTextColor="#000"
              placeholder="Numéro RNA"
              style={styles.inputText}
              testID="auth-login"
            />
          </View>
          {formErrors.rna && <Text style={styles.errorText}>{formErrors.rna}</Text>}

          <Text style={styles.left}>Quel type d'association êtes vous ?</Text>
          <DropDownInput items={type} onValueChange={handleSelectedValue} />

         

          <Pressable style={styles.logInButton} testID="auth-button" onPress={handleForm}>
            <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Envoyer</Text>
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