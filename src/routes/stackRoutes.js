import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomePage from '../pages/HomePage'
import MoviesPage from '../pages/MoviesPage'
import DetailsPage from '../pages/DetailsPage'
import SearchPage from '../pages/SearchPage'

const Stack = createNativeStackNavigator()

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsPage}
        options={{
          headerShown: false,
          title: 'Detalhes',
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{
          title: 'Sua busca',
          headerTintColor: '#FFF',
          headerTitleStyle: {
            color: '#FFF',
          },
          headerStyle: {
            backgroundColor: '#141a29',
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default StackRoutes
