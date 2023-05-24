import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

interface Association {
  key: string;
  title: string;
  adresse: string;
  town: string;
  postcode: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  description: string;
}

const AssociationList = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const [associations, setAssociations] = useState<Association[]>([]);

  const getAssociations = async (): Promise<Association[]> => {
    try {
      const response = await axios.get(API_URL+'/associations/');
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  /*--
  
  Pour calculer la distance entre deux coordonnées GPS (latitude et longitude) sans utiliser l'API de Google, vous pouvez utiliser 
  la formule de la distance entre deux points sur une sphère, connue sous le nom de formule de la distance orthodromique 
  ou distance de Haversine. Voici un exemple de fonction en JavaScript pour calculer cette distance :
  
  --*/

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadius = 6371; // Rayon moyen de la Terre en kilomètres

    // Conversion des degrés en radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Calcul des écarts de latitude et de longitude
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;

    // Calcul de la distance utilisant la formule de Haversine
    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  useEffect(() => {
    const fetchAssociations = async () => {
      const oAssociations = await getAssociations();
      const aAssociations = Array.from(oAssociations);
      const oUserPosition = {
        latitude: 43.635226,
        longitude: 3.830129
      };

      const newAssociations = aAssociations.map((association, index) => {
        let oLocation = association.coordinate.split(',');
        return {
          key: index.toString(),
          title: association.name,
          adresse: association.adresse,
          town: association.town,
          postcode: association.postcode,
          coordinate: {
            latitude: parseFloat(oLocation[1]),
            longitude: parseFloat(oLocation[0]),
          },
          description: "Lorem ipsum dolor sit emet"
        };
      });

      setAssociations(newAssociations);

      const distance = calculateDistance(48.8566, 2.3522, 51.5074, -0.1278);
    };

    fetchAssociations();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: statusBarHeight, margin: 20 }}>
        <Text style={styles.title}>Liste des associations</Text>
        {associations.map((association, index) => (
          <View key={association.key} style={[styles.association, styles['nb' + index]]}>
            <Text style={styles.associationTitle}>{association.title}</Text>
            <Text>{association.adresse}</Text>
            <Text>{association.postcode + ' ' + association.town}</Text>
            <Text>{association.coordinate.latitude}</Text>
            <Text>{association.coordinate.longitude}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "#000",
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20
  },
  associationTitle: {
    fontSize: 20,
    color: '#000'
  },
  association: {
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    borderRadius: 20,
  },
  nb0: {
    backgroundColor: '#BCD4FB',
  },
  nb1: {
    backgroundColor: '#F7B9B4',
  },
  nb2: {
    backgroundColor: '#34a85385',
  },
  nb3: {
    backgroundColor: '#fbbc0580',
  },
});

export default AssociationList;
