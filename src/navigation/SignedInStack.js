import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectSchool from '../screens/SelectSchools';
import Root from './DrawerNav';
import messaging from '@react-native-firebase/messaging'
import ResetPassword from '../screens/ResetPassword';
const Stack=createNativeStackNavigator();
const SignedInStack = (props) => {
  useEffect(() => {
   getDeviceToken()
  }, [])
  const getDeviceToken= async ()=>{
    let token=await messaging().getToken();
    
  }
  return (
    
    <Stack.Navigator screenOptions={{headerShown:false}}>
      
     
    <Stack.Screen name="SelectSchool" component={SelectSchool} />
    <Stack.Screen
      name="Root"
      component={Root}
      options={{ headerShown: false }}
    />
    </Stack.Navigator>
      

  )
}

export default SignedInStack

const styles = StyleSheet.create({})