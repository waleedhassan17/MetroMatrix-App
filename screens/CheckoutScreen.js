import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DELIVERY_CHARGE = 200;
const EXTRA_BILLING_CHARGE = 100;

const CheckoutScreen = ({ route }) => {
  const navigation = useNavigation();
  const cartItems = route?.params?.cartItems ?? [];

  // Shipping info states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Billing info states
  const [billingEmail, setBillingEmail] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingProvince, setBillingProvince] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostalAddress, setBillingPostalAddress] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('Postpaid');
  const [isBillingSame, setIsBillingSame] = useState(true);

  const totalCart = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const calculateTotal = () => {
    let delivery = paymentMethod === 'Postpaid' ? DELIVERY_CHARGE : 0;
    let extraBilling = !isBillingSame ? EXTRA_BILLING_CHARGE : 0;
    return totalCart + delivery + extraBilling;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemText}>
              {item.name} × {item.quantity}
            </Text>
            <Text style={styles.itemText}>${item.price * item.quantity}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      {/* Shipping Contact Info */}
      <Text style={styles.sectionTitle}>Contact Info</Text>

      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <CustomTextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <CustomTextInput
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
      <CustomTextInput
        placeholder="Province"
        value={province}
        onChangeText={setProvince}
      />
      <CustomTextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <CustomTextInput
        placeholder="Street Address"
        value={postalAddress}
        onChangeText={setPostalAddress}
      />
      <CustomTextInput
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />

      {/* Payment Method */}
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.radioGroup}>
        {['Prepaid', 'Postpaid'].map((method) => (
          <TouchableOpacity
            key={method}
            onPress={() => {
              setPaymentMethod(method);
              setIsBillingSame(true);
            }}
            style={styles.radioButton}
          >
            <Text style={styles.radioText}>
              {paymentMethod === method ? '●' : '○'} {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Billing Address Toggle */}
      <TouchableOpacity
        onPress={() => setIsBillingSame(!isBillingSame)}
        style={styles.checkboxRow}
      >
        <Text style={styles.checkboxText}>
          {isBillingSame ? '✓' : '○'} Billing address is same as shipping
        </Text>
      </TouchableOpacity>

      {/* Billing Info if different */}
      {!isBillingSame && (
        <>
          <Text style={styles.sectionTitle}>Billing Contact Info</Text>

          <CustomTextInput
            placeholder="Billing Email"
            value={billingEmail}
            onChangeText={setBillingEmail}
            keyboardType="email-address"
          />
          <CustomTextInput
            placeholder="Billing Phone Number"
            value={billingPhone}
            onChangeText={setBillingPhone}
            keyboardType="phone-pad"
          />
          <CustomTextInput
            placeholder="Billing Country"
            value={billingCountry}
            onChangeText={setBillingCountry}
          />
          <CustomTextInput
            placeholder="Billing Province"
            value={billingProvince}
            onChangeText={setBillingProvince}
          />
          <CustomTextInput
            placeholder="Billing City"
            value={billingCity}
            onChangeText={setBillingCity}
          />
          <CustomTextInput
            placeholder="Billing Street Address"
            value={billingPostalAddress}
            onChangeText={setBillingPostalAddress}
          />
          <CustomTextInput
            placeholder="Billing Postal Code"
            value={billingPostalCode}
            onChangeText={setBillingPostalCode}
          />
        </>
      )}

      {/* Summary */}
      <Text style={styles.sectionTitle}>Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Cart Total:</Text>
        <Text style={styles.summaryText}>${totalCart}</Text>
      </View>

      {paymentMethod === 'Postpaid' && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Delivery Charges:</Text>
          <Text style={styles.summaryText}>${DELIVERY_CHARGE}</Text>
        </View>
      )}

      {!isBillingSame && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Extra Billing Charges:</Text>
          <Text style={styles.summaryText}>${EXTRA_BILLING_CHARGE}</Text>
        </View>
      )}

      <View style={styles.summaryRow}>
        <Text style={styles.totalText}>Total Payable:</Text>
        <Text style={styles.totalText}>${calculateTotal()}</Text>
      </View>

      {/* Place Order */}
      <TouchableOpacity style={styles.orderBtn}>
        <Text style={styles.orderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
    marginBottom: 6,
  },
  checkboxRow: {
    marginTop: 10,
  },
  checkboxText: {
    color: '#ccc',
    fontSize: 14,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  radioButton: {
    padding: 10,
  },
  radioText: {
    color: '#ccc',
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  summaryText: {
    color: '#fff',
    fontSize: 14,
  },
  totalText: {
    color: '#00A3FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderBtn: {
    marginTop: 20,
    backgroundColor: '#00A3FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
