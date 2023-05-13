import React, { useState, useContext, useEffect } from 'react';
import { Avatar, Icon, ListItem } from '@rneui/themed';
import {  StyleSheet  } from 'react-native';

export default function DropDownInput(props: any) {
    const [expanded, setExpanded] = useState(false);

    return (
            <ListItem.Accordion
            content={
            <ListItem.Content style={{width: '100%', backgroundColor: "#F2F2F2", height: '100%'}}>
                <ListItem.Title style={{ }}>Top Users</ListItem.Title>
                <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
            </ListItem.Content>}
            isExpanded={expanded}
            onPress={() => {
            setExpanded(!expanded);
            }}
            style={styles.container}>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>John Doe</ListItem.Title>
                        <ListItem.Subtitle>Principle Engineer</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                <ListItem.Content>
                    <ListItem.Title>Albert</ListItem.Title>
                    <ListItem.Subtitle>Staff Engineer</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
            </ListItem.Accordion>
    )
}

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
        borderRadius: 20,
        width: '100%',
    }
})