import React, { useState, useEffect, useContext } from 'react';
import { Button, ImageBackground, View, Platform, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { API_URL } from '@env';
import axios from 'axios';
import { AuthContext } from '../components/provider/AuthContext';
import { RouteProp, useRoute } from '@react-navigation/native';


type result = {
  cancelled: boolean;
  uri: string;
  width?: number;
  height?: number;
  type?: string;
  base64?: string;
};

type userData = {
  id: number;
  name: string;
  email: string;
  password: string;
  type: string;
}

type AssociationRouteParams = {
  id: string;
};

type AssociationRouteProp = RouteProp<Record<string, AssociationRouteParams>, string>;

export default function AssociationScreen() {
  console.log('AssociationScreen');
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [specify, setSpecify ] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const route = useRoute<AssociationRouteProp>();

  const tabs = [
    { key: 'materiel', title: 'Don matériel' },
    { key: 'financier', title: 'Don financier' },
    { key: 'benevolat', title: 'Bénévolat' },
  ];
 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const getAssociationData = async (id: string) => {
    
    try {
      const response = await axios.get(`${API_URL}/associations/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  
  useEffect(() => {
    getAssociationData(route.params.id);

    }, [])

    useEffect(() => {
      setSpecify([userData.type]);
    }, [userData])


    //Select color by index and item index
    const getColorByIndex = (columnIndex: number, itemIndex: number) => {
      const colors = [
        ['#FDD4B0', '#F7B9B4', '#FDE6A2', '#BCD4FB'],
        ['#F7B9B4', '#FDE6A2', '#BCD4FB', '#FDD4B0'],
      ]; // Colors for each column
  
      return colors[columnIndex % colors.length][itemIndex % colors[columnIndex % colors.length].length];
    };
  
    //Render items for each column with a start position and end in props
    const renderItems = (start: number, end: number, columnIndex: number) => {
      //Return a list of items
      return specify.slice(start, end).map((item, index) => (
        <Text
          key={index}
          style={[styles.itemText, { backgroundColor: getColorByIndex(columnIndex, index) }]}
        >
          {item}
        </Text>
      ));
    };

    const renderScene = SceneMap({
      materiel: () => (
        <View style={styles.tabContent}>
          <Text style={{color: 'black'}}>Faire un don matériel</Text>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Selectionner 3 photos" onPress={pickImage} />
          {image && <ImageBackground source={{ uri: image }} style={styles.selectedImage} />}
          </View>
        </View>
      ),
      financier: () => (
        <View style={styles.tabContent}>
          <Text style={{color: 'black'}}>Contenu du don financier</Text>
          
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Selectionner 3 photos" onPress={pickImage} />
          {image && <ImageBackground source={{ uri: image }} style={styles.selectedImage} />}
          </View>
        </View>
      ),
      benevolat: () => (
        <View style={styles.tabContent}>
          <Text style={{color: 'black'}}>Contenu du bénévolat</Text>
   
          <Button title="Selectionner 3 photos" onPress={pickImage} />
          {image && <ImageBackground source={{ uri: image }} style={styles.selectedImage} />}
        
        </View>
      ),
    });

  return (
    <>
    <ScrollView>
    <View style={styles.overlay}>
      <View style={styles.container}>
          <ImageBackground
            source={require('../assets/images/don/cat-futuristic.jpg')}
            style={styles.backgroundImage}>
              <Text style={styles.title}>{userData.name}</Text>
          </ImageBackground>
        </View>
      </View>
      <View style={{paddingLeft: 30, paddingRight: 30}}>
      <View style={{width: '100%', marginTop: 30}}>
        <Text style={styles.text}> {userData.description} </Text>
      </View>
      <Text style={styles.whiteTitle}>Que faisons nous ?</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          {renderItems(0, Math.ceil(specify.length / 2), 0)} 
        </View>
        <View style={styles.column}>
          {renderItems(Math.ceil(specify.length / 2), specify.length, 1)} 
        </View>
      </View>
      <Text style={styles.whiteTitle}>Faire un don</Text>
      <View style={styles.tabContainer}>
      <TabView
      navigationState={{ index: activeTab, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={setActiveTab}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          getLabelText={({ route }) => route.title}
          indicatorStyle={styles.tabIndicator}
          style={styles.tabBar}
          tabStyle={styles.tab} // Style individuel pour chaque onglet
        />
        )}
      />
      </View>
      </View>
      </ScrollView>
      </> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  
  text: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color : 'black',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: 250,
  },
  overlay: {
    backgroundColor: 'white',
    height: 250,
  },
  title: {
    marginTop: 125,
    marginLeft: 30,
    fontSize: 40,
    width: '75%',
    fontWeight: 'bold',
    color: 'white',
  },
  whiteTitle: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedImage: {
    width: 200,
    height: 200,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
  },
  itemText: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: '#FDD4B0',
    fontSize: 16,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  tabBar: {
    color: 'black',
    backgroundColor: 'white',
    elevation: 2,
  },
  tabLabel: {
    color: 'gray',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  tabIndicator: {
    backgroundColor: 'gray',
    height: 2,
  },
  tabContent: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabContainer: {
    height: 300, // Définissez la hauteur que vous voulez
    width: '100%',
    backgroundColor: 'transparent',
    color: 'black',
  },
  tab: {
    margin: 5, // Espace entre les onglets
    borderRadius: 5, // Pour l'ombre
    color: 'black',
    backgroundColor: 'white', // Pour l'ombre
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
