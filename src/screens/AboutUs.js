import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/FontAwesome'
const AboutUs = ({navigation}) => {
    return (
      <View style={{flex:1,backgroundColor:'#facd94'}}>
        <View styles={{backgroundColor: 'red'}}>
          <TouchableOpacity
            style={{margin: 20, justifyContent: 'center'}}
            onPress={() => navigation.openDrawer()}>
            <Icon
              
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
        </View>
        <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#facd94'}} >
          <Image
            style={{width: 200, height: 200}}
            source={require('..//assets/buslogo.png')}></Image>
          <Text
            style={{
              fontSize: 30,
              paddingBottom: 10,
              fontWeight: 'bold',
              color: 'darkblue',
            }}>
            About Us
          </Text>
          <View style={styles.paragraph}>
            <Text style={styles.paraText}>
              We understand the importance of ensuring the safety and security
              of your children during their daily school commute. Our app is
              designed to provide peace of mind to parents, guardians, and
              school administrators by offering real-time tracking of school
              buses.With our user-friendly interface, you can easily access
              up-to-date information about the location of your child's school
              bus, right at your fingertips. Our robust GPS technology
              accurately tracks the bus's position, allowing you to know when it
              will arrive at your child's stop or the school. No more worrying
              about missed buses or unexpected delays!
            </Text>
          </View>
        </View>
      </View>
    );
}

export default AboutUs

const styles = StyleSheet.create({
        
        container: {
          flex: 0.9,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'#facd94',
        },
        paragraph:{
            margin:'5%'
        },
        paraText:{
            color:'darkblue',
            fontSize:18,
            textAlign:'justify'
        }
})