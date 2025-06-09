import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CategoryCard = ({ title, isSelected, onPress, width = 100, height = 100 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { width, height }, isSelected && styles.selected]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#1C1C1C',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});

export default CategoryCard;
