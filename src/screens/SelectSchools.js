import { Image, StyleSheet, Text, View,Pressable,TextInput,FlatList ,TouchableOpacity,Button,Alert} from 'react-native'
import React ,{useState,useRef,useContext,useEffect} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import schools from '../../db/schools'
import DrawerNav from '../navigation/DrawerNav';
import HomeScreen from './HomeScreen';

const SelectSchool = ({navigation},props) => {
  let parsedUsers;
  const[users,setUsers]=useState([])
  const[userDetails,setUserDetails]=useState({});
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(schools);
  const [selectedSchool, setSelectedSchool] = useState('');
  const searchRef = useRef();
  useEffect(()=>{
        
    getSchools()
},[])


  const setUser= async()=>{
       let flag=false;
      
       if(selectedSchool===''){
        Alert.alert("Error","please choose valid school")
       }
       
       
       
       for (let i = 0; i < users.length; i++) {
        
        if(users[i].school_name===selectedSchool){
            stringDets=JSON.stringify(users[i])
            flag=true
            AsyncStorage.setItem('userDetails',stringDets).then(setUserDetails(users[i])).then(navigation.navigate('Root',{screens:'HomeScreen'}))
           break;
          }
      }
      if(flag===false){
        Alert.alert("Error","Please select correct school")
        setSelectedSchool('');
      }
  }
  const getSchools=async()=>{
    try {
      let users=await AsyncStorage.getItem('resultArray') 
      parsedUsers=await JSON.parse(users)
      setUsers(parsedUsers)
     
  } catch (e) {
      console.log(`Logged In Error ${e}`)
  }
  }
 
  const onSearch = (search)=> {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.school_name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(schools);
    }
  };
  return (
    <View style={styles.container} backgroundColor={'#F0A500'}>
      <Text style={styles.heading}>
Select  School
  </Text>
  <Pressable
        style={styles.searchBar}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight:'600',color:'grey'}}>
          {selectedSchool == '' ? 'Choose Your School ' : selectedSchool}
        </Text>
        {clicked ? (
          <Image
            source={require('../assets/dropup.png')}
            style={{width: 20, height: 20}}
          />
        ) : (
          <Image
            source={require('../assets/dropdown.png')}
            style={{width: 20, height: 20}}
          />
        )}
      </Pressable>
      {clicked ? (
        <View
          style={styles.dropDown}>
          <TextInput
            placeholder="Search.."
            placeholderTextColor={'grey'}
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={styles.dropSearch}
          />

          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.schoolName}
                  onPress={() => {
                    setSelectedSchool(item.school_name);
                    setClicked(!clicked);
                    onSearch('');
                    setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:'grey'}}>{item.school_name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      <View navigation={navigation} style={{width:'40%',backgroundColor:'green',marginTop:'50%'}}>
      <Button title="Select School" onPress={()=>setUser(selectedSchool)}/>
      
      </View>
      
    </View>
  )
}

export default SelectSchool

const styles = StyleSheet.create({
  container: 
  {flex: 1,
  
  alignItems: 'center',
  paddingTop:"10%",},
  heading:
   {fontWeight:'bold',
   color:'white',
   fontSize:25,},

   searchBar:{
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    
    backgroundColor:'white'
  },
  dropDown:{
    elevation: 5,
    marginTop: 1,
    height: 300,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  dropSearch:{
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: '#8e8e8e',
    borderRadius: 7,
    marginTop: 20,
    paddingLeft: 20,
  },
  schoolName:
    {
      width: '85%',
      alignSelf: 'center',
      height: 50,
      
      justifyContent: 'center',
      borderBottomWidth: 0.5,

      borderColor: '#8e8e8e',
    },
    selectBtn:{
      elevation: 5,
    marginTop: 1,
    height: 300,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    }
})