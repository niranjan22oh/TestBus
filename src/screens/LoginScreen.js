import { StyleSheet, View, Text,Image, TextInput,Input,TouchableOpacity ,Button, Alert} from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from "react";
import React from 'react';
import SelectSchool from './SelectSchools';
import ResetPassword from './ResetPassword';

import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({navigation},props) => {
    const [number,setNumber]=useState("");
    const [password,setPassword]=useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const {login}=useContext(AuthContext)
   const passwordHandler=()=>{
     setPasswordVisibility(!passwordVisibility)
   }
   const ResetPasswordHandler=()=>{
    
   }
  const Authentication = async (number, password) => {
    const url ='YOUR_AUTHENTICATION_API'

    
    
    let result = await fetch(url);
    result=await result.json();
  
  
     if(result.apiResult=='ERROR'){
      if(result.message=='Invalid Password !')
      {Alert.alert('Error','Incorrect Mobile Number and Password')
    setNumber('')
    setPassword('')}

      else {Alert.alert('Error',result.message)}
     }
     else{
      login(result);
     }
    };
  const AuthenticationHandler=()=>{
    if(number.length==10&&password.length==99){Authentication(number,password)}
    else{
      Alert.alert('Error','Please enter a valid Username and Password')
    }
  }
    
     return (
       <View
         
         style={styles.container}
         
       >
       <Image style={{width:200,height:200}} source={require("../assets/buslogo.png") }></Image>
       <Text 
       
       style={{fontSize:30,paddingBottom:10,fontWeight:'bold',color:'darkblue'} }>
        Login
        </Text>
        
         
         <View style={styles.loginBox}>
        
       
 
         <TextInput placeholder='Mobile Number' 
         placeholderTextColor="grey" 
         style={styles.inputEntry} 
         keyboardType={'numeric'}
         maxLength={10}
         onChangeText={(number)=>setNumber(number)} 
         value={number}/>
         <View style={styles.passWordStyle}>
         <TextInput placeholder='Password '
         placeholderTextColor="grey"  
         secureTextEntry={passwordVisibility}
         style={[styles.inputEntry,styles.pwdInput]}
         onChangeText={(password)=>setPassword(password)} 
         value={password} 
         />
         <Button title="Show" onPress={passwordHandler}/>
         </View>
         <Button onPress={()=>AuthenticationHandler()} title='Login'/>
         <View >
           
           <View style={styles.passWordStyle}>
             <Text style={{fontWeight:'bold',fontSize:18,color:'white'}}>Forgot Password?</Text>
             <Button title='Reset Here' onPress={() => navigation.navigate('ResetPassword')}/>
           </View>
         </View>
         
         </View>
         
       </View>
     )
 }
 



export default LoginScreen

const styles = StyleSheet.create({
    heading:{
      fontSize:50,
      color:'green',
      marginTop:1,
      marginBottom:40,
    },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#F0A500',
      },
      loginBox:{
        width:'80%',
        height:'60%',
       
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'yellow',  
        elevation:20, 
        opacity:0.9
      },
      inputEntry:{
        backgroundColor:'white',
        fontSize:16,
        color:'black',
        width:'90%',
        padding:10,
        borderRadius:5,
        marginBottom:10,
        },
        label:{
          alignContent:"flex-start",
        },
        passWordStyle:{
          flexDirection:'row',
          alignItems:'center',
          margin:20,
          justifyContent:'space-around',
          gap:10
        },
        pwdInput:{
          backgroundColor:'#eee',
          color:'black',
          width:'78%',
          padding:10,
          
        }
    })