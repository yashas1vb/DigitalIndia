import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { LanguageContext } from './LanguageContext';
import { Ionicons } from '@expo/vector-icons';

const LanguageSelection = () => {
    const { setLanguage, setIsLanguageSelected, language } = useContext(LanguageContext);

    const selectLanguage = (lang) => {
        setLanguage(lang);
        setIsLanguageSelected(true);
    };

    const languages = [
        { code: 'english', name: 'English', nativeName: 'English' },
        { code: 'hindi', name: 'हिंदी', nativeName: 'Hindi' },
        { code: 'kannada', name: 'ಕನ್ನಡ', nativeName: 'Kannada' }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.appName}>Nagrik+</Text>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Select Your Language</Text>
                    <Text style={styles.subtitle}>भाषा चुनें</Text>
                    <Text style={styles.subtitle}>ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ</Text>
                </View>

                <View style={styles.languageContainer}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[
                                styles.languageButton,
                                language === lang.code && styles.selectedButton
                            ]}
                            onPress={() => selectLanguage(lang.code)}
                        >
                            <View style={styles.languageContent}>
                                <Text style={styles.languageName}>{lang.name}</Text>
                                <Text style={styles.languageNativeName}>{lang.nativeName}</Text>
                            </View>
                            <View style={[
                                styles.radioButton,
                                language === lang.code && styles.selectedRadioButton
                            ]}>
                                {language === lang.code && (
                                    <Ionicons name="checkmark" size={16} color="#fff" />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 40,
    },
    titleContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 4,
    },
    languageContainer: {
        width: '100%',
        maxWidth: 400,
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectedButton: {
        backgroundColor: '#e3f2fd',
        borderColor: '#007AFF',
    },
    languageContent: {
        flex: 1,
    },
    languageName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    languageNativeName: {
        fontSize: 14,
        color: '#666',
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedRadioButton: {
        backgroundColor: '#007AFF',
    },
});

export default LanguageSelection; 