import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';

import LogInform from '../components/provider/LogInForm';

export default function App() {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    // Cacher la fenêtre modale après 5 secondes
    const timeoutId = setTimeout(() => {
      setModalVisible(false);
    }, 5000);

    // Nettoyer le timeout lors du démontage du composant
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
    <View style={{ flex: 1 }}>
      <Modal visible={modalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Modal Content</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Text>App Content</Text>
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Modal : {
    width: '100%', 
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


