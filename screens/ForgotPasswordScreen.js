import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, clearError } from '../redux/slice/userSlice';
import { auth } from '../firebase/firebaseConfig'; // ✅ Fix added here

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { error, passwordResetMessage, loading } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (passwordResetMessage) {
      Alert.alert('Success', passwordResetMessage, [
        { text: 'OK', onPress: () => navigation.navigate('LogIn') }
      ]);
    }
  }, [passwordResetMessage]);

  const handleChangePassword = () => {
    dispatch(clearError());

    if (!email.trim() || !currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New Password and Confirm Password do not match.');
      return;
    }

    const userEmail = auth.currentUser?.email;
    if (userEmail !== email) {
      Alert.alert('Validation Error', 'Email does not match the logged-in user.');
      return;
    }

    dispatch(changePassword({ currentPassword, newPassword }));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />
      <Text style={styles.title}>Change Your Password</Text>
      <Text style={styles.subtitle}>
        Enter your email, current password, and new password to update your account password.
      </Text>

      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomTextInput
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <CustomTextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <CustomTextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.buttonWrapper}>
        <CustomButton
          title={loading ? 'Updating...' : 'Change Password'}
          onPress={handleChangePassword}
          disabled={loading}
        />
      </View>

      <Text style={styles.backToLogin} onPress={() => navigation.navigate('LogIn')}>
        Back to Login
      </Text>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  backToLogin: {
    marginTop: 20,
    textAlign: 'center',
    color: '#00A3FF',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
});
