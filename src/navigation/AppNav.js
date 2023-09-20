import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignedInStack from './SignedInStack'
import SignedOutStack from './SignedOutStack'
import { AuthContext } from '../context/AuthContext'
const AppNav = () => {
    const {isLoading,userToken}=useContext(AuthContext);
    if(isLoading){
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ffdf00'}}>
            <Image style={{width:100,height:100}}  source={require('../assets/buslogo.png')}/>
            <ActivityIndicator size={'large'}/>
        </View>
    }
  return (
    <NavigationContainer>
        {userToken!==null?<SignedInStack/>:<SignedOutStack/>}
      
    </NavigationContainer>
  )
}

export default AppNav

const styles = StyleSheet.create({})