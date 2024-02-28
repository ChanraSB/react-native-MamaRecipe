import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import HorizontalCard from '../../component/HorizontalCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
const MyRecipe = () => {
  const [recipeData, setRecipeData] = useState(null);
  const navigation = useNavigation();
  const handleBack = () => navigation.navigate('Profile');

  const getMyRecipe = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const res = await fetch(`http://10.0.2.2:3000/users/profile/recipes`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await res.json();
      console.log(data);
      setRecipeData(data.data);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    getMyRecipe();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyRecipe();
    });

    return unsubscribe;
  }, [navigation]);

  const deleteMyRecipe = async id => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://10.0.2.2:3000/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete Recipe');
      }
      const data = await res.json();
      console.log(data);
      Alert.alert('Delete Recipe Success');
      getMyRecipe();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={handleBack}>
        <Icon name="chevron-left" size={20} color="#000"></Icon>
      </TouchableOpacity>

      <Text style={styles.title}>My Recipe</Text>
      <ScrollView style={styles.card}>
        {recipeData &&
          recipeData.map(item => (
            <HorizontalCard key={item.id} title={item.title} image={item.image}>
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    navigation.navigate('EditRecipe', {
                      id: item.id,
                      recipe: item,
                    })
                  }>
                  <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => deleteMyRecipe(item.id)}>
                  <Text style={styles.text}>Delete</Text>
                </TouchableOpacity>
              </View>
            </HorizontalCard>
          ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    display: "flex",
    flexDirection: 'column',
    justifyContent:"center",
    alignItems: "center",
    width: '100%',
    marginLeft:"auto",
    marginRight:"auto",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EFC81A',
    textAlign: 'center',
  },
  card : {width : "100%"},

  btn: {
    display: 'flex',
    color: 'white',
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    width: 50,
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    display: 'flex',
    position: 'absolute',
    left: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 16,
    backgroundColor: '#F8F8FA',
    top:0
  },
});

export default MyRecipe;
