import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const GovUpdatesScreen = ({ navigation }) => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      // Using data.gov.in API for government schemes
      const response = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070', {
        params: {
          'api-key': '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
          format: 'json',
          limit: 10
        }
      });
      
      // Latest government schemes and updates
      const latestSchemes = [
        {
          id: '1',
          title: 'PM SVANidhi Scheme 2.0',
          description: 'Enhanced credit facility for street vendors',
          eligibility: 'Street vendors who have completed 1 year of business',
          benefits: 'Up to ₹50,000 working capital loan with 7% interest subsidy',
          requirements: ['Vendor ID card', 'Aadhaar card', 'Bank account details', 'Business proof'],
          lastDate: '31-12-2024',
          category: 'Business'
        },
        {
          id: '2',
          title: 'PM Vishwakarma Yojana',
          description: 'Support for traditional artisans and craftspeople',
          eligibility: 'Traditional artisans and craftspeople with valid ID',
          benefits: 'Up to ₹2 lakh financial assistance and skill training',
          requirements: ['Aadhaar card', 'Artisan ID', 'Bank account', 'Business proof'],
          lastDate: 'Ongoing',
          category: 'Artisans'
        },
        {
          id: '3',
          title: 'PM Ujjwala Yojana 2.0',
          description: 'Free LPG connections for poor households',
          eligibility: 'Poor households without LPG connection',
          benefits: 'Free LPG connection with first refill',
          requirements: ['Aadhaar card', 'BPL card', 'Bank account'],
          lastDate: '31-03-2025',
          category: 'Welfare'
        },
        {
          id: '4',
          title: 'PM Kisan Samman Nidhi 15th Installment',
          description: 'Direct income support for farmers',
          eligibility: 'Small and marginal farmers with cultivable land',
          benefits: '₹6,000 per year in three equal installments',
          requirements: ['Land documents', 'Aadhaar card', 'Bank account'],
          lastDate: 'Ongoing',
          category: 'Agriculture'
        },
        {
          id: '5',
          title: 'Ayushman Bharat Digital Mission',
          description: 'Digital health ID for all citizens',
          eligibility: 'All Indian citizens',
          benefits: 'Digital health records and telemedicine services',
          requirements: ['Aadhaar card', 'Mobile number'],
          lastDate: 'Ongoing',
          category: 'Healthcare'
        },
        {
          id: '6',
          title: 'PM Mudra Yojana 2024',
          description: 'Financial support for small businesses and startups',
          eligibility: 'Small business owners and entrepreneurs',
          benefits: 'Loans up to ₹10 lakh with low interest rates',
          requirements: ['Business plan', 'Aadhaar card', 'Bank account', 'Business proof'],
          lastDate: '31-12-2024',
          category: 'Business'
        },
        {
          id: '7',
          title: 'PM Garib Kalyan Anna Yojana',
          description: 'Free food grains for poor families',
          eligibility: 'Families covered under National Food Security Act',
          benefits: '5 kg free food grains per person per month',
          requirements: ['Ration card', 'Aadhaar card'],
          lastDate: '31-12-2024',
          category: 'Welfare'
        },
        {
          id: '8',
          title: 'PM Kisan Maan Dhan Yojana',
          description: 'Pension scheme for small and marginal farmers',
          eligibility: 'Farmers aged 18-40 years',
          benefits: '₹3,000 monthly pension after 60 years',
          requirements: ['Aadhaar card', 'Land documents', 'Bank account'],
          lastDate: 'Ongoing',
          category: 'Agriculture'
        },
        {
          id: '9',
          title: 'PM Matru Vandana Yojana',
          description: 'Maternity benefit program',
          eligibility: 'Pregnant and lactating women',
          benefits: '₹5,000 in three installments',
          requirements: ['Aadhaar card', 'Bank account', 'Pregnancy certificate'],
          lastDate: 'Ongoing',
          category: 'Women'
        },
        {
          id: '10',
          title: 'PM Awas Yojana - Urban',
          description: 'Housing for urban poor',
          eligibility: 'Economically weaker sections in urban areas',
          benefits: 'Financial assistance for house construction',
          requirements: ['Aadhaar card', 'Income certificate', 'Address proof'],
          lastDate: '31-03-2025',
          category: 'Housing'
        }
      ];

      setSchemes(latestSchemes);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSchemeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.schemeCard}
      onPress={() => navigation.navigate('SchemeDetails', { scheme: item })}
    >
      <View style={styles.categoryTag}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <Text style={styles.schemeTitle}>{item.title}</Text>
      <Text style={styles.schemeDescription}>{item.description}</Text>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Eligibility:</Text>
        <Text style={styles.infoText}>{item.eligibility}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Benefits:</Text>
        <Text style={styles.infoText}>{item.benefits}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.lastDate}>Last Date: {item.lastDate}</Text>
        <Text style={styles.viewDetails}>View Details →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Latest Government Schemes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={schemes}
          renderItem={renderSchemeCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listContainer: {
    padding: 16,
  },
  schemeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  schemeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  infoSection: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  lastDate: {
    fontSize: 12,
    color: '#666',
  },
  viewDetails: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '600',
  },
});

export default GovUpdatesScreen; 