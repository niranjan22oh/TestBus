import {StyleSheet, Text, View, Image, ImageBackground,TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profie = ({navigation}) => {
  const [profile,setProfile]=useState({});
  useEffect(()=>{
        
    loadDets()
},[])
const loadDets=async ()=>{
  try {
    let users=await AsyncStorage.getItem('userDetails') 
    parsedUser=await JSON.parse(users)
    setProfile(parsedUser)
   
} catch (e) {
    console.log(`Logged In Error ${e}`)
}
}
  return (
    <View style={{flex: 1, backgroundColor: '#FFD580'}}>
      <View style={{flex: 0.3}}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/bus_bg_cir.png')}>
          <TouchableOpacity
            style={{margin: 20, justifyContent: 'center'}}
            onPress={() => navigation.openDrawer()}>
            <Icon
              testID="nextButton"
              name="bars"
              color="#777f00"
              size={38}
              style={{
                width: 38,
                backgroundColor: 'white',
                paddingHorizontal: 2,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../assets/images/avatar.png')}
              style={styles.bgStyle}
            />
            <Text style={{fontSize: 30, fontWeight: '800', color: 'white'}}>
              {profile.student_name}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.boxStyle}>
        <View style={styles.profileEle}>
          <View style={styles.indvProf}>
            <Icon
              name="user-circle-o"
              color="orange"
              size={30}
              style={{backgroundColor: 'transparent', marginRight: 1}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold',color:'grey'}}> Name: </Text>
            <Text style={{fontSize: 20,color:'grey'}}> {profile.student_name} </Text>
          </View>
          <View style={styles.indvProf}>
            <Icon
              name="mortar-board"
              color="orange"
              size={30}
              style={{backgroundColor: 'transparent', marginRight: 1}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold',color:'grey'}}> Student: </Text>
            <Text style={{fontSize: 20,color:'grey'}}> {profile.student_name} </Text>
          </View>
          <View style={styles.indvProf}>
            <Icon
              name="id-badge"
              color="orange"
              size={30}
              style={{backgroundColor: 'transparent', marginRight: 1}}
            />
            <Text style={{marginLeft:10,fontSize: 20, fontWeight: 'bold',color:'grey'}}>
              
              Enrollment Id:
            </Text>
            <Text style={{fontSize: 20,color:'grey'}}> {profile.en_number} </Text>
          </View>
          <View style={styles.indvProf}>
            <Ionicons
              name="mail"
              color="orange"
              size={30}
              style={{backgroundColor: 'transparent', marginRight: 1}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold',color:'grey'}}> Email Id: </Text>
            <Text style={{fontSize: 17,color:'grey'}}> {profile.email} </Text>
          </View>
          <View style={styles.indvProf}>
            <Icon
              name="id-badge"
              color="orange"
              size={30}
              style={{backgroundColor: 'transparent', marginRight: 5}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold',color:'grey'}}> Id: </Text>
            <Text style={{fontSize: 20,color:'grey'}}> {profile.id}  </Text>
          </View>
          <View style={styles.indvProf}>
            <Icon
              name="vcard-o"
              color="orange"
              size={30}
              style={{backgroundColor: 'transparent', marginRight: 1}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold',color:'grey'}}> Std: </Text>
            <Text style={{fontSize: 20,color:'grey'}}> {profile.std}  </Text>
          </View>
          <View style={styles.indvProf}>
            <Icon
              name="vcard-o"
              color="orange"
              size={30}
              style={{backgroundColor: 'transparent', marginRight: 1}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold',color:'grey'}}> Division: </Text>
            <Text style={{fontSize: 20,color:'grey'}}> {profile.division} </Text>
          </View>
          <View style={styles.indvProf}>
            <Icon
              name="university"
              color="orange"
              size={30}
              style={{backgroundColor: 'transparent', marginRight: 1}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold',color:'grey'}}> School: </Text>
            <Text style={{fontSize: 20,color:'grey'}}> {profile.school_name}  </Text>
          </View>
         
        </View>
      </View>
    </View>
  );
};

export default Profie;

const styles = StyleSheet.create({
  profileEle: {
    flex: 1,
    width: '90%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  indvProf: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    marginVertical: '2%',
  },
  bgStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,

    backgroundColor: 'white',

    
  },
  boxStyle: {flex: 0.65, alignItems: 'center', justifyContent: 'center'},
});
