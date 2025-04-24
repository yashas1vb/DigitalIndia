import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checklist = ({ items, documentType }) => {
  const [checkedItems, setCheckedItems] = useState(new Array(items.length).fill(false));

  useEffect(() => {
    loadSavedProgress();
  }, [documentType]);

  const loadSavedProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem(`checklist_${documentType}`);
      if (savedProgress) {
        setCheckedItems(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  };

  const saveProgress = async (newCheckedItems) => {
    try {
      await AsyncStorage.setItem(
        `checklist_${documentType}`,
        JSON.stringify(newCheckedItems)
      );
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const toggleItem = async (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    await saveProgress(newCheckedItems);
  };

  const getProgressPercentage = () => {
    const checkedCount = checkedItems.filter(Boolean).length;
    return Math.round((checkedCount / items.length) * 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Required Documents:</Text>
        <Text style={styles.progressText}>
          {getProgressPercentage()}% Complete
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { width: `${getProgressPercentage()}%` }
          ]} 
        />
      </View>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => toggleItem(index)}
        >
          <Ionicons
            name={checkedItems[index] ? 'checkbox' : 'square-outline'}
            size={24}
            color={checkedItems[index] ? '#007AFF' : '#000'}
          />
          <Text style={[
            styles.itemText,
            checkedItems[index] && styles.checkedItemText
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  itemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  checkedItemText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
});

export default Checklist; 