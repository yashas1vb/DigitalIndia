import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const NearbyCenters = ({ documentType, searchQuery, searchRadius }) => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Fallback centers data with real locations
  const fallbackCenters = {
    aadhar: [
      {
        name: "Aadhar Enrollment Center - Bangalore",
        vicinity: "Koramangala, Bangalore",
        rating: 4.5,
        geometry: {
          location: {
            lat: 12.9352,
            lng: 77.6245
          }
        }
      },
      {
        name: "Aadhar Service Center - Mysore",
        vicinity: "Vijayanagar, Mysore",
        rating: 4.2,
        geometry: {
          location: {
            lat: 12.2958,
            lng: 76.6394
          }
        }
      },
      {
        name: "Aadhar Center - Hubli",
        vicinity: "Vidyanagar, Hubli",
        rating: 4.3,
        geometry: {
          location: {
            lat: 15.3647,
            lng: 75.1240
          }
        }
      },
      {
        name: "Aadhar Center - Mangalore",
        vicinity: "Hampankatta, Mangalore",
        rating: 4.1,
        geometry: {
          location: {
            lat: 12.9141,
            lng: 74.8560
          }
        }
      }
    ],
    pan: [
      {
        name: "PAN Card Center - Bangalore",
        vicinity: "Indiranagar, Bangalore",
        rating: 4.3,
        geometry: {
          location: {
            lat: 12.9784,
            lng: 77.6408
          }
        }
      },
      {
        name: "PAN Card Service - Mysore",
        vicinity: "Kuvempunagar, Mysore",
        rating: 4.0,
        geometry: {
          location: {
            lat: 12.2958,
            lng: 76.6394
          }
        }
      },
      {
        name: "PAN Center - Hubli",
        vicinity: "Gokul Road, Hubli",
        rating: 4.1,
        geometry: {
          location: {
            lat: 15.3647,
            lng: 75.1240
          }
        }
      }
    ],
    voter: [
      {
        name: "Electoral Office - Bangalore",
        vicinity: "Basavanagudi, Bangalore",
        rating: 4.4,
        geometry: {
          location: {
            lat: 12.9422,
            lng: 77.5807
          }
        }
      },
      {
        name: "Voter Registration - Mysore",
        vicinity: "Nazarbad, Mysore",
        rating: 4.2,
        geometry: {
          location: {
            lat: 12.2958,
            lng: 76.6394
          }
        }
      },
      {
        name: "Voter Center - Mangalore",
        vicinity: "Kadri, Mangalore",
        rating: 4.3,
        geometry: {
          location: {
            lat: 12.9141,
            lng: 74.8560
          }
        }
      }
    ],
    passport: [
      {
        name: "Passport Seva Kendra - Bangalore",
        vicinity: "Koramangala, Bangalore",
        rating: 4.6,
        geometry: {
          location: {
            lat: 12.9352,
            lng: 77.6245
          }
        }
      },
      {
        name: "Passport Office - Mangalore",
        vicinity: "Hampankatta, Mangalore",
        rating: 4.5,
        geometry: {
          location: {
            lat: 12.9141,
            lng: 74.8560
          }
        }
      }
    ]
  };

  useEffect(() => {
    loadCenters();
  }, [documentType]);

  const loadCenters = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setUserLocation(location.coords);
      
      // Get centers and calculate distances
      const centersWithDistance = (fallbackCenters[documentType] || []).map(center => {
        const distance = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          center.geometry.location.lat,
          center.geometry.location.lng
        );
        return { ...center, distance };
      });

      // Filter centers within 100km and sort by distance
      const nearbyCenters = centersWithDistance
        .filter(center => center.distance <= 100) // Filter within 100km
        .sort((a, b) => a.distance - b.distance); // Sort by distance

      setCenters(nearbyCenters);
      
    } catch (err) {
      console.error('Error loading centers:', err);
      setCenters(fallbackCenters[documentType] || []);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const openMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const filteredCenters = centers.filter(center => 
    center.name.toLowerCase().includes(searchText.toLowerCase()) ||
    center.vicinity.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search centers within 100km..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={() => setShowMap(!showMap)}
        >
          <Ionicons 
            name={showMap ? "list" : "map"} 
            size={24} 
            color="#007AFF" 
          />
        </TouchableOpacity>
      </View>

      {centers.length === 0 ? (
        <View style={styles.noCentersContainer}>
          <Ionicons name="location-off" size={48} color="#666" />
          <Text style={styles.noCentersText}>No centers found within 100km</Text>
          <Text style={styles.noCentersSubtext}>Try searching for a different document type</Text>
        </View>
      ) : (
        <ScrollView style={styles.centersList}>
          {filteredCenters.map((center, index) => (
            <View key={index} style={styles.centerItem}>
              <View style={styles.centerHeader}>
                <Text style={styles.centerName}>{center.name}</Text>
                {center.rating && (
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{center.rating}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.centerAddress}>{center.vicinity}</Text>
              {center.distance && (
                <View style={styles.distanceContainer}>
                  <Ionicons name="location" size={16} color="#007AFF" />
                  <Text style={styles.distance}>
                    {formatDistance(center.distance)} away
                  </Text>
                </View>
              )}
              <TouchableOpacity 
                style={styles.directionsButton}
                onPress={() => openMaps(
                  center.geometry.location.lat,
                  center.geometry.location.lng
                )}
              >
                <Ionicons name="navigate" size={20} color="#007AFF" />
                <Text style={styles.directionsText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  mapButton: {
    padding: 5,
  },
  centersList: {
    flex: 1,
  },
  centerItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  centerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  centerName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  centerAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  distance: {
    marginLeft: 5,
    color: '#007AFF',
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  directionsText: {
    marginLeft: 5,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  noCentersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noCentersText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  noCentersSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default NearbyCenters; 