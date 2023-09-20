import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AppState } from 'react-native';
import BackgroundService from 'react-native-background-actions';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [resArray, setResArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [source, setSource] = useState({ latitude: 0, longitude: 0 });
  const[time,setTime]=useState(0);
  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const veryIntensiveTask = async (taskDataArguments) => {
  const { delay, startTime, endTime,bus } = taskDataArguments;

  const checkTimeRange = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const startTimeHours = new Date(startTime).getHours();
    const endTimeHours = new Date(endTime).getHours();

    // Check if the current time is within the specified range (from 4pm to 6am on the next day)
    if (
      (currentHour >= startTimeHours && currentHour < 24) ||
      (currentHour >= 0 && currentHour < endTimeHours)
    ) {
      return true;
    }
    return false;
  };

  while (!checkTimeRange()) {
    // Sleep until the current time falls within the specified range
    await sleep(900000); // Sleep for 15 minute before checking again
  }

  // Now, the current time is within the range, perform the task
  await new Promise(async (resolve) => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
     
      
      await fetchCoordinates();
      
      await BackgroundService.updateNotification({ taskDesc: 'YOUR_NPTIFICATION ' + i }); 
      await sleep(delay);
      
    }
  });
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
      
      const src={lat:0.0000,long: 0.00000}
      
     
      
      setCoordinates({ latitude: newLat, longitude: newLng });
      

      
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane',
  parameters: {
    delay: 60000,
    startTime: new Date().setHours(12, 0, 0, 0), 
    endTime: new Date().setHours(23, 0, 0, 0),  
    bus:coordinates
  },
};
  const login = async (result) => {
    let res = result;
   
    setResArray(result);
   

    await AsyncStorage.setItem('resultArray', JSON.stringify(res));
    await AsyncStorage.setItem('userToken', 'YOUR_JWT_API_RECIEVED_TOKEN');
    setUserToken('YOUR_TOKEN');
    
    
    setIsLoading(false);
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const logout = async () => {
    setUserToken(null);

    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userDetails');
    await AsyncStorage.removeItem('resultArray');
   
    setIsLoading(false);
  
    await BackgroundService.stop();
  };

  const isLoggedIn = async () => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
    
    } catch (e) {
      
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, resArray }}>
      {children}
    </AuthContext.Provider>
  );
};
