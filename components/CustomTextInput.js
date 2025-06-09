import React from "react";
import { TextInput, StyleSheet, View } from 'react-native';
const CustomTextInput = ({ value, onChangeText, placeholder, secureTextEntry=false, keyboardType='default'}) => {
    return(
        <View style={styles.inputContainer}>
            <TextInput style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholderTextColor="#888"
            
            />
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
    height: 36,
    width: 333,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins'
    },
});