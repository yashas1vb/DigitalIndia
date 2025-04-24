import React, { createContext, useState } from 'react';
import { translations } from './translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('english');
    const [isLanguageSelected, setIsLanguageSelected] = useState(false);

    const value = {
        language,
        setLanguage,
        isLanguageSelected,
        setIsLanguageSelected,
        translations: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}; 