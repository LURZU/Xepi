import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Image, Text } from 'react-native';
import  AuthProvider  from '../../components/provider/AuthContext';
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons'; 

import React from 'react';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray', 
        tabBarLabelStyle: { fontSize: 12 }, 
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 2, 
          shadowColor: 'rgba(0, 0, 0, 0.1)', 
          shadowOpacity: 1, 
          shadowRadius: 3, 
          shadowOffset: { width: 0, height: 2 }, 
          marginLeft: 16,
          marginRight: 16, 
          marginBottom: 8, 
          borderRadius: 8, 
        },
        tabBarShowLabel: false, 
        tabBarIcon: ({ color }) => <FontAwesome name="map" size={24} color="grey" />,
        headerTitle: 'XEPI',
        headerRight: () => (
          <Link href="/login" asChild>
            <Pressable style={{marginRight: 20}}>
              {({ pressed }) => (
                <Image source={require('../../assets/images/logo/icon_profil.png')}/>
              )}
            </Pressable>
          </Link>
        ),
      }}
      
      >
      <Tabs.Screen
        name="index"
        options=
        {{
          tabBarIcon: ({ color }) => <FontAwesome name="map" size={24} color="grey" />,
          headerTitle: 'XEPI',
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable style={{marginRight: 20}}>
                {({ pressed }) => (
                  <Image source={require('../../assets/images/logo/icon_profil.png')}/>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="liste"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color="grey" />,
        }}
      />
      
       <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color }) => <FontAwesome name="share" size={24} color="grey" />,
        }}
      />
    </Tabs>
  );
}
