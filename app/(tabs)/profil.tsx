import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../../components/Themed';
import ProfilScreen from '../../components/global/ProfilScreen';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
     <ProfilScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
