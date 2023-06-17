import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, StatusBar, Platform, ScrollView, Modal, Pressable, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import * as Location from 'expo-location';
import { Link, useNavigation } from "expo-router";

//détecter le changement de screen avec le useEffect

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
    category: string;
}

interface Category {
    key: string;
    name: string;
}

const AssociationList = () => {

    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(true);
    const [associations, setAssociations] = useState<Association[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [location, setlocation] = useState();

    useEffect(() => {
        const getPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setlocation(currentLocation);
        }
        getPermission();
    }, []);
    
    const handlePress = (categoryName) => {

        hideModal();
        loadAssociations(categoryName);
    };

    const hideModal = () => {
        setShowModal(false);
    }

    const getAssociationsByCategory = async (categoryName): Promise<Association[]> => {
        try {
            const response = await axios.post(API_URL+'/associations/type/', {category: categoryName});
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } 
        catch (error) {
            console.error(error);
        }
        return [];
    };

    const getAllCategory = async() => {
        try {
            setShowModal(true);
            const response = await axios.get(API_URL+'/category/');
            if (response.status === 200 || response.status === 201) {
                setCategories(response.data);
            }
        } 
        catch (error) {
            console.error(error);
        }
    }

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

    const loadAssociations = async (categoryName) => {
        const oAssociationsByCategory = await getAssociationsByCategory(categoryName);
        const aAssociations = Array.from(oAssociationsByCategory);
        //tri pour vérifier le plus proche
        const oUserPosition = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        let nearestAssociations = [];
        aAssociations.forEach(association => {
            let oLocation = association.coordinate.split(',');
            var oInformation = {
                id: association._id,
                name: association.name,
                adresse: association.adresse,
                town: association.town,
                postcode: association.postcode,
                description: association.description,
                category: association.category,
                latitude: parseFloat(oLocation[1]),
                longitude: parseFloat(oLocation[0]),
                km: calculateDistance(oUserPosition.latitude, oUserPosition.longitude, parseFloat(oLocation[1]), parseFloat(oLocation[0])),
            };
            nearestAssociations.push(oInformation);
        });

        //Sort by km 
        nearestAssociations.sort(function(a, b) {
            return a.km - b.km;
        });

        var tabs = nearestAssociations.map(function(objet) {
            return {
                id: objet.id,
                name: objet.name,
                adresse: objet.adresse,
                town: objet.town,
                postcode: objet.postcode,
                description: objet.description,
                category: objet.category,
                latitude: objet.latitude,
                longitude: objet.longitude,
                km: objet.km,
            };
        });

        setAssociations(tabs);
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <View style={{ width: '100%', height: '100%'}}>
            <Modal visible={showModal} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    {categories.map((category, index) => (
                        <View key={index} style={[styles.categoryBtn, styles['nb' + index]]}>
                            <Pressable style={styles.category} onPress={() => handlePress(category.name)}>
                                <Text style={styles.categoryName}>{category.name}</Text>
                            </Pressable>
                        </View>
                    ))}
                    <View style={[styles.categoryBtn, styles.nbAll]}>
                        <Pressable style={styles.category} onPress={() => handlePress('all')}>
                            <Text style={styles.categoryName}>Tout afficher</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <ScrollView style={styles.container}>
                <View style={{ marginTop: statusBarHeight, margin: 20 }}>
                    <Text style={styles.title}>Liste des associations</Text>
                    {associations.map((association, index) => (
                 
                            <View key={association.id} style={[styles.association, styles['nb' + index]]}>
                                <TouchableOpacity onPress={() => navigation.navigate('association', { id: association.id } )}>
                                <Text style={styles.associationTitle}>{association.name} | {association.category} </Text>
                                <Text style={styles.associationDescription}>{association.description}</Text>
                                <Text style={styles.associationAdresse}>{association.adresse}</Text>
                                <Text style={styles.associationTown}>{association.postcode + ' ' + association.town}</Text>
                                </TouchableOpacity>
                            </View>
                   
  
                    ))}
                </View>
                <Pressable style={styles.category} onPress={() => setShowModal(true)}>
                        <Text style={styles.btnReturn}>Retour</Text>
                    </Pressable>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    modalContainer: {
        height: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignContent: 'center', 
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    association: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
    associationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    associationDescription: {
        paddingBottom: 5,
    },
    nb0: {
        backgroundColor: '#fde6a2',
    },
    nb1: {
        backgroundColor: '#a5c5fa',
    },
    nb2: {
        backgroundColor: '#f28c83',
    },
    nb3: {
        backgroundColor: '#afe3bd',
    },
    nb4: {
        backgroundColor: '#d4c9ef',
    },
    nb5: {
        backgroundColor: '#f7b9b4',
    },
    nb6: {
        backgroundColor: '#cbbfbf',
    },

    nb7: {
        backgroundColor: '#fde6a2',
    },
    nb8: {
        backgroundColor: '#a5c5fa',
    },
    nb9: {
        backgroundColor: '#f28c83',
    },
    nb10: {
        backgroundColor: '#afe3bd',
    },
    nb11: {
        backgroundColor: '#d4c9ef',
    },
    nb12: {
        backgroundColor: '#f7b9b4',
    },
    nb13: {
        backgroundColor: '#cbbfbf',
    },

    nb14: {
        backgroundColor: '#fde6a2',
    },
    nbAll: {
        backgroundColor: '#FFC300',
    },
    categoryBtn: {
        width: '45%',
        borderRadius: 20,
        margin: 5
    },
    category: {
        alignContent: 'center', 
        justifyContent: 'center',  
        height: 60,
        padding: 5,
        margin: 10,
        borderRadius: 5,
    },
    categoryName: {
        textAlign: 'center',
    },
    btnReturn: {
        backgroundColor: '#7DCEA0',
        width: 100,
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
        color: 'white'
    }
});

export default AssociationList;
