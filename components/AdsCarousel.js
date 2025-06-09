import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

const ads = [
  {
    id: 1,
    image:
      'https://www.cougar.com.pk/cdn/shop/files/Desktop_Collection_Sale_4c63d054-1eef-4ee3-aa16-0160339368ad.webp?v=1747145150',
  },
  {
    id: 2,
    image:
      'https://www.cougar.com.pk/cdn/shop/files/Desktop_Collection_Kids.webp?v=1747321564',
  },
  {
    id: 3,
    image:
      'https://www.cougar.com.pk/cdn/shop/files/Desktop_Kids.webp?v=1747321564',
  },
];

const ITEM_WIDTH = 333;
const ITEM_HEIGHT = 176;

const AdsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const autoScrollInterval = useRef(null);
  const pauseTimeout = useRef(null);

  // Start auto-scroll only once on mount
  useEffect(() => {
    startAutoScroll();

    return () => {
      stopAutoScroll();
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll(); // Clear existing interval if any
    autoScrollInterval.current = setInterval(() => {
      scrollToNext();
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  const scrollToNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const onDotPress = (index) => {
    if (index === currentIndex) return;

    // Stop auto-scroll on manual press
    stopAutoScroll();

    // Clear previous timeout if any
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);

    // Resume auto-scroll after 5 seconds
    pauseTimeout.current = setTimeout(() => {
      startAutoScroll();
    }, 5000);

    // Animate fade out, change image, fade in
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(index);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.container}>
        <Animated.Image
          source={{ uri: ads[currentIndex].image }}
          style={[styles.image, { opacity: fadeAnim }]}
        />
      </View>

      <View style={styles.dotsContainer}>
        {ads.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
            onPress={() => onDotPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'transparent', // changed from '#eee'
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#aaa',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#333',
  },
});

export default AdsCarousel;
