import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import DropDownInput from '../input/DropDownInput';
import { FontAwesome } from '@expo/vector-icons';



export default function FirstConnectParticuliers(props: any) {

    const [selectedValue, setSelectedValue] = useState('');
    const [ isModalVisible, setIsModalVisible ] = useState(props.visible);
    const handleSelectedValue = (value: string) => {
        setSelectedValue(value);
      };
      

    return (
        <>
        <Modal>
        <Text style={{fontSize: 30, textAlign: 'center', marginTop: 50, marginBottom: 40, fontWeight: 'bold'}}>Questionnaire</Text>

        <Text style={styles.left}>Nom</Text>
        <View style={styles.inputLog}>
            <FontAwesome name="user" size={24} color="black" style={styles.icon}/>
            <TextInput
            value={'test'}
            // onChangeText={}
            placeholderTextColor="#000"
            placeholder="Email"
            style={styles.inputText}
            testID ='auth-login'
            />
        </View>

        <Text style={styles.left}>Prénom</Text>
        <View style={styles.inputLog}>
            <FontAwesome name="user" size={24} color="black" style={styles.icon}/>
            <TextInput
            value={'test'}
            // onChangeText={}
            placeholderTextColor="#000"
            placeholder="Email"
            style={styles.inputText}
            testID ='auth-login'
            />
        </View>

        <Text style={styles.left}>Que souhaitez-vous faire ?</Text>
        <DropDownInput items={['être bénévole', 'faire un don']} onValueChange={handleSelectedValue}/>

        <Text style={styles.left}>Numéros de SIREN</Text>
        <View style={styles.inputLog}>
            <FontAwesome name="user" size={24} color="black" style={styles.icon}/>
            <TextInput
            value={'test'}
            // onChangeText={}
            placeholderTextColor="#000"
            placeholder="Email"
            style={styles.inputText}
            testID ='auth-login'
            />
        </View>

        <Pressable style={styles.logInButton} testID='auth-button'> 
              <Text style={{color: "#FFF", fontSize: 20,textAlign: "center", fontWeight: 'bold'}}>Envoyer</Text>
              </ Pressable>
        </Modal>
        </>
    );
}


const styles = StyleSheet.create({
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
        width: '85%',
        alignSelf: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        },
        left:{
            textAlign: 'left',
            marginTop: 20,
            marginBottom:15,
            marginLeft: 25,
            width: '85%',
          }
   
})