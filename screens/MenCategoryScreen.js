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
  'image.png': require('../assets/image.png'),
};

const baseProducts = [
  {
    name: 'White Shoes',
    price: 99.99,
    image: 'image.png',
    badge: 'New',
    colors: ['#fff', '#ccc'],
    sizes: ['7', '8', '9', '10'],
    stock: 25,
    about: 'Comfortable white shoes perfect for casual and semi-formal wear.',
    details: 'Made from synthetic leather, cushioned insole, slip-resistant sole.',
    brand: 'UrbanStep — Stylish everyday footwear.',
    sizeandfit: 'Regular fit. True to size.',
    history: 'Launched in 2024 as part of the UrbanStep Summer Collection.',
  },
  {
    name: 'Sneakers',
    price: 79.99,
    image: 'image.png',
    badge: 'Sale',
    colors: ['#000', '#888'],
    sizes: ['6', '7', '8', '9'],
    stock: 40,
    about: 'Trendy sneakers suitable for sports and casual outings.',
    details: 'Breathable mesh, rubber sole, machine washable.',
    brand: 'FlexFit — Designed for active lifestyles.',
    sizeandfit: 'Athletic fit. Order one size up for a looser feel.',
    history: 'A best-seller since 2023 in the FlexFit collection.',
  },
  {
    name: 'Running Shoes',
    price: 119.99,
    image: 'image.png',
    colors: ['#f00', '#0f0'],
    sizes: ['7', '8', '9', '10', '11'],
    stock: 18,
    about: 'High-performance running shoes built for speed and comfort.',
    details: 'Lightweight, arch support, shock-absorbing sole.',
    brand: 'Speedster — Engineered for serious runners.',
    sizeandfit: 'Snug fit. Consider sizing up for wider feet.',
    history: 'Introduced in 2022 for competitive runners.',
  },
  {
    name: 'Black Trainers',
    price: 89.99,
    image: 'image.png',
    badge: 'New',
    colors: ['#000'],
    sizes: ['6', '7', '8', '9', '10'],
    stock: 30,
    about: 'Sleek black trainers suitable for gym and street wear.',
    details: 'Durable upper, memory foam insole, stylish design.',
    brand: 'CoreKicks — Minimalist and functional designs.',
    sizeandfit: 'Standard fit. Matches usual shoe sizes.',
    history: 'Launched in 2025 in the CoreKicks Urban line.',
  },
  {
    name: 'Classic Tailored Men’s Shirt',
    price: 7000,
    image: 'image.png',
    colors: ['#000', '#fff', '#f00'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 10,
    about:
      'Classic tailored men’s shirt made from premium fabric. Elegant stitching and sharp cuts make it ideal for formal occasions.',
    details:
      '100% cotton, slim fit, breathable fabric, machine washable. Designed for maximum comfort and durability.',
    brand:
      'TailorCo — Known for their refined men’s wear crafted with attention to detail.',
    sizeandfit:
      'True to size. Model is 6ft wearing size M. Slim fit design for a modern silhouette.',
    history:
      'Launched in 2025 as part of TailorCo’s Heritage Line, inspired by British tailoring traditions.',
  },
];

const products = Array.from({ length: 30 }, (_, index) => {
  const baseItem = baseProducts[index % baseProducts.length];
  return {
    id: index + 1,
    name: `${baseItem.name} #${index + 1}`,
    price: baseItem.price,
    image: baseItem.image, // string key only
    badge: baseItem.badge,
  };
});

export default function MenCategoryScreen() {
  const navigation = useNavigation();

  const renderCard = ({ item, index }) => (
    <ProductCard
      item={{ ...item, image: imageMap[item.image] }}
      index={index}
     onPress={() =>
  navigation.navigate('ProductDetail', {
    product: {
      ...item,
      image: imageMap[item.image], // just replace image string with require
    },
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
          <Text style={styles.title}>Men's Fashion</Text>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
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
