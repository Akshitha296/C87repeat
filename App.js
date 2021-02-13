import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import {AppDrawerNavigator} from './components/AppDrawerNavigator'
import { AppTabNavigator } from './screens/AppTabNavigator'
import { AppStackNavigator } from './components/AppStackNavigator'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  Drawer: {screen: AppDrawerNavigator}, 
  BottomTab: {screen: AppTabNavigator},
  StackNavigator: {screen: AppStackNavigator}
})

const AppContainer = createAppContainer( SwitchNavigator )