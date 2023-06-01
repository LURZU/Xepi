import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, TextInput, View, StyleSheet, Text, Modal, Alert, Image, Pressable  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import DropDownInput from '../input/DropDownInput';
import HideInput from '../input/HideInput';
import Checkbox from 'expo-checkbox';

import { AuthContext } from './AuthContext'

function SignInForm(props: any) {
  const { GuestSignIn, error, isLoading } = useContext(AuthContext);
  const [isChecked, setChecked] = useState(false);
  const [ isModalVisible, setIsModalVisible ] = useState(props.visible);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('Association');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError('Veuillez entrer votre adresse e-mail');
      return false;
    }

    // Vérification de l'email avec une expression régulière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Adresse e-mail invalide');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password || password.length === 0) {
      setPasswordError('Veuillez entrer votre mot de passe');
      return false;
    }
 
    if (password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };


  const handleSelectedValue = (value: string) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    setIsModalVisible(props.visible);
  }, [props]);

  // To close the modal when usecontext return true for connected
  const closeModal = () => {
    if (!validateEmail() || !validatePassword() || !isChecked) {
      return;
    }
    
    GuestSignIn(email, password, selectedValue);
    
    if(error?.code_error === 200) {
      return (
        <Modal
          animationType="slide"
          visible={isModalVisible}
          style={styles.Modal}
          onRequestClose={closeModal}
        >
          <View style={styles.inputBox}>
            <Text style={{fontSize: 20}}>MERCI</Text>
            <Text style={{fontSize: 20}}>pour votre inscription</Text>
            <Image source={require('../../assets/images/illustration/confirmation_illustration.png')}/>
          </View>
        </Modal>

      )
    }
  };


  const closeSignUpModal = () => {
    setIsModalVisible(false);
  };

  const handleSignIn = () => {
    // closeSignUpModal();
    props.onVisibityChange(false);
  };


  return (
    <>
      {isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
      ) : (
     <Modal 
      animationType="slide"
      visible={isModalVisible}
      style={styles.Modal}
      >
        <View style={styles.inputBox}>
            <Text style={styles.title}>S'inscrire</Text>

              <Text style={styles.left}>Email</Text>
              <View style={styles.inputLog}>
                <FontAwesome name="user" size={24} color="black" style={styles.icon}/>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#000"
                  placeholder="Email"
                  style={styles.inputText}
                  testID ='auth-login'
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

              <HideInput onPasswordChange={handlePasswordChange}/>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              

              <View style={{marginHorizontal: 20}}>
              <Text style={styles.left}>Qui êtes-vous ?</Text>
              <DropDownInput items={['Association', 'Particuliers']} onValueChange={handleSelectedValue}/>

              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>J'ai lu et j'accepte les conditions générales d'utilisation du service auquel je souscris</Text>
                {passwordError ? <Text style={styles.errorText}>Veuillez cocher cette case</Text> : null}
              </View>

              <Pressable style={styles.logInButton} onPress={closeModal} testID='auth-button'> 
              <Text style={{color: "#FFF", fontSize: 20,textAlign: "center", fontWeight: 'bold'}}>S'inscrire</Text>
              </ Pressable>

            <Text style={{textAlign: 'center', marginTop: 20}}>Vous possedez déjà un compte ?</Text>
            <Pressable onPress={handleSignIn}><Text style={{color: '#F9943B', textAlign: 'center', fontSize: 14, textDecorationLine: 'underline'}}>Se connecter</Text></Pressable>
            </View>
            </View>
        </Modal>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: -10,
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 25,
  },
  left:{
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 25,
    width: '85%',
  },
  button: {
    marginTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: '85%',
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
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  iconRight: {
    alignSelf: 'center',
    margin: "auto",
    position: 'relative',
    marginLeft: 'auto',
    right: 0,
  },
  icon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  whiteText: {
    color: "#000",
    fontSize: 20,
  },
  errorLog: {
    width: '70%',
    height: '100%',
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: "#000",
  },
  input: {
    backgroundColor: "#FFF",
    width: '100%',
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    backgroundColor: "#F2F2F2",
    color: "#000000",
    height: 57,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Inter' as any,
    marginBottom: 30,
    fontWeight: 'bold',
    color: "#000000",
  },
  inputBox: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    color: "#000",
    backgroundColor: "#FFFFFF",
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
    width: '85%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  inputPass: {
    color: "#000",
    height: 60,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    marginBottom: 15,
    width: '85%',
    paddingHorizontal: 20,
  },  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  Modal: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '85%',
  },
  paragraph: {
    fontSize: 13,
  },
  checkbox: {
    marginLeft: 15,
    margin: 8,
  },
});


export default SignInForm;