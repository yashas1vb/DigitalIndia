import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const ResultsSection = ({
    result,
    translations,
    onShowDetails
}) => {
    if (!result) return null;

    return (
        <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>{translations.recommendedSchemes}</Text>

            <View style={styles.mainScheme}>
                <Text style={styles.mainSchemeTitle}>{translations.bestMatch}:</Text>
                <Text style={styles.mainSchemeName}>{result.predicted_scheme}</Text>
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => onShowDetails(result.predicted_scheme)}
                >
                    <Text style={styles.detailsButtonText}>{translations.showDetails}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.otherOptionsTitle}>{translations.otherOptions}:</Text>

            {result.top_schemes.slice(1).map((scheme, index) => (
                <View key={index} style={styles.alternativeScheme}>
                    <View style={styles.schemeInfo}>
                        <Text style={styles.altSchemeName}>{scheme.scheme}</Text>
                        <Text style={styles.probability}>
                            {translations.match}: {Math.round(scheme.probability * 100)}%
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => onShowDetails(scheme.scheme)}
                    >
                        <Text style={styles.detailsButtonText}>{translations.showDetails}</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <Text style={styles.disclaimer}>
                {translations.disclaimer}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    resultContainer: {
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
    resultTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
        textAlign: 'center',
    },
    mainScheme: {
        backgroundColor: '#e8f4fd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    mainSchemeTitle: {
        fontSize: 14,
        color: '#3498db',
        fontWeight: '600',
    },
    mainSchemeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 5,
    },
    otherOptionsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 10,
    },
    alternativeScheme: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        marginVertical: 5,
    },
    altSchemeName: {
        fontSize: 16,
        color: '#2c3e50',
        flex: 2,
    },
    probability: {
        fontSize: 14,
        color: '#7f8c8d',
        flex: 1,
        textAlign: 'right',
    },
    disclaimer: {
        fontSize: 12,
        color: '#95a5a6',
        marginTop: 15,
        fontStyle: 'italic',
    },
    detailsButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
        marginTop: 10,
    },
    detailsButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    schemeInfo: {
        flex: 1,
    },
});

export default ResultsSection; 