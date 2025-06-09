import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.type}>{product.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 8,
    padding: 10,
    elevation: 3,
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14
  },
  type: {
    fontSize: 12,
    color: '#666'
  }
});

export default ProductCard;
