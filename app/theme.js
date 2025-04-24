export const theme = {
    colors: {
        // Deep navy blue - conveying trust and authority
        primary: '#003366',
        // Burgundy red - traditional government color
        secondary: '#8B0000',
        // Light cream background - easier on the eyes than stark white
        background: '#F8F7F3',
        // White surface for content areas
        surface: '#FFFFFF',
        // Standard error color
        error: '#D32F2F',
        text: {
            // Dark charcoal for primary text - slightly softer than black
            primary: '#1A1A1A',
            // Medium gray for secondary text
            secondary: '#555555',
            // White for text on dark backgrounds
            light: '#FFFFFF',
        },
        // Light gray for borders
        border: '#DDDDDD',
        // Gold accent for special elements
        accent: '#B38C3D',
    },
    typography: {
        h1: {
            fontSize: 28,
            fontWeight: 'bold',
            lineHeight: 36,
        },
        h2: {
            fontSize: 22,
            fontWeight: 'bold',
            lineHeight: 30,
        },
        h3: {
            fontSize: 18,
            fontWeight: '600',
            lineHeight: 26,
        },
        body: {
            fontSize: 16,
            lineHeight: 24,
        },
        caption: {
            fontSize: 14,
            lineHeight: 20,
        },
        // Added small text style for legal notices and disclaimers
        small: {
            fontSize: 12,
            lineHeight: 16,
        },
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        // More conservative border radius values
        sm: 2,
        md: 4,
        lg: 8,
        xl: 16,
        round: 9999,
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.12,
            shadowRadius: 1.0,
            elevation: 1,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.16,
            shadowRadius: 2.5,
            elevation: 3,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.20,
            shadowRadius: 3.5,
            elevation: 6,
        },
    },
    // Added official government branding section
    branding: {
        // Maximum width for emblem/logo images
        emblemSize: 64,
        // Recommended padding around official emblems
        emblemPadding: 16,
    },
};