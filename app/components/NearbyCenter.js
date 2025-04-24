import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

const NearbyCenter = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for nearby centers
    const nearbyCenters = [
        {
            id: 1,
            name: 'Government Service Center',
            address: '123 Main Street, City',
            distance: '0.5 km',
            type: 'Service Center',
        },
        {
            id: 2,
            name: 'District Office',
            address: '456 Park Avenue, City',
            distance: '1.2 km',
            type: 'Government Office',
        },
        {
            id: 3,
            name: 'Municipal Corporation',
            address: '789 Market Road, City',
            distance: '2.5 km',
            type: 'Municipal Office',
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={t('searchCenters')}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={theme.colors.text.secondary}
                />
            </View>
            <ScrollView style={styles.listContainer}>
                {nearbyCenters.map((center) => (
                    <TouchableOpacity key={center.id} style={styles.centerCard}>
                        <View style={styles.centerHeader}>
                            <Text style={styles.centerName}>{center.name}</Text>
                            <Text style={styles.centerDistance}>{center.distance}</Text>
                        </View>
                        <Text style={styles.centerType}>{center.type}</Text>
                        <Text style={styles.centerAddress}>{center.address}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    searchContainer: {
        padding: theme.spacing.medium,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    searchInput: {
        ...theme.typography.body,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.small,
        color: theme.colors.text.primary,
    },
    listContainer: {
        flex: 1,
        padding: theme.spacing.medium,
    },
    centerCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.medium,
        marginBottom: theme.spacing.medium,
        elevation: 2,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    centerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.small,
    },
    centerName: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
        flex: 1,
    },
    centerDistance: {
        ...theme.typography.body,
        color: theme.colors.primary,
    },
    centerType: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.small,
    },
    centerAddress: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
    },
});

export default NearbyCenter; 