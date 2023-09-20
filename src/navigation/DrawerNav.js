import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import Notifications from '../screens/Notifications'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profie from '../screens/Profie';
import SideMenu from '../components/SideMenu';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import ResetPassword from '../screens/ResetPassword';
import AboutUs from '../screens/AboutUs';
import AnimatedMarkers from '../components/AnimatedMarkers';
const Drawer = createDrawerNavigator();
const Root=()=> {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
    return (
      <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerOpen={isDrawerOpen}
      drawerType="slide"
      screenOptions={{headerShown:false}} 
      drawerContent={props => <SideMenu {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={
       { drawerIcon:(color)=>(
        <Ionicons
       
        name="home"
        color={color}
        size={24}
        style={{backgroundColor: 'transparent'}}
      />)
       
       } 
      }  />
        <Drawer.Screen name="Profile" component={Profie}  
        options={
          { drawerIcon:(color)=>(
           <Ionicons
           
           name="person"
           color={color}
           size={24}
           style={{backgroundColor: 'transparent'}}
         />)
          } 
         }/>
        <Drawer.Screen name="Notifications" component={Notifications} 
        options={
          { drawerIcon:(color)=>(
           <Icon
           
           name="bell"
           color={color}
           size={24}
           style={{backgroundColor: 'transparent'}}
         />)
          } 
         } />
         <Drawer.Screen name="About Us" component={AboutUs}
         options={
          { drawerIcon:(color)=>(
           <Icon
          
           name="info-circle"
           color={color}
           size={24}
           style={{backgroundColor: 'transparent'}}
         />)
          } 
         } />
         <Drawer.Screen name="Rest Password" component={ResetPassword}
         options={
          { drawerIcon:(color)=>(
           <Icon
           
           name="key"
           color={color}
           size={24}
           style={{backgroundColor: 'transparent'}}
         />)
          } 
         } />
    </Drawer.Navigator>
      
    );
  }

export default Root

const styles = StyleSheet.create({})