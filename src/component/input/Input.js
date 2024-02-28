import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native';

const Input = ({placeholder, onChangeText, value}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View>
      <TextInput
        style={[
          styles.input,
          isFocused && {borderColor: '#EFC81A', borderWidth: 2},
        ]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 320,
    height: 60,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
});
export default Input;
