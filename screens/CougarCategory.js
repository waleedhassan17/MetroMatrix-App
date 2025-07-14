import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AdsCarousel from '../components/AdsCarousel';
import NavigationBar from '../components/NavigationBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const categories = [
  { label: 'MEN', image: require('../assets/men.jpg') },
  { label: 'WOMEN', image: require('../assets/women.jpg') },
  { label: 'KIDS', image: require('../assets/kids.jpg') },
  { label: 'Silent Luxury', image: require('../assets/luxury.jpg') },
];

const filters = ['All', 'Trending', 'Premium', 'Sale'];

export default function CougarCategoryScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleCategoryPress = (label) => {
    if (label === 'MEN') {
      navigation.navigate('MenCategory');
    } else if (label === 'WOMEN') {
      navigation.navigate('WomenCategory');
    } else if (label === 'KIDS') {
      navigation.navigate('KidsCategory');
    } else if (label === 'Silent Luxury') {
      navigation.navigate('SilentLuxury');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.cougarTitle}>Cougar</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Ads Carousel */}
          <View style={{ marginVertical: 20 }}>
            <AdsCarousel />
          </View>

          {/* Editorial Banner */}
          <View style={styles.editorialBanner}>
            <Image source={require('../assets/editorial.jpg')} style={styles.bannerImage} />
            <View style={styles.overlay} />
            <Text style={styles.bannerText}>New Arrivals – Exclusive Collection</Text>
          </View>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
            {filters.map((filter, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedFilter(filter)}
                style={[styles.filterItem, selectedFilter === filter && styles.selectedFilter]}
              >
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Categories */}
          <Text style={styles.subTitle}>Categories</Text>
          <View style={styles.circleRow}>
            {categories.map((cat, index) => {
              const scaleAnim = new Animated.Value(1);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPressIn={() => {
                    Animated.spring(scaleAnim, {
                      toValue: 0.94,
                      useNativeDriver: true,
                    }).start();
                  }}
                  onPressOut={() => {
                    Animated.spring(scaleAnim, {
                      toValue: 1,
                      useNativeDriver: true,
                    }).start();
                  }}
                  onPress={() => handleCategoryPress(cat.label)}
                >
                  <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}>
                    <Image source={cat.image} style={styles.circleImage} />
                  </Animated.View>
                  <Text style={styles.circleLabel}>{cat.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <NavigationBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#121212',
    borderBottomWidth: 0.3,
    borderBottomColor: '#2A2A2A',
  },
  backIcon: {
    padding: 5,
  },
  cougarTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 130, // More space to avoid overlap with NavigationBar
  },
  subTitle: {
    fontSize: 18,
    color: '#F5F5F5',
    fontWeight: '600',
    fontFamily: 'Poppins',
    marginBottom: 14,
    marginTop: 20,
  },
  editorialBanner: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 22,
    height: 170,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerText: {
    position: 'absolute',
    bottom: 14,
    left: 20,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterItem: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#2A2A2A',
    borderRadius: 22,
    marginRight: 10,
  },
  selectedFilter: {
    backgroundColor: '#E9444E',
  },
  filterText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  circleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    width: '47%',
    marginBottom: 28,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
    resizeMode: 'cover',
  },
  circleLabel: {
    marginTop: 10,
    color: '#EEEEEE',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});
