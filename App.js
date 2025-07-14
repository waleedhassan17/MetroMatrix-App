import 'react-native-get-random-values';
import { decode, encode } from 'base-64';
import messaging from '@react-native-firebase/messaging';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';



// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SmartCityHome from './screens/SmartCityHome';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishList';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import CougarSplashScreen from './screens/CougarSplash';
import CougarCategoryScreen from './screens/CougarCategory';
import MenCategoryScreen from './screens/MenCategoryScreen';
import WomenCategoryScreen from './screens/WomenCategoryScreen';
import KidsCategoryScreen from './screens/KidsCategoryScreen';
import SilentLuxuryScreen from './screens/SilentLuxuryScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}


  const getToken = async() => {
    const token = await messaging().getToken()
    console.log("token =",token)
  }

  useEffect(() => {
    requestUserPermission()
    getToken()
  }, [])




  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAppReady(true);
    });
    return unsubscribe;
  }, []);

  if (!appReady) {
    return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  return (
    <Provider store={store}>
      <View style={styles.appWrapper}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <View style={styles.mobileContainer}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="LogIn" component={LoginScreen} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="SmartCityHome" component={SmartCityHome} />
              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="WishList" component={WishlistScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
              <Stack.Screen name="CougarSplash" component={CougarSplashScreen} />
              <Stack.Screen name="CougarCategory" component={CougarCategoryScreen} />
              <Stack.Screen name="MenCategory" component={MenCategoryScreen} />
              <Stack.Screen name="WomenCategory" component={WomenCategoryScreen} />
              <Stack.Screen name="KidsCategory" component={KidsCategoryScreen} />
              <Stack.Screen name="SilentLuxury" component={SilentLuxuryScreen} />
              <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileContainer: {
    width: Platform.OS === 'web' ? 375 : '100%',
    height: Platform.OS === 'web' ? 812 : '100%',
    backgroundColor: '#1C1C1C',
    overflow: 'hidden',
  },
});
