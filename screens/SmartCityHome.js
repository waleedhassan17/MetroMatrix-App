import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AdsCarousel from '../components/AdsCarousel';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';

const SmartCityHome = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const navigation = useNavigation();

  const categories = ['Shopping'];
  const filters = ['All', 'Newest', 'Popular'];
  const allProducts = []; // Placeholder

  const filteredProducts = allProducts.filter(p =>
    p.category === 'Shopping' &&
    (selectedFilter === 'All' || p.type === selectedFilter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.metroText}>MetroMatrix</Text>

          <Text style={styles.subHeadingText}>
            Smart City Services at your FingerTips
          </Text>

          {/* Notification & Profile Row */}
          <View style={styles.profileNotifRow}>
             <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.greetingBox}
            >
              <Text style={styles.greetingText}>Hey Waleed</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Icon
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>

           
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
          <TextInput
            placeholder="Search services/products"
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            style={styles.searchBar}
          />
        </View>

        {/* Ads Carousel */}
        <View style={{ marginTop: 20 }}>
          <AdsCarousel />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>

        {/* Filters */}
        <View style={styles.filterRow}>
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterBtn,
                selectedFilter === filter && styles.selectedFilterBtn
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.selectedFilterText
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          horizontal
          style={styles.categoryRow}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              title={cat}
              isSelected={true}
              width={333}
              height={176}
              onPress={() => navigation.navigate('CougarSplash')}
            />
          ))}
        </ScrollView>

        {/* Product List / Placeholder */}
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.placeholderText}>
            Products coming soon in the Shopping category!
          </Text>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  headerSection: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  metroText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  subHeadingText: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: 11,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  profileNotifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  greetingBox: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  greetingText: {
    color: '#00A3FF',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    width: '100%',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
    fontFamily: 'Poppins',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    alignSelf: 'flex-start',
  },
  categoryRow: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    flexWrap: 'wrap',
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  selectedFilterBtn: {
    backgroundColor: '#00A3FF',
  },
  filterText: {
    color: '#ccc',
    fontFamily: 'Poppins',
  },
  selectedFilterText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Poppins',
  },

  placeholderText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins',
  },
});

export default SmartCityHome;
