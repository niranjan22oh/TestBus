import * as React from "react";
import {useRef, useState,useEffect} from 'react';
import {FAB, Title} from 'react-native-paper'
//import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Switch,
  Pressable,
  Image,
  TouchableOpacity
} from "react-native";
import CustomSwitch from "../components/CustomSwitch";
import MapView,{Marker} from "react-native-maps";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import AnimatedMarkers from "../components/AnimatedMarkers";
import MovingMarkers from "../components/MovingMarkers";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//Location Code Begins here
function isWithin5Meters(x_lat, x_long, y_lat, y_long) {
  console.log("X cordinates are: ",x_lat,x_long," Y cordinates are: ",y_lat,y_long)
  const R = 6371000; // Radius of the Earth in meters

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Convert the coordinates from string to numbers and then to radians
  const lat1_rad = toRadians(parseFloat(x_lat));
  const long1_rad = toRadians(parseFloat(x_long));
  const lat2_rad = toRadians(parseFloat(y_lat));
  const long2_rad = toRadians(parseFloat(y_long));

  const delta_lat = lat2_rad - lat1_rad; // Difference in latitude in radians
  const delta_long = long2_rad - long1_rad; // Difference in longitude in radians

  const a =
    Math.sin(delta_lat / 2) * Math.sin(delta_lat / 2) +
    Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(delta_long / 2) * Math.sin(delta_long / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance between the two points in meters
  console.log("Distance is ",distance)
  // Check if the distance is within 5 meters
  if (distance <= 5) {
    return true;
  } else {
    return false;
  }
}
function getCurrentTimeInHHMMFormat() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}${minutes}`;
}

function assignRouteId(pickupStartTime, pickupEndTime, dropStartTime, dropEndTime,pickupID,dropID) {
  const currentTime = getCurrentTimeInHHMMFormat();
 
  const currentTimeNum = Number(currentTime);
  const pickupStartTimeNum = Number(pickupStartTime);
  const pickupEndTimeNum = Number(pickupEndTime);
  const dropStartTimeNum = Number(dropStartTime);
  const dropEndTimeNum = Number(dropEndTime);

  if (
    isNaN(currentTimeNum) ||
    isNaN(pickupStartTimeNum) ||
    isNaN(pickupEndTimeNum) ||
    isNaN(dropStartTimeNum) ||
    isNaN(dropEndTimeNum)
  ) {
    throw new Error('Invalid time format. Please use "hhmm" format in 24-hour clock.');
  }

  let route_id;
  if (currentTimeNum >= pickupStartTimeNum && currentTimeNum <= pickupEndTimeNum) {
   
    route_id = pickupID;
   
  } else if (currentTimeNum >= dropStartTimeNum && currentTimeNum <= dropEndTimeNum) {
    
    route_id = dropID;
  } else {
   
    route_id = null;
  }
 
  return route_id;
}



let count=10;
async function UpdateBusLocn(newbusLocation,result,route_id) {
 
  while (!isWithin5Meters(newbusLocation.lat, newbusLocation.long, result[0].dropLat, result[0].dropLng)&&count>0) {
    newbusLocation = await BusLoctn(route_id);
    
    count=count-1;
   
    // Delay for 10 seconds
    await sleep(10000); // Sleep for 10 seconds before the next iteration
  }
}

// Helper function for delaying execution
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const Update= async (newbusLocation,result,routeID) => {
 
  await UpdateBusLocn(newbusLocation,result,routeID);
  return newbusLocation;
  // Access the updated newBusLocn outside the function
 
};
const BusLoctn = async()=>{
 
  const urlBus ='YOUR_BACKEND_GPS_API'
 
  let res = await fetch(urlBus);
  result = await res.json();
  let busdetail={};
  busdetail.lat = result.vehicle.lat;
  busdetail.long = result.vehicle.lng;
 
  return busdetail;
}

//Location Code Ends here

const HomeScreen = ({navigation}) => {
    const {m,setM}=useState(0);
  const [switchValue, setSwitchValue] = useState(false);
  const [scl,setScl]=useState({})
  const [hm,setHm]=useState({})
  const [bus,setBus]=useState({})
  const [loading,setIsLoading]=useState(true);
  const[driver,setDriver]=useState();
  const[imei,setImei]=useState();
  const[routeName,setRouteName]=useState();
  const[grp,setGrp]=useState();
  const[destination,setDestination]=useState({});
  const[estTime,setEstTime]=useState();
  useEffect(()=>{
    setIsLoading(true); 
       
    getLocations(); 
    setIsLoading(false);
    
  },[])
  
  const INITIAL_POSITION = {
   
    latitude: 0.0000,
    longitude: 0.0000,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const school = {
   
    latitude: scl.lat,
    longitude: scl.lng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const geoLocation = {
  
    latitude: hm.lat,
    longitude: hm.lng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const bus_loc = {
    
    latitude: bus.lat,
    longitude: bus.long,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const handleSwitchToggle = (value) => {
    setSwitchValue(value);
    
  };
  const getEstimatedTimeFromChild=(time)=>{
   
    setEstTime(time)
  }
  const getLocations=async()=>{
    try {
      let user=await AsyncStorage.getItem('userDetails');
     
      user=JSON.parse(user)
      let tempschool={};
      tempschool.lat=user.school_lat;
      tempschool.lng=user.school_lng;
      setScl(tempschool);
     
      let tempHome={}
      tempHome.lat=user.pickipLat;
      tempHome.lng=user.pickupLng;
     
      setHm(tempHome);
      let pickupStartTime=user.pickupStartTime
      let pickupEndTime=user.pickupEndTime
      let dropStartTime=user.dropStartTime;
      let dropEndTime=user.dropEndTime;
      let pickupID=user.pickup_route_id;
      let dropID=user.drop_route_id;
     
      let routeID= assignRouteId(pickupStartTime, pickupEndTime, dropStartTime,dropEndTime,pickupID,dropID);
      let busLocation={};
      if(routeID===pickupID){
        setDriver(user.pickupDriver);
        setGrp(user.pickupGroupName);
        setImei(user.pickupImei);
        setRouteName(user.pickupRouteName)
        setDestination(school);
      }
      else if(routeID===dropID){
        setDriver(user.dropDriver);
        setGrp(user.dropGroupName);
        setImei(user.dropImei);
        setRouteName(user.dropRouteName)
        setDestination(geoLocation)
        
      }
      busLocation=await BusLoctn()
   
      setBus(busLocation);
      
  
    } catch (error) {
      console.log(`Logged In Error ${error}`)
    }
  }
  return (
   <View style={styles.bcon}>
      <View styles={{backgroundColor:'red'}}>
      <TouchableOpacity style={{margin:20 ,justifyContent:'center'}} onPress={() => navigation.openDrawer()}>
      
           <Icon
           testID="nextButton"
           name="bars"
           color="#777f00"
           size={38}
           style={{ width:38, backgroundColor: 'white',paddingHorizontal:2,borderRadius:10}}
         />
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        
        <CustomSwitch
          selectionMode={1}
          roundCorner={true}
          option1={'Map'}
          option2={'Satellite'}
          onSelectSwitch={handleSwitchToggle}
          selectionColor={'blue'}
        />
       
      </View>
     <View  style={styles.mapBox}>
    {loading?<Text>Loading</Text>:<MovingMarkers bus={bus_loc} school={school} home={geoLocation} getEstTime={getEstimatedTimeFromChild}/>}
     </View>
      
      
      
       
        <View style={{flex:0.6,height:'20%',width:'90%',backgroundColor:'#00ced1',borderRadius:height*0.05,justifyContent:'space-evenly'}}>
         <View style={{flexDirection:'row'}}>
          <View style={{ flex:0.2,height:70,width:70,backgroundColor:'#01F9C6',marginTop:10,marginLeft:10,borderRadius:35}}>
          <Image style={{height:65,width:65,}}source={require('../assets/images/avatar.png')}/>
          
          </View>
           <View style={{flex:0.6,flexDirection:'column',justifyContent:'space-between',marginLeft:30,marginVertical:5}}>
            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={{fontSize:18,fontWeight:'bold',color:'yellow',marginRight:10}}>Driver Name: </Text><Text style={{fontSize:18,fontWeight:'bold',color:'white',marginRight:10}}>{driver}</Text></View>
            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={{fontSize:18,fontWeight:'bold',color:'yellow',marginRight:10}}>Bus Number: </Text><Text style={{fontSize:18,fontWeight:'bold',color:'white',marginRight:10}}>{imei}</Text></View>
            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={{fontSize:18,fontWeight:'bold',color:'yellow',marginRight:10}}> Route Name: </Text><Text style={{fontSize:18,fontWeight:'bold',color:'white',marginRight:10}}>{routeName}</Text></View>
            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={{fontSize:18,fontWeight:'bold',color:'yellow',marginRight:10}}>Group Name: </Text><Text style={{fontSize:18,fontWeight:'bold',color:'white',marginRight:10}}>{grp}</Text></View>
           
           </View>
           </View>
           <View style={{flex:0.7,backgroundColor:'cyan',justifyContent:'center',width:'90%',marginLeft:'9%',borderRadius:50,marginLeft:30}}>
           <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}><Text style={{fontSize:20,fontWeight:'800',color:'blue',marginRight:10}}>Estimated Time: </Text><Text style={{fontSize:18,fontWeight:'bold',color:'black',marginRight:10}}>{estTime}</Text></View>
           </View>
        </View>
      
    </View>
    

    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
    bcon:{
      flex:1,
      backgroundColor:'#F0A500',
    },
    image:{
        alignSelf:'flex-start',
        marginLeft:15,
        marginVertical:15,
        height:50,
        width:50,
       
    },
    container: {
        flex: 0.95,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'#F0A500',
      },
      map: {
        width: "100%",
        height: "100%",
      },
      mapBox:{
        height:'50%',
        width:'90%',
       
      },
      trafficBtn:{
       height:height*0.07,
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       width:width*0.65,
       backgroundColor:'#ff8fff',
       borderRadius:height*0.07,
    
      },
      radBtn1:{
        width:'50%',
        backgroundColor:'#660099',
        elevation:5,
        height:'100%',
        borderRadius:height*0.07,
        marginRight:5,
        
      },
      radBtn2:{
        width:'50%',
        backgroundColor:'#ff8fff',
        elevation:5,
        height:'100%',
        borderRadius:height*0.07,
        
      },
      radbtnText:{
       fontWeight:'bold',
       color:'white',
       fontSize:20,
      
       alignSelf:'center',
       justifyContent:'center'
       
       
      },
      
    

    
})