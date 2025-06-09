import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

const ScreenHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo.jpeg')} style={styles.image} />
                    <Text style={styles.appName}>MetroMatrix</Text>
                </View>

                <Text style={styles.heading}>Welcome to MetroMatrix Smart City Services</Text>
                <Text style={styles.subHeading}>Empowering your city experience</Text>

                <View style={styles.buttonWrapper}>
                    <CustomButton title="Sign Up" onPress={() => navigation.navigate('Register')} />
                    <View style={{ height: 16 }} />
                    <CustomButton title="Log In" onPress={() => navigation.navigate('LogIn')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    image: {
        width: ScreenHeight * 0.25,
        height: ScreenHeight * 0.25,
        borderRadius: ScreenHeight * 0.125,
        resizeMode: 'cover',
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#fff',
    },
    appName: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    heading: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'Poppins',
    },
    subHeading: {
        fontSize: 14,
        color: '#d1d1d6',
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'Poppins',
    },
    buttonWrapper: {
        width: '100%',
        alignItems: 'center',
    },
});
