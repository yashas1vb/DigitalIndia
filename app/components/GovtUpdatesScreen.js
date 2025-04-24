import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Animated,
    StatusBar,
    Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // 16px margin on each side
const HEADER_HEIGHT = 60;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

const GovtUpdatesScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const scrollY = new Animated.Value(0);

    // Mock data for government scheme updates
    const schemeUpdates = [
        {
            id: 1,
            title: 'PM Kisan Samman Nidhi Yojana',
            date: '15 Mar 2024',
            description: 'Financial support for small and marginal farmers',
            category: 'agriculture',
            eligibility: [
                'Small and marginal farmer families',
                'Combined landholding up to 2 hectares',
                'Excluded: Institutional landholders, former and present ministers, etc.'
            ],
            benefits: [
                '₹6,000 per year in three installments',
                'Direct transfer to bank account',
                'No loan component'
            ],
            targetGroup: 'Farmers',
            lastDate: '31 Dec 2024',
            status: 'Active',
            color: '#388E3C' // Green theme for agriculture
        },
        {
            id: 2,
            title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
            date: '10 Mar 2024',
            description: 'Health insurance coverage for economically vulnerable families',
            category: 'health',
            eligibility: [
                'Families identified from SECC 2011 database',
                'No age limit',
                'No cap on family size'
            ],
            benefits: [
                'Health cover of ₹5 lakh per family per year',
                'Covers secondary and tertiary hospitalization',
                'Cashless treatment at empaneled hospitals'
            ],
            targetGroup: 'Economically Weaker Sections',
            lastDate: 'Ongoing',
            status: 'Active',
            color: '#1565C0' // Blue theme for health
        },
        {
            id: 3,
            title: 'Pradhan Mantri Mudra Yojana',
            date: '5 Mar 2024',
            description: 'Financial support for micro-enterprises',
            category: 'business',
            eligibility: [
                'Non-farm income generating activities',
                'Micro and small enterprises',
                'New or existing businesses'
            ],
            benefits: [
                'Loans up to ₹10 lakh',
                'No collateral required',
                'Low interest rates'
            ],
            targetGroup: 'Entrepreneurs',
            lastDate: 'Ongoing',
            status: 'Active',
            color: '#6A1B9A' // Purple theme for business
        }
    ];

    const filters = [
        { id: 'all', label: 'All Schemes', icon: 'apps' },
        { id: 'agriculture', label: 'Agriculture', icon: 'leaf' },
        { id: 'health', label: 'Health', icon: 'medical' },
        { id: 'business', label: 'Business', icon: 'briefcase' },
        { id: 'education', label: 'Education', icon: 'school' },
        { id: 'housing', label: 'Housing', icon: 'home' }
    ];

    const filteredUpdates = schemeUpdates.filter(update => {
        const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            update.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'all' || update.category === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const renderStatusBadge = (status) => {
        const isActive = status === 'Active';
        return (
            <View style={[
                styles.statusBadge,
                { backgroundColor: isActive ? 'rgba(46, 125, 50, 0.15)' : 'rgba(198, 40, 40, 0.15)' }
            ]}>
                <View style={[styles.statusDot, { backgroundColor: isActive ? '#2E7D32' : '#C62828' }]} />
                <Text style={[
                    styles.statusText,
                    { color: isActive ? '#2E7D32' : '#C62828' }
                ]}>
                    {status}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={theme.colors.primaryDark} barStyle="light-content" />
            
            {/* Fixed Header */}
            <Animated.View style={[
                styles.header,
                {
                    transform: [{ translateY: headerTranslateY }],
                    opacity: headerOpacity,
                }
            ]}>
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.headerGradient}
                >
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.colors.text.light} />
                    </TouchableOpacity>
                    
                    <Text style={styles.headerTitle}>Government Schemes</Text>
                    
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="notifications-outline" size={24} color={theme.colors.text.light} />
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            {/* Search and Filters Section */}
            <View style={styles.searchSection}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={theme.colors.text.secondary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search schemes..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={theme.colors.text.secondary}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color={theme.colors.text.secondary} />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.filterLabel}>Categories</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                >
                    {filters.map(filter => (
                        <TouchableOpacity
                            key={filter.id}
                            style={[
                                styles.filterButton,
                                selectedFilter === filter.id && styles.filterButtonActive
                            ]}
                            onPress={() => setSelectedFilter(filter.id)}
                        >
                            <Ionicons 
                                name={filter.icon} 
                                size={18} 
                                color={selectedFilter === filter.id ? theme.colors.surface : theme.colors.primary} 
                                style={styles.filterIcon}
                            />
                            <Text style={[
                                styles.filterText,
                                selectedFilter === filter.id && styles.filterTextActive
                            ]}>
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Main Content */}
            <Animated.ScrollView
                style={styles.updatesContainer}
                contentContainerStyle={styles.updatesContent}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {filteredUpdates.length > 0 ? (
                    filteredUpdates.map((update, index) => (
                        <TouchableOpacity
                            key={update.id}
                            style={styles.updateCard}
                            onPress={() => navigation.navigate('SchemeDetails', { scheme: update })}
                            activeOpacity={0.9}
                        >
                            <View style={[styles.categoryIndicator, { backgroundColor: update.color }]} />
                            <View style={styles.updateContent}>
                                <View style={styles.updateHeader}>
                                    <View style={styles.updateHeaderLeft}>
                                        <View style={styles.dateContainer}>
                                            <Ionicons name="calendar-outline" size={16} color={theme.colors.text.secondary} />
                                            <Text style={styles.updateDate}>{update.date}</Text>
                                        </View>
                                        <Text style={styles.categoryTag}>
                                            {update.category.charAt(0).toUpperCase() + update.category.slice(1)}
                                        </Text>
                                    </View>
                                    {renderStatusBadge(update.status)}
                                </View>

                                <Text style={styles.updateTitle}>{update.title}</Text>
                                <Text style={styles.updateDescription}>{update.description}</Text>

                                <View style={styles.targetGroupContainer}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="people-outline" size={18} color={theme.colors.primary} />
                                    </View>
                                    <Text style={styles.targetGroup}><Text style={styles.boldText}>Target Group:</Text> {update.targetGroup}</Text>
                                </View>

                                <View style={styles.lastDateContainer}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="time-outline" size={18} color={theme.colors.primary} />
                                    </View>
                                    <Text style={styles.lastDate}><Text style={styles.boldText}>Last Date:</Text> {update.lastDate}</Text>
                                </View>

                                <View style={styles.eligibilityContainer}>
                                    <Text style={styles.sectionTitle}>Key Eligibility Criteria</Text>
                                    {update.eligibility.slice(0, 2).map((item, idx) => (
                                        <View key={idx} style={styles.listItem}>
                                            <View style={styles.bulletPoint} />
                                            <Text style={styles.listText}>{item}</Text>
                                        </View>
                                    ))}
                                    {update.eligibility.length > 2 && (
                                        <TouchableOpacity style={styles.moreContainer}>
                                            <Text style={styles.moreText}>+{update.eligibility.length - 2} more criteria</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View style={styles.updateFooter}>
                                    <TouchableOpacity style={styles.viewDetailsButton}>
                                        <Text style={styles.viewDetailsText}>View Complete Details</Text>
                                        <Ionicons name="arrow-forward" size={18} color="#FFF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.shareButton}>
                                        <Ionicons name="share-social-outline" size={20} color={theme.colors.primary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Ionicons name="search-outline" size={64} color={theme.colors.text.secondary} />
                        <Text style={styles.noResultsText}>No schemes found matching your search</Text>
                        <TouchableOpacity 
                            style={styles.resetButton}
                            onPress={() => {
                                setSearchQuery('');
                                setSelectedFilter('all');
                            }}
                        >
                            <Text style={styles.resetButtonText}>Reset Filters</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7F3', // Light cream background
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
        zIndex: 1000,
        elevation: 5,
    },
    headerGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.text.light,
        textAlign: 'center',
    },
    headerButton: {
        padding: 8,
    },
    searchSection: {
        marginTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
        backgroundColor: '#FFF',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        marginHorizontal: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text.primary,
        paddingVertical: 10,
    },
    filterContainer: {
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.03)',
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    filterButtonActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    filterIcon: {
        marginRight: 6,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.text.primary,
    },
    filterTextActive: {
        color: theme.colors.text.light,
    },
    updatesContainer: {
        flex: 1,
    },
    updatesContent: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 24,
    },
    updateCard: {
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: CARD_WIDTH,
        position: 'relative',
    },
    categoryIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
    },
    updateContent: {
        padding: 16,
        paddingLeft: 20,
    },
    updateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    updateHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    updateDate: {
        fontSize: 12,
        color: theme.colors.text.secondary,
        marginLeft: 4,
    },
    categoryTag: {
        fontSize: 12,
        color: theme.colors.text.secondary,
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    updateTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 8,
        lineHeight: 26,
    },
    updateDescription: {
        fontSize: 14,
        color: theme.colors.text.secondary,
        marginBottom: 16,
        lineHeight: 22,
    },
    targetGroupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    lastDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    targetGroup: {
        fontSize: 14,
        color: theme.colors.text.primary,
        flex: 1,
    },
    lastDate: {
        fontSize: 14,
        color: theme.colors.text.primary,
        flex: 1,
    },
    boldText: {
        fontWeight: '600',
    },
    eligibilityContainer: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bulletPoint: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.primary,
        marginTop: 8,
        marginRight: 8,
    },
    listText: {
        fontSize: 14,
        color: theme.colors.text.primary,
        flex: 1,
        lineHeight: 20,
    },
    moreContainer: {
        alignItems: 'center',
        marginTop: 4,
    },
    moreText: {
        fontSize: 13,
        color: theme.colors.primary,
        fontWeight: '500',
    },
    updateFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    viewDetailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        marginRight: 12,
    },
    viewDetailsText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFF',
        marginRight: 8,
    },
    shareButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    noResultsText: {
        fontSize: 16,
        color: theme.colors.text.secondary,
        marginTop: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    resetButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
    },
    resetButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFF',
    },
});

export default GovtUpdatesScreen;