import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { AuthContext } from '../provider/AuthContext';
import { API_URL } from '@env';
import FormAssociation from '../association/FormAssociation';



export default function ProfilAssocScreen() {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getDataUser();
      }, []);

    const getDataUser = async () => {
        try {
          // send get request to backend api to category
          const dataType = await axios.get(API_URL+'/associations/user/'+user?.id);
          const users_request = dataType.data;
          // Extract names and stocks from categories and create a new array
          setUsers(users_request);
        } catch (error) {
          console.error(error);
          setUsers('error');
        }
      };

      const value_change = (value: string) => {
        setVisible(!visible);
      };
   

      const toggleOverlay = () => {
        setVisible(!visible);
        getDataUser()
      };
      

  
  return(
        <View style={{paddingHorizontal: 15, marginTop: 30}}>
          <Pressable style={{backgroundColor: '#F9943B', paddingVertical: 20, borderRadius: 20}} onPress={toggleOverlay}>
            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Mes informations</Text>
          </Pressable>
          <FormAssociation data={users} visible={visible} onValueChange={value_change} />
        
          <Pressable style={{backgroundColor: '#FBBC05', paddingVertical: 20, borderRadius: 20, marginTop: 15}}>
            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Mes dernières demandes</Text>
          </Pressable>

          <Pressable style={{backgroundColor: '#EA4335', paddingVertical: 20, borderRadius: 20, marginTop: 15}}>
            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Mes derniers dons</Text>
          </Pressable>
          </View>
        )
  

}

const styles = StyleSheet.create({
  center: {
    
  },
  p: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    backgroundColor: "grey",
    borderRadius: 50,
    alignSelf: "center",
  },

})
