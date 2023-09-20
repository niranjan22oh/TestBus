import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
const MovingMarkers = (props) => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [source, setSource] = useState({ latitude: 0, longitude: 0 });
  const[time,setTime]=useState(0);
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.012;
let LONGITUDE_DELTA = 0.012;
LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [firstAnimation, setFirstAnimation] = useState(true);
  const mapViewRef = useRef(null);
  const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const markerRef = useRef(new AnimatedRegion(initialRegion)).current;

  useEffect(() => {
    const interval = setInterval(fetchCoordinates, 10000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Ensure that coordinates have valid values before calling the function

   
    if (coordinates.lat !== 0 && coordinates.long !== 0) {
      const source = { lat: coordinates.latitude, long: coordinates.longitude };
    
      const destination={lat:18.5478,long:73.9467633}
      getShortestTimeToDestination(source, destination)
        .then((travelTime) => {
          if (travelTime) {
            setTime(travelTime);
            props.getEstTime(travelTime);
          
          } else {
            console.log('Failed to fetch the shortest travel time.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [coordinates]);
  useEffect(() => {
    // Animate the marker from 0,0 to its initial position
    if (firstAnimation && coordinates.latitude !== 0 && coordinates.longitude !== 0) {
      setTimeout(() => {
        markerRef.timing({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          duration: 200, // 2 seconds animation duration
        }).start(() => setFirstAnimation(false));
      }, 500); // Delay the animation by 500ms to allow the map to load
    } else if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
      // Animate the marker to the new coordinates with a duration of 10 seconds

      markerRef.timing({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        duration: 10000, // 10 seconds animation duration
      }).start();
    }
  }, [coordinates, firstAnimation]);
  const school = {
    
    latitude:props.school.latitude,
    longitude: props.school.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const geoLocation = {
   
    latitude: props.home.latitude,
    longitude:props.home.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const fetchCoordinates = async () => {
    try {
      const response = await axios.get('YOUR_GPS_BACKEND_API');
      const { vehicle } = response.data;
      const { lat, lng } = vehicle;
    
      // Convert lat and lng to numbers using parseFloat
      const newLat = parseFloat(lat);
      const newLng = parseFloat(lng);
      setSource({lat:newLat,long:newLng})
      
      const src={lat:0.000,long: 0.0000}
      
     
     
      setCoordinates({ latitude: newLat, longitude: newLng });
      

      
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };
  const getShortestTimeToDestination = async (source, destination) => {
    
    try {
      // Prepare API request URL
      //Using MapQuest API to find the minimum expected time 
      const apiUrl = `https://www.mapquestapi.com/directions/v2/route?key=YourMapQuestAPIKEY&from=${source.lat},${source.long}&to=${destination.lat},${destination.long}&unit=1`; // Unit=1 for time in minutes
      let res = await fetch(apiUrl);
      result = await res.json();
     
      // Make the API request
      const response = await axios.get(apiUrl);
      
      // Parse the response
      const { route } = response.data;
      if (route) {
        const { formattedTime } = route;
       
       setTime(formattedTime);
      
        return formattedTime; // Returns the travel time in human-readable format (e.g., "1:30:00")

      }
  
      return null;
    } catch (error) {
      console.error('Error fetching directions:', error);
      return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {coordinates.latitude !== 0 && coordinates.longitude !== 0 && (
        <MapView
          ref={mapViewRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={(region) => {
            // Update the MapView region when the user manually changes it
            mapViewRef.current.animateToRegion(region, 1000);
          }}
        >
        <Marker
          coordinate={{
            latitude: geoLocation && Number(geoLocation.latitude),
            longitude: geoLocation && Number(geoLocation.longitude),
          }}
          image={require('../assets/home_map.png')}
        />
        <Marker
          coordinate={{
            latitude: school && Number(school.latitude),
            longitude: school && Number(school.longitude),
          }}
          image={require('../assets/school_map.png')}
        />
          <Marker.Animated coordinate={markerRef} />
        </MapView>
      )}
    </View>
  );
};

export default MovingMarkers;

const styles = StyleSheet.create({});
