import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const NearbyCentersScreen = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNearbyCenters();
  }, []);

  const fetchNearbyCenters = async () => {
    try {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Using data.gov.in API for nearby centers
      const response = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070', {
        params: {
          'api-key': '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
          format: 'json',
          limit: 10,
          filters: `[{"column":"latitude","value":"${latitude}"},{"column":"longitude","value":"${longitude}"}]`
        }
      });

      setCenters(response.data.records || []);
    } catch (error) {
      console.error('Error fetching centers:', error);
      // Fallback data in case API fails
      setCenters([
        {
          id: '1',
          name: 'Aadhaar Seva Kendra',
          address: '123 Main Street, City',
          distance: '1.2 km',
          services: ['Aadhaar Update', 'New Aadhaar']
        },
        {
          id: '2',
          name: 'PAN Card Center',
          address: '456 Market Road, City',
          distance: '2.5 km',
          services: ['PAN Card Application', 'PAN Update']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.centerItem}>
      <Text style={styles.centerName}>{item.name}</Text>
      <Text style={styles.centerAddress}>{item.address}</Text>
      <Text style={styles.centerDistance}>Distance: {item.distance}</Text>
      <Text style={styles.centerServices}>
        Services: {item.services.join(', ')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Service Centers</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={centers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  centerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  centerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerAddress: {
    marginTop: 4,
    color: '#666',
  },
  centerDistance: {
    marginTop: 4,
    color: '#007AFF',
  },
  centerServices: {
    marginTop: 8,
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NearbyCentersScreen; 