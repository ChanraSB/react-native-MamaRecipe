import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import mime from 'mime';
const EditProfilPicture = () => {
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Profile');
  };

  const selectImageFromCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setImageUri(response.assets[0].uri);
        uploadImage(response.assets[0].uri);
      }
    });
  };
  const selectImageFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setImageUri(response.assets[0].uri);
        uploadImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async uri => {
    try {
      if (!uri) {
        throw new Error('Image URI is undefined');
      }
      const newUri = uri.replace('file://data/user/0/com.mamarecipe/cache/','',
      );
      if (!newUri) {
        throw new Error('Failed to get valid image URI')}
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', {
        uri: newUri,
        name: newUri.split('/').pop(),
        type: mime.getType(newUri),
      });

      const response = await fetch(
        'http://10.0.2.2:3000/users/profile/picture',
        {
          method: 'PATCH',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', data.message);
        navigation.navigate('Profile')
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  return (
    <View>
      <View style={styles.cancelWrapper}>
      <TouchableOpacity style={styles.cancel} onPress={handleBack}>
        <Text style= {styles.text}>Cancel</Text>
      </TouchableOpacity>
      </View>
     
      <View style={styles.btnWrapper}>
      <TouchableOpacity style={styles.btnTop} onPress={selectImageFromCamera}>
      <Text style= {styles.text}>Take Photo</Text>
    </TouchableOpacity>
      <TouchableOpacity style={styles.btnBottom} onPress={selectImageFromGallery}>
      <Text style= {styles.text}>Photo Library</Text>
    </TouchableOpacity>
        
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
btnWrapper : {
  position : "absolute",
  top : 550,
  left : 30,
  right : 30,
  
},
btnBottom : {
  display : "flex",
  justifyContent: "center",
  alignItems : "center",
  width : "auto",
  textAlign : "center",
  height : 40,
  backgroundColor : "#E7E7E7",
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
 
},
btnTop : {
  display : "flex",
  justifyContent: "center",
  alignItems : "center",
  width : "auto",
  textAlign : "center",
  height : 40,
  backgroundColor : "#E7E7E7",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  marginBottom : 1
},
cancelWrapper : {
  position : "absolute",
  top : 660,
  left : 30,
  right : 30,
  
},
cancel : {
  display : "flex",
  justifyContent: "center",
  alignItems : "center",
  width : "auto",
  textAlign : "center",
  height : 40,
  backgroundColor : "#E7E7E7",
  borderRadius: 16,
  
  
},

text : {
  fontSize : 16
}
})
export default EditProfilPicture;
