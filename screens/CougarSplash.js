import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useColorScheme,
  Dimensions,
  Image,
  Platform,
} from 'react-native';

export default function CougarSplashScreen({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;
  const scheme = useColorScheme();
  const themeBg = scheme === 'dark' ? '#0E0E0E' : '#FFFFFF';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => navigation.replace('CougarCategory'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: themeBg }]}>
      <Animated.View
        style={[
          styles.shape,
          {
            opacity: fade.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.15],
            }),
            transform: [{ scale }],
          },
        ]}
      />

      <Animated.Image
        source={require('../assets/cougar-logo.png')}
        style={[
          styles.logo,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const LOGO_SIZE = width * 0.32;
const SHAPE_SIZE = width * 1.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    zIndex: 2,
  },
  shape: {
    position: 'absolute',
    width: SHAPE_SIZE,
    height: SHAPE_SIZE,
    borderRadius: SHAPE_SIZE / 2,
    backgroundColor: '#E7B416', // softer golden glow
    top: height * 0.25,
    left: -width * 0.2,
    zIndex: 0,
    shadowColor: '#E7B416',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10, // Android shadow
  },
});
