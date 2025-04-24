import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { LanguageContext } from '../LanguageContext';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const languages = [
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { id: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

const LanguageSelection = ({ navigation }) => {
    const { setLanguage } = useContext(LanguageContext);

    const handleLanguageSelect = (languageId) => {
        setLanguage(languageId);
        navigation.replace('Onboarding');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Government Scheme Analyzer</Text>
                <Text style={styles.subtitle}>Select your preferred language</Text>
            </View>

            <ScrollView style={styles.languageContainer}>
                {languages.map((language) => (
                    <TouchableOpacity
                        key={language.id}
                        style={styles.languageButton}
                        onPress={() => handleLanguageSelect(language.id)}
                    >
                        <Text style={styles.flag}>{language.flag}</Text>
                        <Text style={styles.languageName}>{language.name}</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={theme.colors.text.secondary}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Powered by Government of India
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        alignItems: 'center',
        padding: theme.spacing.xl,
        marginTop: theme.spacing.xl,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: theme.spacing.lg,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    languageContainer: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.md,
        ...theme.shadows.sm,
    },
    flag: {
        fontSize: 24,
        marginRight: theme.spacing.md,
    },
    languageName: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
        flex: 1,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: theme.borderRadius.lg,
        borderTopRightRadius: theme.borderRadius.lg,
        ...theme.shadows.md,
    },
    footerText: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
});

export default LanguageSelection; 