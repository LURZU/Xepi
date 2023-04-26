import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import  AuthProvider  from '../../components/provider/AuthContext';
import Colors from '../../constants/Colors';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';



/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <Feather name="map-pin" size={24} color="white" />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'profil',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color="white" />,
        }}
      />
       <Tabs.Screen
        name="don"
        options={{
          title: 'Don',
          tabBarIcon: ({ color }) => <FontAwesome5 name="money-check-alt" size={24} color="white" />,
        }}
      />
     
    </Tabs>
    </AuthProvider>
  );
}
