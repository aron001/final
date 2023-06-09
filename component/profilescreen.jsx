import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView ,Platform} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';
import axios from "axios";

export default function Profilescreen(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
      const getData = async () => {
        try {
          // Retrieve the token from AsyncStorage
          const token = await AsyncStorage.getItem('token');
  
          // Set the Authorization header to Bearer <token>
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
  
          // Make the GET request with the headers
          const response = await axios.get('http://10.161.148.38:3000/api/users/me', { headers });
  
          setData(response.data);
        } catch (e) {
          console.log(e);
        }
      };
  
      getData();
    }, []);
  


 const postData = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
  
      // Set the Authorization header to Bearer <token>
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      // Make the POST request with the headers and data
      const response = await axios.get('http://10.161.148.38:3000/api/users/me',{ headers });
  
    setData(response)
    } catch (e) {
      console.log(e);
    }
  };




  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token deleted successfully');
      props.navigation.replace("RootStackScreen")
    } catch (e) {
      console.log(e);
    }
  };
 


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../storage/images/userProfile.png")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                      <TouchableOpacity >
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                        <Image source={{ }} style={styles.image}/>
                    </TouchableOpacity></View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{data.username}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>since  {data.createdAt}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>1</Text>
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>2</Text>
                        <Text style={[styles.text, styles.subText]}>Following</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../storage/images/post4.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../storage/images/post5.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../storage/images/post6.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={deleteToken}>
                    <Text style={{marginLeft:'45%' ,marginTop:'10%',color:'red'}}>logout</Text></TouchableOpacity>
                    
               
                </View>
                
           
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  text: {
      
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  }
});