import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DocumentGuide = ({ document, onSelectDocument, documentTypes }) => {
  const getDocumentTitle = (type) => {
    const titles = {
      aadhar: 'Aadhar Card',
      pan: 'PAN Card',
      voter: 'Voter ID',
      passport: 'Passport'
    };
    return titles[type] || type;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.documentSelector}
      >
        {documentTypes.map((type) => (
          <TouchableOpacity 
            key={type}
            style={[
              styles.button, 
              document.title === getDocumentTitle(type) && styles.selectedButton
            ]}
            onPress={() => onSelectDocument(type)}
          >
            <Text style={[
              styles.buttonText,
              document.title === getDocumentTitle(type) && styles.selectedButtonText
            ]}>
              {getDocumentTitle(type)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.processContainer}>
        <Text style={styles.title}>Process Steps:</Text>
        {document.process.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.step}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  documentSelector: {
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
  },
  selectedButtonText: {
    color: '#fff',
  },
  processContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  step: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
});

export default DocumentGuide; 