import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <NavItem icon="home-outline" label="Home" onPress={() => navigation.navigate('Home')} />
      <NavItem icon="cart-outline" label="Cart" onPress={() => navigation.navigate('CartScreen')} />
      <NavItem icon="heart-outline" label="Wishlist" onPress={() => navigation.navigate('WishList')} />
      <NavItem icon="person-outline" label="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

const NavItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Icon name={icon} size={22} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>

);

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    zIndex: 100, // Ensure it's on top
  },
  navItem: {
    alignItems: 'center'
  },
  label: {
    fontSize: 12,
    marginTop: 2
  }
});

export default NavigationBar;
