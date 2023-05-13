import React, { useState, useContext } from 'react';
import { Button, TextInput, View, StyleSheet, Text, Modal, Alert, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from './AuthContext'
import SignInForm from './SignInForm'
import { LinearGradient } from 'expo-linear-gradient';

function LoginInform() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { user, error } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, setError, setUser } = useContext(AuthContext);
  let name: React.ComponentProps<typeof FontAwesome>['name'] = "eye"
  const [show, setShow] = useState(name);
  const [secure, setSecure] = useState(true);
  const [signUpState, setSignUp] = useState({
    signUpState: false,
  })

  const closeModal = () => {
   
    if (user?.connected && user.isEmailVerified) {
      setUser({
        email: user?.email, password: user?.password, connected: user?.connected, isEmailVerified: true
      })
 
      setIsModalVisible(false);
    } else if (user?.connected && user?.isEmailVerified === false) {
      setIsLoading(false);
      Alert.alert('Email non vérifié', 'Vous avez reçu un mail dans votre boîte mail', [
        { text: 'OK' },
      ]);
      setUser({
        email: user?.email, password: user?.password, connected: user?.connected, isEmailVerified: false
      })
      setIsModalVisible(true);
    }
  };

  const showPassword = () => {
    if (show === "eye") {
      setShow("eye-slash");
      setSecure(false)
    } else {
      setShow("eye");
      setSecure(true)
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      signIn(email, password, false);
      // Connexion réussie, effectuez les actions nécessaires ici
      closeModal();
    } catch (error) {
      // Une erreur s'est produite lors de la connexion, gérez l'erreur ici
      setIsLoading(false);
    }
  };
  

  const handleSignUp = () => {
    setSignUp({
      signUpState: true,
    })
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
        style={styles.Modal}
        testID='auth-modal'
      >
        <View style={styles.inputBox}>
            <Text style={styles.title}>Connectez-vous</Text>

              <Text style={styles.left}>Nom ou mail</Text>
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
              
            <Pressable style={(pressed) => [{ backgroundColor: pressed ? '#ffb06b' : '#FFF', },styles.logInButton]} onPress={handleSignIn} testID='auth-button'> 
            <Text style={{color: "#FFF", fontSize: 20,textAlign: "center", fontWeight: 'bold'}}>Se connecter</Text>
            </ Pressable>

            <Text style={{textAlign: 'center', marginTop: 20, }}>Pas encore inscrit ?</Text>
            <Pressable onPress={handleSignUp}><Text style={{color: '#F9943B', textAlign: 'center', fontSize: 14, textDecorationLine: 'underline'}}>S'inscrire</Text></Pressable>
          </View>
      </Modal> 

        <SignInForm visible={signUpState.signUpState}/>

        {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Arrière-plan semi-transparent
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
});


export default LoginInform;