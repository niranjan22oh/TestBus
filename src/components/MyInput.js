import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyInput = ({
  label,
  iconName,
  error,
  password,
  onFoucs = () => {},
  ...props
}) => {
  return (
    <View style={{marginBottom:20, }}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default MyInput

const styles = StyleSheet.create({
  label:{
     fontSize:14,
     color:'grey',
     marginVertical:5,
  }
})