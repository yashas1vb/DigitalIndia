// HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import { LanguageContext } from '../LanguageContext';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const boxSize = (width - (theme.spacing.md * 3)) / 2; // Calculate box size accounting for margins

const HomeScreen = () => {
    const { translations } = useContext(LanguageContext);
    const navigation = useNavigation();

    const features = [
        {
            id: 1,
            title: translations.schemeAnalyzer || 'Scheme Analyzer',
            description: translations.schemeAnalyzerDesc || 'Find eligible schemes',
            icon: 'search',
            color: theme.colors.primary,
            onPress: () => navigation.navigate('SchemeAnalyzer'),
        },
        {
            id: 2,
            title: translations.govtUpdates || 'Government Updates',
            description: translations.govtUpdatesDesc || 'Latest announcements',
            icon: 'newspaper',
            color: theme.colors.secondary,
            onPress: () => navigation.navigate('GovtUpdates'),
        },
        {
            id: 3,
            title: translations.documentGuide || 'Document Guide',
            description: translations.documentGuideDesc || 'Required documentation',
            icon: 'document-text',
            color: theme.colors.accent || '#1976d2',
            onPress: () => navigation.navigate('DocumentGuide'),
        },
        {
            id: 4,
            title: translations.aiChatbot || 'AI Chatbot',
            description: translations.aiChatbotDesc || 'Get instant assistance',
            icon: 'chatbubbles',
            color: '#388e3c',
            onPress: () => navigation.navigate('AIChatbot'),
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
            
            {/* Enhanced Header with Government Logo */}
            <View style={styles.headerContainer}>
                <View style={styles.headerTop}>
                    <View style={styles.emblemContainer}>
                        <Image 
                            source={require('../assets/logo-govt.png')}
                            style={styles.governmentLogo}
                            resizeMode="contain"
                        />
                    </View>
                    <TouchableOpacity style={styles.languageButton}>
                        <Ionicons name="globe-outline" size={20} color={theme.colors.text.light} />
                        <Text style={styles.languageText}>EN</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.headerContent}>
                    <Text style={styles.welcomeText}>
                        {translations.welcomeUser || 'Welcome to Nagrik+'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {translations.appDescription || 'Your one-stop solution for government services'}
                    </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Service Categories Title */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {translations.serviceCategories || 'Service Categories'}
                    </Text>
                </View>
                
                {/* Features Grid */}
                <View style={styles.featuresGrid}>
                    {features.map((feature) => (
                        <TouchableOpacity
                            key={feature.id}
                            style={styles.featureBox}
                            onPress={feature.onPress}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                                <Ionicons name={feature.icon} size={32} color={theme.colors.text.light} />
                            </View>
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureDescription}>{feature.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                {/* Announcements Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {translations.latestAnnouncements || 'Latest Announcements'}
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>
                            {translations.viewAll || 'View All'}
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.announcementCard}>
                    <View style={styles.announcementIconContainer}>
                        <Ionicons name="megaphone" size={24} color={theme.colors.primary} />
                    </View>
                    <View style={styles.announcementContent}>
                        <Text style={styles.announcementTitle}>
                            {translations.newSchemeTitle || 'New Rural Development Scheme Launched'}
                        </Text>
                        <Text style={styles.announcementDate}>April 20, 2025</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
                </View>

                <View style={styles.footer}>
                    <Image 
                        source={require('../assets/logo-govt.png')} 
                        style={styles.footerLogo}
                        resizeMode="contain"
                    />
                    <Text style={styles.footerText}>
                        {translations.footerText || 'Powered by Government of India'}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerContainer: {
        backgroundColor: theme.colors.primary,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
        ...theme.shadows.md,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    emblemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    governmentLogo: {
        width: 50,
        height: 50,
        tintColor: theme.colors.text.light, // Makes the logo white - remove if the logo has its own colors
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.md,
    },
    languageText: {
        color: theme.colors.text.light,
        marginLeft: theme.spacing.xs,
        fontWeight: '600',
    },
    headerContent: {
        paddingHorizontal: theme.spacing.lg,
    },
    welcomeText: {
        ...theme.typography.h1,
        color: theme.colors.text.light,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.text.light,
        opacity: 0.9,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
    },
    viewAllText: {
        ...theme.typography.body,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
    },
    featureBox: {
        width: boxSize,
        height: boxSize,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.sm,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.round,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    featureTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.xs,
    },
    featureDescription: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    announcementCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.sm,
    },
    announcementIconContainer: {
        width: 44,
        height: 44,
        borderRadius: theme.borderRadius.round,
        backgroundColor: '#E8F1FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    announcementContent: {
        flex: 1,
    },
    announcementTitle: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    announcementDate: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
    },
    footer: {
        padding: theme.spacing.xl,
        alignItems: 'center',
        marginTop: theme.spacing.md,
    },
    footerLogo: {
        height: 40,
        width: 120,
        marginBottom: theme.spacing.md,
    },
    footerText: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
    },
});

export default HomeScreen;