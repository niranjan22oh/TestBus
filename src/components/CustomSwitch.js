import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 30,
          width: 150,
          backgroundColor:'#ff8fff',
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(false)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == false ? selectionColor : '#ff8fff',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == false ? 'white' : selectionColor,fontWeight:'bold'
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(true)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == true ? selectionColor : '#ff8fff',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == true ? 'white' : selectionColor,fontWeight:'bold'
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;