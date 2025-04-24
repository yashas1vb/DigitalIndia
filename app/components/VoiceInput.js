import React, { useState, useContext } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import * as Speech from 'expo-speech';
import { MaterialIcons } from '@expo/vector-icons';
import { LanguageContext } from '../LanguageContext';

const VoiceInput = ({
    value,
    onChangeText,
    placeholder,
    style,
    keyboardType,
    languageCode // 'en-US' for English, 'hi-IN' for Hindi, 'kn-IN' for Kannada
}) => {
    const [isListening, setIsListening] = useState(false);
    const { language } = useContext(LanguageContext);

    const startListening = async () => {
        try {
            // Check if speech is available using the correct method
            const isAvailable = await Speech.isAvailableAsync();
            if (!isAvailable) {
                Alert.alert('Error', 'Speech is not available on this device');
                return;
            }

            setIsListening(true);

            // Start speech recognition
            await Speech.speak('Listening...', {
                language: languageCode,
                onStart: () => {
                    console.log('Started speaking');
                },
                onDone: () => {
                    setIsListening(false);
                },
                onError: (error) => {
                    console.error('Speech error:', error);
                    setIsListening(false);
                    Alert.alert('Error', 'Failed to process speech. Please try again.');
                }
            });

        } catch (error) {
            console.error('Speech error:', error);
            setIsListening(false);
            Alert.alert('Error', 'Failed to start speech. Please try again.');
        }
    };

    const stopListening = async () => {
        try {
            await Speech.stop();
            setIsListening(false);
        } catch (error) {
            console.error('Stop speech error:', error);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={[styles.input, style]}
                keyboardType={keyboardType}
            />
            <TouchableOpacity
                style={styles.micButton}
                onPress={toggleListening}
                activeOpacity={0.7}
            >
                {isListening ? (
                    <ActivityIndicator color="#007AFF" size="small" />
                ) : (
                    <MaterialIcons name="mic" size={24} color="#007AFF" />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        padding: 8,
    },
    micButton: {
        padding: 8,
    },
});

export default VoiceInput; 