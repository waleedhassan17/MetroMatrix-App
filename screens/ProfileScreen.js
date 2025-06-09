import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />

      {/* Header with Back Button and Title */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>MetroMatrix</Text>

        {/* Placeholder to center the title */}
        <View style={styles.backButton} />
      </View>

      {/* Profile Info */}
      <View style={styles.header}>
        <Image source={require('../assets/img.jpeg')} style={styles.avatar} />
        <Text style={styles.name}>Muhammad Waleed Hassan</Text>
        <Text style={styles.email}>waleedhassansfd@gmail.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🕓 Activity</Text>
        {['Viewed Ads: 12', 'Products Searched: 5', 'Orders: 0'].map((info, idx) => (
          <Text key={idx} style={styles.infoText}>• {info}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Location</Text>
        <Text style={styles.infoText}>• City: Lahore</Text>
        <Text style={styles.infoText}>• Joined: Jan 2024</Text>
      </View>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1C' },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: '#1C1C1C',
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },

  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#2C2C2C',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00A3FF',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  email: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 4,
    fontFamily: 'Poppins',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  infoText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginVertical: 2,
    fontFamily: 'Poppins',
  },
  editBtn: {
    alignSelf: 'center',
    margin: 20,
    backgroundColor: '#00A3FF',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  editText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
});
