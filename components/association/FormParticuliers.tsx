import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import DropDownInput from '../input/DropDownInput';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { API_URL } from '@env';
import { AuthContext } from '../../components/provider/AuthContext';

interface FormErrors {
  [key: string]: string;
}

export default function FormParticuliers(props: any) {
  const { user } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(props.visible);
  const [phone, setPhone] = useState(props.data.phone);
  const [address, setAdress] = useState(props.data.address);
  const [firstname, setFirstName] = useState(props.data.first_name);
  const [lastname, setLastName] = useState(props.data.last_name);
  const [conditions, setConditions] = useState(props.data.bool_newsletter);
  const [role, setRole] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // DropDownInput set UseState value (role)
  const handleSelectedValue = (value: string) => {
    setRole(value);
  };


  useEffect(() => {
    setIsModalVisible(props.visible);
  }, [props.visible]);

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!firstname || firstname.length < 2) {
      errors.firstname = 'Veuillez entrer un prénom valide';
    }

    if (!lastname || lastname.length < 2) {
      errors.lastname = 'Veuillez entrer un nom valide';
    }

    if (!phone || !/^\d+$/.test(phone) || phone.length !== 10) {
      errors.phone = 'Veuillez entrer un numéro de téléphone valide';
    }

    if (!address || address.length < 2) {
      errors.adress = 'Veuillez entrer une adresse valide';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

    const handleForm = async () => {
    if (validateForm()) {

      try {
        const userData = {
          first_name: firstname,
          last_name: lastname,
          phone,
          address,
          bool_newsletter: conditions,
          isEmailVerified: true,
          first_connexion: false,
          role,

        };

        // send PATCH request to backend api nested in axios
        const response = await axios.patch(API_URL+'/users/'+user?.id, userData);
        console.log(response.data);
        setIsModalVisible(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

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
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <View style={[styles.inputLog2col, { alignItems: 'center' }]}>
              <FontAwesome name="user" size={24} color="black" style={styles.icon} />
              <TextInput
                value={lastname}
                onChangeText={setLastName}
                placeholderTextColor="#000"
                placeholder="Nom"
                style={styles.inputText}
                testID="auth-login"
              />
            </View>

            <View style={[styles.inputLog2col, { alignItems: 'center' }]}>
              <FontAwesome name="user" size={24} color="black" style={styles.icon} />
              <TextInput
                value={firstname}
                onChangeText={setFirstName}
                placeholderTextColor="#000"
                placeholder="Prénom"
                style={styles.inputText}
                testID="auth-login"
              />
              
            </View>
          </View>
          {formErrors.firstname && <Text style={styles.errorText}>{formErrors.firstname}</Text>}

          <View style={styles.inputLog}>
            <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
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

          <Text style={styles.left}>Que souhaitez-vous faire ?</Text>
          <DropDownInput items={['être bénévole', 'faire un don', 'Faire les deux']} onValueChange={handleSelectedValue} />

          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={conditions}
              onValueChange={setConditions}
              color={conditions ? '#4630EB' : undefined}
            />
            <Text style={styles.paragraph}>
              Je souhaite recevoir la newsletter concernant les demandes d'aide pour les associations ou autres actualités
            </Text>
          </View>

          <Pressable style={styles.logInButton} testID="auth-button" onPress={handleForm}>
            <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Envoyer</Text>
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