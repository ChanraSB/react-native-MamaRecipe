import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import Input from '../../component/input/Input';
import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Feather';

const Login = ({navigation}) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const onChange = (key, value) => {
    setValues({...values, [key]: value});
  };
  const handleLogin = async () => {
    try {
      const res = await fetch(`http://10.0.2.2:3000/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error('login failure');
      }
      const data = await res.json();
      console.log(data.token)
      await AsyncStorage.setItem('token', data.token);
      Alert.alert('Login succesfully');
      navigation.navigate('MainTab');
    } catch (err) {
      Alert.alert('error!', err.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#C4C4C4', width: 160, height : 160, borderRadius: 80, marginTop : 30, alignItems : "center"}}>
      <Icon
        name="user"
        size={140}
        color="#fff"
        
      />
      </View>
      
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Log in to your exiting account.</Text>
      <Input
        placeholder="Example@gmail.com"
        onChangeText={text => onChange('email', text)}
        value={values.email}
      />
      <Input
        placeholder="Password"
        onChangeText={text => onChange('password', text)}
        value={values.password}
      />
      <Button title="LOGIN" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.register}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#EFC81A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#C4C4C4',
    textAlign: 'center',
    marginBottom: 30,
  },
  register: {
    color: '#EFC81A',
  },
});
export default Login;
