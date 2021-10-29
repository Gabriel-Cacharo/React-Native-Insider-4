import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

import Routes from './src/routes'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Routes />
    </NavigationContainer>
  )
}
