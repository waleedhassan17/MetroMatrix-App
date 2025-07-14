import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProductDetailScreen({ navigation }) {
  const product = {
    name: 'Classic Tailored Men’s Shirt',
    price: 7000,
    image: require('../assets/men.jpg'),
    colors: ['#000', '#fff', '#f00'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 10,
    about: 'Classic tailored men’s shirt made from premium fabric. Elegant stitching and sharp cuts make it ideal for formal occasions.',
    details: '100% cotton, slim fit, breathable fabric, machine washable. Designed for maximum comfort and durability.',
    brand: 'TailorCo — Known for their refined men’s wear crafted with attention to detail.',
    sizeandfit: 'True to size. Model is 6ft wearing size M. Slim fit design for a modern silhouette.',
    history: 'Launched in 2025 as part of TailorCo’s Heritage Line, inspired by British tailoring traditions.',
  };

  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('About');

  const tabs = ['About', 'Details', 'Brand', 'Size & Fit', 'History'];

  const increment = () => setQty(q => Math.min(q + 1, product.stock));
  const decrement = () => setQty(q => Math.max(1, q - 1));

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <Pressable onPress={() => navigation?.goBack?.()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={s.headerTitle}>Product Details</Text>
        <Pressable onPress={() => navigation?.navigate?.('Notifications')}>
          <Icon name="notifications-outline" size={24} color="#fff" />
        </Pressable>
      </View>

      <Image source={product.image} style={s.image} />

      <View style={s.info}>
        <Text style={s.title}>{product.name}</Text>
        <Text style={s.price}>Rs {product.price.toFixed(2)}</Text>

        <View style={s.selectorRow}>
          <View style={s.selector}>
            <Text style={s.label}>Color</Text>
            <View style={s.optionsRow}>
              {product.colors.map(c => (
                <Pressable key={c} style={[
                  s.colorOption,
                  { backgroundColor: c },
                  c === color && s.selectedOption
                ]} onPress={() => setColor(c)} />
              ))}
            </View>
          </View>
          <View style={s.selector}>
            <Text style={s.label}>Size</Text>
            <View style={s.optionsRow}>
              {product.sizes.map(sz => (
                <Pressable
                  key={sz}
                  style={[s.sizeOption, sz === size && s.selectedOption]}
                  onPress={() => setSize(sz)}
                >
                  <Text style={sz === size ? s.sizeTextSelected : s.sizeText}>{sz}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={s.qtyRow}>
          <Text style={s.label}>Qty</Text>
          <Pressable onPress={decrement} style={s.qtyBtn}>
            <Text style={s.qtyBtnText}>−</Text>
          </Pressable>
          <Text style={s.qty}>{qty}</Text>
          <Pressable onPress={increment} style={s.qtyBtn}>
            <Text style={s.qtyBtnText}>+</Text>
          </Pressable>
        </View>

        <Pressable
          style={s.addBtn}
          onPress={() => navigation?.navigate?.('Checkout', { product, color, size, qty })}
        >
          <Text style={s.addBtnText}>Add To Bag</Text>
        </Pressable>

        <View style={s.policy}>
          <Icon name="truck-outline" size={18} color="#fff" />
          <Text style={s.policyText}> Free Delivery</Text>
        </View>
        <View style={s.policy}>
          <Icon name="return-down-back" size={18} color="#fff" />
          <Text style={s.policyText}> Free Return</Text>
        </View>
        <Pressable onPress={() => navigation?.navigate?.('Policy')}>
          <Text style={s.policyLink}>View Return Policy</Text>
        </Pressable>

        <View style={s.tabs}>
          {tabs.map(t => (
            <Pressable key={t} onPress={() => setTab(t)} style={tab === t && s.tabActive}>
              <Text style={tab === t ? s.tabTextActive : s.tabText}>{t}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={s.tabContent}>
          {product[tab.toLowerCase().replace(/ & /g, '').replace(/ /g, '')]}
        </Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    padding: 16,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  info: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  price: { fontSize: 18, color: '#0f9d58', marginVertical: 8 },
  selectorRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  selector: { flex: 1 },
  label: { color: '#ccc', marginBottom: 4 },
  optionsRow: { flexDirection: 'row', marginTop: 8 },
  colorOption: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  sizeOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 8,
  },
  sizeText: { color: '#ccc' },
  sizeTextSelected: { color: '#0f9d58', fontWeight: 'bold' },
  selectedOption: { borderWidth: 2, borderColor: '#0f9d58' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 20, color: '#fff' },
  qty: { marginHorizontal: 12, fontSize: 16, color: '#fff' },
  addBtn: {
    backgroundColor: '#0f9d58',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  policy: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  policyText: { color: '#ccc', marginLeft: 6 },
  policyLink: { color: '#0f9d58', textDecorationLine: 'underline', marginBottom: 16 },
  tabs: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  tabText: { color: '#888', fontWeight: '600' },
  tabTextActive: { color: '#0f9d58', fontWeight: '700' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#0f9d58' },
  tabContent: { color: '#ddd', lineHeight: 20, marginTop: 8 },
});