import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, TextInput, View, StyleSheet, Text, Modal, Alert, Pressable  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import DropDownInput from '../input/DropDownInput';
import { AuthContext } from './AuthContext'
import { Picker } from '@react-native-picker/picker';




function SignInForm(props: any) {
  const { GuestSignIn, error, isLoading } = useContext(AuthContext);
  const [ isModalVisible, setIsModalVisible ] = useState(props.visible);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  let name: React.ComponentProps<typeof FontAwesome>['name'] = "eye"

  const [show, setShow] = useState(name);
  const [secure, setSecure] = useState(true);



  useEffect(() => {
    setIsModalVisible(props.visible);
  }, [props]);


  // Change password visibility
  const showPassword = () => {
    if(show === "eye") {
      setShow("eye-slash");
      setSecure(false)
    } else {
      setShow("eye");
      setSecure(true)
    }
  };

    // To close the modal when usecontext return true for connected

    const closeModal = () => {
      GuestSignIn(email, password);
      console.log('user connected : '+error?.code_error)
      if(error?.code_error === 200) {
        setIsModalVisible(false);
        Alert.alert('Mail de vérification envoyé', 'Allez vérifier dans votre boîte mail', [
          {text: 'OK'},
        ]);
        
      }
    };

  const closeSignUpModal = () => {
    setIsModalVisible(false);
   
  };

  const handleSignIn = () => {
    closeSignUpModal();
  };

  // {isLoading ? (
  //   <ActivityIndicator size="large" color="#0000ff" />
  // ) : (
    
  // )}

  return (
    <>
      {isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
      ) : (
     <Modal 
      animationType="slide"
      visible={isModalVisible}
      style={styles.Modal}
      onRequestClose={closeSignUpModal}
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

              <Text style={styles.left}>Mot de passe</Text>
              <View style={styles.inputLog}>
              <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
                <TextInput
                  value={password}
                  placeholderTextColor="#000"
                  onChangeText={setPassword}
                  placeholder="Mot de passe"
                  secureTextEntry={secure}
                  style={styles.inputText}
                  testID ='auth-password'
                />
                <Pressable style={styles.iconRight} onPress={showPassword}>
                  <FontAwesome name={show} size={24} color="black" style={styles.iconRight} />
                </Pressable>
              </View>

              <Text style={styles.left}>Qui êtes-vous ?</Text>
              <View style={styles.inputLog}>
                <DropDownInput/>
              </View>

            <Pressable style={styles.logInButton} onPress={closeModal} testID='auth-button'> 
            <Text style={{color: "#FFF", fontSize: 20,textAlign: "center", fontWeight: 'bold'}}>S'inscrire</Text>
            </ Pressable>

            <Text style={{textAlign: 'center', marginTop: 20}}>Vous possedez déjà un compte ?</Text>
            <Pressable onPress={handleSignIn}><Text style={{color: '#F9943B', textAlign: 'center', fontSize: 14, textDecorationLine: 'underline'}}>Se connecter</Text></Pressable>
          </View>
        </Modal>
        )}
    </>
  );
}

const styles = StyleSheet.create({

  
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
});


export default SignInForm;