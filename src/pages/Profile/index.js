import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigation = useNavigation();

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const navigateToMyRecipe = () => {
    navigation.navigate('MyRecipe');
  };

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const res = await fetch(`http://10.0.2.2:3000/users/profile`, {
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
      setProfileData(data.data);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View>
      {profileData && (
        <View style={styles.profile}>
          <View style={styles.imageWrap}>
            {profileData.image ? (
              <Image source={{uri: profileData.image}} style={styles.image} />
            ) : (
              <Icon name="user" size={80} color="#fff" />
            )}
          </View>
          <Text style={styles.name}>{profileData.name}</Text>
        </View>
      )}
      <View style={styles.actionWrapper}>
        <TouchableOpacity style={styles.option} onPress={navigateToEditProfile}>
          <Icon
            name="user"
            size={24}
            color="#EEC302"
            style={styles.icon}></Icon>
          <Text style={styles.optionName}>Edit Profile</Text>
          <Icon name="chevron-right" size={15} color="#C4C4C4"></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={navigateToMyRecipe}>
          <Icon
            name="award"
            size={24}
            color="#EEC302"
            style={styles.icon}></Icon>
          <Text style={styles.optionName}>My Recipe</Text>
          <Icon name="chevron-right" size={15} color="#C4C4C4"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#EEC302',
    justifyContent: 'center',
    alignItems: 'center',
    height: 308,
  },
  imageWrap: {
    backgroundColor: '#C4C4C4',
    borderRadius: 50,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  actionWrapper: {
    width: 'auto',
    position: 'absolute',
    left: 7,
    right: 7,
    top: 266,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 512,
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
  },
  icon: {
    marginLeft: 15,
    marginRight: 30,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginRight: 200,
  },
});

export default Profile;
