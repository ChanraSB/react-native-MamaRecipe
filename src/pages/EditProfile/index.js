import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather"

const EditProfile = () => {
    const navigation = useNavigation();
    const handleBack = ()  => navigation.navigate('Profile')
    const handleEdit = () => navigation.navigate('EditProfilePicture')
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={handleBack}>
          <Icon name="chevron-left" size={20} color="#000" ></Icon>
        </TouchableOpacity>
        
      <Text style={styles.title}>Edit Profile</Text>
      <TouchableOpacity onPress={handleEdit}><Text style={styles.link}>Change Profile Picture</Text></TouchableOpacity>
      
      <Text style={styles.link}>Change Password</Text>
    </View>
  )
}
const styles = StyleSheet.create({
   container : {marginTop : 30},
        title: {
          marginTop : 15,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
            color: "#EFC81A",
            textAlign : "center"
          },
          link : {
            marginLeft : 30,
            marginVertical : 5
          },
          icon : {
            display : "flex",
            position : "absolute",
            left : 24,
            alignItems : "center",
            justifyContent : "center",
            height : 48,
            width : 48,
            borderRadius : 16,
            backgroundColor : "#F8F8FA"
           
          }
   
})

export default EditProfile