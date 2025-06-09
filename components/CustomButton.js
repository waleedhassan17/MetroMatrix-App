import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, backgroundColor = '#2B2B2B', color = '#FFFFFF', width = 172, height= 44 }) => {
    return(
        <TouchableOpacity style={[styles.button , { backgroundColor,width,height }]} onPress={onPress}>
            <Text style={[styles.text, {color}]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 13,
        fontWeight: 600,
        textAlign:'center',
        textAlignVertical: 'center',
        fontFamily: 'Poppins'
    }
});