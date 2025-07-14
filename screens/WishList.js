// WishlistScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slice/wishlistSlice'; // adjust path
import { addItemToCart } from '../redux/slice/cartSlice';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const addtoCart = (item) => {
    dispatch(addItemToCart(item));
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerText}>MetroMatrix</Text>
        <View style={styles.backButton} />
      </View>

      {/* Wishlist List */}
      <FlatList
        data={wishlist}
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
              <Text style={styles.price}>Rs. {item.price.toLocaleString()}</Text>
              <View style={styles.actions}>
                <Pressable
                    onPress={() => addtoCart(item)}
                    style={({ pressed }) => [
                    styles.addBtn,
                    pressed && { backgroundColor: '#007ACC' }, // Darker shade on press
                    ]}
                >
                  <Text style={styles.addText}>Add to Cart</Text>
                </Pressable>

              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Ionicons name="trash-outline" size={24} color="#FF4D4D" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Your wishlist is empty.</Text>}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#1C1C1C',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Poppins'
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
    marginTop: 8,
  },
  addBtn: {
    backgroundColor: '#00A3FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins'
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888888',
    fontFamily: 'Poppins'
  },
});
