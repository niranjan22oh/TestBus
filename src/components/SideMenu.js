import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{useContext}from 'react'
import { DrawerContentScrollView,DrawerItem,DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../context/AuthContext';
const SideMenu = (props) => {
  const {logout}=useContext(AuthContext)
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3, backgroundColor: 'yellow'}}>
        <Image
          source={require('../assets/images/avatar.png')}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            marginLeft: 50,
            marginVertical: 20,
          }}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 60,color:'grey'}}>
          John Doe
        </Text>
      </View>
      <View style={{flex: 0.65}}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList
            {...props}
            
          />
        <TouchableOpacity onPress={()=>{logout()}}style={{flexDirection:'row',marginLeft:'7%',marginTop:'2%'}}>
          <Icon
           name="sign-out"
           color={'grey'}
           size={30}
           style={{backgroundColor: 'transparent',transform: [{rotateY: '180deg'}]}}/>
           <Text style={{alignItems:'center', marginLeft:'10%',fontSize:16,fontWeight:'bold',color:'red'}}>Logout</Text>
          </TouchableOpacity>   
        </DrawerContentScrollView>
      </View>
      <View style={{flex: 0.2}}></View>
    </View>
  );
    
}

export default SideMenu

const styles = StyleSheet.create({})