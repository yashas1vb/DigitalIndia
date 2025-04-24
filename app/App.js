// App.js
import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from './config';
import { LanguageProvider, LanguageContext } from './LanguageContext';
import LanguageSelection from './LanguageSelection';
import VoiceInput from './components/VoiceInput';
import Modal from 'react-native-modal';
import SchemeDetails from './components/SchemeDetails';
import FormSection from './components/FormSection';
import ResultsSection from './components/ResultsSection';
import HeaderSection from './components/HeaderSection';
import AIChatbot from './components/Chat';
import { GEMINI_CONFIG } from './constants/geminiConfig';
import HomeScreen from './components/Homescreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './components/OnboardingScreen';
import DocumentGuideScreen from './screens/DocumentGuideScreen';
import GovtUpdatesScreen from './components/GovtUpdatesScreen';
import NearbyCenter from './components/NearbyCenter';
import SchemeDetailsScreen from './components/SchemeDetailsScreen';

const Stack = createNativeStackNavigator();

const SchemeAnalyzerScreen = () => {
  const { translations, language } = useContext(LanguageContext);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${API_URL}/locations`);
      const data = await response.json();
      if (data.success) {
        setLocations(data.locations);
      } else {
        setError('Failed to fetch locations');
      }
    } catch (err) {
      setError('Network error when fetching locations');
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  const handleShowDetails = (schemeName) => {
    setSelectedScheme(schemeName);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <HeaderSection translations={translations} />
      <FormSection
        translations={translations}
        locations={locations}
        loading={loading}
        onSubmit={handleSubmit}
        onClear={handleClear}
        language={language}
      />
      <ResultsSection
        result={result}
        translations={translations}
        onShowDetails={handleShowDetails}
      />
      <Modal
        isVisible={selectedScheme !== null}
        onBackdropPress={() => setSelectedScheme(null)}
        onBackButtonPress={() => setSelectedScheme(null)}
        useNativeDriver
        style={styles.modal}
      >
        {selectedScheme && (
          <SchemeDetails
            scheme={selectedScheme}
            onClose={() => setSelectedScheme(null)}
            translations={translations}
          />
        )}
      </Modal>
    </ScrollView>
  );
};

const GovtUpdatesStack = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GovtUpdatesHome"
        component={GovtUpdatesScreen}
        options={{
          title: translations.govtUpdates || 'Government Updates',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="NearbyCenter"
        component={NearbyCenter}
        options={{
          title: translations.nearbyCenter || 'Nearby Centers',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="SchemeDetails"
        component={SchemeDetailsScreen}
        options={{
          title: translations.schemeDetails || 'Scheme Details',
          headerShown: true
        }}
      />
    </Stack.Navigator>
  );
};

const AppContent = () => {
  const { isLanguageSelected, translations, language } = useContext(LanguageContext);

  if (!isLanguageSelected) {
    return <LanguageSelection />;
  }

  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: ''
        }}
      />
      <Stack.Screen
        name="GovtUpdates"
        component={GovtUpdatesStack}
        options={{
          headerShown: false,
          title: translations.govtUpdates || 'Government Updates'
        }}
      />
      <Stack.Screen name="SchemeAnalyzer" component={SchemeAnalyzerScreen} options={{ title: translations.schemeAnalyzer || 'Scheme Analyzer' }} />
      <Stack.Screen name="DocumentGuide" component={DocumentGuideScreen} options={{ title: translations.documentGuide || 'Document Guide' }} />
      <Stack.Screen name="AIChatbot" component={AIChatbot} options={{ title: translations.aiChatbot || 'AI Chatbot' }} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;