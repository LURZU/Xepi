import React, { useState, useEffect } from 'react';
import { Button, ImageBackground, View, Platform, Text, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';


type result = {
  cancelled: boolean;
  uri: string;
  width?: number;
  height?: number;
  type?: string;
  base64?: string;
};

export default function AssociationScreen(props: any) {
  const [image, setImage] = useState(null);
  const [specify, setSpecify ] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalVisible, setModalVisible] = useState(props.visible);

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

  
  
  useEffect(() => {
    setSpecify(['Aide alimentaire']);
    }, [])

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

    const closeModal = () => {
        setModalVisible(isModalVisible);
        props.closeModal();
      };

    const renderScene = SceneMap({
      materiel: () => (
        <View style={styles.tabContent}>
          <Text>Contenu du don matériel</Text>
        </View>
      ),
      financier: () => (
        <View style={styles.tabContent}>
          <Text>Contenu du don financier</Text>
        </View>
      ),
      benevolat: () => (
        <View style={styles.tabContent}>
          {/* Contenu de l'onglet "Bénévolat" */}
          <Text>Contenu du bénévolat</Text>
        </View>
      ),
    });

  return (
    <>
    <View style={styles.overlay}>
      <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/images/don/cat-futuristic.jpg')}
            style={styles.backgroundImage}>
              <Text style={styles.title}>Association name</Text>
          </ImageBackground>
        </View>
      </View>
      <View style={{paddingLeft: 30, paddingRight: 30}}>
      <View style={{width: '100%', marginTop: 30}}>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt viverra leo at placerat. Morbi tincidunt, dolor ut ornare dictum, elit ipsum vehicula dui, vel suscipit mauris ante non ante. Sed lacinia aliquet quam ut ullamcorper. Integer turpis sapien, consectetur at vestibulum ut, gravida sit amet felis. </Text>
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
      <TabView
      navigationState={{ index: activeTab, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={setActiveTab}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          navigationState={props.navigationState} // Ajoutez cette ligne
          indicatorStyle={styles.tabIndicator}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
        />
      )}
      />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Selectionner 3 photos" onPress={pickImage} />
        {image && <ImageBackground source={{ uri: image }} style={styles.selectedImage} />}
      </View>
      </View>
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
    color : 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: 250,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
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
    color: 'white',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
