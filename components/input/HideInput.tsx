/* add this code on the component you want to hide the password

 const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  */


import React, { useState, useContext, useEffect } from 'react';
import { List } from 'react-native-paper';
import {  StyleSheet, View, Text, Pressable, TextInput  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

export default function HideInput(props: any) {
    const [password, setPassword] = useState('');
    let name: React.ComponentProps<typeof FontAwesome>['name'] = "eye"
    const [show, setShow] = useState(name);
    const [secure, setSecure] = useState(true);

    useEffect(() => {
        if (props.onPasswordChange) {
          props.onPasswordChange(password);
        }
      }, [password, props.onPasswordChange]);

    
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

    return (
        <>
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
        </>
    );
    };

const styles = StyleSheet.create({
    inputText: {
        backgroundColor: "#F2F2F2",
        color: "#000000",
        height: 57,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    left:{
        textAlign: 'left',
        marginBottom: 10,
        marginLeft: 25,
        width: '85%',
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
      }
   
})