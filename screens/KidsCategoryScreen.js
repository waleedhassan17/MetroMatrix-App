import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import ProductCard from '../components/ui/ProductCard';
import NavigationBar from '../components/NavigationBar';

// Map of image keys to require paths
const imageMap = {
  'kids.jpg': require('../assets/kids.jpg'),
};

const baseProducts = [
  {
    name: 'White Shoes',
    price: '99.99',
    image: 'kids.jpg',
    badge: 'New',
  },
  {
    name: 'Sneakers',
    price: '79.99',
    image: 'kids.jpg',
    badge: 'Sale',
  },
  {
    name: 'Running Shoes',
    price: '119.99',
    image: 'kids.jpg',
  },
  {
    name: 'Black Trainers',
    price: '89.99',
    image: 'kids.jpg',
    badge: 'New',
  },
];

const products = Array.from({ length: 30 }, (_, index) => {
  const baseItem = baseProducts[index % baseProducts.length];
  return {
    id: index + 1,
    name: `${baseItem.name} #${index + 1}`,
    price: baseItem.price,
    image: baseItem.image,
    badge: baseItem.badge,
  };
});

export default function KidsCategoryScreen() {
  const navigation = useNavigation();

  const renderCard = ({ item, index }) => (
    <ProductCard
      item={{ ...item, image: imageMap[item.image] }}
      index={index}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          product: item, // Only serializable data
        })
      }
    />
  );

  const renderHeader = () => (
    <>
      <View style={styles.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <View style={styles.centerTitleWrapper}>
          <Text style={styles.title}>Kid's Fashion</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Explore Top Picks</Text>
      <View style={styles.filterRow}>
        <Pressable style={styles.filterPill}>
          <Text style={styles.filterText}>Sorted by</Text>
        </Pressable>
        <Pressable style={styles.filterPill}>
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>
    </>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.subtitle}>Featured for You</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredScroll}
      >
        {baseProducts.map((item, idx) => (
          <View key={idx} style={styles.featuredCardWrapper}>
            <ProductCard
              item={{ ...item, image: imageMap[item.image] }}
              index={idx}
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  product: item,
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <FlatList
        data={products}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={6}
      />
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
    position: 'relative',
    height: 40,
  },
  backButton: {
    zIndex: 2,
  },
  centerTitleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ccc',
    marginTop: 8,
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  filterPill: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
    borderColor: '#2F2F2F',
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  footer: {
    marginTop: 32,
    paddingBottom: 60,
  },
  featuredScroll: {
    paddingHorizontal: 4,
  },
  featuredCardWrapper: {
    marginRight: 12,
  },
});
