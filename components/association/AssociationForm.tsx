import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_URL } from '@env';
import DropDownInput from '../input/DropDownInput';

const AssociationForm = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const [rna, setRna] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [adresse, setAdresse] = useState<string>('');
  const [town, setTown] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [cat, setCat] = useState<string[]>(['test']);


  const checkRna = (rna: string): boolean => {
    const rnaRegex = /^W\d{9}$/;
    return rnaRegex.test(rna);
  };

  const checkPhoneNumber = (number: string): boolean => {
    const phoneRegex = /^0[1-9]\d{8}$/;
    return phoneRegex.test(number);
  };

  const resetForm = () => {
    setRna('');
    setName('');
    setAdresse('');
    setTown('');
    setPostcode('');
    setPhone('');
    setType('null');
  };

  const getCoordinate = async (adresse: string, town: string, postcode: string): Promise<number[]> => {
    const adressPlus = adresse.replaceAll(' ', '+') + '+' + postcode + '+' + town;
    try {
      const response = await axios.get('https://api-adresse.data.gouv.fr/search/?q=' + adressPlus);
      return response.data.features[0].geometry.coordinates;
    } catch (error) {
      throw new Error('Network response was not ok');
    }
  };

  const handleSelectedValue = (value: string) => {
    setType(value);
  };

  // Get data from backend api
  const getDataCategory = async () => {
    try {
      // send get request to backend api to category
      const dataType = await axios.get(API_URL+'/category');
      const categories = dataType.data;
        
      // Extract names and stocks from categories and create a new array
      const categoryData = categories.map((category: { name: string; }) => {
      return category.name; 
      });
      //If the request is successful, set the state of the category
      setCat(categoryData);
    } catch (error) {
      console.error(error);
      setCat(['error']);
    }
  };

  useEffect(() => {
    getDataCategory();
  }, []);


  const handleSubmit = async () => {
    const coordinate = await getCoordinate(adresse, town, postcode);

    if (
      rna !== '' &&
      checkRna(rna) &&
      name !== '' &&
      adresse !== '' &&
      phone !== '' &&
      checkPhoneNumber(phone) &&
      type !== ''
    ) {
      const associationObj = {
        rna: rna,
        name: name,
        adresse: adresse,
        town: town,
        postcode: postcode,
        coordinate: coordinate.join(','),
        phone: phone,
        type: type,
      };

      try {
        const response = await axios.post(API_URL+'/associations/add', associationObj);

        if (response.status === 200 || response.status === 201) {
          setRna('');
          setName('');
          setAdresse('');
          setTown('');
          setPostcode('');
          setPhone('');
          setType('');
        }
      } catch (error) {
        // Handle error
      }
    }
  };

  return (
    <ScrollView>
      <View style={{ marginTop: statusBarHeight }}>
        <View style={styles.container}>
          <Text style={styles.title}>Ajouter une association</Text>
          <Text style={styles.label}>RNA :</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setRna}
            value={rna}
            maxLength={10}
            placeholder="W123456789"
            testID='rna'
          />
          <Text style={styles.label}>Nom :</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setName}
            value={name}
            placeholder="Nom"
            testID='name'
          />
          <Text style={styles.label}>Téléphone :</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setPhone}
            value={phone}
            maxLength={10}
            keyboardType="numeric"
            placeholder="0623456789"
            testID='phone'
          />
          <Text style={styles.label}>Adresse :</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setAdresse}
            value={adresse}
            placeholder="Adresse"
            testID='adresse'
          />
          <Text style={styles.label}>Ville :</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setTown}
            value={town}
            placeholder="Ville"
            testID='ville'
          />
          <Text style={styles.label}>Code Postal :</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setPostcode}
            value={postcode}
            placeholder="Code Postal"
            testID='postalcode'
          />
          <Text style={styles.label}>Type d'association :</Text>
         
          <DropDownInput items={cat} onValueChange={handleSelectedValue} />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
    color: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  label: {
    marginVertical: 20,
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  inputText: {
    backgroundColor: '#F2F2F2',
    color: '#000000',
    height: 57,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 20,
    padding: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },

  button: {
    backgroundColor: '#F9943B',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AssociationForm;
