import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';
import { useNavigation } from '@react-navigation/native';
import Input from '../../component/input/Input';
const EditRecipe = ({route}) => {

  const navigation = useNavigation()
  const [isFocused, setIsFocused] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [values, setValues] = useState({
    title : "",
    ingredient : "",
    video_link : "",
  })
  useEffect(() => {
    const { title, ingredient, video_link } = route.params.recipe;
    setValues({ title, ingredient, video_link });
  }, []);

  const onChange = (key, value) => {
    setValues({...values, [key]: value});
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const selectImageFromCamera = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response && !response.didCancel && response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        handleEditRecipe(response.assets[0].uri);
      }
    });
  };
  
  const selectImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response && !response.didCancel && response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        handleEditRecipe(response.assets[0].uri);
      }
    });
  };
  const handleEditRecipe = async (uri) => {
    try {
      if (!uri) {
        throw new Error('Image URI is undefined');
      }
      const newUri = uri.replace(
        'file://data/user/0/com.mamarecipe/cache/',
        ''
      );
      if (!newUri) {
        throw new Error('Failed to get valid image URI');
      }
  
      const { id } = route.params;
  
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }
  
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('video_link', values.video_link);
      formData.append('ingredient', values.ingredient);
      formData.append('image', {
        uri: newUri,
        name: newUri.split('/').pop(),
        type: mime.getType(newUri),
      });
  
      const response = await fetch(
        `http://10.0.2.2:3000/recipes/${id}`, 
        {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', data.message);
        navigation.navigate('MyRecipe');
      } 
    } catch (error) {
      console.error('Error editing recipe: ', error);
      Alert.alert('Error', error.message || 'Failed to edit recipe. Please try again.');
    }
  };

  return (
    <View>
      <Text style={styles.title}>Add Your Recipe</Text>
      <View style={styles.inputWrapper}>
        <Input placeholder="Title" onChangeText={text => onChange('title', text)} value={values.title} />
        <TextInput
          style={[
            styles.input,
            isFocused && {borderColor: '#EFC81A', borderWidth: 2},
          ]}
          placeholder="Ingredient"
          onChangeText={text => onChange('ingredient', text)} 
          value={values.ingredient}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={true}
          numberOfLines={10}
        />
        <Input placeholder="Link Video" onChangeText={text => onChange('video_link', text)} value={values.video_link}  />
        
      <View style={styles.btnWrapper}>
      <TouchableOpacity style={styles.btnTop} onPress={selectImageFromCamera}>
      <Text style= {styles.text}>Take Photo</Text>
    </TouchableOpacity>
      <TouchableOpacity style={styles.btnBottom} onPress={selectImageFromGallery}>
      <Text style= {styles.text}>Photo Library</Text>
    </TouchableOpacity>
        
      </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EFC81A',
    textAlign: 'center',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input : {
    width: 320,
    height: 150,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    textAlignVertical: 'top'
  },
  btnWrapper : {
    position : "absolute",
    top : 450,
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
  
  
  text : {
    fontSize : 16
  }
});
export default EditRecipe;