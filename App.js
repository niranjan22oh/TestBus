import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

const Drawer = createDrawerNavigator();
const Stack=createNativeStackNavigator();


export default function App() {
  

  return (
    <AuthProvider>
    <AppNav/>
    </AuthProvider>
  );
}