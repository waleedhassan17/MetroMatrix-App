import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/slice/userSlice';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [Input, setInput] = useState('');
  const [Password, setPassword] = useState('');
  const dispatch = useDispatch();

  const error = useSelector((state) => state.user.error);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigation.navigate('SmartCityHome');
    }
  }, [currentUser]);

  const handleLogin = () => {
    dispatch(clearError());

    if (!Input || !Password) {
      Alert.alert('Validation Error', 'Please enter all fields');
      return;
    }

    dispatch(loginUser({ input: Input, password: Password }));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffff" />
      <View style={styles.title}>
        <Text style={styles.textTitle}>MetroMatrix</Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.textSubtitle}>Welcome Back! Enter your Credentials to LogIn</Text>
      </View>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>LogIn</Text>
      </View>

      <View style={styles.inputField}>
        <CustomTextInput
          placeholder="Enter Email or Name"
          onChangeText={(text) => setInput(text)}
          value={Input}
        />
      </View>

      <View style={styles.inputField}>
        <CustomTextInput
          placeholder="Enter your Password"
          onChangeText={(text) => setPassword(text)}
          value={Password}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.button}>
        <CustomButton title="LogIn" onPress={handleLogin} />
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.normalText}>Don't have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    marginBottom: 10,
    width: '100%',
  },
  title: {
    alignItems: 'center',
    marginBottom: 8,
  },
  textTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  subtitle: {
    alignItems: 'center',
    marginBottom: 16,
  },
  textSubtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  heading: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins',
  },
  button: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  linkContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#00A3FF',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  signUpText: {
    color: '#00A3FF',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
});
