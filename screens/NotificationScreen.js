import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const q = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(fetched);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />

      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.backButton} /> {/* Spacer */}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <View>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>
                {item.timestamp?.toDate().toLocaleString() || ''}
                </Text>
                </View>

            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No notifications yet.</Text>
          }
        />
      )}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
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
  time: {
  fontSize: 12,
  color: '#AAAAAA',
  marginTop: 4,
  fontFamily: 'Poppins',
},
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  notificationCard: {
    backgroundColor: '#2C2C2C',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#00A3FF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  message: {
    fontSize: 15,
    color: '#E0E0E0',
    fontFamily: 'Poppins',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888888',
    fontFamily: 'Poppins',
  },
});
