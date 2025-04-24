import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const SchemeDetailsScreen = ({ route, navigation }) => {
  const { scheme } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{scheme.category}</Text>
        </View>
        <Text style={styles.title}>{scheme.title}</Text>
        <Text style={styles.description}>{scheme.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
        <Text style={styles.sectionContent}>{scheme.eligibility}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefits</Text>
        <Text style={styles.sectionContent}>{scheme.benefits}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Documents</Text>
        {scheme.requirements.map((req, index) => (
          <View key={index} style={styles.requirementItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.requirementText}>{req}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Important Dates</Text>
        <Text style={styles.sectionContent}>Last Date to Apply: {scheme.lastDate}</Text>
      </View>

      <TouchableOpacity 
        style={styles.applyButton}
        onPress={() => navigation.navigate('NearbyCenters')}
      >
        <Text style={styles.applyButtonText}>Find Nearest Center to Apply</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: '#1976d2',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  requirementText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  applyButton: {
    backgroundColor: '#1976d2',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SchemeDetailsScreen; 