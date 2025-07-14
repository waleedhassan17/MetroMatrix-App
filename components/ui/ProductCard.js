// ProductCard.js
import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '../../redux/slice/wishlistSlice'; // adjust the path if needed

const CARD_WIDTH = 160;
const CARD_HEIGHT = 300;

export default function ProductCard({ item, index, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const liked = wishlistItems.some(i => i.id === item.id);

  const imageSource = typeof item.image === 'string'
    ? { uri: item.image }
    : item.image;


  const handleWishlistToggle = () => {
    dispatch(toggleWishlistItem(item));
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress && onPress(item)}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <View style={styles.imageWrapper}>
          <Image source={imageSource} style={styles.image} resizeMode="cover" />

          <Pressable onPress={handleWishlistToggle} style={styles.wishlistIcon}>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              size={20}
              color={liked ? 'red' : '#333'}
            />
          </Pressable>

          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginBottom: 18,
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardPressed: {
    opacity: 0.96,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffffcc',
    padding: 6,
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#f44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f9d58',
  },
});
