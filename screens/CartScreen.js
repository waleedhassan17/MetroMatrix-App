import React from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slice/cartSlice'; // Adjust path as necessary

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const handleCheckout = () => {
    navigation.navigate('Checkout' , { totalAmount: total,
      cartItems: cartItems,
     });
  };

  const handleQuantityChange = (id, amount) => {
    dispatch(updateQuantity({ id, amount }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

const total = cartItems.reduce((sum, item) => {
  const price = parseFloat(item.price);
  const quantity = parseInt(item.quantity);

  if (isNaN(price) || isNaN(quantity)) {
    console.warn('Invalid price or quantity:', item);
    return sum;
  }

  return sum + price * quantity;
}, 0);


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
        <View style={styles.backButton} />
      </View>

      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
             <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>PKR {item.price}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                  <Ionicons name="remove-circle" size={26} color="#FF6B6B" />
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                  <Ionicons name="add-circle" size={26} color="#00CC99" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
              <Ionicons name="trash" size={24} color="#FF4D4D" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>🛒 Your cart is empty.</Text>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: PKR {total.toLocaleString()}</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

// Styles
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
  },
  price: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 2,
    fontFamily: 'Poppins',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  qty: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#AAAAAA',
    fontFamily: 'Poppins',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    fontFamily: 'Poppins',
  },
  checkoutBtn: {
    backgroundColor: '#00A3FF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
});
