import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import DonationScreen from '../screens/DonationScreen'
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen'

export const AppStackNavigator = createStackNavigator({
    DonationScreen: {
        screen: DonationScreen,
        navigationOptions: {headerShown: false}
    },
    ReceiverDetailsScreen: {
        screen: ReceiverDetailsScreen,
        navigationOptions: {headerShown: false}
    }},
    {initialRouteName: 'DonationScreen'}
)