import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';


const Stack = createNativeStackNavigator();

const MainRoute = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainRoute

const styles = StyleSheet.create({})