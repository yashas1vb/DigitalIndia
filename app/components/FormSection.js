import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import VoiceInput from './VoiceInput';

const FormSection = ({
    translations,
    locations,
    loading,
    onSubmit,
    onClear,
    language
}) => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [occupation, setOccupation] = useState('');
    const [income, setIncome] = useState('');
    const [location, setLocation] = useState('');

    const getLanguageCode = (language) => {
        switch (language) {
            case 'english':
                return 'en-US';
            case 'hindi':
                return 'hi-IN';
            case 'kannada':
                return 'kn-IN';
            default:
                return 'en-US';
        }
    };

    const handleSubmit = () => {
        if (!age || !occupation || !income || !location) {
            Alert.alert('Missing fields', 'Please fill in all required fields');
            return;
        }

        if (isNaN(parseInt(age)) || parseInt(age) <= 0) {
            Alert.alert('Invalid input', 'Age must be a positive number');
            return;
        }

        if (isNaN(parseInt(income)) || parseInt(income) < 0) {
            Alert.alert('Invalid input', 'Income must be a valid number');
            return;
        }

        onSubmit({
            age: parseInt(age),
            gender,
            occupation,
            income: parseInt(income),
            location,
        });
    };

    const handleClear = () => {
        setAge('');
        setGender('Male');
        setOccupation('');
        setIncome('');
        setLocation('');
        onClear();
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>{translations.personalInfo}</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{translations.age}</Text>
                <VoiceInput
                    value={age}
                    onChangeText={setAge}
                    placeholder={translations.agePlaceholder}
                    keyboardType="numeric"
                    languageCode={getLanguageCode(language)}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{translations.gender}</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(value) => setGender(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label={translations.male} value="Male" />
                        <Picker.Item label={translations.female} value="Female" />
                    </Picker>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{translations.occupation}</Text>
                <VoiceInput
                    value={occupation}
                    onChangeText={setOccupation}
                    placeholder={translations.occupationPlaceholder}
                    languageCode={getLanguageCode(language)}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{translations.annualIncome}</Text>
                <VoiceInput
                    value={income}
                    onChangeText={setIncome}
                    placeholder={translations.incomePlaceholder}
                    keyboardType="numeric"
                    languageCode={getLanguageCode(language)}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{translations.location}</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={location}
                        onValueChange={(value) => setLocation(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label={translations.selectLocation} value="" />
                        {locations.map((loc, index) => (
                            <Picker.Item key={index} label={loc} value={loc} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>{translations.analyzeEligibility}</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={handleClear}
                    disabled={loading}
                >
                    <Text style={styles.clearButtonText}>{translations.clearForm}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#34495e',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
        color: '#2c3e50',
    },
    input: {
        backgroundColor: '#f9f9f9',
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        fontSize: 16,
    },
    pickerContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    buttonGroup: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitButton: {
        backgroundColor: '#3498db',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    clearButton: {
        backgroundColor: '#f5f5f5',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    clearButtonText: {
        color: '#7f8c8d',
        fontSize: 16,
    },
});

export default FormSection; 