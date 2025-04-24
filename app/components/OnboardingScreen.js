import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import { LanguageContext } from '../LanguageContext';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
    const { translations } = useContext(LanguageContext);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: translations.onboardingTitle1 || 'Scheme Analyzer',
            description: translations.onboardingDesc1 || 'Find the perfect government scheme based on your profile and eligibility',
            image: require('../assets/scheme.png'),
        },
        {
            id: 2,
            title: translations.onboardingTitle2 || 'AI Chatbot',
            description: translations.onboardingDesc2 || 'Get instant answers to your questions about government schemes',
            image: require('../assets/aichatbot.png'),
        },
        {
            id: 3,
            title: translations.onboardingTitle3 || 'Document Guide',
            description: translations.onboardingDesc3 || 'Complete checklist of documents needed for scheme applications',
            image: require('../assets/documentguide.png'),
        },
        {
            id: 4,
            title: translations.onboardingTitle4 || 'Government Updates',
            description: translations.onboardingDesc4 || 'Stay updated with the latest government scheme announcements',
            image: require('../assets/news.png'),
        },
    ];

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            navigation.replace('Home');
        }
    };

    const handleSkip = () => {
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                        setCurrentSlide(slideIndex);
                    }}
                    scrollEventThrottle={16}
                >
                    {slides.map((slide) => (
                        <View key={slide.id} style={styles.slide}>
                            <Image source={slide.image} style={styles.image} />
                            <Text style={styles.title}>{slide.title}</Text>
                            <Text style={styles.description}>{slide.description}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.controls}>
                    <View style={styles.pagination}>
                        {slides.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    currentSlide === index && styles.paginationDotActive,
                                ]}
                            />
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                            <Text style={styles.skipButtonText}>
                                {translations.skip || 'Skip'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                            <Text style={styles.nextButtonText}>
                                {currentSlide === slides.length - 1
                                    ? translations.getStarted || 'Get Started'
                                    : translations.next || 'Next'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    slide: {
        width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.lg,
    },
    image: {
        width: width * 0.8,
        height: width * 0.8,
        resizeMode: 'contain',
        marginBottom: theme.spacing.xl,
    },
    title: {
        ...theme.typography.h2,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    description: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        paddingHorizontal: theme.spacing.lg,
        lineHeight: 24,
    },
    controls: {
        padding: theme.spacing.lg,
        backgroundColor: 'transparent',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: theme.spacing.lg,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: theme.borderRadius.round,
        backgroundColor: theme.colors.border,
        marginHorizontal: theme.spacing.xs,
    },
    paginationDotActive: {
        backgroundColor: theme.colors.primary,
        width: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    skipButton: {
        padding: theme.spacing.md,
    },
    skipButtonText: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
    },
    nextButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.sm,
    },
    nextButtonText: {
        ...theme.typography.body,
        color: theme.colors.text.light,
        fontWeight: '600',
    },
});

export default OnboardingScreen;