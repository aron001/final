import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView ,Platform} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';

export default function Profilescreen() {
  const [image, setImage] = useState(null);
const [picture,setPicture] = useState(getDetails("picture"))
 const [images, setImages] = useState(null);
const [profileImage, setProfileImage] = useState(null);


const pickImage = async () => {
    
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
         let data =  await ImagePicker.launchImageLibraryAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.5
          })
          if(!data.canceled){
              let newfile = { 
                uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}` 
                
            }
              handleUpload(newfile)
          }
    }else{
       Alert.alert("you need to give up permission to work")
    }
 };


 const handleUpload = (image)=>{
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','employeeApp')
    data.append("cloud_name","dvflguwig")

    fetch("https://api.cloudinary.com/v1_1/dvflguwig/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json()).
    then(data=>{
        //setPicture(data.url)
       console.log(data)
    }).catch(err=>{
        Alert.alert("error while uploading")
    })
}
  
//cretepost


const pickanImage = async () => {
  // No permissions request is necessary for launching the image library
  
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
  }

  if (status === 'granted') {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!response.canceled) {
      setProfileImage(response.assets[0].uri);
    }
  }
};

const uploadProfileImage = async () => {
  const formData = new FormData();
  formData.append('photo', {
    name: new Date() + '_profile',
    uri: profileImage,
    type: 'image/jpg',
  });

  try {
    const res = await client.post('/api/posts', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjA4OTkxNDY4NjZhZGY3NmJlNTgxZSIsImlhdCI6MTY4NDQ4NTk1MCwiZXhwIjoxNjg0NzQ1MTUwfQ.P-ZxYBY_4qx2ir0c6kZIDruqlFEupOOO_UR1R3rFNCE`,
       
      },
    });}catch (error) {
      console.log(error.message);
    }
}

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
                      <TouchableOpacity onPress={ pickImage}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                        {image && <Image source={{ uri: image }} style={styles.image}/>}
                    </TouchableOpacity></View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>ash</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>am sexy and i know it</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
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