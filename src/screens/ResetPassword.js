import { StyleSheet, View, Text,Image, TextInput,Input,TouchableOpacity ,Button} from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import React from 'react';


const ResetPassword = ({navigation}) => {
    const [number,setNumber]=useState("");
    const[otp,setOtp]=useState("")
    const [newpassword,setnewPassword]=useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    
   const passwordHandler=()=>{
     setPasswordVisibility(!passwordVisibility)
   }
  return (
    <View
      style={styles.container}
      
    >
    
    <Text style={{fontSize:30,paddingBottom:10,fontWeight:'bold',color:'darkblue'}}>Reset Password</Text>
      
      <View style={styles.loginBox}>
     
    

      <TextInput placeholder='Mobile Number' 
      placeholderTextColor="grey" 
      style={styles.inputEntry} 
      onChangeText={(number)=>setNumber(number)} 
      value={number}/>
     
      <Button title='Verify Via OTP'/>
      <TextInput placeholder='Enter the recieved OTP' 
      placeholderTextColor="grey" 
      style={styles.inputEntry} 
      onChangeText={(otp)=>setOtp(otp)} 
      value={otp}/>
       <View style={styles.passWordStyle}>
         <TextInput placeholder='Enter New   Password' 
         placeholderTextColor="grey" 
         secureTextEntry={passwordVisibility}
         style={[styles.inputEntry,styles.pwdInput]}
         onChangeText={(newpassword)=>setnewPassword(newpassword)} 
         value={newpassword} 
         />
         <Button title="Show" onPress={passwordHandler}/>
         </View>
         <TouchableOpacity style={styles.RstBtn} onPress={() => resetPasswordAlgo()}><Text style={{color:'white',fontSize:20,fontWeight:'bold',padding:7,justifyContent:'center',alignItems:'center'}}> Reset Password</Text></TouchableOpacity>
      </View>
      
    </View>
  )
}

export default ResetPassword

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
        backgroundColor:'#eee',
        fontSize:16,
        color:'black',
        width:'90%',
        padding:10,
        borderRadius:5,
        marginVertical:20,
        },
        label:{
          alignContent:"flex-start",
        },
        passWordStyle:{
          flexDirection:'row',
          alignItems:'center',
          margin:5,
          justifyContent:'space-around',
          gap:10
        },
        pwdInput:{
          backgroundColor:'#eee',
          color:'black',
          width:'78%',
          padding:10,
          
        },
        RstBtn:{
          height:'auto',
          width:'auto',
          backgroundColor:'#5ca904',
          justifyContent:'center',
          alignItems:'center'
        }

    })