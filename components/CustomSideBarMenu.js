import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Alert, Image, Modal, ScrollView } from 'react-native';
import db from '../config'
import firebase from 'firebase'
import { DrawerItems } from 'react-navigation-drawer'

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems
                        {...this.props}
                    />

                </View>
                <View style = {styles.logoutContainer}>
                    <TouchableOpacity onPress = {() => {
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}
                    style = {styles.logoutButton}
                    >
                        <Text style = {styles.logoutText}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    drawerItemsContainer: {
        flex: 0.8,
    },
    logoutButton: {
        height: 30,
        width: '100%',
        justifyContent: 'center',
        padding: 10,
    },
    logoutContainer: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: 30,
    },
    logoutText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})