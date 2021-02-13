import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Alert, Image, Modal, ScrollView } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import DonationScreen from '../screens/DonationScreen'
import RequestScreen from '../screens/RequestScreen'

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks: {
        screen: DonationScreen,
        navigationOptions: {
            tabBarIcon: <Image source = {require('../assets/bookfortabbar.png')}
                               style = {{width: 20, height: 20}}
                            />,
            tabBarLabel: "Donate Books"
        }
    },

    RequestBooks: {
        screen: RequestScreen,
        navigationOptions: {
            tabBarIcon: <Image source = {require('../assets/download.png')}
                               style = {{width: 20, height: 20}}
                        />,
            tabBarLabel: "Request Books"
        }
    }
})