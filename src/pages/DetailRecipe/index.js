import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DetailRecipe = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.imgWrapper}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{recipe.title}</Text>
      </View>
      </View>
      <View style={styles.actionWrapper}>
        <Text style={styles.ingredient}>Ingredient</Text>
        <View style={styles.ingWrapper}>
            <Text>{recipe.ingredient}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
imgWrapper : {
    position : "absolute",
    top : 0,
    left: 0,
    right: 0
},
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    
  },
  title: {
    position : "absolute",
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
    paddingHorizontal: 20,
    marginBottom: 20, 
    bottom : 50
   
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
  ingWrapper : {
    backgroundColor : "#FAF7ED",
    width : "90%",
    height : 400,
    marginTop:30,
    marginLeft :"auto",
    marginRight:"auto"
  },
  ingredient : {
    fontSize : 20,
    fontWeight: "700",
    marginLeft : 20,
    marginTop : 10
  }
});

export default DetailRecipe;

