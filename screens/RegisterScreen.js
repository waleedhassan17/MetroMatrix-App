import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../redux/slice/userSlice';

const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [localError, setLocalError] = useState('');

    const dispatch = useDispatch();
    const { error, currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            navigation.navigate('Home');
        }
    }, [currentUser]);

    const handleRegister = () => {
        dispatch(clearError());
        setLocalError('');

        if (!fullName || !phone || !email || !password || !confirmPassword) {
            setLocalError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setLocalError('Passwords do not match.');
            return;
        }
        if (!agree) {
            setLocalError('You must agree to the Terms of Service.');
            return;
        }

        dispatch(registerUser({ name: fullName, phone, email, password }));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>MetroMatrix</Text>
                <Text style={styles.subtitle}>Create an Account</Text>

                <CustomTextInput
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.inputMargin}
                />
                <CustomTextInput
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    style={styles.inputMargin}
                />
                <CustomTextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.inputMargin}
                />
                <CustomTextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.inputMargin}
                />
                <CustomTextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={styles.inputMargin}
                />

                <View style={styles.agreeRow}>
                    <Checkbox
                        status={agree ? 'checked' : 'unchecked'}
                        onPress={() => setAgree(!agree)}
                        color="#00A3FF"
                        uncheckedColor="#ccc"
                    />
                    <Text style={styles.agreeText}>
                        I agree to the Terms of Service and Privacy Policy
                    </Text>
                </View>

                {localError ? <Text style={styles.errorText}>{localError}</Text> : null}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <CustomButton title="Sign Up" onPress={handleRegister} />

                <View style={styles.loginRow}>
                    <Text style={styles.normalText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Register;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'Poppins',
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 20,
        fontFamily: 'Poppins',
    },
    inputMargin: {
        marginBottom: 12,
    },
    agreeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        justifyContent: 'center',
    },
    agreeText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontFamily: 'Poppins',
        flexShrink: 1,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 14,
    },
    loginRow: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    normalText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Poppins',
    },
    loginText: {
        color: '#00A3FF',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
        fontFamily: 'Poppins',
    },
});
