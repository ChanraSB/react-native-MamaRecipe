import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = (props) => {
const {title, onPress} = props
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style= {styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button:{
    display : "flex",
    color : "white",
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    width : 319,
    height :  50,
    textAlign : "center",
    justifyContent : "center",
    marginTop : 20

  },
  text : {
    color : "white",
    textAlign : "center",
    fontSize : 16,

  }
})