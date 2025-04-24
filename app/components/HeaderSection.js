import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderSection = ({ translations }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{translations.title}</Text>
            <Text style={styles.subtitle}>{translations.subtitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
    },
});

export default HeaderSection; 