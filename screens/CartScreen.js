import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const initialCartItems = [
  {
    id: '1',
    name: 'Yarn Died Polo',
    price: 3499,
    image:
        'https://www.cougar.com.pk/cdn/shop/files/1_3aff93c9-9929-4665-a48e-5030f8337eec.webp?v=1747290618&width=533',

    quantity: 1,
  },
  {
    id: '2',
    name: 'Tipped Polo',
    price: 2499,
    image:
      'https://www.cougar.com.pk/cdn/shop/files/3_f3ac3e2a-fe51-4852-84bf-e80bb8f0ad4b.webp?v=1747290555&width=533',
    quantity: 2,
  },
];



const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const CheckoutHandler = () => {
    navigation.navigate('Checkout')
}

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerText}>MetroMatrix</Text>

        {/* Placeholder to center title */}
        <View style={styles.backButton} />
      </View>

      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                  <Ionicons name="remove-circle-outline" size={24} color="#ccc" />
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                  <Ionicons name="add-circle-outline" size={24} color="#ccc" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Ionicons name="trash-outline" size={24} color="#FF4D4D" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty.</Text>
        }
      />

      {/* Footer with total and checkout */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={CheckoutHandler}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#1C1C1C',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins'
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2C',
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  price: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 2,
    fontFamily: 'Poppins'
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  qty: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins'
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888888',
    fontFamily: 'Poppins'
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#2C2C2C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Poppins'
  },
  checkoutBtn: {
    backgroundColor: '#00A3FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins'
  },
});
