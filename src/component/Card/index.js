import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = ({ title, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    marginRight : 10
  },
  image: {
    width: "100%",
    height: 160,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Card;