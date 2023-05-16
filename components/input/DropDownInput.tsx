import React, { useState, useContext, useEffect } from 'react';
import { List } from 'react-native-paper';
import {  StyleSheet, View  } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function DropDownInput(props: any) {
    const [selectedValue, setSelectedValue] = useState('');


    const handleValueChange = (value: string) => {
        setSelectedValue(value)
        if (props.onValueChange) {
          props.onValueChange(value);
        }
      };

    return (
        <View style={styles.container}>
        <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={styles.picker}
        >
            {props.items.map((item: string) => {
                return <Picker.Item label={item} value={item} key={item} />
            })}
        </Picker>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        color: "#000",
        backgroundColor: "#F2F2F2",
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 0,
        paddingHorizontal: 0,
        borderRadius: 20,
        width: '85%', 
        alignSelf: 'center', 
        overflow: 'visible',

    }, 
      picker: {
        height: 40,
      },
   
})