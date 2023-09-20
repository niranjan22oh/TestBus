import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectSchool from '../screens/SelectSchools';
import Root from './DrawerNav';
import LoginScreen from '../screens/LoginScreen';
import ResetPassword from '../screens/ResetPassword';
const Stack=createNativeStackNavigator();
const SignedOutStack = () => {
  return (
    
    <Stack.Navigator initialRouteName={LoginScreen}screenOptions={{headerShown:false}}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
      

  )
}

export default SignedOutStack

const styles = StyleSheet.create({})