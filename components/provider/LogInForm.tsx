import React, { useState, useContext } from 'react';
import { Button, TextInput, View, StyleSheet, Text, Modal, Alert, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { AuthContext } from './AuthContext'
import { LinearGradient } from 'expo-linear-gradient';

function LoginInform() {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  let name: React.ComponentProps<typeof FontAwesome>['name'] = "eye"

  const [show, setShow] = useState(name);
  const [secure, setSecure] = useState(true);

  // To close the modal when usecontext return true for connected
  const closeModal = () => {
    signIn(email, password, false);
    if(user?.connected) {
      setIsModalVisible(false);
    } else if(user?.connected !== undefined){
      Alert.alert('Erreur de connexion', 'Identifiant ou mot de passe incorrect', [
        {text: 'OK'},
      ]);
    }
  };

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



  const handleSignIn = () => {
    signIn(email, password, false);
    console.log(user?.connected)
    closeModal();
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
                  placeholder="Nom d'utilisateur"
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
                  placeholder="Password"
                  secureTextEntry={secure}
                  style={styles.inputText}
                  testID ='auth-password'
                />
                <Pressable style={styles.iconRight} onPress={showPassword}>
                  <FontAwesome name={show} size={24} color="black" style={styles.iconRight} />
                </Pressable>
              </View>
              
            <Pressable style={styles.logInButton} onPress={handleSignIn} testID='auth-button'> 
            <Text style={{color: "#000", textAlign: "center"}}>Se connecter</Text>
            {/* </LinearGradient> */}
            </ Pressable>
          </View>
      </Modal>   
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
    paddingVertical: 20,
    paddingHorizontal: 'auto',
    borderRadius: 15,
    color: "#FFF",
    fontSize: 30,
    backgroundColor: '#F9943B',
    width: '85%',
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
    backgroundColor: "#FFF",
    color: "#000000",
    height: 57,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'inter' as any,
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
    height: 60,
    borderWidth: 1,
    borderColor: "#000",
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