import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import Input from '../../component/input/Input';
import Button from '../../component/Button';

const Register = ({navigation}) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confPassword: '',
  });

  const onChange = (key, value) => {
    setValues({...values, [key]: value});
  };
  const handleRegister = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('register failure');
      }
      const data = await response.json();
      console.log(data)
      Alert.alert('Register Success');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error!', err.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let’s Get Started !</Text>
      <Text style={styles.subtitle}>
        Create new account to access all feautures
      </Text>

      <Input
        placeholder="Name "
        onChangeText={text => onChange('name', text)}
        value={values.name}
      />
      <Input
        placeholder="Username "
        onChangeText={text => onChange('username', text)}
        value={values.username}
      />
      <Input
        placeholder="Example@gmail.com"
        onChangeText={text => onChange('email', text)}
        value={values.email}
      />
      <Input
        placeholder="Phone Number"
        onChangeText={text => onChange('phone', text)}
        value={values.phone}
      />
      <Input
        placeholder="Password"
        onChangeText={text => onChange('password', text)}
        value={values.password}
      />
      <Input
        placeholder="Confirm Password"
        onChangeText={text => onChange('confPassword', text)}
        value={values.confPassword}
      />
      <Button title="REGISTER" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.register}>Already have account? Log in Here</Text>
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
    marginTop : 30
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
export default Register;
