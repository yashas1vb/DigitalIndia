import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

const SchemeDetails = ({ scheme, onClose }) => {
    const { t } = useTranslation();

    // This is mock data - you should replace this with actual data from your backend
    const schemeDetails = {
        'PM Kisan': {
            description: 'Income support of ₹6,000 per year to farmer families',
            eligibility: [
                'Small and marginal farmer families',
                'Combined landholding up to 2 hectares',
                'Excluded: Institutional landholders, former and present ministers, etc.'
            ],
            benefits: [
                '₹6,000 per year in three installments',
                'Direct transfer to bank account',
                'No loan component'
            ],
            applicationProcess: [
                '1. Visit PM Kisan portal (www.pmkisan.gov.in)',
                '2. Click on "New Farmer Registration"',
                '3. Fill in personal details and land details',
                '4. Submit required documents',
                '5. Wait for state verification'
            ],
            documents: [
                'Aadhaar Card',
                'Land Records',
                'Bank Account Details',
                'Recent Photograph'
            ],
            website: 'https://pmkisan.gov.in'
        },
        // Add more schemes here
    };

    const details = schemeDetails[scheme] || {
        description: 'Details will be updated soon.',
        eligibility: ['Contact local government office for eligibility criteria'],
        benefits: ['Contact local government office for benefits details'],
        applicationProcess: ['Visit nearest government office for application process'],
        documents: ['Valid ID Proof', 'Address Proof'],
        website: ''
    };

    const openWebsite = async () => {
        if (details.website) {
            const supported = await Linking.canOpenURL(details.website);
            if (supported) {
                await Linking.openURL(details.website);
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{scheme}</Text>
                <Text style={styles.description}>{details.description}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('benefits')}</Text>
                    {details.benefits.map((benefit, index) => (
                        <View key={index} style={styles.listItem}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.listText}>{benefit}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('eligibility')}</Text>
                    {details.eligibility.map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.listText}>{item}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('requiredDocuments')}</Text>
                    {details.documents.map((doc, index) => (
                        <View key={index} style={styles.listItem}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.listText}>{doc}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.applyButton} onPress={openWebsite}>
                    <Text style={styles.applyButtonText}>{t('visitWebsite')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.medium,
    },
    title: {
        ...theme.typography.h2,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.medium,
    },
    description: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.large,
    },
    section: {
        marginBottom: theme.spacing.large,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.medium,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.small,
    },
    bulletPoint: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginRight: theme.spacing.small,
    },
    listText: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
        flex: 1,
    },
    applyButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.medium,
        alignItems: 'center',
        marginTop: theme.spacing.large,
        marginBottom: theme.spacing.large,
    },
    applyButtonText: {
        ...theme.typography.button,
        color: theme.colors.surface,
    },
});

export default SchemeDetails; 