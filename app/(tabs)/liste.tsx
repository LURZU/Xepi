import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import  AssociationList from '../../components/association/AssociationList';

export default function Liste() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AssociationList />
    </View>
  );
}
