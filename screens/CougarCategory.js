import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const categories = ['MEN', 'WOMEN', 'KIDS', 'Silent Luxury', 'Home'];

export default function CougarCategoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cougar</Text>
      <Text style={styles.subTitle}>Categories</Text>
      {categories.map((cat, index) => (
        <TouchableOpacity key={index} style={styles.category}>
          <Text style={styles.catText}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold' },
  subTitle: { fontSize: 18, marginTop: 10, marginBottom: 20 },
  category: {
    backgroundColor: '#eee',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8
  },
  catText: { fontSize: 16 }
});
