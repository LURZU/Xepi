import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal } from 'react-native';
import DropDownInput from '../input/DropDownInput';
import { FontAwesome } from '@expo/vector-icons';



export default function FirstConnectAssociation(props: any) {

    const [selectedValue, setSelectedValue] = useState('');
    const [ isModalVisible, setIsModalVisible ] = useState(props.visible);
    const handleSelectedValue = (value: string) => {
        setSelectedValue(value);
      };

    return (
        <>
        <Modal>
        <Text style={{fontSize: 30}}>Vérification</Text>
        //Type association 
        <DropDownInput  items={['Association', 'Particuliers']} onValueChange={handleSelectedValue}/>

        //What is the goal of the association
        <DropDownInput/>

        //What is the name of the association
        <Text style={styles.left}>Nom ou mail</Text>
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
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
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
            marginBottom: 10,
            marginLeft: 25,
            width: '85%',
          }
   
})